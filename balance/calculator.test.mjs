import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {bands,violations} from './balance.mjs';
const context={window:{}};
vm.createContext(context);
for(const file of ['data.js','calculator.js','gaps.js'])vm.runInContext(fs.readFileSync(new URL(file,import.meta.url),'utf8'),context);
const {DPS_DATA:data,Growth:g}=context.window;
const channels=['basic','skill','ult'];
test('baseline has tier and mirrored role bands, tight groups and 20/40/40 in both target views',()=>{
  const summary=bands(data.heroes,h=>g.measured(h),data.formulas.tier_order);
  assert.deepEqual(violations(summary,data.formulas.balance),[]);
  for(const h of data.heroes)for(const scenario of ['A','B']){
    const r=g.measured(h)[scenario];
    channels.forEach((ch,i)=>assert.ok(Math.abs(r[ch]/r.dps*100-[20,40,40][i])<=5,`${h.id} ${scenario} ${ch}`));
  }
});
test('equal-growth profiles preserve tier bands, role order and tight peer groups in all views',()=>{
  const profiles=data.validations.filter(s=>s.profile.uniform);
  assert.ok(profiles.length>=2,'two uniform profiles');
  for(const sample of profiles){
    const summary=bands(data.heroes,h=>g.calculate(h,sample.profile,data),data.formulas.tier_order);
    assert.deepEqual(violations(summary,data.formulas.balance,false),[],`Lv${sample.profile.level}`);
    const native=bands(data.heroes,h=>g.measured({...h,
      A:sample.rows.find(r=>r.id===h.id&&r.scenario==='A'),
      B:sample.rows.find(r=>r.id===h.id&&r.scenario==='B')}),data.formulas.tier_order);
    assert.deepEqual(violations(native,data.formulas.balance,false),[],`native Lv${sample.profile.level}`);
  }
});
test('growth attack and cooldown agree with independent native probes',()=>{
  assert.ok(data.validations.length>=3,'three independent growth profiles');
  for(const sample of data.validations)for(const row of sample.rows){
    const h=data.heroes.find(h=>h.id===row.id),r=g.calculate(h,sample.profile,data);
    assert.ok(Math.abs(r.stats.attack/row.attack-1)<1e-9,`${row.id} attack: ${r.stats.attack} vs ${row.attack}`);
    assert.ok(Math.abs(r.stats.cooldown-row.cooldown_mult)<1e-9,`${row.id} cooldown`);
    assert.ok(Math.abs(r[row.scenario].dps/row.expected_dps-1)<=.05,
      `${row.id} ${row.scenario} Lv${sample.profile.level} awakening ${sample.profile.awaken}: forecast ${r[row.scenario].dps}, native expected ${row.expected_dps}`);
    for(const count of Object.values(r[row.scenario].casts))assert.ok(Number.isInteger(count)&&count>=0,'casts within the measurement window are discrete');
    if(row.id==='marin'&&sample.profile.awaken===5)assert.equal(r[row.scenario].casts.ult,row.ult_casts,'Marin evolved ultimate uses observed integer casts, not a fractional cooldown ratio');
    for(const s of ['A','B'])for(const ch of channels)assert.ok(Number.isFinite(r[s][ch])&&r[s][ch]>0);
  }
});
test('all supported awakening steps and tier caps produce finite forecasts',()=>{
  for(const hero of data.heroes)for(let awaken=0;awaken<=data.formulas.awaken.steps;awaken++){
    const r=g.calculate(hero,{level:200,star:6,awaken,permanent:60},data);
    assert.equal(r.stats.awaken,Math.min(awaken,hero.awaken_cap));
    assert.ok(Number.isFinite(r.mean.dps)&&r.mean.dps>0);
  }
});
test('gap view summarizes real ranking, role ranges and SS-normalized averages without inventing empty groups',()=>{
  const fixture=[['신화','광역',480,60],['SS','단일',300,100],['SS','단일',200,70],['SS','지원',250,30],['S','단일',150,120],['S','광역',50,200]];
  const rows=fixture.map(([tier,role,dps,boss],i)=>({h:{id:String(i),name:String(i),tier,role},r:{mean:{dps},A:{dps:boss}}}));
  const result=context.window.RosterGaps.summarize(rows,['신화','SS','S'],['광역','단일','지원','수호'],'mean');
  assert.deepEqual(Array.from(result.ranked,x=>x.h.id),['0','1','3','2','4','5']);
  assert.deepEqual(Array.from(result.bands,b=>b.ratio),[1.92,1,.4]);
  const single=result.bands[1].groups[1];
  assert.deepEqual([single.min,single.avg,single.max,single.count],[200,250,300,2]);
  assert.equal(result.bands[0].groups[3].avg,null);
  const boss=context.window.RosterGaps.summarize(rows,['신화','SS','S'],['광역','단일','지원','수호'],'A');
  assert.deepEqual(Array.from(boss.ranked,x=>x.h.id),['5','4','1','2','0','3']);
});
