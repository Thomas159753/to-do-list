/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var t=Object.prototype.toString,e=Array.isArray||function(e){return"[object Array]"===t.call(e)};function n(t){return"function"==typeof t}function a(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function s(t,e){return null!=t&&"object"==typeof t&&e in t}var r=RegExp.prototype.test,i=/\S/;var o={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},c=/\s*/,l=/\s+/,p=/\s*=/,d=/\s*\}/,h=/#|\^|\/|>|\{|&|=|!/;function u(t){this.string=t,this.tail=t,this.pos=0}function f(t,e){this.view=t,this.cache={".":this.view},this.parent=e}function g(){this.templateCache={_cache:{},set:function(t,e){this._cache[t]=e},get:function(t){return this._cache[t]},clear:function(){this._cache={}}}}u.prototype.eos=function(){return""===this.tail},u.prototype.scan=function(t){var e=this.tail.match(t);if(!e||0!==e.index)return"";var n=e[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},u.prototype.scanUntil=function(t){var e,n=this.tail.search(t);switch(n){case-1:e=this.tail,this.tail="";break;case 0:e="";break;default:e=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=e.length,e},f.prototype.push=function(t){return new f(t,this)},f.prototype.lookup=function(t){var e,a,r,i=this.cache;if(i.hasOwnProperty(t))e=i[t];else{for(var o,c,l,p=this,d=!1;p;){if(t.indexOf(".")>0)for(o=p.view,c=t.split("."),l=0;null!=o&&l<c.length;)l===c.length-1&&(d=s(o,c[l])||(a=o,r=c[l],null!=a&&"object"!=typeof a&&a.hasOwnProperty&&a.hasOwnProperty(r))),o=o[c[l++]];else o=p.view[t],d=s(p.view,t);if(d){e=o;break}p=p.parent}i[t]=e}return n(e)&&(e=e.call(this.view)),e},g.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},g.prototype.parse=function(t,n){var s=this.templateCache,o=t+":"+(n||k.tags).join(":"),f=void 0!==s,g=f?s.get(o):void 0;return null==g&&(g=function(t,n){if(!t)return[];var s,o,f,g,v=!1,m=[],y=[],x=[],w=!1,T=!1,b="",j=0;function I(){if(w&&!T)for(;x.length;)delete y[x.pop()];else x=[];w=!1,T=!1}function $(t){if("string"==typeof t&&(t=t.split(l,2)),!e(t)||2!==t.length)throw new Error("Invalid tags: "+t);s=new RegExp(a(t[0])+"\\s*"),o=new RegExp("\\s*"+a(t[1])),f=new RegExp("\\s*"+a("}"+t[1]))}$(n||k.tags);for(var C,_,E,U,P,S,V=new u(t);!V.eos();){if(C=V.pos,E=V.scanUntil(s))for(var O=0,A=E.length;O<A;++O)g=U=E.charAt(O),function(t,e){return r.call(t,e)}(i,g)?(T=!0,v=!0,b+=" "):(x.push(y.length),b+=U),y.push(["text",U,C,C+1]),C+=1,"\n"===U&&(I(),b="",j=0,v=!1);if(!V.scan(s))break;if(w=!0,_=V.scan(h)||"name",V.scan(c),"="===_?(E=V.scanUntil(p),V.scan(p),V.scanUntil(o)):"{"===_?(E=V.scanUntil(f),V.scan(d),V.scanUntil(o),_="&"):E=V.scanUntil(o),!V.scan(o))throw new Error("Unclosed tag at "+V.pos);if(P=">"==_?[_,E,C,V.pos,b,j,v]:[_,E,C,V.pos],j++,y.push(P),"#"===_||"^"===_)m.push(P);else if("/"===_){if(!(S=m.pop()))throw new Error('Unopened section "'+E+'" at '+C);if(S[1]!==E)throw new Error('Unclosed section "'+S[1]+'" at '+C)}else"name"===_||"{"===_||"&"===_?T=!0:"="===_&&$(E)}if(I(),S=m.pop())throw new Error('Unclosed section "'+S[1]+'" at '+V.pos);return function(t){for(var e,n=[],a=n,s=[],r=0,i=t.length;r<i;++r)switch((e=t[r])[0]){case"#":case"^":a.push(e),s.push(e),a=e[4]=[];break;case"/":s.pop()[5]=e[2],a=s.length>0?s[s.length-1][4]:n;break;default:a.push(e)}return n}(function(t){for(var e,n,a=[],s=0,r=t.length;s<r;++s)(e=t[s])&&("text"===e[0]&&n&&"text"===n[0]?(n[1]+=e[1],n[3]=e[3]):(a.push(e),n=e));return a}(y))}(t,n),f&&s.set(o,g)),g},g.prototype.render=function(t,e,n,a){var s=this.getConfigTags(a),r=this.parse(t,s),i=e instanceof f?e:new f(e,void 0);return this.renderTokens(r,i,n,t,a)},g.prototype.renderTokens=function(t,e,n,a,s){for(var r,i,o,c="",l=0,p=t.length;l<p;++l)o=void 0,"#"===(i=(r=t[l])[0])?o=this.renderSection(r,e,n,a,s):"^"===i?o=this.renderInverted(r,e,n,a,s):">"===i?o=this.renderPartial(r,e,n,s):"&"===i?o=this.unescapedValue(r,e):"name"===i?o=this.escapedValue(r,e,s):"text"===i&&(o=this.rawValue(r)),void 0!==o&&(c+=o);return c},g.prototype.renderSection=function(t,a,s,r,i){var o=this,c="",l=a.lookup(t[1]);if(l){if(e(l))for(var p=0,d=l.length;p<d;++p)c+=this.renderTokens(t[4],a.push(l[p]),s,r,i);else if("object"==typeof l||"string"==typeof l||"number"==typeof l)c+=this.renderTokens(t[4],a.push(l),s,r,i);else if(n(l)){if("string"!=typeof r)throw new Error("Cannot use higher-order sections without the original template");null!=(l=l.call(a.view,r.slice(t[3],t[5]),(function(t){return o.render(t,a,s,i)})))&&(c+=l)}else c+=this.renderTokens(t[4],a,s,r,i);return c}},g.prototype.renderInverted=function(t,n,a,s,r){var i=n.lookup(t[1]);if(!i||e(i)&&0===i.length)return this.renderTokens(t[4],n,a,s,r)},g.prototype.indentPartial=function(t,e,n){for(var a=e.replace(/[^ \t]/g,""),s=t.split("\n"),r=0;r<s.length;r++)s[r].length&&(r>0||!n)&&(s[r]=a+s[r]);return s.join("\n")},g.prototype.renderPartial=function(t,e,a,s){if(a){var r=this.getConfigTags(s),i=n(a)?a(t[1]):a[t[1]];if(null!=i){var o=t[6],c=t[5],l=t[4],p=i;0==c&&l&&(p=this.indentPartial(i,l,o));var d=this.parse(p,r);return this.renderTokens(d,e,a,p,s)}}},g.prototype.unescapedValue=function(t,e){var n=e.lookup(t[1]);if(null!=n)return n},g.prototype.escapedValue=function(t,e,n){var a=this.getConfigEscape(n)||k.escape,s=e.lookup(t[1]);if(null!=s)return"number"==typeof s&&a===k.escape?String(s):a(s)},g.prototype.rawValue=function(t){return t[1]},g.prototype.getConfigTags=function(t){return e(t)?t:t&&"object"==typeof t?t.tags:void 0},g.prototype.getConfigEscape=function(t){return t&&"object"==typeof t&&!e(t)?t.escape:void 0};var k={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){v.templateCache=t},get templateCache(){return v.templateCache}},v=new g;k.clearCache=function(){return v.clearCache()},k.parse=function(t,e){return v.parse(t,e)},k.render=function(t,n,a,s){if("string"!=typeof t)throw new TypeError('Invalid template! Template should be a "string" but "'+(e(r=t)?"array":typeof r)+'" was given as the first argument for mustache#render(template, view, partials)');var r;return v.render(t,n,a,s)},k.escape=function(t){return String(t).replace(/[&<>"'`=\/]/g,(function(t){return o[t]}))},k.Scanner=u,k.Context=f,k.Writer=g;const m=k,y=function(t,e,n){const a=$(t),s=$(e);"none"===a.css("display")&&"flex"===s.css("display")?(a.css("display","flex"),s.css("display","none")):("none"===s.css("display")&&!1===n||a.css("display","none"),s.css("display","flex"))};!function(){const t=$(".nav-bar"),e=t.find("#new_project"),n=t.find("#project_form"),a=n.find("#project_input"),s=n.find(".btn_add_project"),r=(n.find("#btn_cancel_project"),t.find("ul")),i=$(".tasks-preview"),o=i.find(".add-task-show"),c=i.find(".task-input-div"),l=i.find("#task_input"),p=i.find(".btn_add_task"),d=i.find("#tasks-list"),h=i.find(".task-header");let u=[],f=0,g=null;const k=t=>{const e=$(t.currentTarget).closest(".item").data("index");if($(t.currentTarget).hasClass("project-li"))g=u.find((t=>t.dataIndex==e)),x(g);else if($(t.currentTarget).hasClass("fa-circle")||$(t.currentTarget).hasClass("fa-check-circle")){let n,a;$(t.currentTarget).hasClass("fa-circle")?(n=g.tasks.findIndex((t=>t.dataIndex===e)),a=g.tasks.find((t=>t.dataIndex===e))):(n=g.completedTasks.findIndex((t=>t.dataIndex===e)),a=g.completedTasks.find((t=>t.dataIndex===e))),a&&(g.completeTask(n,a),x(g))}},v=()=>{const t=new class{constructor(t,e){this.name=t,this.tasks=[],this.completedTasks=[],this.dataIndex=e,this.cacheDom()}cacheDom(){this.$nav=$(".nav-bar"),this.$projectModule=this.$nav.find("#projectModule"),this.$ul=this.$projectModule.find("ul"),this.$tasksPreview=$(".tasks-preview"),this.$taskUl=this.$tasksPreview.find("#tasks-list")}render(t){"project"===t?this.$ul.append(m.render('\n    <li class="project-li item" data-index="{{dataIndex}}">\n        <span class="btn__icon"><i class="fa-solid fa-list"></i></span>\n        <span class="btn__text">{{name}}</span>\n        <span class="btn__icon"><i class="fa-regular fa-trash-can"></i></span>\n    </li>\n    ',{name:this.name,dataIndex:this.dataIndex})):"task"===t&&(this.$taskUl.empty(),this.tasks.forEach((t=>{this.$taskUl.append(m.render('\n      <li class="item" data-index="{{dataIndex}}">\n        <span class="task_icon"><i class="fa-regular fa-circle"></i></span>\n        <span class="task_text">{{task}}</span>\n        <input class="date" type="date" id="dateInput" name="date">\n      </li>\n    ',{task:t.name,dataIndex:t.dataIndex}))})),this.completedTasks.forEach((t=>{this.$taskUl.append(m.render('\n    <li class="item" data-index="{{dataIndex}}">\n      <span class="task_icon"><i class="fa-regular fa-check-circle"></i></span>\n      <span class="task_text">{{task}}</span>\n      <input class="date" type="date" id="dateInput" name="date">\n    </li>\n  ',{task:t.name,dataIndex:t.dataIndex}))})))}addProjectTask(t,e){this.tasks.push({name:t,completed:!1,dataIndex:e})}completeTask(t,e){if(!1===e.completed){const e=this.tasks.splice(t,1)[0];e.completed=!0,this.completedTasks.push(e)}else{const e=this.completedTasks.splice(t,1)[0];e.completed=!1,this.tasks.push(e)}}deleteProject(){this.tasks=[],this.completedTasks=[]}}(a.val(),f++);u.push(t),t.render("project"),a.val(""),y(n,e)},x=t=>{h.html(t.name),d.empty(),p.off("click").on("click",(()=>(t=>{t.addProjectTask(l.val(),f++),t.render("task"),l.val(""),y(c,o)})(t))),t.render("task")};s.on("click",(()=>v())),r.on("click","i.fa-trash-can",(t=>{const e=$(t.target).closest(".project-li"),n=e.data("index"),a=u.find((t=>t.dataIndex===n));a&&(u=u.filter((t=>t.dataIndex!==n)),a.deleteProject(),e.remove())})),r.on("click","li.project-li",(t=>{k(t),y(void 0,o,!1)})),d.on("click","i.fa-circle, i.fa-check-circle",(t=>{k(t,t.currentTarget)})),e.on("click",(()=>y(n,e))),o.on("click",(()=>y(c,o)))}()})();