import{i as L,k as R,l as M,s as w,n as q,j as e,L as G,N as $,m as D,e as I,f as P,r as n}from"./index-iNVVRrdp.js";import{F as v}from"./index.esm-TibWVfXm.js";const z=i=>{const x=L();return R({mutationFn:r=>M({method:"post",url:"/blast-sms",data:r}),...i,onSettled:r=>{const{status:l,message:m}=r;l==="success"&&x(w({type:"success",message:m})),l==="error"&&x(w({type:"error",message:m}))}})},K=i=>{const x=L();return q({queryKey:["contents",i],queryFn:()=>M({url:`/${i}/subscribers`}),onSettled:async r=>{const{status:l,message:m}=r;l==="error"&&x(setNotification({type:"error",message:m}))}})};function Q(){var y;const{category:i,message:x}=I(),r=P(),[l,m]=n.useState(""),[b,j]=n.useState([]),[_,k]=n.useState(0),[h,C]=n.useState(),[f,p]=n.useState([]),[E,g]=n.useState({all_subscribers:!1,all_enough_balance:!1,all_low_balance:!1,list:[]}),{data:t,isLoading:S}=K(i),{mutate:B,isLoading:N}=z({onSuccess:s=>{const{status:a}=s;a=="success"&&r(-1)}}),A=()=>{B({message:x,category:i,group:E})};n.useEffect(()=>{var s;if(l.length>=2){let a=(s=t==null?void 0:t.data)==null?void 0:s.filter(o=>o.msisdn_no.toLowerCase().includes(l.toLowerCase()));j(a)}else j(t==null?void 0:t.data)},[l,t==null?void 0:t.data]),n.useEffect(()=>{k(f.length)},[f]),n.useEffect(()=>{var s,a,o;if(h==""&&(g({all_subscribers:!1,all_enough_balance:!1,all_low_balance:!1,list:[]}),p([])),h=="all"){g({all_subscribers:!0,all_enough_balance:!1,all_low_balance:!1,list:[]});let c=[];(s=t==null?void 0:t.data)==null||s.forEach(d=>c.push(d)),p(c)}if(h=="enough-balance"){g({all_subscribers:!1,all_enough_balance:!0,all_low_balance:!1,list:[]});const c=(a=t==null?void 0:t.data)==null?void 0:a.filter(u=>u.has_enough_balance==!0);let d=[];c.forEach(u=>d.push(u)),p(d)}if(h=="low-balance"){g({all_subscribers:!1,all_enough_balance:!1,all_low_balance:!0,list:[]});const c=(o=t==null?void 0:t.data)==null?void 0:o.filter(u=>u.has_enough_balance==!1);let d=[];c.forEach(u=>d.push(u)),p(d)}},[h]);const F=async s=>{let a=[];if(!f.includes(s))a.push(s),p([...f,s]);else{const o=a.filter(c=>c!=s);a=o,p(o)}g({all_subscribers:!1,all_enough_balance:!1,all_low_balance:!1,list:a})};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"grid grid-cols-2 items-center pb-8 mb-10 border-b",children:[e.jsx("h2",{className:"text-3xl font-medium mb-10 md:mb-0",children:"SMS Management"}),e.jsxs("div",{className:"col-span-2 md:col-span-1  flex flex-wrap items-center justify-end",children:[e.jsx("input",{type:"text",id:"base-input",value:l,onChange:s=>{m(s.target.value)},className:"input w-full md:w-1/2 lg:w-2/6 mb-3 md:mb-0",placeholder:"enter search term"}),_>0?e.jsxs("button",{disabled:N,onClick:A,type:"button",className:"btn-primary md:ml-4 w-full md:w-fit flex gap-2 items-center",children:[e.jsx(v,{className:"text-xl"})," ",N?"sending":"Blast SMS"]}):e.jsxs("button",{type:"button",className:"cursor-not-allowed btn-secondary text-gray-400 md:ml-4 w-full md:w-fit flex gap-2 items-center",children:[e.jsx(v,{className:"text-xl"})," Blast SMS"]})]})]}),e.jsx("div",{children:e.jsx("div",{className:"mb-5",children:e.jsxs("div",{className:"flex flex-col justify-between items-center md:flex-row gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"countries",className:"block mb-2 text-xs font-medium text-gray-900 dark:text-gray-400",children:"Recipients"}),e.jsxs("select",{id:"countries",className:"input p-2 text-xs w-full",value:h,onChange:s=>C(s.target.value),children:[e.jsx("option",{value:"",children:"Select recipient group "}),e.jsx("option",{value:"all",children:"All Subscribers"}),e.jsx("option",{value:"enough-balance",children:"All Enough Balance"}),e.jsx("option",{value:"low-balance",children:"All Low Balance"})]})]}),e.jsxs("div",{className:"flex items-start gap-1",children:[e.jsx("p",{className:"text-5xl",children:_})," ",e.jsxs("p",{className:"text-sm leading-none",children:["recipients ",e.jsx("br",{})," selected"]})]})]})})}),e.jsxs("div",{className:"relative overflow-x-auto sm:rounded-lg mb-10",children:[e.jsxs("table",{className:"w-full text-sm text-left text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3",children:"id"}),e.jsxs("th",{scope:"col",className:"px-6 py-3",children:["MSISDN"," "]}),e.jsx("th",{scope:"col",className:"px-6 py-3",children:"Balance Status"})]})}),e.jsx("tbody",{children:b==null?void 0:b.map((s,a)=>e.jsxs("tr",{onClick:()=>F(s),className:`${f.includes(s)?"bg-primary_transparent":"bg-white"} border-b cursor-pointer hover:scale-[.98] duration-500`,children:[e.jsx("td",{className:"px-6 py-4",children:a+1}),e.jsx("th",{scope:"row",className:"px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap dark:text-white",children:s==null?void 0:s.msisdn_no}),e.jsx("td",{className:"px-6 py-4",children:e.jsx("span",{className:s!=null&&s.has_enough_balance?"active-pill":"inactive-pill",children:s!=null&&s.has_enough_balance?"Enough Balance":"Low Balance"})})]},s._id))})]}),S&&e.jsx("div",{className:"p-10 text-center text-sm",children:"getting subscribers..."}),!((y=t==null?void 0:t.data)!=null&&y.length)&&!S&&e.jsx("div",{className:"p-10 text-center text-sm",children:"No subscriber found"}),l!=null&&l.length&&!b.length?e.jsx("div",{className:"p-10 text-center text-sm",children:"No subscriber found"}):null]})]})}function J(){return e.jsx("div",{className:"bg-black",children:e.jsx(G,{headerArea:e.jsx($,{menuLinks:D}),mainArea:e.jsx(Q,{})})})}export{J as default};
