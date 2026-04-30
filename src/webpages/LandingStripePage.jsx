import {
  ArrowRight,
  Check,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Lock,
  Code2,
  Play,
  Sparkles,
} from 'lucide-react'

const features = [
  { icon: Zap, title: 'Instant Payouts', desc: 'Settle transactions in under 30 seconds with our real-time settlement engine.' },
  { icon: Shield, title: 'Fraud Protection', desc: 'ML-powered fraud detection with 99.98% accuracy and zero false positives.' },
  { icon: Globe, title: 'Global Coverage', desc: 'Accept payments in 135+ currencies across 195 countries with local acquiring.' },
  { icon: Code2, title: 'Developer First', desc: 'Beautiful APIs, SDKs for every platform, and extensive documentation.' },
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Monitor every transaction as it happens with sub-second dashboard updates.' },
  { icon: Lock, title: 'Enterprise Security', desc: 'PCI DSS Level 1, SOC 2 Type II, and GDPR compliant out of the box.' },
]

const logos = ['Vercel', 'Linear', 'Notion', 'Figma', 'Raycast', 'Arc']

export default function LandingStripePage() {
  return (
    <div className="w-full min-h-screen bg-[#0a2540] text-white font-sans">
      <nav className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#635bff] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm">Payflow</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Products', 'Solutions', 'Developers', 'Pricing'].map(item => (
            <a key={item} href="#" className="text-sm text-[#8899aa] hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-[#8899aa] hover:text-white transition-colors">Sign In</a>
          <a href="#" className="px-4 py-2 rounded-lg bg-white text-[#0a2540] text-sm font-semibold hover:bg-[#f0f0f0] transition-colors shadow-sm">Start Now</a>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#635bff]/15 border border-[#635bff]/25 text-[#635bff] text-xs font-medium mb-6">
          <Sparkles className="w-3 h-3" /> New: Instant Payouts for Platforms
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
          Financial infrastructure<br />for the internet
        </h1>
        <p className="text-lg text-[#8899aa] max-w-2xl mx-auto mb-8 leading-relaxed">
          Millions of companies use Payflow to accept payments, grow their revenue, and accelerate new business opportunities.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#635bff] text-white text-sm font-semibold hover:bg-[#7c6fff] transition-colors shadow-lg shadow-[#635bff]/25">
            Start Now <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a4a6a] text-[#8899aa] text-sm font-medium hover:text-white hover:border-[#4a6a8a] transition-colors">
            <Play className="w-4 h-4" /> Watch Demo
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-12">
        <div className="rounded-2xl bg-[#0d2d4a] border border-[#1a3d5a] p-8 text-center">
          <p className="text-xs text-[#5a7a9a] uppercase tracking-wider mb-6">Trusted by industry leaders</p>
          <div className="flex items-center justify-center flex-wrap gap-8">
            {logos.map(logo => (
              <span key={logo} className="text-lg font-bold text-[#2a4a6a]">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-16">
        <h2 className="text-3xl font-bold text-center mb-3">A fully integrated suite of financial products</h2>
        <p className="text-sm text-[#8899aa] text-center max-w-xl mx-auto mb-10">Reduce costs, grow revenue, and run your business more efficiently with a blended payments solution.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="rounded-xl bg-[#0d2d4a]/50 border border-[#1a3d5a] p-6 hover:border-[#2a5a7a] transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[#635bff]/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#635bff]" />
                </div>
                <h3 className="text-sm font-semibold mb-2">{feature.title}</h3>
                <p className="text-xs text-[#6a8a9a] leading-relaxed">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 leading-tight">Ready to get started?</h2>
            <p className="text-sm text-[#8899aa] leading-relaxed mb-6">Explore our docs, create an account, or contact us to start building today.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="px-5 py-2.5 rounded-lg bg-[#635bff] text-white text-sm font-semibold hover:bg-[#7c6fff] transition-colors">Start Now</a>
              <a href="#" className="px-5 py-2.5 rounded-lg border border-[#2a4a6a] text-sm text-[#8899aa] hover:text-white hover:border-[#4a6a8a] transition-colors">Contact Sales</a>
            </div>
          </div>
          <div className="rounded-xl bg-[#0d2d4a] border border-[#1a3d5a] p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[10px] text-[#5a7a9a] font-mono">terminal</span>
            </div>
            <pre className="text-xs font-mono text-[#00d4aa] leading-relaxed">
{`$ curl https://api.payflow.com/v1/charges \\
  -u sk_test_xxx: \\
  -d amount=2000 \\
  -d currency=usd \\
  -d "description=Test charge"

{
  "id": "ch_1NqRST...",
  "amount": 2000,
  "status": "succeeded"
}`}
            </pre>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1a3d5a] py-6 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs text-[#5a7a9a]">&copy; 2026 Payflow Inc.</span>
          <span className="text-xs text-[#5a7a9a]">Stripe-inspired</span>
        </div>
      </footer>
    </div>
  )
}
