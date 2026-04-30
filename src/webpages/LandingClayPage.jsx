import {
  Sparkles,
  Palette,
  Zap,
  Heart,
  ArrowRight,
  Check,
  Star,
} from 'lucide-react'

const features = [
  { icon: Palette, title: 'Drag & Drop', desc: 'Create beautiful designs without writing a single line of code.', color: 'bg-[#ff6b6b]/20' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized performance that loads in milliseconds, not seconds.', color: 'bg-[#4ecdc4]/20' },
  { icon: Heart, title: 'Made with Love', desc: 'Every pixel crafted with care for the best user experience.', color: 'bg-[#ff9a9e]/20' },
  { icon: Sparkles, title: 'AI Powered', desc: 'Smart suggestions that help you design better, faster.', color: 'bg-[#a78bfa]/20' },
]

const testimonials = [
  { name: 'Mia', role: 'Teacher', text: 'My students love creating with this!', avatar: '😊' },
  { name: 'Tom', role: 'Startup Founder', text: 'So easy and fun to use every day.', avatar: '🚀' },
  { name: 'Luna', role: 'Illustrator', text: 'Finally a tool that gets my style.', avatar: '🎨' },
]

export default function LandingClayPage() {
  return (
    <div className="w-full min-h-screen bg-[#f5f0e8] text-[#4a4a4a] font-sans">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#ff6b6b] flex items-center justify-center" style={{
            boxShadow: '4px 4px 8px rgba(0,0,0,0.1), -2px -2px 6px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.3)',
          }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-[#4a4a4a]">Playful</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {['Features', 'Pricing', 'About'].map(item => (
            <a key={item} href="#" className="text-sm text-[#8a8a8a] hover:text-[#4a4a4a] transition-colors">{item}</a>
          ))}
        </div>
        <a href="#" className="px-5 py-2.5 rounded-2xl bg-[#ff6b6b] text-white text-sm font-semibold hover:bg-[#ff5252] transition-colors" style={{
          boxShadow: '4px 4px 8px rgba(0,0,0,0.1), -2px -2px 6px rgba(255,255,255,0.8)',
        }}>
          Get Started
        </a>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-xs font-semibold text-[#ff6b6b] mb-6" style={{
          boxShadow: '3px 3px 6px rgba(0,0,0,0.08), -2px -2px 4px rgba(255,255,255,0.9)',
        }}>
          <Sparkles className="w-3 h-3" /> Now with AI Magic ✨
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-[#3a3a3a]">
          Design made<br />
          <span className="text-[#ff6b6b]">playful</span> & fun
        </h1>
        <p className="text-lg text-[#8a8a8a] max-w-xl mx-auto mb-8 leading-relaxed">
          The friendliest design tool that makes creativity accessible to everyone. No skills required — just imagination! 🎉
        </p>
        <div className="flex items-center justify-center gap-3">
          <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#ff6b6b] text-white text-sm font-semibold hover:bg-[#ff5252] transition-colors" style={{
            boxShadow: '4px 4px 10px rgba(255,107,107,0.3), -2px -2px 6px rgba(255,255,255,0.8)',
          }}>
            Start Free <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#" className="px-6 py-3 rounded-2xl bg-white text-[#4a4a4a] text-sm font-semibold hover:bg-[#f0ebe3] transition-colors" style={{
            boxShadow: '3px 3px 6px rgba(0,0,0,0.08), -2px -2px 4px rgba(255,255,255,0.9)',
          }}>
            See Demo
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="rounded-3xl bg-[#f5f0e8] p-6" style={{
                boxShadow: '6px 6px 12px rgba(0,0,0,0.08), -4px -4px 8px rgba(255,255,255,0.9)',
              }}>
                <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-4`} style={{
                  boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.5), inset -1px -1px 3px rgba(0,0,0,0.08)',
                }}>
                  <Icon className="w-6 h-6 text-[#4a4a4a]" />
                </div>
                <h3 className="text-base font-bold mb-2 text-[#3a3a3a]">{feature.title}</h3>
                <p className="text-sm text-[#8a8a8a] leading-relaxed">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#3a3a3a]">Loved by creators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-3xl bg-[#f5f0e8] p-5" style={{
              boxShadow: '5px 5px 10px rgba(0,0,0,0.08), -3px -3px 6px rgba(255,255,255,0.9)',
            }}>
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-3 h-3 text-[#ffd60a] fill-[#ffd60a]" />
                ))}
              </div>
              <p className="text-sm text-[#6a6a6a] leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm" style={{
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.06), -1px -1px 2px rgba(255,255,255,0.8)',
                }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#4a4a4a]">{t.name}</p>
                  <p className="text-[10px] text-[#8a8a8a]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="rounded-3xl bg-[#ff6b6b]/10 p-10 text-center" style={{
          boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.04), inset -4px -4px 8px rgba(255,255,255,0.6)',
        }}>
          <h2 className="text-3xl font-bold mb-3 text-[#3a3a3a]">Ready to play? 🎨</h2>
          <p className="text-sm text-[#8a8a8a] max-w-md mx-auto mb-6">Join thousands of creators making beautiful things every day.</p>
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#ff6b6b] text-white text-sm font-semibold hover:bg-[#ff5252] transition-colors" style={{
            boxShadow: '4px 4px 10px rgba(255,107,107,0.3), -2px -2px 6px rgba(255,255,255,0.8)',
          }}>
            Get Started Free <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <footer className="py-6 px-6 border-t border-[#e0d8c8]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-[#8a8a8a]">&copy; 2026 Playful</span>
          <span className="text-xs text-[#8a8a8a]">Made with 💛</span>
        </div>
      </footer>
    </div>
  )
}
