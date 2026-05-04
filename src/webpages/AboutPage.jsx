import { useState } from 'react'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story')

  const tabs = [
    { id: 'story', label: '我们的故事' },
    { id: 'mission', label: '使命愿景' },
    { id: 'team', label: '团队介绍' },
  ]

  return (
    <div className="w-full h-full overflow-auto" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1d1d1f' }}>关于我们</h1>
          <p className="text-xl" style={{ color: '#86868b' }}>用技术改变世界</p>
        </div>
        <div className="flex justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === tab.id ? '#0071e3' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#666666',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-white p-12 rounded-2xl">
          {activeTab === 'story' && (
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#1d1d1f' }}>我们的故事</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#666666' }}>
                2020 年，一群热爱技术的年轻人聚在一起，梦想着用技术改变世界。我们从一个小团队开始，如今已经发展成为拥有数百名员工的科技公司。
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                我们相信，好的技术应该让每个人都能受益。因此，我们致力于打造简单易用、功能强大的产品，帮助更多人实现他们的目标。
              </p>
            </div>
          )}
          {activeTab === 'mission' && (
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#1d1d1f' }}>使命愿景</h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl" style={{ background: '#fafafa' }}>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#0071e3' }}>使命</h3>
                  <p className="text-base" style={{ color: '#666666' }}>用技术创新推动社会进步</p>
                </div>
                <div className="p-6 rounded-xl" style={{ background: '#fafafa' }}>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#34c759' }}>愿景</h3>
                  <p className="text-base" style={{ color: '#666666' }}>成为全球领先的科技服务提供商</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'team' && (
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#1d1d1f' }}>团队介绍</h2>
              <p className="text-base leading-relaxed" style={{ color: '#666666' }}>
                我们的团队由来自全球各地的优秀人才组成，包括工程师、设计师、产品经理等。我们多元、包容、创新，共同为实现使命而努力。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
