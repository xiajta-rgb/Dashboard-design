import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  MapPin,
  Sparkles,
} from 'lucide-react'

const socialLinks = [
  { icon: Github, label: 'GitHub', href: '#', handle: '@luchen' },
  { icon: Twitter, label: 'Twitter', href: '#', handle: '@luchen_dev' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', handle: 'in/luchen' },
  { icon: Mail, label: 'Email', href: '#', handle: 'lu@chen.dev' },
  { icon: Globe, label: 'Website', href: '#', handle: 'luchen.dev' },
]

export default function BusinessCardGlassPage() {
  return (
    <div className="w-full min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full bg-sky-500/[0.12] blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] rounded-full bg-indigo-500/[0.12] blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] left-[60%] w-[250px] h-[250px] rounded-full bg-violet-500/[0.08] blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-3xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="text-center mb-6">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 opacity-50 blur-md" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">LC</span>
              </div>
            </div>
            <h1 className="text-xl font-bold text-white mb-0.5">Lu Chen</h1>
            <p className="text-sm text-sky-300/80 font-medium mb-2">Creative Technologist</p>
            <div className="flex items-center justify-center gap-1.5 text-white/40">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">Shanghai, China</span>
            </div>
          </div>

          <p className="text-xs text-white/40 text-center leading-relaxed mb-6 px-2">
            Bridging design and code. Building interactive experiences at the intersection of art and technology.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          <div className="space-y-2">
            {socialLinks.map(link => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/[0.06] backdrop-blur-sm flex items-center justify-center group-hover:bg-sky-500/15 transition-colors">
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-sky-300 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white/60">{link.label}</p>
                    <p className="text-[10px] text-white/25 truncate">{link.handle}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 text-white/15 group-hover:text-indigo-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] text-white text-sm font-semibold hover:bg-white/[0.15] transition-all shadow-lg shadow-sky-500/10">
            <Sparkles className="w-4 h-4 text-sky-300" /> Connect
          </button>
        </div>

        <p className="text-[10px] text-white/15 text-center mt-4">
          &copy; 2026 Lu Chen &middot; Crafted with code
        </p>
      </div>
    </div>
  )
}
