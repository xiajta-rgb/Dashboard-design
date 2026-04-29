import { isColorDark } from '../utils/colorUtils'

export default function Section({ title, style, isDark, children }) {
  const c = style.colors
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'
  const textMuted = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-3 rounded-full" style={{ backgroundColor: c.highlight }} />
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: textMuted }}>{title}</h4>
      </div>
      <div className="p-3 rounded-xl border" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
        {children}
      </div>
    </div>
  )
}
