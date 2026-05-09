import{r as a,j as e}from"./index-CFLyA_sa.js";function c(){const[s,n]=a.useState("react"),l={react:{title:"React 组件",code:`import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      点击次数：{count}
    </button>
  )
}`,lang:"jsx"},vue:{title:"Vue 组件",code:`<template>
  <button @click="count++">
    点击次数：{{ count }}
  </button>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
<\/script>`,lang:"vue"},python:{title:"Python 函数",code:`def fibonacci(n: int) -> list[int]:
    """生成斐波那契数列"""
    if n <= 0:
        return []
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]`,lang:"python"}};return e.jsx("div",{className:"w-full h-full flex items-center justify-center p-4",style:{background:"#f5f5f7"},children:e.jsxs("div",{className:"relative flex flex-col w-full max-w-4xl",style:{aspectRatio:"16/9",background:"#ffffff",borderRadius:"0px",overflow:"hidden",fontFamily:"'Inter', 'Noto Sans SC', sans-serif"},children:[e.jsxs("div",{className:"flex-1 flex flex-col justify-center px-16 py-12 relative z-10",children:[e.jsx("div",{className:"text-[13px] font-medium tracking-[0.16em] uppercase mb-4",style:{color:"#86868b"},children:"Code · 代码展示"}),e.jsx("h2",{className:"text-[48px] font-bold leading-[1.1] mb-8",style:{color:"#1d1d1f"},children:"多语言代码示例"}),e.jsx("div",{className:"flex gap-2 mb-4",children:Object.keys(l).map(t=>e.jsx("button",{onClick:()=>n(t),className:"px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",style:{background:s===t?"#0071e3":"#fafafa",color:s===t?"#ffffff":"#666666"},children:l[t].title},t))}),e.jsxs("div",{className:"p-6 rounded-xl",style:{background:"#1e1e1e",fontFamily:"'JetBrains Mono', monospace"},children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("div",{className:"w-3 h-3 rounded-full",style:{background:"#ff5f56"}}),e.jsx("div",{className:"w-3 h-3 rounded-full",style:{background:"#ffbd2e"}}),e.jsx("div",{className:"w-3 h-3 rounded-full",style:{background:"#27c93f"}}),e.jsx("span",{className:"ml-4 text-xs",style:{color:"#86868b"},children:l[s].lang})]}),e.jsx("pre",{className:"text-sm leading-relaxed",style:{color:"#d4d4d4"},children:e.jsx("code",{children:l[s].code})})]})]}),e.jsxs("div",{className:"flex items-center justify-between px-8 py-4 border-t border-slate-100",children:[e.jsx("span",{className:"text-xs",style:{color:"#999999"},children:"Code Layout"}),e.jsx("span",{className:"text-xs font-bold",style:{color:"#86868b"},children:"1/1"})]})]})})}export{c as default};
