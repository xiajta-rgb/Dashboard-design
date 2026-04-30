import { useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Play,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Users,
  Building2,
  Menu,
  X,
} from 'lucide-react'

const navLinks = ['Products', 'Solutions', 'Resources', 'Pricing', 'Enterprise']

const heroStats = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '500+', label: 'Enterprise Clients' },
  { value: '30+', label: 'Global Regions' },
]

const features = [
  {
    icon: Zap,
    title: 'Unmatched Performance',
    desc: 'Edge computing infrastructure delivering sub-50ms latency worldwide. Your applications run faster, your users stay happier.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    desc: 'SOC 2 Type II, ISO 27001, and HIPAA compliant. Zero-trust architecture with end-to-end encryption at every layer.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: BarChart3,
    title: 'Intelligent Analytics',
    desc: 'Real-time insights with predictive analytics powered by machine learning. Make data-driven decisions with confidence.',
    color: 'from-blue-500 to-indigo-500',
  },
]

const partners = [
  'TechCorp', 'DataFlow', 'CloudBase', 'NexGen', 'Synergy', 'Quantum',
]

const solutions = [
  { icon: Building2, title: 'Enterprise', desc: 'Scale with confidence using our enterprise suite' },
  { icon: Users, title: 'Startups', desc: 'Launch faster with developer-first tools' },
  { icon: Globe, title: 'Global Teams', desc: 'Collaborate seamlessly across time zones' },
]

export default function OfficialHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
                <span className="text-xs font-bold text-white">V</span>
              </div>
              <span className="font-bold text-lg tracking-tight">Vertex</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <a key={link} href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-0.5">
                  {link} <ChevronRight className="w-3 h-3 rotate-90 opacity-40" />
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Sign In</a>
            <a href="#" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Get Started
            </a>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-indigo-50 via-violet-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              New: Vertex AI Cloud is now generally available
              <ArrowRight className="w-3 h-3" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
              The infrastructure<br />
              for the <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">modern web</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
              Vertex provides the cloud platform that scales with your ambition. Deploy globally, monitor in real-time, and ship with confidence.
            </p>
            <div className="flex items-center justify-center gap-3 mb-12">
              <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                <Play className="w-4 h-4" /> Watch Overview
              </a>
            </div>
            <div className="flex items-center justify-center gap-8 sm:gap-12">
              {heroStats.map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-1 shadow-xl shadow-slate-200/50">
            <div className="rounded-xl bg-slate-900 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 text-[10px] text-neutral-500 font-mono">vertex-dashboard.app</span>
              </div>
              <div className="h-64 sm:h-80 bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                  {[
                    { label: 'Requests', value: '2.4M', change: '+12%', up: true },
                    { label: 'Latency', value: '48ms', change: '-8%', up: false },
                    { label: 'Uptime', value: '99.99%', change: '0%', up: null },
                  ].map(item => (
                    <div key={item.label} className="rounded-lg bg-white/[0.04] border border-white/[0.06] p-3">
                      <p className="text-[10px] text-neutral-500 mb-1">{item.label}</p>
                      <p className="text-lg font-bold text-white">{item.value}</p>
                      <p className={`text-[10px] ${item.up === true ? 'text-emerald-400' : item.up === false ? 'text-amber-400' : 'text-neutral-500'}`}>
                        {item.change}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why leading companies choose Vertex</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">Enterprise-grade infrastructure with developer-friendly tools. No compromises.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Solutions for every team</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">Whether you're a startup or a Fortune 500, Vertex adapts to your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((sol, i) => {
              const Icon = sol.icon
              return (
                <a key={i} href="#" className="group rounded-xl border border-slate-200 p-6 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                  <Icon className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="text-base font-semibold mb-1">{sol.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{sol.desc}</p>
                  <span className="text-xs text-indigo-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-slate-400 text-center mb-6 uppercase tracking-wider font-medium">Trusted by industry leaders</p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            {partners.map(name => (
              <div key={name} className="flex items-center gap-1.5 text-slate-300 hover:text-slate-500 transition-colors">
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-slate-400">{name[0]}</span>
                </div>
                <span className="text-sm font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Start building today</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">Get started with our generous free tier. No credit card required.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">V</span>
            </div>
            <span className="text-sm font-semibold text-slate-400">Vertex</span>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Status', 'Docs'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">{link}</a>
            ))}
          </div>
          <span className="text-xs text-slate-400">&copy; 2026 Vertex Inc.</span>
        </div>
      </footer>
    </div>
  )
}
