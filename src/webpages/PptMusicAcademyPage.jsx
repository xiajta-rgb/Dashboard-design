import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, ImageIcon } from 'lucide-react'

const PRIMARY = '#1a3a4a'
const PRIMARY_LIGHT = '#e6eef2'
const ACCENT = '#c4553a'
const ACCENT_LIGHT = '#fce8e3'
const GOLD = '#a07828'
const GOLD_LIGHT = '#f5eed8'
const TEAL = '#2a7a6a'
const TEAL_LIGHT = '#e2f0ec'
const DARK = '#0f1f2a'
const CHARCOAL = '#2a3a45'
const TEXT3 = '#5a6a75'
const BG = '#faf7f2'
const RULE = '#c8c2b8'
const RULE_LIGHT = '#e0dbd4'

const EASE = 'cubic-bezier(.4,0,.2,1)'
const SERIF = "'Noto Serif SC','Source Han Serif SC','SimSun',Georgia,serif"
const SERIF_EN = "'Latin Modern Roman','Playfair Display',Georgia,serif"
const SANS = "'Inter','Helvetica Neue','PingFang SC',sans-serif"
const DISPLAY = "'Playfair Display','Latin Modern Roman',Georgia,serif"

function useCounter(target, duration = 1200, startOnMount = true) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const start = useCallback(() => {
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((eased * target).toFixed(target < 10 ? 1 : 0)))
      if (progress < 1) ref.current = requestAnimationFrame(tick)
    }
    ref.current = requestAnimationFrame(tick)
  }, [target, duration])
  useEffect(() => {
    if (startOnMount) start()
    return () => { if (ref.current) cancelAnimationFrame(ref.current) }
  }, [start, startOnMount])
  return value
}

function CounterValue({ target, suffix = '', duration = 1200 }) {
  const count = useCounter(target, duration)
  return <span>{count}{suffix}</span>
}

function ImagePlaceholder({ label = '图片', w, h, className = '', style = {} }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}
      style={{ background: PRIMARY_LIGHT, border: `1px dashed ${RULE}`, borderRadius: 3, width: w, height: h, ...style }}>
      <ImageIcon style={{ width: 18, height: 18, color: RULE, marginBottom: 3 }} />
      <span style={{ fontSize: 9, color: TEXT3, fontFamily: SANS }}>{label}</span>
    </div>
  )
}

function StaffDecor({ x, y, width = 200, gap = 6, color = PRIMARY, opacity = 0.07 }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map(i => (
        <line key={i} x1={x} y1={y + i * gap} x2={x + width} y2={y + i * gap}
          stroke={color} strokeWidth={0.5} opacity={opacity} />
      ))}
    </g>
  )
}

function WaveDecor({ d, color = TEAL, opacity = 0.06, sw = 1.2 }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={sw} opacity={opacity} />
}

const slides = [
  {
    type: 'cover',
    institution: 'XX师范大学音乐学院',
    title: '小学音乐课堂中游戏化教学的实践与效果研究',
    titleEn: 'Practice and Effectiveness of Gamified Teaching\nin Elementary Music Classrooms',
    author: '答辩人：陈乐瑶',
    advisor: '指导教师：赵鸣华 副教授',
    department: '音乐教育系',
    date: '二〇二六年六月',
  },
  {
    type: 'toc',
    sections: [
      { num: '01', title: '研究背景与问题', titleEn: 'Background & Research Questions', color: PRIMARY, desc: '新课标要求、课堂现状、研究空白', icon: '♪' },
      { num: '02', title: '研究设计与实施', titleEn: 'Research Design & Implementation', color: ACCENT, desc: '研究框架、实施路径、教学模块', icon: '♫' },
      { num: '03', title: '研究结果与讨论', titleEn: 'Results & Discussion', color: GOLD, desc: '核心发现、数据对比、结论展望', icon: '♬' },
    ],
  },
  {
    type: 'section',
    num: '01',
    title: '研究背景与问题',
    titleEn: 'Background & Research Questions',
    color: PRIMARY,
    points: ['新课标对音乐教学的转型要求', '当前课堂存在的核心问题', '游戏化教学的研究空白与价值'],
  },
  {
    type: 'content-img',
    heading: '研究背景',
    accent: PRIMARY,
    items: [
      { text: '《义务教育艺术课程标准（2022年版）》明确提出音乐教学应注重「以美育人」，强调体验式与探究式学习', sub: '新课标将「审美感知」「艺术表现」「创意实践」「文化理解」列为核心素养' },
      { text: '当前小学音乐课堂仍以教师示范—学生模仿为主，学生参与度低，课堂活力不足', sub: '调研显示：62.3%的小学音乐课以跟唱为主，学生主动参与率不足40%' },
      { text: '游戏化教学（Gamification）在语言、数学领域已有成熟应用，但在音乐教育中的系统研究尚属空白', sub: 'Kapp, K.M. The Gamification of Learning and Instruction. Wiley, 2012' },
    ],
    imgLabel: '新课标核心素养框架',
  },
  {
    type: 'framework',
    heading: '研究框架',
    accent: PRIMARY,
    question: '核心问题：游戏化教学策略能否有效提升小学音乐课堂的学生参与度与音乐素养？其作用机制是什么？',
    dimensions: [
      { label: '游戏化设计', desc: '积分、徽章、排行榜、叙事情境等机制的音乐课堂适配', color: TEAL, num: 'I' },
      { label: '参与度测量', desc: '行为参与、情感参与、认知参与三维度量表', color: ACCENT, num: 'II' },
      { label: '音乐素养', desc: '节奏感、音高辨识、音乐表现力、创造力四项指标', color: GOLD, num: 'III' },
      { label: '作用机制', desc: '内在动机、自我效能感、心流体验的中介效应', color: PRIMARY, num: 'IV' },
    ],
  },
  {
    type: 'section',
    num: '02',
    title: '研究设计与实施',
    titleEn: 'Research Design & Implementation',
    color: ACCENT,
    points: ['四阶段研究路径', '游戏化教学模块设计', '准实验方案与数据采集'],
  },
  {
    type: 'timeline',
    heading: '研究实施路径',
    accent: ACCENT,
    steps: [
      { phase: '第一阶段', label: '需求调研', desc: '对3所小学12名音乐教师进行半结构化访谈，梳理课堂痛点', time: '2025.03—05', color: TEAL },
      { phase: '第二阶段', label: '方案设计', desc: '基于MDA框架设计6个游戏化音乐教学模块，覆盖1—6年级', time: '2025.05—07', color: ACCENT },
      { phase: '第三阶段', label: '教学实验', desc: '准实验设计：实验组（n=156）+ 对照组（n=148），持续16周', time: '2025.09—12', color: GOLD },
      { phase: '第四阶段', label: '数据分析', desc: '混合研究方法：量化（ANOVA、结构方程）+ 质性（课堂观察、学生访谈）', time: '2026.01—03', color: PRIMARY },
    ],
  },
  {
    type: 'modules',
    heading: '游戏化教学模块设计',
    accent: ACCENT,
    cards: [
      { title: '节奏闯关', desc: '将节奏训练设计为闯关游戏，每关引入新节奏型，通过即时反馈与积分激励练习', grade: '1—2年级', tag: '节奏感知', color: TEAL },
      { title: '旋律寻宝', desc: '学生根据音高线索在「音乐地图」中寻找旋律片段，培养音高辨识与记忆能力', grade: '3—4年级', tag: '音高辨识', color: ACCENT },
      { title: '合奏指挥家', desc: '学生轮流担任「指挥」，通过手势与表情引导小组即兴合奏，培养表现力与协作', grade: '4—5年级', tag: '音乐表现', color: GOLD },
      { title: '作曲工坊', desc: '提供节奏与音高素材库，学生组合创作短小作品，获得「作曲家徽章」', grade: '5—6年级', tag: '创意实践', color: PRIMARY },
    ],
  },
  {
    type: 'section',
    num: '03',
    title: '研究结果与讨论',
    titleEn: 'Results & Discussion',
    color: GOLD,
    points: ['参与度与音乐素养提升', '内在动机与心流体验', '结论与未来展望'],
  },
  {
    type: 'results',
    heading: '核心研究发现',
    accent: GOLD,
    findings: [
      { label: '参与度提升', value: 34.7, suffix: '%', desc: '实验组学生课堂行为参与度显著高于对照组（p<0.01）', color: TEAL },
      { label: '音乐素养', value: 22.1, suffix: '%', desc: '节奏感与音高辨识提升最为显著，创造力提升相对温和', color: ACCENT },
      { label: '内在动机', value: 41.2, suffix: '%', desc: '自我决定理论三需求（自主、胜任、归属）均获满足', color: GOLD },
      { label: '心流体验', value: 68.3, suffix: '%', desc: '68.3%的实验组学生在课堂中达到心流状态（对照组仅31.5%）', color: PRIMARY },
    ],
  },
  {
    type: 'conclusion',
    heading: '研究结论与展望',
    accent: PRIMARY,
    conclusions: [
      '游戏化教学策略能显著提升小学音乐课堂的学生参与度与音乐素养，尤其在节奏感知与音高辨识方面效果突出',
      '内在动机与心流体验是游戏化教学发挥作用的关键中介变量，自我效能感发挥部分中介效应',
      '游戏化设计需根据学段差异化适配：低年级偏重即时反馈，高年级偏重自主创造',
    ],
    publications: [
      '陈乐瑶, 赵鸣华."游戏化教学在小学音乐课堂中的应用效果研究."《中国音乐教育》2026年第2期.',
      'Chen, L. & Zhao, M. "Gamification in Elementary Music Education: A Quasi-Experimental Study." IJME, 2026.',
    ],
    future: '后续将追踪游戏化教学的长期效果（6个月后测），并探索数字化游戏平台与线下课堂的融合模式。',
  },
  {
    type: 'end',
    title: '感谢聆听',
    subtitle: '恳请各位老师批评指正',
  },
]

export default function PptMusicAcademyPage() {
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const go = useCallback((dir) => {
    setCurrent((c) => {
      const next = Math.max(0, Math.min(slides.length - 1, c + dir))
      if (next !== c) setAnimKey((k) => k + 1)
      return next
    })
  }, [])
  useEffect(() => {
    const handler = (e) => { if (e.key === 'ArrowRight' || e.key === ' ') go(1); else if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go])
  const slide = slides[current]
  const progress = ((current + 1) / slides.length) * 100
  const sectionColors = [PRIMARY, PRIMARY, PRIMARY, PRIMARY, PRIMARY, ACCENT, ACCENT, ACCENT, ACCENT, GOLD, GOLD, PRIMARY, PRIMARY]
  const pageAccent = sectionColors[current] || PRIMARY

  const staggerStyle = (i, baseDelay = 0.1) => ({
    animation: `mus-fade-up 0.55s ${EASE} ${baseDelay + i * 0.09}s both`,
  })

  const renderSlide = () => {
    if (slide.type === 'cover') {
      return (
        <div className="flex h-full" key={animKey}>
          <div className="w-[200px] flex-shrink-0 flex flex-col justify-between py-8 px-5 relative overflow-hidden" style={{ background: PRIMARY }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 540" preserveAspectRatio="none">
              <StaffDecor x={10} y={80} width={180} gap={8} color="#fff" opacity={0.06} />
              <StaffDecor x={10} y={380} width={180} gap={8} color="#fff" opacity={0.04} />
              <WaveDecor d="M 0 200 Q 50 180, 100 200 T 200 190" color="#fff" opacity={0.05} sw={1} />
              <WaveDecor d="M 0 340 Q 60 320, 120 340 T 200 330" color="#fff" opacity={0.04} sw={0.8} />
            </svg>
            <div className="relative z-10" style={{ animation: `mus-fade-down 0.6s ${EASE} both` }}>
              <div className="text-white/40 text-[10px] tracking-[0.3em] mb-2" style={{ fontFamily: SERIF_EN }}>MASTER'S DEFENSE</div>
              <div className="text-white text-[13px] font-bold leading-relaxed" style={{ writingMode: 'vertical-rl', fontFamily: SERIF, letterSpacing: '0.15em', maxHeight: 280 }}>{slide.institution}</div>
            </div>
            <div className="relative z-10 space-y-2" style={{ animation: `mus-fade-up 0.6s ${EASE} 0.4s both` }}>
              <div className="flex gap-2">
                <div className="w-6 h-[2px] rounded-full" style={{ background: ACCENT }} />
                <div className="w-6 h-[2px] rounded-full" style={{ background: GOLD }} />
                <div className="w-6 h-[2px] rounded-full" style={{ background: TEAL }} />
              </div>
              <div className="text-white/50 text-[10px]" style={{ fontFamily: SERIF_EN }}>{slide.date}</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center px-14 py-8 relative">
            <svg className="absolute top-0 right-0 w-[400px] h-[200px] pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
              <StaffDecor x={20} y={30} width={360} gap={10} color={PRIMARY} opacity={0.05} />
              <StaffDecor x={60} y={120} width={300} gap={10} color={ACCENT} opacity={0.04} />
              <WaveDecor d="M 0 80 Q 100 50, 200 80 T 400 70" color={TEAL} opacity={0.06} sw={1.5} />
              <WaveDecor d="M 0 160 Q 120 140, 240 160 T 400 150" color={GOLD} opacity={0.04} sw={1} />
            </svg>
            <div style={{ animation: `mus-blur-in 0.9s ${EASE} 0.15s both` }}>
              <h1 className="text-[26px] font-bold leading-[1.6] mb-3 max-w-[520px]" style={{ color: DARK, fontFamily: SERIF }}>{slide.title}</h1>
              <p className="text-xs mb-8 max-w-[460px] whitespace-pre-line" style={{ color: TEXT3, fontFamily: SERIF_EN, fontStyle: 'italic', lineHeight: 1.6 }}>{slide.titleEn}</p>
            </div>
            <div className="w-14 h-[2px] mb-6" style={{ background: ACCENT, animation: `mus-fade-up 0.6s ${EASE} 0.35s both` }} />
            <div className="space-y-1.5 text-sm" style={{ color: CHARCOAL, animation: `mus-fade-up 0.6s ${EASE} 0.45s both` }}>
              <p>{slide.author}</p>
              <p>{slide.advisor}</p>
              <p style={{ color: TEXT3 }}>{slide.department}</p>
            </div>
            <div className="absolute bottom-10 right-14" style={{ animation: `mus-fade-up 0.7s ${EASE} 0.5s both` }}>
              <ImagePlaceholder label="校徽 / 院徽" w={80} h={80} style={{ borderRadius: '50%' }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'toc') {
      return (
        <div className="flex h-full" key={animKey}>
          <div className="w-[5px] flex-shrink-0" style={{ background: PRIMARY }} />
          <div className="flex-1 flex flex-col pt-10 px-14 pb-6">
            <h2 className="text-lg font-bold mb-7 pb-2" style={{ color: DARK, fontFamily: SERIF, borderBottom: `1px solid ${RULE}`, animation: `mus-fade-up 0.6s ${EASE} both` }}>目 录</h2>
            <div className="space-y-0">
              {slide.sections.map((sec, i) => (
                <div key={i} className="flex items-center gap-5 py-5" style={{ borderBottom: `1px solid ${RULE_LIGHT}`, ...staggerStyle(i, 0.15) }}>
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ background: sec.color }}>
                    <span className="text-white text-lg font-bold" style={{ fontFamily: DISPLAY }}>{sec.num}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold" style={{ color: DARK, fontFamily: SERIF }}>{sec.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: TEXT3, fontFamily: SERIF_EN, fontStyle: 'italic' }}>{sec.titleEn}</p>
                    <p className="text-xs mt-1" style={{ color: CHARCOAL, fontFamily: SERIF }}>{sec.desc}</p>
                  </div>
                  <span className="text-2xl" style={{ color: sec.color, opacity: 0.3, fontFamily: DISPLAY }}>{sec.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'section') {
      const secColor = slide.color || PRIMARY
      return (
        <div className="flex h-full" key={animKey}>
          <div className="w-[5px] flex-shrink-0" style={{ background: secColor }} />
          <div className="flex-1 flex flex-col pt-10 px-14 pb-6 relative">
            <svg className="absolute top-0 right-0 w-[300px] h-full pointer-events-none" viewBox="0 0 300 540" preserveAspectRatio="none">
              <StaffDecor x={20} y={60} width={260} gap={12} color={secColor} opacity={0.04} />
              <StaffDecor x={40} y={380} width={220} gap={12} color={secColor} opacity={0.03} />
              <WaveDecor d="M 0 200 Q 80 170, 160 200 T 300 190" color={secColor} opacity={0.05} sw={1.5} />
            </svg>
            <div className="flex gap-10 items-start relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4" style={{ animation: `mus-fade-down 0.6s ${EASE} both` }}>
                  <div className="w-16 h-16 flex items-center justify-center" style={{ background: secColor }}>
                    <span className="text-white text-2xl font-bold" style={{ fontFamily: DISPLAY }}>{slide.num}</span>
                  </div>
                  <div>
                    <h2 className="text-[28px] font-bold leading-[1.3]" style={{ color: DARK, fontFamily: SERIF }}>{slide.title}</h2>
                    <p className="text-sm" style={{ color: TEXT3, fontFamily: SERIF_EN, fontStyle: 'italic' }}>{slide.titleEn}</p>
                  </div>
                </div>
                <div className="w-14 h-[2px] rounded-full mb-5" style={{ background: secColor, animation: `mus-fade-up 0.7s ${EASE} 0.2s both` }} />
                {slide.points && (
                  <div className="space-y-2.5" style={{ animation: `mus-fade-up 0.7s ${EASE} 0.28s both` }}>
                    {slide.points.map((p, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: secColor, borderRadius: 2 }}>
                          <span className="text-white text-[9px] font-bold" style={{ fontFamily: SANS }}>{i + 1}</span>
                        </div>
                        <span className="text-sm leading-relaxed" style={{ color: CHARCOAL, fontFamily: SERIF }}>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-[240px] flex-shrink-0" style={{ animation: `mus-fade-up 0.7s ${EASE} 0.35s both` }}>
                <ImagePlaceholder label="章节配图" w="100%" h={200} />
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'content-img') {
      const accent = slide.accent || PRIMARY
      return (
        <div className="flex h-full" key={animKey}>
          <div className="w-[4px] flex-shrink-0" style={{ background: accent }} />
          <div className="flex-1 flex pt-8 px-14 pb-6 gap-6">
            <div className="flex-1 flex flex-col pt-2 min-w-0">
              <h2 className="text-lg font-bold mb-5 pb-2" style={{ color: DARK, borderBottom: `2px solid ${accent}`, fontFamily: SERIF, animation: `mus-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="space-y-4">
                {slide.items.map((item, i) => (
                  <div key={i} style={staggerStyle(i, 0.1)}>
                    <div className="flex items-start gap-3 mb-0.5">
                      <span className="text-[10px] font-bold mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center" style={{ color: '#fff', background: accent, fontFamily: SERIF_EN, borderRadius: 2 }}>{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-sm leading-[1.7]" style={{ color: DARK, fontFamily: SERIF }}>{item.text}</p>
                    </div>
                    <p className="ml-8 text-[11px] leading-relaxed" style={{ color: TEXT3, fontFamily: SERIF, fontStyle: 'italic' }}>{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[230px] flex-shrink-0 flex flex-col justify-center gap-3" style={{ animation: `mus-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label={slide.imgLabel || '配图'} w="100%" h="100%" style={{ minHeight: 260 }} />
              <div className="flex gap-2">
                <div className="flex-1 h-1 rounded-full" style={{ background: TEAL }} />
                <div className="flex-1 h-1 rounded-full" style={{ background: ACCENT }} />
                <div className="flex-1 h-1 rounded-full" style={{ background: GOLD }} />
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'framework') {
      const accent = slide.accent || PRIMARY
      const bgMap = { [PRIMARY]: PRIMARY_LIGHT, [TEAL]: TEAL_LIGHT, [ACCENT]: ACCENT_LIGHT, [GOLD]: GOLD_LIGHT }
      return (
        <div className="flex h-full" key={animKey}>
          <div className="w-[4px] flex-shrink-0" style={{ background: accent }} />
          <div className="flex-1 flex pt-8 px-14 pb-6 gap-6">
            <div className="flex-1 flex flex-col pt-2 min-w-0">
              <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: DARK, borderBottom: `2px solid ${accent}`, fontFamily: SERIF, animation: `mus-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="p-4 mb-5" style={{ background: PRIMARY_LIGHT, borderLeft: `3px solid ${accent}`, animation: `mus-fade-up 0.55s ${EASE} 0.1s both` }}>
                <p className="text-sm leading-[1.8]" style={{ color: DARK, fontFamily: SERIF }}>{slide.question}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {slide.dimensions.map((d, i) => (
                  <div key={i} className="p-4" style={{ background: bgMap[d.color] || PRIMARY_LIGHT, borderTop: `3px solid ${d.color}`, ...staggerStyle(i, 0.15) }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold" style={{ color: d.color, fontFamily: DISPLAY }}>{d.num}</span>
                      <span className="text-sm font-bold" style={{ color: DARK, fontFamily: SERIF }}>{d.label}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: CHARCOAL, fontFamily: SERIF }}>{d.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[210px] flex-shrink-0 flex flex-col justify-center" style={{ animation: `mus-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label="研究框架示意图" w="100%" h="100%" style={{ minHeight: 280 }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'timeline') {
      const accent = slide.accent || ACCENT
      return (
        <div className="flex h-full" key={animKey}>
          <div className="w-[4px] flex-shrink-0" style={{ background: accent }} />
          <div className="flex-1 flex pt-8 px-14 pb-6 gap-6">
            <div className="flex-1 flex flex-col pt-2 min-w-0">
              <h2 className="text-lg font-bold mb-5 pb-2" style={{ color: DARK, borderBottom: `2px solid ${accent}`, fontFamily: SERIF, animation: `mus-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="space-y-0">
                {slide.steps.map((step, i) => (
                  <div key={i} className="flex gap-4" style={staggerStyle(i, 0.12)}>
                    <div className="flex flex-col items-center w-8 flex-shrink-0">
                      <div className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white" style={{ background: step.color, borderRadius: 2, fontFamily: SANS }}>{i + 1}</div>
                      {i < slide.steps.length - 1 && <div className="w-[2px] flex-1 my-1" style={{ background: RULE }} />}
                    </div>
                    <div className="flex-1 pb-5">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold" style={{ color: DARK, fontFamily: SERIF }}>{step.phase} · {step.label}</span>
                        <span className="text-[10px] px-1.5 py-0.5" style={{ color: step.color, background: 'rgba(0,0,0,0.04)', fontFamily: SANS }}>{step.time}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: CHARCOAL, fontFamily: SERIF }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[200px] flex-shrink-0 flex flex-col justify-center" style={{ animation: `mus-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label="研究实施流程图" w="100%" h="100%" style={{ minHeight: 280 }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'modules') {
      const accent = slide.accent || ACCENT
      const bgMap = { [PRIMARY]: PRIMARY_LIGHT, [TEAL]: TEAL_LIGHT, [ACCENT]: ACCENT_LIGHT, [GOLD]: GOLD_LIGHT }
      return (
        <div className="flex h-full" key={animKey}>
          <div className="w-[4px] flex-shrink-0" style={{ background: accent }} />
          <div className="flex-1 flex flex-col pt-10 px-14 pb-6">
            <h2 className="text-lg font-bold mb-5 pb-2" style={{ color: DARK, borderBottom: `2px solid ${accent}`, fontFamily: SERIF, animation: `mus-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
            <div className="grid grid-cols-2 gap-4">
              {slide.cards.map((c, i) => (
                <div key={i} className="flex gap-3 p-4" style={{ background: bgMap[c.color] || PRIMARY_LIGHT, borderLeft: `3px solid ${c.color}`, ...staggerStyle(i, 0.12) }}>
                  <ImagePlaceholder label={c.tag} w={80} h={70} style={{ flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold" style={{ color: DARK, fontFamily: SERIF }}>{c.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5" style={{ color: c.color, background: 'rgba(255,255,255,0.6)', fontFamily: SANS }}>{c.tag}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed mb-1" style={{ color: CHARCOAL, fontFamily: SERIF }}>{c.desc}</p>
                    <span className="text-[10px]" style={{ color: TEXT3, fontFamily: SANS }}>适用：{c.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'results') {
      const accent = slide.accent || GOLD
      const bgMap = { [PRIMARY]: PRIMARY_LIGHT, [TEAL]: TEAL_LIGHT, [ACCENT]: ACCENT_LIGHT, [GOLD]: GOLD_LIGHT }
      return (
        <div className="flex h-full" key={animKey}>
          <div className="w-[4px] flex-shrink-0" style={{ background: accent }} />
          <div className="flex-1 flex pt-8 px-14 pb-6 gap-6">
            <div className="flex-1 flex flex-col pt-2 min-w-0">
              <h2 className="text-lg font-bold mb-5 pb-2" style={{ color: DARK, borderBottom: `2px solid ${accent}`, fontFamily: SERIF, animation: `mus-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="grid grid-cols-2 gap-3">
                {slide.findings.map((f, i) => (
                  <div key={i} className="p-4" style={{ background: bgMap[f.color] || PRIMARY_LIGHT, borderTop: `3px solid ${f.color}`, ...staggerStyle(i, 0.12) }}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold" style={{ color: f.color, fontFamily: DISPLAY, fontFeatureSettings: '"tnum"' }}>
                        +<CounterValue target={f.value} suffix={f.suffix} duration={1400} />
                      </span>
                      <span className="text-sm font-bold" style={{ color: DARK, fontFamily: SERIF }}>{f.label}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed" style={{ color: CHARCOAL, fontFamily: SERIF }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[220px] flex-shrink-0 flex flex-col justify-center" style={{ animation: `mus-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label="实验组 vs 对照组对比图" w="100%" h="100%" style={{ minHeight: 280 }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'conclusion') {
      const accent = slide.accent || PRIMARY
      return (
        <div className="flex h-full" key={animKey}>
          <div className="w-[4px] flex-shrink-0" style={{ background: accent }} />
          <div className="flex-1 flex pt-8 px-14 pb-6 gap-6">
            <div className="flex-1 flex flex-col pt-2 min-w-0">
              <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: DARK, borderBottom: `2px solid ${accent}`, fontFamily: SERIF, animation: `mus-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="space-y-3 mb-5">
                {slide.conclusions.map((c, i) => (
                  <div key={i} className="flex items-start gap-3" style={staggerStyle(i)}>
                    <span className="text-[10px] font-bold mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center text-white" style={{ background: accent, borderRadius: 2, fontFamily: SERIF_EN }}>{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm leading-[1.7]" style={{ color: DARK, fontFamily: SERIF }}>{c}</p>
                  </div>
                ))}
              </div>
              <div className="mb-4" style={{ animation: `mus-fade-up 0.55s ${EASE} 0.35s both` }}>
                <div className="text-[10px] font-bold mb-1.5 tracking-wider" style={{ color: accent, fontFamily: SANS }}>主要发表成果</div>
                <div className="space-y-1">
                  {slide.publications.map((pub, i) => (
                    <p key={i} className="text-[11px] leading-relaxed" style={{ color: TEXT3, fontFamily: SERIF }}>[{i + 1}] {pub}</p>
                  ))}
                </div>
              </div>
              <div className="p-4" style={{ background: PRIMARY_LIGHT, borderLeft: `3px solid ${accent}`, animation: `mus-fade-up 0.55s ${EASE} 0.45s both` }}>
                <div className="text-[10px] font-bold mb-1" style={{ color: accent, fontFamily: SANS }}>未来工作</div>
                <p className="text-[11px] leading-relaxed" style={{ color: CHARCOAL, fontFamily: SERIF }}>{slide.future}</p>
              </div>
            </div>
            <div className="w-[200px] flex-shrink-0 flex flex-col justify-center gap-3" style={{ animation: `mus-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label="未来研究方向" w="100%" h={160} />
              <div className="p-3 text-center" style={{ background: PRIMARY_LIGHT, border: `1px dashed ${RULE}`, borderRadius: 3 }}>
                <span className="text-[9px]" style={{ color: TEXT3, fontFamily: SANS }}>校徽 / 院徽</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'end') {
      return (
        <div className="flex h-full" key={animKey}>
          <div className="w-[5px] flex-shrink-0" style={{ background: PRIMARY }} />
          <div className="flex-1 flex flex-col items-center justify-center text-center relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 960 540" preserveAspectRatio="none">
              <StaffDecor x={200} y={180} width={560} gap={10} color={PRIMARY} opacity={0.04} />
              <StaffDecor x={250} y={320} width={460} gap={10} color={ACCENT} opacity={0.03} />
              <WaveDecor d="M 100 250 Q 300 220, 500 250 T 900 240" color={TEAL} opacity={0.05} sw={1.5} />
              <WaveDecor d="M 0 380 Q 200 350, 400 380 T 800 370" color={GOLD} opacity={0.04} sw={1} />
            </svg>
            <div className="flex gap-3 mb-8" style={{ animation: `mus-fade-up 0.6s ${EASE} both` }}>
              <div className="w-8 h-[2px] rounded-full" style={{ background: PRIMARY }} />
              <div className="w-8 h-[2px] rounded-full" style={{ background: ACCENT }} />
              <div className="w-8 h-[2px] rounded-full" style={{ background: GOLD }} />
            </div>
            <h1 className="text-[36px] font-bold mb-3 relative z-10" style={{ color: DARK, fontFamily: SERIF, animation: `mus-rise 0.8s ${EASE} 0.1s both` }}>{slide.title}</h1>
            <p className="text-sm relative z-10" style={{ color: TEXT3, fontFamily: SERIF, animation: `mus-fade-up 0.6s ${EASE} 0.3s both` }}>{slide.subtitle}</p>
            <div className="flex gap-3 mt-8" style={{ animation: `mus-fade-up 0.6s ${EASE} 0.4s both` }}>
              <div className="w-8 h-[2px] rounded-full" style={{ background: PRIMARY }} />
              <div className="w-8 h-[2px] rounded-full" style={{ background: ACCENT }} />
              <div className="w-8 h-[2px] rounded-full" style={{ background: GOLD }} />
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#b8c0bc' }}>
      <style>{`
        @keyframes mus-fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        @keyframes mus-fade-down{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}}
        @keyframes mus-rise{from{opacity:0;transform:translateY(36px) scale(.98);filter:blur(4px)}to{opacity:1;transform:none;filter:none}}
        @keyframes mus-blur-in{from{opacity:0;filter:blur(8px)}to{opacity:1;filter:none}}
      `}</style>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-5xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: BG, overflow: 'hidden' }}>

        <div className="flex-1 relative">
          {renderSlide()}
          <div className="absolute bottom-3 left-14 right-14 flex items-center justify-between">
            <span className="text-[10px]" style={{ color: TEXT3, fontFamily: SERIF_EN }}>XX师范大学音乐学院 · 硕士学位论文答辩</span>
            <span className="text-[10px]" style={{ color: TEXT3, fontFamily: SERIF_EN, fontFeatureSettings: '"tnum"' }}>{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>
        <div className="h-[2px] relative" style={{ background: RULE }}>
          <div className="absolute left-0 top-0 h-full transition-all" style={{ width: `${progress}%`, background: pageAccent, transition: `width 0.4s ${EASE}` }} />
        </div>

        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-3 right-3 p-1.5 cursor-pointer opacity-25 hover:opacity-50 transition-opacity" style={{ border: 'none', background: 'none' }}>
          {fullscreen ? <Minimize2 className="w-3.5 h-3.5" style={{ color: TEXT3 }} /> : <Maximize2 className="w-3.5 h-3.5" style={{ color: TEXT3 }} />}
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-1.5 disabled:opacity-20 cursor-pointer disabled:cursor-default" style={{ border: 'none', background: 'none' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: TEXT3 }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => { setCurrent(i); setAnimKey((k) => k + 1) }} className="rounded-full cursor-pointer transition-all"
            style={i === current
              ? { background: pageAccent, width: '16px', height: '4px' }
              : { background: RULE, width: '4px', height: '4px', opacity: 0.5 }}
          />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-1.5 disabled-20 cursor-pointer disabled:cursor-default" style={{ border: 'none', background: 'none' }}>
          <ChevronRight className="w-4 h-4" style={{ color: TEXT3 }} />
        </button>
      </div>
    </div>
  )
}
