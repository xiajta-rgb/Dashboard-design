import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
} from 'lucide-react'

const experiences = [
  { role: 'Art Director', company: 'Bauhaus Digital', period: '2023–', location: 'Berlin' },
  { role: 'Senior Designer', company: 'Helvetica Studio', period: '2020–23', location: 'Zürich' },
  { role: 'Designer', company: 'Grid Systems AG', period: '2018–20', location: 'Basel' },
]

const education = [
  { degree: 'MA Visual Communication', school: 'HGK Basel', year: '2018' },
  { degree: 'BA Graphic Design', school: 'ZHdK Zürich', year: '2016' },
]

const skills = [
  'Typography', 'Grid Systems', 'Brand Identity', 'Art Direction',
  'Editorial Design', 'Motion Graphics', 'Web Design', 'Print',
]

const exhibitions = [
  'Swiss Design Awards 2024',
  'Typoberlin Festival 2023',
  'Graphis Annual 2022',
]

export default function ResumeSwissPage() {
  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 font-sans">
      <div className="max-w-[840px] mx-auto px-8 py-16">
        <header className="border-b-[3px] border-neutral-900 pb-8 mb-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7">
              <h1 className="text-5xl font-bold tracking-tighter uppercase leading-[0.95] mb-3">
                Hanna<br />Müller
              </h1>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Art Director & Visual Designer</p>
            </div>
            <div className="col-span-5 flex flex-col justify-end">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                  <span>hanna.muller@design.ch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                  <span>+41 44 555 0192</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                  <span>Zürich, Switzerland</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                  <span>hannamuller.design</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-neutral-200">
                <a href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1">
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </a>
                <a href="#" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1">
                  <Github className="w-3 h-3" /> GitHub
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 border-b border-neutral-200 pb-2">Profile</h2>
          <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
            Art Director with 8+ years of experience in visual communication, brand identity, and editorial design.
            Rooted in Swiss design principles — clarity, objectivity, and systematic thinking — I create visual systems
            that are both rigorous and expressive. My work bridges the gap between classical typography and contemporary digital experiences.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 border-b border-neutral-200 pb-2">
            <Briefcase className="w-3 h-3 inline mr-1.5 -mt-0.5" />
            Experience
          </h2>
          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <div key={i} className="grid grid-cols-12 gap-6 py-4 border-b border-neutral-100 last:border-b-0 group">
                <div className="col-span-3">
                  <p className="text-xs font-mono text-neutral-400">{exp.period}</p>
                  <p className="text-[10px] text-neutral-300 mt-0.5">{exp.location}</p>
                </div>
                <div className="col-span-9">
                  <h3 className="text-sm font-bold uppercase tracking-wide">{exp.role}</h3>
                  <p className="text-xs text-neutral-500 font-medium">{exp.company}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-12 gap-6 mb-8">
          <div className="col-span-5">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 border-b border-neutral-200 pb-2">
              <GraduationCap className="w-3 h-3 inline mr-1.5 -mt-0.5" />
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i}>
                  <h3 className="text-xs font-bold">{edu.degree}</h3>
                  <p className="text-[11px] text-neutral-500">{edu.school} · {edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 border-b border-neutral-200 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(skill => (
                <span key={skill} className="text-[10px] font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded-sm">{skill}</span>
              ))}
            </div>
          </div>

          <div className="col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 border-b border-neutral-200 pb-2">
              Recognition
            </h2>
            <div className="space-y-2">
              {exhibitions.map(item => (
                <p key={item} className="text-[11px] text-neutral-500 leading-snug">{item}</p>
              ))}
            </div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 border-b border-neutral-200 pb-2">
            Selected Works
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { title: 'Neue Grafik Revival', type: 'Editorial', color: 'bg-neutral-900' },
              { title: 'Swiss Rail Identity', type: 'Brand', color: 'bg-red-600' },
              { title: 'Typotron 30', type: 'Typeface', color: 'bg-neutral-800' },
            ].map((work, i) => (
              <div key={i} className="group cursor-pointer">
                <div className={`${work.color} h-32 rounded-sm mb-2 flex items-center justify-center`}>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium">{work.type}</span>
                </div>
                <p className="text-xs font-bold">{work.title}</p>
                <p className="text-[10px] text-neutral-400">{work.type}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-6 border-t-[3px] border-neutral-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-neutral-400">Hanna Müller · 2026</span>
            <span className="text-[10px] font-mono text-neutral-400">Swiss Design Principles</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
