using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;
public class SharedUniformLineup {
 public static void Build(string dir) {
  string[] ids={"mio","yuri","karen","yuna","harin","arca","sol","flora"};
  int[] height={85,90,94,96,102,105,108,112};
  int[] head={40,15,15,15,15,125,20,15};
  using(var canvas=new Bitmap(3200,900))
  using(var g=Graphics.FromImage(canvas))
  using(var font=new Font("Malgun Gothic",25)) {
   g.Clear(ColorTranslator.FromHtml("#FCF5E9"));
   g.InterpolationMode=System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
   for(int k=0;k<8;k++) {
    string source="r3x_"+ids[k]+(ids[k]=="sol"?"_retry":"")+".png";
    using(var original=new Bitmap(dir+"/"+source))
    using(var b=new Bitmap(original.Width,original.Height,PixelFormat.Format32bppArgb)) {
     using(var copy=Graphics.FromImage(b)){copy.DrawImageUnscaled(original,0,0);}
     int w=b.Width,h=b.Height; var bg=b.GetPixel(0,0);
     var seen=new bool[w*h]; var q=new Queue<int>();
     for(int x=0;x<w;x++){q.Enqueue(x);q.Enqueue((h-1)*w+x);}
     for(int y=0;y<h;y++){q.Enqueue(y*w);q.Enqueue(y*w+w-1);}
     while(q.Count>0){
      int p=q.Dequeue();if(seen[p])continue;seen[p]=true;
      int x=p%w,y=p/w;var c=b.GetPixel(x,y);
      int dr=c.R-bg.R,dg=c.G-bg.G,db=c.B-bg.B;
      if(dr*dr+dg*dg+db*db>1600)continue;
      b.SetPixel(x,y,Color.Transparent);
      if(x>0)q.Enqueue(p-1);if(x<w-1)q.Enqueue(p+1);
      if(y>0)q.Enqueue(p-w);if(y<h-1)q.Enqueue(p+w);
     }
     b.Save(dir+"/r3x_"+ids[k]+"_cut.png",ImageFormat.Png);
     float scale=height[k]*6f/(1490-head[k]);
     float dw=w*scale,dh=h*scale;
     g.DrawImage(b,k*400+(400-dw)/2,780-1490*scale,dw,dh);
     g.DrawString(ids[k]+" / "+height[k],font,Brushes.DarkSlateGray,k*400+80,815);
    }
   }
   using(var small=new Bitmap(1600,450))
   using(var sg=Graphics.FromImage(small)){
    sg.InterpolationMode=System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
    sg.DrawImage(canvas,0,0,1600,450);
    small.Save(dir+"/r3x_lineup.png",ImageFormat.Png);
   }
  }
 }
}
