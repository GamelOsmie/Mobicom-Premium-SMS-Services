import{u as q,j as e,L as $,N as E,m as V,c as k,f as I,i as D,r as B,a as A,p as K,C as s,q as R}from"./index-7FySfenF.js";import{c as G,d as H}from"./useUser-qjR3M4Je.js";import{M as J}from"./modal-TmPqZuO2.js";function Q(){var h,f,j,g,N,b,w,y,_,L,v,F,P;const l=I(),{user:r}=q(t=>t.user),z=D(),[c,d]=B.useState(!1),o=()=>{d(!c)},{register:n,handleSubmit:O,formState:{errors:a}}=A(),{register:u,handleSubmit:S,formState:{errors:m}}=A(),{mutate:U,isLoading:p}=G({onSuccess:t=>{const{status:i,data:Y}=t;i=="success"&&(z(R(Y)),l(-1))}}),{mutate:Z,isLoading:x}=H({onSuccess:t=>{const{status:i,data:Y}=t;i=="success"&&d(!1)}}),M=t=>{U(t)},C=t=>{Z(t)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-2 items-center pb-8 mb-10 border-b",children:[e.jsx("h2",{className:"text-3xl font-medium mb-10 md:mb-0",children:"Update Profile"}),e.jsx("div",{className:"col-span-2 md:col-span-1  flex flex-wrap items-center justify-end",children:e.jsxs("button",{onClick:o,type:"button",className:"btn-primary md:ml-4 w-full md:w-fit flex items-center gap-2",children:[e.jsx(K,{className:"text-xl"}),"Change Password"]})})]}),e.jsx("div",{className:"mx-auto md:w-4/6 lg:w-1/5",children:e.jsxs("form",{onSubmit:O(M),children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"first_name",className:"input-label",children:"First name"}),e.jsx("input",{type:"text",id:"first_name",className:"input w-full",placeholder:"first name",defaultValue:r.first_name,...n("first_name",{required:!0,minLength:2,pattern:/^[a-zA-Z]+$/i})}),e.jsxs(e.Fragment,{children:[((h=a.first_name)==null?void 0:h.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," You forgot to add a first name!"]}),((f=a.first_name)==null?void 0:f.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your name can't be less than 2 characters"]}),((j=a.first_name)==null?void 0:j.type)==="pattern"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," Your name shouldn't contain numbers or spaces!"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsxs("label",{htmlFor:"middle_name",className:"input-label",children:["Middle name ",e.jsx("span",{className:"text-xs font-light",children:"(optional)"})]}),e.jsx("input",{type:"text",id:"middle_name",className:"input w-full",placeholder:"middle name",defaultValue:r.middle_name,...n("middle_name",{minLength:2,pattern:/^[a-zA-Z]+$/i})}),e.jsxs(e.Fragment,{children:[((g=a.middle_name)==null?void 0:g.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your name can't be less than 2 characters"]}),((N=a.middle_name)==null?void 0:N.type)==="pattern"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," Your name shouldn't contain numbers or spaces!"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"last_name",className:"input-label",children:"Last name"}),e.jsx("input",{type:"text",id:"last_name",className:"input w-full",placeholder:"last name",defaultValue:r.last_name,...n("last_name",{required:!0,minLength:2,pattern:/^[a-zA-Z]+$/i})}),e.jsxs(e.Fragment,{children:[((b=a.last_name)==null?void 0:b.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," You forgot to add a last name!"]}),((w=a.last_name)==null?void 0:w.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your name can't be less than 2 characters"]}),((y=a.last_name)==null?void 0:y.type)==="pattern"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," Your name shouldn't contain numbers or spaces!"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"username",className:"input-label",children:"Username"}),e.jsx("input",{type:"text",id:"username",className:"input w-full",placeholder:"username",defaultValue:r.username,...n("username",{required:!0,minLength:4,pattern:/^[a-zA-Z]+$/i})}),e.jsxs(e.Fragment,{children:[((_=a.username)==null?void 0:_.type)==="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," You forgot to add a username!"]}),((L=a.username)==null?void 0:L.type)==="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," ",e.jsx("span",{className:"font-medium",children:"Oops!"})," Your name can't be less than 4 characters"]}),((v=a.username)==null?void 0:v.type)==="pattern"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," Your username shouldn't contain numbers or spaces!"]})]})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"email",className:"input-label",children:"Email"}),e.jsx("input",{type:"email",id:"email",className:"input w-full",placeholder:"email",defaultValue:r.email,...n("email",{required:!0,minLength:4,pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/})}),e.jsx(e.Fragment,{children:a.email&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," Enter a valid email address"]})})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"phone_number",className:"input-label",children:"Phone number"}),e.jsx("input",{type:"text",id:"phone_number",className:"input w-full",placeholder:"phone number",defaultValue:r.phone_number,...n("phone_number",{required:!0,minLength:9,maxLength:12,pattern:/^[0-9]{9,12}$/g})}),e.jsx(e.Fragment,{children:a.phone_number&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," Enter a valid phone number"]})})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{disabled:p,type:"submit",className:"btn-primary w-full",children:p?"Updating user...":"Update user"})})]})}),e.jsxs(J,{toggleModal:o,modalIsOpen:c,children:[e.jsx("h2",{className:"text-2xl text-center mb-5",children:"Change Your Password"}),e.jsxs("form",{onSubmit:S(C),children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"current password",className:"input-label",children:"Current Password"}),e.jsx("input",{type:"current_password",id:"current_password",className:"input w-full",placeholder:"current password",...u("current_password",{required:!0})}),e.jsx(e.Fragment,{children:m.current_password&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," You forgot to enter your current password"]})})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"current password",className:"input-label",children:"New Password"}),e.jsx("input",{type:"new_password",id:"new_password",className:"input w-full",placeholder:"new password",...u("new_password",{required:!0,minLength:6})}),e.jsxs(e.Fragment,{children:[((F=m.new_password)==null?void 0:F.type)=="required"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," You forgot to enter your new password"]}),((P=m.new_password)==null?void 0:P.type)=="minLength"&&e.jsxs("p",{className:"form-error-text flex items-center gap-1",children:[e.jsx(s,{className:"text-lg"})," Your password shouldn't be less than 6 characters"]})]})]}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{disabled:x,type:"submit",className:"btn-primary w-full",children:x?"Changing...":"Change password"})})]})]})]})}function ee(){const{user:l}=q(r=>r.user);return e.jsx("div",{className:"bg-black",children:e.jsx($,{headerArea:e.jsx(E,{menuLinks:l.user_role.includes("Admin")?V:k}),mainArea:e.jsx(Q,{})})})}export{ee as default};
