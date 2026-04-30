import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
  Code2,
  Terminal,
  Database,
  Cpu,
} from 'lucide-react'

const experiences = [
  {
    role: 'Senior Full-Stack Engineer',
    company: 'Neural Systems Inc.',
    period: '2023 - Present',
    desc: 'Architecting distributed ML inference platform serving 10M+ daily predictions. Led migration from monolith to microservices.',
    tags: ['Go', 'Kubernetes', 'ML'],
  },
  {
    role: 'Backend Engineer',
    company: 'QuantumBit',
    period: '2021 - 2023',
    desc: 'Built real-time data pipeline processing 500K events/sec. Designed event sourcing architecture with CQRS pattern.',
    tags: ['Rust', 'Kafka', 'PostgreSQL'],
  },
  {
    role: 'Software Engineer',
    company: 'CodeForge',
    period: '2019 - 2021',
    desc: 'Developed developer tooling and CI/CD platform. Created open-source CLI tools with 5K+ GitHub stars.',
    tags: ['TypeScript', 'Node.js', 'Docker'],
  },
]

const education = [
  { degree: 'M.S. Computer Science', school: 'MIT', period: '2017 - 2019', desc: 'Distributed Systems & Machine Learning' },
  { degree: 'B.S. Computer Engineering', school: 'Georgia Tech', period: '2013 - 2017', desc: 'Summa Cum Laude, GPA 3.92' },
]

const skillGroups = [
  { label: 'Systems', icon: Cpu, items: [{ name: 'Go', level: 95 }, { name: 'Rust', level: 85 }, { name: 'C++', level: 75 }] },
  { label: 'Data', icon: Database, items: [{ name: 'PostgreSQL', level: 90 }, { name: 'Redis', level: 88 }, { name: 'Kafka', level: 82 }] },
  { label: 'DevOps', icon: Terminal, items: [{ name: 'Kubernetes', level: 92 }, { name: 'Docker', level: 95 }, { name: 'Terraform', level: 78 }] },
  { label: 'Web', icon: Code2, items: [{ name: 'TypeScript', level: 90 }, { name: 'React', level: 85 }, { name: 'Node.js', level: 92 }] },
]

const openSource = [
  { name: 'flux-cli', desc: 'Developer workflow automation', stars: '5.2K' },
  { name: 'go-eventstore', desc: 'Event sourcing library for Go', stars: '3.1K' },
  { name: 'rust-kv', desc: 'Embedded key-value store', stars: '1.8K' },
]

export default function ResumeDarkPage() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white font-sans">
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <aside className="space-y-5">
            <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-6">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-xl font-bold text-white">DW</span>
              </div>
              <h1 className="text-lg font-bold text-center mb-0.5">David Wang</h1>
              <p className="text-sm text-emerald-400 font-medium text-center mb-4">Senior Full-Stack Engineer</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                  <Mail className="w-3.5 h-3.5 text-emerald-500/60 flex-shrink-0" />
                  <span>david.wang@email.com</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                  <Phone className="w-3.5 h-3.5 text-emerald-500/60 flex-shrink-0" />
                  <span>+1 (628) 555-0147</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500/60 flex-shrink-0" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-400">
                  <Globe className="w-3.5 h-3.5 text-emerald-500/60 flex-shrink-0" />
                  <span>davidwang.dev</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-white/[0.06]">
                <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-neutral-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/10 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-5">
              <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">Skills</h3>
              {skillGroups.map(group => {
                const Icon = group.icon
                return (
                  <div key={group.label} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-3.5 h-3.5 text-emerald-500/60" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">{group.label}</span>
                    </div>
                    {group.items.map(skill => (
                      <div key={skill.name} className="mb-2 last:mb-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs text-neutral-300">{skill.name}</span>
                          <span className="text-[10px] text-emerald-500/60 font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-5">
              <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">Open Source</h3>
              {openSource.map(repo => (
                <div key={repo.name} className="mb-3 last:mb-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-medium text-neutral-200 font-mono">{repo.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">★ {repo.stars}</span>
                  </div>
                  <p className="text-[10px] text-neutral-500">{repo.desc}</p>
                </div>
              ))}
            </div>
          </aside>

          <main className="space-y-5">
            <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-6">
              <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">About</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Senior Full-Stack Engineer with 7+ years of experience building distributed systems and developer tools.
                Passionate about performance engineering, open-source software, and building infrastructure that scales.
                Track record of designing systems that handle millions of requests while maintaining sub-100ms latency.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-6">
              <div className="flex items-center gap-2 mb-5">
                <Briefcase className="w-4 h-4 text-emerald-500" />
                <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Experience</h2>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l border-white/[0.06] last:border-l-0">
                    <div className="absolute left-0 top-0.5 -translate-x-[4.5px] w-[9px] h-[9px] rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-sm font-semibold text-white">{exp.role}</h3>
                        <p className="text-xs text-emerald-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-[10px] text-neutral-500 bg-white/[0.04] px-2 py-0.5 rounded font-mono flex-shrink-0 ml-3">{exp.period}</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed mb-2">{exp.desc}</p>
                    <div className="flex items-center gap-1.5">
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-[#111111] p-6">
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                <h2 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Education</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="relative pl-6 border-l border-white/[0.06] last:border-l-0">
                    <div className="absolute left-0 top-0.5 -translate-x-[4.5px] w-[9px] h-[9px] rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]" />
                    <div className="flex items-start justify-between mb-0.5">
                      <div>
                        <h3 className="text-sm font-semibold text-white">{edu.degree}</h3>
                        <p className="text-xs text-emerald-400 font-medium">{edu.school}</p>
                      </div>
                      <span className="text-[10px] text-neutral-500 bg-white/[0.04] px-2 py-0.5 rounded font-mono flex-shrink-0 ml-3">{edu.period}</span>
                    </div>
                    <p className="text-xs text-neutral-500">{edu.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
