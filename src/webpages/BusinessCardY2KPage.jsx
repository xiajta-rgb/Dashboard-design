import {
  Github,
  Twitter,
  Mail,
  Globe,
  Sparkles,
  Star,
} from 'lucide-react'

const socials = [
  { icon: Github, label: 'GitHub', handle: '@y2kdev', gradient: 'from-[#ff00ff] to-[#00ffff]' },
  { icon: Twitter, label: 'Twitter', handle: '@y2kdev', gradient: 'from-[#00ffff] to-[#ff00ff]' },
  { icon: Mail, label: 'Email', handle: 'y2k@neon.dev', gradient: 'from-[#ff00ff] to-[#ffff00]' },
  { icon: Globe, label: 'Website', handle: 'y2k.dev', gradient: 'from-[#ffff00] to-[#00ffff]' },
]

export default function BusinessCardY2KPage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0020] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ff00ff]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00ffff]/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ffff00]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-3xl bg-[#0a0020]/80 backdrop-blur-xl border-2 border-[#ff00ff]/30 p-8 shadow-[0_0_40px_rgba(255,0,255,0.15),0_0_80px_rgba(0,255,255,0.1)]">
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ffff00] opacity-60 blur-sm animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-[#0a0020] border-2 border-[#ff00ff]/40 flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ffff00] bg-clip-text text-transparent">Y2K</span>
              </div>
            </div>
            <h1 className="text-xl font-bold mb-0.5">
              <span className="bg-gradient-to-r from-[#ff00ff] to-[#00ffff] bg-clip-text text-transparent">Nova Chen</span>
            </h1>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00ffff]/60">Digital Creator</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="w-3 h-3 text-[#ffff00]/60 fill-[#ffff00]/60" />
              <Star className="w-3 h-3 text-[#ff00ff]/60 fill-[#ff00ff]/60" />
              <Star className="w-3 h-3 text-[#00ffff]/60 fill-[#00ffff]/60" />
            </div>
          </div>

          <p className="text-xs text-white/40 text-center leading-relaxed mb-6 px-2">
            Building the future with pixels and code. Aesthetic-driven developer crafting digital experiences.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#ff00ff]/30 to-transparent mb-6" />

          <div className="space-y-3">
            {socials.map(link => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#ff00ff]/30 hover:bg-white/[0.06] transition-all duration-200 group"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${link.gradient} opacity-20 group-hover:opacity-40 transition-opacity flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/80">{link.label}</p>
                    <p className="text-[10px] text-white/30 truncate">{link.handle}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 text-[#ff00ff]/30 group-hover:text-[#00ffff] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff00ff]/20 to-[#00ffff]/20 border border-[#ff00ff]/20 text-sm font-semibold text-white/80 hover:from-[#ff00ff]/30 hover:to-[#00ffff]/30 transition-all duration-200">
            <Sparkles className="w-4 h-4 text-[#ffff00]" /> Connect
          </button>
        </div>

        <p className="text-[10px] text-[#ff00ff]/20 text-center mt-4">
          &copy; 2026 Nova Chen &middot; Y2K Millennium
        </p>
      </div>
    </div>
  )
}
