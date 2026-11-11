(function(scope){
  'use strict';
  function range(rows){
    const values=rows.map(x=>x.value);
    return {count:values.length,min:values.length?Math.min(...values):null,
      avg:values.length?values.reduce((s,v)=>s+v,0)/values.length:null,
      max:values.length?Math.max(...values):null};
  }
  function summarize(rows,tiers,roles,scenario){
    const ranked=rows.map(x=>({...x,value:x.r[scenario].dps})).sort((a,b)=>b.value-a.value||a.h.name.localeCompare(b.h.name,'ko'));
    const bands=tiers.map(tier=>{
      const members=ranked.filter(x=>x.h.tier===tier);
      return {tier,...range(members),groups:roles.map(role=>({role,...range(members.filter(x=>x.h.role===role))}))};
    }).filter(b=>b.count);
    const ss=bands.find(b=>b.tier==='SS');
    for(const band of bands)band.ratio=ss?band.avg/ss.avg:null;
    return {ranked,bands,max:ranked.length?ranked[0].value:0};
  }
  scope.RosterGaps={summarize};
})(typeof window!=='undefined'?window:globalThis);
