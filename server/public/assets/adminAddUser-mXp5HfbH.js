import{j as e,L as v,N as F,m as Y,u as q,a as z,b as Z,C as a}from"./index-ecJo6cfF.js";function C(){var m,i,c,o,d,x,p,u,h,j,f,N,g,b;const{user:l}=q(t=>t.user),{register:r,handleSubmit:y,formState:{errors:s},reset:_}=z(),{mutate:w,isLoading:n}=Z({onSuccess:t=>{const{status:L}=t;L==="success"&&_()}}),A=t=>{w(t)};return e.jsxs("div",{className:"mx-auto md:w-4/6 lg:w-1/5",children:[e.jsx("h3",{className:"font-semibold text-2xl text-center mb-8 ",children:"Add User"}),e.jsxs("form",{onSubmit:y(A),children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"first_name",className:"input-label",children:"First name"}),e.jsx("input",{type:"text",id:"first_name",className:"input w-full",placeholder:"first name",...r("first_name",{required:!0,minLength:2,pattern:/^[a-zA-Z]+$/i})}),e.jsxs(e.Fragment,{children:[((m=s.first_name)==null?void 0:m.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," You forgot to add a first name!"]}),((i=s.first_name)==null?void 0:i.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your name can't be less than 2 characters"]}),((c=s.first_name)==null?void 0:c.type)==="pattern"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," Your name shouldn't contain numbers or spaces!"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsxs("label",{htmlFor:"middle_name",className:"input-label",children:["Middle name ",e.jsx("span",{className:"text-xs font-light",children:"(optional)"})]}),e.jsx("input",{type:"text",id:"middle_name",className:"input w-full",placeholder:"middle name",...r("middle_name",{minLength:2,pattern:/^[a-zA-Z]+$/i})}),e.jsxs(e.Fragment,{children:[((o=s.middle_name)==null?void 0:o.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your name can't be less than 2 characters"]}),((d=s.middle_name)==null?void 0:d.type)==="pattern"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," Your name shouldn't contain numbers or spaces!"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"last_name",className:"input-label",children:"Last name"}),e.jsx("input",{type:"text",id:"last_name",className:"input w-full",placeholder:"last name",...r("last_name",{required:!0,minLength:2,pattern:/^[a-zA-Z]+$/i})}),e.jsxs(e.Fragment,{children:[((x=s.last_name)==null?void 0:x.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," You forgot to add a last name!"]}),((p=s.last_name)==null?void 0:p.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your name can't be less than 2 characters"]}),((u=s.last_name)==null?void 0:u.type)==="pattern"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," Your name shouldn't contain numbers or spaces!"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"username",className:"input-label",children:"Username"}),e.jsx("input",{type:"text",id:"username",className:"input w-full",placeholder:"username",...r("username",{required:!0,minLength:4,pattern:/^[a-zA-Z]+$/i})}),e.jsxs(e.Fragment,{children:[((h=s.username)==null?void 0:h.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," You forgot to add a username!"]}),((j=s.username)==null?void 0:j.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your name can't be less than 4 characters"]}),((f=s.username)==null?void 0:f.type)==="pattern"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," Your username shouldn't contain numbers or spaces!"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"email",className:"input-label",children:"Email"}),e.jsx("input",{type:"email",id:"email",className:"input w-full",placeholder:"email",...r("email",{required:!0,minLength:4,pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/})}),e.jsx(e.Fragment,{children:s.email&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," Enter a valid email address"]})})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"phone_number",className:"input-label",children:"Phone number"}),e.jsx("input",{type:"text",id:"phone_number",className:"input w-full",placeholder:"phone number",...r("phone_number",{required:!0,minLength:9,maxLength:12,pattern:/^[0-9]{9,12}$/g})}),e.jsx(e.Fragment,{children:s.phone_number&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," Enter a valid phone number"]})})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"password",className:"input-label",children:"Provisional password"}),e.jsx("input",{type:"text",id:"password",className:"input w-full",placeholder:"password",...r("password",{required:!0,minLength:4})}),e.jsxs(e.Fragment,{children:[((N=s.password)==null?void 0:N.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," You forgot to add a password!"]}),((g=s.password)==null?void 0:g.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," Your provisional password should be at least 4 characters"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"user_role",className:"input-label",children:"User role"}),e.jsxs("select",{id:"user_role",className:"input w-full",...r("user_role",{required:!0}),children:[e.jsx("option",{value:"Content Creator",children:"Content Creator"}),(l==null?void 0:l.user_role)=="Super Admin"&&e.jsx("option",{value:"Admin",children:"Admin"})]}),e.jsx(e.Fragment,{children:((b=s.user_role)==null?void 0:b.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(a,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," You forgot to specify a user role!"]})})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{disabled:n,type:"submit",className:"btn-primary w-full",children:n?"Creating user...":"Create user"})})]})]})}function U(){return e.jsx("div",{className:"bg-black",children:e.jsx(v,{headerArea:e.jsx(F,{menuLinks:Y}),mainArea:e.jsx(C,{})})})}export{U as default};
