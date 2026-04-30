import { useState } from 'react'
import {
  Github,
  Twitter,
  Mail,
  ExternalLink,
  ArrowUpRight,
  Code2,
  Palette,
  Smartphone,
  Globe,
  Layers,
  Zap,
  ChevronDown,
  MapPin,
} from 'lucide-react'

const projects = [
  { title: 'Nebula Dashboard', category: 'Web App', desc: 'Real-time analytics platform with dark mode interface', tags: ['React', 'D3.js', 'WebSocket'], color: 'from-violet-600 to-indigo-600' },
  { title: 'Flux Design System', category: 'Design System', desc: 'Component library with 120+ primitives and design tokens', tags: ['Figma', 'Storybook', 'Tokens'], color: 'from-cyan-600 to-blue-600' },
  { title: 'Aether Mobile', category: 'Mobile App', desc: 'AI-powered meditation app with adaptive soundscapes', tags: ['React Native', 'AI', 'Audio'], color: 'from-emerald-600 to-teal-600' },
  { title: 'Prism Editor', category: 'Developer Tool', desc: 'Code editor with AI-assisted refactoring and pair programming', tags: ['Electron', 'LSP', 'AI'], color: 'from-amber-600 to-orange-600' },
  { title: 'Vertex 3D', category: 'Web 3D', desc: 'Interactive 3D product configurator with real-time rendering', tags: ['Three.js', 'WebGL', 'React'], color: 'from-rose-600 to-pink-600' },
  { title: 'Echo Platform', category: 'SaaS', desc: 'Team collaboration suite with voice-first interactions', tags: ['Next.js', 'WebRTC', 'AI'], color: 'from-fuchsia-600 to-purple-600' },
]

const skills = [
  { icon: Code2, label: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind'] },
  { icon: Palette, label: 'Design', items: ['Figma', 'Design Systems', 'Motion', 'Prototyping'] },
  { icon: Smartphone, label: 'Mobile', items: ['React Native', 'Expo', 'iOS', 'Android'] },
  { icon: Globe, label: 'Backend', items: ['Node.js', 'PostgreSQL', 'GraphQL', 'REST'] },
]

const navItems = ['Work', 'About', 'Skills', 'Contact']

export default function PortfolioPage() {
  const [activeNav, setActiveNav] = useState('Work')
  const [hoveredProject, setHoveredProject] = useState(null)

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <span className="font-semibold text-sm tracking-tight">Alex Chen</span>
          </div>
          <div className="flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`text-xs font-medium transition-colors cursor-pointer ${activeNav === item ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
              >
                {item}
              </button>
            ))}
            <a href="#" className="ml-2 px-4 py-1.5 rounded-lg bg-white text-neutral-900 text-xs font-semibold hover:bg-neutral-100 transition-colors">
              Let's Talk
            </a>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-xs text-neutral-500">San Francisco, CA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
              <span className="text-xs text-emerald-500">Available for work</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
              Design Engineer<br />
              <span className="text-gradient">&amp; Creative Developer</span>
            </h1>
            <p className="text-neutral-400 text-base leading-relaxed mb-8 max-w-lg">
              I craft interfaces where design meets engineering — building products that are both beautiful and performant. Specializing in design systems, interactive experiences, and developer tools.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-100 transition-colors">
                View Projects <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/5 transition-colors">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold">Selected Work</h2>
            <span className="text-xs text-neutral-500 font-mono">{projects.length} projects</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative rounded-xl border border-white/[0.06] bg-[#111111] overflow-hidden hover:border-white/15 transition-all duration-300 cursor-pointer"
              >
                <div className={`h-48 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/60 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
                    {project.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold">{project.title}</h3>
                    <ExternalLink className={`w-4 h-4 text-neutral-500 transition-all duration-200 ${hoveredProject === i ? 'opacity-100 translate-x-0.5 -translate-y-0.5' : 'opacity-0'}`} />
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-3">{project.desc}</p>
                  <div className="flex items-center gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-neutral-400 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md">
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
          <h2 className="text-lg font-semibold mb-8">Skills &amp; Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill, i) => {
              const Icon = skill.icon
              return (
                <div key={i} className="rounded-xl border border-white/[0.06] bg-[#111111] p-5 hover:border-white/15 transition-colors">
                  <Icon className="w-5 h-5 text-violet-400 mb-3" />
                  <h3 className="text-sm font-semibold mb-2">{skill.label}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map(item => (
                      <span key={item} className="text-[10px] text-neutral-400 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md">
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
          <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Let's work together</h2>
            <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto">
              Have a project in mind? I'm always open to discussing new opportunities and creative ideas.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a href="#" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-100 transition-colors">
                <Mail className="w-4 h-4" /> hello@alexchen.dev
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-neutral-400 text-sm hover:text-white hover:bg-white/5 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-neutral-400 text-sm hover:text-white hover:bg-white/5 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs text-neutral-600">&copy; 2026 Alex Chen</span>
          <span className="text-xs text-neutral-600">Built with passion &amp; precision</span>
        </div>
      </footer>
    </div>
  )
}
