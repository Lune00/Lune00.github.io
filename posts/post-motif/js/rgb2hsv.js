//RGB to HSV : hue , saturation, Value
//En francais: TSV (Teinte,Saturation,Valeur);

export default function getComplementaryColor(rgb) {

  let hsv = rgb2hsv(rgb);
  //Transform
  let hC , sC , vC ;

  let h = hsv[0] ;
  let s = hsv[1] ;
  let v = hsv[2] ;

  if( h >= 180 ) {
    hC = h - 180 ;
  }
  else {
    hC = h + 180 ;
  }

  sC = v * s / ( v * (s - 1 ) + 1 ) ;
  vC = v * (s - 1 ) + 1 ;

  //hsv2rgb
  let hsvComplementary = [ hC, sC, vC ] ;
  return hsv2rgb( hsvComplementary ) ;
}

//rgb is an array rgb[] with r,g,b
//return rgb[] to an array hsv[]
function rgb2hsv(rgb){

  let R = rgb [ 0 ] ;
  let G = rgb [ 1 ] ;
  let B = rgb [ 2 ] ;

  if( R > 255 ) R = 255 ;
  if( G > 255 ) G = 255 ;
  if( B > 255 ) B = 255 ;

  //1)Map RGB from 0-255 to 0-1
  R = map(R,0,255,0,1);
  G = map(G,0,255,0,1);
  B = map(B,0,255,0,1);
  //2)Find max and min
  let RGBarray = [ R, G , B ] ;
  let Cmax = max(RGBarray);
  let Cmin = min(RGBarray);
  let delta = Cmax-Cmin;

  let h , s , v ;

  //3)Hue/Teinte (en degrés sur la "roue chromatique")
  if(delta == 0 ){
   h = 0 ;
  }
  else if(Cmax == R ) {
    h = (60 * (G - B ) / delta + 360 ) % 360 ;
  }
  else if(Cmax == G ) {
    h = (60 * (B - R ) / delta + 120 ) ;

  }
  else if(Cmax == B ) {
    h = (60 * (R - G ) / delta + 240 ) ;
  }

  //4) Saturation (Cmax == 0 -> Cmax-epsilon < 0)
  if(Cmax - 0.001 < 0 ) {
    s = 0 ;
  }
  else{
    s = 1 - Cmin/Cmax ;
  }

  //5) V
  v = Cmax ;
  //Return hsv sous forme d'un tableau/object
  //var hsv = [ h , s , v ] ;
  return [h , s , v ] ;
}

//hsv[] transform in rgb space and return rgb[]
function hsv2rgb(hsv){

  let h = hsv[0] ;
  let s = hsv[1] ;
  let v = hsv[2] ;

  let C = v * s ;
  let X = C * ( 1 - abs( ((h/60) % 2) - 1 ) ) ;
  let m = v * ( 1 - s ) ;

  let RGBarray ;

  if( h >= 0 && h < 60 ) {

    RGBarray = [ C , X , 0 ] ;

  }
  else if (  h >= 60 && h < 120 ) {

    RGBarray = [ X , C , 0 ] ;

  }
  else if (  h >= 120 && h < 180 ) {

    RGBarray = [ 0 , C , X ] ;
  }
   else if (  h >= 180 && h < 240 ) {

    RGBarray = [ 0 , X , C ] ;
  }
  else if (  h >= 240 && h < 300 ) {

    RGBarray = [ X , 0 , C ] ;
  }
  else{
    RGBarray = [ C , 0 , X ] ;
  }

  let R = (RGBarray[0] + m) * 255 ;
  let G = (RGBarray[1] + m) * 255 ;
  let B = (RGBarray[2] + m) * 255 ;
  return [ R , G , B ] ;
}
