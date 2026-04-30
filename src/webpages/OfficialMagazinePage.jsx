import { useState } from 'react'
import {
  ArrowRight,
  ChevronRight,
  Play,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'

const navLinks = ['Studio', 'Work', 'Journal', 'Contact']

const featuredWork = [
  {
    title: 'The Art of Silence',
    category: 'Brand Identity',
    desc: 'Complete visual system for a contemporary art museum, featuring custom typography and a dynamic identity system.',
    year: '2025',
    color: 'bg-stone-800',
  },
  {
    title: 'Meridian Hotels',
    category: 'Hospitality',
    desc: 'Luxury hotel brand identity spanning digital, print, and spatial design across 12 properties worldwide.',
    year: '2024',
    color: 'bg-stone-700',
  },
]

const journalEntries = [
  { title: 'On White Space', date: 'Mar 2026', read: '4 min' },
  { title: 'Typography as Architecture', date: 'Feb 2026', read: '6 min' },
  { title: 'The Grid Revisited', date: 'Jan 2026', read: '5 min' },
]

export default function OfficialMagazinePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-2xl font-bold tracking-tighter">ATELIER</span>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a key={link} href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">Newsletter</a>
            <a href="#" className="px-5 py-2 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">
              Start a Project
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 cursor-pointer">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="text-sm text-neutral-400 mb-4 tracking-wide">Design Studio — Est. 2018</p>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
                We design<br />
                <span className="text-neutral-400">brands that</span><br />
                speak volumes
              </h1>
            </div>
            <div className="lg:col-span-5 pb-2">
              <p className="text-base text-neutral-500 leading-relaxed mb-6 max-w-md">
                Atelier is a design studio specializing in brand identity, editorial design, and digital experiences.
                We believe in the power of restraint — that the most impactful design emerges from what is left unsaid.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">
                  View Work <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                  <Play className="w-4 h-4" /> Studio Film
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-neutral-200 mb-8" />
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Featured Work</h2>
            <a href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1">
              All Projects <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredWork.map((work, i) => (
              <a key={i} href="#" className="group">
                <div className={`${work.color} h-80 rounded-sm mb-4 flex items-center justify-center overflow-hidden relative`}>
                  <span className="text-xs text-white/30 uppercase tracking-widest font-medium">{work.category}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-neutral-600 transition-colors">{work.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">{work.desc}</p>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono flex-shrink-0 ml-4">{work.year}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-4xl font-bold tracking-tight leading-tight mb-4">
                Design is<br />what happens<br />
                <span className="text-neutral-400">between the lines</span>
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Our approach is rooted in editorial thinking — every project tells a story, every element serves a purpose.
                We strip away the unnecessary until only the essential remains.
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">Services</p>
              <div className="space-y-2">
                {['Brand Identity', 'Editorial Design', 'Digital Experience', 'Art Direction', 'Typography', 'Spatial Design'].map(service => (
                  <p key={service} className="text-sm text-neutral-700">{service}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">Studio</p>
              <div className="space-y-2">
                <p className="text-sm text-neutral-700">28 designers</p>
                <p className="text-sm text-neutral-700">8 years</p>
                <p className="text-sm text-neutral-700">120+ projects</p>
                <p className="text-sm text-neutral-700">15 awards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Journal</h2>
            <a href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1">
              All Entries <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="space-y-0">
            {journalEntries.map((entry, i) => (
              <a key={i} href="#" className="group flex items-center justify-between py-5 border-b border-neutral-100 hover:pl-2 transition-all">
                <div className="flex items-center gap-6">
                  <span className="text-xs text-neutral-300 font-mono w-6">0{i + 1}</span>
                  <h3 className="text-base font-medium group-hover:text-neutral-500 transition-colors">{entry.title}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-neutral-400">{entry.date}</span>
                  <span className="text-xs text-neutral-300">{entry.read}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-200 group-hover:text-neutral-500 group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <h2 className="text-4xl font-bold tracking-tight leading-tight mb-4">
                Let's create<br />something remarkable
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
                We're always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">Email</p>
              <a href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">hello@atelier.studio</a>
            </div>
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">Location</p>
              <div className="space-y-1 text-sm text-neutral-400">
                <p>New York</p>
                <p>London</p>
                <p>Tokyo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-8 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-sm font-bold tracking-tighter">ATELIER</span>
          <span className="text-xs text-neutral-400">&copy; 2026 Atelier Studio. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
