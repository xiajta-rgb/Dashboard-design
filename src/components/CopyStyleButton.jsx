import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button, IconButton } from './ui'
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

  if (size === 'sm') {
    return (
      <IconButton
        onClick={handleCopy}
        label={copied ? '已复制风格代码' : `复制 ${style.label} 风格代码`}
        variant={copied ? 'success' : 'secondary'}
        size="sm"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      </IconButton>
    )
  }

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? 'success' : 'secondary'}
      size={size}
      leftIcon={copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    >
      {copied ? '已复制' : '复制'}
    </Button>
  )
}
