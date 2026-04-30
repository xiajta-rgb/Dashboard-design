import { useState } from 'react'
import {
  Zap,
  Shield,
  BarChart3,
  Globe,
  ArrowRight,
  Check,
  Star,
  ChevronRight,
  Sparkles,
  Lock,
  Cpu,
  Play,
} from 'lucide-react'

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-100ms response times with edge computing and smart caching' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 Type II compliant with end-to-end encryption and SSO' },
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Live dashboards with 50+ metrics and custom report builder' },
  { icon: Globe, title: 'Global Scale', desc: 'Deployed across 30+ regions with 99.99% uptime SLA' },
  { icon: Cpu, title: 'AI-Powered', desc: 'Intelligent automation that learns from your workflow patterns' },
  { icon: Lock, title: 'Access Control', desc: 'Granular permissions with role-based access and audit logs' },
]

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    desc: 'Perfect for trying out Nexus',
    features: ['Up to 3 projects', '1,000 API calls/month', 'Basic analytics', 'Community support'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    desc: 'For growing teams and businesses',
    features: ['Unlimited projects', '100,000 API calls/month', 'Advanced analytics', 'Priority support', 'Custom integrations', 'Team collaboration'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large-scale deployments',
    features: ['Everything in Pro', 'Unlimited API calls', 'Dedicated infrastructure', '24/7 phone support', 'Custom SLAs', 'On-premise option'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const testimonials = [
  { name: 'Sarah Kim', role: 'CTO, TechFlow', text: 'Nexus transformed our development workflow. We shipped 3x faster within the first month.', avatar: 'SK' },
  { name: 'Marcus Rivera', role: 'Lead Engineer, DataPulse', text: 'The AI-powered automation saved our team 20+ hours per week on repetitive tasks.', avatar: 'MR' },
  { name: 'Elena Volkov', role: 'VP Engineering, CloudBase', text: 'Best developer experience I\'ve encountered. The API design is genuinely delightful.', avatar: 'EV' },
]

const stats = [
  { value: '10K+', label: 'Developers' },
  { value: '99.99%', label: 'Uptime' },
  { value: '50M+', label: 'API Calls/Day' },
  { value: '<100ms', label: 'Avg Response' },
]

export default function LandingPage() {
  const [billing, setBilling] = useState('monthly')

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">Nexus</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {['Features', 'Pricing', 'Testimonials', 'Docs'].map(item => (
              <a key={item} href="#" className="text-xs text-neutral-400 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Sign In</a>
            <a href="#" className="px-4 py-1.5 rounded-lg bg-white text-neutral-900 text-xs font-semibold hover:bg-neutral-100 transition-colors">Get Started</a>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/25 bg-violet-500/10 text-violet-400 text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" />
            Introducing Nexus 2.0 with AI
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Build faster with<br />
            <span className="text-gradient">intelligent APIs</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            The modern API platform that helps developers build, deploy, and scale applications 10x faster. Powered by AI, designed for humans.
          </p>
          <div className="flex items-center justify-center gap-3 mb-12">
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-lg shadow-white/10">
              Start Building <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/5 transition-colors">
              <Play className="w-4 h-4" /> Watch Demo
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map(stat => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything you need</h2>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto">Powerful features designed to accelerate your development workflow from idea to production.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="rounded-xl border border-white/[0.06] bg-[#111111] p-6 hover:border-white/15 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Simple, transparent pricing</h2>
            <p className="text-neutral-400 text-sm">Start free, scale as you grow. No hidden fees.</p>
          </div>
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${billing === 'monthly' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${billing === 'yearly' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              Yearly <span className="text-emerald-400 text-[10px]">-20%</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map(plan => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 ${plan.highlighted ? 'border-violet-500/30 bg-violet-500/[0.03] shadow-lg shadow-violet-500/5' : 'border-white/[0.06] bg-[#111111]'}`}
              >
                <h3 className="text-sm font-semibold mb-1">{plan.name}</h3>
                <p className="text-xs text-neutral-500 mb-4">{plan.desc}</p>
                <div className="mb-5">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-neutral-500">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-neutral-400">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    plan.highlighted
                      ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                      : 'border border-white/10 text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Loved by developers</h2>
            <p className="text-neutral-400 text-sm">See what our community has to say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-[#111111] p-5">
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
                    <p className="text-xs font-medium text-white">{t.name}</p>
                    <p className="text-[10px] text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-violet-500/[0.05] to-cyan-500/[0.05] p-10 text-center">
            <h2 className="text-3xl font-bold mb-3">Ready to build faster?</h2>
            <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">Join 10,000+ developers who are shipping better software with Nexus.</p>
            <div className="flex items-center justify-center gap-3">
              <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-100 transition-colors">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/5 transition-colors">
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-cyan-500" />
            <span className="text-xs font-semibold text-neutral-400">Nexus</span>
          </div>
          <span className="text-xs text-neutral-600">&copy; 2026 Nexus Inc. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
