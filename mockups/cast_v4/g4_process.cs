using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
public static class G4Process {
  public static void Key(string root, string name, bool black) {
    using(var s=new Bitmap(root+name+(black?"_black.png":"_key.png")))
    using(var d=new Bitmap(s.Width,s.Height)) {
      for(int y=0;y<s.Height;y++) for(int x=0;x<s.Width;x++) {
        Color c=s.GetPixel(x,y);
        if(black) {
          int v=Math.Max(c.R,Math.Max(c.G,c.B));
          if(v<8||c.A==0) continue;
          d.SetPixel(x,y,Color.FromArgb(v*c.A/255,c.R*255/v,c.G*255/v,c.B*255/v));
        } else {
          int spill=Math.Min(c.G,c.B)-c.R;
          if(spill>20) {
            int a=Math.Max(0,255-spill);
            if(a<32) continue;
            d.SetPixel(x,y,Color.FromArgb(a,Math.Min(255,c.R*255/a),Math.Max(0,Math.Min(255,(c.G-255+a)*255/a)),Math.Max(0,Math.Min(255,(c.B-255+a)*255/a))));
          } else d.SetPixel(x,y,c);
        }
      }
      d.Save(root+name+".png",ImageFormat.Png);
    }
  }
  public static void Resize(string root,string name,int w,int h) {
    ResizeFile(root+name+"_key.png",root+name+".png",w,h);
  }
  public static void ResizeFile(string source,string target,int w,int h) {
    using(var original=new Bitmap(source))
    using(var s=new Bitmap(original))
    using(var d=new Bitmap(w,h))
    using(var g=Graphics.FromImage(d)) {
      g.InterpolationMode=InterpolationMode.HighQualityBicubic;
      g.DrawImage(s,0,0,w,h);
      original.Dispose();
      d.Save(target,ImageFormat.Png);
    }
  }
  public static void Face(string root,int x,int y,int size) {
    using(var s=new Bitmap(root+"detail.png"))
    using(var d=new Bitmap(160,160))
    using(var g=Graphics.FromImage(d)) {
      g.InterpolationMode=InterpolationMode.HighQualityBicubic;
      g.DrawImage(s,new Rectangle(0,0,160,160),new Rectangle(x,y,size,size),GraphicsUnit.Pixel);
      d.Save(root+"face.png",ImageFormat.Png);
    }
  }
}
