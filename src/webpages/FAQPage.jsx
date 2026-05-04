import { useState } from 'react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: '这个产品适合我吗？',
      a: '无论你是个人用户还是企业团队，我们都有适合你的方案。基础版适合个人用户，专业版适合小团队，企业版适合大型组织。',
    },
    {
      q: '如何开始使用？',
      a: '只需三步：注册账号 → 选择方案 → 开始使用。整个过程不超过 5 分钟，无需信用卡。',
    },
    {
      q: '数据安全吗？',
      a: '我们采用企业级加密技术，所有数据传输和存储都经过加密处理。同时，我们通过了 ISO 27001 认证。',
    },
    {
      q: '支持退款吗？',
      a: '支持。我们提供 30 天无理由退款保证，如果你不满意，可以随时申请全额退款。',
    },
    {
      q: '有免费试用吗？',
      a: '有的。所有新用户都可以享受 14 天免费试用，无需绑定支付方式。',
    },
  ]

  return (
    <div className="w-full h-full overflow-auto" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1d1d1f' }}>常见问题</h1>
          <p className="text-xl" style={{ color: '#86868b' }}>你可能想知道的</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: openIndex === i ? '#ffffff' : '#ffffff',
                border: `2px solid ${openIndex === i ? '#0071e3' : '#e5e5e7'}`,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-bold" style={{ color: '#1d1d1f' }}>{faq.q}</span>
                <span
                  className="text-2xl font-bold transition-transform duration-300"
                  style={{
                    color: openIndex === i ? '#0071e3' : '#86868b',
                    transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  }}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-base leading-relaxed" style={{ color: '#666666' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
