import {
  ArrowRight,
  Layers,
  Box,
  Eye,
  Sparkles,
  Cpu,
  Zap,
  Globe,
} from 'lucide-react'

const features = [
  { icon: Box, title: '3D Workspaces', desc: 'Create and navigate immersive 3D environments with intuitive spatial controls.', depth: 'translate-z-4' },
  { icon: Eye, title: 'Gaze Interaction', desc: 'Interact with elements using natural eye tracking and gesture recognition.', depth: 'translate-z-8' },
  { icon: Layers, title: 'Depth Layers', desc: 'Organize content in Z-space with true parallax and depth perception.', depth: 'translate-z-12' },
  { icon: Cpu, title: 'Spatial Compute', desc: 'Harness on-device AI for real-time spatial understanding and mapping.', depth: 'translate-z-4' },
  { icon: Zap, title: 'Zero Latency', desc: 'Sub-millisecond response for hand tracking and spatial interactions.', depth: 'translate-z-8' },
  { icon: Globe, title: 'Shared Spaces', desc: 'Collaborate in persistent spatial rooms with anyone, anywhere.', depth: 'translate-z-12' },
]

export default function LandingSpatialPage() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00d4ff]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#6e5cff]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#00d4ff]/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <nav className="relative z-10 max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg border border-[#00d4ff]/30 flex items-center justify-center bg-[#00d4ff]/5">
            <Box className="w-4 h-4 text-[#00d4ff]" />
          </div>
          <span className="font-semibold text-sm tracking-wide">SpatialOS</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Platform', 'Developers', 'Showcase', 'Pricing'].map(item => (
            <a key={item} href="#" className="text-sm text-white/40 hover:text-white/80 transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-white/40 hover:text-white/80 transition-colors">Sign In</a>
          <a href="#" className="px-4 py-2 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-sm text-[#00d4ff] font-medium hover:bg-[#00d4ff]/20 transition-colors">
            Get Access
          </a>
        </div>
      </nav>

      <section className="relative z-10 max-w-6xl mx-auto px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/15 text-[#00d4ff] text-xs font-medium mb-8">
          <Sparkles className="w-3 h-3" /> Introducing Spatial Computing SDK
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
          Build beyond<br />
          <span className="bg-gradient-to-r from-[#00d4ff] to-[#6e5cff] bg-clip-text text-transparent">the screen</span>
        </h1>
        <p className="text-base text-white/30 max-w-xl mx-auto mb-8 leading-relaxed">
          The spatial computing platform for developers. Create immersive 3D experiences with depth, presence, and natural interaction.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00d4ff]/15 border border-[#00d4ff]/25 text-[#00d4ff] text-sm font-semibold hover:bg-[#00d4ff]/25 transition-colors">
            Start Building <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#" className="px-6 py-3 rounded-xl border border-white/10 text-white/40 text-sm font-medium hover:text-white/60 hover:border-white/20 transition-colors">
            Watch Demo
          </a>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-8 pb-16">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 relative overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#00d4ff]/[0.02] to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 group"
                  style={{ transform: `translateZ(${8 + i * 4}px)`, transformStyle: 'preserve-3d' }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center mb-4 group-hover:bg-[#00d4ff]/15 transition-colors">
                    <Icon className="w-5 h-5 text-[#00d4ff]/70" />
                  </div>
                  <h3 className="text-sm font-semibold mb-2 text-white/90">{feature.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-6xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Ready to enter<br />
              <span className="text-white/30">the next dimension?</span>
            </h2>
            <p className="text-sm text-white/30 leading-relaxed mb-6 max-w-sm">
              Join thousands of developers building the future of spatial computing. SDK available for visionOS, Meta Quest, and WebXR.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="px-5 py-2.5 rounded-xl bg-[#00d4ff]/15 border border-[#00d4ff]/25 text-[#00d4ff] text-sm font-semibold hover:bg-[#00d4ff]/25 transition-colors">
                Download SDK
              </a>
              <a href="#" className="px-5 py-2.5 rounded-xl border border-white/10 text-white/40 text-sm hover:text-white/60 hover:border-white/20 transition-colors">
                Documentation
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 font-mono text-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[10px] text-white/20">spatial-cli</span>
            </div>
            <pre className="text-[#00d4ff]/60 leading-relaxed">
{`$ spatial init my-world
$ cd my-world
$ spatial add layer --depth 2

  ✓ Layer created at Z=2
  ✓ Depth buffer enabled
  ✓ Gaze tracking active

$ spatial deploy --target visionos

  → Building spatial bundle...
  → Deploying to device...
  ✓ Live in spatial space!`}
            </pre>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.04] py-6 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xs text-white/15">&copy; 2026 SpatialOS Inc.</span>
          <span className="text-xs text-white/15">Spatial UI</span>
        </div>
      </footer>
    </div>
  )
}
