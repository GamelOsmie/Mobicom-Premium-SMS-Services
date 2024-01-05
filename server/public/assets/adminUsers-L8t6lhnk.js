import{j as e,L as f,N,m as y,u as w,r,d as u,q as C}from"./index-BiilD4-N.js";import{d as L}from"./useUser-x15pW1FT.js";import{M as _}from"./modal-x5KwAt8M.js";function A({users:c,isLoading:d}){const[m,n]=r.useState(!1),[s,h]=r.useState({}),j=()=>n(!1),o=t=>{const x=c.find(g=>g.slug===t);h(x),n(!0)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"relative overflow-x-auto sm:rounded-lg mb-10",children:[e.jsxs("table",{className:"w-full text-sm text-left text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:"name"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"username"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"role"}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"status"}),e.jsx("th",{scope:"col",className:"px-6 py-3"})]})}),e.jsx("tbody",{children:c==null?void 0:c.map(t=>e.jsxs("tr",{className:"bg-white border-b",children:[e.jsxs("th",{scope:"row",className:"px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap dark:text-white",children:[t.first_name," ",t.middle_name," ",t.last_name]}),e.jsx("td",{className:"px-6 py-4",children:t==null?void 0:t.username}),e.jsx("td",{className:"px-6 py-4",children:t==null?void 0:t.user_role}),e.jsx("td",{className:"px-6 py-4",children:e.jsx("span",{className:t!=null&&t.is_active?"active-pill":"inactive-pill",children:t!=null&&t.is_active?"active":"suspended"})}),e.jsxs("td",{className:"px-6 py-4 flex gap-4",children:[e.jsx("span",{onClick:()=>o(t.slug),className:"font-medium text-blue-600 hover:text-blue-500 cursor-pointer",children:"View"}),e.jsx(u,{to:t.slug,children:e.jsx("span",{className:"font-medium text-blue-600 hover:text-blue-500 cursor-pointer",children:"Edit"})})]})]},t._id))})]}),d&&e.jsx("div",{className:"p-10 text-center text-sm",children:"getting users..."}),!(c!=null&&c.length)&&!d&&e.jsx("div",{className:"p-10 text-center text-sm",children:"No user found"})]}),e.jsxs(_,{toggleModal:j,modalIsOpen:m,children:[e.jsxs("h2",{className:"font-semibold text-2xl",children:[s==null?void 0:s.first_name," ",s==null?void 0:s.middle_name," ",s==null?void 0:s.last_name," ",e.jsxs("span",{className:"text-base font-normal",children:["(",s==null?void 0:s.username,")"]})]}),e.jsx("h6",{className:"text-primary mb-10",children:s==null?void 0:s.user_role}),e.jsxs("section",{children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"text-sm text-gray-300 capitalize",children:"Phone Number"}),e.jsx("p",{children:s==null?void 0:s.phone_number})]}),e.jsxs("div",{children:[e.jsx("label",{className:"text-sm text-gray-300 capitalize",children:"email"}),e.jsx("p",{children:s==null?void 0:s.email})]})]})]})]})}function S(){var v;const{user:c}=w(a=>a.user),[d,m]=r.useState([]),[n,s]=r.useState(""),[h,j]=r.useState(!1),[o,t]=r.useState("Any"),[x,g]=r.useState("Any"),{data:l,isLoading:b}=L();return r.useEffect(()=>{var a;if(n.length>=2){let p=(a=l==null?void 0:l.data)==null?void 0:a.filter(i=>i.first_name.toLowerCase().includes(n.toLowerCase())||i.middle_name&&i.middle_name.toLowerCase().includes(n.toLowerCase())||i.last_name.includes(n.toLowerCase())||i.email&&i.email.toLowerCase().includes(n.toLowerCase())||i.phone_number.toLowerCase().includes(n.toLowerCase())||i.username.toLowerCase().includes(n.toLowerCase()));m(p)}else m(l==null?void 0:l.data)},[n,l==null?void 0:l.data]),r.useEffect(()=>{var p;let a;o!="Any"?a=(p=l==null?void 0:l.data)==null?void 0:p.filter(i=>i.user_role==o):a=l==null?void 0:l.data,x!="Any"&&(a=a==null?void 0:a.filter(i=>i.is_active.toString()==x)),m(a)},[o,x]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-2 items-center pb-8 mb-10 border-b",children:[e.jsxs("h2",{className:"text-3xl font-medium mb-10 md:mb-0",children:["Users"," ",e.jsxs("span",{className:"text-lg text-gray-400",children:["(",(v=d==null?void 0:d.length)==null?void 0:v.toLocaleString(),")"]})]}),e.jsxs("div",{className:"col-span-2 md:col-span-1  flex flex-wrap items-center justify-end",children:[e.jsx("input",{type:"text",id:"base-input",value:n,onChange:a=>{s(a.target.value)},className:"input w-full md:w-1/2 lg:w-2/6 mb-3 md:mb-0",placeholder:"enter search term"}),e.jsx(u,{to:"create",children:e.jsx("button",{type:"button",className:"btn-primary md:ml-4 w-full md:w-fit",children:"Add User"})})]})]}),e.jsx("div",{className:"text-sm flex justify-end items-center mb-5",children:e.jsxs("div",{className:"flex gap-3",children:[e.jsxs("button",{onClick:()=>j(!h),className:"flex items-center gap-2 border border-gray-300 px-4 py-1 rounded-lg",children:[e.jsx("span",{children:"filter"}),e.jsx("svg",{className:"w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:e.jsx("g",{fillRule:"evenodd",stroke:"none",strokeWidth:"1",children:e.jsx("g",{fill:"current",fillRule:"nonzero",children:e.jsx("path",{d:"M13.5,16 C13.9142136,16 14.25,16.3357864 14.25,16.75 C14.25,17.1642136 13.9142136,17.5 13.5,17.5 L10.5,17.5 C10.0857864,17.5 9.75,17.1642136 9.75,16.75 C9.75,16.3357864 10.0857864,16 10.5,16 L13.5,16 Z M16.5,11 C16.9142136,11 17.25,11.3357864 17.25,11.75 C17.25,12.1642136 16.9142136,12.5 16.5,12.5 L7.5,12.5 C7.08578644,12.5 6.75,12.1642136 6.75,11.75 C6.75,11.3357864 7.08578644,11 7.5,11 L16.5,11 Z M19.5,6 C19.9142136,6 20.25,6.33578644 20.25,6.75 C20.25,7.16421356 19.9142136,7.5 19.5,7.5 L4.5,7.5 C4.08578644,7.5 3.75,7.16421356 3.75,6.75 C3.75,6.33578644 4.08578644,6 4.5,6 L19.5,6 Z"})})})})]}),e.jsx("a",{href:`${C}/users/download/excel`,children:e.jsxs("button",{className:"flex items-center gap-2 border border-gray-300 px-4 py-1 rounded-lg",children:[e.jsx("span",{children:"export"}),e.jsx("svg",{className:"w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z"})})]})})]})}),h&&e.jsx("div",{children:e.jsx("div",{className:"mb-5",children:e.jsxs("div",{className:"flex flex-col md:flex-row gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"countries",className:"block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400",children:"Role"}),e.jsxs("select",{id:"countries",className:"input p-2 text-xs w-full",value:o,onChange:a=>t(a.target.value),children:[e.jsx("option",{value:"Any",children:"Any"}),(c==null?void 0:c.user_role)=="Super Admin"&&e.jsx("option",{value:"Admin",children:"Admin"}),e.jsx("option",{value:"Content Creator",children:"Content Creator"})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"countries",className:"block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400",children:"Status"}),e.jsxs("select",{id:"countries",className:"input p-2 text-xs w-full",value:x,onChange:a=>g(a.target.value),children:[e.jsx("option",{value:"Any",children:"Any"}),e.jsx("option",{value:"true",children:"Active"}),e.jsx("option",{value:"false",children:"Suspended"})]})]})]})})}),e.jsx(A,{isLoading:b,users:d})]})}function V(){return e.jsx("div",{className:"bg-black",children:e.jsx(f,{headerArea:e.jsx(N,{menuLinks:y}),mainArea:e.jsx(S,{})})})}export{V as default};
