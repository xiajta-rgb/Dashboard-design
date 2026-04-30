import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
  Palette,
  Sparkles,
  Heart,
  Coffee,
} from 'lucide-react'

const experiences = [
  {
    role: 'Lead Product Designer',
    company: 'DreamLab Studio',
    period: '2023 - Now',
    desc: 'Leading design for a creative collaboration platform used by 50K+ artists worldwide. Built the design system from zero to 200+ components.',
    tags: ['Figma', 'Design System', 'Research'],
    emoji: '🎨',
  },
  {
    role: 'UX Designer',
    company: 'Playful Apps',
    period: '2021 - 2023',
    desc: 'Designed delightful mobile experiences for kids and families. Apps featured on App Store 3 times.',
    tags: ['Mobile', 'Prototyping', 'User Testing'],
    emoji: '📱',
  },
  {
    role: 'Visual Designer',
    company: 'Bloom Agency',
    period: '2019 - 2021',
    desc: 'Created brand identities and visual systems for startups in health, education, and sustainability.',
    tags: ['Branding', 'Illustration', 'Print'],
    emoji: '✨',
  },
]

const education = [
  { degree: 'MFA Interactive Design', school: 'School of Visual Arts', period: '2017 - 2019', emoji: '🎓' },
  { degree: 'BA Graphic Design', school: 'RISD', period: '2013 - 2017', emoji: '📐' },
]

const skills = [
  { name: 'UI/UX Design', level: 95, color: 'bg-amber-400' },
  { name: 'Design Systems', level: 90, color: 'bg-yellow-400' },
  { name: 'Illustration', level: 85, color: 'bg-orange-400' },
  { name: 'Prototyping', level: 88, color: 'bg-amber-500' },
  { name: 'User Research', level: 82, color: 'bg-yellow-500' },
  { name: 'Motion Design', level: 78, color: 'bg-orange-500' },
]

const funFacts = [
  { icon: Coffee, text: '4 cups of coffee daily' },
  { icon: Heart, text: 'Cat person since 2015' },
  { icon: Sparkles, text: '3x App Store featured' },
]

export default function ResumeCreativePage() {
  return (
    <div className="w-full min-h-screen bg-[#fefce8] text-stone-900 font-sans">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-amber-200/50">
            <span className="text-3xl">🌸</span>
          </div>
          <h1 className="text-3xl font-bold mb-1">Mia Zhang</h1>
          <p className="text-base text-amber-700 font-medium mb-2">Lead Product Designer</p>
          <div className="flex items-center justify-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> mia@design.studio</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Brooklyn, NY</span>
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> miazhang.design</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <a href="#" className="w-8 h-8 rounded-full bg-white border border-amber-200 flex items-center justify-center text-stone-400 hover:text-amber-600 hover:border-amber-300 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white border border-amber-200 flex items-center justify-center text-stone-400 hover:text-stone-700 hover:border-stone-300 transition-colors">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-amber-200/60 p-6 mb-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-amber-700">About Me</h2>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Product designer who believes great design should feel like magic. I specialize in creating delightful user experiences
            that balance beauty with usability. 7+ years turning complex problems into simple, joyful interactions.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-amber-200/60 p-6 mb-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-amber-700">Skills</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map(skill => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-stone-700">{skill.name}</span>
                  <span className="text-[10px] text-stone-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-amber-50 rounded-full overflow-hidden">
                  <div className={`h-full ${skill.color} rounded-full transition-all`} style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-amber-200/60 p-6 mb-5 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Briefcase className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-amber-700">Experience</h2>
          </div>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute left-0 top-1 text-xl">{exp.emoji}</div>
                <div className="absolute left-[13px] top-9 bottom-0 w-px bg-amber-200 last:hidden" />
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-sm font-bold text-stone-800">{exp.role}</h3>
                    <p className="text-xs text-amber-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-[10px] text-stone-400 bg-amber-50 px-2 py-0.5 rounded-full flex-shrink-0 ml-3">{exp.period}</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed mb-2">{exp.desc}</p>
                <div className="flex items-center gap-1.5">
                  {exp.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-amber-200/60 p-6 mb-5 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-amber-700">Education</h2>
          </div>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl">{edu.emoji}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-stone-800">{edu.degree}</h3>
                  <p className="text-xs text-amber-600">{edu.school}</p>
                </div>
                <span className="text-[10px] text-stone-400 bg-amber-50 px-2 py-0.5 rounded-full">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-amber-700">Fun Facts</h2>
          </div>
          <div className="flex items-center gap-4">
            {funFacts.map(fact => {
              const Icon = fact.icon
              return (
                <div key={fact.text} className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Icon className="w-3.5 h-3.5 text-amber-500" />
                  <span>{fact.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
