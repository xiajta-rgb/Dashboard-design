import {
  Github,
  Twitter,
  Mail,
  ExternalLink,
  ArrowUpRight,
  Camera,
  PenTool,
  Film,
  MapPin,
} from 'lucide-react'

const projects = [
  { title: 'Silent Horizons', category: 'Photography', desc: 'Landscape series exploring the boundary between earth and sky', tags: ['Canon R5', 'Lightroom', 'Print'], ratio: 'tall', color: 'bg-stone-100' },
  { title: 'Brand Identity — Kōen', category: 'Branding', desc: 'Complete visual identity for a Japanese-inspired tea brand', tags: ['Figma', 'Illustrator', 'Print'], ratio: 'wide', color: 'bg-stone-50' },
  { title: 'Urban Fragments', category: 'Photography', desc: 'Abstract architectural details from Tokyo and Seoul', tags: ['Street', 'Abstract', 'Film'], ratio: 'square', color: 'bg-stone-100' },
  { title: 'Motion Reel 2025', category: 'Motion', desc: 'Selected motion design and animation work', tags: ['After Effects', 'Cinema 4D', 'Lottie'], ratio: 'wide', color: 'bg-stone-50' },
  { title: 'Wabi-Sabi Objects', category: 'Product', desc: 'Ceramic and wood product photography with natural light', tags: ['Product', 'Natural Light', 'Styling'], ratio: 'tall', color: 'bg-stone-100' },
  { title: 'Editorial — Mono', category: 'Print', desc: 'Magazine layout design for a minimalist culture publication', tags: ['InDesign', 'Typography', 'Grid'], ratio: 'square', color: 'bg-stone-50' },
]

const skills = [
  { icon: Camera, label: 'Photography', items: ['Landscape', 'Product', 'Street'] },
  { icon: PenTool, label: 'Design', items: ['Branding', 'Editorial', 'Typography'] },
  { icon: Film, label: 'Motion', items: ['Animation', '3D', 'Video'] },
]

export default function PortfolioLightPage() {
  return (
    <div className="w-full min-h-screen bg-[#fafafa] text-neutral-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 backdrop-blur-xl border-b border-neutral-200/60">
        <div className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold tracking-tight">Yuki Tanaka</span>
            <span className="text-[10px] text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-full">Visual Artist</span>
          </div>
          <div className="flex items-center gap-6">
            {['Work', 'About', 'Contact'].map(item => (
              <a key={item} href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      <section className="pt-28 pb-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-3 h-3 text-neutral-400" />
              <span className="text-xs text-neutral-400">Tokyo, Japan</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 leading-[1.15]">
              Capturing stillness<br />in every frame
            </h1>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">
              Visual artist working across photography, design, and motion. Focused on minimalism, natural textures, and the beauty of restraint.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="px-5 py-2 rounded-lg bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors">
                View Work
              </a>
              <a href="#" className="px-5 py-2 rounded-lg border border-neutral-200 text-neutral-600 text-xs font-medium hover:bg-white transition-colors">
                <Mail className="w-3.5 h-3.5 inline mr-1.5" />Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {projects.map((project, i) => (
              <div
                key={i}
                className="group break-inside-avoid rounded-xl border border-neutral-200/80 bg-white overflow-hidden hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300 cursor-pointer"
              >
                <div className={`${project.color} ${project.ratio === 'tall' ? 'h-72' : project.ratio === 'wide' ? 'h-44' : 'h-56'} flex items-center justify-center`}>
                  <span className="text-[10px] text-neutral-300 uppercase tracking-widest font-medium">{project.category}</span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold">{project.title}</h3>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-600 transition-colors" />
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed mb-2.5">{project.desc}</p>
                  <div className="flex items-center gap-1">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] text-neutral-400 bg-neutral-50 border border-neutral-100 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold mb-6">Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {skills.map((skill, i) => {
              const Icon = skill.icon
              return (
                <div key={i} className="rounded-xl border border-neutral-200/80 bg-white p-5">
                  <Icon className="w-5 h-5 text-neutral-400 mb-3" />
                  <h3 className="text-sm font-semibold mb-2">{skill.label}</h3>
                  <div className="flex flex-wrap gap-1">
                    {skill.items.map(item => (
                      <span key={item} className="text-[10px] text-neutral-500 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl border border-neutral-200/80 bg-white p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold mb-1">Open for collaborations</h2>
              <p className="text-xs text-neutral-400">Available for editorial, branding, and exhibition projects.</p>
            </div>
            <div className="flex items-center gap-2">
              <a href="#" className="px-5 py-2 rounded-lg bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors">
                <Mail className="w-3.5 h-3.5 inline mr-1.5" />hello@yukitanaka.jp
              </a>
              <a href="#" className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200/60 py-6 px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-[10px] text-neutral-400">&copy; 2026 Yuki Tanaka</span>
          <span className="text-[10px] text-neutral-400">Less is more</span>
        </div>
      </footer>
    </div>
  )
}
