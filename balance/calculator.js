(function (scope) {
  'use strict';
  const channels = ['basic', 'skill', 'ult'];
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const scheduleCache = new WeakMap();
  function defaultProfile() {
    return {level:1, star:1, awaken:0, permanent:1, heart:0, research_element:0, research_dealer:0,
      gym:0, gear_codex:0, codex_owned:false, codex_star:1, codex_awaken:0, front:false, back:false, adjacent:0, gear:[]};
  }
  function passive(hero, step, kind, f) {
    if (hero.pas[0] !== kind) return 0;
    const rule = step >= 3 ? f.awaken.passive[kind] : {};
    return Math.min(hero.pas[1] * (rule.mult || 1), rule.cap ?? Infinity);
  }
  function gearStats(items, f) {
    const out = {atk:0, boss:0, crit:0, ult:0, shield:0, mainAttack:0};
    const sets = {};
    for (const it of items) {
      const g=clamp(it.g,0,f.gear.grades.length-1),t=clamp(it.t,1,4),l=clamp(it.l||0,0,f.gear.enhance_max[g]);
      const main=f.gear.main[`${it.s}:${g}:${t}`][l];
      if(it.s!==1) out.mainAttack+=main;
      if(it.s===2) out.ult+=main*.5;
      if(it.s===1) out.shield+=main;
      for(const [key,v] of it.p||[]) out[key]+=v;
      if(it.set) sets[it.set]=(sets[it.set]||0)+1;
    }
    for(const [key,n] of Object.entries(sets)) {
      for(const [step,count] of Object.entries(f.gear.set_thresholds)) if(n>=count) {
        for(const [opt,value] of Object.entries(f.gear.sets[key][step])) out[opt]+=value;
      }
    }
    return out;
  }
  function recordBonus(p, f) {
    if(!p.codex_owned) return 0;
    return f.hero_records.filter(r=>r.kind==='meet'||r.kind==='star'&&(r.step<=p.codex_star||p.codex_awaken>0)||r.kind==='awaken'&&r.step<=p.codex_awaken)
      .reduce((s,r)=>s+r.atk,0);
  }
  function stats(hero, input, f) {
    const p={...defaultProfile(),...input},a=clamp(p.awaken,0,hero.awaken_cap),star=a>0?hero.max_star:clamp(p.star,1,hero.max_star);
    p.permanent=Math.min(p.permanent,star*f.perm_cap_per_star);
    const gear=gearStats(p.gear,f),gym=f.gym[clamp(p.gym,0,f.gym.length-1)];
    const own=passive(hero,a,'aura',f)+passive(hero,a,'elem',f);
    const slot=1+(p.front?f.front+gym[0]:0)+p.adjacent*(f.support+gym[2]);
    const attack=hero.atk*f.level[clamp(p.level,1,f.level.length)-1]
      *(1+f.perm_atk*(p.permanent-1))*f.star[star-1]
      *(1+f.heart_atk*p.heart)*(1+f.unity_atk*Math.floor((p.permanent-1)/f.unity_step))
      *f.school_element[p.research_element]*(hero.kit==='star'||hero.kit==='rocket'?f.school_dealer[p.research_dealer]:1)
      *slot*(1+own)*(1+gear.mainAttack+gear.atk)*(1+p.gear_codex*f.gear.codex_atk+recordBonus(p,f))
      *(a>=1?f.awaken.attack:1);
    const cooldown=(p.back?1-f.back-gym[1]:1)*Math.max(.5,1-gear.ult);
    const critChance=clamp(passive(hero,a,'crit',f)+gear.crit,0,1);
    const critDamage=a>=3&&hero.pas[0]==='crit'?f.awaken.passive.crit.damage:2;
    return {attack,cooldown,gear,awaken:a,star,swift:passive(hero,a,'swift',f),crit:1+critChance*(critDamage-1),
      boss:1+passive(hero,a,'boss',f)+gear.boss,record:recordBonus(p,f)};
  }
  function reference(hero, a, data) {
    const step=a>=5?5:a>=3?3:0;
    if(step===0) return {hero,profile:defaultProfile()};
    const response=(data.responses||[]).find(r=>r.profile.awaken===step&&r.rows.some(h=>h.id===hero.id));
    if(!response) throw new Error(`각성 ${step} 실측 응답 없음: ${hero.id}`);
    return {hero:{...hero,A:response.rows.find(r=>r.id===hero.id&&r.scenario==='A'),B:response.rows.find(r=>r.id===hero.id&&r.scenario==='B')},
      profile:{...defaultProfile(),...response.profile}};
  }
  function meanChannels(result) {
    result.mean=Object.fromEntries([...channels,'dps'].map(k=>[k,(result.A[k]+result.B[k])/2]));
    return result;
  }
  function measured(hero) {
    const result={id:hero.id};
    for(const scenario of ['A','B'])result[scenario]=Object.fromEntries([...channels,'dps'].map(k=>[k,hero[scenario][k==='dps'?'expected_dps':'expected_'+k+'_dps']]));
    return meanChannels(result);
  }
  function schedule(hero,stats,base,f,row) {
    if(!scheduleCache.has(f))scheduleCache.set(f,new Map());
    const cache=scheduleCache.get(f),key=[hero.id,stats.cooldown,stats.swift,row.cadence.ult.first,row.cadence.ult.interval].join(':');
    if(cache.has(key))return cache.get(key);
    const timing=f.cadence,own=timing.heroes[hero.id],dt=timing.frame;
    const shift=hero.ult_cd*(stats.cooldown-base.cooldown);
    const period=row.cadence.ult.interval+shift;
    let nextUlt=row.cadence.ult.first+shift*(1-hero.ult_start);
    let attack=own.initial_attack,skill=own.initial_skill,busyUntil=-1,haste=1,hasteTime=0;
    const result={basic:[],skill:[],ult:[]},animations=[];
    const cast=(channel,time)=>{
      result[channel].push(time);
      const effect=own[channel];
      if(effect.haste.mult>=2||haste<effect.haste.mult){haste=effect.haste.mult;hasteTime=effect.haste.duration;}
      for(const [delay,speed] of effect.animations)animations.push([time+delay,timing.attack_locks[speed]]);
      animations.sort((a,b)=>a[0]-b[0]);
    };
    for(let frame=1;frame<=Math.floor((row.seconds+1e-7)/dt);frame++){
      const time=frame*dt;
      if(hasteTime>0){hasteTime-=dt;if(hasteTime<=0)haste=1;}
      attack-=dt*haste;skill-=dt;
      if(skill<=0&&time+1e-7>=busyUntil){
        skill=hero.skill_cd*stats.cooldown;busyUntil=time+timing.skill_lock;cast('skill',time);
      }
      if(attack<=0&&time+1e-7>=busyUntil){
        attack=hero.interval*timing.tempo/(1+stats.swift);
        busyUntil=time+timing.attack_locks[1+stats.swift];result.basic.push(time);
      }
      if(time+1e-7>=nextUlt){cast('ult',time);nextUlt+=period;}
      while(animations.length&&animations[0][0]<=time+1e-7){
        const [,lock]=animations.shift();busyUntil=time+lock;
      }
    }
    cache.set(key,result);
    return result;
  }
  function castWindow(model, seconds, casts) {
    let damage=0;
    for(const time of casts){
      const remaining=seconds-time;
      if(remaining+1e-7>=model.end)damage+=model.full;
      else for(const [delay,value] of model.pulses)if(delay<=remaining+1e-7)damage+=value;
    }
    return damage;
  }
  function calculate(hero,input,data) {
    const f=data.formulas,p={...defaultProfile(),...input},s=stats(hero,p,f),ref=reference(hero,s.awaken,data),b=stats(hero,ref.profile,f);
    const ability=(step,ch)=>ch==='skill'?(step>=2?f.awaken.skill:1):ch==='ult'?(step>=4?f.awaken.ult:1):1;
    const result={id:hero.id,stats:s};
    const next=schedule(hero,s,b,f,ref.hero.A),initial=schedule(hero,b,b,f,ref.hero.A);
    for(const scenario of ['A','B']) {
      const r=ref.hero[scenario],out={casts:{}};
      const budget=step=>step<2?1:f.balance.awakening_damage[hero.id][step>=4?1:0][scenario==='A'?0:1];
      for(const [index,ch] of channels.entries()) {
        let cadence=next.basic.length/initial.basic.length;
        if(ch!=='basic'){
          const model=r.cadence[ch];
          cadence=castWindow(model,r.seconds,next[ch])/castWindow(model,r.seconds,initial[ch]);
          out.casts[ch]=next[ch].length;
        }
        out[ch]=(r.no_crit_damage[index]/r.seconds)*(s.attack/r.attack)*s.crit
          *(scenario==='A'?s.boss/b.boss:1)*ability(s.awaken,ch)/ability(b.awaken,ch)*cadence
          *budget(s.awaken)/budget(b.awaken);
      }
      out.dps=channels.reduce((sum,ch)=>sum+out[ch],0);
      result[scenario]=out;
    }
    return meanChannels(result);
  }
  scope.Growth={defaultProfile,calculate,measured,stats,gearStats,recordBonus};
})(typeof window!=='undefined'?window:globalThis);
