import { useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Play,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'

const navLinks = ['About', 'Works', 'Journal', 'Contact']

const works = [
  { title: '無印良品 — Spatial Design', category: 'Brand Space', year: '2025' },
  { title: '京都国立博物館 — Digital Archive', category: 'Cultural', year: '2024' },
  { title: '蔦屋書店 — Wayfinding System', category: 'Signage', year: '2024' },
  { title: '資生堂 — Package Redesign', category: 'Packaging', year: '2023' },
]

const values = [
  { title: '間 — Ma', desc: 'The beauty of negative space. We design with silence, not just sound.' },
  { title: '侘 — Wabi', desc: 'Finding elegance in imperfection. Authenticity over artifice.' },
  { title: '寂 — Sabi', desc: 'The grace of time passing. Design that ages with dignity.' },
]

export default function OfficialMinimalPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="w-full min-h-screen bg-[#faf8f5] text-[#2c2420] font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/90 backdrop-blur-xl border-b border-[#8b7355]/10">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-base font-semibold tracking-widest">墨 — SUMI</span>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <a key={link} href="#" className="text-xs text-[#8b7355] hover:text-[#2c2420] transition-colors tracking-wider">{link}</a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-xs text-[#8b7355] hover:text-[#2c2420] transition-colors tracking-wider">日本語</a>
            <a href="#" className="px-5 py-2 border border-[#2c2420] text-[#2c2420] text-xs font-medium hover:bg-[#2c2420] hover:text-[#faf8f5] transition-colors tracking-wider">
              Contact
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 cursor-pointer">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-xs text-[#8b7355] tracking-widest mb-8 uppercase">Design Studio — Tokyo</p>
            <h1 className="text-5xl sm:text-6xl font-light tracking-tight mb-8 leading-[1.2]">
              Where restraint<br />
              becomes <span className="text-[#b5544a]">expression</span>
            </h1>
            <p className="text-base text-[#8b7355] leading-relaxed mb-10 max-w-lg">
              We are a design studio rooted in Japanese aesthetics. We believe the most powerful design speaks softly — through space, texture, and intention.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="px-6 py-3 bg-[#2c2420] text-[#faf8f5] text-xs font-medium tracking-wider hover:bg-[#3d3530] transition-colors">
                View Our Work
              </a>
              <a href="#" className="flex items-center gap-2 text-xs text-[#8b7355] hover:text-[#2c2420] transition-colors tracking-wider">
                <Play className="w-3.5 h-3.5" /> Studio Film
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 border-t border-[#8b7355]/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-[#8b7355] tracking-widest mb-10 uppercase">Selected Works</p>
          <div className="space-y-0">
            {works.map((work, i) => (
              <a
                key={i}
                href="#"
                className="group flex items-center justify-between py-6 border-b border-[#8b7355]/10 hover:pl-4 transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs text-[#8b7355]/40 font-mono w-8">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-base font-medium group-hover:text-[#b5544a] transition-colors">{work.title}</h3>
                    <p className="text-xs text-[#8b7355]/60 mt-0.5">{work.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#8b7355]/40 font-mono">{work.year}</span>
                  <ArrowRight className="w-4 h-4 text-[#8b7355]/20 group-hover:text-[#b5544a] group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-[#8b7355] tracking-widest mb-10 uppercase">Our Philosophy</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, i) => (
              <div key={i}>
                <h3 className="text-lg font-light mb-3 tracking-tight">{value.title}</h3>
                <p className="text-sm text-[#8b7355] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8 border-t border-[#8b7355]/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-xs text-[#8b7355] tracking-widest mb-6 uppercase">Studio</p>
              <p className="text-sm text-[#8b7355] leading-relaxed mb-6">
                Founded in 2018, Sumi is a collective of designers, architects, and craftspeople.
                We work across brand identity, spatial design, and digital experiences — always guided
                by the principles of restraint and intentionality.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-2xl font-light">28</p>
                  <p className="text-[10px] text-[#8b7355]/60 uppercase tracking-wider mt-1">Team</p>
                </div>
                <div>
                  <p className="text-2xl font-light">120+</p>
                  <p className="text-[10px] text-[#8b7355]/60 uppercase tracking-wider mt-1">Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-light">8</p>
                  <p className="text-[10px] text-[#8b7355]/60 uppercase tracking-wider mt-1">Years</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#8b7355] tracking-widest mb-6 uppercase">Contact</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#8b7355]">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>3-5-12 Minami-Aoyama, Minato-ku, Tokyo</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#8b7355]">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+81 3-5555-0123</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#8b7355]">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>hello@sumi.studio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-8 border-t border-[#8b7355]/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-[10px] text-[#8b7355]/40 tracking-widest">© 2026 墨 SUMI</span>
          <span className="text-[10px] text-[#8b7355]/40 tracking-widest">静 — TRANQUILITY</span>
        </div>
      </footer>
    </div>
  )
}
