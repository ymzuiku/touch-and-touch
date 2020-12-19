!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("mico-db")):"function"==typeof define&&define.amd?define(["mico-db"],t):(e=e||self).touchAndTouch=t(e.micoDb)}(this,function(s){"use strict";function n(i,a,c,u){return new(c=c||Promise)(function(e,t){function n(e){try{r(u.next(e))}catch(e){t(e)}}function o(e){try{r(u.throw(e))}catch(e){t(e)}}function r(t){t.done?e(t.value):new c(function(e){e(t.value)}).then(n,o)}r((u=u.apply(i,a||[])).next())})}function d(n,o){var r,i,a,e,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(r)throw new TypeError("Generator is already executing.");for(;c;)try{if(r=1,i&&(a=2&t[0]?i.return:t[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,t[1])).done)return a;switch(i=0,a&&(t=[2&t[0],a.value]),t[0]){case 0:case 1:a=t;break;case 4:return c.label++,{value:t[1],done:!1};case 5:c.label++,i=t[1],t=[0];continue;case 7:t=c.ops.pop(),c.trys.pop();continue;default:if(!(a=0<(a=c.trys).length&&a[a.length-1])&&(6===t[0]||2===t[0])){c=0;continue}if(3===t[0]&&(!a||t[1]>a[0]&&t[1]<a[3])){c.label=t[1];break}if(6===t[0]&&c.label<a[1]){c.label=a[1],a=t;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(t);break}a[2]&&c.ops.pop(),c.trys.pop();continue}t=o.call(n,c)}catch(e){t=[6,e],i=0}finally{r=a=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}function l(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var o=Array(e),r=0;for(t=0;t<n;t++)for(var i=arguments[t],a=0,c=i.length;a<c;a++,r++)o[r]=i[a];return o}s=s&&s.hasOwnProperty("default")?s.default:s;var f=["submit","onchange"],v=["mousedown","touchend"],p=l(["input","submit"],v,f),o=["input","a","button","textarea","command","option","form","video"],h={speed:1,events:[],lastFocus:null};var b=function(e){if(!e||!e.getAttribute)return"";var t=e.getAttribute("tat-id"),n=e.nodeName?e.nodeName.toLocaleLowerCase():"",o='[tat-auto="'+e.getAttribute("tat-auto")+'"]';return t&&"[tat-id="+t+"]"||e.id&&"#"+e.id||e.name&&n+'[name="'+e.name+'"]'||e.key&&n+'[key="'+e.key+'"]'||o};function m(e,t){var n=e.getAttribute(t);if(!n){var o=e.closest("["+t+"]");o&&(n=o.getAttribute(t))}return n||""}function r(o,r){if(!o.closest("[tat-ignore]")){if(!o.getAttribute("tat-auto")){var e=m(o,"id"),t=m(o,"key"),n=m(o,"tat-id"),i=o.getAttribute("placeholder"),a=o.getAttribute("name"),c=o.getAttribute("type");o.setAttribute("tat-auto",[o.nodeName,i,a,c,e,t,n].filter(Boolean).join("_"))}if(!o.getAttribute("tat-seted")){o.setAttribute("tat-seted","1");var u=p;"FORM"===o.nodeName&&(u=l(f)),u.forEach(function(n){o["tat-"+n]||(o["tat-"+n]=!0,"input"===n&&"checkbox"===o.type||o.addEventListener(n,function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];r({key:b(o),event:n,value:function(e){if("object"==typeof e&&e.target){var t=e.target,n=t.getAttribute("type");return"checkbox"===n||"radio"===n?t.checked:e.target.value}return e||""}(e[0])})}))})}}}function i(e,t){t&&e.querySelectorAll(o.join(",")).forEach(function(e){r(e,t)})}function e(t,n){Object.keys(n).forEach(function(e){t.style[e]=n[e]})}var a={FORM:1,HTML:1,div:1},t="translate(-10px, -28px) ",y=document.createElement("div");e(y,{transition:"all "+.3*h.speed+"s cubic-bezier(0.23, 1, 0.32, 1)",position:"fixed",pointerEvents:"none",left:"-50px",top:"-50px",zIndex:9900});var c=document.createElement("div");e(c,{transform:"translate(-3px, -3px)",filter:"drop-shadow(0px 6px 3px rgba(0,0,0,0.25))"}),c.innerHTML='\n<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3740"><path d="M796.377747 658.252171H584.209846l111.661948 271.985873c7.777996 18.855991-1.109999 39.997981-18.887991 47.997977l-98.329954 42.85398c-18.329991 7.999996-38.885982-1.141999-46.663978-19.427991l-106.105951-258.271878-173.327918 178.275916C229.458012 945.420037 192.00003 927.108045 192.00003 895.95406V36.598463C192.00003 3.798478 231.842011-12.191514 252.554002 10.886475l568.823733 585.083726c22.943989 22.35799 6.013997 62.281971-24.999988 62.28197z" fill="" p-id="3741"></path></svg>\n';var u=document.createElement("div");function g(e){h.lastFocus&&document.contains(h.lastFocus)&&h.lastFocus.focus&&(h.lastFocus.blur(),h.lastFocus=void 0),y.style.top=e.clientY+"px",y.style.left=e.clientX+"px",setTimeout(function(){u.style.transform=t+"scale(0.5, 0.5)",setTimeout(function(){u.style.transform=t+"scale(1, 1)"},150*h.speed)},150*h.speed)}e(u,{display:"block",transition:"all 0.2s cubic-bezier(0.23, 1, 0.32, 1)",transform:t,width:"20px",height:"20px",borderRadius:"10px",background:"rgba(0,100,255,0.35)"}),y.append(c,u),document.body.append(y);function w(e,t){var n=e.getBoundingClientRect();t.clientX=n.left+n.width/2,t.clientY=n.top+n.height/2}var x="tat-need-replay";function k(t){return new Promise(function(e){setTimeout(e,t)})}function E(l){return n(void 0,void 0,void 0,function(){var t,n,o,r,i,a,c,u;return d(this,function(e){switch(e.label){case 0:if(!s.getLocalStorage(x))return[2];t=l.speed,(n=l.events).forEach(function(e,t){e.index=t}),h.speed=t,o=0,r=n,e.label=1;case 1:return o<r.length?"mclick"!==(i=r[o]).event?[3,3]:[4,new Promise(function(e){setTimeout(e,300*h.speed)})]:[3,12];case 2:return e.sent(),g(i),[3,10];case 3:return i.key?[4,k(50*h.speed)]:[3,10];case 4:return e.sent(),[4,function(o){return new Promise(function(t){var n=function(){var e=document.querySelector(o);e?t(e):setTimeout(function(){n()},50)};n()})}(i.key)];case 5:return a=e.sent(),-1<v.indexOf(i.event)?(w(a,i),g(i),[4,k(300*h.speed)]):[3,7];case 6:return e.sent(),function(e){if(!e.closest("[tat-ignore]")){var t=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});e.scrollIntoView(!0),e.dispatchEvent(t)}}(a),[3,10];case 7:return h.lastFocus===a?[3,9]:(w(a,i),function(e){y.style.left=e.clientX+"px",y.style.top=e.clientY+"px"}(i),[4,k(200*h.speed)]);case 8:e.sent(),e.label=9;case 9:!function(e,t,n){if(!e.closest("[tat-ignore]")){"INPUT"!==(h.lastFocus=e).nodeName&&"TEXTAREA"!==e.nodeName||e.focus();var o=new InputEvent(n,{data:t.value,view:window,bubbles:!0,cancelable:!0});e.scrollIntoView(!0),e.value=t&&t.value||"",e.dispatchEvent(o)}}(a,i,i.event),e.label=10;case 10:if(i.index===n.length-1)for(c=n.length,u=0;u<c;u++)h.events[u]=n[u];e.label=11;case 11:return o++,[3,1];case 12:return s.removeLocalStorage(x),[2]}})})}return function(e){void 0===e&&(e={}),function(e){var r=e.onSet,t=e.tags;null==t||t.forEach(function(e){return o.push(e)}),document.body.setAttribute("tat","body");var n=r;r=function(e){h.events.push(e),n&&n(e)},i(document.body,r);new MutationObserver(function(e){for(var t=0,n=e;t<n.length;t++){var o=n[t];"childList"===o.type&&i(o.target,r)}}).observe(document.body,{attributes:!1,childList:!0,subtree:!0}),r({event:"href",href:window.location.href}),window.addEventListener("mousedown",function(e){a[e.target.nodeName]&&r&&r({event:"mclick",clientX:e.clientX,clientY:e.clientY})}),window.addEventListener("touchend",function(e){a[e.target.nodeName]&&r&&r({event:"mclick",clientX:e.clientX,clientY:e.clientY})})}(e);var t=function(e){var t=e.save,n=e.replay,o=document.createElement("div");o.setAttribute("tat-ignore","1"),o.style.zIndex="9901",o.style.position="fixed",o.style.right="0px",o.style.bottom="0px",o.style.color="#fff";var r=document.createElement("button");r.textContent="Save",r.onclick=t;var i=document.createElement("button");return i.textContent="Replay",i.onclick=n,o.append(r,i),o}({save:function(){s.set("touch-and-touch",h.events)},replay:function(){return n(void 0,void 0,void 0,function(){return d(this,function(e){switch(e.label){case 0:return[4,s.get("touch-and-touch")];case 1:return function(e){var t=e.events[0];s.setLocalStorage(x,1),t&&t.href&&(window.location.href===t.href?window.location.reload():window.location.href=t.href)}({speed:1,events:e.sent()}),[2]}})})}});s.get("touch-and-touch").then(function(e){e&&E({speed:1,events:e})}),document.body.append(t)}});
//# sourceMappingURL=index.js.map
