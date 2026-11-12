const fs=require('fs'),z=require('zlib'),p=require('path'),base=__dirname;
function decode(file){const b=fs.readFileSync(file);let w,h,type,ids=[];for(let o=8;o<b.length;){let n=b.readUInt32BE(o),t=b.toString('ascii',o+4,o+8),d=b.subarray(o+8,o+8+n);if(t==='IHDR'){w=d.readUInt32BE(0);h=d.readUInt32BE(4);type=d[9];if(d[8]!==8||![2,6].includes(type)||d[12])throw Error('Unsupported PNG '+file)}if(t==='IDAT')ids.push(d);o+=n+12}let raw=z.inflateSync(Buffer.concat(ids)),ch=type===6?4:3,stride=w*ch,rows=Buffer.alloc(h*stride),out=Buffer.alloc(w*h*4);for(let y=0;y<h;y++){let f=raw[y*(stride+1)];for(let x=0;x<stride;x++){let a=x>=ch?rows[y*stride+x-ch]:0,c=y&&x>=ch?rows[(y-1)*stride+x-ch]:0,u=y?rows[(y-1)*stride+x]:0,v=raw[y*(stride+1)+1+x],q=a+u-c,pa=Math.abs(q-a),pb=Math.abs(q-u),pc=Math.abs(q-c);rows[y*stride+x]=(v+([0,a,u,Math.floor((a+u)/2),pa<=pb&&pa<=pc?a:pb<=pc?u:c][f]))&255}for(let x=0;x<w;x++){let s=y*stride+x*ch,d=(y*w+x)*4;out[d]=rows[s];out[d+1]=rows[s+1];out[d+2]=rows[s+2];out[d+3]=ch===4?rows[s+3]:255}}return{w,h,data:out}}
const table=Array.from({length:256},(_,n)=>{for(let i=0;i<8;i++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0});
function chunk(t,d){let type=Buffer.from(t),a=Buffer.concat([type,d]),crc=0xffffffff;for(let v of a)crc=table[(crc^v)&255]^(crc>>>8);let out=Buffer.alloc(d.length+12);out.writeUInt32BE(d.length);a.copy(out,4);out.writeUInt32BE((crc^0xffffffff)>>>0,out.length-4);return out}
function save(file,im){let head=Buffer.alloc(13);head.writeUInt32BE(im.w);head.writeUInt32BE(im.h,4);head[8]=8;head[9]=6;let rows=Buffer.alloc(im.h*(im.w*4+1));for(let y=0;y<im.h;y++)im.data.copy(rows,y*(im.w*4+1)+1,y*im.w*4,(y+1)*im.w*4);fs.writeFileSync(file,Buffer.concat([Buffer.from('89504e470d0a1a0a','hex'),chunk('IHDR',head),chunk('IDAT',z.deflateSync(rows,{level:9})),chunk('IEND',Buffer.alloc(0))]))}
function resize(im){let out={w:1600,h:720,data:Buffer.alloc(1600*720*4)};for(let y=0;y<720;y++)for(let x=0;x<1600;x++){let sx=Math.min(im.w-1,Math.floor(x*im.w/1600)),sy=Math.min(im.h-1,Math.floor(y*im.h/720));im.data.copy(out.data,(y*1600+x)*4,(sy*im.w+sx)*4,(sy*im.w+sx)*4+4)}return out}
function clean(im,mode){for(let i=0;i<im.data.length;i+=4){let r=im.data[i],g=im.data[i+1],b=im.data[i+2],alpha=im.data[i+3]/255;if(mode==='light'){let a=Math.max(r,g,b)/255;im.data[i+3]=Math.round(a*alpha*255);if(a)for(let j=0;j<3;j++)im.data[i+j]=Math.min(255,Math.round(im.data[i+j]/a))}else if(mode==='key'){// Only saturated key spill is removed; native model alpha is preserved.
let spill=Math.max(0,Math.min(r,b)-g);if(spill>65&&r>130&&b>130){let a=Math.max(0,1-(spill-65)/150);im.data[i+3]=Math.round(alpha*a*255);if(a>0){im.data[i]=Math.min(r,g+35);im.data[i+2]=Math.min(b,g+35)}}}}return im}
function place(im,scale,dy){let minx=1600,maxx=0,miny=720,maxy=0;for(let y=0;y<720;y++)for(let x=0;x<1600;x++)if(im.data[(y*1600+x)*4+3]>12){minx=Math.min(minx,x);maxx=Math.max(maxx,x);miny=Math.min(miny,y);maxy=Math.max(maxy,y)}let cx=(minx+maxx)/2,cy=(miny+maxy)/2,out={w:1600,h:720,data:Buffer.alloc(im.data.length)};for(let y=0;y<720;y++)for(let x=0;x<1600;x++){let sx=Math.round(cx+(x-cx)/scale),sy=Math.round(cy+(y-cy-dy)/scale);if(sx>=0&&sx<1600&&sy>=0&&sy<720)im.data.copy(out.data,(y*1600+x)*4,(sy*1600+sx)*4,(sy*1600+sx)*4+4)}return out}
function crop(im,rect){let out={w:1600,h:720,data:Buffer.alloc(im.data.length)};for(let y=rect[1];y<rect[3];y++)for(let x=rect[0];x<rect[2];x++){let i=(y*1600+x)*4;im.data.copy(out.data,i,i,i+4)}return out}
function blend(dst,src,opacity=1){for(let i=0;i<dst.data.length;i+=4){let a=src.data[i+3]/255*opacity,ba=dst.data[i+3]/255,oa=a+ba*(1-a);if(oa)for(let j=0;j<3;j++)dst.data[i+j]=Math.round((src.data[i+j]*a+dst.data[i+j]*ba*(1-a))/oa);dst.data[i+3]=Math.round(oa*255)}}
function build(){fs.mkdirSync(p.join(base,'layers'),{recursive:true});fs.mkdirSync(p.join(base,'reference'),{recursive:true});for(let [src,dst] of [['../tone_ab/img/hud_cur_1600x720.jpg','hud_current.jpg'],['../../../../assets/world/layer_sky.png','current_sky.png'],['../../../../assets/ui/school/room_cafe_bg.png','current_interior.png']])fs.copyFileSync(p.resolve(base,'..',src),p.join(base,'reference',dst));
let specs=[
['battle','sky','battle_sky_retry','opaque',0,1],
['battle','sun','battle_sun','light',0,.45],
['battle','high_left','battle_high_clouds','key',2,.30,[0,0,470,720]],
['battle','high_center','battle_high_clouds','key',3,.30,[470,0,820,720]],
['battle','high_right','battle_high_clouds','key',4,.30,[820,0,1600,720]],
['battle','far_island_left','battle_far_islands','key',6,.48,[0,0,640,720]],
['battle','far_island_bell','battle_far_islands','key',7,.48,[640,0,1150,720]],
['battle','far_island_falls','battle_far_islands','key',8,.48,[1150,0,1600,720]],
['battle','mid_garden','battle_mid_ruins','key',14,.72,[0,0,970,720]],
['battle','mid_aqueduct','battle_mid_ruins','key',16,.72,[970,0,1600,720]],
['battle','far_cloud_sea','battle_far_clouds','key',5,1],
['battle','near_cloud_bank','battle_near_clouds','key',28,1],
['battle','wisp_left','battle_wisps','key',42,.55,[0,0,880,720]],
['battle','wisp_right','battle_wisps','key',50,.55,[880,0,1600,720]],
['interior','floor','interior_wall','opaque',0,1],
['interior','back_wall','interior_wall','opaque',.5,1,[0,0,1600,550]],
['interior','board','interior_props','key',1.5,1,[0,0,1070,720]],
['interior','shelf','interior_props','key',2,1,[1070,0,1600,720]],
['interior','lamp_left','interior_lamps','key',3,1,[0,0,800,720]],
['interior','lamp_right','interior_lamps','key',3.5,1,[800,0,1600,720]],
['interior','serving_counter','interior_foreground','key',5,1,[0,0,800,720]],
['interior','trolley','interior_foreground','key',7,1,[800,0,1600,720]],
['interior','light_shafts','interior_light_retry','light',1,.18]];
let result=[];for(let [scene,id,source,mode,speed,opacity,rect] of specs){let im=clean(resize(decode(p.join(base,'originals',source+'.png'))),mode);if(rect)im=crop(im,rect);if(id.startsWith('mid_'))im=place(im,.78,-36);if(id.startsWith('lamp_'))im=place(im,.65,-35);if(id==='board')im=place(im,.82,0);if(id==='shelf')im=place(im,.72,-12);let name=`${scene}_${id}.png`;save(p.join(base,'layers',name),im);let nonzero=0,transparent=0;for(let i=3;i<im.data.length;i+=4){if(im.data[i])nonzero++;else transparent++}result.push({scene,id,file:'r2/layers/'+name,speed,opacity,source:'r2/originals/'+source+'.png',width:1600,height:720,nonzero,transparent});console.log(scene,id,'visible',nonzero,'transparent',transparent)}
fs.writeFileSync(p.join(base,'layers.json'),JSON.stringify(result,null,2));for(let scene of ['battle','interior']){let out={w:1600,h:720,data:Buffer.alloc(1600*720*4)};for(let s of result.filter(s=>s.scene===scene))blend(out,decode(p.join(base,'layers',p.basename(s.file))),s.opacity);save(p.join(base,scene+'_composite.png'),out)}}
if(process.argv[2]==='extract'){let im=decode(p.join(base,'export_sheet.png'));for(let [name,top]of [['hud_capture',0],['battle_hud',720],['interior_hud',1440]]){let out={w:1600,h:720,data:Buffer.alloc(1600*720*4)};for(let y=0;y<720;y++)im.data.copy(out.data,y*6400,((y+top)*im.w)*4,((y+top)*im.w+1600)*4);save(p.join(base,name+'.png'),out)}
let raw=decode(p.join(base,'hud_capture.png')),com=decode(p.join(base,'battle_hud.png')),fg={w:1600,h:720,data:Buffer.alloc(raw.data.length)};for(let i=0;i<raw.data.length;i+=4){if(raw.data[i]===com.data[i]&&raw.data[i+1]===com.data[i+1]&&raw.data[i+2]===com.data[i+2]){let r=raw.data[i],g=raw.data[i+1],b=raw.data[i+2];if(!(b>r*1.12&&g>r*.99&&b-g>30))raw.data.copy(fg.data,i,i,i+4)}}save(p.join(base,'hud_cutout.png'),fg);for(let scene of ['battle','interior']){let out=decode(p.join(base,scene+'_composite.png'));blend(out,fg);save(p.join(base,scene+'_hud.png'),out)}console.log('Three static frames and real-capture foreground PNG saved')}else build();
