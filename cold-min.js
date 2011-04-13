(function(){var d=function(i,j){var e=i.callback;i.callback=i.onerror=function(){i.callback=i.onerror=null;e&&e();j&&j()}};var h=function(e){if(!/^\s*Cold/.test(e)){return"Cold."+e}return e};var f=function(j){var i=j,e=Cold.DEBUG?"/src":"/bulid";if(!(/app|component|util|task|other/g.test(j))){i=j.replace(/cold/i,"cold.core")}i=i.replace(/\./g,"/");return Cold.BaseURL+i.replace(/cold/i,"cold"+e)+".js"};var c=function(m,o){var k,e,n=Cold.reqList;m=h(m);n[m]=n[m]||[];for(k=0,e=o.length;k<e;k++){o[k]=h(o[k]);a(n[m],o[k])&&o.splice(k,1)}var j=a(o,m);j&&o.splice(j-1,1);for(k=0,e=o.length;k<e;k++){n[o[k]]=n[o[k]]||[];n[o[k]].push(m);n[o[k]]=n[o[k]].concat(n[m])}};var b=function(e){var k=false,l=Cold.scripts;if(e.length&&l["Cold.base"]&&/loaded|loading/i.test(l["Cold.base"])){for(var j=0;j<e.length;j++){if(/(Cold\.)?[browser|anim|ajax|event|dom|base]/i.test(e[j])){e.splice(j--,1);k=true}}k&&(e[e.length]="Cold.base")}};var a=function(m,k){if(m){for(var j=0,e=m.length;j<e;j++){if(m[j]===k){return j+1}}}return false};window.Cold={VERSION:"0.0.1",DEBUG:true,BaseURL:(function(){var e=document.getElementsByTagName("script"),j=e[e.length-1].src,i=/(.*)cold\/cold(-min)?\.js/i;return(j.match(i)||window.location.href.match(i))[1]})(),cache:{},scripts:{loadingN:0,nodes:{}},reqList:{},extend:function(k,e,i){k=k||{};e=e||{};i=i||false;for(var j in e){if(i){k[j]=e[j]}else{if(!k[j]){k[j]=e[j]}else{continue}}}return k},add:function(l,p,n){var q=h(l),o=q.split("."),e=o.length,i=window,m=Cold.scripts,k=m.nodes[f(q)];var j=(function(r){return function(){if(r.done){return}var t=typeof r==="function"&&r();if(t!=null){if(!(o[0] in window)){window[o[0]]={}}for(var s=0,u;s<e;s++){u=o[s];if(s===e-1){if(i[u]){Cold.extend(i[u],t)}else{i[u]=t}break}(!i[u])&&(i[u]={});i=i[u]}}k&&k.callback&&k.callback();m[q]="attached";r.done=true}})(typeof p==="function"?p:n);if(m[q]){m[q]="loaded"}if(typeof p!=="function"&&p.length>0){c(q,p)}if(typeof p!=="function"&&p.length>0){return Cold.loadReq(p,j)}j();return Cold},task:function(e,i){if(typeof e==="function"){e()}else{if(e.length>0){return Cold.loadReq(e,i)}else{i&&i()}}return Cold},loadReq:function(j,i){b(j);var e=j.length;return Cold.load(j,function(){--e===0&&i&&i()})},addScript:function(e,l){var k=document.createElement("script"),i=document.getElementsByTagName("head")[0],j=Cold.scripts;k.setAttribute("type","text/javascript");k.setAttribute("src",e);k.setAttribute("async",true);i.appendChild(k);d(k,function(){l&&l.call();i.removeChild(k)});j.nodes[e]=k;return Cold},loadSingle:function(k,m){var j=h(k),i=Cold.scripts,e=f(j),l=i.nodes[e];if(i[j]==="attached"){typeof m==="function"&&m.call()}else{if(i[j]==="loading"||i[j]==="loaded"){l&&d(l,function(){m&&m.call()})}else{i[j]="loading";i.loadingN?(i.loadingN+=1):(i.loadingN=1);Cold.addScript(e,function(){typeof m==="function"&&m();i[j]="attached";i.loadingN-=1},true)}}return Cold},load:function(k,l){k=k||[];if(typeof k==="string"){return Cold.loadSingle(k,l)}else{for(var j=0,e=k.length;j<e;j++){k[j]&&Cold.loadSingle(k[j],function(){typeof l==="function"&&l.call()})}}return Cold}};Cold.log=(Cold.DEBUG&&window.console)?function(e){console.log(e)}:function(){};try{document.domain=window.location.href.match(/http:\/\/(www\.)?([^\/]*)\//)[2];document.execCommand("BackgroundImageCache",false,true)}catch(g){}})();Cold.add("Cold",function(){var d=[],b=null,e=false;var j=function(){return(Cold.scripts.loadingN===0)};var i=function(){if(e===true){return}e=true;for(var m=0,k=d.length;m<k;m++){d[m](Cold)}d=[]};var a=function(){if(e===true){return}if(j()===false){b=setTimeout(arguments.callee,5);return}b&&clearTimeout(b);i.call();Cold.scripts.nodes={};Cold.reqList={}};var c=(function(){if(c){return}var k=document.documentElement.doScroll;if(document.addEventListener){document.addEventListener("DOMContentLoaded",a,false);window.addEventListener("load",a,false)}else{document.attachEvent("onreadystatechange",a);window.attachEvent("onload",a);if(k&&window==window.top){(function(){try{k("left")}catch(l){setTimeout(arguments.callee,0)}})()}}return true})();var h=function(k){if(typeof k!=="function"){return}if(e===true||(/loaded|complete/).test(document.readyState.toLowerCase())){k(Cold)}else{d.push(k)}};var g=function(m,o){if(!m.length){return}for(var n=0,k=m.length;n<k;n++){if(o.call(null,m[n])===false){return}}};var f={};(function(){var n=Object.prototype.toString;var o=["Array","Function","String","Number"];for(var m=0,k=o.length;m<k;m++){(function(l){f["is"+o[l]]=function(p){return n.call(p)==="[object "+o[l]+"]"}})(m)}})();return{isArray:f.isArray,isFunction:f.isFunction,isString:f.isString,isNumber:f.isNumber,ready:h,each:g}});