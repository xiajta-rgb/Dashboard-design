import {
  Github,
  Twitter,
  Mail,
  ArrowUpRight,
  MapPin,
  Figma,
  Code2,
  Camera,
  Music,
  PenTool,
  Sparkles,
} from 'lucide-react'

const bentoItems = [
  { title: 'About', span: 'col-span-2 row-span-2', content: 'about' },
  { title: 'Projects', span: 'col-span-2 row-span-3', content: 'projects' },
  { title: 'Skills', span: 'col-span-1 row-span-2', content: 'skills' },
  { title: 'Location', span: 'col-span-1 row-span-1', content: 'location' },
  { title: 'Contact', span: 'col-span-1 row-span-1', content: 'contact' },
  { title: 'Tools', span: 'col-span-1 row-span-1', content: 'tools' },
]

const projects = [
  { name: 'Horizon Dashboard', tag: 'Web App', color: 'bg-gradient-to-br from-blue-500 to-violet-500' },
  { name: 'Prism Design System', tag: 'Design', color: 'bg-gradient-to-br from-orange-400 to-pink-500' },
  { name: 'Echo Mobile', tag: 'Mobile', color: 'bg-gradient-to-br from-emerald-400 to-cyan-500' },
  { name: 'Nova Editor', tag: 'Dev Tool', color: 'bg-gradient-to-br from-amber-400 to-red-500' },
]

const skills = [
  { icon: Code2, label: 'Frontend' },
  { icon: PenTool, label: 'Design' },
  { icon: Camera, label: 'Photo' },
  { icon: Music, label: 'Audio' },
]

const tools = ['Figma', 'React', 'TS', 'Swift']

export default function PortfolioBentoPage() {
  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] text-neutral-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f7]/80 backdrop-blur-2xl border-b border-neutral-200/50">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight">Noa Kim</span>
          <div className="flex items-center gap-5">
            {['Work', 'About', 'Contact'].map(item => (
              <a key={item} href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      <section className="pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 auto-rows-[100px]">
            <div className="col-span-2 row-span-2 rounded-2xl bg-white border border-neutral-200/60 p-5 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">About</p>
                <h2 className="text-2xl font-bold tracking-tight leading-tight mb-2">
                  Design Engineer<br />based in Seoul
                </h2>
                <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
                  Crafting interfaces where design meets engineering. Specializing in design systems, interactive experiences, and creative development.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-600 font-medium">Available for work</span>
              </div>
            </div>

            <div className="col-span-1 row-span-2 rounded-2xl bg-neutral-900 text-white p-4 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-3">Skills</p>
                <div className="space-y-2.5">
                  {skills.map(skill => {
                    const Icon = skill.icon
                    return (
                      <div key={skill.label} className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-xs font-medium text-neutral-300">{skill.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                {tools.map(tool => (
                  <span key={tool} className="text-[9px] text-neutral-400 bg-white/[0.06] px-1.5 py-0.5 rounded-md">{tool}</span>
                ))}
              </div>
            </div>

            <div className="col-span-1 row-span-1 rounded-2xl bg-white border border-neutral-200/60 p-4 flex items-center gap-3 shadow-sm">
              <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold">Seoul, KR</p>
                <p className="text-[10px] text-neutral-400">KST +9</p>
              </div>
            </div>

            <div className="col-span-1 row-span-1 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Contact</p>
                <p className="text-[10px] text-white/60">Let's talk</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/60" />
            </div>

            <div className="col-span-2 row-span-3 rounded-2xl bg-white border border-neutral-200/60 p-5 shadow-sm overflow-hidden">
              <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-3">Projects</p>
              <div className="grid grid-cols-2 gap-2.5">
                {projects.map((project, i) => (
                  <div key={i} className="group rounded-xl overflow-hidden border border-neutral-100 hover:border-neutral-200 transition-colors cursor-pointer">
                    <div className={`${project.color} h-20 opacity-80 group-hover:opacity-100 transition-opacity`} />
                    <div className="p-2.5">
                      <p className="text-[11px] font-semibold leading-tight">{project.name}</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5">{project.tag}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-1 row-span-1 rounded-2xl bg-amber-50 border border-amber-200/40 p-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <div>
                <p className="text-xs font-semibold">4+ Years</p>
                <p className="text-[10px] text-amber-600/60">Experience</p>
              </div>
            </div>

            <div className="col-span-1 row-span-1 rounded-2xl bg-white border border-neutral-200/60 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-neutral-400" />
                <span className="text-xs font-medium">@noakim</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300" />
            </div>

            <div className="col-span-1 row-span-1 rounded-2xl bg-white border border-neutral-200/60 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-neutral-400" />
                <span className="text-xs font-medium">@noakim</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300" />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl bg-neutral-900 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold mb-1">Let's work together</h2>
              <p className="text-xs text-neutral-400">Open for freelance, contract, and full-time opportunities.</p>
            </div>
            <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-900 text-xs font-semibold hover:bg-neutral-100 transition-colors flex-shrink-0">
              <Mail className="w-3.5 h-3.5" /> hello@noakim.dev
            </a>
          </div>
        </div>
      </section>

      <footer className="py-6 px-6 border-t border-neutral-200/50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-[10px] text-neutral-400">&copy; 2026 Noa Kim</span>
          <span className="text-[10px] text-neutral-400">Designed with care</span>
        </div>
      </footer>
    </div>
  )
}
