import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
} from 'lucide-react'

const experiences = [
  { role: 'Lead Designer', company: 'BRUTAL.CO', period: '2023–NOW', color: 'bg-[#ff6b6b]' },
  { role: 'Art Director', company: 'RAW Studio', period: '2021–23', color: 'bg-[#ffd60a]' },
  { role: 'Designer', company: 'HACK Design', period: '2019–21', color: 'bg-[#4ecdc4]' },
]

const education = [
  { degree: 'BFA Graphic Design', school: 'Parsons', year: '2019' },
]

const skills = ['Figma', 'Code', 'Motion', 'Brand', 'Type', 'Print']

export default function ResumeNeubrutalPage() {
  return (
    <div className="w-full min-h-screen bg-[#fff8e1] text-[#1a1a1a] font-sans">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10">
          <div className="inline-block bg-[#ffd60a] px-4 py-1 border-3 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] mb-4">
            <span className="text-xs font-bold uppercase tracking-wider">Resume</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight uppercase leading-[0.95] mb-3">
            Max<br />Torres
          </h1>
          <p className="text-lg font-bold uppercase tracking-wide">Designer & Creative Coder</p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="flex items-center gap-1.5 text-xs font-bold bg-white border-3 border-[#1a1a1a] px-3 py-1.5 shadow-[3px_3px_0_#1a1a1a]">
              <Mail className="w-3 h-3" /> max@torres.design
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold bg-white border-3 border-[#1a1a1a] px-3 py-1.5 shadow-[3px_3px_0_#1a1a1a]">
              <Phone className="w-3 h-3" /> +1 555 0199
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold bg-white border-3 border-[#1a1a1a] px-3 py-1.5 shadow-[3px_3px_0_#1a1a1a]">
              <MapPin className="w-3 h-3" /> Brooklyn, NY
            </span>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <div key={i} className="bg-white border-3 border-[#1a1a1a] p-5 shadow-[5px_5px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base font-black uppercase">{exp.role}</h3>
                    <p className="text-sm font-bold text-[#1a1a1a]/60">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 ${exp.color} border-2 border-[#1a1a1a]`} />
                    <span className="text-xs font-bold font-mono">{exp.period}</span>
                  </div>
                </div>
                <p className="text-xs text-[#1a1a1a]/60 leading-relaxed">
                  Led design initiatives across brand, product, and marketing. Built and mentored a team of 6 designers. Shipped 20+ projects from concept to launch.
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <section>
            <h2 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className="bg-[#4ecdc4] border-3 border-[#1a1a1a] p-4 shadow-[4px_4px_0_#1a1a1a]">
                <h3 className="text-sm font-black">{edu.degree}</h3>
                <p className="text-xs font-bold">{edu.school} · {edu.year}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-4 h-4" /> Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="text-xs font-black uppercase bg-[#ff6b6b] border-3 border-[#1a1a1a] px-3 py-1.5 shadow-[3px_3px_0_#1a1a1a]">{skill}</span>
              ))}
            </div>
          </section>
        </div>

        <section className="mb-10">
          <h2 className="text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Links
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Portfolio', color: 'bg-[#ffd60a]' },
              { label: 'GitHub', color: 'bg-white' },
              { label: 'Dribbble', color: 'bg-[#ff6b6b]' },
              { label: 'LinkedIn', color: 'bg-[#4ecdc4]' },
            ].map(link => (
              <a key={link.label} href="#" className={`text-xs font-black uppercase ${link.color} border-3 border-[#1a1a1a] px-4 py-2 shadow-[3px_3px_0_#1a1a1a] hover:shadow-[1px_1px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150`}>
                {link.label} →
              </a>
            ))}
          </div>
        </section>

        <footer className="pt-6 border-t-3 border-[#1a1a1a]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a]/40">
            Max Torres · Neubrutalism Style · 2026
          </p>
        </footer>
      </div>
    </div>
  )
}
