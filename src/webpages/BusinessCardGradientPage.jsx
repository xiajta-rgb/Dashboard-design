import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  MapPin,
  Heart,
} from 'lucide-react'

const socialLinks = [
  { icon: Github, label: 'GitHub', href: '#', handle: '@sofiaromero' },
  { icon: Twitter, label: 'Twitter', href: '#', handle: '@sofia_designs' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', handle: 'in/sofiaromero' },
  { icon: Mail, label: 'Email', href: '#', handle: 'hello@sofiaromero.co' },
  { icon: Globe, label: 'Website', href: '#', handle: 'sofiaromero.co' },
]

export default function BusinessCardGradientPage() {
  return (
    <div className="w-full min-h-screen bg-[#1a1a2e] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#e94560]/[0.08] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#a78bfa]/[0.08] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#e94560]/[0.04] blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-[20px] border border-white/[0.08] bg-gradient-to-br from-[#1e1e38] to-[#16213e] p-8 shadow-[0_0_60px_rgba(233,69,96,0.08),0_0_120px_rgba(167,139,250,0.05)]">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e94560] to-[#a78bfa] mx-auto mb-4 flex items-center justify-center shadow-lg shadow-[#e94560]/20">
              <span className="text-2xl font-bold text-white">SR</span>
            </div>
            <h1 className="text-xl font-bold text-white mb-0.5">Sofia Romero</h1>
            <p className="text-sm bg-gradient-to-r from-[#e94560] to-[#a78bfa] bg-clip-text text-transparent font-semibold mb-2">Brand Designer & Art Director</p>
            <div className="flex items-center justify-center gap-1.5 text-white/40">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">Barcelona, Spain</span>
            </div>
          </div>

          <p className="text-xs text-white/40 text-center leading-relaxed mb-6 px-2">
            Creating visual identities that tell stories. Specializing in brand strategy, art direction, and visual storytelling.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#e94560]/20 to-transparent mb-6" />

          <div className="space-y-2">
            {socialLinks.map(link => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.06] hover:border-[#e94560]/20 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e94560]/10 to-[#a78bfa]/10 flex items-center justify-center group-hover:from-[#e94560]/20 group-hover:to-[#a78bfa]/20 transition-colors">
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-[#e94560] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white/70">{link.label}</p>
                    <p className="text-[10px] text-white/30 truncate">{link.handle}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-[#a78bfa] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e94560] to-[#a78bfa] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#e94560]/20">
            <Heart className="w-4 h-4" /> Let's Collaborate
          </button>
        </div>

        <p className="text-[10px] text-white/20 text-center mt-4">
          &copy; 2026 Sofia Romero &middot; Designed with passion
        </p>
      </div>
    </div>
  )
}
