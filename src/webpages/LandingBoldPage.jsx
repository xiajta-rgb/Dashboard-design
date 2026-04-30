import { useState } from 'react'
import {
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  Check,
  Star,
  Play,
  Sparkles,
  Flame,
  Layers,
  Code2,
  Cpu,
} from 'lucide-react'

const features = [
  { icon: Flame, title: 'Blazing Performance', desc: 'Edge-native runtime with sub-10ms cold starts and zero-config scaling', color: 'text-[#ff006e]' },
  { icon: Cpu, title: 'AI-Native', desc: 'Built-in LLM orchestration, vector search, and intelligent caching', color: 'text-[#8338ec]' },
  { icon: Shield, title: 'Zero-Trust Security', desc: 'End-to-end encryption with automatic threat detection and response', color: 'text-[#ff006e]' },
  { icon: Code2, title: 'DX on Fire', desc: 'Type-safe SDKs, instant previews, and one-click deployments', color: 'text-[#8338ec]' },
  { icon: BarChart3, title: 'Real-time Everything', desc: 'Live metrics, streaming analytics, and instant alerting built in', color: 'text-[#ff006e]' },
  { icon: Layers, title: 'Composable Stack', desc: 'Mix and match services. Plug into any framework. No lock-in.', color: 'text-[#8338ec]' },
]

const plans = [
  {
    name: 'Spark',
    price: '$0',
    period: '/mo',
    features: ['5 projects', '10K AI calls/mo', 'Community', '1GB storage'],
    cta: 'Ignite Free',
    highlighted: false,
  },
  {
    name: 'Blaze',
    price: '$39',
    period: '/mo',
    features: ['Unlimited projects', '1M AI calls/mo', 'Priority support', '100GB storage', 'Custom domains', 'Team collaboration'],
    cta: 'Start Burning',
    highlighted: true,
  },
  {
    name: 'Inferno',
    price: 'Custom',
    period: '',
    features: ['Everything in Blaze', 'Unlimited AI calls', 'Dedicated infra', '24/7 support', 'Custom SLAs', 'On-premise'],
    cta: 'Talk to Us',
    highlighted: false,
  },
]

const testimonials = [
  { name: 'Zara Kim', role: 'Founder, NeonLabs', text: 'Pyro cut our deploy time from 15 min to 8 seconds. Game changer.', avatar: 'ZK' },
  { name: 'Rio Santos', role: 'CTO, WarpSpeed', text: 'The AI orchestration is insane. We built our entire product on it.', avatar: 'RS' },
  { name: 'Ava Chen', role: 'Lead Dev, Flux', text: 'Finally a platform that matches our energy. Pure developer joy.', avatar: 'AC' },
]

export default function LandingBoldPage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0015] text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#ff006e]/[0.06] blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#8338ec]/[0.06] blur-[150px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0015]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ff006e] to-[#8338ec] flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-sm tracking-tight">PYRO</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Features', 'Pricing', 'Docs', 'Blog'].map(item => (
              <a key={item} href="#" className="text-xs text-white/40 hover:text-white transition-colors font-medium">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-xs text-white/40 hover:text-white transition-colors font-medium">Log in</a>
            <a href="#" className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#ff006e] to-[#8338ec] text-white text-xs font-bold hover:opacity-90 transition-opacity">
              Get Pyro
            </a>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff006e]/30 bg-[#ff006e]/10 text-[#ff006e] text-xs font-bold mb-6">
            <Flame className="w-3 h-3" />
            PYRO 3.0 — NOW WITH AI AGENTS
          </div>
          <h1 className="text-6xl sm:text-7xl font-black tracking-tighter mb-6 leading-[0.95]">
            SET YOUR<br />
            <span className="bg-gradient-to-r from-[#ff006e] to-[#8338ec] bg-clip-text text-transparent">CODE ON FIRE</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            The AI-native developer platform that ships at the speed of thought. Build, deploy, and scale with zero friction.
          </p>
          <div className="flex items-center justify-center gap-3 mb-12">
            <a href="#" className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#ff006e] to-[#8338ec] text-white text-sm font-black hover:opacity-90 transition-opacity shadow-lg shadow-[#ff006e]/20">
              START FREE <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-white/60 text-sm font-bold hover:bg-white/5 transition-colors">
              <Play className="w-4 h-4" /> DEMO
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: '50K+', label: 'Developers' },
              { value: '<10ms', label: 'Cold Start' },
              { value: '1M+', label: 'Deploys/Day' },
              { value: '99.99%', label: 'Uptime' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-2xl font-black bg-gradient-to-r from-[#ff006e] to-[#8338ec] bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black tracking-tight mb-3">BUILT DIFFERENT</h2>
            <p className="text-white/30 text-sm font-medium">Not another platform. A new paradigm.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-[#ff006e]/20 hover:bg-white/[0.04] transition-all duration-300">
                  <Icon className={`w-6 h-6 ${feature.color} mb-4`} />
                  <h3 className="text-sm font-bold mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black tracking-tight mb-3">PICK YOUR FLAME</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 ${plan.highlighted ? 'border-[#ff006e]/30 bg-[#ff006e]/[0.03] shadow-lg shadow-[#ff006e]/5' : 'border-white/[0.06] bg-white/[0.02]'}`}
              >
                <h3 className="text-sm font-black mb-1">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-sm text-white/30">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                      <Check className="w-3.5 h-3.5 text-[#ff006e] flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl text-sm font-black transition-all cursor-pointer ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-[#ff006e] to-[#8338ec] text-white hover:opacity-90'
                      : 'border border-white/10 text-white/50 hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black tracking-tight mb-3">DEVS ❤️ PYRO</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="w-3 h-3 text-[#ff006e] fill-[#ff006e]" />
                  ))}
                </div>
                <p className="text-xs text-white/40 leading-relaxed mb-4 font-medium">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff006e] to-[#8338ec] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold">{t.name}</p>
                    <p className="text-[10px] text-white/30">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[#ff006e]/20 bg-gradient-to-br from-[#ff006e]/[0.05] to-[#8338ec]/[0.05] p-12 text-center">
            <Sparkles className="w-10 h-10 text-[#ff006e] mx-auto mb-4" />
            <h2 className="text-4xl font-black tracking-tight mb-3">READY TO IGNITE?</h2>
            <p className="text-white/30 text-sm max-w-md mx-auto mb-6 font-medium">Join 50,000+ developers building the future with Pyro.</p>
            <a href="#" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ff006e] to-[#8338ec] text-white text-sm font-black hover:opacity-90 transition-opacity shadow-lg shadow-[#ff006e]/20">
              GET PYRO FREE <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-6 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-[10px] font-bold text-white/20">&copy; 2026 PYRO</span>
          <span className="text-[10px] font-bold text-[#ff006e]/40">BURN BRIGHT</span>
        </div>
      </footer>
    </div>
  )
}
