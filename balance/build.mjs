import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {verifySources} from '../../tools/probe_sources.mjs';
import {bands as summarizeBands,violations as bandViolations,tables as bandTables,views} from './balance.mjs';
const approvedVisualPass = process.argv.includes('--approved-visual-pass');
const approvedSimLoader = process.argv.includes('--approved-sim-loader');
const [mode, baselinePath, rawPath, ...validationPaths] = process.argv.slice(2).filter(arg=>!['--approved-visual-pass','--approved-sim-loader'].includes(arg));
const csv = text => {
  const lines = text.trim().split(/\r?\n/), keys = lines.shift().split(',');
  return lines.map(line => Object.fromEntries(line.split(',').map((v, i) => [keys[i], v !== '' && Number.isFinite(+v) ? +v : v])));
};
const baseline = csv(fs.readFileSync(baselinePath, 'utf8'));
const raw = JSON.parse(fs.readFileSync(rawPath, 'utf8'));
const tiers = ['신화', 'SS', 'S', 'A', 'B'].filter(t=>raw.rows.some(r=>r.tier===t)), channels = ['basic', 'skill', 'ult'];
const mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;
const oldMeans = Object.fromEntries(tiers.map(t => [t, baseline.some(h=>h.tier===t)?mean(baseline.filter(h => h.tier === t).map(h => h.dps)):null]));
const heroes = raw.formulas.heroes.filter(h => tiers.includes(h.tier)).map(h => ({
  ...h, A: raw.rows.find(r => r.id === h.id && r.scenario === 'A'),
  B: raw.rows.find(r => r.id === h.id && r.scenario === 'B')
})).filter(h => h.A && h.B);
function addCadence(row) {
  row.cadence={};
  for(const [channel,index] of [['skill',1],['ult',2]]){
    const casts=row.casts[index],events=row.events[index],hits=casts.map(()=>[]);
    let cast=0;
    for(const [time,damage] of events){
      while(cast+1<casts.length&&casts[cast+1]<=time)cast++;
      hits[cast].push([time-casts[cast],damage]);
    }
    const end=Math.max(...hits.flatMap(xs=>xs.map(x=>x[0])));
    const complete=hits.filter((_,i)=>casts[i]+end<=row.seconds),pulses=new Map();
    for(const xs of complete)for(const [delay,damage] of xs){
      const key=delay.toFixed(6);
      pulses.set(key,(pulses.get(key)||0)+damage/complete.length);
    }
    row.cadence[channel]={first:casts[0],interval:(casts.at(-1)-casts[0])/(casts.length-1),
      end,pulses:[...pulses].map(([delay,damage])=>[+delay,damage]),full:[...pulses.values()].reduce((s,v)=>s+v,0)};
  }
  delete row.casts;delete row.events;
}
if (mode === 'tune') {
  const policy=raw.formulas.balance;
  console.log('const IMPACT := {');
  const tuningHeroes=validationPaths.length?heroes.filter(h=>validationPaths[0].split(',').includes(h.id)):heroes;
  for (const h of tuningHeroes) {
    const peers = heroes.filter(p => p.tier === h.tier && p.kit === h.kit).sort((a,b) => a.id.localeCompare(b.id));
    const spread=peers.length===1?1:1-policy.spread+policy.spread*peers.findIndex(p=>p.id===h.id)/(peers.length-1);
    const shares=policy.shares?.[h.id]||[.2,.4,.4];
    const scales=['A','B'].map((scenario,s)=>channels.map((ch,c)=>h.impact[s][c]*policy.anchor*policy.tiers[h.tier]*policy.roles[scenario][h.kit]*spread*shares[c]/h[scenario]['expected_'+ch+'_dps']));
    console.log(`\t"${h.id}": [${scales.map(xs=>'['+xs.map(v=>v.toFixed(9)).join(', ')+']').join(', ')}],`);
  }
  console.log('}');
} else if (mode === 'refresh') {
  // Partial VFX probes must not replace the other 60 heroes or relabel archived growth samples.
  const destination=path.join(import.meta.dirname,'data.js'),context={window:{}};
  vm.runInNewContext(fs.readFileSync(destination,'utf8'),context);
  const data=context.window.DPS_DATA;
  for(const row of raw.rows){
    addCadence(row);
    const h=data.heroes.find(h=>h.id===row.id),previous=h[row.scenario];
    for(const channel of ['skill','ult']){
      const a=previous.cadence[channel],b=row.cadence[channel];
      if(Math.abs(a.first-b.first)>1e-6||Math.abs(a.interval-b.interval)>1e-6||
        a.pulses.length!==b.pulses.length||a.pulses.some(([delay,damage],i)=>
          Math.abs(delay-b.pulses[i][0])>1e-6||Math.abs(damage/b.pulses[i][1]-1)>1e-6)){
        throw new Error(`${row.id} ${row.scenario} ${channel}: timing/power changed; full growth probes required`);
      }
    }
    h[row.scenario]=row;
  }
  for(const file of ['fx_mythic','fx_tier']){
    const key=`res://scripts/${file}.gd`;
    data.source_hashes[key]=raw.source_hashes[key];
  }
  fs.writeFileSync(destination,`window.DPS_DATA=${JSON.stringify(data)};\n`);
  console.log(`Refreshed ${raw.rows.length} native rows; aggregate impact timing/power unchanged; archived growth provenance retained.`);
} else if (mode === 'build') {
  const root = path.resolve(import.meta.dirname, '../..');
  raw.formulas.cadence=JSON.parse(fs.readFileSync(validationPaths.shift(),'utf8'));
  const samples = validationPaths.map(p => JSON.parse(fs.readFileSync(p, 'utf8')));
  const visualSourceChanges=[],simulationLoaderChanges=[];
  for(const sample of [raw,...samples]){
    const provenance=verifySources(sample,root,approvedVisualPass,approvedSimLoader);
    if(provenance.errors.length)throw new Error(provenance.errors.join('; '));
    visualSourceChanges.push(...provenance.visualChanges);
    simulationLoaderChanges.push(...provenance.simulationLoaderChanges);
  }
  const validation = samples.filter(v => !v.profile.response);
  for(const sample of [raw,...samples])for(const row of sample.rows)addCadence(row);
  const data = {heroes, formulas: raw.formulas, baseline: oldMeans, source_hashes: raw.source_hashes,
    seconds: raw.seconds, seed: raw.seed, visual_source_changes:visualSourceChanges,
    simulation_loader_changes:simulationLoaderChanges,
    responses: samples.filter(v => v.profile.response).map(v => ({profile: v.profile, rows: v.rows, source_hashes:v.source_hashes})),
    validations: validation.map(v => ({profile: v.profile, rows: v.rows, source_hashes: v.source_hashes}))};
  const calcContext={window:{}};
  vm.createContext(calcContext);
  vm.runInContext(fs.readFileSync(path.join(import.meta.dirname,'calculator.js'),'utf8'),calcContext);
  const validationMetrics=validation.map(v=>{
    const errors=[],sampleErrors=[],shareErrors=[],attackErrors=[];
    for(const row of v.rows){
      const h=heroes.find(h=>h.id===row.id),r=calcContext.window.Growth.calculate(h,v.profile,data),s=r[row.scenario];
      errors.push(Math.abs(s.dps/row.expected_dps-1)*100);
      sampleErrors.push(Math.abs(s.dps/row.dps-1)*100);
      attackErrors.push(Math.abs(r.stats.attack/row.attack-1)*100);
      channels.forEach(ch=>shareErrors.push(Math.abs(s[ch]/s.dps*100-row['expected_'+ch+'_dps']/row.expected_dps*100)));
    }
    return {level:v.profile.level,awaken:v.profile.awaken,rows:v.rows.length,mean:mean(errors),max:Math.max(...errors),
      sample:Math.max(...sampleErrors),share:Math.max(...shareErrors),attack:Math.max(...attackErrors)};
  });
  data.validation_metrics=validationMetrics;
  fs.writeFileSync(path.join(import.meta.dirname, 'data.js'), `window.DPS_DATA=${JSON.stringify(data)};\n`);
  fs.copyFileSync(path.join(path.dirname(rawPath), 'dps.csv'), path.join(root, 'docs/balance/dps.csv'));
  const bands = tiers.map(t => {
    const hs = heroes.filter(h => h.tier === t), values = hs.map(h => (h.A.expected_dps + h.B.expected_dps) / 2);
    return {tier: t, count: hs.length, avg: mean(values), min: Math.min(...values), max: Math.max(...values), delta: oldMeans[t]===null?null:(mean(values) / oldMeans[t] - 1) * 100};
  });
  const oldHeroes=[...new Set(baseline.map(r=>r.id))].map(id=>{
    const rows=baseline.filter(r=>r.id===id);return {...rows[0],value:mean(rows.map(r=>r.dps))};
  });
  const summary=summarizeBands(heroes,h=>calcContext.window.Growth.measured(h),tiers);
  const uniform=validation.filter(v=>v.profile.uniform).map(v=>({profile:v.profile,
    summary:summarizeBands(heroes,h=>calcContext.window.Growth.calculate(h,v.profile,data),tiers),
    native:summarizeBands(heroes,h=>calcContext.window.Growth.measured({...h,
      A:v.rows.find(r=>r.id===h.id&&r.scenario==='A'),B:v.rows.find(r=>r.id===h.id&&r.scenario==='B')}),tiers)}));
  const rosterBefore=mean(oldHeroes.map(h=>h.value)),rosterAfter=mean(heroes.map(h=>(h.A.expected_dps+h.B.expected_dps)/2));
  const old60=mean(oldHeroes.filter(h=>h.tier!=='신화').map(h=>h.value)),new60=mean(heroes.filter(h=>h.tier!=='신화').map(h=>(h.A.expected_dps+h.B.expected_dps)/2));
  const violations = bandViolations(summary,raw.formulas.balance);
  for (const h of heroes) {
    for(const scenario of ['A','B']){
      const r=h[scenario];
      channels.forEach((c,i)=>{if(Math.abs(r['expected_'+c+'_dps']/r.expected_dps*100-[20,40,40][i])>5)violations.push(`${h.id} ${scenario} ${c} share`);});
    }
  }
  for(const u of uniform){
    violations.push(...bandViolations(u.summary,raw.formulas.balance,false).map(s=>`Lv${u.profile.level} prediction ${s}`));
    violations.push(...bandViolations(u.native,raw.formulas.balance,false).map(s=>`Lv${u.profile.level} native ${s}`));
  }
  for(const v of validationMetrics)if(v.max>5)violations.push(`Lv${v.level} awakening ${v.awaken} calculator error ${v.max.toFixed(2)}%`);
  const f = x => x===null?'신규':x.toFixed(2);
  const lines = [
    '# 구름고래 분교 — 피해 밴드·성장 계산기', '',
    `- 실측: ${heroes.length}명 × A/B × ${raw.seconds}초, seed ${raw.seed}. 실제 Hero/Enemy/Projectile/FxTier/FxSig 실행.`,
    '- A: 중립 보스 1개. B: 중립 적 6개. 종합=(A+B)/2. 기본 레벨 1, ★1, 각성 0, 영구 레벨 1, 장비 없음.',
    '- 분배 평가 환경: 전원 A와 B 각각. 목표 20/40/40%, 허용 ±5%p. 이동·피격·컷인·도착 피해 포함. 엄격한 등급·동일 역할 밴드는 실제 적중의 치명 배율을 제거하고 확률을 적용한 실측 기대 DPS로 판정한다. 한 시드의 치명 운을 기본 능력치로 굳히지 않는다.',
    '- CSV/JSON의 dps·basic_dps 등은 원래 확률 표본을 그대로 보존한다. expected_dps·expected_*_dps가 밴드/분배 표의 기준이다. Q9 등가 전력은 이와 별도로 실제 유무 비교의 5개 시드 평균이며 기대값으로 대체하지 않는다.',
    '- Q19: 이그니·윤슬을 포함해 전원 20/40/40이 목표다. 패시브를 포함한 실측으로 IMPACT를 다시 배분하며, 두 명만 분배를 바꾸던 예외는 사용하지 않는다. 각성 보스 패시브는 12.5→20%로 예산을 낮추고 60% 상한은 유지한다.',
    '- 각성 2/4에는 전투 성장 예산(AWAKENING_DAMAGE)을 적용한다. 서로 다른 기술 박자·조건부 패시브의 성장을 보스/일반 적 각각 조정하며 등급별 종합 평균 피해를 보존한다. 기본 분배, 회복량, 무적과 시전 박자는 이 성장 배율로 바꾸지 않는다.',
    ...(visualSourceChanges.length?['- 측정 중 리드가 피해·타이밍 불변을 확인한 신화 시각 효과 작업이 겹쳤다. 승인된 두 시각 소스의 시작/종료/현재 해시는 data.js의 visual_source_changes에 보존하며, 그 외 전투 소스 해시 불일치는 빌드를 거부한다.']:[]),
    ...(simulationLoaderChanges.length?['- 리드의 배포용 시뮬 로더 변경(preload→load)만 별도 승인했다. 해당 두 줄을 정확히 역변환한 SHA-256이 측정 시작 해시와 같아야 하며 다른 main.gd 변경은 거부한다. 원본 해시는 simulation_loader_changes에 보존한다.']:[]),
    '- 본인 패시브는 실제 formation 멤버십으로 적용. 선두/후열/인접 보너스와 결속만 끈다. 재생은 실제 tick_regen 사용.',
    '- 보호막 회복은 5초마다 5%→각성3에서 3초마다 5%를 유지한다. 강화 폭발은 범위 외에 피해도 강화하고, 공속은 기본 공격 동작도 빨라지며 준비된 스킬을 평타보다 먼저 실행한다. 치명타 각성은 확률과 피해를 이중으로 올리지 않고 치명 피해만 강화한다.',
    '- 단일 키트의 폭발 범위·추가 분산탄을 제거하고 가장 강한 대상에게 집중. 불사조도 단일 대상에 집중.',
    '', '## 판정', '', violations.length ? `**미충족: ${violations.join('; ')}**` : '**PASS: 세 환경 등급 비중첩 / 기준 성장 역할 비율·그룹 편차 / 양 환경 분배 / 동일 성장 등급·역할 순서·그룹 편차.**',
    '', '## 페이싱 평균', '',
    `중간점 규칙을 폐기했다. 등급 척도는 신화/SS/S/A/B = 1.30/1.00/0.78/0.61/0.48이며, SS 종합 평균을 이전 수준에 두도록 유리 환경의 딜러 상한을 ${f(raw.formulas.balance.anchor)} DPS로 정했다. 역할 목표는 보스 단일/광역/지원/수호 = 100/90/85/80, 잡몹은 90/100/85/80이다. 전체 평균 변화량을 페이싱 재조정에 전달한다.`,
    '', '| 등급 | 인원 | 이전 평균 | 새 평균 | 등급 변화 | 전체 평균 증가 기여 | 최소–최대 |', '| --- | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...bands.map(b => `| ${b.tier} | ${b.count} | ${f(oldMeans[b.tier])} | ${f(b.avg)} | ${f(b.delta)}% | ${f(oldMeans[b.tier]===null?null:(b.avg-oldMeans[b.tier])*b.count/heroes.length/rosterBefore*100)}%p | ${f(b.min)}–${f(b.max)} |`),
    `\n63명 평균: ${f(rosterBefore)} → ${f(rosterAfter)} DPS (${((rosterAfter/rosterBefore-1)*100).toFixed(6)}%). 기존 60명 평균: ${f(old60)} → ${f(new60)} DPS (${f((new60/old60-1)*100)}%).`,
    '', '## 기준 성장 · 세 환경 등급×역할 및 밴드', '', ...bandTables(summary,f),
    '', '## 동일 성장 검증', '',
    '같은 입력을 전원에게 적용한다. 각성은 게임 규칙대로 최대 별을 요구하므로 유효 별은 신화/SS 6, S 5, A 4, B 3이며 영구 레벨도 별 상한으로 제한된다. 성장 후 분배·역할 간 비율은 실제 패시브/각성 효과를 유지하며 등급 비중첩, 역할 순서, 동일 등급·역할 그룹 편차를 검사한다. 날짜 프리셋은 각 아이의 투자량이 달라 역전될 수 있고 이는 의도한 성장이다.',
    ...uniform.flatMap(u=>[`### 전원 Lv.${u.profile.level} / 입력 ★${u.profile.star} / 각성 ${u.profile.awaken} / 영구 ${u.profile.permanent}`, '',`장비: \`${JSON.stringify(u.profile.gear||[])}\`. 아래 표는 전원 63명×A/B의 실제 300초 측정이다. 같은 입력의 계산기 예측도 세 환경 등급 순서를 별도로 검사한다.`,...bandTables(u.native,f)]),
    '', '## 전체 실측 기대 DPS · 분배 오차', '', '| 이름 | 등급 | 역할 | A | B | 종합 | A 평타/스킬/궁극% | B 평타/스킬/궁극% | 최대 오차%p |', '| --- | --- | --- | ---: | ---: | ---: | --- | --- | ---: |',
    ...[...heroes].sort((a,b)=>(b.A.expected_dps+b.B.expected_dps)-(a.A.expected_dps+a.B.expected_dps)).map(h => {
      const shares=s=>channels.map(c=>f(h[s]['expected_'+c+'_dps']/h[s].expected_dps*100)).join('/');
      const error=Math.max(...['A','B'].flatMap(s=>channels.map((c,i)=>Math.abs(h[s]['expected_'+c+'_dps']/h[s].expected_dps*100-[20,40,40][i]))));
      return `| ${h.name} (\`${h.id}\`) | ${h.tier} | ${h.role} | ${f(h.A.expected_dps)} | ${f(h.B.expected_dps)} | ${f((h.A.expected_dps+h.B.expected_dps)/2)} | ${shares('A')} | ${shares('B')} | ${f(error)} |`;
    }),
    '', '## 설명 정합', '',
    '- 유나: 4발 설명 → 실제 한 번의 광역 폭발. 마린: 당김 제거, 이동 물회오리 4타+끝자리 물보라.',
    '- 미오: 밀려가는 벽 피해·밀침 추가. 시엘: 광역 피해 추가. 단일 키트와 이그니는 단일 대상 설명으로 변경.',
    '- 설명의 기술 입력 배율은 등급 기술 계수×아이별 피해 계수×박자를 모두 곱한 뒤 한 번 반올림한다. 최종 적중 피해에는 대상(보스/일반)별 IMPACT, 상성, 치명타, 패시브가 별도 적용된다. 회복에는 박자만 적용한다.',
    '- 미오 7%→11.2%, 아리아 7%→4.76%의 실제 회복은 Lead가 의도한 지연 회복 박자 수정이며 되돌리지 않았다. 아리아 설명은 표시 정밀도에 따라 4.8%다.',
    '- 진화 마무리는 FxTier.ult의 단일 피해 계수 적용 뒤에 예약한다. 반경 0 기술 투사체는 Projectile.ability_hit에서 실제 명중 대상에게만 피해를 주며 미리보기도 같은 경로를 쓴다.',
    '', '## 성장 계산기', '',
    '`design/dps_view/index.html` — 네트워크 없는 로컬 페이지. 공격력은 실제 함수에서 내보낸 레벨·장비 주능력·분교 표와 게임 상수로 계산한다. 별·영구레벨·심장·단합·각성·성장 기록·장비 도감·세트·잠재·배치 효과를 분리한다.',
    '- PD 사용성 개편: 왼쪽 설정/오른쪽 큰 결과, 좁은 화면은 세로 배치. 한국어 도움말, 초상화·이름 검색·등급/역할/속성 필터, 상한이 적용되는 슬라이더/숫자 입력.',
    '- 장비 5프리셋+부위별 고급 설정, 경제 시뮬레이션의 무과금/과금 1·7·30·60일 성장 프리셋. 시뮬레이션이 조기 완주로 종료되면 실제 종료일을 표시하며 60일까지 성장한 것으로 가장하지 않는다. 장비·전투 레벨·심장·각성은 별도 설정이다.',
    '- 보스/무리/종합과 ★1 Lv1 대비 배율/증가율, 피해 구성/목표, 각성별 레벨 곡선, 다음 성장 순수 DPS 증가순, 최대 4설정 비교/공유 그래프, 63명 공통 설정 표/막대/등급 구획.',
    '- 선택과 설정·비교 항목은 URL 해시에 저장된다. `design/dps_view/screenshot.png`는 화면 캡처다. `design/dps_view/style.css`·`design/dps_view/viewer.js`는 표시/조작만 맡고 계산은 검증된 `design/dps_view/calculator.js`에 유지한다.',
    '- 격차 보기: 실제 DPS 내림차순 63명 막대와 등급 구분/평균 점선, 등급×역할 최소–평균–최대 행렬, SS=1 등급 평균 비율. 보스/무리/종합 전환과 ★1 Lv1·날짜 프리셋·직접 설정을 전체 명단과 공유한다. 보스·무리/성장 후 등급 혼합은 실제 순위대로 표시한다.',
    '- `design/dps_view/gaps.js`는 집계만, `gaps.css`는 격차 화면만 담당한다. 계산 공식은 변경하지 않았다. 캡처: `design/dps_view/gap-screenshot.png`.',
    '성장 전 전체 명단은 실제 300초 측정이다. 성장 예측은 치명타 기댓값을 사용한다. tools/dps_cadence.gd가 실제 Hero/기술을 실행해 초기 타이머, 공속별 동작 잠금, 기술 중 재동작 시점, 가속 배율·지속시간을 내보낸다. 계산기는 Hero의 준비된 스킬 → 평타 → 궁극기 순서와 가속 덮어쓰기 규칙을 프레임별로 재생한다. 300초 안의 정수 시전 횟수와 완결 시전의 실제 피해 펄스로 마지막 부분 시전을 계산한다.',
    '', '| 성장 프로브 | 환경 수 | 기대 DPS 평균 오차 | 기대 DPS 최대 오차 | 확률 표본 최대 오차 | 최대 구성 오차 | 최대 공격력 오차 |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...validationMetrics.map(v=>`| Lv.${v.level} / 각성 ${v.awaken} | ${v.rows} | ${f(v.mean)}% | ${f(v.max)}% | ${f(v.sample)}% | ${f(v.share)}%p | ${v.attack.toExponential(2)}% |`),
    '', '각성 0·3·5 응답과 독립 성장 3개 설정을 수정된 게임으로 재실행했다. 기대 DPS는 실제 적중 피해에서 실제 치명 배율을 제거한 뒤 해당 설정의 확률×치명 배율을 적용한 관측치다. 확률 표본은 정해진 seed에서 나온 원래 HP 감소량이며, 두 오차를 구분한다. 표본의 최대 오차가 모든 성장 조합의 상한은 아니다. 실전 처치·웨이브 공백·상성·팀 컷인 경쟁은 제외한다.',
    '', '## QA 반영 · 검증', '',
    `- 양 환경 전체 기대 분배 최대 오차: ${Math.max(...heroes.flatMap(h=>['A','B'].flatMap(s=>channels.map((ch,i)=>Math.abs(h[s]['expected_'+ch+'_dps']/h[s].expected_dps*100-[20,40,40][i]))))).toFixed(3)}%p. 세 환경 등급·역할·척도 판정은 위 판정란을 따른다.`,
    `- 최신 계수로 기본 ${raw.rows.length}환경, 응답 ${samples.filter(v=>v.profile.response).reduce((n,v)=>n+v.rows.length,0)}환경, 독립 성장 ${validation.reduce((n,v)=>n+v.rows.length,0)}환경을 완료했다. ${1+samples.length}개 실행의 시작/종료/현재 게임 소스 해시를 빌드 전에 비교한다.`,
    '- `tools/combat_coefficients_check.gd`: 수정 전 5검사 중 4실패 → 수정 후 5/5 통과. 진화 마무리 배율, 밀착한 적 두 마리에서 반경 0 스킬/궁극기의 단일 타격, 양의 반경 광역 보존, 툴팁 최종 한 번 반올림을 확인한다.',
    '- `design/dps_view/calculator.test.mjs`: 기본/동일 성장의 세 환경 등급 밴드, 역할 비율·그룹 편차, 공격력/쿨타임, 독립 기대 DPS 오차 5% 이내, 마린 정수 궁극기 횟수, 각성 상한, 격차 집계를 검사한다.',
    ...validation.flatMap(sample=>sample.rows.filter(row=>row.id==='marin'&&row.scenario==='A'&&sample.profile.awaken===5).map(row=>{
      const result=calcContext.window.Growth.calculate(heroes.find(h=>h.id==='marin'),sample.profile,data).A;
      return `- 마린 A Lv.${sample.profile.level} 각성5: 실제 확률 표본 ${f(row.dps)}, 관측 기대값 ${f(row.expected_dps)}, 예측 ${f(result.dps)} DPS. 궁극기 실측/예측 모두 ${row.ult_casts}회. 기대값 대비 ${f(Math.abs(result.dps/row.expected_dps-1)*100)}%, 확률 표본 대비 ${f(Math.abs(result.dps/row.dps-1)*100)}%.`;
    })),
    '- 첫 개선 모델의 평균 잠금 가정은 플로라 기대 DPS 오차 6.91%로 기준에 실패했다. 해당 가정을 제거하고 현재 게임의 준비된 스킬 우선·동작 잠금·가속을 재생한다. 최신 오차와 판정은 위 표를 따른다.',
    '- 격차 보기의 63명 실측 순위, 보스/무리/종합 전환, 역할 행렬, SS=1 비율, 7일차 공통 프리셋, 전체 명단 공유와 URL 복원을 확인했다. 1280px·375px에서 페이지 오류/레이아웃 지적 없음.',
    '', '## 한계·실행 기록', '',
    '- 이 패스의 `--no-team`은 팀 증폭을 측정하지 않는다. CSV의 팀 증폭 0은 효용 없음이 아니라 미측정이다. 회복/guard/무적은 실제 함수 그대로 유지했다.',
    '- 최초 실행은 동시 개발 중 바뀐 regen_timer/각성 클래스 참조로 파싱에 실패했다. 프로브를 실제 tick_regen으로 갱신했고 클래스 임포트 후 완료했다. 초기 형태 측정은 임시 복사본의 main.gd rainbow_match에 bool 타입만 명시했으며, 본 밸런스·성장 검증은 수정 완료된 실제 프로젝트에서 수행했다.',
    '- 이전 측정에는 FxSig 장식의 polygon triangulation 오류가 있었다. 최신 프로브는 장식을 제외하고 실제 피해·이동·피격을 실행한다. 이 작업은 장식의 시각적 정상 동작을 보증하지 않는다.',
    '- 이전 패스의 성장 실행 중단(137)과 PC 재부팅이 있었다. 중단 실행은 이번 판정에 사용하지 않으며 완료 표식과 시작/종료 해시가 있는 새 실행만 사용한다.',
    '- 이전 중간 패시브 실험과 적 피격 인터페이스 변경 도중의 측정은 배포 데이터에서 제외했다. Q9의 최종 패시브, 고정 회복 5%/5초→3초, 각성 성장 예산을 포함해 다시 측정했다.',
    '', '## 재현', '', '```powershell',
    "& 'C:\\Users\\qotmd\\Documents\\Codex\\2026-11-02\\figma-plugin-figma-openai-curated-remote\\work\\tools\\godot\\Godot_v4.7.2-stable_win64_console.exe' --headless --rendering-method gl_compatibility --path C:\\GameDev\\SkyWhale --fixed-fps 60 --disable-render-loop --script res://tools/dps_probe.gd -- --seconds=300 --seed=1701 --no-team --out=<절대출력경로>",
    '```', '', '`--profile=<JSON>`로 성장 설정, `--only=<id,id>`로 대상을 지정한다. 프로브 종료 후 기존 Windows 0xC0000005가 있으면 `DPS_PROBE_COMPLETE`와 JSON/CSV 완결성을 우선 확인한다.',
    '', '동작 모델은 같은 Godot 명령의 `--script res://tools/dps_cadence.gd -- --out=<timing.json 절대경로>`로 내보낸다. 회귀 검사는 `--script res://tools/combat_coefficients_check.gd`이며 별도 저장 데이터를 만들지 않는다.',
    '', '```text',
    'node design/dps_view/build.mjs build <이전.csv> <기본/dps_raw.json> <timing.json> <각성3/dps_raw.json> <각성5/dps_raw.json> <동일성장50/dps_raw.json> <동일성장100/dps_raw.json> <진화성장50/dps_raw.json>',
    'node --test design/dps_view/calculator.test.mjs',
    '```',
    '', '## 변경 파일·튜닝 진입점', '',
    '- `scripts/damage_tuning.gd`: ANCHOR, TIER_SCALE, ROLE_RATIO, GROUP_SPREAD, CHANNEL_SHARE, IMPACT, AWAKENING_DAMAGE, impact. 최종 패시브를 포함해 적중 예산을 재배분한다. HEROES와 MYTHIC_KITS의 입력 계수는 보존한다.',
    '- `scripts/main.gd`: deal의 공통 적중 계수, 공속에 비례한 기본 공격 동작, 강화 폭발 피해. 실제 Enemy.is_boss로 보스/일반을 구분하며 모든 평타/기술/진화 피해가 같은 경로를 통과한다.',
    '- `scripts/roster.gd`·`scripts/awakening.gd`: Q9 최종 패시브 값과 각성 규칙. `scripts/game_data.gd`: 같은 값에서 설명을 생성한다. STAGE_RULES/FIRST_VOYAGE는 이 패스의 변경 대상이 아니다.',
    '- `scripts/fx_tier.gd`: skill/ult 피해 계수 적용, rocket 범위/추가탄 제거, ignis 집중 타격. `scripts/fx_sig.gd`: finale 단일 대상 마무리.',
    '- `tools/dps_probe.gd`: 성장 JSON 입력, 실제 tick_regen, 배치/성장·장비·각성 조건, 시작/종료 소스 해시, 실제 함수의 성장 표 내보내기.',
    '- QA 후속: `scripts/awakening.gd::cast_ultimate` / `scripts/fx_tier.gd::ult`의 진화 예약 경로, `scripts/projectile.gd::ability_hit`와 `scripts/main.gd::fire` / `scripts/skill_preview.gd::fire`의 공통 단일 판정, `scripts/game_data.gd::_apply_rhythm` / `_scale_desc`의 마지막 반올림.',
    '- `tools/dps_cadence.gd`: 실제 동작·가속·초기 타이머 관측. `tools/combat_coefficients_check.gd`: 5개 네이티브 회귀 검사. `design/dps_view/calculator.js::schedule` / `castWindow`: 정수 시전·동작 우선순위·도착 경계 계산.',
    '- `design/dps_view/`: 표시/계산/데이터·경제 프리셋 생성기와 calculator.test.mjs. `docs/balance/dps.csv`와 `docs/balance/dps_report.md`: 재측정 산출물.',
    '', '## 측정 소스 SHA-256', '', ...Object.entries(raw.source_hashes).map(([p,h])=>`- \`${p.replace('res://','')}\`: \`${h}\``), ''
  ];
  fs.writeFileSync(path.join(root, 'docs/balance/dps_report.md'), lines.join('\n'));
  console.log(JSON.stringify({bands,violations,heroes:heroes.length,rows:raw.rows.length},null,2));
  if (violations.length) process.exitCode=1;
} else throw new Error('tune baseline.csv raw.json [ids] | build baseline.csv raw.json timing.json [response/validation raw...]');
