import { useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Mountain,
  Brush,
  Droplets,
} from 'lucide-react'

const navLinks = ['雅韵', '作品', '匠心', '联系']

const works = [
  { title: '墨韵茶室', desc: '禅意空间设计，水墨留白，一茶一世界', year: '乙巳', color: 'bg-[#8b7355]/10' },
  { title: '青瓷工坊', desc: '传统青瓷工艺，当代审美重塑', year: '甲辰', color: 'bg-[#5a7a6a]/10' },
]

export default function OfficialNeoChinesePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="w-full min-h-screen bg-[#f5f0e8] text-[#3a3a3a] font-sans">
      <nav className="max-w-5xl mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-widest text-[#8b7355]">雅集</span>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link} href="#" className="text-sm text-[#8b7355]/50 hover:text-[#8b7355] transition-colors">{link}</a>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm text-[#8b7355]/50 hover:text-[#8b7355] transition-colors">茶道</a>
          <a href="#" className="px-5 py-2 bg-[#8b7355] text-[#f5f0e8] text-sm font-medium hover:bg-[#7a6345] transition-colors rounded-sm">
            预约品鉴
          </a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 cursor-pointer">
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#8b7355]" /> : <Menu className="w-5 h-5 text-[#8b7355]" />}
        </button>
      </nav>

      <section className="max-w-5xl mx-auto px-8 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-px h-8 bg-[#b5544a]/30" />
              <p className="text-sm text-[#8b7355]/50 tracking-widest">东方美学 · 当代演绎</p>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-[#3a3a3a]">
              以墨为骨<br />
              <span className="text-[#8b7355]/60">以韵为魂</span>
            </h1>
          </div>
          <div className="lg:col-span-5 pb-2">
            <p className="text-sm text-[#8b7355]/50 leading-[1.8] mb-6 max-w-sm">
              雅集，承袭东方美学精髓，以当代设计语言重新诠释传统意韵。水墨之间，见山见水见自己。
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-2 px-6 py-3 bg-[#8b7355] text-[#f5f0e8] text-sm font-medium hover:bg-[#7a6345] transition-colors rounded-sm">
                品鉴作品 <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="text-sm text-[#8b7355]/50 hover:text-[#8b7355] transition-colors flex items-center gap-1">
                了解更多 <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-[#ebe5d9]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-px h-6 bg-[#b5544a]/30" />
            <h2 className="text-xs font-semibold tracking-[0.2em] text-[#8b7355]/50 uppercase">精选作品</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {works.map((work, i) => (
              <a key={i} href="#" className="group">
                <div className={`${work.color} h-64 rounded-sm mb-4 flex items-center justify-center border border-[#8b7355]/10 group-hover:border-[#8b7355]/20 transition-colors`}>
                  <Mountain className="w-12 h-12 text-[#8b7355]/15" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#3a3a3a] mb-1 group-hover:text-[#8b7355] transition-colors">{work.title}</h3>
                    <p className="text-sm text-[#8b7355]/40 leading-relaxed">{work.desc}</p>
                  </div>
                  <span className="text-xs text-[#8b7355]/30 font-mono flex-shrink-0 ml-4">{work.year}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-px h-6 bg-[#b5544a]/30" />
                <h2 className="text-3xl font-bold tracking-tight text-[#3a3a3a]">匠心之道</h2>
              </div>
              <p className="text-sm text-[#8b7355]/50 leading-[1.8]">
                每一件作品，皆是对传统的致敬与超越。我们相信，真正的东方美学，不在形而在韵，不在繁而在简。
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-7">
              <p className="text-xs tracking-[0.2em] text-[#8b7355]/40 mb-4">服务</p>
              <div className="space-y-2.5">
                {['空间设计', '品牌塑造', '器物定制', '茶道体验', '书画装裱'].map(item => (
                  <p key={item} className="text-sm text-[#5a5a5a]">{item}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <p className="text-xs tracking-[0.2em] text-[#8b7355]/40 mb-4">理念</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Brush className="w-4 h-4 text-[#8b7355]/30" />
                  <span className="text-sm text-[#5a5a5a]">以简驭繁</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#8b7355]/30" />
                  <span className="text-sm text-[#5a5a5a]">以水为师</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-[#8b7355]/30" />
                  <span className="text-sm text-[#5a5a5a]">以山为骨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-[#3a3a3a] text-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-bold tracking-tight mb-4">以茶会友<br />以墨结缘</h2>
              <p className="text-sm text-[#f5f0e8]/40 leading-[1.8] max-w-sm">
                欢迎预约品鉴，在茶香墨韵中，感受东方美学的当代魅力。
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-8">
              <p className="text-xs tracking-[0.2em] text-[#f5f0e8]/30 mb-4">联系</p>
              <p className="text-sm text-[#f5f0e8]/60">hello@yaji.studio</p>
            </div>
            <div className="lg:col-span-2">
              <p className="text-xs tracking-[0.2em] text-[#f5f0e8]/30 mb-4">所在</p>
              <div className="space-y-1 text-sm text-[#f5f0e8]/40">
                <p>杭州</p>
                <p>京都</p>
                <p>首尔</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 px-8 border-t border-[#8b7355]/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold tracking-widest text-[#8b7355]/40">雅集</span>
          <span className="text-xs text-[#8b7355]/30">&copy; 2026 雅集工作室</span>
        </div>
      </footer>
    </div>
  )
}
