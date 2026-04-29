import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { copyToClipboard } from '../utils/colorUtils'
import { generateStylePrompt } from '../utils/styleGenerator'
import { styleKeywords } from '../data/categoryData'

export default function CopyStyleButton({ style, size = 'sm' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback((e) => {
    e.stopPropagation()
    const text = generateStylePrompt(style, styleKeywords)
    copyToClipboard(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [style])

  const isSm = size === 'sm'

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? '已复制风格代码' : `复制 ${style.label} 风格代码`}
      className={`flex items-center gap-1 rounded-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 flex-shrink-0 ${
        copied
          ? isSm
            ? 'bg-emerald-500/20 text-emerald-400 px-2 py-1 text-xs'
            : 'bg-emerald-500/20 text-emerald-400 px-3 py-1.5 text-xs'
          : isSm
            ? 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 px-2 py-1 text-xs border border-white/10 hover:border-white/20'
            : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 px-3 py-1.5 text-xs border border-white/10 hover:border-white/20'
      }`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? '已复制' : '复制'}
    </button>
  )
}
