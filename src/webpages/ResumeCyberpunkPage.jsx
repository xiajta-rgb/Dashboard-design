import {
  Mail,
  MapPin,
  Terminal,
  Cpu,
  Zap,
  Shield,
  Code2,
} from 'lucide-react'

const experiences = [
  { role: 'SYSTEM_ARCH', org: 'NEXUS_CORP', period: '2084.03–', level: 'LVL_9' },
  { role: 'NET_RUNNER', org: 'SHADOW_NET', period: '2081–84', level: 'LVL_7' },
  { role: 'CODE_SLINGER', org: 'ZERO_DAY', period: '2078–81', level: 'LVL_5' },
]

const implants = [
  { name: 'React/Fiber', pct: 98 },
  { name: 'Neural Rust', pct: 92 },
  { name: 'Quantum Py', pct: 87 },
  { name: 'Solid State', pct: 95 },
]

export default function ResumeCyberpunkPage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0010] text-[#00f0ff] font-mono relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00f0ff 2px, #00f0ff 3px)',
        backgroundSize: '100% 4px',
      }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10 border-b border-[#ff003c]/30 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4 text-[#ff003c]" />
            <span className="text-[10px] text-[#ff003c]/60 uppercase tracking-widest">// identity_scan.init</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase leading-[0.95] mb-2" style={{ textShadow: '0 0 20px rgba(0,240,255,0.3)' }}>
            VOID<br />
            <span className="text-[#ff003c]" style={{ textShadow: '0 0 20px rgba(255,0,60,0.3)' }}>RUNNER</span>
          </h1>
          <p className="text-xs text-[#00f0ff]/40 uppercase tracking-[0.2em] mb-4">Full-Stack Netrunner · System Architect</p>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-[10px] text-[#00f0ff]/60 border border-[#00f0ff]/20 px-2 py-1 bg-[#00f0ff]/5">
              <Mail className="w-3 h-3" /> void@neon.net
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-[#00f0ff]/60 border border-[#00f0ff]/20 px-2 py-1 bg-[#00f0ff]/5">
              <MapPin className="w-3 h-3" /> Neo Tokyo, Sector 7
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-[#ff003c]/60 border border-[#ff003c]/20 px-2 py-1 bg-[#ff003c]/5">
              <Zap className="w-3 h-3" /> STATUS: ACTIVE
            </span>
          </div>
        </header>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-[#ff003c]" />
            <h2 className="text-xs text-[#ff003c] uppercase tracking-[0.2em]">// experience_log</h2>
          </div>
          <div className="space-y-3">
            {experiences.map((exp, i) => (
              <div key={i} className="border border-[#00f0ff]/15 bg-[#00f0ff]/[0.02] p-4 hover:border-[#00f0ff]/30 hover:bg-[#00f0ff]/[0.04] transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#00f0ff]" style={{ textShadow: '0 0 8px rgba(0,240,255,0.2)' }}>{exp.role}</h3>
                    <p className="text-[10px] text-[#ff003c]/60 uppercase">@{exp.org}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#00f0ff]/40">{exp.period}</span>
                    <p className="text-[10px] text-[#ff003c]/50">{exp.level}</p>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-[#00f0ff]/20 via-[#ff003c]/10 to-transparent" />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-[#ff003c]" />
            <h2 className="text-xs text-[#ff003c] uppercase tracking-[0.2em]">// skill_implants</h2>
          </div>
          <div className="space-y-3">
            {implants.map(implant => (
              <div key={implant.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#00f0ff]/60 uppercase">{implant.name}</span>
                  <span className="text-[10px] text-[#ff003c]/50">{implant.pct}%</span>
                </div>
                <div className="h-2 bg-[#00f0ff]/10 border border-[#00f0ff]/15">
                  <div className="h-full bg-gradient-to-r from-[#00f0ff]/40 to-[#ff003c]/40" style={{ width: `${implant.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-[#ff003c]" />
            <h2 className="text-xs text-[#ff003c] uppercase tracking-[0.2em]">// certifications</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['NEURAL_LINK_CERT', 'QUANTUM_AUTH', 'ZERO_DAY_BADGE', 'SHADOW_OPS'].map(cert => (
              <span key={cert} className="text-[9px] text-[#00f0ff]/50 border border-[#00f0ff]/15 px-2 py-1 bg-[#00f0ff]/[0.03] uppercase">{cert}</span>
            ))}
          </div>
        </section>

        <footer className="pt-6 border-t border-[#ff003c]/20">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[#00f0ff]/20">// END_TRANSMISSION</span>
            <span className="text-[9px] text-[#ff003c]/20">CYBERPUNK_RÉSUMÉ_v2.0</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
