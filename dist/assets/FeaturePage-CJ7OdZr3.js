import{q as a,r,j as e,Z as n,y as d,N as i,l as x}from"./index-CFLyA_sa.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=a("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=a("Plug",[["path",{d:"M12 22v-5",key:"1ega77"}],["path",{d:"M9 8V2",key:"14iosj"}],["path",{d:"M15 8V2",key:"18g5xt"}],["path",{d:"M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z",key:"osxo6l"}]]);function p(){const[l,t]=r.useState(null),c=[{icon:n,title:"极速性能",desc:"毫秒级响应，流畅体验",color:"#ff9500"},{icon:d,title:"安全可靠",desc:"企业级安全防护",color:"#34c759"},{icon:i,title:"精美设计",desc:"现代化 UI 设计",color:"#0071e3"},{icon:x,title:"数据分析",desc:"深度洞察业务数据",color:"#af52de"},{icon:f,title:"无缝集成",desc:"支持多种第三方服务",color:"#ff3b30"},{icon:m,title:"智能客服",desc:"7x24 小时在线支持",color:"#5ac8fa"}];return e.jsx("div",{className:"w-full h-full overflow-auto",style:{background:"#f5f5f7",fontFamily:"'Inter', 'Noto Sans SC', sans-serif"},children:e.jsxs("div",{className:"max-w-6xl mx-auto px-8 py-16",children:[e.jsxs("div",{className:"text-center mb-16",children:[e.jsx("h1",{className:"text-5xl font-bold mb-4",style:{color:"#1d1d1f"},children:"强大功能，简单使用"}),e.jsx("p",{className:"text-xl",style:{color:"#86868b"},children:"六大核心功能，助力业务增长"})]}),e.jsx("div",{className:"grid grid-cols-3 gap-8",children:c.map((s,o)=>e.jsxs("div",{onMouseEnter:()=>t(o),onMouseLeave:()=>t(null),className:"p-8 rounded-2xl transition-all duration-300",style:{background:"#ffffff",border:`2px solid ${l===o?s.color:"#e5e5e7"}`,transform:l===o?"translateY(-8px)":"none",boxShadow:l===o?`0 16px 32px ${s.color}20`:"none"},children:[e.jsx(s.icon,{size:64,className:"mb-6",style:{color:s.color}}),e.jsx("h3",{className:"text-2xl font-bold mb-3",style:{color:s.color},children:s.title}),e.jsx("p",{className:"text-base",style:{color:"#666666"},children:s.desc})]},o))})]})})}export{p as default};
