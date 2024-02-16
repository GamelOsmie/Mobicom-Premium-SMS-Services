import{u as N,j as e,L as y,N as v,m as L,c as C,a as w,C as l}from"./index-VlWrzCtr.js";import{a as F}from"./useContents-HpRp8ZB-.js";function S(){var m,d,x,u,h,j;const{register:a,handleSubmit:n,watch:i,formState:{errors:r},reset:p}=w(),s=i("body"),t=i("subject"),{mutate:g,isLoading:o}=F({onSuccess:c=>{const{status:f}=c;f==="success"&&p()}}),b=c=>{g(c)};return e.jsxs("div",{className:"mx-auto md:w-4/6 lg:w-1/3",children:[e.jsx("h3",{className:"font-semibold text-2xl text-center mb-8 ",children:"Create Content"}),e.jsxs("form",{onSubmit:n(b),children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"subject",className:"input-label",children:"Subject"}),e.jsx("input",{type:"text",id:"subject",className:"input w-full",placeholder:"subject",...a("subject",{required:!0,minLength:2,maxLength:120})}),e.jsx("div",{className:"flex justify-end",children:(t==null?void 0:t.length)<=120&&e.jsxs("p",{className:"text-gray-400 text-sm font-light",children:[120-(t==null?void 0:t.length)," characters remaining"]})}),e.jsx("div",{className:"flex justify-end",children:(t==null?void 0:t.length)>120&&e.jsxs("p",{className:"text-rejected text-sm font-light",children:["remove ",(t==null?void 0:t.length)-120," characters"]})}),e.jsxs(e.Fragment,{children:[((m=r.subject)==null?void 0:m.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(l,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," You forgot to add a subject!"]}),((d=r.subject)==null?void 0:d.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(l,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your subject is too short"]}),((x=r.subject)==null?void 0:x.type)==="maxLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(l,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your subject shouldn't be longer than 120 characters"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"body",className:"input-label",children:"Message"}),e.jsx("textarea",{rows:8,type:"text",id:"body",className:"input w-full",placeholder:"message",...a("body",{minLength:2,maxLength:400})}),e.jsx("div",{className:"flex justify-end",children:(s==null?void 0:s.length)<=400&&e.jsxs("p",{className:"text-gray-400 text-sm font-light",children:[400-(s==null?void 0:s.length)," characters remaining"]})}),e.jsx("div",{className:"flex justify-end",children:(s==null?void 0:s.length)>400&&e.jsxs("p",{className:"text-rejected text-sm font-light",children:["remove ",(s==null?void 0:s.length)-400," characters"]})}),e.jsxs(e.Fragment,{children:[((u=r.body)==null?void 0:u.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(l,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your message is too short"]}),((h=r.body)==null?void 0:h.type)==="maxLength"&&e.jsxs("p",{className:"form-error-text flex items-start gap-1",children:[e.jsx(l,{className:"text-lg"}),"Your message shouldn't be longer than 400 characters"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"category",className:"input-label",children:"Category"}),e.jsxs("select",{id:"category",className:"input w-full",...a("category",{required:!0}),children:[e.jsx("option",{value:"2021",children:"2020"}),e.jsx("option",{value:"2021",children:"2021"}),e.jsx("option",{value:"2022",children:"2022"}),e.jsx("option",{value:"2023",children:"2023"}),e.jsx("option",{value:"2024",children:"2024"})]}),e.jsx(e.Fragment,{children:((j=r.category)==null?void 0:j.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(l,{className:"text-lg"})," You need to select a category"]})})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"publication_status",className:"input-label",children:"Publication status"}),e.jsxs("select",{id:"publication_status",className:"input w-full",value:"draft",...a("publication_status",{required:!0}),children:[e.jsx("option",{value:"draft",children:"Draft"}),e.jsx("option",{value:"published",children:"Published"})]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{disabled:o,type:"submit",className:"btn-primary w-full",children:o?"Creating content...":"Create content"})})]})]})}function k(){const{user:a}=N(n=>n.user);return e.jsx("div",{className:"bg-black",children:e.jsx(y,{headerArea:e.jsx(v,{menuLinks:a.user_role.includes("Admin")?L:C}),mainArea:e.jsx(S,{})})})}export{k as default};
