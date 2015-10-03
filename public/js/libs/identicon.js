/**
* A handy class to calculate color values.
*
* @version 1.0
* @author Robert Eisele <robert@xarg.org>
* @copyright Copyright (c) 2010, Robert Eisele
* @link http://www.xarg.org/2010/03/generate-client-side-png-files-using-javascript/
* @license http://www.opensource.org/licenses/bsd-license.php BSD License
*
*/
(function(){function e(a,d){for(var b=2;b<arguments.length;b++)for(var c=0;c<arguments[b].length;c++)a[d++]=arguments[b].charAt(c)}function d(a){return String.fromCharCode(a>>24&255,a>>16&255,a>>8&255,a&255)}function c(a){return String.fromCharCode(a&255,a>>8&255)}window.PNGlib=function(a,g,b){this.width=a;this.height=g;this.depth=b;this.pix_size=g*(a+1);this.data_size=2+this.pix_size+5*Math.floor((65534+this.pix_size)/65535)+4;this.ihdr_offs=0;this.ihdr_size=25;this.plte_offs=this.ihdr_offs+this.ihdr_size;
this.plte_size=3*b+12;this.trns_offs=this.plte_offs+this.plte_size;this.trns_size=8+b+4;this.idat_offs=this.trns_offs+this.trns_size;this.idat_size=8+this.data_size+4;this.iend_offs=this.idat_offs+this.idat_size;this.iend_size=12;this.buffer_size=this.iend_offs+this.iend_size;this.buffer=[];this.palette={};this.pindex=0;var f=[];for(b=0;b<this.buffer_size;b++)this.buffer[b]="\x00";e(this.buffer,this.ihdr_offs,d(this.ihdr_size-12),"IHDR",d(a),d(g),"\b\u0003");e(this.buffer,this.plte_offs,d(this.plte_size-
12),"PLTE");e(this.buffer,this.trns_offs,d(this.trns_size-12),"tRNS");e(this.buffer,this.idat_offs,d(this.idat_size-12),"IDAT");e(this.buffer,this.iend_offs,d(this.iend_size-12),"IEND");b=30912;b+=31-b%31;e(this.buffer,this.idat_offs+8,String.fromCharCode(b>>8&255,b&255));for(b=0;(b<<16)-1<this.pix_size;b++)b+65535<this.pix_size?(a=65535,g="\x00"):(a=this.pix_size-(b<<16)-b,g="\u0001"),e(this.buffer,this.idat_offs+8+2+(b<<16)+(b<<2),g,c(a),c(~a));for(b=0;256>b;b++){a=b;for(g=0;8>g;g++)a=a&1?-306674912^
a>>1&2147483647:a>>1&2147483647;f[b]=a}this.index=function(a,d){var b=d*(this.width+1)+a+1;return this.idat_offs+8+2+5*Math.floor(b/65535+1)+b};this.color=function(a,d,b,c){c=0<=c?c:255;var e=((c<<8|a)<<8|d)<<8|b;if("undefined"==typeof this.palette[e]){if(this.pindex==this.depth)return"\x00";var f=this.plte_offs+8+3*this.pindex;this.buffer[f+0]=String.fromCharCode(a);this.buffer[f+1]=String.fromCharCode(d);this.buffer[f+2]=String.fromCharCode(b);this.buffer[this.trns_offs+8+this.pindex]=String.fromCharCode(c);
this.palette[e]=String.fromCharCode(this.pindex++)}return this.palette[e]};this.getBase64=function(){var a=this.getDump(),d,b,c,e,f=a.length,g=0,n="";do d=a.charCodeAt(g),e=d>>2,b=a.charCodeAt(g+1),d=(d&3)<<4|b>>4,c=a.charCodeAt(g+2),b=f<g+2?64:(b&15)<<2|c>>6,c=f<g+3?64:c&63,n+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b)+
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c);while((g+=3)<f);return n};this.getDump=function(){function a(b,c,g){for(var h=-1,k=4;k<g-4;k+=1)h=f[(h^b[c+k].charCodeAt(0))&255]^h>>8&16777215;e(b,c+g-4,d(h^-1))}for(var b=1,c=0,g=5552,l=0;l<this.height;l++)for(var m=-1;m<this.width;m++)b+=this.buffer[this.index(m,l)].charCodeAt(0),c+=b,0==--g&&(b%=65521,c%=65521,g=5552);e(this.buffer,this.idat_offs+this.idat_size-8,d(c%65521<<16|b%65521));a(this.buffer,this.ihdr_offs,
this.ihdr_size);a(this.buffer,this.plte_offs,this.plte_size);a(this.buffer,this.trns_offs,this.trns_size);a(this.buffer,this.idat_offs,this.idat_size);a(this.buffer,this.iend_offs,this.iend_size);return"\u0089PNG\r\n\u001a\n"+this.buffer.join("")}}})();

/**
 * Identicon.js v1.0
 * http://github.com/stewartlord/identicon.js
 *
 * Requires PNGLib
 * http://www.xarg.org/download/pnglib.js
 *
 * Copyright 2013, Stewart Lord
 * Released under the BSD license
 * http://www.opensource.org/licenses/bsd-license.php
 */
(function(){Identicon=function(e,d,c){this.hash=e;this.size=d||64;this.margin=c||.08};Identicon.prototype={hash:null,size:null,margin:null,render:function(){var e=this.hash,d=this.size,c=Math.floor(d*this.margin),a=Math.floor((d-2*c)/5),d=new PNGlib(d,d,256),g=d.color(240,240,240),b=this.hsl2rgb(parseInt(e.substr(-7),16)/268435455,.5,.7),b=d.color(255*b[0],255*b[1],255*b[2]),f,h;for(f=0;15>f;f++)h=parseInt(e.charAt(f),16)%2?g:b,5>f?this.rectangle(2*a+c,f*a+c,a,a,h,d):10>f?(this.rectangle(1*a+c,(f-
5)*a+c,a,a,h,d),this.rectangle(3*a+c,(f-5)*a+c,a,a,h,d)):15>f&&(this.rectangle(0*a+c,(f-10)*a+c,a,a,h,d),this.rectangle(4*a+c,(f-10)*a+c,a,a,h,d));return d},rectangle:function(e,d,c,a,g,b){var f,h;for(f=e;f<e+c;f++)for(h=d;h<d+a;h++)b.buffer[b.index(f,h)]=g},hsl2rgb:function(e,d,c){e*=6;d=[c+=d*=.5>c?c:1-c,c-e%1*d*2,c-=d*=2,c,c+e%1*d,c+d];return[d[~~e%6],d[(e|16)%6],d[(e|8)%6]]},toString:function(){return this.render().getBase64()}};window.Identicon=Identicon})();
