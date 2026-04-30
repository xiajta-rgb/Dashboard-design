import {
  Github,
  Twitter,
  Mail,
  ExternalLink,
  Pencil,
} from 'lucide-react'

const projects = [
  { name: 'Wild Garden', tag: 'Illustration', year: '2025' },
  { name: 'Paper Birds', tag: 'Animation', year: '2024' },
  { name: 'Ink Stories', tag: 'Comic', year: '2024' },
  { name: 'Doodle Lab', tag: 'Experiment', year: '2023' },
]

const skills = ['Illustration', 'Animation', 'Lettering', 'Comics', 'UI Sketch']

export default function PortfolioSketchPage() {
  return (
    <div className="w-full min-h-screen bg-[#faf8f5] text-[#4a4a4a] font-sans relative overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4c5a9' fill-opacity='0.08'%3E%3Cpath d='M0 0h1v1H0zM4 4h1v1H4zM8 0h1v1H8zM12 4h1v1h-1zM16 0h1v1h-1zM20 4h1v1h-1zM24 0h1v1h-1zM28 4h1v1h-1zM32 0h1v1h-1zM36 4h1v1h-1z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="absolute top-8 right-12 opacity-10 pointer-events-none">
        <Pencil className="w-32 h-32 text-[#8b7355] rotate-[-15deg]" />
      </div>

      <nav className="max-w-4xl mx-auto px-8 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border-2 border-[#8b7355] border-dashed flex items-center justify-center bg-[#f0ebe3]">
              <span className="text-sm font-bold text-[#8b7355]" style={{ fontFamily: 'cursive' }}>Mo</span>
            </div>
            <span className="font-semibold text-sm" style={{ fontFamily: 'cursive' }}>Mori Studio</span>
          </div>
          <div className="flex items-center gap-4">
            {['Work', 'About', 'Contact'].map(item => (
              <a key={item} href="#" className="text-xs text-[#8b7355]/60 hover:text-[#8b7355] transition-colors border-b border-dashed border-transparent hover:border-[#8b7355]/30 pb-0.5">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-8 pt-12 pb-10">
        <div className="inline-block px-3 py-1 bg-[#f0ebe3] border-2 border-dashed border-[#8b7355]/30 rounded-md mb-4">
          <span className="text-[10px] text-[#8b7355]/60 uppercase tracking-wider">Illustrator & Visual Storyteller</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Drawing the<br />
          <span className="text-[#8b7355]" style={{ textDecoration: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: '8px' }}>world</span> by hand
        </h1>
        <p className="text-sm text-[#8b7355]/50 leading-relaxed max-w-md mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          I'm Mori — an illustrator and visual storyteller who believes in the warmth of hand-drawn lines and the charm of imperfect beauty.
        </p>
        <div className="flex items-center gap-3">
          <a href="#" className="px-5 py-2.5 bg-[#8b7355] text-[#faf8f5] text-sm font-medium rounded-md border-2 border-[#8b7355] hover:bg-[#7a6345] transition-colors">
            See My Work
          </a>
          <a href="#" className="px-5 py-2.5 bg-[#f0ebe3] text-[#8b7355] text-sm font-medium rounded-md border-2 border-dashed border-[#8b7355]/40 hover:border-[#8b7355] transition-colors">
            Say Hello ✉️
          </a>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 pb-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-0.5 bg-[#8b7355]/30" />
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#8b7355]/40">Selected Work</h2>
          <div className="flex-1 h-0 border-t border-dashed border-[#8b7355]/15" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <a key={i} href="#" className="group block">
              <div className="bg-[#f0ebe3] border-2 border-dashed border-[#8b7355]/20 rounded-lg h-44 mb-3 flex items-center justify-center relative overflow-hidden group-hover:border-[#8b7355]/40 transition-colors">
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#faf8f5] border border-dashed border-[#8b7355]/20 rounded text-[9px] text-[#8b7355]/40 uppercase">{project.tag}</div>
                <span className="text-3xl opacity-20 group-hover:opacity-30 transition-opacity" style={{ fontFamily: 'Georgia, serif' }}>
                  {['🌿', '🐦', '📖', '🧪'][i]}
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b7355]/0 via-[#8b7355]/20 to-[#8b7355]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#4a4a4a] group-hover:text-[#8b7355] transition-colors" style={{ fontFamily: 'Georgia, serif' }}>{project.name}</h3>
                  <p className="text-[10px] text-[#8b7355]/40 mt-0.5">{project.tag}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#8b7355]/20 group-hover:text-[#8b7355]/50 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 pb-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-3 h-0.5 bg-[#8b7355]/30" />
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#8b7355]/40">Tools & Skills</h2>
          <div className="flex-1 h-0 border-t border-dashed border-[#8b7355]/15" />
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill} className="px-3 py-1.5 bg-[#f0ebe3] border-2 border-dashed border-[#8b7355]/20 rounded-md text-xs text-[#8b7355]/60 hover:border-[#8b7355]/40 hover:text-[#8b7355] transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 pb-16">
        <div className="bg-[#f0ebe3] border-2 border-dashed border-[#8b7355]/20 rounded-lg p-8 text-center">
          <p className="text-lg mb-2" style={{ fontFamily: 'Georgia, serif' }}>Let's create something beautiful together ✏️</p>
          <p className="text-xs text-[#8b7355]/40 mb-4">Always open for commissions and collaborations</p>
          <div className="flex items-center justify-center gap-3">
            <a href="#" className="w-9 h-9 rounded-lg bg-[#faf8f5] border-2 border-dashed border-[#8b7355]/20 flex items-center justify-center hover:border-[#8b7355]/40 transition-colors">
              <Github className="w-4 h-4 text-[#8b7355]/40" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-[#faf8f5] border-2 border-dashed border-[#8b7355]/20 flex items-center justify-center hover:border-[#8b7355]/40 transition-colors">
              <Twitter className="w-4 h-4 text-[#8b7355]/40" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-[#faf8f5] border-2 border-dashed border-[#8b7355]/20 flex items-center justify-center hover:border-[#8b7355]/40 transition-colors">
              <Mail className="w-4 h-4 text-[#8b7355]/40" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-6 px-8 border-t-2 border-dashed border-[#8b7355]/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-[10px] text-[#8b7355]/30" style={{ fontFamily: 'cursive' }}>Mori Studio</span>
          <span className="text-[10px] text-[#8b7355]/30">Sketch Style</span>
        </div>
      </footer>
    </div>
  )
}
