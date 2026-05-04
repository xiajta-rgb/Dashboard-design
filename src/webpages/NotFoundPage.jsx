import { useState } from 'react'

export default function NotFoundPage() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="text-center">
        <div className="text-[120px] font-bold leading-none mb-4" style={{ color: '#e5e5e7' }}>404</div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#1d1d1f' }}>页面未找到</h1>
        <p className="text-xl mb-8" style={{ color: '#86868b' }}>抱歉，你访问的页面不存在</p>
        <button
          className="px-8 py-4 rounded-xl text-white font-bold text-lg"
          style={{ background: '#0071e3' }}
        >
          返回首页
        </button>
      </div>
    </div>
  )
}
