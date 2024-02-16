import{u as L,j as e,L as C,N as w,m as F,c as S,e as U,f as _,a as k,C as r}from"./index-iNVVRrdp.js";import{d as A,e as P}from"./useContents-Xqwk6omz.js";function Y(){var u,x,h,j,p,b,f;const{slug:l}=U(),c=_(),{register:i,handleSubmit:g,watch:o,formState:{errors:n}}=k(),s=o("body"),t=o("subject"),{data:a}=A(l),{mutate:N,isLoading:m}=P({slug:l,options:{onSuccess:d=>{const{status:v}=d;v=="success"&&c(-1)}}}),y=d=>{N(d)};return e.jsx(e.Fragment,{children:(a==null?void 0:a.data)&&e.jsxs("div",{className:"mx-auto md:w-4/6 lg:w-1/3",children:[e.jsx("h3",{className:"font-semibold text-2xl text-center mb-8 ",children:"Update Content"}),e.jsxs("form",{onSubmit:g(y),children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"subject",className:"input-label",children:"Subject"}),e.jsx("input",{type:"text",id:"subject",className:"input w-full",placeholder:"subject",defaultValue:(u=a==null?void 0:a.data)==null?void 0:u.subject,...i("subject",{required:!0,minLength:2,maxLength:120})}),e.jsx("div",{className:"flex justify-end",children:(t==null?void 0:t.length)<=120&&e.jsxs("p",{className:"text-gray-400 text-sm font-light",children:[120-(t==null?void 0:t.length)," characters remaining"]})}),e.jsx("div",{className:"flex justify-end",children:(t==null?void 0:t.length)>120&&e.jsxs("p",{className:"text-rejected text-sm font-light",children:["remove ",(t==null?void 0:t.length)-120," characters"]})}),e.jsxs(e.Fragment,{children:[((x=n.subject)==null?void 0:x.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(r,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," You forgot to add a subject!"]}),((h=n.subject)==null?void 0:h.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(r,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your subject is too short"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"body",className:"input-label",children:"Message"}),e.jsx("textarea",{rows:8,type:"text",id:"body",className:"input w-full",placeholder:"message",defaultValue:(j=a==null?void 0:a.data)==null?void 0:j.body,...i("body",{minLength:2,maxLength:400})}),e.jsx("div",{className:"flex justify-end",children:(s==null?void 0:s.length)<=400&&e.jsxs("p",{className:"text-gray-400 text-sm font-light",children:[400-(s==null?void 0:s.length)," characters remaining"]})}),e.jsx("div",{className:"flex justify-end",children:(s==null?void 0:s.length)>400&&e.jsxs("p",{className:"text-rejected text-sm font-light",children:["remove ",(s==null?void 0:s.length)-400," characters"]})}),e.jsxs(e.Fragment,{children:[((p=n.body)==null?void 0:p.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(r,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your message is too short"]}),((b=n.body)==null?void 0:b.type)==="maxLength"&&e.jsxs("p",{className:"form-error-text flex items-start gap-1",children:[e.jsx(r,{className:"text-lg"}),"Your message shouldn't be longer than 120 characters"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"publication_status",className:"input-label",children:"Publication status"}),e.jsxs("select",{id:"publication_status",className:"input w-full",defaultValue:(f=a==null?void 0:a.data)==null?void 0:f.publication_status,...i("publication_status",{required:!0}),children:[e.jsx("option",{value:"draft",children:"Draft"}),e.jsx("option",{value:"published",children:"Published"})]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{disabled:m,type:"submit",className:"btn-primary w-full",children:m?"Updating content...":"Update content"})})]})]})})}function O(){const{user:l}=L(c=>c.user);return e.jsx("div",{className:"bg-black",children:e.jsx(C,{headerArea:e.jsx(w,{menuLinks:l.user_role.includes("Admin")?F:S}),mainArea:e.jsx(Y,{})})})}export{O as default};
