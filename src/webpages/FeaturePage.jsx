import { useState } from 'react'
import { Zap, Shield, Palette, BarChart3, Plug, MessageCircle } from 'lucide-react'

export default function FeaturePage() {
  const [hoveredFeature, setHoveredFeature] = useState(null)

  const features = [
    { icon: Zap, title: '极速性能', desc: '毫秒级响应，流畅体验', color: '#ff9500' },
    { icon: Shield, title: '安全可靠', desc: '企业级安全防护', color: '#34c759' },
    { icon: Palette, title: '精美设计', desc: '现代化 UI 设计', color: '#0071e3' },
    { icon: BarChart3, title: '数据分析', desc: '深度洞察业务数据', color: '#af52de' },
    { icon: Plug, title: '无缝集成', desc: '支持多种第三方服务', color: '#ff3b30' },
    { icon: MessageCircle, title: '智能客服', desc: '7x24 小时在线支持', color: '#5ac8fa' },
  ]

  return (
    <div className="w-full h-full overflow-auto" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1d1d1f' }}>强大功能，简单使用</h1>
          <p className="text-xl" style={{ color: '#86868b' }}>六大核心功能，助力业务增长</p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="p-8 rounded-2xl transition-all duration-300"
              style={{
                background: '#ffffff',
                border: `2px solid ${hoveredFeature === i ? feature.color : '#e5e5e7'}`,
                transform: hoveredFeature === i ? 'translateY(-8px)' : 'none',
                boxShadow: hoveredFeature === i ? `0 16px 32px ${feature.color}20` : 'none',
              }}
            >
              <feature.icon size={64} className="mb-6" style={{ color: feature.color }} />
              <h3 className="text-2xl font-bold mb-3" style={{ color: feature.color }}>{feature.title}</h3>
              <p className="text-base" style={{ color: '#666666' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
