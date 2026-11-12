$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System; using System.Drawing; using System.Drawing.Imaging; using System.Runtime.InteropServices;
public static class FloraKey {
 public static void Run(string input,string output) {
 using(var b=new Bitmap(input)) {
 var rect=new Rectangle(0,0,b.Width,b.Height);
 var data=b.LockBits(rect,ImageLockMode.ReadWrite,PixelFormat.Format32bppArgb);
 int n=data.Stride*b.Height;byte[] p=new byte[n];Marshal.Copy(data.Scan0,p,0,n);
 byte[] a=new byte[b.Width*b.Height];
 for(int y=0;y<b.Height;y++)for(int x=0;x<b.Width;x++){
 int i=y*data.Stride+x*4;double excess=p[i]-Math.Max(p[i+1],p[i+2]);
 a[y*b.Width+x]=(byte)(255*(1-Math.Max(0,Math.Min(1,(excess-65)/65))));
 }
 for(int y=0;y<b.Height;y++)for(int x=0;x<b.Width;x++){
 int i=y*data.Stride+x*4;byte v=a[y*b.Width+x];
 for(int dy=-1;dy<=1;dy++)for(int dx=-1;dx<=1;dx++){int xx=x+dx,yy=y+dy;if(xx>=0&&xx<b.Width&&yy>=0&&yy<b.Height)v=Math.Min(v,a[yy*b.Width+xx]);}
 p[i+3]=v;
 if(v<255){p[i]=(byte)Math.Min(p[i],Math.Max(p[i+1],p[i+2]));}
 }
 Marshal.Copy(p,0,data.Scan0,n);b.UnlockBits(data);b.Save(output,ImageFormat.Png);
 }
 }
}
'@
$d=$PSScriptRoot
foreach($pair in @(@('character_final_raw','character_clean'),@('hills_raw','hills_clean'),@('branches_raw','branches_clean'),@('petals_raw','petals_clean'))){
[FloraKey]::Run("$d/flora_v2_$($pair[0]).png","$d/flora_v2_$($pair[1]).png")
}
