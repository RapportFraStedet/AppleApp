(function(k){function m(b,a){this.file=b;this.options=g.extend({},h,a);this._defaults=h;this._name=l;this.init()}var l="canvasResize",g={newsize:function(b,a,c,d,f){var e=f?"h":"";if(c&&b>c||d&&a>d)a=b/a,(a>=1||d===0)&&c&&!f?(b=c,a=c/a>>0):f&&a<=c/d?(b=c,a=c/a>>0,e="w"):(b=d*a>>0,a=d);return{width:b,height:a,cropped:e}},dataURLtoBlob:function(b){for(var a=b.split(",")[0].split(":")[1].split(";")[0],c=atob(b.split(",")[1]),b=new ArrayBuffer(c.length),d=new Uint8Array(b),f=0;f<c.length;f++)d[f]=c.charCodeAt(f);
return(c=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder)?(c=new (window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder),c.append(b),c.getBlob(a)):c=new Blob([b],{type:a})},detectSubsampling:function(b){var a=b.naturalWidth;if(a*b.naturalHeight>1048576){var c=document.createElement("canvas");c.width=c.height=1;c=c.getContext("2d");c.drawImage(b,-a+1,0);return c.getImageData(0,0,1,1).data[3]===0}else return!1},rotate:function(b,a){var c={1:{90:6,180:3,270:8},2:{90:7,
180:4,270:5},3:{90:8,180:1,270:6},4:{90:5,180:2,270:7},5:{90:2,180:7,270:4},6:{90:3,180:8,270:1},7:{90:4,180:5,270:2},8:{90:1,180:6,270:3}};return c[b][a]?c[b][a]:b},transformCoordinate:function(b,a,c,d){switch(d){case 5:case 6:case 7:case 8:b.width=c;b.height=a;break;default:b.width=a,b.height=c}b=b.getContext("2d");switch(d){case 2:b.translate(a,0);b.scale(-1,1);break;case 3:b.translate(a,c);b.rotate(Math.PI);break;case 4:b.translate(0,c);b.scale(1,-1);break;case 5:b.rotate(0.5*Math.PI);b.scale(1,
-1);break;case 6:b.rotate(0.5*Math.PI);b.translate(0,-c);break;case 7:b.rotate(0.5*Math.PI);b.translate(a,-c);b.scale(-1,1);break;case 8:b.rotate(-0.5*Math.PI),b.translate(-a,0)}},detectVerticalSquash:function(b,a,c){a=document.createElement("canvas");a.width=1;a.height=c;a=a.getContext("2d");a.drawImage(b,0,0);for(var b=a.getImageData(0,0,1,c).data,a=0,d=c,f=c;f>a;)b[(f-1)*4+3]===0?d=f:a=f,f=d+a>>1;c=f/c;return c===0?1:c},callback:function(b){return b},extend:function(){var b=arguments[0]||{},a=
1,c=arguments.length,d=!1;b.constructor===Boolean&&(d=b,b=arguments[1]||{});c===1&&(b=this,a=0);for(var f;a<c;a++)if((f=arguments[a])!==null)for(var e in f)b!==f[e]&&(d&&typeof f[e]==="object"&&b[e]?g.extend(b[e],f[e]):f[e]!==void 0&&(b[e]=f[e]));return b}},h={width:300,height:0,crop:!1,quality:80,rotate:0,callback:g.callback};m.prototype={init:function(){var b=this,a=this.file,c=a.split(","),d=c[0].split(";")[0].split(":")[1],c=atob(c[1]),c=new BinaryFile(c,0,c.length),f=EXIF.readFromBinaryFile(c),
e=new Image;e.onload=function(){var a=f.Orientation||1,a=g.rotate(a,b.options.rotate),c=a>=5&&a<=8?g.newsize(e.height,e.width,Math.floor(e.width*b.options.scale/100),Math.floor(e.height*b.options.scale/100),b.options.crop):g.newsize(e.width,e.height,Math.floor(e.width*b.options.scale/100),Math.floor(e.height*b.options.scale/100),b.options.crop),i=e.width,h=e.height,j=c.width,n=c.height,k=document.createElement("canvas"),l=k.getContext("2d");l.save();g.transformCoordinate(k,j,n,a);g.detectSubsampling(e)&&
(i/=2,h/=2);a=document.createElement("canvas");a.width=a.height=1024;for(var m=a.getContext("2d"),o=g.detectVerticalSquash(e,i,h),r=Math.ceil(1024*j/i),o=Math.ceil(1024*n/h/o),p=0,s=0;p<h;){for(var q=0,t=0;q<i;)m.clearRect(0,0,1024,1024),m.drawImage(e,-q,-p),l.drawImage(a,0,0,1024,1024,t,s,r,o),q+=1024,t+=r;p+=1024;s+=o}l.restore();i=document.createElement("canvas");i.width=c.cropped==="h"?n:j;i.height=c.cropped==="w"?j:n;h=c.cropped==="h"?(n-j)*0.5:0;c=c.cropped==="w"?(j-n)*0.5:0;i.getContext("2d").drawImage(k,
h,c,j,n);j=d==="image/png"?i.toDataURL(d):i.toDataURL("image/jpeg",b.options.quality*0.01);j.length<10?b.options.callback(b.file,e.width,e.height):b.options.callback(j,i.width,i.height)};e.src=a}};k[l]=function(b,a){new m(b,a)}})(window);
var BinaryFile=function(k,m,l){var g=k,h=m||0,b=0;this.getRawData=function(){return g};if(typeof k=="string")b=l||g.length,this.getByteAt=function(a){return g.charCodeAt(a+h)&255},this.getBytesAt=function(a,b){for(var d=[],f=0;f<b;f++)d[f]=g.charCodeAt(a+f+h)&255;return d};else if(typeof k=="unknown")b=l||IEBinary_getLength(g),this.getByteAt=function(a){return IEBinary_getByteAt(g,a+h)},this.getBytesAt=function(a,b){return(new VBArray(IEBinary_getBytesAt(g,a+h,b))).toArray()};this.getLength=function(){return b};
this.getSByteAt=function(a){a=this.getByteAt(a);return a>127?a-256:a};this.getShortAt=function(a,b){var d=b?(this.getByteAt(a)<<8)+this.getByteAt(a+1):(this.getByteAt(a+1)<<8)+this.getByteAt(a);d<0&&(d+=65536);return d};this.getSShortAt=function(a,b){var d=this.getShortAt(a,b);return d>32767?d-65536:d};this.getLongAt=function(a,b){var d=this.getByteAt(a),f=this.getByteAt(a+1),e=this.getByteAt(a+2),g=this.getByteAt(a+3),d=b?(((d<<8)+f<<8)+e<<8)+g:(((g<<8)+e<<8)+f<<8)+d;d<0&&(d+=4294967296);return d};
this.getSLongAt=function(a,b){var d=this.getLongAt(a,b);return d>2147483647?d-4294967296:d};this.getStringAt=function(a,b){for(var d=[],f=this.getBytesAt(a,b),e=0;e<b;e++)d[e]=String.fromCharCode(f[e]);return d.join("")};this.getCharAt=function(a){return String.fromCharCode(this.getByteAt(a))};this.toBase64=function(){return window.btoa(g)};this.fromBase64=function(a){g=window.atob(a)}};
