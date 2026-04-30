import { useState } from 'react'
import {
  Github,
  Twitter,
  Mail,
  ExternalLink,
  ArrowUpRight,
  Code2,
  Palette,
  Flame,
  Sparkles,
  Zap,
  MapPin,
} from 'lucide-react'

const projects = [
  { title: 'NEON//GRID', category: 'WEB 3D', desc: 'Interactive 3D city generator with real-time ray tracing', tags: ['Three.js', 'WebGPU', 'GLSL'], color: 'bg-[#ff3366]' },
  { title: 'VOID*ENGINE', category: 'DEV TOOL', desc: 'Zero-config build system that compiles at light speed', tags: ['Rust', 'WASM', 'CLI'], color: 'bg-[#00ff88]' },
  { title: 'PRISM.FM', category: 'SaaS', desc: 'AI music production suite with neural synthesis', tags: ['Next.js', 'Python', 'AI'], color: 'bg-[#ff3366]' },
  { title: 'FLUX.STATE', category: 'LIBRARY', desc: 'Reactive state management with zero boilerplate', tags: ['TypeScript', 'Proxy', 'DX'], color: 'bg-[#00ff88]' },
  { title: 'HYPER//LINK', category: 'P2P', desc: 'Decentralized content network powered by WebRTC', tags: ['WebRTC', 'CRDT', 'P2P'], color: 'bg-[#ff3366]' },
  { title: 'ECHO.SYS', category: 'AI', desc: 'Voice-first operating system for spatial computing', tags: ['Voice AI', 'WebXR', 'Spatial'], color: 'bg-[#00ff88]' },
]

const skills = [
  { icon: Code2, label: 'ENGINEERING', items: ['TypeScript', 'Rust', 'WebGPU', 'WASM'] },
  { icon: Palette, label: 'DESIGN', items: ['Motion', '3D', 'Generative', 'UI'] },
  { icon: Flame, label: 'CREATIVE', items: ['Shaders', 'Audio', 'AI', 'P2P'] },
]

export default function PortfolioBoldPage() {
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b-2 border-[#ff3366]/30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ff3366] flex items-center justify-center rotate-3">
              <span className="text-sm font-black text-white">K</span>
            </div>
            <span className="font-black text-sm tracking-tight">KAI.STUDIO</span>
          </div>
          <div className="flex items-center gap-6">
            {['WORK', 'ABOUT', 'LAB', 'CONTACT'].map(item => (
              <a key={item} href="#" className="text-[11px] font-bold tracking-wider text-neutral-500 hover:text-[#ff3366] transition-colors">{item}</a>
            ))}
            <a href="#" className="ml-2 px-4 py-1.5 bg-[#00ff88] text-black text-xs font-black hover:bg-[#00ff88]/80 transition-colors">
              HIRE ME
            </a>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#ff3366]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#00ff88]/10 blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-4 h-4 text-[#00ff88]" />
              <span className="text-xs font-bold text-[#00ff88] tracking-wider">AVAILABLE FOR WORK</span>
            </div>
            <h1 className="text-6xl sm:text-7xl font-black tracking-tighter mb-6 leading-[0.95]">
              I BUILD<br />
              <span className="text-[#ff3366]">WILD</span> THINGS<br />
              FOR THE <span className="text-[#00ff88]">WEB</span>
            </h1>
            <p className="text-neutral-400 text-base leading-relaxed mb-8 max-w-lg font-medium">
              Creative developer &amp; design engineer. I turn ambitious ideas into interactive experiences that push the boundaries of what's possible on the web.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2 px-6 py-3 bg-[#ff3366] text-white text-sm font-black hover:bg-[#ff3366]/80 transition-colors">
                VIEW WORK <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#" className="flex items-center gap-2 px-6 py-3 border-2 border-white/20 text-white text-sm font-bold hover:border-[#00ff88] hover:text-[#00ff88] transition-colors">
                <Github className="w-4 h-4" /> GITHUB
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black tracking-tight">SELECTED WORK</h2>
            <span className="text-xs font-bold text-[#00ff88] font-mono">{projects.length} PROJECTS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative border-2 border-white/10 overflow-hidden hover:border-[#ff3366]/50 transition-all duration-200 cursor-pointer"
              >
                <div className={`${project.color} h-44 opacity-15 group-hover:opacity-25 transition-opacity duration-200`} />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-black tracking-wider text-white/70 bg-black/50 px-2 py-1">
                    {project.category}
                  </span>
                </div>
                <div className="p-5 bg-[#111111]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-black tracking-tight">{project.title}</h3>
                    <ExternalLink className={`w-4 h-4 text-[#ff3366] transition-all duration-200 ${hoveredProject === i ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-3 font-medium">{project.desc}</p>
                  <div className="flex items-center gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20 px-2 py-0.5">
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

      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-black tracking-tight mb-8">SKILLS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {skills.map((skill, i) => {
              const Icon = skill.icon
              return (
                <div key={i} className="border-2 border-white/10 bg-[#111111] p-5 hover:border-[#00ff88]/30 transition-colors">
                  <Icon className="w-6 h-6 text-[#ff3366] mb-3" />
                  <h3 className="text-xs font-black tracking-wider mb-3">{skill.label}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map(item => (
                      <span key={item} className="text-[10px] font-bold text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/20 px-2 py-0.5">
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

      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="border-2 border-[#ff3366]/30 bg-[#111111] p-10 text-center">
            <Sparkles className="w-8 h-8 text-[#ff3366] mx-auto mb-4" />
            <h2 className="text-3xl font-black tracking-tight mb-3">LET'S CREATE SOMETHING WILD</h2>
            <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto font-medium">
              Got an ambitious project? I'm always down for creative challenges.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a href="#" className="flex items-center gap-2 px-6 py-3 bg-[#ff3366] text-white text-sm font-black hover:bg-[#ff3366]/80 transition-colors">
                <Mail className="w-4 h-4" /> kai@studio.dev
              </a>
              <a href="#" className="flex items-center gap-2 px-6 py-3 border-2 border-[#00ff88]/30 text-[#00ff88] text-sm font-bold hover:bg-[#00ff88]/10 transition-colors">
                <Twitter className="w-4 h-4" /> @kaistudio
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-white/10 py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-[10px] font-bold text-neutral-600">&copy; 2026 KAI.STUDIO</span>
          <span className="text-[10px] font-bold text-[#ff3366]">BUILT DIFFERENT</span>
        </div>
      </footer>
    </div>
  )
}
