function addChangeInstruction(e,n){e.changes?e.changes.splice(e.changes.length,0,n):e.changes=[n]}function findNextSibling(e,n,r){void 0===r&&(r=!1);var t,a=e.children;if(n+1<a.length)return 1===(t=a[n+1]).kind?t:2===t.kind?t:0===t.kind?findNextSibling(t,-1,!0):findNextSibling(e,n+1);if(1===e.kind)return null;if(0===e.kind){var o=e.parent;if(o&&o!==e)for(var c=0;o.children.length>c;c++)if(o.children[c]===e)return findNextSibling(o,c)}return null}function htmlRenderer(e,n,r){return new Renderer(e,n,r)}function processChanges(e,n,r){if(e&&e.changes&&e.changes.length){for(var t=0,a=e.changes;t<a.length;t++){var o=a[t];if(1===o.kind){var c=o;if(c.parent){var d=r.createDocFragment(),i=null,s=c.parent;if(s&&s.domNode&&(i=s.domNode.namespaceURI)&&i.match(RX_HTML)&&(i=null),processNode(c.node,d,r,i),s&&s.domNode){var l=!1;c.nextSibling?c.nextSibling.domNode&&(s.domNode.insertBefore(d,c.nextSibling.domNode),l=!0):(s.domNode.appendChild(d),l=!0),l&&replaceDomNode(d,s.domNode,c.node)}}else{d=r.createDocFragment();processNode(c.node,d,r,null),n.appendChild(d),replaceDomNode(d,n,c.node)}}else if(5===o.kind)(m=o.node)&&m.domNode&&(m.domNode.textContent=m.value);else if(3===o.kind){var p=o,m=p.node,h=p.name,i=void 0;m&&m.domNode&&((i=m.domNode.namespaceURI).match(RX_HTML)?"class"===h||"className"===h?m.domNode.className=p.value:m.domNode[h]=p.value:m.domNode.setAttribute(h,p.value))}else if(2===o.kind)removeGroupFromDom(o.node);else if(4===o.kind){var u=o;u.node.domNode.setAttribute(u.name,u.value)}else console.error("[iv html renderer] Unsupported change kind: "+o.kind)}e.changes=null}}function processNode(e,n,r,t){switch(e.kind){case 1:createElementDomNode(e,n,r,t);break;case 0:e.domNode=n,processChildNodes(e,n,r,t);break;case 2:var a=r.createTextNode(e.value);e.domNode=a,n.appendChild(a);break;default:console.error("[iv html renderer] Invalid node kind: "+e.kind)}}function processChildNodes(e,n,r,t){for(var a=e.children,o=a.length,c=0;o>c;c++)processNode(a[c],n,r,t)}function createElementDomNode(e,n,r,t){var a,o,c=e.props,d=e.atts;if(d&&d.xmlns&&(t=d.xmlns),o=t?r.createElementNS(t,e.name):r.createElement(e.name),c)if(t&&!t.match(RX_HTML))for(var i in c)c.hasOwnProperty(i)&&o.setAttribute(i,c[i]);else for(var i in c)c.hasOwnProperty(i)&&(a=c[i],"class"===i||"className"===i?o.className=a:"style"===i?o.setAttribute(i,a):a.call?i.match(RX_EVT_HANDLER)&&addEvtListener(o,e,i):o[i]=a);if(d)for(var i in d)d.hasOwnProperty(i)&&o.setAttribute(i,d[i]);e.domNode=o,n.appendChild(o),processChildNodes(e,o,r,t)}function addEvtListener(e,n,r){e.addEventListener(r.substring(2),function(e){n.props[r].call(n,e)})}function removeGroupFromDom(e){var n,r=e.children,t=e.domNode;if(r)for(var a=r.length,o=0;a>o;o++)0===(n=r[o]).kind?removeGroupFromDom(n):1===n.kind?(t.removeChild(n.domNode),n.domNode=null):2===n.kind&&(t.removeChild(n.domNode),n.domNode=null);e.domNode=null}function replaceDomNode(e,n,r){if(e!==n&&r.domNode===e&&(r.domNode=n,0===r.kind))for(var t=r.children,a=0;t.length>a;a++)replaceDomNode(e,n,t[a])}function handleDataReady(e){var n=e.data;render(n.data,{page:n.page,param:n.param})}function handleHashChange(){fetchAndRender()}function fetchAndRender(e){void 0===e&&(e=!1);var n=window.__iv__route(),r=(n.url,n.page),t=n.param;e?render(null,{page:r,param:t}):window.__iv__fetchData().then(function(e){render(e.data,{page:e.page,param:e.param})})}function render(e,n){renderer||(renderer=htmlRenderer(document.getElementById("root"),hnpwa)),_data=e,_nav=n,renderer.refresh({data:e,nav:n}),window.scrollTo(0,0)}function refresh(){renderer.refresh({data:_data,nav:_nav})}function hnpwa(e,n){var r,t=e.parent,a=e.rt,o=a.createCpt,c=a.updateCptProp,d=a.refreshCpt,i=n.data,s=n.nav;t.cm?(r=o(t,1,{page:s.page},1,e,header),r=o(t,2,{data:i,nav:s},1,e,content),t.cm=0):(r=t.children[0],c("page",s.page,r),d(e,r,t),c("data",i,r=t.children[1]),c("nav",s,r),d(e,r,t))}function header(e,n){var r,t,a,o=e.parent,c=e.rt,d=c.createEltNode,i=c.createTxtNode,s=c.updateProp,l=n.page;o.cm?((r=d(o,1,"header",0)).props={class:"header"},(t=d(r,2,"nav",0)).props={class:"inner"},(a=d(t,3,"a",0)).props={href:"#",class:"logo"},i(a,4,"IV"),(a=d(t,5,"a",1)).props={href:"#top",class:"#top"===l?"router-link-active":""},i(a,6,"Top"),(a=d(t,7,"a",1)).props={href:"#new",class:"#new"===l?"router-link-active":""},i(a,8,"New"),(a=d(t,9,"a",1)).props={href:"#show",class:"#show"===l?"router-link-active":""},i(a,10,"Show"),(a=d(t,11,"a",1)).props={href:"#ask",class:"#ask"===l?"router-link-active":""},i(a,12,"Ask"),(a=d(t,13,"a",1)).props={href:"#job",class:"#job"===l?"router-link-active":""},i(a,14,"Jobs"),(a=d(t,15,"a",0)).props={href:"https://github.com/b-laporte/iv",rel:"noopener",class:"github"},i(a,16,"Built with IV"),o.cm=0):(a=(t=(r=o.children[0]).children[0]).children[1],s("class","#top"===l?"router-link-active":"",a,o),a=t.children[2],s("class","#new"===l?"router-link-active":"",a,o),a=t.children[3],s("class","#show"===l?"router-link-active":"",a,o),a=t.children[4],s("class","#ask"===l?"router-link-active":"",a,o),a=t.children[5],s("class","#job"===l?"router-link-active":"",a,o))}function content(e,n){var r,t,a,o,c,d,i=e.parent,s=e.rt,l=s.createEltNode,p=s.checkGroup,m=s.createTxtNode,h=s.deleteGroups,u=s.createCpt,v=s.updateCptProp,f=s.refreshCpt,g=n.data,N=n.nav;i.cm?(r=l(i,1,"div",1)).props={class:"view"}:r=i.children[0],c=0,g&&(t=p(c,r,i,i,2),c++,d=0,g.error?(a=p(d,t,i,t,3),d++,0,a.cm&&(m(a,4," Unable to fetch data, you might be offline "),a.cm=0)):"#user"===N.page?(h(d,t,i,5),a=p(d,t,i,t,5),d++,0,a.cm?(o=u(a,6,{data:g,nav:N},1,e,user),a.cm=0):(v("data",g,o=a.children[0]),v("nav",N,o),f(e,o,i))):"#item"===N.page?(h(d,t,i,7),a=p(d,t,i,t,7),d++,0,a.cm?(o=u(a,8,{data:g,nav:N},1,e,item),a.cm=0):(v("data",g,o=a.children[0]),v("nav",N,o),f(e,o,i))):g&&(h(d,t,i,9),a=p(d,t,i,t,9),d++,0,a.cm?(o=u(a,10,{data:g,nav:N},1,e,newsList),a.cm=0):(v("data",g,o=a.children[0]),v("nav",N,o),f(e,o,i))),t.cm?t.cm=0:h(d,t,i,11)),i.cm?i.cm=0:h(c,r,i,11)}function newsList(e,n){var r,t,a,o,c,d,i,s,l,p,m=e.parent,h=0,u=e.rt,v=u.createEltNode,f=u.checkGroup,g=u.dynTxtNode,N=u.updateText,k=u.createTxtNode,C=u.deleteGroups,w=u.updateProp,b=n.data,x=n.nav;m.cm?((r=v(m,1,"div",0)).props={class:"news-list"},t=v(r,2,"ul",1)):t=(r=m.children[0]).children[0],h=1,l=0;for(var _=0;_<b.length;_++){a=f(l,t,m,m,3),l++,0;var E=b[_];a.cm?((o=v(a,4,"li",0)).props={class:"news-item"},(c=v(o,5,"span",1)).props={class:"score"},g(c,6,""+(E.points||0)),(c=v(o,7,"span",1)).props={class:"title"},(d=v(c,8,"a",0)).props={href:E.url,rel:"noopener"},g(d,9,""+E.title),g(c,10,"("+E.domain+") "),(c=v(o,11,"span",1)).props={class:"meta"}):(d=(c=(o=a.children[0]).children[0]).children[0],N(""+(E.points||0),d,m),i=(d=(c=o.children[1]).children[0]).children[0],N(""+E.title,i,m),d=c.children[1],N("("+E.domain+") ",d,m),c=o.children[2]),1,3,p=0,"job"!=E.type&&(d=f(p,c,m,a,12),p++,0,d.cm?(k(d,13," by "),(i=v(d,14,"a",0)).props={href:"#user/"+E.user},g(i,15,""+E.user),d.cm=0):(s=(i=d.children[1]).children[0],N(""+E.user,s,m))),a.cm?g(c,16," "+E.time_ago):(C(p,c,m,16),d=c.children[p],N(" "+E.time_ago,d,m)),p+=1,"job"!=E.type&&(d=f(p,c,m,a,17),p++,0,d.cm?(k(d,18," | "),(i=v(d,19,"a",0)).props={href:"#item/"+E.id},g(i,20,E.comments_count+" comments"),d.cm=0):(s=(i=d.children[1]).children[0],N(E.comments_count+" comments",s,m))),a.cm?a.cm=0:C(p,c,m,21)}30===b.length&&(C(h,m,m,21),r=f(h,m,m,m,21),h++,0,r.cm?((t=v(r,22,"a",1)).props={class:"news-list-more",href:x.page+"/"+(parseInt(x.param)+1)},k(t,23,"More ..."),r.cm=0):(t=r.children[0],w("href",x.page+"/"+(parseInt(x.param)+1),t,m))),m.cm?m.cm=0:C(h,m,m,24)}function user(e,n){var r,t,a,o,c=e.parent,d=e.rt,i=d.createEltNode,s=d.dynTxtNode,l=d.createTxtNode,p=d.updateText,m=d.updateProp,h=n.data;n.nav;c.cm?((r=i(c,1,"div",0)).props={class:"user-view view"},s(t=i(r,2,"h1",0),3,"User : "+h.id),(t=i(r,4,"ul",0)).props={class:"meta"},(o=i(a=i(t,5,"li",0),6,"span",0)).props={class:"label"},l(o,7,"Created:"),s(a,8," "+h.created),(o=i(a=i(t,9,"li",0),10,"span",0)).props={class:"label"},l(o,11,"Karma:"),s(a,12," "+h.karma),(t=i(r,13,"p",0)).props={class:"links"},(a=i(t,14,"a",1)).props={href:"https://news.ycombinator.com/submitted?id="+h.id},l(a,15,"submissions"),l(t,16," | "),(a=i(t,17,"a",1)).props={href:"https://news.ycombinator.com/threads?id="+h.id},l(a,18,"comments"),c.cm=0):(a=(t=(r=c.children[0]).children[0]).children[0],p("User : "+h.id,a,c),o=(a=(t=r.children[1]).children[0]).children[1],p(" "+h.created,o,c),o=(a=t.children[1]).children[1],p(" "+h.karma,o,c),a=(t=r.children[2]).children[0],m("href","https://news.ycombinator.com/submitted?id="+h.id,a,c),a=t.children[2],m("href","https://news.ycombinator.com/threads?id="+h.id,a,c))}function item(e,n){var r,t,a,o,c,d=e.parent,i=e.rt,s=" points | by ",l=" comments ",p=i.createEltNode,m=i.dynTxtNode,h=i.createCpt,u=i.updateProp,v=i.updateText,f=i.updateCptProp,g=i.refreshCpt,N=n.data;n.nav;d.cm?((r=p(d,1,"div",0)).props={class:"item-view view"},(t=p(r,2,"div",0)).props={class:"item-view-header"},(a=p(t,3,"a",1)).props={href:N.url},m(o=p(a,4,"h1",0),5,""+N.title),(a=p(t,6,"span",0)).props={class:"host"},m(a,7," ("+N.domain+")"),(a=p(t,8,"p",0)).props={class:"meta"},m(a,9,""+N.points+s),(o=p(a,10,"a",1)).props={href:"#user/"+N.user,class:""},m(o,11,""+N.user),m(a,12," "+N.time_ago),(t=p(r,13,"div",0)).props={class:"item-view-comments"},(a=p(t,14,"p",0)).props={class:"item-view-comments-header"},m(a,15,""+N.comments_count+l),a=h(t,16,{comments:N.comments},1,e,commentList),d.cm=0):(a=(t=(r=d.children[0]).children[0]).children[0],u("href",N.url,a,d),c=(o=a.children[0]).children[0],v(""+N.title,c,d),o=(a=t.children[1]).children[0],v(" ("+N.domain+")",o,d),o=(a=t.children[2]).children[0],v(""+N.points+s,o,d),o=a.children[1],u("href","#user/"+N.user,o,d),c=o.children[0],v(""+N.user,c,d),o=a.children[2],v(" "+N.time_ago,o,d),o=(a=(t=r.children[1]).children[0]).children[0],v(""+N.comments_count+l,o,d),a=t.children[1],f("comments",N.comments,a),g(e,a,d))}function commentList(e,n){var r,t,a,o,c=e.parent,d=e.rt,i=d.createEltNode,s=d.checkGroup,l=d.createCpt,p=d.updateCptProp,m=d.refreshCpt,h=d.deleteGroups,u=n.comments;c.cm?(r=i(c,1,"ul",1)).props={class:"comment-children"}:r=c.children[0],o=0;for(var v=0;v<u.length;v++){t=s(o,r,c,c,2),o++,0;var f=u[v];t.cm?(a=l(t,3,{comment:f},1,e,commentItem),t.cm=0):(p("comment",f,a=t.children[0]),m(e,a,c))}c.cm?c.cm=0:h(o,r,c,4)}function commentItem(e,n){var r,t,a,o,c,d,i,s,l,p=e.parent,m=e.rt,h=" replies collapsed",u=m.createEltNode,v=m.dynTxtNode,f=m.updateProp,g=m.updateText,N=m.checkGroup,k=m.deleteGroups,C=m.createTxtNode,w=m.createCpt,b=m.updateCptProp,x=m.refreshCpt,_=n.comment;p.cm?((r=u(p,1,"li",1)).props={class:"comment"},(t=u(r,2,"div",0)).props={class:"by"},(a=u(t,3,"a",1)).props={href:"#user/"+_.user,class:""},v(a,4,""+_.user),v(t,5," "+_.time_ago),(t=u(r,6,"div",0)).props={class:"text",innerHTML:_.content}):(a=(t=(r=p.children[0]).children[0]).children[0],f("href","#user/"+_.user,a,p),o=a.children[0],g(""+_.user,o,p),a=t.children[1],g(" "+_.time_ago,a,p)),d=2,_.comments&&_.comments.length>0&&(t=N(d,r,p,p,7),d++,i=0,_.collapsed?(a=N(i,t,p,t,8),i++,0,s=function(){toggle(_)},a.cm?((o=u(a,9,"div",0)).props={class:"toggle",onclick:s},v(u(o,10,"a",0),11,"[+] "+_.comments.length+h),a.cm=0):(f("onclick",s,o=a.children[0],p),c=o.children[0].children[0],g("[+] "+_.comments.length+h,c,p))):(k(i,t,p,12),a=N(i,t,p,t,12),i++,0,l=function(){toggle(_)},a.cm?((o=u(a,13,"div",0)).props={class:"toggle open",onclick:l},C(u(o,14,"a",0),15,"[-]"),o=w(a,16,{comments:_.comments},1,e,commentList),a.cm=0):(f("onclick",l,o=a.children[0],p),o=a.children[1],b("comments",_.comments,o),x(e,o,p))),t.cm?t.cm=0:k(i,t,p,17)),p.cm?p.cm=0:k(d,r,p,17)}function toggle(e){e.collapsed=!e.collapsed,refresh()}var ivRuntime={refCount:0,createEltNode:function(e,n,r,t){var a={kind:1,index:n,name:r,ref:t?++ivRuntime.refCount:0,children:[],domNode:null};return e.children[e.children.length]=a,a},createCpt:function(e,n,r,t,a,o){var c={kind:0,index:n,cm:1,vdFunction:o,props:r,changes:null,ref:t?++ivRuntime.refCount:0,children:[],domNode:null,parent:e},d=a.parent;return e.children[e.children.length]=c,a.parent=c,o(a,r),a.parent=d,c},checkGroup:function(e,n,r,t,a){var o=n.children[e];if(o&&o.index===a)return o;var c={kind:0,index:a,cm:1,props:{},changes:null,ref:++ivRuntime.refCount,children:[],domNode:null,parent:n};return t.cm?n.children[n.children.length]=c:(n.children.splice(e,0,c),addChangeInstruction(r,{kind:1,node:c,parent:n,position:e,nextSibling:findNextSibling(n,e)})),c},deleteGroups:function(e,n,r,t){for(var a=n.children[e];a&&a.index<t;)n.children.splice(e,1),addChangeInstruction(r,{kind:2,node:a,parent:n,position:e}),a=n.children[e]},createTxtNode:function(e,n,r){var t={kind:2,index:n,value:r,ref:0,domNode:null};e.children[e.children.length]=t},dynTxtNode:function(e,n,r){var t={kind:2,index:n,value:r,ref:++ivRuntime.refCount,domNode:null};e.children[e.children.length]=t},updateProp:function(e,n,r,t){r.props[e]!==n&&(r.props[e]=n,n.call||addChangeInstruction(t,{kind:3,name:e,value:n,node:r}))},updateAtt:function(e,n,r,t){r.atts[e]!==n&&(r.atts[e]=n,n.call||addChangeInstruction(t,{kind:4,name:e,value:n,node:r}))},updateText:function(e,n,r){n.value!==e&&(n.value=e,addChangeInstruction(r,{kind:5,value:e,node:n}))},updateCptProp:function(e,n,r){r.props[e]=n},refreshCpt:function(e,n,r){var t=e.parent,a=n;e.parent=a,a.vdFunction(e,a.props),e.parent=t,a.changes&&(r.changes?r.changes=r.changes.concat(a.changes):r.changes=a.changes,a.changes=null)}},RX_EVT_HANDLER=/^on/,RX_HTML=/html/i,Renderer=function(){function e(e,n,r){this.htmlElement=e,this.vdFunction=n,this.rt=ivRuntime;var t=this.vdom={kind:0,index:0,ref:++ivRuntime.refCount,cm:1,changes:null,children:[],domNode:null,parent:null},a={kind:1,node:t,parent:null,position:-1,nextSibling:null};t.changes=[a],this.doc=r||{createDocFragment:function(){return new DocumentFragment},createTextNode:function(e){return document.createTextNode(e)},createElement:function(e){return document.createElement(e)},createElementNS:function(e,n){return document.createElementNS(e,n)}}}return e.prototype.refresh=function(e){this.parent=this.vdom,this.vdFunction(this,e),processChanges(this.vdom,this.htmlElement,this.doc)},e}(),renderer,_data,_nav;window.addEventListener("hashchange",handleHashChange,!1),window.addEventListener("dataready",handleDataReady,!1),fetchAndRender(!0);