import {
  Github,
  Twitter,
  Mail,
  ExternalLink,
} from 'lucide-react'

const projects = [
  { name: 'Dungeon Crawl', tag: 'RPG', year: '2025' },
  { name: 'Pixel Garden', tag: 'Sim', year: '2024' },
  { name: 'Byte Runner', tag: 'Platform', year: '2024' },
  { name: 'Chip Quest', tag: 'Puzzle', year: '2023' },
]

const skills = ['Pixel Art', 'Game Dev', 'Sprite Animation', 'Tile Design', 'Shader FX']

const pixelBorder = { border: '3px solid #5a6988', imageRendering: 'pixelated' }
const pixelShadow = { boxShadow: '4px 4px 0px #1a1c2c' }

export default function PortfolioPixelPage() {
  return (
    <div className="w-full min-h-screen text-[#a7f070] font-sans relative overflow-hidden"
      style={{ background: '#1a1c2c' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(167,240,112,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,240,112,0.3) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <nav className="max-w-4xl mx-auto px-6 pt-8 pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center" style={{ ...pixelBorder, background: '#262b44' }}>
              <span className="text-sm font-bold text-[#ef7d57]">8B</span>
            </div>
            <span className="font-bold text-sm tracking-wider text-[#a7f070]">8BIT.DEV</span>
          </div>
          <div className="flex items-center gap-4">
            {['GAMES', 'ABOUT', 'CONTACT'].map(item => (
              <a key={item} href="#" className="text-[10px] text-[#5a6988] hover:text-[#a7f070] transition-colors tracking-wider">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pt-12 pb-10 relative z-10">
        <div className="inline-block px-3 py-1 mb-4" style={{ ...pixelBorder, background: '#262b44' }}>
          <span className="text-[10px] text-[#ef7d57] tracking-wider">/// INDIE GAME DEV & PIXEL ARTIST ///</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4" style={{ textShadow: '3px 3px 0px #262b44' }}>
          PIXEL<br />
          <span className="text-[#ef7d57]">CRAFT</span>
        </h1>
        <p className="text-sm text-[#5a6988] max-w-md leading-relaxed mb-6">
          Making games one pixel at a time. Retro-inspired indie developer crafting worlds with 8-bit charm and 16-bit soul.
        </p>
        <div className="flex items-center gap-3">
          <a href="#" className="px-5 py-2.5 text-sm font-bold text-[#1a1c2c] tracking-wider" style={{ ...pixelBorder, ...pixelShadow, background: '#a7f070' }}>
            PLAY DEMO
          </a>
          <a href="#" className="px-5 py-2.5 text-sm font-bold text-[#5a6988] tracking-wider" style={{ ...pixelBorder, background: '#262b44' }}>
            SOURCE CODE
          </a>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-10 relative z-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 bg-[#ef7d57]" />
          <h2 className="text-[10px] text-[#5a6988] tracking-[0.2em] uppercase">GAME PROJECTS</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <a key={i} href="#" className="group block" style={{ ...pixelBorder, background: '#262b44' }}>
              <div className="h-32 flex items-center justify-center relative" style={{ background: ['#2c2137', '#1e2d3d', '#2d2c1e', '#1e2d2c'][i] }}>
                <span className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">
                  {['⚔️', '🌱', '🏃', '🧩'][i]}
                </span>
                <div className="absolute top-2 right-2 px-2 py-0.5 text-[8px] text-[#a7f070] tracking-wider" style={{ border: '2px solid #5a6988', background: '#1a1c2c' }}>
                  {project.tag}
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#a7f070] group-hover:text-[#ef7d57] transition-colors">{project.name}</h3>
                  <p className="text-[9px] text-[#5a6988] mt-0.5">{project.year}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#5a6988] group-hover:text-[#a7f070] transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-10 relative z-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 bg-[#ef7d57]" />
          <h2 className="text-[10px] text-[#5a6988] tracking-[0.2em] uppercase">SKILL TREE</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill} className="px-3 py-1.5 text-[10px] font-bold text-[#ef7d57] tracking-wider" style={{ border: '2px solid #5a6988', background: '#262b44' }}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16 relative z-10">
        <div className="p-6 text-center" style={{ ...pixelBorder, background: '#262b44' }}>
          <p className="text-sm font-bold mb-2 text-[#a7f070]">WANNA COLLAB? 🎮</p>
          <p className="text-[10px] text-[#5a6988] mb-4">Always looking for pixel pals and game jam teammates</p>
          <div className="flex items-center justify-center gap-3">
            <a href="#" className="w-9 h-9 flex items-center justify-center" style={{ border: '2px solid #5a6988', background: '#1a1c2c' }}>
              <Github className="w-4 h-4 text-[#5a6988]" />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center" style={{ border: '2px solid #5a6988', background: '#1a1c2c' }}>
              <Twitter className="w-4 h-4 text-[#5a6988]" />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center" style={{ border: '2px solid #5a6988', background: '#1a1c2c' }}>
              <Mail className="w-4 h-4 text-[#5a6988]" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-4 px-6 relative z-10" style={{ borderTop: '2px solid #262b44' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-[9px] text-[#5a6988] tracking-wider">&copy; 2026 8BIT.DEV</span>
          <span className="text-[9px] text-[#5a6988] tracking-wider">PIXEL ART</span>
        </div>
      </footer>
    </div>
  )
}
