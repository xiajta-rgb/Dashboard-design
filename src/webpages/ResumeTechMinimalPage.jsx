import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Code2,
} from 'lucide-react'

const experiences = [
  { role: 'Staff Engineer', company: 'CloudScale', period: '2023 – Present' },
  { role: 'Senior Engineer', company: 'DataCore', period: '2020 – 2023' },
  { role: 'Software Engineer', company: 'NetBuild', period: '2018 – 2020' },
]

const skills = [
  { name: 'Distributed Systems', level: 95 },
  { name: 'Cloud Architecture', level: 92 },
  { name: 'Kubernetes', level: 88 },
  { name: 'Go / Rust', level: 85 },
]

const techStack = ['AWS', 'GCP', 'K8s', 'Terraform', 'Go', 'Rust', 'PostgreSQL', 'Kafka']

export default function ResumeTechMinimalPage() {
  return (
    <div className="w-full min-h-screen bg-[#fafafa] text-[#171717] font-sans">
      <div className="max-w-3xl mx-auto px-8 py-12">
        <header className="mb-8 pb-6" style={{ borderBottom: '1px solid #e5e5e5' }}>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight mb-1">Wei Zhang</h1>
              <p className="text-sm text-[#737373]">Staff Software Engineer · Distributed Systems</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#a3a3a3]">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> wei@zhang.dev
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Seattle, WA
              </span>
            </div>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a3a3a3] mb-4">Experience</h2>
          <div className="space-y-5">
            {experiences.map((exp, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-24">
                  <span className="text-[10px] text-[#a3a3a3] font-mono">{exp.period}</span>
                </div>
                <div className="flex-1 pb-5" style={{ borderBottom: i < experiences.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                  <h3 className="text-sm font-semibold mb-0.5">{exp.role}</h3>
                  <p className="text-xs text-[#737373] mb-2">{exp.company}</p>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed">
                    Architected and operated large-scale distributed systems serving 100M+ requests/day. Led infrastructure migration reducing costs by 40%.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <section>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a3a3a3] mb-4">Technical Skills</h2>
            <div className="space-y-3">
              {skills.map(skill => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#525252]">{skill.name}</span>
                    <span className="text-[9px] text-[#d4d4d4] font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-[#f5f5f5]">
                    <div className="h-full bg-[#171717]" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a3a3a3] mb-4">Education</h2>
            <div className="mb-4">
              <h3 className="text-sm font-semibold">M.S. Computer Science</h3>
              <p className="text-xs text-[#737373]">University of Washington · 2018</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">B.S. Software Engineering</h3>
              <p className="text-xs text-[#737373]">Zhejiang University · 2016</p>
            </div>

            <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a3a3a3] mt-6 mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map(tech => (
                <span key={tech} className="px-2 py-0.5 text-[9px] text-[#737373] bg-[#f5f5f5] font-mono">{tech}</span>
              ))}
            </div>
          </section>
        </div>

        <footer className="pt-6" style={{ borderTop: '1px solid #e5e5e5' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] text-[#d4d4d4]">
              <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> weizhang.dev</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +1 206 555 0147</span>
            </div>
            <span className="text-[9px] text-[#d4d4d4]">Tech Minimal</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
