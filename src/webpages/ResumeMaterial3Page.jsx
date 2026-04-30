import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Code2,
  Palette,
  Star,
} from 'lucide-react'

const experiences = [
  { role: 'Senior Designer', company: 'Google', period: '2023 – Present', color: '#6750a4' },
  { role: 'UX Designer', company: 'Spotify', period: '2021 – 2023', color: '#1db954' },
  { role: 'Product Designer', company: 'Figma', period: '2019 – 2021', color: '#a259ff' },
]

const skills = [
  { name: 'UI Design', level: 95 },
  { name: 'Prototyping', level: 90 },
  { name: 'Design Systems', level: 88 },
  { name: 'User Research', level: 82 },
]

const chips = ['Figma', 'Flutter', 'Compose', 'Material 3', 'Lottie', 'Rive']

export default function ResumeMaterial3Page() {
  return (
    <div className="w-full min-h-screen bg-[#fffbfe] text-[#1c1b1f] font-sans">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-8">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-[28px] bg-[#e8def8] flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-[#4f378b]">SK</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#1c1b1f] mb-1">Sara Kim</h1>
              <p className="text-sm text-[#6750a4] font-medium mb-3">Senior Product Designer</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8def8] text-xs font-medium text-[#4f378b]">
                  <Mail className="w-3 h-3" /> sara@kim.design
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8def8] text-xs font-medium text-[#4f378b]">
                  <MapPin className="w-3 h-3" /> San Francisco
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8def8] text-xs font-medium text-[#4f378b]">
                  <Globe className="w-3 h-3" /> sarakim.design
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="h-1 rounded-full bg-[#e8def8] mb-8" />

        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6750a4] mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Experience
          </h2>
          <div className="space-y-3">
            {experiences.map((exp, i) => (
              <div key={i} className="rounded-[16px] bg-[#f7f2fa] p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-[#1c1b1f]">{exp.role}</h3>
                    <p className="text-sm text-[#49454f]">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-medium text-white" style={{ backgroundColor: exp.color }}>
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-[#49454f]/70 leading-relaxed">
                  Led design initiatives for core product features. Collaborated with engineering and PM to ship high-impact experiences across mobile and web platforms.
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6750a4] mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Skills
            </h2>
            <div className="space-y-3">
              {skills.map(skill => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[#1c1b1f]">{skill.name}</span>
                    <span className="text-[10px] text-[#49454f]">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#e8def8] overflow-hidden">
                    <div className="h-full rounded-full bg-[#6750a4] transition-all" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6750a4] mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education
            </h2>
            <div className="rounded-[16px] bg-[#f7f2fa] p-4 mb-4">
              <h3 className="text-sm font-semibold text-[#1c1b1f]">MFA Interaction Design</h3>
              <p className="text-xs text-[#49454f]">School of Visual Arts · 2019</p>
            </div>
            <div className="rounded-[16px] bg-[#f7f2fa] p-4">
              <h3 className="text-sm font-semibold text-[#1c1b1f]">BFA Graphic Design</h3>
              <p className="text-xs text-[#49454f]">Rhode Island School of Design · 2017</p>
            </div>
          </section>
        </div>

        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6750a4] mb-4 flex items-center gap-2">
            <Star className="w-4 h-4" /> Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {chips.map(chip => (
              <span key={chip} className="px-4 py-2 rounded-[12px] bg-[#e8def8] text-xs font-medium text-[#4f378b] hover:bg-[#d0bcff] transition-colors cursor-default">
                {chip}
              </span>
            ))}
          </div>
        </section>

        <footer className="pt-6 border-t border-[#cac4d0]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#49454f]/50">Sara Kim · Material 3 Style</span>
            <span className="text-[10px] text-[#49454f]/50">2026</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
