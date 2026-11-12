(() => {
const c=document.querySelector('#flora-v2-canvas'),ctx=c.getContext('2d');
const files=['sky','hills','character','branches',...Array.from({length:4},(_,i)=>`petal_${i}`)];
const imgs=files.map(n=>{const im=new Image();im.src=`flora_v2_${n}.png`;return im});
let ready=false,paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
let clock=0,last=0;
const W=1672,H=941;
function layer(im,x,y,s=1){ctx.drawImage(im,x-(W*s-W)/2,y-(H*s-H)/2,W*s,H*s)}
function render(t){
ctx.clearRect(0,0,W,H);
layer(imgs[0],Math.sin(t*.12)*2,0,1.015);
ctx.fillStyle='rgba(255,250,249,.20)';ctx.fillRect(0,0,W,H);
layer(imgs[1],Math.sin(t*.18)*5,1,1.02);
// Narrow horizontal mesh bands approximate a vertex mask; the face and staff remain fixed.
for(let y=0;y<H;y+=4){
const m=Math.max(0,Math.min(1,(y-250)/400));
ctx.drawImage(imgs[2],0,y,420,4,Math.sin(t*.85+y*.006)*2.2*m,y,420,4);
ctx.drawImage(imgs[2],420,y,W-420,4,420,y,W-420,4);
}
ctx.save();ctx.globalAlpha=.38+Math.sin(t*.8)*.07;ctx.strokeStyle='#c9efd3';
ctx.lineWidth=8;ctx.shadowColor='#d6f1cb';ctx.shadowBlur=17;
ctx.beginPath();ctx.moveTo(865,850);ctx.bezierCurveTo(755,645,1190,605,1060,420);
ctx.bezierCurveTo(945,290,1520,185,1450,75);ctx.stroke();
ctx.setLineDash([36,190]);ctx.lineDashOffset=-t*35;ctx.lineWidth=3;ctx.strokeStyle='#fbffe9';ctx.stroke();ctx.restore();
layer(imgs[3],Math.sin(t*.24)*7,Math.sin(t*.3)*2,1.025);
for(let i=0;i<11;i++){
const depth=(i%3+1)/3,s=18+depth*26;
const x=((i*173+t*(16+depth*21))%(W+150))-75;
const y=(i*97+Math.sin(t*.5+i)*23)%(H+40);
ctx.save();ctx.translate(x,y);ctx.rotate(t*(.09+depth*.1)+i);
ctx.globalAlpha=.45+depth*.3;ctx.drawImage(imgs[4+i%4],-s/2,-s/2,s,s);ctx.restore();
}
ctx.fillStyle=`rgba(255,235,211,${.016+Math.sin(t*.6)*.006})`;ctx.fillRect(0,0,W,H);
}
Promise.all(imgs.map(im=>im.decode())).then(()=>{ready=true;render(0);c.dataset.ready='true'}).catch(e=>console.error(e));
function loop(ms){if(last&&!paused&&ready)clock+=Math.min(.05,(ms-last)/1000);last=ms;if(ready)render(clock);requestAnimationFrame(loop)}
requestAnimationFrame(loop);
document.querySelector('#flora-v2-toggle').onclick=e=>{paused=!paused;e.target.textContent=paused?'재생':'일시정지'};
window.floraV2={render,canvas:c,get ready(){return ready}};
document.querySelector('#flora-v2-record').onclick=async e=>{
if(!ready)return;
const chunks=[],rec=new MediaRecorder(c.captureStream(30),{mimeType:'video/webm'});
rec.ondataavailable=ev=>chunks.push(ev.data);
rec.onstop=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(chunks,{type:'video/webm'}));a.download='flora_v2_motion.webm';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);e.target.disabled=false};
e.target.disabled=true;paused=false;rec.start();setTimeout(()=>rec.stop(),6000);
};
})();
