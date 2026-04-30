import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Languages,
} from 'lucide-react'

const experiences = [
  {
    role: 'Senior Frontend Engineer',
    company: 'TechCorp Inc.',
    period: '2023 - Present',
    desc: 'Led the redesign of the core product dashboard, improving user engagement by 40%. Built and maintained a design system serving 12 product teams.',
    tags: ['React', 'TypeScript', 'Design System'],
  },
  {
    role: 'Frontend Developer',
    company: 'StartupXYZ',
    period: '2021 - 2023',
    desc: 'Developed the customer-facing web application from scratch. Implemented real-time collaboration features and optimized performance achieving 95+ Lighthouse scores.',
    tags: ['Next.js', 'WebSocket', 'Performance'],
  },
  {
    role: 'UI Developer',
    company: 'DesignStudio',
    period: '2019 - 2021',
    desc: 'Created interactive prototypes and production-ready components for Fortune 500 clients. Specialized in animation and micro-interaction design.',
    tags: ['Vue.js', 'GSAP', 'Figma'],
  },
]

const education = [
  {
    degree: 'M.S. Computer Science',
    school: 'Stanford University',
    period: '2017 - 2019',
    desc: 'Focus on Human-Computer Interaction and Visual Computing',
  },
  {
    degree: 'B.S. Software Engineering',
    school: 'UC Berkeley',
    period: '2013 - 2017',
    desc: 'Dean\'s List, GPA 3.85/4.0',
  },
]

const skillGroups = [
  { label: 'Frontend', items: [{ name: 'React/Next.js', level: 95 }, { name: 'TypeScript', level: 90 }, { name: 'Tailwind CSS', level: 92 }, { name: 'Vue.js', level: 80 }] },
  { label: 'Design', items: [{ name: 'Figma', level: 88 }, { name: 'Design Systems', level: 85 }, { name: 'Motion Design', level: 78 }, { name: 'Prototyping', level: 82 }] },
  { label: 'Backend', items: [{ name: 'Node.js', level: 75 }, { name: 'PostgreSQL', level: 70 }, { name: 'GraphQL', level: 72 }, { name: 'REST APIs', level: 85 }] },
]

const certifications = [
  'AWS Certified Developer',
  'Google UX Design Certificate',
  'Meta Frontend Developer',
]

const languages = [
  { name: 'English', level: 'Native' },
  { name: 'Mandarin', level: 'Fluent' },
  { name: 'Japanese', level: 'Conversational' },
]

export default function ResumePage() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <div className="max-w-[1100px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">JC</span>
              </div>
              <h1 className="text-xl font-bold text-center mb-0.5">Jessica Chen</h1>
              <p className="text-sm text-slate-500 text-center mb-4">Senior Frontend Engineer</p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>jessica.chen@email.com</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>+1 (415) 555-0192</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <Globe className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>jessicachen.dev</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-slate-100">
                <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold">Skills</h3>
              </div>
              {skillGroups.map(group => (
                <div key={group.label} className="mb-4 last:mb-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">{group.label}</p>
                  {group.items.map(skill => (
                    <div key={skill.name} className="mb-2 last:mb-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-slate-600">{skill.name}</span>
                        <span className="text-[10px] text-slate-400">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold">Certifications</h3>
              </div>
              {certifications.map(cert => (
                <div key={cert} className="flex items-center gap-2 mb-2 last:mb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-xs text-slate-600">{cert}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Languages className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold">Languages</h3>
              </div>
              {languages.map(lang => (
                <div key={lang.name} className="flex items-center justify-between mb-2 last:mb-0">
                  <span className="text-xs text-slate-600">{lang.name}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{lang.level}</span>
                </div>
              ))}
            </div>
          </aside>

          <main className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">About</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Senior Frontend Engineer with 7+ years of experience building high-performance web applications and design systems.
                Passionate about the intersection of design and engineering — creating interfaces that are both beautiful and accessible.
                Proven track record of leading cross-functional teams and delivering products that drive measurable business impact.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Experience</h2>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-slate-100 last:border-l-0">
                    <div className="absolute left-0 top-0.5 -translate-x-[5px] w-2 h-2 rounded-full bg-blue-500 ring-4 ring-white" />
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">{exp.role}</h3>
                        <p className="text-xs text-blue-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded flex-shrink-0 ml-3">{exp.period}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-2">{exp.desc}</p>
                    <div className="flex items-center gap-1.5">
                      {exp.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Education</h2>
              </div>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-slate-100 last:border-l-0">
                    <div className="absolute left-0 top-0.5 -translate-x-[5px] w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white" />
                    <div className="flex items-start justify-between mb-0.5">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">{edu.degree}</h3>
                        <p className="text-xs text-indigo-600 font-medium">{edu.school}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded flex-shrink-0 ml-3">{edu.period}</span>
                    </div>
                    <p className="text-xs text-slate-500">{edu.desc}</p>
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
