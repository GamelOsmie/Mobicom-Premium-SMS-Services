import{u as t,j as s,L as n,N as i,m as l,c as m,d as r,F as c}from"./index-Zq4SKFCc.js";function d(){const{user:e}=t(a=>a.user);return s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"grid grid-cols-2 items-center pb-8 mb-10 border-b",children:s.jsx("h2",{className:"text-3xl font-medium mb-10 md:mb-0",children:"My Profile"})}),s.jsxs("div",{className:"mx-auto md:w-4/6 lg:w-1/3 text-center",children:[s.jsxs("h1",{className:"text-3xl",children:[e==null?void 0:e.first_name," ",e==null?void 0:e.middle_name," ",e==null?void 0:e.last_name," ",s.jsxs("span",{className:"text-base text-gray-400",children:["(",e==null?void 0:e.username,")"]})]}),s.jsx("p",{children:e==null?void 0:e.email}),s.jsx("p",{children:e==null?void 0:e.phone_number}),s.jsxs(r,{to:"update",className:"text-sm text-blue-600 hover:text-blue-500 duration-500 flex justify-center mt-8 gap-1",children:[s.jsx(c,{className:"text-xl"})," edit profile"]})]})]})}function o(){const{user:e}=t(a=>a.user);return s.jsx("div",{className:"bg-black",children:s.jsx(n,{headerArea:s.jsx(i,{menuLinks:e.user_role.includes("Admin")?l:m}),mainArea:s.jsx(d,{})})})}export{o as default};
