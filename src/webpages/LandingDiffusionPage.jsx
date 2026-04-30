import {
  ArrowRight,
  Sparkles,
  Layers,
  Shield,
  Zap,
  Eye,
  BarChart3,
  Globe,
} from 'lucide-react'

const features = [
  { icon: Eye, title: 'Intuitive Vision', desc: 'See your data come alive with ethereal visualizations that feel like dreams.' },
  { icon: Layers, title: 'Layered Depth', desc: 'Multi-dimensional data exploration through soft, luminous layer transitions.' },
  { icon: Shield, title: 'Gentle Security', desc: 'Enterprise-grade protection wrapped in a calm, reassuring interface.' },
  { icon: Zap, title: 'Soft Performance', desc: 'Optimized rendering that flows smoothly like light through water.' },
]

export default function LandingDiffusionPage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a1a] text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#a78bfa]/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#6366f1]/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2d2d5a]/[0.05] rounded-full blur-[200px]" />
      </div>

      <nav className="relative z-10 max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#a78bfa]/15 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#a78bfa]/60" />
          </div>
          <span className="font-semibold text-sm text-white/80">Lumina</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'About'].map(item => (
            <a key={item} href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">Sign In</a>
          <a href="#" className="px-4 py-2 rounded-xl bg-[#a78bfa]/15 border border-[#a78bfa]/20 text-sm text-[#a78bfa]/80 font-medium hover:bg-[#a78bfa]/25 transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      <section className="relative z-10 max-w-5xl mx-auto px-8 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#a78bfa]/10 border border-[#a78bfa]/15 text-[#a78bfa]/60 text-xs font-medium mb-8">
          <Sparkles className="w-3 h-3" /> Diffusion Light — A New Experience
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
          style={{ textShadow: '0 0 40px rgba(167,139,250,0.15)' }}>
          Data that<br />
          <span className="bg-gradient-to-r from-[#a78bfa] to-[#6366f1] bg-clip-text text-transparent">breathes light</span>
        </h1>
        <p className="text-base text-white/25 max-w-xl mx-auto mb-8 leading-relaxed">
          Lumina transforms complex data into soft, luminous experiences. Where every insight glows with gentle clarity and every interaction feels like light through mist.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#a78bfa]/20 border border-[#a78bfa]/25 text-[#a78bfa] text-sm font-semibold hover:bg-[#a78bfa]/30 transition-colors"
            style={{ boxShadow: '0 0 30px rgba(167,139,250,0.1)' }}>
            Start Free <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#" className="px-6 py-3 rounded-xl border border-white/10 text-white/30 text-sm font-medium hover:text-white/50 hover:border-white/15 transition-colors">
            See it Glow
          </a>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-8 pb-16">
        <div className="rounded-2xl border border-[#a78bfa]/10 bg-[#a78bfa]/[0.03] p-8 relative overflow-hidden"
          style={{ boxShadow: '0 0 60px rgba(167,139,250,0.05)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#a78bfa]/[0.02] to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="rounded-xl border border-[#a78bfa]/10 bg-[#a78bfa]/[0.02] p-5 hover:bg-[#a78bfa]/[0.05] hover:border-[#a78bfa]/15 transition-all duration-300 group"
                  style={{ boxShadow: '0 0 20px rgba(167,139,250,0.03)' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#a78bfa]/10 flex items-center justify-center mb-4 group-hover:bg-[#a78bfa]/15 transition-colors"
                    style={{ boxShadow: '0 0 15px rgba(167,139,250,0.05)' }}
                  >
                    <Icon className="w-5 h-5 text-[#a78bfa]/50" />
                  </div>
                  <h3 className="text-sm font-semibold mb-2 text-white/80">{feature.title}</h3>
                  <p className="text-xs text-white/25 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-8 pb-16">
        <div className="rounded-2xl border border-[#a78bfa]/10 bg-[#a78bfa]/[0.03] p-10 text-center"
          style={{ boxShadow: '0 0 40px rgba(167,139,250,0.05)' }}
        >
          <h2 className="text-3xl font-bold mb-3" style={{ textShadow: '0 0 30px rgba(167,139,250,0.1)' }}>
            Let your data glow
          </h2>
          <p className="text-sm text-white/25 max-w-md mx-auto mb-6">
            Start your journey with Lumina. Transform complexity into clarity, darkness into light.
          </p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#a78bfa]/20 border border-[#a78bfa]/25 text-[#a78bfa] text-sm font-semibold hover:bg-[#a78bfa]/30 transition-colors"
            style={{ boxShadow: '0 0 30px rgba(167,139,250,0.1)' }}
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#a78bfa]/5 py-6 px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-white/10">&copy; 2026 Lumina</span>
          <span className="text-xs text-white/10">Diffusion Light</span>
        </div>
      </footer>
    </div>
  )
}
