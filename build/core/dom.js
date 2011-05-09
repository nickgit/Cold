Cold.add("dom",["browser"],function(){var x=Cold.cache["elems"]={};var v=function(h){if(x[h]){return x[h]}if(Cold.isString(h)){return(x[h]=document.getElementById(h))}return h};var n=function(K,J){var I=/^[\s]*<([a-zA-Z]*)[\s]*([^>]*)>(.*)<\/\1>[\s]*/i,h,H;if(K.match(I)){h=document.createElement("div");h.innerHTML=K;H=h.firstChild;if(h.childNodes.length===1){return H}else{var L=document.createDocumentFragment();while(H=h.firstChild){L.appendChild(H)}return L}}else{H=document.createElement(K);if(J){for(var w in J){H[w]=J[w]}}return H}};var d=function(M,K,h){K=K||document;if(K.getElementsByClassName){return K.getElementsByClassName(M)}else{h=h||"*";var H=[];var J=(h==="*"&&K.all)?K.all:K.getElementsByTagName(h);var I=-1,w=J.length;M=M.replace(/\-/g,"\\-");var L=new RegExp("(^|\\s)"+M+"(\\s|$)");while(++I<w){if(L.test(J[I].className)){H.push(J[I])}}return H}};var l=function(h){return typeof Cold.isString(h)?document.getElementsByTagName(h):h};var e=function(h){return String(h).replace(/\-(\w)/g,function(H,w){return w.toUpperCase()})};var s=function(h){return String(h).replace(/[A-Z]/g,"-$&").toLowerCase()};var j=function(J,I){var K=J.className,H=K.split(" ");for(var w=0,h=H.length;w<h;w++){if(H[w]===I){return true}}return false};var p=function(w,h){if(!j(w,h)){w.className=(w.className==null)?h:w.className+" "+h}};var t=function(J,I){var K=J.className,H=K.split(" ");for(var w=0,h=H.length;w<h;w++){if(H[w]===I){H[w]=""}}J.className=H.join(" ")};var i=function(I,H){var w;I=v(I);if(H!=null){var h=(H!==0&&H!=="");if(h&&m(I,"display")==="none"){m(I,"display","block")}if(h&&m(I,"visibility")==="hidden"){m(I,"visibility","visible")}I.style.opacity=H;if(Cold.browser.ie&&Cold.browser.version<=8){I.style.filter=(H==="")?"":"alpha(opacity="+H*100+")";I.style.zoom=1;if(H===1){I.style.filter=""}}}else{if(I.style.filter){w=I.style.filter.match(/alpha\(opacity=(.*)\)/);w=(!!w)?parseInt(w[1],10)/100:1;return w}return I.style.opacity||1}};var q=function(H,w){H=v(H);var h="",I=H.ownerDocument.defaultView;if(I&&I.getComputedStyle){h=I.getComputedStyle(H,null)[e(w)]}else{if(H.currentStyle){h=H.currentStyle[e(w)]}else{h=H.style[w]}}if(w==="opacity"){if(h){return parseFloat(h,10)}else{return i(H)}}return(!h||h==="auto")?0:h};var C=function(h,w){return e(w) in h.style||w in h.style||w==="opacity"};var b=function(H,w,I){H=v(H);if(Cold.isString(w)){if(I!=null){w.toLowerCase()==="opacity"?i(H,I):(H.style[e(w)]=I)}else{return q(H,w)}return H}else{w=w||{};var J="";for(var h in w){if(!w[h]&&h.toLowerCase()!=="opacity"){H.style[e(h)]="";continue}h.toLowerCase()==="opacity"?i(H,w[h]):(J+=s(h)+":"+w[h]+";")}H.style.cssText+=(H.style.cssText===""?"":";")+J;return H}};var m=function(I,H,J){if(Cold.isNumber(I.length)){for(var w=0,h=I.length;w<h;w++){b(I[w],H,J)}}else{return b(I,H,J)}};var G=function(h,I,w){h=v(h);if(Cold.isString(I)){if(w!=null){h.setAttribute(I,w)}else{return h.getAttribute(I)}}else{I=I||{};for(var H in I){h.setAttribute(H,I[H])}}return h};var o=function(h,w){h=v(h);if(!!w){h.innerHTML=w}else{return h.innerHTML}return h};var a=function(I,H,w){I=v(I);w=w?w.toLowerCase():"beforeend";if(I.insertAdjacentHTML){switch(w){case"beforebegin":I.insertAdjacentHTML("BeforeBegin",H);return I.previousSibling;case"beforeend":I.insertAdjacentHTML("BeforeEnd",H);return I.lastChild;case"afterbegin":I.insertAdjacentHTML("AfterBegin",H);return I.firstChild;case"afterend":I.insertAdjacentHTML("AfterEnd",H);return I.nextSibling}throw'Illegal insertion position : "'+w+'"'}else{var h=I.ownerDocument.createRange(),J;switch(w){case"beforebegin":h.setStartBefore(I);J=h.createContextualFragment(H);I.parentNode.insertBefore(J,I);return I.previousSibling;case"afterbegin":if(I.firstChild){h.setStartBefore(I.firstChild);J=h.createContextualFragment(H);I.insertBefore(J,I.firstChild);return I.firstChild}else{I.innerHTML=H;return I.firstChild}break;case"beforeend":if(I.lastChild){h.setStartAfter(I.lastChild);J=h.createContextualFragment(H);I.appendChild(J);return I.lastChild}else{I.innerHTML=H;return I.lastChild}break;case"afterend":h.setStartAfter(I);J=h.createContextualFragment(H);I.parentNode.insertBefore(J,I.nextSibling);return I.nextSibling}throw'Illegal insertion position : "'+w+'"'}};var c=function(w,H,h){w=v(w);h=h?h.toLowerCase():"beforeend";if(Cold.isString(H)){a(w,H,h)}else{switch(h){case"beforebegin":w.parentNode.insertBefore(H,w);break;case"afterbegin":w.insertBefore(H,w.firstChild);break;case"beforeend":w.appendChild(H);break;case"afterend":w.parentNode.insertBefore(H,w.nextSibling||null);break;default:throw'Illegal insertion position : "'+h+'"'}return H}};var g=function(w,h){return c(w,h,"beforebegin")};var r=function(w,h){return c(w,h,"afterbegin")};var F=function(w,h){return c(w,h,"beforeend")};var A=function(w,h){return c(w,h,"afterend")};var E=function(h){if(h){return h.parentNode.removeChild(h)}};var f=Cold.IE&&m(el,"display")==="none",k,z;var y=function(h){h=v(h);k=Math.max(h.offsetWidth,f?0:h.clientWidth)||0;return k<0?0:k};var u=function(h){h=v(h);z=Math.max(h.offsetHeight,f?0:h.clientHeight)||0;return z<0?0:z};var D=Cold.browser.scroll;var B=function(I){var w=0,M=0,J=I.ownerDocument,h=J.documentElement,H=D(J),L=h.clientTop||J.body.clientTop||0,K=h.clientLeft||J.body.clientLeft||0;if(I.getBoundingClientRect){w=I.getBoundingClientRect().left+H.left-K;M=I.getBoundingClientRect().top+H.top-L}else{do{w+=I.offsetLeft;w+=I.offsetTop}while(I=I.offsetParent)}return{x:w,y:M}};return{id:v,$E:v,$C:n,create:n,$CN:d,$T:l,isStyle:C,addClass:p,removeClass:t,css:m,opacity:i,val:G,html:o,insert:c,insertBefore:g,insertAfter:A,appendFront:r,appendEnd:F,remove:E,width:y,height:u,getXY:B}});