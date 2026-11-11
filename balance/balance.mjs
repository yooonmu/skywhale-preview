export const views=['A','B','mean'];
export const kits=['rocket','star','bloom','bell'];
export const roleNames={rocket:'단일',star:'광역',bloom:'지원',bell:'수호'};
export const viewNames={A:'보스',B:'잡몹',mean:'종합'};
const stats=xs=>({count:xs.length,min:Math.min(...xs),avg:xs.reduce((s,v)=>s+v,0)/xs.length,max:Math.max(...xs)});
export function bands(heroes,result,tierOrder){
  return Object.fromEntries(views.map(view=>[view,tierOrder.map(tier=>{
    const members=heroes.filter(h=>h.tier===tier);
    const value=h=>result(h)[view].dps;
    return {tier,...stats(members.map(value)),groups:Object.fromEntries(kits.map(kit=>{
      const xs=members.filter(h=>h.kit===kit).map(value);
      return [kit,xs.length?stats(xs):null];
    }))};
  }).filter(b=>b.count)]));
}
export function violations(summary,policy,baseline=true){
  const errors=[];
  for(const view of views){
    const bs=summary[view],ss=bs.find(b=>b.tier==='SS').max;
    for(let i=1;i<bs.length;i++)if(bs[i-1].min<=bs[i].max)errors.push(`${view} ${bs[i-1].tier}/${bs[i].tier} band overlap`);
    for(const b of bs){
      if(baseline&&Math.abs(b.max/ss/policy.tiers[b.tier]-1)>.015)errors.push(`${view} ${b.tier} scale`);
      const weights=policy.roles[view],top=Math.max(...Object.values(weights));
      for(const kit of kits){
        const g=b.groups[kit];if(!g)continue;
        if(g.max/g.min-1>.015)errors.push(`${view} ${b.tier}/${kit} spread`);
        if(baseline&&Math.abs(g.max/b.max/(weights[kit]/top)-1)>.015)errors.push(`${view} ${b.tier}/${kit} ratio`);
        for(const other of kits){
          const next=b.groups[other];
          if(next&&weights[kit]>weights[other]&&g.min<=next.max)errors.push(`${view} ${b.tier} ${kit}/${other} role overlap`);
        }
      }
    }
  }
  return errors;
}
export function tables(summary,format){
  const lines=[];
  for(const view of views){
    lines.push(`### ${viewNames[view]}`,'','| 등급 | 단일 평균 [최소–최대] | 광역 평균 [최소–최대] | 지원 평균 [최소–최대] | 수호 평균 [최소–최대] |','| --- | ---: | ---: | ---: | ---: |');
    for(const b of summary[view])lines.push(`| ${b.tier} | ${kits.map(k=>{const g=b.groups[k];return g?`${format(g.avg)} [${format(g.min)}–${format(g.max)}]`:'없음';}).join(' | ')} |`);
    lines.push('','| 등급 | 전체 최소 | 전체 평균 | 전체 최대 | 바로 아래 등급과 최소 간격 |','| --- | ---: | ---: | ---: | ---: | ---: |');
    summary[view].forEach((b,i,bs)=>lines.push(`| ${b.tier} | ${format(b.min)} | ${format(b.avg)} | ${format(b.max)} | ${i+1<bs.length?format(b.min-bs[i+1].max):'—'} |`));
    lines.push('');
  }
  return lines;
}
