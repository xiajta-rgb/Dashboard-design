import {
  Github,
  Twitter,
  Mail,
  Globe,
  Sparkles,
  Heart,
  Camera,
} from 'lucide-react'

const socials = [
  { icon: Github, label: 'GitHub', handle: '@jellydev', gradient: 'from-[#ff6b9d] to-[#c44dff]' },
  { icon: Twitter, label: 'Twitter', handle: '@jellydev', gradient: 'from-[#c44dff] to-[#6e5cff]' },
  { icon: Mail, label: 'Email', handle: 'hi@jelly.dev', gradient: 'from-[#6e5cff] to-[#00d4ff]' },
  { icon: Globe, label: 'Website', handle: 'jelly.dev', gradient: 'from-[#00d4ff] to-[#ff6b9d]' },
]

export default function BusinessCardJellyGlassPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 font-sans relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c44dff 25%, #6e5cff 50%, #00d4ff 75%, #ff6b9d 100%)',
        backgroundSize: '400% 400%',
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white/10 rounded-full blur-[60px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#ff6b9d]/15 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#6e5cff]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-[28px] p-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: `
              0 8px 32px rgba(0,0,0,0.12),
              inset 0 1px 0 rgba(255,255,255,0.4),
              inset 0 -1px 0 rgba(255,255,255,0.1)
            `,
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ff6b9d]/20 to-transparent rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00d4ff]/20 to-transparent rounded-full blur-[30px] pointer-events-none" />

          <div className="text-center mb-6 relative z-10">
            <div className="w-20 h-20 rounded-[20px] mx-auto mb-4 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,157,0.4), rgba(196,77,255,0.4), rgba(0,212,255,0.4))',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(196,77,255,0.3)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xl font-bold text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>JK</span>
              </div>
            </div>
            <h1 className="text-xl font-bold text-white mb-0.5" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Jelly Kim</h1>
            <p className="text-xs font-medium text-white/60">Creative Developer</p>
          </div>

          <p className="text-xs text-white/50 text-center leading-relaxed mb-6 px-2 relative z-10">
            Building playful, colorful digital experiences. Code meets creativity in every pixel ✨
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6 relative z-10" />

          <div className="space-y-2.5 relative z-10">
            {socials.map(link => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity`}
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/80">{link.label}</p>
                    <p className="text-[10px] text-white/40 truncate">{link.handle}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,157,0.5), rgba(196,77,255,0.5))',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 16px rgba(196,77,255,0.3)',
            }}
          >
            <Sparkles className="w-4 h-4" /> Connect
          </button>
        </div>

        <p className="text-[10px] text-white/20 text-center mt-4">
          &copy; 2026 Jelly Kim &middot; Jelly Glass
        </p>
      </div>
    </div>
  )
}
