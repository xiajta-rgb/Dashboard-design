import {
  Github,
  Twitter,
  Mail,
  Globe,
  Heart,
  Sparkles,
} from 'lucide-react'

const socials = [
  { icon: Github, label: 'GitHub', handle: '@mochi', color: '#e8c8b0' },
  { icon: Twitter, label: 'Twitter', handle: '@mochi', color: '#d4a0a0' },
  { icon: Mail, label: 'Email', handle: 'hi@mochi.design', color: '#c8b8a0' },
  { icon: Globe, label: 'Website', handle: 'mochi.design', color: '#b8c8b0' },
]

export default function BusinessCardCreamPage() {
  return (
    <div className="w-full min-h-screen bg-[#faf5f0] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm">
        <div className="rounded-[28px] bg-[#f5ede4] p-8 relative overflow-hidden"
          style={{
            boxShadow: '6px 6px 12px rgba(0,0,0,0.04), -4px -4px 8px rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
            <Heart className="w-16 h-16 text-[#d4a0a0] fill-[#d4a0a0]" />
          </div>

          <div className="text-center mb-6 relative z-10">
            <div className="w-20 h-20 rounded-[20px] mx-auto mb-4 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #e8c8b0, #d4a0a0)',
                boxShadow: '3px 3px 6px rgba(0,0,0,0.06), -2px -2px 4px rgba(255,255,255,0.6), inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            >
              <span className="text-lg font-bold text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Mochi</span>
            </div>
            <h1 className="text-xl font-bold text-[#5a4a3a] mb-0.5">Mochi Tanaka</h1>
            <p className="text-xs font-medium text-[#b8a898]">UI Designer & Illustrator</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Sparkles className="w-3 h-3 text-[#d4a0a0]" />
              <span className="text-[10px] text-[#c8b8a8]">Making things soft & sweet</span>
              <Sparkles className="w-3 h-3 text-[#d4a0a0]" />
            </div>
          </div>

          <p className="text-xs text-[#a89888] text-center leading-relaxed mb-6 px-2">
            Designing gentle, warm interfaces that make people smile. Specializing in cute UI, illustration, and brand identity 🍡
          </p>

          <div className="h-px bg-[#e8d8c8] mb-6" />

          <div className="space-y-2.5">
            {socials.map(link => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#faf5f0] hover:bg-white transition-colors group"
                  style={{
                    boxShadow: '2px 2px 4px rgba(0,0,0,0.03), -1px -1px 2px rgba(255,255,255,0.6)',
                  }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${link.color}30`,
                    }}
                  >
                    <Icon className="w-4 h-4 text-[#8a7a6a]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#5a4a3a]">{link.label}</p>
                    <p className="text-[10px] text-[#b8a898] truncate">{link.handle}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 text-[#d8c8b8] group-hover:text-[#b8a898] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-semibold text-[#5a4a3a] transition-colors"
            style={{
              background: 'linear-gradient(135deg, #e8c8b0, #d4a0a0)',
              boxShadow: '3px 3px 6px rgba(0,0,0,0.06), -2px -2px 4px rgba(255,255,255,0.6)',
            }}
          >
            <Heart className="w-4 h-4 text-white" /> Say Hello
          </button>
        </div>

        <p className="text-[10px] text-[#c8b8a8] text-center mt-4">
          &copy; 2026 Mochi Tanaka &middot; Cream UI
        </p>
      </div>
    </div>
  )
}
