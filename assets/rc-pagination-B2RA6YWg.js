import{c as pe,d as he,g as V,b as x,e as Pt}from"./@babel-nFbzLRrx.js";import{c as E}from"./classnames-BK5ccKcQ.js";import{K as b,B as De,A as St}from"./rc-util-B4_nxVmj.js";import{a as n,r as yt}from"./react-CXTTs95W.js";var Ot={items_per_page:"/ page",jump_to:"Go to",jump_to_confirm:"confirm",page:"Page",prev_page:"Previous Page",next_page:"Next Page",prev_5:"Previous 5 Pages",next_5:"Next 5 Pages",prev_3:"Previous 3 Pages",next_3:"Next 3 Pages",page_size:"Page Size"},_t={items_per_page:"条/页",jump_to:"跳至",jump_to_confirm:"确定",page:"页",prev_page:"上一页",next_page:"下一页",prev_5:"向前 5 页",next_5:"向后 5 页",prev_3:"向前 3 页",next_3:"向后 3 页",page_size:"页码"},bt=["10","20","50","100"],Et=function(e){var C=e.pageSizeOptions,a=C===void 0?bt:C,h=e.locale,w=e.changeSize,O=e.pageSize,S=e.goButton,g=e.quickGo,z=e.rootPrefixCls,P=e.selectComponentClass,U=e.selectPrefixCls,i=e.disabled,J=e.buildOptionText,m=e.showSizeChanger,L=n.useState(""),B=pe(L,2),d=B[0],Q=B[1],A=function(){return!d||Number.isNaN(d)?void 0:Number(d)},le=typeof J=="function"?J:function(u){return"".concat(u," ").concat(h.items_per_page)},Ne=function(o,R){if(w==null||w(Number(o)),he(m)==="object"){var $;($=m.onChange)===null||$===void 0||$.call(m,o,R)}},W=function(o){Q(o.target.value)},K=function(o){S||d===""||(Q(""),!(o.relatedTarget&&(o.relatedTarget.className.indexOf("".concat(z,"-item-link"))>=0||o.relatedTarget.className.indexOf("".concat(z,"-item"))>=0))&&(g==null||g(A())))},j=function(o){d!==""&&(o.keyCode===b.ENTER||o.type==="click")&&(Q(""),g==null||g(A()))},y=function(){return a.some(function(o){return o.toString()===O.toString()})?a:a.concat([O.toString()]).sort(function(o,R){var $=Number.isNaN(Number(o))?0:Number(o),Ce=Number.isNaN(Number(R))?0:Number(R);return $-Ce})},T="".concat(z,"-options");if(!m&&!g)return null;var G=null,F=null,p=null;if(m&&P){var oe=he(m)==="object"?m:{},H=oe.options,xe=oe.className,q=H?void 0:y().map(function(u,o){return n.createElement(P.Option,{key:o,value:u.toString()},le(u))});G=n.createElement(P,V({disabled:i,prefixCls:U,showSearch:!1,optionLabelProp:H?"label":"children",popupMatchSelectWidth:!1,value:(O||a[0]).toString(),getPopupContainer:function(o){return o.parentNode},"aria-label":h.page_size,defaultOpen:!1},he(m)==="object"?m:null,{className:E("".concat(T,"-size-changer"),xe),options:H,onChange:Ne}),q)}return g&&(S&&(p=typeof S=="boolean"?n.createElement("button",{type:"button",onClick:j,onKeyUp:j,disabled:i,className:"".concat(T,"-quick-jumper-button")},h.jump_to_confirm):n.createElement("span",{onClick:j,onKeyUp:j},S)),F=n.createElement("div",{className:"".concat(T,"-quick-jumper")},h.jump_to,n.createElement("input",{disabled:i,type:"text",value:d,onChange:W,onKeyUp:j,onBlur:K,"aria-label":h.page}),h.page,p)),n.createElement("li",{className:T},G,F)},re=function(e){var C=e.rootPrefixCls,a=e.page,h=e.active,w=e.className,O=e.showTitle,S=e.onClick,g=e.onKeyPress,z=e.itemRender,P="".concat(C,"-item"),U=E(P,"".concat(P,"-").concat(a),x(x({},"".concat(P,"-active"),h),"".concat(P,"-disabled"),!a),w),i=function(){S(a)},J=function(B){g(B,S,a)},m=z(a,"page",n.createElement("a",{rel:"nofollow"},a));return m?n.createElement("li",{title:O?String(a):null,className:U,onClick:i,onKeyDown:J,tabIndex:0},m):null},kt=function(e,C,a){return a};function Le(){}function Qe(k){var e=Number(k);return typeof e=="number"&&!Number.isNaN(e)&&isFinite(e)&&Math.floor(e)===e}function M(k,e,C){var a=typeof k>"u"?e:k;return Math.floor((C-1)/a)+1}var Bt=function(e){var C=e.prefixCls,a=C===void 0?"rc-pagination":C,h=e.selectPrefixCls,w=h===void 0?"rc-select":h,O=e.className,S=e.selectComponentClass,g=e.current,z=e.defaultCurrent,P=z===void 0?1:z,U=e.total,i=U===void 0?0:U,J=e.pageSize,m=e.defaultPageSize,L=m===void 0?10:m,B=e.onChange,d=B===void 0?Le:B,Q=e.hideOnSinglePage,A=e.align,le=e.showPrevNextJumpers,Ne=le===void 0?!0:le,W=e.showQuickJumper,K=e.showLessItems,j=e.showTitle,y=j===void 0?!0:j,T=e.onShowSizeChange,G=T===void 0?Le:T,F=e.locale,p=F===void 0?_t:F,oe=e.style,H=e.totalBoundaryShowSizeChanger,xe=H===void 0?50:H,q=e.disabled,u=e.simple,o=e.showTotal,R=e.showSizeChanger,$=R===void 0?i>xe:R,Ce=e.pageSizeOptions,be=e.itemRender,X=be===void 0?kt:be,Ee=e.jumpPrevIcon,ke=e.jumpNextIcon,We=e.prevIcon,Fe=e.nextIcon,Xe=n.useRef(null),Ye=De(10,{value:J,defaultValue:L}),ze=pe(Ye,2),f=ze[0],Ze=ze[1],et=De(1,{value:g,defaultValue:P,postState:function(l){return Math.max(1,Math.min(l,M(void 0,f,i)))}}),je=pe(et,2),r=je[0],Ie=je[1],tt=n.useState(r),we=pe(tt,2),D=we[0],ie=we[1];yt.useEffect(function(){ie(r)},[r]);var Oe=Math.max(1,r-(K?3:5)),Be=Math.min(M(void 0,f,i),r+(K?3:5));function ce(t,l){var c=t||n.createElement("button",{type:"button","aria-label":l,className:"".concat(a,"-item-link")});return typeof t=="function"&&(c=n.createElement(t,Pt({},e))),c}function Ke(t){var l=t.target.value,c=M(void 0,f,i),I;return l===""?I=l:Number.isNaN(Number(l))?I=D:l>=c?I=c:I=Number(l),I}function at(t){return Qe(t)&&t!==r&&Qe(i)&&i>0}var nt=i>f?W:!1;function rt(t){(t.keyCode===b.UP||t.keyCode===b.DOWN)&&t.preventDefault()}function Te(t){var l=Ke(t);switch(l!==D&&ie(l),t.keyCode){case b.ENTER:N(l);break;case b.UP:N(l-1);break;case b.DOWN:N(l+1);break}}function lt(t){N(Ke(t))}function ot(t){var l=M(t,f,i),c=r>l&&l!==0?l:r;Ze(t),ie(c),G==null||G(r,t),Ie(c),d==null||d(c,t)}function N(t){if(at(t)&&!q){var l=M(void 0,f,i),c=t;return t>l?c=l:t<1&&(c=1),c!==D&&ie(c),Ie(c),d==null||d(c,f),c}return r}var ue=r>1,se=r<M(void 0,f,i);function Re(){ue&&N(r-1)}function $e(){se&&N(r+1)}function Me(){N(Oe)}function Ve(){N(Be)}function Y(t,l){if(t.key==="Enter"||t.charCode===b.ENTER||t.keyCode===b.ENTER){for(var c=arguments.length,I=new Array(c>2?c-2:0),ge=2;ge<c;ge++)I[ge-2]=arguments[ge];l.apply(void 0,I)}}function it(t){Y(t,Re)}function ct(t){Y(t,$e)}function ut(t){Y(t,Me)}function st(t){Y(t,Ve)}function mt(t){var l=X(t,"prev",ce(We,"prev page"));return n.isValidElement(l)?n.cloneElement(l,{disabled:!ue}):l}function vt(t){var l=X(t,"next",ce(Fe,"next page"));return n.isValidElement(l)?n.cloneElement(l,{disabled:!se}):l}function me(t){(t.type==="click"||t.keyCode===b.ENTER)&&N(D)}var Ue=null,ft=St(e,{aria:!0,data:!0}),dt=o&&n.createElement("li",{className:"".concat(a,"-total-text")},o(i,[i===0?0:(r-1)*f+1,r*f>i?i:r*f])),Je=null,s=M(void 0,f,i);if(Q&&i<=f)return null;var v=[],Z={rootPrefixCls:a,onClick:N,onKeyPress:Y,showTitle:y,itemRender:X,page:-1},gt=r-1>0?r-1:0,pt=r+1<s?r+1:s,ve=W&&W.goButton,ht=he(u)==="object"?u.readOnly:!u,ee=ve,Ae=null;u&&(ve&&(typeof ve=="boolean"?ee=n.createElement("button",{type:"button",onClick:me,onKeyUp:me},p.jump_to_confirm):ee=n.createElement("span",{onClick:me,onKeyUp:me},ve),ee=n.createElement("li",{title:y?"".concat(p.jump_to).concat(r,"/").concat(s):null,className:"".concat(a,"-simple-pager")},ee)),Ae=n.createElement("li",{title:y?"".concat(r,"/").concat(s):null,className:"".concat(a,"-simple-pager")},ht?D:n.createElement("input",{type:"text",value:D,disabled:q,onKeyDown:rt,onKeyUp:Te,onChange:Te,onBlur:lt,size:3}),n.createElement("span",{className:"".concat(a,"-slash")},"/"),s));var _=K?1:2;if(s<=3+_*2){s||v.push(n.createElement(re,V({},Z,{key:"noPager",page:1,className:"".concat(a,"-item-disabled")})));for(var te=1;te<=s;te+=1)v.push(n.createElement(re,V({},Z,{key:te,page:te,active:r===te})))}else{var Nt=K?p.prev_3:p.prev_5,xt=K?p.next_3:p.next_5,Ge=X(Oe,"jump-prev",ce(Ee,"prev page")),He=X(Be,"jump-next",ce(ke,"next page"));Ne&&(Ue=Ge?n.createElement("li",{title:y?Nt:null,key:"prev",onClick:Me,tabIndex:0,onKeyDown:ut,className:E("".concat(a,"-jump-prev"),x({},"".concat(a,"-jump-prev-custom-icon"),!!Ee))},Ge):null,Je=He?n.createElement("li",{title:y?xt:null,key:"next",onClick:Ve,tabIndex:0,onKeyDown:st,className:E("".concat(a,"-jump-next"),x({},"".concat(a,"-jump-next-custom-icon"),!!ke))},He):null);var Pe=Math.max(1,r-_),Se=Math.min(r+_,s);r-1<=_&&(Se=1+_*2),s-r<=_&&(Pe=s-_*2);for(var ae=Pe;ae<=Se;ae+=1)v.push(n.createElement(re,V({},Z,{key:ae,page:ae,active:r===ae})));if(r-1>=_*2&&r!==3&&(v[0]=n.cloneElement(v[0],{className:E("".concat(a,"-item-after-jump-prev"),v[0].props.className)}),v.unshift(Ue)),s-r>=_*2&&r!==s-2){var qe=v[v.length-1];v[v.length-1]=n.cloneElement(qe,{className:E("".concat(a,"-item-before-jump-next"),qe.props.className)}),v.push(Je)}Pe!==1&&v.unshift(n.createElement(re,V({},Z,{key:1,page:1}))),Se!==s&&v.push(n.createElement(re,V({},Z,{key:s,page:s})))}var fe=mt(gt);if(fe){var ye=!ue||!s;fe=n.createElement("li",{title:y?p.prev_page:null,onClick:Re,tabIndex:ye?null:0,onKeyDown:it,className:E("".concat(a,"-prev"),x({},"".concat(a,"-disabled"),ye)),"aria-disabled":ye},fe)}var de=vt(pt);if(de){var ne,_e;u?(ne=!se,_e=ue?0:null):(ne=!se||!s,_e=ne?null:0),de=n.createElement("li",{title:y?p.next_page:null,onClick:$e,tabIndex:_e,onKeyDown:ct,className:E("".concat(a,"-next"),x({},"".concat(a,"-disabled"),ne)),"aria-disabled":ne},de)}var Ct=E(a,O,x(x(x(x(x({},"".concat(a,"-start"),A==="start"),"".concat(a,"-center"),A==="center"),"".concat(a,"-end"),A==="end"),"".concat(a,"-simple"),u),"".concat(a,"-disabled"),q));return n.createElement("ul",V({className:Ct,style:oe,ref:Xe},ft),dt,fe,u?Ae:v,de,n.createElement(Et,{locale:p,rootPrefixCls:a,disabled:q,selectComponentClass:S,selectPrefixCls:w,changeSize:ot,pageSize:f,pageSizeOptions:Ce,quickGo:nt?N:null,goButton:ee,showSizeChanger:$}))};export{Bt as P,Ot as l};