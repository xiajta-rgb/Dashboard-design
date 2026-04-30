import {
  Github,
  Twitter,
  Mail,
  Globe,
  Phone,
} from 'lucide-react'

export default function BusinessCardSkeuomorphPage() {
  return (
    <div className="w-full min-h-screen bg-[#2c2c3a] flex items-center justify-center p-6 font-sans"
      style={{
        backgroundImage: `radial-gradient(circle at 30% 20%, rgba(201,168,76,0.08) 0%, transparent 50%),
                          radial-gradient(circle at 70% 80%, rgba(201,168,76,0.05) 0%, transparent 50%)`,
      }}
    >
      <div className="w-full max-w-sm">
        <div
          className="rounded-xl p-8 relative"
          style={{
            background: 'linear-gradient(145deg, #3a3a4a 0%, #2c2c3a 50%, #1e1e2e 100%)',
            boxShadow: `
              0 1px 2px rgba(0,0,0,0.3),
              0 4px 8px rgba(0,0,0,0.2),
              0 12px 24px rgba(0,0,0,0.25),
              0 24px 48px rgba(0,0,0,0.2),
              inset 0 1px 0 rgba(255,255,255,0.08),
              inset 0 -1px 0 rgba(0,0,0,0.3)
            `,
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          <div className="text-center mb-6">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, #4a4a5a, #2a2a3a)',
                boxShadow: `
                  3px 3px 6px rgba(0,0,0,0.4),
                  -2px -2px 4px rgba(255,255,255,0.05),
                  inset 0 1px 0 rgba(255,255,255,0.1),
                  inset 0 -1px 0 rgba(0,0,0,0.3)
                `,
                border: '1px solid rgba(201,168,76,0.25)',
              }}
            >
              <span className="text-lg font-bold" style={{ color: '#c9a84c', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>JW</span>
            </div>
            <h1 className="text-lg font-bold text-[#d4b65a] mb-0.5" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>James Whitfield</h1>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7a5a]">Master Craftsman</p>
          </div>

          <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }} />

          <p className="text-xs text-[#8a7a5a]/70 text-center leading-relaxed mb-6 px-2" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>
            Fine woodworking & bespoke furniture. Three generations of craftsmanship, blending traditional techniques with contemporary design.
          </p>

          <div className="space-y-3">
            {[
              { icon: Phone, label: 'Phone', value: '+44 20 7946 0958' },
              { icon: Mail, label: 'Email', value: 'james@whitfield.co' },
              { icon: Globe, label: 'Website', value: 'whitfield.co' },
              { icon: Github, label: 'GitHub', value: '@whitfield' },
            ].map(link => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                  style={{
                    background: 'linear-gradient(145deg, #343448, #2a2a3c)',
                    boxShadow: `
                      2px 2px 4px rgba(0,0,0,0.3),
                      -1px -1px 2px rgba(255,255,255,0.03),
                      inset 0 1px 0 rgba(255,255,255,0.05)
                    `,
                    border: '1px solid rgba(201,168,76,0.08)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(145deg, #3e3e50, #2e2e40)',
                      boxShadow: '1px 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#c9a84c]/60 group-hover:text-[#c9a84c] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#8a7a5a]/50 uppercase tracking-wider">{link.label}</p>
                    <p className="text-xs text-[#c9a84c]/70 group-hover:text-[#c9a84c] transition-colors truncate" style={{ textShadow: '0 1px 1px rgba(0,0,0,0.3)' }}>{link.value}</p>
                  </div>
                </a>
              )
            })}
          </div>

          <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
            <div className="flex items-center justify-center gap-4">
              {['Oak', 'Walnut', 'Ash'].map(wood => (
                <div key={wood} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full border border-[#c9a84c]/20" style={{
                    background: wood === 'Oak' ? '#8B6914' : wood === 'Walnut' ? '#5C4033' : '#C4A882',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05)',
                  }} />
                  <span className="text-[9px] text-[#8a7a5a]/40 uppercase tracking-wider">{wood}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[10px] text-[#8a7a5a]/20 text-center mt-4">
          &copy; 2026 Whitfield & Co. &middot; Skeuomorphism
        </p>
      </div>
    </div>
  )
}
