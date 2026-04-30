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
  Users,
  Globe,
  Layers,
  Code2,
} from 'lucide-react'

const features = [
  { icon: Zap, title: 'Instant Setup', desc: 'Go from signup to production in under 5 minutes. Zero config required.' },
  { icon: Shield, title: 'Bank-Grade Security', desc: 'SOC 2 compliant with automatic encryption and vulnerability scanning.' },
  { icon: BarChart3, title: 'Live Dashboards', desc: 'Monitor every metric in real-time with customizable alert thresholds.' },
  { icon: Code2, title: 'Developer First', desc: 'SDKs for every major language. Beautiful docs. Intuitive APIs.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Built-in roles, permissions, and audit trails for team workflows.' },
  { icon: Globe, title: 'Global CDN', desc: 'Content delivered from 40+ edge locations for blazing fast load times.' },
]

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['3 projects', '1K API calls/day', 'Community support', 'Basic analytics'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$24',
    period: '/month',
    features: ['Unlimited projects', '100K API calls/day', 'Priority support', 'Advanced analytics', 'Custom domains', 'Team seats'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    period: '',
    features: ['Everything in Pro', 'Unlimited API calls', 'Dedicated support', 'Custom SLAs', 'SSO & SAML', 'On-premise option'],
    cta: 'Contact Us',
    highlighted: false,
  },
]

const testimonials = [
  { name: 'Amy Liu', role: 'CTO, Flowbase', text: 'We migrated from AWS in a weekend. The DX is unmatched.', avatar: 'AL' },
  { name: 'James Park', role: 'Founder, ShipFast', text: 'Shipped our MVP in 2 days instead of 2 weeks. Incredible tooling.', avatar: 'JP' },
  { name: 'Nina Costa', role: 'VP Eng, ScaleUp', text: 'Our team productivity doubled. The collaboration features are genius.', avatar: 'NC' },
]

const logos = ['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma', 'Slack']

export default function LandingLightPage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">Stackflow</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Features', 'Pricing', 'Docs', 'Blog'].map(item => (
              <a key={item} href="#" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Log in</a>
            <a href="#" className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors">Start Free</a>
          </div>
        </div>
      </nav>

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" />
            Launch week — 40% off Pro plans
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Ship faster.<br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Worry less.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            The modern developer platform that handles infrastructure so you can focus on building products your users love.
          </p>
          <div className="flex items-center justify-center gap-3 mb-10">
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
              Start Building <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
              <Play className="w-4 h-4" /> Watch Demo
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> Free tier available</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> No credit card required</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> Setup in 2 minutes</span>
          </div>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-1 shadow-xl shadow-slate-200/50">
            <div className="rounded-xl bg-white overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                <span className="ml-3 text-[10px] text-slate-400 font-mono">stackflow.dev/dashboard</span>
              </div>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-white p-6 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                  {[
                    { label: 'Deployments', value: '1,247', change: '+23%' },
                    { label: 'Build Time', value: '12s', change: '-45%' },
                    { label: 'Uptime', value: '99.99%', change: '0%' },
                  ].map(item => (
                    <div key={item.label} className="rounded-lg border border-slate-100 bg-white p-3 shadow-sm">
                      <p className="text-[10px] text-slate-400 mb-1">{item.label}</p>
                      <p className="text-lg font-bold text-slate-900">{item.value}</p>
                      <p className="text-[10px] text-emerald-600">{item.change}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Everything you need to ship</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">From development to production, Stackflow has you covered.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Simple pricing</h2>
            <p className="text-slate-500 text-sm">Start free, upgrade when you're ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 ${plan.highlighted ? 'border-indigo-200 bg-indigo-50/30 shadow-lg shadow-indigo-100/50' : 'border-slate-200 bg-white'}`}
              >
                <h3 className="text-sm font-semibold mb-1">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-slate-400">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    plan.highlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Loved by developers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] text-slate-400 text-center mb-4 uppercase tracking-wider font-medium">Trusted by teams at</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {logos.map(name => (
              <span key={name} className="text-sm font-bold text-slate-300">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Start shipping today</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">Join thousands of developers building with Stackflow.</p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-6 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs text-slate-400">&copy; 2026 Stackflow Inc.</span>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Docs'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
