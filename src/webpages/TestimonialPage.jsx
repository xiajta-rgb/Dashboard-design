import { useState } from 'react'
import { User, Star } from 'lucide-react'

export default function TestimonialPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: '张三',
      role: '产品经理 @ 某大厂',
      content: '这个产品彻底改变了我们的工作方式，效率提升了 300%！',
      rating: 5,
    },
    {
      name: '李四',
      role: '设计师 @ 创业公司',
      content: '界面设计非常精美，用户体验极佳，强烈推荐！',
      rating: 5,
    },
    {
      name: '王五',
      role: '开发者 @ 独立开发',
      content: 'API 设计合理，文档完善，集成起来非常轻松。',
      rating: 5,
    },
  ]

  return (
    <div className="w-full h-full overflow-auto" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1d1d1f' }}>用户评价</h1>
          <p className="text-xl" style={{ color: '#86868b' }}>听听他们怎么说</p>
        </div>
        <div className="relative">
          <div className="bg-white p-12 rounded-2xl text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-slate-100">
              <User size={48} className="text-slate-400" />
            </div>
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                <Star key={i} size={24} className="fill-current" style={{ color: '#ff9500' }} />
              ))}
            </div>
            <p className="text-xl leading-relaxed mb-8" style={{ color: '#1d1d1f' }}>
              "{testimonials[activeIndex].content}"
            </p>
            <div className="text-lg font-bold" style={{ color: '#1d1d1f' }}>{testimonials[activeIndex].name}</div>
            <div className="text-sm" style={{ color: '#86868b' }}>{testimonials[activeIndex].role}</div>
          </div>
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  background: i === activeIndex ? '#0071e3' : '#e5e5e7',
                  transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
