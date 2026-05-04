import { useState } from 'react'

export default function PptCodePage() {
  const [activeTab, setActiveTab] = useState('react')

  const codeExamples = {
    react: {
      title: 'React 组件',
      code: `import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      点击次数：{count}
    </button>
  )
}`,
      lang: 'jsx'
    },
    vue: {
      title: 'Vue 组件',
      code: `<template>
  <button @click="count++">
    点击次数：{{ count }}
  </button>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>`,
      lang: 'vue'
    },
    python: {
      title: 'Python 函数',
      code: `def fibonacci(n: int) -> list[int]:
    """生成斐波那契数列"""
    if n <= 0:
        return []
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]`,
      lang: 'python'
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Code · 代码展示</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-8" style={{ color: '#1d1d1f' }}>多语言代码示例</h2>
          <div className="flex gap-2 mb-4">
            {Object.keys(codeExamples).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: activeTab === key ? '#0071e3' : '#fafafa',
                  color: activeTab === key ? '#ffffff' : '#666666',
                }}
              >
                {codeExamples[key].title}
              </button>
            ))}
          </div>
          <div className="p-6 rounded-xl" style={{ background: '#1e1e1e', fontFamily: "'JetBrains Mono', monospace" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
              <span className="ml-4 text-xs" style={{ color: '#86868b' }}>{codeExamples[activeTab].lang}</span>
            </div>
            <pre className="text-sm leading-relaxed" style={{ color: '#d4d4d4' }}>
              <code>{codeExamples[activeTab].code}</code>
            </pre>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Code Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
