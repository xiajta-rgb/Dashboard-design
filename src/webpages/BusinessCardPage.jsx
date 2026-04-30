import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  Dribbble,
  MapPin,
} from 'lucide-react'

const socialLinks = [
  { icon: Github, label: 'GitHub', href: '#', handle: '@alexchen' },
  { icon: Twitter, label: 'Twitter', href: '#', handle: '@alexchen_dev' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', handle: 'in/alexchen' },
  { icon: Dribbble, label: 'Dribbble', href: '#', handle: '@alexchen' },
  { icon: Mail, label: 'Email', href: '#', handle: 'hello@alexchen.dev' },
  { icon: Globe, label: 'Website', href: '#', handle: 'alexchen.dev' },
]

export default function BusinessCardPage() {
  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
        <div className="absolute top-[30%] left-[30%] w-[300px] h-[300px] rounded-full bg-amber-500/[0.02] blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-2xl border border-white/[0.08] bg-[#161616] p-8 shadow-[0_0_80px_rgba(245,158,11,0.06)]">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-2xl font-bold text-neutral-900">AC</span>
            </div>
            <h1 className="text-xl font-bold text-white mb-0.5">Alex Chen</h1>
            <p className="text-sm text-amber-400/80 font-medium mb-2">Design Engineer</p>
            <div className="flex items-center justify-center gap-1.5 text-neutral-500">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">San Francisco, CA</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 text-center leading-relaxed mb-6 px-2">
            Crafting interfaces where design meets engineering. Building beautiful &amp; performant digital products.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          <div className="space-y-2">
            {socialLinks.map(link => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-neutral-300">{link.label}</p>
                    <p className="text-[10px] text-neutral-500 truncate">{link.handle}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 text-sm font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20">
            Get in Touch
          </button>
        </div>

        <p className="text-[10px] text-neutral-600 text-center mt-4">
          &copy; 2026 Alex Chen &middot; All rights reserved
        </p>
      </div>
    </div>
  )
}
