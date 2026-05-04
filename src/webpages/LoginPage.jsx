import { useState } from 'react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#1d1d1f' }}>
              {isLogin ? '欢迎回来' : '创建账号'}
            </h1>
            <p style={{ color: '#86868b' }}>
              {isLogin ? '登录以继续使用' : '注册开始使用'}
            </p>
          </div>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>姓名</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2"
                  style={{ borderColor: '#e5e5e7' }}
                  placeholder="请输入姓名"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>邮箱</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2"
                style={{ borderColor: '#e5e5e7' }}
                placeholder="请输入邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1d1d1f' }}>密码</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2"
                style={{ borderColor: '#e5e5e7' }}
                placeholder="请输入密码"
              />
            </div>
            <button
              className="w-full py-3 rounded-xl text-white font-bold"
              style={{ background: '#0071e3' }}
            >
              {isLogin ? '登录' : '注册'}
            </button>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
              style={{ color: '#0071e3' }}
            >
              {isLogin ? '没有账号？注册' : '已有账号？登录'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
