import { useState } from 'react'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [hoveredPlan, setHoveredPlan] = useState(null)

  const plans = [
    {
      name: '基础版',
      nameEn: 'Basic',
      price: isAnnual ? 29 : 39,
      features: ['5 个项目', '10GB 存储', '基础支持', 'API 访问'],
      color: '#86868b',
      popular: false,
    },
    {
      name: '专业版',
      nameEn: 'Pro',
      price: isAnnual ? 79 : 99,
      features: ['无限项目', '100GB 存储', '优先支持', 'API 访问', '团队协作', '数据分析'],
      color: '#0071e3',
      popular: true,
    },
    {
      name: '企业版',
      nameEn: 'Enterprise',
      price: isAnnual ? 199 : 249,
      features: ['无限一切', '1TB 存储', '专属支持', '高级 API', 'SSO 登录', '自定义集成', 'SLA 保障'],
      color: '#1d1d1f',
      popular: false,
    },
  ]

  return (
    <div className="w-full h-full overflow-auto" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1d1d1f' }}>选择适合你的方案</h1>
          <p className="text-xl" style={{ color: '#86868b' }}>灵活定价，按需选择</p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!isAnnual ? 'font-bold' : ''}`} style={{ color: !isAnnual ? '#1d1d1f' : '#86868b' }}>月付</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full relative transition-colors duration-300"
              style={{ background: isAnnual ? '#0071e3' : '#e5e5e7' }}
            >
              <div
                className="absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300"
                style={{ left: isAnnual ? '32px' : '4px' }}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'font-bold' : ''}`} style={{ color: isAnnual ? '#1d1d1f' : '#86868b' }}>
              年付 <span className="text-xs" style={{ color: '#34c759' }}>省 20%</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
              className="relative p-8 rounded-2xl transition-all duration-300"
              style={{
                background: '#ffffff',
                border: `2px solid ${plan.popular ? plan.color : hoveredPlan === i ? plan.color : '#e5e5e7'}`,
                transform: hoveredPlan === i || plan.popular ? 'translateY(-8px)' : 'none',
                boxShadow: hoveredPlan === i || plan.popular ? `0 16px 32px ${plan.color}20` : 'none',
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: plan.color }}>
                  最受欢迎
                </div>
              )}
              <h3 className="text-2xl font-bold mb-1" style={{ color: plan.color }}>{plan.name}</h3>
              <p className="text-sm mb-4" style={{ color: '#86868b' }}>{plan.nameEn}</p>
              <div className="mb-6">
                <span className="text-5xl font-bold" style={{ color: '#1d1d1f' }}>¥{plan.price}</span>
                <span className="text-sm" style={{ color: '#86868b' }}>/月</span>
              </div>
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${plan.color}15` }}>
                      <span className="text-xs" style={{ color: plan.color }}>✓</span>
                    </div>
                    <span className="text-sm" style={{ color: '#666666' }}>{feature}</span>
                  </div>
                ))}
              </div>
              <button
                className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: plan.popular ? plan.color : 'transparent',
                  color: plan.popular ? '#ffffff' : plan.color,
                  border: `2px solid ${plan.color}`,
                }}
              >
                立即开始
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
