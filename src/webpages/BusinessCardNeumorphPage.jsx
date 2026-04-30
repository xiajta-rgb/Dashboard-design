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
  { icon: Github, label: 'GitHub', href: '#', handle: '@emilyzhao' },
  { icon: Twitter, label: 'Twitter', href: '#', handle: '@emilyzhao_dev' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', handle: 'in/emilyzhao' },
  { icon: Mail, label: 'Email', href: '#', handle: 'emily@zhao.dev' },
  { icon: Globe, label: 'Website', href: '#', handle: 'emilyzhao.dev' },
]

export default function BusinessCardNeumorphPage() {
  return (
    <div className="w-full min-h-screen bg-[#e0e5ec] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl bg-[#e0e5ec] p-8 shadow-[8px_8px_16px_#b8bec7,-8px_-8px_16px_#ffffff]">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#e0e5ec] mx-auto mb-4 flex items-center justify-center shadow-[inset_4px_4px_8px_#b8bec7,inset_-4px_-4px_8px_#ffffff]">
              <span className="text-2xl font-bold text-[#6b7280]">EZ</span>
            </div>
            <h1 className="text-xl font-bold text-[#3a3f47] mb-0.5">Emily Zhao</h1>
            <p className="text-sm text-[#8b95a5] font-semibold mb-2">Product Designer</p>
            <div className="flex items-center justify-center gap-1.5 text-[#8b95a5]">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">San Francisco, CA</span>
            </div>
          </div>

          <p className="text-xs text-[#8b95a5] text-center leading-relaxed mb-6 px-2">
            Designing intuitive products that people love. Focused on design systems, accessibility, and human-centered design.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-[#b8bec7] to-transparent mb-6" />

          <div className="space-y-3">
            {socialLinks.map(link => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#e0e5ec] shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_5px_#b8bec7,inset_-2px_-2px_5px_#ffffff] transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#e0e5ec] flex items-center justify-center shadow-[inset_2px_2px_4px_#b8bec7,inset_-2px_-2px_4px_#ffffff] group-hover:shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff] transition-all duration-200">
                    <Icon className="w-4 h-4 text-[#8b95a5] group-hover:text-[#6366f1] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#3a3f47]">{link.label}</p>
                    <p className="text-[10px] text-[#8b95a5] truncate">{link.handle}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 text-[#b8bec7] group-hover:text-[#6366f1] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#e0e5ec] text-[#3a3f47] text-sm font-semibold shadow-[4px_4px_8px_#b8bec7,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_5px_#b8bec7,inset_-2px_-2px_5px_#ffffff] transition-all duration-200 active:shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]">
            <Sparkles className="w-4 h-4 text-[#6366f1]" /> Say Hello
          </button>
        </div>

        <p className="text-[10px] text-[#b8bec7] text-center mt-4">
          &copy; 2026 Emily Zhao &middot; Soft UI
        </p>
      </div>
    </div>
  )
}
