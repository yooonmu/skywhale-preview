import fs from 'node:fs';
import zlib from 'node:zlib';
const root='design/mockups/feedback70/';
function read(path) {
 const b=fs.readFileSync(path); let w,h,type,parts=[];
 for(let p=8;p<b.length;) {let n=b.readUInt32BE(p),t=b.toString('ascii',p+4,p+8),d=b.subarray(p+8,p+8+n);if(t==='IHDR'){w=d.readUInt32BE(0);h=d.readUInt32BE(4);type=d[9];if(d[8]!==8||![2,6].includes(type))throw Error('unsupported PNG '+path);}if(t==='IDAT')parts.push(d);p+=n+12;}
 const c=type===6?4:3,raw=zlib.inflateSync(Buffer.concat(parts)),rows=Buffer.alloc(w*h*c),out=Buffer.alloc(w*h*4);
 for(let y=0;y<h;y++){let f=raw[y*(w*c+1)];for(let x=0;x<w*c;x++){let i=y*w*c+x,a=x>=c?rows[i-c]:0,b=y?rows[i-w*c]:0,d=y&&x>=c?rows[i-w*c-c]:0,p=a+b-d,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-d);rows[i]=(raw[y*(w*c+1)+1+x]+[0,a,b,Math.floor((a+b)/2),pa<=pb&&pa<=pc?a:pb<=pc?b:d][f])&255;}}
 for(let i=0;i<w*h;i++){rows.copy(out,i*4,i*c,i*c+3);out[i*4+3]=c===4?rows[i*c+3]:255;}return {w,h,d:out};
}
const table=Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
function chunk(t,d){const b=Buffer.alloc(d.length+12);b.writeUInt32BE(d.length);b.write(t,4);d.copy(b,8);let c=0xffffffff;for(const n of b.subarray(4,-4))c=table[(c^n)&255]^(c>>>8);b.writeUInt32BE((c^0xffffffff)>>>0,b.length-4);return b;}
function save(path,a){let hdr=Buffer.alloc(13);hdr.writeUInt32BE(a.w);hdr.writeUInt32BE(a.h,4);hdr[8]=8;hdr[9]=6;let rows=Buffer.alloc((a.w*4+1)*a.h);for(let y=0;y<a.h;y++)a.d.copy(rows,y*(a.w*4+1)+1,y*a.w*4,(y+1)*a.w*4);fs.writeFileSync(path,Buffer.concat([Buffer.from('89504e470d0a1a0a','hex'),chunk('IHDR',hdr),chunk('IDAT',zlib.deflateSync(rows)),chunk('IEND',Buffer.alloc(0))]));}
function cut(a,mode){
 if(mode==='cyan'&&['gaeul','dohee'].includes(id)){
  for(let i=0;i<a.d.length;i+=4){let r=a.d[i],g=a.d[i+1],b=a.d[i+2],spill=g-Math.max(r,b);if(spill>25){let alpha=1-Math.min(1,spill/220);a.d[i+3]=Math.round(255*alpha);if(alpha>0){a.d[i]=Math.min(255,r/alpha);a.d[i+2]=Math.min(255,b/alpha);a.d[i+1]=Math.max(0,(g-(1-alpha)*255)/alpha);}}}
  return a;
 }
 if(mode==='cyan'&&['mint','doa'].includes(id)){
  for(let i=0;i<a.d.length;i+=4){let r=a.d[i],g=a.d[i+1],b=a.d[i+2],spill=b-Math.max(r,g);if(spill>35){let alpha=1-Math.min(1,spill/220);a.d[i+3]=Math.round(255*alpha);if(alpha>0){a.d[i]=Math.min(255,r/alpha);a.d[i+1]=Math.min(255,g/alpha);a.d[i+2]=Math.max(0,(b-(1-alpha)*255)/alpha);}}}
  return a;
 }
 if(mode==='cyan'){for(let i=0;i<a.d.length;i+=4){let r=a.d[i],g=a.d[i+1],b=a.d[i+2],spill=Math.max(0,Math.min(g,b)-r);if(spill>25){let alpha=1-Math.min(1,spill/220);a.d[i+3]=Math.round(a.d[i+3]*alpha);if(alpha>0){a.d[i+1]=Math.max(0,(g-(1-alpha)*255)/alpha);a.d[i+2]=Math.max(0,(b-(1-alpha)*255)/alpha);}}if(id==='chaeyoung'){let s=Math.max(0,Math.min(a.d[i+1],a.d[i+2])-r);a.d[i+1]-=s;a.d[i+2]-=s;if(a.d[i+1]>r)a.d[i+1]=r;}}return a;}
 if(mode==='black'){for(let i=0;i<a.d.length;i+=4){let m=Math.max(a.d[i],a.d[i+1],a.d[i+2]);a.d[i+3]=m<5?0:m;if(m)for(let c=0;c<3;c++)a.d[i+c]=Math.round(a.d[i+c]*255/m);}return a;}
 const seen=new Uint8Array(a.w*a.h),q=new Int32Array(a.w*a.h);let n=0,head=0;
 function add(p){if(seen[p])return;let i=p*4,r=a.d[i],g=a.d[i+1],b=a.d[i+2];if(Math.min(r,g,b)>215&&Math.max(r,g,b)-Math.min(r,g,b)<22){seen[p]=1;q[n++]=p;}}
 for(let x=0;x<a.w;x++){add(x);add((a.h-1)*a.w+x);}for(let y=0;y<a.h;y++){add(y*a.w);add(y*a.w+a.w-1);}
 while(head<n){let p=q[head++],x=p%a.w,y=Math.floor(p/a.w);a.d[p*4+3]=0;if(x)add(p-1);if(x<a.w-1)add(p+1);if(y)add(p-a.w);if(y<a.h-1)add(p+a.w);}
 for(let p=0;p<seen.length;p++){if(seen[p])continue;let x=p%a.w,y=Math.floor(p/a.w),edge=(x&&seen[p-1])||(x<a.w-1&&seen[p+1])||(y&&seen[p-a.w])||(y<a.h-1&&seen[p+a.w]);if(edge){let i=p*4,m=Math.min(a.d[i],a.d[i+1],a.d[i+2]),alpha=1-m/255;a.d[i+3]=Math.round(a.d[i+3]*alpha);if(alpha>0)for(let c=0;c<3;c++)a.d[i+c]=Math.max(0,(a.d[i+c]-m)/alpha);}}
 return a;
}
function crop(a,x,y,w,h){let b={w,h,d:Buffer.alloc(w*h*4)};for(let j=0;j<h;j++)a.d.copy(b.d,j*w*4,((y+j)*a.w+x)*4,((y+j)*a.w+x+w)*4);return b;}
function scale(a,w,h){let b={w,h,d:Buffer.alloc(w*h*4)};for(let y=0;y<h;y++)for(let x=0;x<w;x++){let i=(Math.floor(y*a.h/h)*a.w+Math.floor(x*a.w/w))*4;a.d.copy(b.d,(y*w+x)*4,i,i+4);}return b;}
function over(a,b){for(let i=0;i<a.d.length;i+=4){let k=b.d[i+3]/255;for(let c=0;c<3;c++)a.d[i+c]=Math.round(a.d[i+c]*(1-k)+b.d[i+c]*k);a.d[i+3]=255;}return a;}
const id=process.argv[2]||'yuna',dir=root+'cast_v4/'+id+'/';
const cfg={
 yuna:{pickup:'pickup_rekey',detail:'detail_rekey',idle:'sd_idle_rekey',attack:'sd_attack_rekey',sizes:[[553,698],[988,709]],face:[420,90],bg:[39,21,85,55,25,70]},
 ciel:{pickup:'pickup_source',detail:'detail_rekey',idle:'sd_idle_rekey',attack:'sd_attack_source',sizes:[[550,698],[971,559]],face:[385,100],bg:[23,65,45,45,75,35]},
 harin:{pickup:'pickup_reform',detail:'detail_reform',idle:'sd_idle_source',attack:'sd_attack_source',sizes:[[442,649],[801,624]],face:[360,30],bg:[15,45,80,35,70,80]},
 noa:{pickup:'pickup_rekey',detail:'detail_rekey',idle:'sd_idle_source',attack:'sd_attack_source',sizes:[[491,688],[796,679]],face:[370,45],bg:[70,30,35,100,55,25]},
 dahee:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',sizes:[[466,771],[778,770]],face:[410,65],bg:[45,30,70,55,40,80]},
 sora:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',sizes:[[511,677],[1038,658]],face:[395,100],bg:[45,20,75,60,35,75]},
 seoa:{pickup:'pickup_source',detail:'detail_rekey_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['detail','idle','attack'],sizes:[[547,691],[894,682]],face:[385,90],bg:[55,40,25,90,75,50]},
 chaewon:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[406,662],[866,625]],face:[350,70],bg:[40,30,55,100,75,40]},
 eunbi:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[570,739],[861,733]],face:[385,50],bg:[55,35,30,100,80,45]},
 mint:{pickup:'pickup_blue_source',detail:'detail_blue_source',idle:'sd_idle_blue_source',attack:'sd_attack_blue_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[392,670],[739,638]],face:[370,60],bg:[20,45,30,40,75,55]},
 doa:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[452,683],[960,674]],face:[405,85],bg:[30,45,20,65,80,40]},
 suah:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[424,725],[612,724]],face:[405,70],bg:[65,25,25,90,50,30]},
 jia:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[577,698],[1126,687]],face:[340,100],bg:[65,20,30,95,45,30]},
 garam:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[493,703],[1017,671]],face:[350,50],bg:[55,25,25,90,45,25]},
 gaeul:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[403,725],[894,711]],face:[390,45],bg:[20,40,65,30,65,90]},
 dohee:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[508,693],[828,680]],face:[310,65],bg:[20,30,70,40,70,90]},
 miso:{pickup:'pickup_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[424,747],[802,738]],face:[360,70],bg:[60,35,20,90,70,30]},
 chaeyoung:{pickup:'pickup_short_source',detail:'detail_source',idle:'sd_idle_source',attack:'sd_attack_source',keys:['pickup','detail','idle','attack','cutin'],sizes:[[522,686],[975,674]],face:[360,40],bg:[60,25,35,90,60,35]}
}[id];
let pickup=read(dir+cfg.pickup+'.png');if(cfg.keys?.includes('pickup'))pickup=cut(pickup,'cyan');save(dir+'pickup.png',pickup);
let detail=read(dir+cfg.detail+'.png');if(cfg.keys?.includes('detail'))detail=cut(detail,'cyan');save(dir+'detail.png',detail);
for(const [n,pose] of ['idle','attack'].entries()){let sprite=read(dir+cfg[pose]+'.png');if(cfg.keys?.includes(pose))sprite=cut(sprite,'cyan');save(dir+'sd_'+pose+'.png',scale(sprite,...cfg.sizes[n]));}
save(dir+'face.png',scale(crop(detail,...cfg.face,270,270),160,160));
let effects=scale(read(dir+'effects_source.png'),1672,941);
let back=scale(cut(crop(effects,0,0,836,941),'black'),1672,941),front=scale(cut(crop(effects,836,0,836,941),'black'),1672,941);
save(dir+'fx_back.png',back);save(dir+'fx_front.png',front);
let cutin=read(dir+(id==='mint'?'cutin_blue_source.png':id==='miso'?'cutin_clean_source.png':'cutin_source.png'));if(id==='yuna'||cfg.keys?.includes('cutin'))cutin=cut(cutin,'cyan');
if(id==='miso')cutin=scale(cutin,1672,941);
if(id==='eunbi')for(let i=0;i<cutin.d.length;i+=4){let r=cutin.d[i],g=cutin.d[i+1],b=cutin.d[i+2];if(Math.min(g,b)>r){let spill=Math.min(g,b)-r;cutin.d[i+1]-=spill;cutin.d[i+2]-=spill;}if(cutin.d[i+1]>r)cutin.d[i+1]=r;}
save(dir+'cutin_cut.png',cutin);
let bg={w:1672,h:941,d:Buffer.alloc(1672*941*4)};
for(let y=0;y<941;y++)for(let x=0;x<1672;x++){let i=(y*1672+x)*4,t=y/941;for(let c=0;c<3;c++)bg.d[i+c]=cfg.bg[c]+cfg.bg[c+3]*t;bg.d[i+3]=255;}
save(dir+'cutin.png',over(over(bg,back),cutin));
for(const f of ['pickup','detail','sd_idle','sd_attack','face','fx_back','fx_front','cutin','cutin_cut']){let a=read(dir+f+'.png'),zero=0,solid=0;for(let i=3;i<a.d.length;i+=4){if(!a.d[i])zero++;if(a.d[i]===255)solid++;}console.log(f,a.w,a.h,'transparent',zero,'opaque',solid);}
