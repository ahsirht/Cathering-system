import{r as c,R as O}from"./react-CXTTs95W.js";import"./react-dom-yuB3ijGn.js";import{R as _,N as k,u as x,a as F,b as P,c as B}from"./react-router-twpDXtcF.js";import{c as N,s as j,b}from"./@remix-run-Br25Cn4W.js";/**
 * React Router DOM v6.27.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function w(){return w=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var i=arguments[r];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e},w.apply(this,arguments)}function I(e,r){if(e==null)return{};var i={},t=Object.keys(e),o,a;for(a=0;a<t.length;a++)o=t[a],!(r.indexOf(o)>=0)&&(i[o]=e[o]);return i}function K(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function A(e,r){return e.button===0&&(!r||r==="_self")&&!K(e)}const V=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],W="6";try{window.__reactRouterVersion=W}catch{}const z="startTransition",g=O[z];function Y(e){let{basename:r,children:i,future:t,window:o}=e,a=c.useRef();a.current==null&&(a.current=N({window:o,v5Compat:!0}));let s=a.current,[u,l]=c.useState({action:s.action,location:s.location}),{v7_startTransition:n}=t||{},f=c.useCallback(p=>{n&&g?g(()=>l(p)):l(p)},[l,n]);return c.useLayoutEffect(()=>s.listen(f),[s,f]),c.createElement(_,{basename:r,children:i,location:u.location,navigationType:u.action,navigator:s,future:t})}const G=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",M=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Z=c.forwardRef(function(r,i){let{onClick:t,relative:o,reloadDocument:a,replace:s,state:u,target:l,to:n,preventScrollReset:f,viewTransition:p}=r,m=I(r,V),{basename:U}=c.useContext(k),R,v=!1;if(typeof n=="string"&&M.test(n)&&(R=n,G))try{let d=new URL(window.location.href),h=n.startsWith("//")?new URL(d.protocol+n):new URL(n),y=j(h.pathname,U);h.origin===d.origin&&y!=null?n=y+h.search+h.hash:v=!0}catch{}let C=x(n,{relative:o}),E=X(n,{replace:s,state:u,target:l,preventScrollReset:f,relative:o,viewTransition:p});function L(d){t&&t(d),d.defaultPrevented||E(d)}return c.createElement("a",w({},m,{href:R||C,onClick:v||a?t:L,ref:i,target:l}))});var S;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(S||(S={}));var T;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(T||(T={}));function X(e,r){let{target:i,replace:t,state:o,preventScrollReset:a,relative:s,viewTransition:u}=r===void 0?{}:r,l=F(),n=P(),f=B(e,{relative:s});return c.useCallback(p=>{if(A(p,i)){p.preventDefault();let m=t!==void 0?t:b(n)===b(f);l(e,{replace:m,state:o,preventScrollReset:a,relative:s,viewTransition:u})}},[n,l,f,t,o,i,e,a,s,u])}export{Y as B,Z as L};
