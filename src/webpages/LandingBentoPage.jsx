import {
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  Check,
  Star,
  Play,
  Layers,
  Cpu,
  Globe,
  Lock,
  Sparkles,
} from 'lucide-react'

const bentoFeatures = [
  {
    title: 'Lightning Performance',
    desc: 'Sub-50ms response times with edge computing and intelligent caching across 40+ global regions.',
    icon: Zap,
    span: 'col-span-1 sm:col-span-2 row-span-1',
    gradient: 'from-violet-500 to-indigo-600',
  },
  {
    title: 'AI-Powered',
    desc: 'Intelligent automation that learns your workflow patterns and optimizes in real-time.',
    icon: Cpu,
    span: 'col-span-1 row-span-1',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Global Scale',
    desc: 'Deploy to 40+ regions with one click.',
    icon: Globe,
    span: 'col-span-1 row-span-1',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Enterprise Security',
    desc: 'SOC 2 Type II compliant with end-to-end encryption, SSO, and zero-trust architecture for every request.',
    icon: Shield,
    span: 'col-span-1 sm:col-span-2 row-span-1',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Real-time Analytics',
    desc: 'Live dashboards with 50+ metrics, custom reports, and predictive alerting built right in.',
    icon: BarChart3,
    span: 'col-span-1 sm:col-span-2 row-span-1',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Access Control',
    desc: 'Granular RBAC with audit logs.',
    icon: Lock,
    span: 'col-span-1 row-span-1',
    gradient: 'from-fuchsia-500 to-purple-600',
  },
  {
    title: 'Composable',
    desc: 'Mix and match any service.',
    icon: Layers,
    span: 'col-span-1 row-span-1',
    gradient: 'from-sky-500 to-indigo-600',
  },
]

const plans = [
  { name: 'Free', price: '$0', period: '/mo', features: ['3 projects', '1K calls/day', 'Community'], cta: 'Start Free' },
  { name: 'Pro', price: '$29', period: '/mo', features: ['Unlimited projects', '100K calls/day', 'Priority support', 'Custom domains'], cta: 'Start Trial', highlighted: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['Everything in Pro', 'Unlimited calls', 'Dedicated support', 'Custom SLAs'], cta: 'Contact Sales' },
]

const testimonials = [
  { name: 'Sarah Kim', role: 'CTO, TechFlow', text: 'Shipped 3x faster within the first month.', avatar: 'SK' },
  { name: 'Marcus R.', role: 'Lead Eng, DataPulse', text: 'Saved 20+ hours per week on repetitive tasks.', avatar: 'MR' },
  { name: 'Elena V.', role: 'VP Eng, CloudBase', text: 'Best developer experience I\'ve encountered.', avatar: 'EV' },
]

export default function LandingBentoPage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">Orbit</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Features', 'Pricing', 'Docs'].map(item => (
              <a key={item} href="#" className="text-xs text-neutral-400 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Sign In</a>
            <a href="#" className="px-4 py-1.5 rounded-lg bg-white text-neutral-900 text-xs font-semibold hover:bg-neutral-100 transition-colors">Get Started</a>
          </div>
        </div>
      </nav>

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/25 bg-violet-500/10 text-violet-400 text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" /> Introducing Orbit 2.0
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Build faster with<br />
            <span className="text-gradient">intelligent APIs</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            The modern API platform that helps developers build, deploy, and scale applications 10x faster.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-lg shadow-white/10">
              Start Building <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/5 transition-colors">
              <Play className="w-4 h-4" /> Watch Demo
            </a>
          </div>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Everything you need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 auto-rows-[140px]">
            {bentoFeatures.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className={`${feature.span} rounded-2xl border border-white/[0.06] bg-[#111111] p-5 flex flex-col justify-between hover:border-white/15 transition-colors overflow-hidden relative group`}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-[0.06] blur-2xl group-hover:opacity-[0.1] transition-opacity pointer-events-none`} />
                  <div className="relative z-10">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-3`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Simple pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 ${plan.highlighted ? 'border-violet-500/30 bg-violet-500/[0.03] shadow-lg shadow-violet-500/5' : 'border-white/[0.06] bg-[#111111]'}`}
              >
                <h3 className="text-sm font-semibold mb-1">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-neutral-500">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-neutral-400">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    plan.highlighted ? 'bg-white text-neutral-900 hover:bg-neutral-100' : 'border border-white/10 text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Loved by developers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#111111] p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium">{t.name}</p>
                    <p className="text-[10px] text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-violet-500/[0.05] to-cyan-500/[0.05] p-10 text-center">
            <h2 className="text-3xl font-bold mb-3">Ready to build faster?</h2>
            <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">Join 10,000+ developers shipping better software with Orbit.</p>
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-100 transition-colors">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-neutral-600">&copy; 2026 Orbit Inc.</span>
          <span className="text-xs text-neutral-600">Built for developers</span>
        </div>
      </footer>
    </div>
  )
}
