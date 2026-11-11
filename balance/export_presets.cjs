const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {run}=require('../../tools/balance_sim.js');
const presets=[];
for(const kind of ['f2p','whale'])for(const day of [1,7,30,60]){
  const {s,doneDay}=run(kind,day);
  presets.push({key:`${kind}-${day}`,label:`${day}일차 ${kind==='f2p'?'무과금':'과금'}`,day,simulated_day:s.day,clear_day:doneDay,
    heroes:Object.fromEntries(Object.entries(s.owned).map(([id,h])=>[id,{star:h.star,permanent:h.lv}])),
    shared:{research_element:s.research.element,research_dealer:s.research.dealer,gym:s.rooms.gym,gear_codex:Math.floor(s.gearCodex)},
    gear_summary:{grade:s.gearGrade,step:s.gearTier,enhance:s.gearLevel,copies:s.gearCopies}});
}
const file=path.resolve(__dirname,'../../tools/balance_sim.js');
const sourceHashes={};
for(const relative of ['tools/balance_sim.js','scripts/game_data.gd','scripts/main.gd','scripts/gear.gd','scripts/hero_codex.gd','scripts/adventure.gd','docs/balance/dps.csv'])
  sourceHashes[relative]=crypto.createHash('sha256').update(fs.readFileSync(path.resolve(__dirname,'../..',relative))).digest('hex');
fs.writeFileSync(path.join(__dirname,'presets.js'),'window.PACING_PRESETS='+JSON.stringify({
  source:'tools/balance_sim.js',sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),source_hashes:sourceHashes,presets,
  note:'분교 연구·체육관·장비 도감과 해당 아이의 별·영구 레벨을 적용합니다. 미보유 아이는 ★1·영구 1로 표시합니다. 전투 레벨·심장·장비·각성은 별도 설정이며 계정 전체 단합/항해사 보너스는 포함하지 않습니다. 날짜별 도달 보장이 아닌 경제 시뮬레이션 예시입니다.'
})+';\n');
console.log(presets.map(p=>({label:p.label,day:p.simulated_day,heroes:Object.keys(p.heroes).length,gear:p.gear_summary})));
