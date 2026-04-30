import {
  Github,
  Twitter,
  Mail,
  ExternalLink,
  Layers,
  Code2,
  Palette,
  Camera,
} from 'lucide-react'

const projects = [
  { name: 'Nebula Dashboard', tag: 'Web App', color: 'from-violet-500/30 to-indigo-500/30' },
  { name: 'Prism Design', tag: 'Design System', color: 'from-cyan-500/30 to-blue-500/30' },
  { name: 'Echo Mobile', tag: 'Mobile', color: 'from-emerald-500/30 to-teal-500/30' },
  { name: 'Aurora Editor', tag: 'Dev Tool', color: 'from-amber-500/30 to-orange-500/30' },
]

const skills = [
  { icon: Code2, label: 'Frontend Dev', level: '95%' },
  { icon: Palette, label: 'UI Design', level: '90%' },
  { icon: Camera, label: 'Photography', level: '80%' },
  { icon: Layers, label: 'Design Systems', level: '92%' },
]

export default function PortfolioGlassPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-sans relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-violet-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <nav className="relative z-10 max-w-5xl mx-auto px-6 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
              <span className="text-sm font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">AK</span>
            </div>
            <span className="font-semibold text-sm">Alex Kim</span>
          </div>
          <div className="flex items-center gap-4">
            {['Work', 'About', 'Contact'].map(item => (
              <a key={item} href="#" className="text-xs text-white/60 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 text-xs text-white/70 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for projects
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              Design Engineer<br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">& Creative Developer</span>
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-lg mb-8">
              Building interfaces at the intersection of design and engineering. Specializing in design systems, interactive experiences, and creative development.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-sm font-medium hover:bg-white/20 transition-colors">
                View Projects
              </a>
              <a href="#" className="px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-colors">
                Get in Touch
              </a>
            </div>
          </div>

          <div className="w-full lg:w-80 rounded-2xl bg-white/[0.07] backdrop-blur-2xl border border-white/15 p-6 shadow-2xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/40 to-cyan-500/40 backdrop-blur-xl border border-white/20 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold">AK</span>
            </div>
            <h2 className="text-center text-lg font-semibold mb-1">Alex Kim</h2>
            <p className="text-center text-xs text-white/40 mb-5">San Francisco, CA</p>
            <div className="space-y-3">
              {skills.map(skill => {
                const Icon = skill.icon
                return (
                  <div key={skill.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-xs text-white/70">{skill.label}</span>
                      </div>
                      <span className="text-[10px] text-white/30">{skill.level}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-violet-500/60 to-cyan-500/60" style={{ width: skill.level }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t border-white/10">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github className="w-3.5 h-3.5 text-white/60" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-3.5 h-3.5 text-white/60" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xl border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Mail className="w-3.5 h-3.5 text-white/60" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-6">Selected Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <a key={i} href="#" className="group rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/10 p-5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
              <div className={`${project.color} h-32 rounded-xl mb-4 flex items-center justify-center backdrop-blur-sm border border-white/10`}>
                <span className="text-xs text-white/40 uppercase tracking-widest">{project.tag}</span>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold group-hover:text-white/90 transition-colors">{project.name}</h3>
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/15 p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Let's collaborate</h2>
          <p className="text-sm text-white/40 mb-5">Open for freelance, contract, and full-time opportunities.</p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/15 backdrop-blur-xl border border-white/20 text-sm font-medium hover:bg-white/25 transition-colors">
            <Mail className="w-4 h-4" /> hello@alexkim.dev
          </a>
        </div>
      </section>
    </div>
  )
}
