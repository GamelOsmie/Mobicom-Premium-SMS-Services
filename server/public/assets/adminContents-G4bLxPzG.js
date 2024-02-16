import{u as j,j as e,L as v,N as y,m as N,c as C,r as n,d as u,F as w,I as L,h as A}from"./index-VlWrzCtr.js";import{F as k}from"./index.esm-Ko34eCQY.js";import{u as _}from"./useContents-HpRp8ZB-.js";function S({contents:l,isLoading:r}){const{user:i}=j(s=>s.user);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid gap-10 md:grid-cols-2 lg:grid-cols-3",children:l==null?void 0:l.map(s=>e.jsxs("article",{className:"border border-gray-300 rounded-xl p-5 flex flex-col justify-between",children:[e.jsxs("div",{children:[e.jsxs("div",{className:`flex ${(i==null?void 0:i.user_role)=="Content Creator"&&s.publication_status=="published"?"justify-between":"justify-end"} items-center mb-10`,children:[(i==null?void 0:i.user_role)=="Content Creator"&&s.publication_status=="published"&&e.jsxs("div",{children:[s.approval_status=="pending"&&e.jsx("span",{className:"pending-pill",children:"pending"}),s.approval_status=="approved"&&e.jsx("span",{className:"active-pill",children:"approved"}),s.approval_status=="rejected"&&e.jsx("span",{className:"inactive-pill",children:"rejected"})]}),s.publication_status=="draft"&&e.jsx(u,{to:s.slug,children:e.jsx(w,{className:"text-blue-600 hover:text-blue-500 duration-500 text-xl"})})]}),e.jsxs("h1",{className:"text-lg font-medium mb-3",children:[" ",s.subject]}),e.jsxs("div",{className:"flex justify-between items-center mb-3 ",children:[e.jsx("p",{className:"text-primary text-sm",children:e.jsxs("span",{className:"text-sm",children:[s.category," "]})}),e.jsxs("p",{className:"text-gray-400 font-light text-sm flex gap-px items-center",children:[e.jsx(L,{}),e.jsx("span",{children:A(s.created_at).fromNow()})]})]}),e.jsx("p",{className:"text-gray-400 mb-3",children:s.body})]}),s.publication_status=="published"&&i.user_role.includes("Admin")&&e.jsxs("div",{children:[e.jsx("hr",{className:"mb-5"}),e.jsx(u,{to:`/sms/${s.category}/${s.slug}`,children:e.jsxs("div",{className:"text-blue-600 hover:text-blue-500 flex justify-center items-center gap-1",children:[e.jsx(k,{}),e.jsx("span",{children:" blast sms "})]})})]})]},s.slug))}),r&&e.jsx("div",{className:"p-10 text-center text-sm",children:"getting contents..."}),!(l!=null&&l.length)&&!r&&e.jsx("div",{className:"p-10 text-center text-sm",children:"No content found"})]})}function F(){var p;const[l,r]=n.useState([]),[i,s]=n.useState(""),[m,h]=n.useState(!1),[c,g]=n.useState("Any"),[x,b]=n.useState("Any"),{data:a,isLoading:f}=_();return n.useEffect(()=>{var t;if(i.length>=2){let o=(t=a==null?void 0:a.data)==null?void 0:t.filter(d=>d.subject.toLowerCase().includes(i.toLowerCase()));r(o)}else r(a==null?void 0:a.data)},[i,a==null?void 0:a.data]),n.useEffect(()=>{var o;let t;c!="Any"?t=(o=a==null?void 0:a.data)==null?void 0:o.filter(d=>d.category==c):t=a==null?void 0:a.data,x!="Any"&&(t=t==null?void 0:t.filter(d=>d.publication_status==x)),r(t)},[c,x]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-2 items-center pb-8 mb-10 border-b",children:[e.jsxs("h2",{className:"text-3xl font-medium mb-10 md:mb-0",children:["My Contents"," ",e.jsxs("span",{className:"text-lg text-gray-400",children:["(",(p=l==null?void 0:l.length)==null?void 0:p.toLocaleString(),")"]})]}),e.jsxs("div",{className:"col-span-2 md:col-span-1  flex flex-wrap items-center justify-end",children:[e.jsx("input",{type:"text",id:"base-input",value:i,onChange:t=>{s(t.target.value)},className:"input w-full md:w-1/2 lg:w-2/6 mb-3 md:mb-0",placeholder:"enter search term"}),e.jsx(u,{to:"create",children:e.jsx("button",{type:"button",className:"btn-primary md:ml-4 w-full md:w-fit",children:"Create Content"})})]})]}),e.jsx("div",{className:"text-sm flex justify-end items-center mb-5",children:e.jsx("div",{className:"flex gap-3",children:e.jsxs("button",{onClick:()=>h(!m),className:"flex items-center gap-2 border border-gray-300 px-4 py-1 rounded-lg",children:[e.jsx("span",{children:"filter"}),e.jsx("svg",{className:"w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:e.jsx("g",{fillRule:"evenodd",stroke:"none",strokeWidth:"1",children:e.jsx("g",{fill:"current",fillRule:"nonzero",children:e.jsx("path",{d:"M13.5,16 C13.9142136,16 14.25,16.3357864 14.25,16.75 C14.25,17.1642136 13.9142136,17.5 13.5,17.5 L10.5,17.5 C10.0857864,17.5 9.75,17.1642136 9.75,16.75 C9.75,16.3357864 10.0857864,16 10.5,16 L13.5,16 Z M16.5,11 C16.9142136,11 17.25,11.3357864 17.25,11.75 C17.25,12.1642136 16.9142136,12.5 16.5,12.5 L7.5,12.5 C7.08578644,12.5 6.75,12.1642136 6.75,11.75 C6.75,11.3357864 7.08578644,11 7.5,11 L16.5,11 Z M19.5,6 C19.9142136,6 20.25,6.33578644 20.25,6.75 C20.25,7.16421356 19.9142136,7.5 19.5,7.5 L4.5,7.5 C4.08578644,7.5 3.75,7.16421356 3.75,6.75 C3.75,6.33578644 4.08578644,6 4.5,6 L19.5,6 Z"})})})})]})})}),m&&e.jsx("div",{children:e.jsx("div",{className:"mb-5",children:e.jsxs("div",{className:"flex flex-col md:flex-row gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"countries",className:"block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400",children:"Category"}),e.jsxs("select",{id:"countries",className:"input p-2 text-xs w-full",value:c,onChange:t=>g(t.target.value),children:[e.jsx("option",{value:"Any",children:"Any"}),e.jsx("option",{value:"2021",children:"2021"}),e.jsx("option",{value:"2022",children:"2022"}),e.jsx("option",{value:"2023",children:"2023"}),e.jsx("option",{value:"2024",children:"2024"})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"countries",className:"block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400",children:"Publication Status"}),e.jsxs("select",{id:"countries",className:"input p-2 text-xs w-full",value:x,onChange:t=>b(t.target.value),children:[e.jsx("option",{value:"Any",children:"Any"}),e.jsx("option",{value:"published",children:"Published"}),e.jsx("option",{value:"draft",children:"Draft"})]})]})]})})}),e.jsx(S,{isLoading:f,contents:l})]})}function P(){const{user:l}=j(r=>r.user);return e.jsx("div",{className:"bg-black",children:e.jsx(v,{headerArea:e.jsx(y,{menuLinks:l.user_role.includes("Admin")?N:C}),mainArea:e.jsx(F,{})})})}export{P as default};
