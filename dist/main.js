/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var t=Object.prototype.toString,e=Array.isArray||function(e){return"[object Array]"===t.call(e)};function n(t){return"function"==typeof t}function r(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function s(t,e){return null!=t&&"object"==typeof t&&e in t}var a=RegExp.prototype.test,i=/\S/;var o={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},c=/\s*/,l=/\s+/,p=/\s*=/,h=/\s*\}/,u=/#|\^|\/|>|\{|&|=|!/;function f(t){this.string=t,this.tail=t,this.pos=0}function d(t,e){this.view=t,this.cache={".":this.view},this.parent=e}function v(){this.templateCache={_cache:{},set:function(t,e){this._cache[t]=e},get:function(t){return this._cache[t]},clear:function(){this._cache={}}}}f.prototype.eos=function(){return""===this.tail},f.prototype.scan=function(t){var e=this.tail.match(t);if(!e||0!==e.index)return"";var n=e[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},f.prototype.scanUntil=function(t){var e,n=this.tail.search(t);switch(n){case-1:e=this.tail,this.tail="";break;case 0:e="";break;default:e=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=e.length,e},d.prototype.push=function(t){return new d(t,this)},d.prototype.lookup=function(t){var e,r,a,i=this.cache;if(i.hasOwnProperty(t))e=i[t];else{for(var o,c,l,p=this,h=!1;p;){if(t.indexOf(".")>0)for(o=p.view,c=t.split("."),l=0;null!=o&&l<c.length;)l===c.length-1&&(h=s(o,c[l])||(r=o,a=c[l],null!=r&&"object"!=typeof r&&r.hasOwnProperty&&r.hasOwnProperty(a))),o=o[c[l++]];else o=p.view[t],h=s(p.view,t);if(h){e=o;break}p=p.parent}i[t]=e}return n(e)&&(e=e.call(this.view)),e},v.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},v.prototype.parse=function(t,n){var s=this.templateCache,o=t+":"+(n||g.tags).join(":"),d=void 0!==s,v=d?s.get(o):void 0;return null==v&&(v=function(t,n){if(!t)return[];var s,o,d,v,k=!1,y=[],w=[],m=[],b=!1,j=!1,x="",_=0;function C(){if(b&&!j)for(;m.length;)delete w[m.pop()];else m=[];b=!1,j=!1}function $(t){if("string"==typeof t&&(t=t.split(l,2)),!e(t)||2!==t.length)throw new Error("Invalid tags: "+t);s=new RegExp(r(t[0])+"\\s*"),o=new RegExp("\\s*"+r(t[1])),d=new RegExp("\\s*"+r("}"+t[1]))}$(n||g.tags);for(var T,E,U,P,I,S,V=new f(t);!V.eos();){if(T=V.pos,U=V.scanUntil(s))for(var O=0,A=U.length;O<A;++O)v=P=U.charAt(O),function(t,e){return a.call(t,e)}(i,v)?(j=!0,k=!0,x+=" "):(m.push(w.length),x+=P),w.push(["text",P,T,T+1]),T+=1,"\n"===P&&(C(),x="",_=0,k=!1);if(!V.scan(s))break;if(b=!0,E=V.scan(u)||"name",V.scan(c),"="===E?(U=V.scanUntil(p),V.scan(p),V.scanUntil(o)):"{"===E?(U=V.scanUntil(d),V.scan(h),V.scanUntil(o),E="&"):U=V.scanUntil(o),!V.scan(o))throw new Error("Unclosed tag at "+V.pos);if(I=">"==E?[E,U,T,V.pos,x,_,k]:[E,U,T,V.pos],_++,w.push(I),"#"===E||"^"===E)y.push(I);else if("/"===E){if(!(S=y.pop()))throw new Error('Unopened section "'+U+'" at '+T);if(S[1]!==U)throw new Error('Unclosed section "'+S[1]+'" at '+T)}else"name"===E||"{"===E||"&"===E?j=!0:"="===E&&$(U)}if(C(),S=y.pop())throw new Error('Unclosed section "'+S[1]+'" at '+V.pos);return function(t){for(var e,n=[],r=n,s=[],a=0,i=t.length;a<i;++a)switch((e=t[a])[0]){case"#":case"^":r.push(e),s.push(e),r=e[4]=[];break;case"/":s.pop()[5]=e[2],r=s.length>0?s[s.length-1][4]:n;break;default:r.push(e)}return n}(function(t){for(var e,n,r=[],s=0,a=t.length;s<a;++s)(e=t[s])&&("text"===e[0]&&n&&"text"===n[0]?(n[1]+=e[1],n[3]=e[3]):(r.push(e),n=e));return r}(w))}(t,n),d&&s.set(o,v)),v},v.prototype.render=function(t,e,n,r){var s=this.getConfigTags(r),a=this.parse(t,s),i=e instanceof d?e:new d(e,void 0);return this.renderTokens(a,i,n,t,r)},v.prototype.renderTokens=function(t,e,n,r,s){for(var a,i,o,c="",l=0,p=t.length;l<p;++l)o=void 0,"#"===(i=(a=t[l])[0])?o=this.renderSection(a,e,n,r,s):"^"===i?o=this.renderInverted(a,e,n,r,s):">"===i?o=this.renderPartial(a,e,n,s):"&"===i?o=this.unescapedValue(a,e):"name"===i?o=this.escapedValue(a,e,s):"text"===i&&(o=this.rawValue(a)),void 0!==o&&(c+=o);return c},v.prototype.renderSection=function(t,r,s,a,i){var o=this,c="",l=r.lookup(t[1]);if(l){if(e(l))for(var p=0,h=l.length;p<h;++p)c+=this.renderTokens(t[4],r.push(l[p]),s,a,i);else if("object"==typeof l||"string"==typeof l||"number"==typeof l)c+=this.renderTokens(t[4],r.push(l),s,a,i);else if(n(l)){if("string"!=typeof a)throw new Error("Cannot use higher-order sections without the original template");null!=(l=l.call(r.view,a.slice(t[3],t[5]),(function(t){return o.render(t,r,s,i)})))&&(c+=l)}else c+=this.renderTokens(t[4],r,s,a,i);return c}},v.prototype.renderInverted=function(t,n,r,s,a){var i=n.lookup(t[1]);if(!i||e(i)&&0===i.length)return this.renderTokens(t[4],n,r,s,a)},v.prototype.indentPartial=function(t,e,n){for(var r=e.replace(/[^ \t]/g,""),s=t.split("\n"),a=0;a<s.length;a++)s[a].length&&(a>0||!n)&&(s[a]=r+s[a]);return s.join("\n")},v.prototype.renderPartial=function(t,e,r,s){if(r){var a=this.getConfigTags(s),i=n(r)?r(t[1]):r[t[1]];if(null!=i){var o=t[6],c=t[5],l=t[4],p=i;0==c&&l&&(p=this.indentPartial(i,l,o));var h=this.parse(p,a);return this.renderTokens(h,e,r,p,s)}}},v.prototype.unescapedValue=function(t,e){var n=e.lookup(t[1]);if(null!=n)return n},v.prototype.escapedValue=function(t,e,n){var r=this.getConfigEscape(n)||g.escape,s=e.lookup(t[1]);if(null!=s)return"number"==typeof s&&r===g.escape?String(s):r(s)},v.prototype.rawValue=function(t){return t[1]},v.prototype.getConfigTags=function(t){return e(t)?t:t&&"object"==typeof t?t.tags:void 0},v.prototype.getConfigEscape=function(t){return t&&"object"==typeof t&&!e(t)?t.escape:void 0};var g={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){k.templateCache=t},get templateCache(){return k.templateCache}},k=new v;g.clearCache=function(){return k.clearCache()},g.parse=function(t,e){return k.parse(t,e)},g.render=function(t,n,r,s){if("string"!=typeof t)throw new TypeError('Invalid template! Template should be a "string" but "'+(e(a=t)?"array":typeof a)+'" was given as the first argument for mustache#render(template, view, partials)');var a;return k.render(t,n,r,s)},g.escape=function(t){return String(t).replace(/[&<>"'`=\/]/g,(function(t){return o[t]}))},g.Scanner=f,g.Context=d,g.Writer=v;const y=g,w=function(t,e){const n=$(t),r=$(e);"none"===n.css("display")&&"flex"===r.css("display")?(n.css("display","flex"),r.css("display","none")):(n.css("display","none"),r.css("display","flex"))};!function(){const t=$(".nav-bar"),e=t.find("#new_project"),n=t.find("#project_form"),r=n.find("#project_input"),s=n.find(".btn_add_project"),a=(n.find("#btn_cancel_project"),t.find("ul")),i=$(".tasks-preview"),o=i.find(".add-task-show"),c=i.find(".task-input-div"),l=i.find("#task_input"),p=i.find(".btn_add_task"),h=i.find("#tasks-list"),u=i.find(".task-header");let f=[];const d=()=>{const t=new class{constructor(t){this.name=t,this.tasks=[],this.dataIndex=t,this.cacheDom()}cacheDom(){this.$nav=$(".nav-bar"),this.$projectModule=this.$nav.find("#projectModule"),this.$ul=this.$projectModule.find("ul"),this.$tasksPreview=$(".tasks-preview"),this.$taskUl=this.$tasksPreview.find("#tasks-list")}render(t){"project"===t?this.$ul.append(y.render('\n    <li class="project-li" data-project-index="{{dataIndex}}">\n        <span class="btn__icon"><i class="fa-solid fa-list"></i></span>\n        <span class="btn__text">{{name}}</span>\n        <span class="btn__icon"><i class="fa-regular fa-trash-can"></i></span>\n    </li>\n    ',{name:this.name,dataIndex:this.dataIndex})):"task"===t&&(this.$taskUl.empty(),this.tasks.forEach((t=>{this.$taskUl.append(y.render('\n      <li>\n        <span class="task_icon"><i class="fa-regular fa-circle"></i></span>\n        <span class="task_text">{{task}}</span>\n        <input class="date" type="date" id="dateInput" name="date">\n      </li>\n    ',{task:t.name}))})))}addProjectTask(t){this.tasks.push({name:t})}}(r.val());f.push(t),t.render("project"),r.val(""),w(n,e)},v=t=>{const e=t;e.addProjectTask(l.val()),e.render("task"),l.val(""),w(c,o)};s.on("click",(()=>d())),a.on("click","i.fa-trash-can",(t=>{})),a.on("click","li.project-li",(t=>{const e=$(t.currentTarget).closest(".project-li").data("project-index");var n;n=f.find((t=>t.dataIndex==e)),u.html(n.name),console.log(u.html),h.empty(),p.off("click").on("click",(()=>v(n))),n.render("task")})),e.on("click",(()=>w(n,e))),o.on("click",(()=>w(c,o)))}()})();