import { useState } from 'react'

export default function BlogPage() {
  const [hoveredPost, setHoveredPost] = useState(null)

  const posts = [
    { title: '如何提升产品性能', category: '技术', date: '2026-05-01', readTime: '5 分钟', color: '#0071e3' },
    { title: '设计系统的最佳实践', category: '设计', date: '2026-04-28', readTime: '8 分钟', color: '#34c759' },
    { title: '团队协作工具推荐', category: '效率', date: '2026-04-25', readTime: '6 分钟', color: '#ff9500' },
    { title: '用户增长策略分享', category: '运营', date: '2026-04-20', readTime: '7 分钟', color: '#af52de' },
    { title: '2026 技术趋势预测', category: '趋势', date: '2026-04-15', readTime: '10 分钟', color: '#ff3b30' },
    { title: '如何写好产品文档', category: '文档', date: '2026-04-10', readTime: '4 分钟', color: '#5ac8fa' },
  ]

  return (
    <div className="w-full h-full overflow-auto" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1d1d1f' }}>博客</h1>
          <p className="text-xl" style={{ color: '#86868b' }}>分享我们的思考与实践</p>
        </div>
        <div className="space-y-6">
          {posts.map((post, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredPost(i)}
              onMouseLeave={() => setHoveredPost(null)}
              className="p-6 rounded-2xl transition-all duration-300 cursor-pointer"
              style={{
                background: '#ffffff',
                border: `2px solid ${hoveredPost === i ? post.color : '#e5e5e7'}`,
                transform: hoveredPost === i ? 'translateX(8px)' : 'none',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${post.color}15`, color: post.color }}>
                  {post.category}
                </span>
                <span className="text-xs" style={{ color: '#86868b' }}>{post.date}</span>
                <span className="text-xs" style={{ color: '#86868b' }}>· {post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#1d1d1f' }}>{post.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
