import { useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Play,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Globe,
  Users,
  Building2,
  Menu,
  X,
  Code2,
  Database,
} from 'lucide-react'

const navLinks = ['Platform', 'Solutions', 'Developers', 'Pricing']

const heroStats = [
  { value: '99.999%', label: 'Uptime SLA' },
  { value: '200+', label: 'Enterprise Clients' },
  { value: '<50ms', label: 'Global Latency' },
]

const features = [
  {
    icon: Cpu,
    title: 'Neural Compute Engine',
    desc: 'Custom silicon optimized for AI inference. Run models 10x faster at 1/10th the cost of traditional cloud GPUs.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Shield,
    title: 'Zero-Knowledge Security',
    desc: 'Military-grade encryption with zero-knowledge proofs. Your data stays private, even from us.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: BarChart3,
    title: 'Predictive Scaling',
    desc: 'AI-driven infrastructure that anticipates traffic spikes before they happen. Scale proactively, not reactively.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
]

const codeBlock = `# Deploy in seconds
npx @neuracore/deploy --prod

# AI inference endpoint
curl https://api.neuracore.ai/v1/infer \\
  -d '{"model": "llama-4", "prompt": "..."}'`

const partners = ['Meta', 'Tesla', 'Stripe', 'OpenAI', 'Databricks', 'Anthropic']

const solutions = [
  { icon: Building2, title: 'Enterprise AI', desc: 'Private deployments with custom SLAs' },
  { icon: Code2, title: 'Developer Platform', desc: 'APIs, SDKs, and CLI tools' },
  { icon: Database, title: 'Data Infrastructure', desc: 'Real-time pipelines at petabyte scale' },
]

export default function OfficialDarkPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-xs font-black text-[#050505]">N</span>
              </div>
              <span className="font-bold text-lg tracking-tight">Neuracore</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <a key={link} href="#" className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-0.5">
                  {link} <ChevronRight className="w-3 h-3 rotate-90 opacity-40" />
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Sign In</a>
            <a href="#" className="px-4 py-2 rounded-lg bg-cyan-500 text-[#050505] text-sm font-bold hover:bg-cyan-400 transition-colors">
              Get API Key
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 cursor-pointer">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-cyan-500/[0.06] via-blue-500/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-6">
              <Zap className="w-3 h-3" />
              Neuracore C1 Chip — Now Available
              <ArrowRight className="w-3 h-3" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
              Infrastructure for<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">the AI era</span>
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              The cloud platform purpose-built for AI workloads. From training to inference, Neuracore delivers unmatched performance at scale.
            </p>
            <div className="flex items-center justify-center gap-3 mb-12">
              <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-[#050505] text-sm font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                Start Building <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/5 transition-colors">
                <Play className="w-4 h-4" /> Watch Demo
              </a>
            </div>
            <div className="flex items-center justify-center gap-8 sm:gap-12">
              {heroStats.map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-cyan-500/5">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="ml-3 text-[10px] text-neutral-500 font-mono">terminal</span>
            </div>
            <pre className="p-6 text-xs text-neutral-300 font-mono leading-relaxed overflow-x-auto">
              <code>{codeBlock}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Built for AI-native teams</h2>
            <p className="text-neutral-500 text-sm max-w-lg mx-auto">Custom silicon. Zero-knowledge security. Predictive infrastructure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6 hover:border-cyan-500/20 transition-colors">
                  <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Solutions for every scale</h2>
            <p className="text-neutral-500 text-sm max-w-lg mx-auto">From startup to enterprise, Neuracore adapts to your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((sol, i) => {
              const Icon = sol.icon
              return (
                <a key={i} href="#" className="group rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6 hover:border-cyan-500/20 hover:bg-cyan-500/[0.02] transition-all">
                  <Icon className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="text-base font-semibold mb-1">{sol.title}</h3>
                  <p className="text-sm text-neutral-500 mb-3">{sol.desc}</p>
                  <span className="text-xs text-cyan-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] text-neutral-600 text-center mb-6 uppercase tracking-widest font-bold">Powering the AI revolution</p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            {partners.map(name => (
              <span key={name} className="text-sm font-bold text-neutral-700 hover:text-neutral-400 transition-colors">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Start building with Neuracore</h2>
          <p className="text-neutral-500 text-sm max-w-md mx-auto mb-6">Free tier includes 10K AI inference calls per month. No credit card required.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-[#050505] text-sm font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
              Get API Key <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-neutral-300 text-sm font-medium hover:bg-white/5 transition-colors">
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-8 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-[8px] font-black text-[#050505]">N</span>
            </div>
            <span className="text-sm font-bold text-neutral-600">Neuracore</span>
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Status', 'Docs'].map(link => (
              <a key={link} href="#" className="text-xs text-neutral-600 hover:text-neutral-400 transition-colors">{link}</a>
            ))}
          </div>
          <span className="text-xs text-neutral-600">&copy; 2026 Neuracore Inc.</span>
        </div>
      </footer>
    </div>
  )
}
