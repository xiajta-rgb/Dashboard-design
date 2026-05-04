import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="w-full h-full overflow-auto" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1d1d1f' }}>联系我们</h1>
          <p className="text-xl" style={{ color: '#86868b' }}>我们期待你的来信</p>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1d1d1f' }}>联系方式</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#0071e3' }}>
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm" style={{ color: '#86868b' }}>邮箱</div>
                  <div className="font-medium" style={{ color: '#1d1d1f' }}>hello@example.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#34c759' }}>
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm" style={{ color: '#86868b' }}>电话</div>
                  <div className="font-medium" style={{ color: '#1d1d1f' }}>+86 123 4567 8900</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#ff9500' }}>
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm" style={{ color: '#86868b' }}>地址</div>
                  <div className="font-medium" style={{ color: '#1d1d1f' }}>北京市朝阳区科技园</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {submitted ? (
              <div className="bg-white p-8 rounded-2xl text-center">
                <CheckCircle size={64} className="mx-auto mb-4" style={{ color: '#34c759' }} />
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#34c759' }}>发送成功！</h3>
                <p style={{ color: '#86868b' }}>我们会尽快回复你</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>姓名</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: '#e5e5e7' }}
                    placeholder="请输入姓名"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>邮箱</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: '#e5e5e7' }}
                    placeholder="请输入邮箱"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>留言</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: '#e5e5e7' }}
                    rows={4}
                    placeholder="请输入留言"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-bold"
                  style={{ background: '#0071e3' }}
                >
                  发送消息
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
