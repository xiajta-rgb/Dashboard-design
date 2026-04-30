import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react'

const projects = [
  { name: 'Maison Noir', tag: 'Brand Identity', year: '2025' },
  { name: 'Atelier Lumière', tag: 'Web Design', year: '2024' },
  { name: 'Château Reserve', tag: 'Packaging', year: '2024' },
  { name: 'Silk & Stone', tag: 'Editorial', year: '2023' },
]

const awards = ['Red Dot 2025', 'iF Design 2024', 'D&AD Pencil 2023']

export default function PortfolioMattePage() {
  return (
    <div className="w-full min-h-screen bg-[#1a1816] text-[#c8b898] font-sans">
      <div className="max-w-5xl mx-auto px-8">
        <nav className="pt-8 pb-6 flex items-center justify-between border-b border-[#8a7a5a]/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm border border-[#8a7a5a]/40 flex items-center justify-center">
              <span className="text-xs font-bold text-[#c8b898]">LM</span>
            </div>
            <span className="text-sm font-semibold tracking-wider uppercase text-[#8a7a5a]">Léa Moreau</span>
          </div>
          <div className="flex items-center gap-6">
            {['Portfolio', 'About', 'Contact'].map(item => (
              <a key={item} href="#" className="text-[11px] uppercase tracking-[0.15em] text-[#8a7a5a]/60 hover:text-[#c8b898] transition-colors">{item}</a>
            ))}
          </div>
        </nav>

        <section className="py-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a7a5a]/40 mb-4">Creative Director & Designer</p>
              <h1 className="text-5xl font-light tracking-tight leading-[1.15] text-[#c8b898]">
                Crafting visual<br />
                narratives with<br />
                <span className="text-[#8a7a5a]">quiet precision</span>
              </h1>
            </div>
            <div className="col-span-5 flex flex-col justify-end">
              <p className="text-xs text-[#8a7a5a]/50 leading-relaxed max-w-xs">
                A multidisciplinary creative director specializing in brand identity, editorial design, and luxury experiences. Based in Paris.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="text-[10px] uppercase tracking-[0.15em] text-[#8a7a5a]/60 hover:text-[#c8b898] transition-colors flex items-center gap-1">
                  Selected Work <ArrowUpRight className="w-3 h-3" />
                </a>
                <a href="#" className="text-[10px] uppercase tracking-[0.15em] text-[#8a7a5a]/60 hover:text-[#c8b898] transition-colors flex items-center gap-1">
                  Biography <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8a7a5a]/40">Selected Work</h2>
            <span className="text-[10px] text-[#8a7a5a]/30 font-mono">04 Projects</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <a key={i} href="#" className="group">
                <div className="bg-[#1e1c1a] border border-[#8a7a5a]/10 h-52 mb-3 flex items-center justify-center relative overflow-hidden">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a7a5a]/20">{project.tag}</span>
                  <div className="absolute inset-0 bg-[#8a7a5a]/0 group-hover:bg-[#8a7a5a]/5 transition-colors" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-[#c8b898]/90 group-hover:text-[#c8b898] transition-colors">{project.name}</h3>
                    <p className="text-[10px] text-[#8a7a5a]/40 mt-0.5">{project.tag}</p>
                  </div>
                  <span className="text-[10px] text-[#8a7a5a]/30 font-mono">{project.year}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="py-12 border-t border-[#8a7a5a]/10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8a7a5a]/40 mb-4">Recognition</h2>
              <div className="space-y-2">
                {awards.map(award => (
                  <p key={award} className="text-xs text-[#8a7a5a]/50">{award}</p>
                ))}
              </div>
            </div>
            <div className="col-span-4">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8a7a5a]/40 mb-4">Expertise</h2>
              <div className="space-y-2">
                {['Brand Identity', 'Art Direction', 'Editorial Design', 'Luxury Packaging'].map(item => (
                  <p key={item} className="text-xs text-[#8a7a5a]/50">{item}</p>
                ))}
              </div>
            </div>
            <div className="col-span-4">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#8a7a5a]/40 mb-4">Connect</h2>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 text-xs text-[#8a7a5a]/50 hover:text-[#c8b898] transition-colors">
                  <Mail className="w-3 h-3" /> lea@moreau.studio
                </a>
                <a href="#" className="flex items-center gap-2 text-xs text-[#8a7a5a]/50 hover:text-[#c8b898] transition-colors">
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </a>
                <a href="#" className="flex items-center gap-2 text-xs text-[#8a7a5a]/50 hover:text-[#c8b898] transition-colors">
                  <Github className="w-3 h-3" /> GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-6 border-t border-[#8a7a5a]/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#8a7a5a]/30">&copy; 2026 Léa Moreau</span>
            <span className="text-[10px] text-[#8a7a5a]/30">Matte Luxury</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
