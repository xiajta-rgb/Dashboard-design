import { useState } from 'react'
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Flame,
  Dragon,
  Fan,
  Cloud,
  Landmark,
} from 'lucide-react'

const navLinks = ['国潮', '文创', '匠造', '联系']

const works = [
  { title: '龙腾四海', tag: '品牌视觉', year: '乙巳', desc: '龙纹图腾融入当代品牌设计，传统纹样焕新表达' },
  { title: '锦绣山河', tag: '文创产品', year: '甲辰', desc: '山水纹样与潮流元素碰撞，国潮文创系列' },
]

const features = [
  { icon: Flame, title: '烈焰创意', desc: '将千年文化基因注入当代设计，让传统在烈焰中重生' },
  { icon: Cloud, title: '祥云纹样', desc: '提取祥云、窗棂、回纹等经典元素，赋予现代语境' },
  { icon: Landmark, title: '大国匠造', desc: '非遗工艺与数字设计融合，每一件都是文化传承' },
]

export default function OfficialGuochaoPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="w-full min-h-screen bg-[#1a0a0a] text-[#ffd700] font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 15L45 15L37 22L40 32L30 26L20 32L23 22L15 15L25 15Z' fill='%23ffd700' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#c41e3a]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#ffd700]/5 rounded-full blur-[120px] pointer-events-none" />

      <nav className="relative z-10 max-w-5xl mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#c41e3a] flex items-center justify-center bg-[#c41e3a]/10">
            <Flame className="w-5 h-5 text-[#c41e3a]" />
          </div>
          <span className="text-xl font-bold tracking-widest text-[#ffd700]">华潮</span>
          <span className="text-[9px] text-[#c41e3a]/40 tracking-wider">HUACHAO STUDIO</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link} href="#" className="text-sm text-[#ffd700]/40 hover:text-[#ffd700] transition-colors">{link}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm text-[#ffd700]/40 hover:text-[#ffd700] transition-colors">合作</a>
          <a href="#" className="px-5 py-2 bg-[#c41e3a] text-[#ffd700] text-sm font-bold hover:bg-[#d42e4a] transition-colors border-2 border-[#c41e3a]">
            定制咨询
          </a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 cursor-pointer">
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#ffd700]/60" /> : <Menu className="w-5 h-5 text-[#ffd700]/60" />}
        </button>
      </nav>

      <section className="relative z-10 max-w-5xl mx-auto px-8 pt-16 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-[#c41e3a]" />
              <p className="text-xs text-[#c41e3a]/60 tracking-[0.2em]">东方潮 · 世界风</p>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-4"
              style={{ textShadow: '0 0 30px rgba(255,215,0,0.1)' }}>
              国潮当道<br />
              <span className="text-[#c41e3a]">龙行天下</span>
            </h1>
          </div>
          <div className="lg:col-span-5 pb-2">
            <p className="text-sm text-[#ffd700]/30 leading-[1.8] mb-6 max-w-sm">
              华潮工作室，将中华五千年文化基因注入当代设计。龙纹、祥云、回纹、窗棂——传统纹样在数字时代焕发新生。
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-2 px-6 py-3 bg-[#c41e3a] text-[#ffd700] text-sm font-bold hover:bg-[#d42e4a] transition-colors border-2 border-[#c41e3a]">
                品鉴作品 <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="text-sm text-[#ffd700]/40 hover:text-[#ffd700] transition-colors flex items-center gap-1">
                了解更多 <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-8 bg-[#2a1010]/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-0.5 bg-[#c41e3a]" />
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#c41e3a]/60">精选作品</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {works.map((work, i) => (
              <a key={i} href="#" className="group">
                <div className="h-56 mb-4 flex items-center justify-center border-2 border-[#ffd700]/10 group-hover:border-[#ffd700]/20 transition-colors bg-[#2a1010] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a]/5 to-[#ffd700]/5" />
                  <div className="relative text-center">
                    <span className="text-4xl opacity-20 group-hover:opacity-30 transition-opacity">{['🐉', '🏔️'][i]}</span>
                    <p className="text-[9px] text-[#ffd700]/20 uppercase tracking-widest mt-2">{work.tag}</p>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#ffd700]/80 group-hover:text-[#ffd700] transition-colors">{work.title}</h3>
                    <p className="text-xs text-[#ffd700]/25 leading-relaxed mt-1">{work.desc}</p>
                  </div>
                  <span className="text-xs text-[#c41e3a]/30 font-mono flex-shrink-0 ml-4">{work.year}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-0.5 bg-[#c41e3a]" />
                <h2 className="text-2xl font-bold text-[#ffd700]/80">匠心之道</h2>
              </div>
              <p className="text-sm text-[#ffd700]/25 leading-[1.8]">
                每一件作品都是对传统的致敬与超越。我们相信，真正的国潮不是简单的纹样堆砌，而是文化基因的当代表达。
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-7">
              {features.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <div key={i} className="mb-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-4 h-4 text-[#c41e3a]/50" />
                      <h3 className="text-sm font-bold text-[#ffd700]/60">{feat.title}</h3>
                    </div>
                    <p className="text-xs text-[#ffd700]/20 leading-relaxed pl-6">{feat.desc}</p>
                  </div>
                )
              })}
            </div>
            <div className="lg:col-span-3">
              <p className="text-xs tracking-[0.2em] text-[#c41e3a]/30 mb-4">服务</p>
              <div className="space-y-2">
                {['品牌视觉', '文创设计', '包装设计', '空间美学', 'IP形象'].map(item => (
                  <p key={item} className="text-sm text-[#ffd700]/30">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-12 px-8 bg-[#c41e3a]/10 border-t-2 border-[#c41e3a]/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3 text-[#ffd700]/80">以潮载道 · 以创传承</h2>
          <p className="text-xs text-[#ffd700]/25 mb-5 max-w-md mx-auto">让世界看见东方之美，让传统在潮流中永生</p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-[#c41e3a] text-[#ffd700] text-sm font-bold hover:bg-[#d42e4a] transition-colors border-2 border-[#c41e3a]">
            合作咨询 <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <footer className="relative z-10 py-6 px-8 border-t border-[#ffd700]/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold tracking-widest text-[#ffd700]/20">华潮</span>
          <span className="text-xs text-[#ffd700]/10">&copy; 2026 华潮工作室</span>
        </div>
      </footer>
    </div>
  )
}
