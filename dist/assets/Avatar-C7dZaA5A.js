import{r as u,z as f,j as e,F as b}from"./index-CFLyA_sa.js";const h={xs:"w-6 h-6 text-[10px]",sm:"w-8 h-8 text-xs",md:"w-10 h-10 text-sm",lg:"w-12 h-12 text-base",xl:"w-16 h-16 text-lg"};function p({src:o,alt:i,size:t="md",name:r,status:s,className:l=""}){const[n,c]=u.useState(!1),d=f(),m=r?r.split(" ").map(x=>x[0]).join("").toUpperCase().slice(0,2):"?",a={online:"bg-emerald-500",offline:"bg-neutral-500",busy:"bg-red-500",away:"bg-amber-500"};return e.jsxs("div",{className:"relative inline-flex",children:[e.jsx(b.div,{initial:d?{}:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:.3},className:`
          rounded-full overflow-hidden
          flex items-center justify-center
          font-semibold text-white
          bg-gradient-to-br from-violet-500 to-cyan-500
          border-2 border-white/20
          ${h[t]}
          ${l}
        `,children:o&&!n?e.jsx("img",{src:o,alt:i||r||"Avatar",className:"w-full h-full object-cover",onError:()=>c(!0)}):e.jsx("span",{children:m})}),s&&e.jsx("span",{className:`absolute bottom-0 right-0 block rounded-full ring-2 ring-neutral-900 ${a[s]||a.offline} ${t==="xs"||t==="sm"?"w-1.5 h-1.5":"w-3 h-3"}`,"aria-label":`Status: ${s}`})]})}export{p as A};
