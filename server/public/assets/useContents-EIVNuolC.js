import{i as c,k as i,l as u,s as o,n as p}from"./index-Zq4SKFCc.js";const l=s=>{const n=c();return i({mutationFn:e=>u({method:"post",url:"/contents",data:e}),...s,onSettled:e=>{const{status:t,message:r}=e;t==="success"&&n(o({type:"success",message:r})),t==="error"&&n(o({type:"error",message:r}))}})},m=()=>{const s=c();return p({queryKey:["contents"],queryFn:()=>u({url:"/contents"}),onSettled:async n=>{const{status:e,message:t}=n;e==="error"&&s(o({type:"error",message:t}))}})},d=()=>{const s=c();return p({queryKey:["contents-mine"],queryFn:()=>u({url:"/contents/mine/all"}),onSettled:async n=>{const{status:e,message:t}=n;e==="error"&&s(o({type:"error",message:t}))}})},h=s=>{const n=c();return p({queryKey:["contents-mine",s],queryFn:()=>u({url:`/contents/mine/all/${s}`}),onSettled:async e=>{const{status:t,message:r}=e;t==="error"&&n(o({type:"error",message:r}))}})},f=({options:s,slug:n})=>{const e=c();return i({mutationFn:t=>u({method:"put",url:`/contents/mine/${n}`,data:t}),...s,onSettled:t=>{const{status:r,message:a}=t;r==="success"&&e(o({type:"success",message:a})),r==="error"&&e(o({type:"error",message:a}))}})},F=({options:s,slug:n})=>{const e=c();return i({mutationFn:t=>u({method:"put",url:`/contents/${n}`,data:t}),...s,onSettled:t=>{const{status:r,message:a}=t;r==="success"&&e(o({type:"success",message:a})),r==="error"&&e(o({type:"error",message:a}))}})};export{l as a,m as b,F as c,h as d,f as e,d as u};
