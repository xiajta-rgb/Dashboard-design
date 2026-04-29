import CopyStyleButton from './CopyStyleButton'

export default function StyleSpecsPanel({ style }) {
  return (
    <div className="p-5 space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: style.colors.highlight }} />
            <h3 className="text-base font-semibold text-white">{style.label}</h3>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">{style.descriptionZh}</p>
        </div>
        <CopyStyleButton style={style} />
      </div>

      <div className="space-y-2">
        <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">适用场景</h4>
        <div className="flex flex-wrap gap-1.5">
          {style.useCases.map((tag, i) => (
            <span key={i} className="text-[11px] text-neutral-300 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md">{tag}</span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">色彩系统</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Primary', color: style.colors.primary },
            { label: 'Secondary', color: style.colors.secondary },
            { label: 'Accent', color: style.colors.accent },
            { label: 'Highlight', color: style.colors.highlight },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="w-6 h-6 rounded-md border border-white/10 flex-shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
              <div className="min-w-0">
                <p className="text-[10px] text-neutral-400 leading-tight">{item.label}</p>
                <p className="text-[10px] text-neutral-500 font-mono leading-tight">{item.color}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">字体规范</h4>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.02]">
            <span className="text-[11px] text-neutral-400">主字体</span>
            <span className="text-[11px] text-white font-mono">{style.typography.primary}</span>
          </div>
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.02]">
            <span className="text-[11px] text-neutral-400">辅助字体</span>
            <span className="text-[11px] text-white font-mono">{style.typography.secondary}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">设计规范</h4>
        <div className="space-y-1">
          {[
            { label: '圆角', value: style.borderRadius },
            { label: '间距系统', value: style.spacing },
            { label: '边框', value: style.borderWidth },
            { label: '阴影', value: style.shadows },
            { label: '动效', value: style.animations },
            { label: '对比度', value: `WCAG ${style.contrast}` },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.02]">
              <span className="text-[11px] text-neutral-400">{item.label}</span>
              <span className="text-[11px] text-white font-mono">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">复杂度评估</h4>
        <div className="space-y-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-neutral-400">设计复杂度</span>
              <span className="text-[11px] text-neutral-500">{style.complexity}/5</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= style.complexity ? 'bg-violet-500' : 'bg-white/[0.06]'}`} />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-neutral-400">技术难度</span>
              <span className="text-[11px] text-neutral-500">{style.techDifficulty}/5</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= style.techDifficulty ? 'bg-cyan-500' : 'bg-white/[0.06]'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">业务落地参考</h4>
        <div className="space-y-1">
          {[
            { label: '暗色模式', value: style.darkMode },
            { label: '响应式', value: style.responsive },
            { label: '性能', value: style.performance },
            { label: '无障碍', value: style.accessibility },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.02]">
              <span className="text-[11px] text-neutral-400">{item.label}</span>
              <span className="text-[11px] text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">组件展示</h4>
        <div className="space-y-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <div>
            <p className="text-[10px] text-neutral-500 mb-1.5 uppercase tracking-wider">按钮</p>
            <div className="flex flex-wrap gap-1.5">
              <button className="px-3 py-1 rounded text-xs font-medium text-white cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: style.colors.highlight }}>
                Primary
              </button>
              <button className="px-3 py-1 rounded text-xs font-medium border cursor-pointer transition-transform active:scale-95" style={{ borderColor: style.colors.highlight, color: style.colors.highlight }}>
                Secondary
              </button>
              <button className="px-3 py-1 rounded text-xs font-medium cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: style.colors.accent, color: style.colors.primary }}>
                Tertiary
              </button>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-neutral-500 mb-1.5 uppercase tracking-wider">标签</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: style.colors.highlight + '20', color: style.colors.highlight }}>
                Success
              </span>
              <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: style.colors.accent + '20', color: style.colors.accent }}>
                Warning
              </span>
              <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: style.colors.secondary, color: style.colors.primary }}>
                Default
              </span>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-neutral-500 mb-1.5 uppercase tracking-wider">卡片</p>
            <div className="p-3 rounded border" style={{ backgroundColor: style.colors.secondary, borderColor: style.colors.accent + '40' }}>
              <p className="text-xs font-medium" style={{ color: style.colors.primary }}>Card Title</p>
              <p className="text-xs mt-0.5" style={{ color: style.colors.accent }}>Card description text</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-neutral-500 mb-1.5 uppercase tracking-wider">输入框</p>
            <div className="flex items-center px-3 py-1.5 rounded border text-xs" style={{ backgroundColor: style.colors.secondary, borderColor: style.colors.accent + '60', color: style.colors.primary }}>
              <span className="opacity-50">Placeholder...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
