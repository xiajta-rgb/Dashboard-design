import { useState } from 'react'
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Shield,
  Cpu,
  Satellite,
  Activity,
  Zap,
  Lock,
} from 'lucide-react'

const navLinks = ['Systems', 'Network', 'Defense', 'About']

const capabilities = [
  { icon: Shield, title: 'Threat Detection', desc: 'Real-time threat intelligence with autonomous response protocols.', status: 'ACTIVE' },
  { icon: Cpu, title: 'Neural Processing', desc: 'Quantum-enhanced computation for pattern recognition at scale.', status: 'ONLINE' },
  { icon: Satellite, title: 'Orbital Network', desc: 'Low-orbit satellite mesh for global secure communications.', status: 'LINKED' },
  { icon: Activity, title: 'Biometric Auth', desc: 'Multi-factor biometric verification with zero-trust architecture.', status: 'READY' },
]

const stats = [
  { label: 'Nodes Active', value: '12,847' },
  { label: 'Threats Blocked', value: '2.4M' },
  { label: 'Uptime', value: '99.997%' },
  { label: 'Latency', value: '<0.3ms' },
]

export default function OfficialHUDPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-[#00d4ff] font-mono relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #00d4ff 1px, #00d4ff 2px)',
          backgroundSize: '100% 4px',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />

      <nav className="relative z-10 max-w-6xl mx-auto px-8 h-16 flex items-center justify-between border-b border-[#00d4ff]/10">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-[#00d4ff]/40 flex items-center justify-center relative">
            <Shield className="w-4 h-4 text-[#00d4ff]/60" />
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" />
          </div>
          <span className="text-sm font-bold tracking-wider text-[#00d4ff]/80">NEXUS.DEF</span>
          <span className="text-[9px] text-[#00ff88]/50 ml-1">v4.2.1</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link} href="#" className="text-[11px] text-[#00d4ff]/40 hover:text-[#00d4ff]/80 tracking-wider uppercase transition-colors">{link}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[9px] text-[#00ff88]/50">
            <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-pulse" /> SYSTEM ONLINE
          </span>
          <a href="#" className="px-4 py-1.5 border border-[#00d4ff]/30 text-[11px] text-[#00d4ff]/60 hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-colors uppercase tracking-wider">
            Access
          </a>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 cursor-pointer">
          {mobileMenuOpen ? <X className="w-4 h-4 text-[#00d4ff]/60" /> : <Menu className="w-4 h-4 text-[#00d4ff]/60" />}
        </button>
      </nav>

      <section className="relative z-10 max-w-6xl mx-auto px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-px h-6 bg-[#00d4ff]/30" />
              <span className="text-[10px] text-[#00d4ff]/30 uppercase tracking-[0.3em]">// system.init</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6" style={{ textShadow: '0 0 30px rgba(0,212,255,0.15)' }}>
              Next-gen<br />
              <span className="text-[#00d4ff]/30">defense grid</span>
            </h1>
          </div>
          <div className="lg:col-span-5 pb-2">
            <p className="text-xs text-[#00d4ff]/25 leading-relaxed mb-6 max-w-sm">
              Autonomous threat detection and response at planetary scale. Built for the era of quantum warfare and AI-driven cybernetics.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-2 px-5 py-2.5 border border-[#00d4ff]/30 text-[11px] text-[#00d4ff]/60 hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-colors uppercase tracking-wider">
                Request Access <ArrowRight className="w-3 h-3" />
              </a>
              <a href="#" className="text-[10px] text-[#00d4ff]/30 hover:text-[#00d4ff]/60 transition-colors flex items-center gap-1 uppercase tracking-wider">
                Briefing <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-8 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="border border-[#00d4ff]/10 bg-[#00d4ff]/[0.02] p-4">
              <p className="text-[9px] text-[#00d4ff]/25 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-[#00d4ff]/60" style={{ textShadow: '0 0 10px rgba(0,212,255,0.1)' }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-8 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-px h-5 bg-[#00d4ff]/30" />
          <h2 className="text-[10px] text-[#00d4ff]/30 uppercase tracking-[0.3em]">// capabilities</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <div key={i} className="border border-[#00d4ff]/10 bg-[#00d4ff]/[0.02] p-5 hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/[0.04] transition-colors group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 border border-[#00d4ff]/15 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#00d4ff]/40 group-hover:text-[#00d4ff]/60 transition-colors" />
                  </div>
                  <span className="text-[8px] text-[#00ff88]/40 uppercase tracking-wider px-2 py-0.5 border border-[#00ff88]/15 bg-[#00ff88]/[0.03]">
                    {cap.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#00d4ff]/60 mb-1.5 group-hover:text-[#00d4ff]/80 transition-colors">{cap.title}</h3>
                <p className="text-[10px] text-[#00d4ff]/20 leading-relaxed">{cap.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-8 pb-16">
        <div className="border border-[#00d4ff]/10 bg-[#00d4ff]/[0.02] p-8 text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ textShadow: '0 0 20px rgba(0,212,255,0.1)' }}>Initialize connection</h2>
          <p className="text-[10px] text-[#00d4ff]/25 mb-5 max-w-md mx-auto">Request clearance-level access to the Nexus defense network. Qualified personnel only.</p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#00d4ff]/30 text-[11px] text-[#00d4ff]/60 hover:text-[#00d4ff] hover:border-[#00d4ff]/50 transition-colors uppercase tracking-wider">
            <Lock className="w-3 h-3" /> Request Clearance
          </a>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#00d4ff]/10 py-6 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-[9px] text-[#00d4ff]/15 uppercase tracking-wider">NEXUS.DEF // 2026</span>
          <span className="text-[9px] text-[#00d4ff]/15 uppercase tracking-wider">HUD/Sci-Fi</span>
        </div>
      </footer>
    </div>
  )
}
