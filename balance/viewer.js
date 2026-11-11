'use strict';
const D=window.DPS_DATA,F=D.formulas,G=window.Growth,P=window.PACING_PRESETS,$=id=>document.getElementById(id);
const tiers=F.tier_order,colors={'신화':'#87439e',SS:'#b32e77',S:'#8d6214',A:'#6551bd',B:'#226c99'},pinColors=['#6748b9','#bb4076','#287e98','#9c701e'];
const elements={rainbow:'무지개',purple:'별',white:'빛',green:'생명',red:'불꽃',blue:'물결',orange:'노을'},roles=['광역 딜러','단일 딜러','회복·지원','수호'];
const channelNames={basic:'평타',skill:'스킬',ult:'궁극기'},channels=Object.keys(channelNames),fields={};
const clone=x=>JSON.parse(JSON.stringify(x)),clamp=(x,a,b)=>Math.min(b,Math.max(a,Number(x)||0));
const fmt=n=>new Intl.NumberFormat('ko-KR',{maximumFractionDigits:n<100?2:1,notation:Math.abs(n)>=100000?'compact':'standard'}).format(n);
const pc=n=>(n>=0?'+':'')+fmt(n)+'%',hero=id=>D.heroes.find(h=>h.id===id),portrait=h=>`portraits/${h.id}_idle.png`;
// 게임의 GameData.ELEMENT_COLORS와 같은 색
const elementColors={purple:'#9a6bff',white:'#ffd75e',green:'#4fd18b',red:'#ff5f4f',blue:'#3fa9ff',orange:'#ff9a3c',rainbow:'#f5b6ff'};
const chip=h=>`<span class="el el-${h.element}" style="--el:${elementColors[h.element]}">${elements[h.element]}</span>`,face=h=>`<span class="face" style="--el:${elementColors[h.element]}"><img src="faces/${h.id}.png" alt="" loading="lazy"></span>`;
let state={hero:D.heroes.find(h=>h.id==='yuna').id,p:G.defaultProfile(),gearPreset:0,growthPreset:'none',pins:[],view:'gaps',scenario:'mean',chart:'awaken',chartMax:100,rosterSetup:'baseline',rank:{group:'tier',tier:'all',role:'all',element:'all'}};
let filter={tier:'all',role:'all',element:'all'},sort={key:'mean',direction:-1},pickerPage=0;
function normalize(p){
  const out={...G.defaultProfile(),...p};
  const ranges={level:[1,F.level.length],star:[1,F.star.length],awaken:[0,F.awaken.steps],permanent:[1,60],heart:[0,100],research_element:[0,F.school_element.length-1],research_dealer:[0,F.school_dealer.length-1],gym:[0,F.gym.length-1],gear_codex:[0,F.gear.codex_max],codex_star:[1,F.star.length],codex_awaken:[0,F.awaken.steps],adjacent:[0,2]};
  for(const [k,r] of Object.entries(ranges))out[k]=Math.round(clamp(out[k],...r));
  for(const k of ['front','back','codex_owned'])out[k]=Boolean(out[k]);if(out.front)out.back=false;
  const seen=new Set();out.gear=(Array.isArray(out.gear)?out.gear:[]).filter(it=>Number.isInteger(it.s)&&it.s>=0&&it.s<4&&!seen.has(it.s)&&seen.add(it.s)).map(it=>{
    const g=Math.round(clamp(it.g,0,F.gear.grades.length-1));
    return {s:it.s,g,t:Math.round(clamp(it.t,1,4)),l:Math.round(clamp(it.l,0,F.gear.enhance_max[g])),set:F.gear.sets[it.set]?it.set:'',p:(Array.isArray(it.p)?it.p:[]).slice(0,3).filter(v=>F.gear.opts[v[0]]&&Number.isFinite(v[1])).map(v=>[v[0],clamp(v[1],0,F.gear.opts[v[0]][2]*F.gear.potential_mult.at(-1))])};
  });return out;
}
function restore(){
  if(!location.hash)return;
  try{const s=JSON.parse(decodeURIComponent(location.hash.slice(1)));if(hero(s.hero))state.hero=s.hero;state.p=normalize(s.p||{});
    state.gearPreset=clamp(s.gearPreset,-1,4);state.growthPreset=P.presets.some(p=>p.key===s.growthPreset)?s.growthPreset:'none';
    state.pins=(Array.isArray(s.pins)?s.pins:[]).filter(v=>hero(v.hero)).slice(0,4).map(v=>({hero:v.hero,p:normalize(v.p)}));
    state.view=['roster','gaps'].includes(s.view)?s.view:'hero';state.scenario=['A','B','mean'].includes(s.scenario)?s.scenario:'mean';state.chart=['pins','tiers'].includes(s.chart)?s.chart:'awaken';state.chartMax=clamp(s.chartMax,10,F.level.length)||100;
    state.rosterSetup=['baseline','current'].includes(s.rosterSetup)||P.presets.some(p=>p.key===s.rosterSetup)?s.rosterSetup:'baseline';
    const rk=s.rank||{};state.rank={group:['all','tier','role'].includes(rk.group)?rk.group:'tier',tier:tiers.includes(rk.tier)?rk.tier:'all',role:roles.includes(rk.role)?rk.role:'all',element:elements[rk.element]?rk.element:'all'};
  }catch{$('save-status').textContent='링크 설정을 읽지 못해 기본값으로 열었어요.';}
}
restore();
function save(){history.replaceState(null,'','#'+encodeURIComponent(JSON.stringify(state)));}
function capped(){const h=hero(state.hero);state.p=normalize(state.p);state.p.awaken=Math.min(state.p.awaken,h.awaken_cap);state.p.star=state.p.awaken>0?h.max_star:Math.min(state.p.star,h.max_star);state.p.permanent=Math.min(state.p.permanent,state.p.star*F.perm_cap_per_star);}
function helpButton(text,label){const b=document.createElement('button');b.type='button';b.className='help';b.textContent='?';b.dataset.help=text;b.title=text;b.setAttribute('aria-label',label+' 도움말');return b;}
document.addEventListener('click',e=>{const b=e.target.closest('[data-help]'),box=$('help-box');if(b){box.hidden=false;box.textContent=b.dataset.help;const rect=b.getBoundingClientRect();box.style.left=Math.max(12,Math.min(rect.left,innerWidth-box.offsetWidth-12))+'px';box.style.top=Math.max(12,Math.min(rect.bottom+8,innerHeight-box.offsetHeight-12))+'px';b.setAttribute('aria-describedby','help-box');}else if(!box.contains(e.target))box.hidden=true;});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('help-box').hidden=true;});
function slider(parent,key,label,min,max,value,tip,onChange){
  const root=document.createElement('div');root.className='control';const cap=document.createElement('div');cap.className='control-label';
  const lab=document.createElement('label');lab.htmlFor=key;lab.textContent=label;cap.append(lab,helpButton(tip,label));
  const pair=document.createElement('div');pair.className='slider-pair';const range=document.createElement('input'),num=document.createElement('input');
  range.type='range';num.type='number';range.id=key+'-range';num.id=key;range.setAttribute('aria-label',label+' 조절');
  for(const input of [range,num]){input.min=min;input.max=max;input.step=1;input.value=value;}
  range.addEventListener('input',()=>{num.value=range.value;onChange(+range.value);});
  num.addEventListener('change',()=>{num.value=Math.round(clamp(num.value,+num.min,+num.max));range.value=num.value;onChange(+num.value);});
  pair.append(range,num);root.append(cap,pair);$(parent).append(root);fields[key]={range,num,set(v,cap){if(cap!==undefined)for(const i of [range,num])i.max=cap;range.value=v;num.value=v;}};return root;
}
const defs=[
 ['growth-controls','level','전투 레벨',1,F.level.length,'항해 중 골드로 올리는 레벨이에요. 공격력은 게임의 레벨 공식을 그대로 사용합니다.'],
 ['growth-controls','star','별',1,F.star.length,'같은 아이의 조각으로 승급해요. 등급마다 최대 별이 다르며 영구 레벨 상한도 늘어납니다.'],
 ['growth-controls','awaken','각성 단계',0,F.awaken.steps,'1 공격 +20%, 2 스킬 +30%, 3 고유 패시브 강화, 4 궁극기 +50%, 5 진화 궁극기. 각성 선택 시 필요한 최대 별로 맞춥니다. 5단계는 SS·신화만 가능해요.'],
 ['permanent-controls','permanent','영구 레벨',1,60,'귀환해도 남는 성장입니다. 현재 별 ×10까지 가능하며 해당 아이의 단합 기여도 함께 반영합니다.'],
 ['permanent-controls','heart','고래의 심장',0,100,'심장 레벨마다 모든 아이 공격력이 올라갑니다. 전투 레벨과 별도로 곱해집니다.'],
 ['permanent-controls','research_element','속성 공격 연구',0,F.school_element.length-1,'분교 과학실의 공격 연구 레벨입니다. 모든 역할의 공격력을 높여요.'],
 ['permanent-controls','research_dealer','딜러 공격 연구',0,F.school_dealer.length-1,'광역·단일 딜러에게만 적용되는 분교 공격 연구입니다.'],
 ['permanent-controls','gym','체육관',0,F.gym.length-1,'선두 공격·후열 쿨타임·인접 지원 보너스를 강화합니다. 중립 위치에서는 선두·후열 효과를 받지 않아요.'],
 ['permanent-controls','gear_codex','장비 도감 등록 수',0,F.gear.codex_max,'한 번이라도 얻어 도감에 등록한 장비 종류 수입니다. 등록마다 계정 공격 보너스가 합산됩니다.'],
 ['permanent-controls','codex_star','성장 기록 · 전원 도달 별',1,F.star.length,'아래 전원 보유를 켜면 모든 아이가 이 별까지 도달한 성장 기록 공격 보너스를 합산합니다.'],
 ['permanent-controls','codex_awaken','성장 기록 · 전원 도달 각성',0,F.awaken.steps,'전원 보유를 켠 상태에서 기록할 각성 단계입니다. 각성하려면 필요한 최대 별 기록도 함께 반영합니다.'],
 ['adjacent-control','adjacent','인접 지원 아이',0,2,'이 아이와 맞닿은 칸에 있는 수호·회복지원 아이 수입니다. 공격 보너스만 적용하며 동료 패시브·결속은 별도 계산하지 않습니다.']];
for(const [parent,key,label,min,max,tip] of defs)slider(parent,key,label,min,max,state.p[key],tip,v=>{state.p[key]=v;if(parent==='permanent-controls')state.growthPreset='none';capped();sync();render();});
const check=document.createElement('label');check.className='check-label';check.innerHTML='<input id="codex_owned" type="checkbox">성장 기록: 전원 보유';
check.append(helpButton('전원 만남·승급·각성 기록을 실제 도감 데이터에서 더합니다. 보상을 수령하지 않아도 능력치는 적용됩니다.','전원 보유'));$('permanent-controls').prepend(check);
$('codex_owned').onchange=()=>{state.p.codex_owned=$('codex_owned').checked;render();};
slider('chart-max-control','chart-max','그래프 끝 레벨',10,F.level.length,state.chartMax,'레벨 1부터 이 레벨까지의 변화를 보여줍니다. 나머지 성장 설정은 고정합니다.',v=>{state.chartMax=v;render();});
for(const [key,label,values] of [['tier','등급',tiers.map(t=>[t,t])],['role','역할',roles.map(r=>[r,r])],['element','속성',Object.entries(elements)]]){
  const title=document.createElement('div');title.className='filter-title';title.textContent=label;const wrap=document.createElement('div');wrap.className='chips';
  for(const [v,l] of [['all','전체'],...values]){const b=document.createElement('button');b.type='button';b.textContent=l;b.dataset.filter=key;b.dataset.value=v;b.onclick=()=>{filter[key]=v;pickerPage=0;picker();};wrap.append(b);}
  $('filters').append(title,wrap);
}
function picker(){
  const query=$('search').value.trim();const list=D.heroes.filter(h=>(!query||h.name.includes(query))&&(filter.tier==='all'||h.tier===filter.tier)&&(filter.role==='all'||h.role===filter.role)&&(filter.element==='all'||h.element===filter.element));
  const pages=Math.max(1,Math.ceil(list.length/6));pickerPage=Math.min(pickerPage,pages-1);
  $('hero-list').replaceChildren();
  for(const h of list.slice(pickerPage*6,pickerPage*6+6)){const b=document.createElement('button');b.type='button';b.className='hero-option'+(h.id===state.hero?' active':'');b.setAttribute('aria-pressed',h.id===state.hero);
    b.innerHTML=`<img src="${portrait(h)}" alt="${h.name} 초상" loading="lazy"><span><b>${h.name}</b><small>${h.tier} · ${h.role.replace(' 딜러','')}</small></span>`;
    b.onclick=()=>{state.hero=h.id;if(state.growthPreset!=='none')applyGrowth(state.growthPreset);if(state.gearPreset>=0)state.p.gear=makeGear(state.gearPreset,h);capped();sync();gearAdvanced();picker();render();};$('hero-list').append(b);
  }
  $('hero-count').textContent=`${list.length}명 표시 · 전체 ${D.heroes.length}명`;
  $('hero-page').textContent=`${pickerPage+1} / ${pages}`;$('hero-prev').disabled=pickerPage===0;$('hero-next').disabled=pickerPage===pages-1;
  document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',filter[b.dataset.filter]===b.dataset.value));
}
$('search').oninput=()=>{pickerPage=0;picker();};$('hero-prev').onclick=()=>{pickerPage--;picker();};$('hero-next').onclick=()=>{pickerPage++;picker();};
function makeGear(index,h){
  if(index<=0)return [];
  const setups=[[0,1,0,0],[1,1,0,0],[2,2,10,1],[3,4,20,2],[4,4,F.gear.enhance_max[4],3]],v=setups[index];
  const set={star:'starlight',rocket:'firework',bell:'cloudguard',bloom:'sprout'}[h.kit];
  return [0,1,2,3].map(s=>({s,g:v[0],t:v[1],l:Math.min(v[2],F.gear.enhance_max[v[0]]),set:index>=2?set:'',p:index<2?[]:['atk','crit','boss'].slice(0,index-1).map(key=>[key,Math.round(F.gear.opts[key][index===4?2:1]*F.gear.potential_mult[v[3]]*1000)/1000])}));
}
function choice(parent,id,label,options,value,tip,change){
  const box=document.createElement('div'),cap=document.createElement('div');cap.className='control-label';const lab=document.createElement('label');lab.htmlFor=id;lab.textContent=label;cap.append(lab,helpButton(tip,label));
  const s=document.createElement('select');s.id=id;for(const [v,t] of options){const o=document.createElement('option');o.value=v;o.textContent=t;s.append(o);}s.value=value;s.onchange=()=>change(s.value);box.append(cap,s);parent.append(box);return s;
}
function gearAdvanced(){
  const openSlots=new Set([...$('gear-advanced').querySelectorAll('details[open]')].map(d=>d.dataset.slot));
  $('gear-advanced').replaceChildren();
  for(const [s,name] of ['리본','배지','부적','무기'].entries()){
    const root=document.createElement('details');root.className='gear-slot';root.dataset.slot=s;root.open=openSlots.has(String(s));const sum=document.createElement('summary');sum.textContent=name;root.append(sum);const grid=document.createElement('div');grid.className='gear-grid';root.append(grid);
    const it=state.p.gear.find(x=>x.s===s),g=it?it.g:-1;
    const update=(key,v)=>{let item=state.p.gear.find(x=>x.s===s);if(key==='g'&&+v<0)state.p.gear=state.p.gear.filter(x=>x.s!==s);else{if(!item){item={s,g:0,t:1,l:0,set:'',p:[]};state.p.gear.push(item);}item[key]=v;state.p=normalize(state.p);}state.gearPreset=-1;sync();render();};
    choice(grid,`gear-${s}-grade`,'등급',[[-1,'미장착'],...F.gear.grades.map((v,i)=>[i,v])],g,'등급이 높을수록 장비 주능력과 강화 상한이 커집니다.',v=>{update('g',+v);gearAdvanced();});
    choice(grid,`gear-${s}-step`,'단계',[1,2,3,4].map(v=>[v,v+'단계']),it?.t||1,'같은 등급 안에서 장비의 주능력을 높이는 단계입니다.',v=>update('t',+v));
    choice(grid,`gear-${s}-enhance`,'강화',Array.from({length:F.gear.enhance_max[Math.max(0,g)]+1},(_,i)=>[i,'+'+i]),it?.l||0,'색가루로 강화한 수치입니다. 등급마다 최대 강화가 달라요.',v=>update('l',+v));
    choice(grid,`gear-${s}-set`,'세트',[['','없음'],...Object.entries(F.gear.sets).map(([k,v])=>[k,v.name])],it?.set||'','같은 세트의 서로 다른 부위 2개·4개 효과는 누적됩니다.',v=>update('set',v));
    for(let line=0;line<3;line++){
      const row=document.createElement('div');row.className='pot-line';root.append(row);const option=it?.p[line]||['',0];
      choice(row,`gear-${s}-pot-${line}`,`잠재 ${line+1}`,[['','없음'],...Object.entries(F.gear.opts).map(([k,v])=>[k,v[0]])],option[0],'잠재 종류를 고르고 아래 수치를 직접 넣습니다. 게임에 표시된 퍼센트를 그대로 입력하세요.',key=>{const item=state.p.gear.find(x=>x.s===s);if(!item||item.g===0)return;item.p[line]=key?[key,F.gear.opts[key][1]]:['',0];state.gearPreset=-1;sync();render();gearAdvanced();});
      if(option[0]){const lab=document.createElement('label');lab.textContent=`잠재 ${line+1} 수치 (%)`;const num=document.createElement('input');num.type='number';num.id=`gear-${s}-value-${line}`;lab.htmlFor=num.id;num.min=0;num.max=F.gear.opts[option[0]][2]*F.gear.potential_mult[Math.min(Math.max(g,0),3)]*100;num.step=.1;num.value=+(option[1]*100).toFixed(2);num.onchange=()=>{const item=state.p.gear.find(x=>x.s===s);item.p[line][1]=clamp(num.value,0,+num.max)/100;num.value=+(item.p[line][1]*100).toFixed(2);state.gearPreset=-1;sync();render();};lab.append(num,helpButton('장비의 실제 잠재 수치입니다. 은빛~무지개 배율을 반영한 최종 퍼센트를 입력합니다.','잠재 수치'));row.append(lab);}
    }
    $('gear-advanced').append(root);
  }
}
const baseOption=document.createElement('option');baseOption.value='none';baseOption.textContent='직접 설정 · 초기 성장';$('growth-preset').append(baseOption);
for(const preset of P.presets){const o=document.createElement('option');o.value=preset.key;o.textContent=preset.label+(preset.simulated_day<preset.day?` (${preset.simulated_day}일 완주 시점)`:'');$('growth-preset').append(o);}
for(const preset of P.presets){const o=document.createElement('option');o.value=preset.key;o.textContent=preset.label+(preset.simulated_day<preset.day?` (${preset.simulated_day}일 완주 시점)`:'');$('roster-preset').append(o);}
function applyGrowth(key){state.growthPreset=key;const preset=P.presets.find(p=>p.key===key);if(preset){const values=preset.heroes[state.hero]||{star:1,permanent:1};Object.assign(state.p,preset.shared,values,{awaken:0});}}
$('growth-preset').onchange=()=>{applyGrowth($('growth-preset').value);capped();sync();render();};
$('gear-preset').onchange=()=>{state.gearPreset=+$('gear-preset').value;if(state.gearPreset>=0)state.p.gear=makeGear(state.gearPreset,hero(state.hero));sync();gearAdvanced();render();};
function sync(){
  const h=hero(state.hero);for(const [k,f] of Object.entries(fields))if(k in state.p)f.set(state.p[k],k==='star'?h.max_star:k==='awaken'?h.awaken_cap:k==='permanent'?state.p.star*F.perm_cap_per_star:undefined);
  fields['chart-max'].set(state.chartMax);$('codex_owned').checked=state.p.codex_owned;$('gear-preset').value=state.gearPreset;$('growth-preset').value=state.growthPreset;
  const preset=P.presets.find(p=>p.key===state.growthPreset);$('preset-note').textContent=preset?`${preset.label} · ${preset.heroes[state.hero]?'해당 아이 기록 적용':'시뮬레이션에서 미보유: 초기 성장'}${preset.simulated_day<preset.day?` · ${preset.simulated_day}일 완주로 시뮬레이션 종료`:''}. 장비와 전투 레벨은 별도입니다.`:'연구·도감·영구 레벨을 직접 조절할 수 있어요.';
  document.querySelectorAll('[data-slot]').forEach(b=>b.classList.toggle('active',b.dataset.slot===(state.p.front?'front':state.p.back?'back':'neutral')));
  $('scenario').value=state.scenario;$('chart-mode').value=state.chart;$('pin').disabled=state.pins.length>=4;
  $('roster-preset').value=state.rosterSetup;$('roster-scenario').value=state.scenario;
}
document.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{state.p.front=b.dataset.slot==='front';state.p.back=b.dataset.slot==='back';sync();render();});
$('reset').onclick=()=>{state.p=G.defaultProfile();state.gearPreset=0;state.growthPreset='none';state.rosterSetup='baseline';sync();gearAdvanced();render();};
$('scenario').onchange=()=>{state.scenario=$('scenario').value;sync();render();};$('chart-mode').onchange=()=>{state.chart=$('chart-mode').value;render();};
$('pin').onclick=()=>{if(state.pins.length<4)state.pins.push({hero:state.hero,p:clone(state.p)});state.chart='pins';sync();render();};
$('clear-pins').onclick=()=>{state.pins=[];state.chart='awaken';sync();render();};
$('share').onclick=async()=>{save();try{await navigator.clipboard.writeText(location.href);$('save-status').textContent='현재 설정 링크를 복사했어요.';}catch{$('save-status').textContent='주소창의 전체 주소를 복사하면 설정도 함께 전달됩니다.';}};
for(const view of ['hero','roster','gaps'])$('tab-'+view).onclick=()=>{state.view=view;render();};
$('roster-baseline').onclick=()=>{state.rosterSetup='baseline';sync();render();};
$('roster-preset').onchange=()=>{state.rosterSetup=$('roster-preset').value;render();};
$('roster-scenario').onchange=()=>{state.scenario=$('roster-scenario').value;sync();render();};
$('rank-controls').onclick=e=>{const b=e.target.closest('button[data-k]');if(!b)return;const {k,v}=b.dataset;if(k==='scenario'){state.scenario=v;sync();}else state.rank[k]=v;render();};
$('roster-custom').onclick=()=>{state.rosterSetup='current';state.view='hero';sync();render();};
document.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{sort.direction=sort.key===b.dataset.sort?-sort.direction:-1;sort.key=b.dataset.sort;renderRoster();});
function tag(h){return `<span class="tier-tag" style="--tier:${colors[h.tier]}">${h.tier}</span>`;}
function forecast(h,p){return G.calculate(h,p,D);}
function render(){
  capped();save();const h=hero(state.hero),r=forecast(h,state.p),base=forecast(h,G.defaultProfile());
  for(const view of ['hero','roster','gaps']){$(view+'-view').hidden=state.view!==view;$('tab-'+view).classList.toggle('active',state.view===view);}
  $('roster-controls').hidden=state.view==='hero';document.querySelector('.workspace').classList.toggle('roster-mode',state.view!=='hero');
  $('selected-hero').innerHTML=`<img src="${portrait(h)}" alt="${h.name} 초상"><div>${tag(h)}<span class="fine">${elements[h.element]} · ${h.role}</span><h2>${h.name}</h2><span class="fine">★${r.stats.star} · 각성 ${r.stats.awaken} · 전투 레벨 ${state.p.level}</span></div>`;
  $('headline').innerHTML=[['A','보스 DPS'],['B','무리 DPS'],['mean','종합 DPS']].map(([k,label])=>{const ratio=r[k].dps/base[k].dps;return `<article><small>${label}</small><strong>${fmt(r[k].dps)}</strong><div class="delta">기준 ×${fmt(ratio)} · ${pc((ratio-1)*100)}</div></article>`;}).join('');
  const values=r[state.scenario],shares=channels.map(k=>100*values[k]/values.dps);
  $('damage-split').innerHTML=`<div class="split-bar" role="img" aria-label="${channels.map((k,i)=>channelNames[k]+' '+shares[i].toFixed(1)+'퍼센트').join(', ')}">${channels.map((k,i)=>`<span style="width:${shares[i]}%;background:var(--${k})">${shares[i].toFixed(1)}%</span>`).join('')}</div><div class="split-labels">${channels.map((k,i)=>`<div><small>${channelNames[k]}</small><strong>${fmt(values[k])}</strong><small>목표 대비 ${(shares[i]-[20,40,40][i]).toFixed(1)}%p</small></div>`).join('')}</div><div class="target-caption"><span>목표 비중</span><span>평타 20 · 스킬 40 · 궁극기 40</span></div><div class="split-bar target">${channels.map((k,i)=>`<span style="width:${[20,40,40][i]}%;background:var(--${k})"></span>`).join('')}</div>`;
  upgrades(h,r);pins();if(state.view==='hero')chart();else{const rows=rosterResults();renderRosterSetup(rows);if(state.view==='roster')renderRoster(rows);else renderGaps(rows);}
}
function upgrades(h,r){
  const options=[];const add=(name,p,note)=>{const next=forecast(h,p);options.push({name,p,note,value:next.mean.dps,gain:next.mean.dps/r.mean.dps-1});};
  if(state.p.level<F.level.length)add('전투 레벨 +10',{...state.p,level:Math.min(F.level.length,state.p.level+10)},`레벨 ${Math.min(F.level.length,state.p.level+10)}`);
  if(state.p.star<h.max_star)add('별 +1',{...state.p,star:state.p.star+1},`★${state.p.star+1}`);
  if(state.p.awaken<h.awaken_cap&&state.p.star===h.max_star)add('각성 +1',{...state.p,awaken:state.p.awaken+1},`${state.p.awaken+1}단계`);
  if(state.gearPreset>=0&&state.gearPreset<4)add('장비 다음 프리셋',{...state.p,gear:makeGear(state.gearPreset+1,h)},['','초반 · 희귀','중반 · 영웅','후반 · 전설','최고 신화'][state.gearPreset+1]);
  if(state.gearPreset===-1&&state.p.gear.some(it=>it.t<4))add('장비 단계 +1',{...state.p,gear:state.p.gear.map(it=>({...it,t:Math.min(4,it.t+1)}))},'장착한 부위의 단계 상승');
  options.sort((a,b)=>b.gain-a.gain);
  $('upgrades').innerHTML=options.map((o,i)=>`<div class="upgrade"><span class="rank">${i+1}</span><div><b>${o.name}</b><small>${o.note} · 종합 ${fmt(o.value)}</small></div><strong>${pc(o.gain*100)}</strong></div>`).join('')+(state.p.star<h.max_star?'<p class="fine">각성은 최대 별 달성 후 다음 성장 후보에 포함됩니다.</p>':'')+'<p class="fine">순수 화력 증가순 · 재화 비용은 비교하지 않습니다.</p>';
}
function pins(){
  $('pin-count').textContent=`${state.pins.length} / 4`;
  $('compare-cards').innerHTML=state.pins.length?state.pins.map((pin,i)=>{const h=hero(pin.hero),r=forecast(h,pin.p);return `<article class="compare-card" style="--pin:${pinColors[i]}"><img src="${portrait(h)}" alt="${h.name} 초상"><h3>${h.name}</h3><p>${h.tier} · 레벨 ${pin.p.level}<br>★${r.stats.star} / 각성 ${r.stats.awaken}</p><strong>${fmt(r.mean.dps)}</strong><p>보스 ${fmt(r.A.dps)}<br>무리 ${fmt(r.B.dps)}</p><button type="button" data-load="${i}">불러오기</button> <button type="button" data-remove="${i}" aria-label="${h.name} 비교에서 빼기">빼기</button></article>`;}).join(''):'<div class="empty">아이와 성장을 고른 뒤 「비교에 담기」를 누르세요. 같은 아이의 서로 다른 설정도 4개까지 비교할 수 있어요.</div>';
  document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{state.pins.splice(+b.dataset.remove,1);sync();render();});
  document.querySelectorAll('[data-load]').forEach(b=>b.onclick=()=>{const pin=state.pins[+b.dataset.load];state.hero=pin.hero;state.p=clone(pin.p);state.gearPreset=-1;state.growthPreset='none';capped();sync();gearAdvanced();picker();render();});
}
function chart(){
  const cvs=$('level-chart'),rect=cvs.getBoundingClientRect();if(!rect.width)return;
  const ratio=devicePixelRatio||1,w=rect.width,h=rect.height;cvs.width=w*ratio;cvs.height=h*ratio;const c=cvs.getContext('2d');c.scale(ratio,ratio);
  const selected=hero(state.hero),max=state.chartMax,levels=Array.from({length:41},(_,i)=>Math.round(1+(max-1)*i/40));
  const setups=state.chart==='tiers'?tiers.map(t=>({group:D.heroes.filter(h=>h.tier===t),p:state.p,name:t+' 평균',color:colors[t]})).filter(s=>s.group.length):state.chart==='pins'&&state.pins.length?state.pins.map((p,i)=>({...p,name:hero(p.hero).name+' · 설정 '+(i+1),color:pinColors[i]})):
    Array.from({length:selected.awaken_cap+1},(_,a)=>({hero:selected.id,p:{...state.p,awaken:a},name:a?'각성 '+a+'단계':'각성 없음',color:['#817789','#6850bb','#2877a2','#aa6b15','#bb437e','#288272'][a]}));
  const series=setups.map(s=>({...s,values:levels.map(level=>s.group?s.group.reduce((sum,h)=>sum+forecast(h,{...s.p,level})[state.scenario].dps,0)/s.group.length:forecast(hero(s.hero),{...s.p,level})[state.scenario].dps)}));
  const ymax=Math.max(1,...series.flatMap(s=>s.values))*1.08,L=w<400?49:63,R=w-13,T=16,B=h-34,x=v=>L+(v-1)/(max-1)*(R-L),y=v=>B-v/ymax*(B-T);
  c.font='11px sans-serif';c.textBaseline='middle';
  for(let i=0;i<=4;i++){const v=ymax*i/4;c.strokeStyle='#e4dcec';c.beginPath();c.moveTo(L,y(v));c.lineTo(R,y(v));c.stroke();c.fillStyle='#645b77';c.textAlign='right';c.fillText(fmt(v),L-6,y(v));}
  for(const lv of [1,Math.round(max/2),max]){c.textAlign=lv===max?'right':lv===1?'left':'center';c.fillText('레벨 '+lv,x(lv),h-13);}
  for(const s of series){c.strokeStyle=s.color;c.lineWidth=state.chart==='awaken'&&s.p.awaken===state.p.awaken?3:1.8;c.beginPath();s.values.forEach((v,i)=>i?c.lineTo(x(levels[i]),y(v)):c.moveTo(x(levels[i]),y(v)));c.stroke();}
  $('chart-legend').innerHTML=series.map(s=>`<span><i class="dot" style="background:${s.color}"></i>${s.name}</span>`).join('');
  $('chart-note').textContent=state.chart==='tiers'?'공통 성장 설정에서 등급별 전체 아이의 평균 DPS입니다. 전투 레벨만 바꿉니다.':state.chart==='pins'&&state.pins.length?'담아 둔 성장 설정은 고정하고 전투 레벨만 바꿔 비교합니다.':'각성은 필요한 최대 별 조건을 포함합니다. 선택한 각성 단계는 굵은 선입니다.';
}
function rosterProfile(h){
  if(state.rosterSetup==='current')return state.p;
  const preset=P.presets.find(p=>p.key===state.rosterSetup);
  return preset?{...G.defaultProfile(),...preset.shared,...(preset.heroes[h.id]||{star:1,permanent:1})}:G.defaultProfile();
}
function rosterResults(){return D.heroes.map(h=>({h,r:state.rosterSetup==='baseline'?G.measured(h):forecast(h,rosterProfile(h))}));}
function renderRosterSetup(rows){
  const preset=P.presets.find(p=>p.key===state.rosterSetup),p=state.p,label={mean:'종합',A:'보스',B:'무리'}[state.scenario];
  $('roster-setup').textContent=state.rosterSetup==='current'?`직접 설정: 전투 레벨 ${p.level} · 별 ${p.star} · 각성 ${p.awaken} · 영구 레벨 ${p.permanent}`:preset?`${preset.label} · 실제 시뮬레이션 ${preset.simulated_day}일 시점 · 아이별 성장 기록`:'성장 전 기준: 전원 ★1 · 전투 레벨 1 · 각성 0 · 영구 레벨 1 · 장비 없음';
  $('roster-note').textContent=(preset?'날짜 프리셋은 아이마다 다른 별·영구 레벨을 반영합니다. 투자한 S가 미성장 SS를 앞서는 역전은 의도한 성장입니다. 미보유 아이는 초기 성장으로 계산하며 날짜별 도달을 보장하지 않습니다.':'등급 순서는 성장 전과 동일 성장 조건의 보스·잡몹·종합에서 검사합니다. 전체 명단과 격차 보기는 같은 설정을 공유하며 직접 설정은 「아이 성장」에서 조절하세요.')+' 성장 전은 300초 실제 적중의 기대 DPS, 그 외는 치명타 기댓값을 쓴 예측입니다. 한 시드의 치명타 운은 등급 예산에 넣지 않습니다.';
  const summary=window.RosterGaps.summarize(rows,tiers,roles,state.scenario);
  $('band-summary').innerHTML=summary.bands.map(b=>`<div style="--tier:${colors[b.tier]}"><b>${b.tier} · ${label}</b>${fmt(b.min)}–${fmt(b.max)}</div>`).join('');
}
function renderRoster(rows=rosterResults()){
  const metric=state.scenario,max=Math.max(...rows.map(x=>x.r[metric].dps));
  $('roster-bars-title').textContent=`등급별 ${ {mean:'종합',A:'보스',B:'무리'}[metric]} 피해 밴드`;
  let bars='',table='';for(const tier of tiers){
    const xs=rows.filter(x=>x.h.tier===tier);if(!xs.length)continue;
    const sorted=[...xs].sort((a,b)=>{if(sort.key==='name'||sort.key==='role')return a.h[sort.key].localeCompare(b.h[sort.key],'ko')*sort.direction;return(a.r[sort.key].dps-b.r[sort.key].dps)*sort.direction;});
    const avg=xs.reduce((s,x)=>s+x.r[metric].dps,0)/xs.length;
    bars+=`<div class="band-title" style="--tier:${colors[tier]}">${tier} · ${xs.length}명 · 평균 ${fmt(avg)}</div>`;
    bars+=[...xs].sort((a,b)=>b.r[metric].dps-a.r[metric].dps).map(({h,r})=>`<div class="roster-row" style="--tier:${colors[tier]}"><div class="who">${face(h)}<div>${h.name}<br><small>${chip(h)} ${h.role}</small></div></div><div class="track"><div class="fill" style="width:${100*r[metric].dps/max}%"></div></div><div class="value">${fmt(r[metric].dps)}</div></div>`).join('');
    table+=`<tr class="band" style="--tier:${colors[tier]}"><th colspan="5" scope="rowgroup">${tier} · 평균 ${fmt(avg)}</th></tr>`+sorted.map(({h,r})=>`<tr><td><span class="who">${face(h)}${h.name}</span></td><td>${chip(h)} ${h.role}</td><td>${fmt(r.A.dps)}</td><td>${fmt(r.B.dps)}</td><td><b>${fmt(r.mean.dps)}</b></td></tr>`).join('');
  }$('roster-bars').innerHTML=bars;$('roster-table').innerHTML=table;
}
function renderGaps(rows){
  const summary=window.RosterGaps.summarize(rows,tiers,roles,state.scenario),{ranked,bands,max}=summary;
  const metric=state.scenario,rk=state.rank,label={mean:'종합',A:'보스',B:'잡몹'}[metric],width=v=>100*v/max;
  const opt=(k,v,text,cur)=>`<button type="button" data-k="${k}" data-v="${v}" aria-pressed="${cur===v}">${text}</button>`;
  const group=(title,k,items,cur)=>`<div class="rank-filter"><span>${title}</span><div class="chips">${items.map(([v,t])=>opt(k,v,t,cur)).join('')}</div></div>`;
  $('rank-controls').innerHTML=group('피해 기준','scenario',[['A','보스 DPS'],['B','잡몹 DPS'],['mean','종합 DPS']],metric)+group('묶기','group',[['all','전체 순위'],['tier','등급별'],['role','역할별']],rk.group)
    +group('등급','tier',[['all','전체'],...tiers.map(t=>[t,t])],rk.tier)+group('역할','role',[['all','전체'],...roles.map(r=>[r,r.replace(' 딜러','')])],rk.role)+group('속성','element',[['all','전체'],...Object.entries(elements)],rk.element);
  const shown=ranked.filter(({h})=>(rk.tier==='all'||h.tier===rk.tier)&&(rk.role==='all'||h.role===rk.role)&&(rk.element==='all'||h.element===rk.element));
  const keyOf=h=>rk.group==='tier'?h.tier:rk.group==='role'?h.role:'',order=rk.group==='tier'?tiers:rk.group==='role'?roles:[''];
  const shares=v=>channels.map(k=>100*v[k]/v.dps);
  $('rank-title').textContent=`${shown.length}명 ${label} DPS 순위`;
  $('rank-legend').innerHTML=channels.map(k=>`<span><i class="dot" style="background:var(--${k})"></i>${channelNames[k]}</span>`).join('')+bands.map(b=>`<span><i class="guide-key" style="--tier:${colors[b.tier]}"></i>${b.tier} 평균 ${fmt(b.avg)}</span>`).join('');
  let bars='';
  for(const g of order){
    const members=shown.filter(x=>keyOf(x.h)===g);if(!members.length)continue;
    if(g){const sum=k=>members.reduce((s,x)=>s+x.r[metric][k],0),avgShare=shares(Object.fromEntries([...channels,'dps'].map(k=>[k,sum(k)])));
      bars+=`<div class="rank-separator" style="--tier:${rk.group==='tier'?colors[g]:'var(--purple)'}"><b>${rk.group==='tier'?g+' 등급':g}</b><small>${members.length}명 · 평균 ${fmt(sum('dps')/members.length)} · 평타 ${avgShare[0].toFixed(0)}% · 스킬 ${avgShare[1].toFixed(0)}% · 궁극기 ${avgShare[2].toFixed(0)}%</small></div>`;}
    bars+=members.map(({h,r},i)=>{const v=r[metric],sh=shares(v);return `<div class="ranking-row" data-hero="${h.id}" data-value="${v.dps}" style="--tier:${colors[h.tier]}"><span class="rank-number">${i+1}</span><div class="rank-name">${face(h)}<div><b>${h.name}</b><small>${chip(h)} ${h.tier} · ${h.role.replace(' 딜러','')}</small></div></div><div class="rank-track rank-stack" role="img" aria-label="${channels.map((k,j)=>`${channelNames[k]} ${fmt(v[k])} (${sh[j].toFixed(1)}%)`).join(', ')}" title="${channels.map((k,j)=>`${channelNames[k]} ${fmt(v[k])} (${sh[j].toFixed(1)}%)`).join(' · ')}">${channels.map(k=>`<span style="width:${width(v[k])}%;background:var(--${k})"></span>`).join('')}</div><span class="rank-value">${fmt(v.dps)}<small>${sh.map(x=>x.toFixed(0)).join(' · ')}</small></span></div>`;}).join('');
  }
  if(!shown.length)bars='<p class="rank-empty">조건에 맞는 아이가 없어요. 필터를 바꿔 보세요.</p>';
  $('gap-ranked').innerHTML=`<div class="rank-axis"><span class="rank-axis-title">순위 · 아이</span><div class="rank-axis-ticks">${[0,.25,.5,.75,1].map(n=>`<span style="left:${n*100}%">${fmt(n*max)}</span>`).join('')}</div><span class="rank-value">${label} DPS</span></div><div class="rank-list"><div class="rank-guides" aria-hidden="true">${bands.map(b=>`<i class="rank-guide" style="left:${width(b.avg)}%;--tier:${colors[b.tier]}"></i>`).join('')}</div>${bars}</div>`;
  $('matrix-scale').textContent=`모든 칸 같은 눈금: 0–${fmt(max)} ${label} DPS · 굵은 숫자와 점은 평균, 선은 최소–최대입니다.`;
  $('range-matrix').innerHTML=`<div class="matrix-head"><span>등급</span>${roles.map(r=>`<span>${r.replace(' 딜러','')}</span>`).join('')}</div>`+bands.map(b=>`<div class="matrix-row" data-tier="${b.tier}" style="--tier:${colors[b.tier]}"><div class="matrix-tier">${b.tier}</div>${b.groups.map(g=>`<div class="range-cell" data-role="${g.role}"><span class="range-role">${g.role}</span>${g.count?`<div class="range-average">${fmt(g.avg)}</div><div class="range-rail" aria-hidden="true"><span class="range-span" style="left:${width(g.min)}%;width:${width(g.max-g.min)}%"></span><span class="range-dot" style="left:${width(g.avg)}%"></span></div><div class="range-extents">${fmt(g.min)}–${fmt(g.max)} · ${g.count}명</div>`:'<div class="range-empty">해당 아이 없음</div>'}</div>`).join('')}</div>`).join('');
  const ratioMax=Math.max(...bands.map(b=>b.ratio));
  $('tier-ratios').innerHTML=bands.map(b=>`<div class="ratio-row" data-tier="${b.tier}" data-ratio="${b.ratio}" style="--tier:${colors[b.tier]}"><div class="ratio-label"><b>${b.tier}</b><strong>${b.ratio.toFixed(2)}<small> 배</small></strong></div><div class="ratio-track"><div class="ratio-fill" style="width:${100*b.ratio/ratioMax}%"></div><i class="ratio-reference" style="left:${100/ratioMax}%" aria-hidden="true"></i></div><div class="ratio-caption">평균 ${fmt(b.avg)} DPS</div></div>`).join('');
  const ss=bands.find(b=>b.tier==='SS'),s=bands.find(b=>b.tier==='S'),a=bands.find(b=>b.tier==='A'),gap=ss.min-s.max;
  $('gap-story').innerHTML=`<b>SS–S 평균 차이 ${fmt(ss.avg-s.avg)}</b><br>SS 최하위 − S 최상위: ${fmt(gap)} DPS${gap<0?' · 밴드 겹침':''}<br>기준 딜러 척도: 신화 1.30 · SS 1.00 · S 0.78 · A 0.61 · B 0.48<br>날짜 프리셋은 서로 다른 투자량 때문에 역전될 수 있습니다.`;
}
function evidence(){
  $('forecast-note').textContent=`정수 시전·치명타 기댓값 예측 · 독립 검증 기대 DPS 최대 오차 ${Math.max(...D.validation_metrics.map(x=>x.max)).toFixed(2)}% · 공격력 산식은 실제 게임과 일치`;
  $('accuracy').innerHTML=D.validation_metrics.map(v=>`<tr><td>레벨 ${v.level} · 각성 ${v.awaken}</td><td>${v.mean.toFixed(2)}%</td><td>${v.max.toFixed(2)}%</td><td>${v.share.toFixed(2)}%p</td></tr>`).join('');
  $('accuracy-summary').textContent=`독립 전투 ${D.validation_metrics.reduce((s,x)=>s+x.rows,0)}환경 검증. 공격력·쿨타임은 실제 함수와 일치합니다. 기대 DPS 최대 오차 ${Math.max(...D.validation_metrics.map(x=>x.max)).toFixed(2)}%, 치명타 확률에 따른 원래 표본과의 최대 차이 ${Math.max(...D.validation_metrics.map(x=>x.sample)).toFixed(2)}%입니다. 모든 성장 조합의 오차 상한은 아닙니다.`;
  $('data-note').textContent=`${D.heroes.length}명 × 2환경 × ${D.seconds}초 · 성장 전 기준과 각성 응답 실측`;
}
window.addEventListener('hashchange',()=>{restore();capped();sync();gearAdvanced();picker();render();});
capped();sync();gearAdvanced();picker();evidence();render();new ResizeObserver(()=>{if(state.view==='hero')chart();}).observe($('level-chart'));
