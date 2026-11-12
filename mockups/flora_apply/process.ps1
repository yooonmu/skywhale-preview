Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
public class FloraExtract {
 public static Bitmap Key(string p) {
  var s=new Bitmap(p);var o=new Bitmap(s.Width,s.Height,PixelFormat.Format32bppArgb);
  for(int y=0;y<s.Height;y++)for(int x=0;x<s.Width;x++){
   Color c=s.GetPixel(x,y);double d=c.B-Math.Max(c.R,c.G);
   double a=1-Math.Max(0,Math.Min(1,(d-35)/200.0));
   if(a<0.03){o.SetPixel(x,y,Color.Transparent);continue;}
   int r=(int)Math.Min(255,c.R/a),g=(int)Math.Min(255,c.G/a);
   int b=(int)Math.Max(0,Math.Min(255,(c.B-255*(1-a))/a));
   if(d>35)b=Math.Min(b,Math.Max(r,g));
   o.SetPixel(x,y,Color.FromArgb((int)(a*255),r,g,b));
  }s.Dispose();return o;
 }
 public static void Save(Bitmap s,string p,int w,int h,Rectangle crop){
  using(var o=new Bitmap(w,h,PixelFormat.Format32bppArgb))using(var g=Graphics.FromImage(o)){
   g.CompositingMode=System.Drawing.Drawing2D.CompositingMode.SourceCopy;
   g.InterpolationMode=System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
   g.DrawImage(s,new Rectangle(0,0,w,h),crop,GraphicsUnit.Pixel);o.Save(p,ImageFormat.Png);
  }
 }
 public static void Stats(string p){
  using(var b=new Bitmap(p)){long z=0,semi=0,blue=0;
   for(int y=0;y<b.Height;y++)for(int x=0;x<b.Width;x++){var c=b.GetPixel(x,y);if(c.A==0)z++;else {if(c.A<255)semi++;if(c.B-Math.Max(c.R,c.G)>80)blue++;}}
   Console.WriteLine(System.IO.Path.GetFileName(p)+" "+b.Width+"x"+b.Height+" transparent="+z+" semitransparent="+semi+" blueKeyResidual="+blue);
  }
 }
}
'@
$a=Join-Path $PSScriptRoot 'assets'
$full=[FloraExtract]::Key("$a/flora_full_key.png")
[FloraExtract]::Save($full,"$a/flora_full.png",1024,1536,[System.Drawing.Rectangle]::new(0,0,1024,1536))
[FloraExtract]::Save($full,"$a/flora_bust.png",1024,900,[System.Drawing.Rectangle]::new(0,0,1024,900))
# Match portrait.gd square framing: face height 29%, face center 56% vertically.
[FloraExtract]::Save($full,"$a/flora_face.png",160,160,[System.Drawing.Rectangle]::new(160,-50,560,560))
$full.Dispose()
foreach($e in @('happy','surprised')){
 $b=[FloraExtract]::Key("$a/flora_bust_${e}_key.png")
 [FloraExtract]::Save($b,"$a/flora_bust_${e}.png",1024,900,[System.Drawing.Rectangle]::new(0,0,1024,900));$b.Dispose()
}
foreach($spec in @(@('flora_cutin_key.png','flora_cutin_cut.png',1672,941),@('flora_sd_idle_blue.png','flora_sd_idle.png',557,659),@('flora_sd_attack_blue.png','flora_sd_attack.png',930,651))){
 $b=[FloraExtract]::Key("$a/$($spec[0])")
 [FloraExtract]::Save($b,"$a/$($spec[1])",[int]$spec[2],[int]$spec[3],[System.Drawing.Rectangle]::new(0,0,$b.Width,$b.Height));$b.Dispose()
}
foreach($n in @('flora_full','flora_bust','flora_bust_happy','flora_bust_surprised','flora_cutin','flora_cutin_cut','flora_sd_idle','flora_sd_attack','flora_face')){[FloraExtract]::Stats("$a/$n.png")}
