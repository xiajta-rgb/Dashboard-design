import {
  ArrowRight,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'

const navLinks = ['Work', 'About', 'Journal', 'Contact']

const works = [
  { title: 'Void', tag: 'Identity', year: '2026' },
  { title: 'Silence', tag: 'Digital', year: '2025' },
  { title: 'Absence', tag: 'Spatial', year: '2025' },
  { title: 'Stillness', tag: 'Brand', year: '2024' },
]

export default function OfficialBoundlessPage() {
  return (
    <div className="w-full min-h-screen bg-white text-[#000000] font-sans">
      <nav className="max-w-7xl mx-auto px-12 h-24 flex items-center justify-between">
        <span className="text-lg font-medium tracking-tight">Null Studio</span>
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a key={link} href="#" className="text-sm text-[#999] hover:text-[#000] transition-colors">{link}</a>
          ))}
        </div>
        <button className="md:hidden p-2 cursor-pointer">
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      <section className="max-w-7xl mx-auto px-12 pt-24 pb-32">
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9] mb-12">
          Less is<br />
          <span className="text-[#ccc]">everything</span>
        </h1>
        <div className="flex items-start justify-between">
          <p className="text-base text-[#999] max-w-md leading-relaxed">
            We design brands and digital experiences through the discipline of reduction. Every element earns its place. Nothing more.
          </p>
          <a href="#" className="flex items-center gap-2 text-sm text-[#000] hover:gap-3 transition-all">
            View Work <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {works.map((work, i) => (
            <a key={i} href="#" className="group">
              <div className="bg-[#f5f5f5] h-80 mb-6 flex items-center justify-center group-hover:bg-[#f0f0f0] transition-colors">
                <div className="text-center">
                  <p className="text-3xl font-medium text-[#e0e0e0] group-hover:text-[#d0d0d0] transition-colors">{work.title}</p>
                  <p className="text-xs text-[#ccc] mt-2 uppercase tracking-widest">{work.tag}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium group-hover:text-[#666] transition-colors">{work.title}</h3>
                <span className="text-xs text-[#ccc]">{work.year}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-medium tracking-tight leading-tight mb-4">
              Design through<br />
              <span className="text-[#ccc]">subtraction</span>
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-6">
            <p className="text-sm text-[#999] leading-relaxed">
              Our process begins with removal. We strip away convention, decoration, and assumption until only the essential remains. What's left is clarity.
            </p>
          </div>
          <div className="lg:col-span-3">
            <p className="text-xs text-[#ccc] uppercase tracking-wider mb-4">Services</p>
            <div className="space-y-2">
              {['Brand Identity', 'Digital Experience', 'Art Direction', 'Spatial Design'].map(item => (
                <p key={item} className="text-sm text-[#666]">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-12 pb-32">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs text-[#ccc] uppercase tracking-wider">Journal</p>
          <a href="#" className="text-xs text-[#999] hover:text-[#000] transition-colors flex items-center gap-1">
            All Entries <ChevronRight className="w-3 h-3" />
          </a>
        </div>
        <div className="space-y-0">
          {[
            { title: 'On Nothingness', date: 'Mar 2026' },
            { title: 'The Weight of White', date: 'Feb 2026' },
            { title: 'Absence as Presence', date: 'Jan 2026' },
          ].map((entry, i) => (
            <a key={i} href="#" className="group flex items-center justify-between py-6 hover:pl-4 transition-all">
              <h3 className="text-base font-medium group-hover:text-[#999] transition-colors">{entry.title}</h3>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#ccc]">{entry.date}</span>
                <ArrowRight className="w-4 h-4 text-[#e0e0e0] group-hover:text-[#999] group-hover:translate-x-1 transition-all" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="py-24 px-12 bg-[#000] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-6">
              <h2 className="text-4xl font-medium tracking-tight leading-tight">
                Start with<br />nothing
              </h2>
            </div>
            <div className="lg:col-span-3 lg:col-start-8">
              <p className="text-sm text-[#666] leading-relaxed mb-6">hello@null.studio</p>
              <a href="#" className="flex items-center gap-2 text-sm text-white hover:gap-3 transition-all">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-sm font-medium text-[#ccc]">Null Studio</span>
          <span className="text-xs text-[#ccc]">&copy; 2026</span>
        </div>
      </footer>
    </div>
  )
}
