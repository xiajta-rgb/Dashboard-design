import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, ImageIcon } from 'lucide-react'

const CHARCOAL = '#2c2c2c'
const BLACK = '#1a1a1a'
const TEXT2 = '#3d3d3d'
const TEXT3 = '#7a7a7a'
const WARM = '#f5f2ed'
const WARM_DEEP = '#ebe6dd'
const RULE = '#c5c0b8'
const ACCENT = '#8b4513'
const ACCENT_SOFT = '#f0e6d8'

const EASE = 'cubic-bezier(.4,0,.2,1)'
const SERIF = "'Noto Serif SC','Source Han Serif SC','SimSun',Georgia,serif"
const SERIF_EN = "'Latin Modern Roman','Playfair Display',Georgia,serif"
const SANS = "'Inter','Helvetica Neue','PingFang SC',sans-serif"

function ImagePlaceholder({ label = '图片', w, h, className = '', style = {} }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}
      style={{ background: WARM, border: `1px dashed ${RULE}`, borderRadius: 2, width: w, height: h, ...style }}>
      <ImageIcon style={{ width: 18, height: 18, color: RULE, marginBottom: 3 }} />
      <span style={{ fontSize: 9, color: TEXT3, fontFamily: SANS }}>{label}</span>
    </div>
  )
}

const slides = [
  {
    type: 'cover',
    institution: 'XX美术学院',
    title: '「边界与流动」',
    subtitle: '当代数字艺术中的身份叙事',
    titleEn: 'Boundaries and Flows: Identity Narratives in Contemporary Digital Art',
    author: '答辩人：林若溪',
    advisor: '指导教师：陈逸风 教授',
    department: '数字媒体艺术系',
    date: '二〇二六年六月',
  },
  {
    type: 'toc',
    sections: [
      { num: '壹', title: '创作理念与问题意识', titleEn: 'Creative Concept & Problem Awareness', desc: '身份流动性、文化碰撞、数字媒介' },
      { num: '贰', title: '创作方法与媒介实验', titleEn: 'Methodology & Media Experiments', desc: '田野调查、素材转化、媒介实验、装置呈现' },
      { num: '叁', title: '理论支撑与学术脉络', titleEn: 'Theoretical Framework & Academic Context', desc: '后殖民理论、视觉文化、数字人文' },
      { num: '肆', title: '总结与展望', titleEn: 'Conclusion & Future Work', desc: '创作验证、方法论构建、未来拓展' },
    ],
  },
  {
    type: 'section',
    num: '壹',
    title: '创作理念与问题意识',
    titleEn: 'Creative Concept & Problem Awareness',
    points: ['全球化语境下的身份流动性', '数字媒介与传统技法的交融', '「中间状态」的视觉表达'],
  },
  {
    type: 'concept',
    heading: '创作理念',
    statement: '本系列作品探讨全球化语境下个体身份的流动性与碎片化。通过数字媒介与传统技法的交融，试图捕捉那些在文化碰撞中产生的「中间状态」——既不属于此，也不属于彼，而是存在于两者之间的模糊地带。',
    references: [
      'Hall, S. "Cultural Identity and Diaspora." Identity: Community, Culture, Difference, 1990.',
      'Bhabha, H. K. The Location of Culture. Routledge, 1994.',
      '李砚祖.《造物之美》.中国人民大学出版社, 2018.',
    ],
    keywords: ['身份流动性', '文化碰撞', '数字媒介', '中间状态'],
    imgLabel: '创作灵感来源',
  },
  {
    type: 'section',
    num: '贰',
    title: '创作方法与媒介实验',
    titleEn: 'Methodology & Media Experiments',
    points: ['18个月田野调查', '视觉符号系统构建', '水墨→数字→生成→综合', '多通道影像装置'],
  },
  {
    type: 'method',
    heading: '创作方法',
    process: [
      { phase: '田野调查', desc: '历时18个月，走访3个国家6个城市，收集47位移民的口述史与视觉素材', detail: '采用半结构化访谈与参与式观察，经伦理委员会审批 (IRB#2024-038)' },
      { phase: '素材转化', desc: '将口述叙事转化为视觉符号系统，建立「身份图谱」编码体系', detail: '参考Sol Worth & John Adair的视觉人类学方法' },
      { phase: '媒介实验', desc: '水墨手绘 → 数字扫描 → 算法生成 → 综合输出', detail: '使用Processing与TouchDesigner进行生成式创作' },
      { phase: '装置呈现', desc: '多通道影像装置 + 纸本原作 + 交互体验', detail: '展厅空间120㎡，3通道投影 + 12件纸本作品' },
    ],
    imgLabel: '创作流程图',
  },
  {
    type: 'gallery',
    heading: '作品展示',
    subtitle: '「边界」系列 · 2024—2026',
    works: [
      { title: '边界 No.1 — 漂泊的锚', medium: '水墨与数字合成 / 180×120cm / 2025', desc: '以船锚为意象，探讨定居与漂移之间的张力' },
      { title: '边界 No.2 — 折叠的地图', medium: '算法生成与宣纸印刷 / 90×90cm×3 / 2025', desc: '将地理边界折叠重组，消解固定疆域的概念' },
      { title: '边界 No.3 — 混声合唱', medium: '三通道影像装置 / 12min循环 / 2026', desc: '47位受访者的声音碎片编织成多声部叙事' },
    ],
  },
  {
    type: 'section',
    num: '叁',
    title: '理论支撑与学术脉络',
    titleEn: 'Theoretical Framework & Academic Context',
    points: ['Bhabha「第三空间」', 'Mitchell「图像转向」', 'Moretti「远读」策略'],
  },
  {
    type: 'theory',
    heading: '理论框架',
    theories: [
      { name: '后殖民理论', desc: 'Homi Bhabha的「第三空间」概念为「中间状态」提供理论依据', ref: 'Bhabha, 1994' },
      { name: '视觉文化研究', desc: 'W.J.T. Mitchell的「图像转向」论证了视觉媒介作为知识生产方式', ref: 'Mitchell, 1994' },
      { name: '数字人文方法论', desc: 'Franco Moretti的「远读」策略启发算法生成部分的创作逻辑', ref: 'Moretti, 2013' },
    ],
    position: '本研究位于后殖民理论、视觉文化与数字人文的交叉领域，以艺术创作为方法，回应全球化语境下的身份认同问题。',
    imgLabel: '理论框架关系图',
  },
  {
    type: 'section',
    num: '肆',
    title: '总结与展望',
    titleEn: 'Conclusion & Future Work',
    points: ['数字媒介交融的有效性验证', '系统化创作方法论', '声音艺术领域拓展'],
  },
  {
    type: 'conclusion',
    heading: '研究结论',
    conclusions: [
      '通过「边界」系列创作，验证了数字媒介与传统技法交融在表达身份流动性方面的有效性',
      '构建了从田野调查到视觉转化的系统化创作方法论，为同类研究提供可参照的实践路径',
      '作品受邀参加2025年上海双年展平行展，相关论文发表于《美术观察》2026年第2期',
    ],
    future: '后续计划将创作范围扩展至声音艺术领域，探索听觉维度中的身份叙事可能性，并开展跨文化比较研究。',
    imgLabel: '未来创作方向',
  },
  {
    type: 'end',
    title: '谢谢各位老师',
    subtitle: '恳请批评指正',
  },
]

export default function PptArtGraduatePage() {
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

  const staggerStyle = (i, baseDelay = 0.1) => ({
    animation: `art-fade-up 0.55s ${EASE} ${baseDelay + i * 0.09}s both`,
  })

  const renderSlide = () => {
    if (slide.type === 'cover') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[5px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex flex-col justify-center px-16 py-6 relative">
            <div className="absolute top-6 right-6" style={{ animation: `art-fade-down 0.6s ${EASE} both` }}>
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: TEXT3, fontFamily: SERIF_EN }}>{slide.institution}</span>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-1" style={{ animation: `art-blur-in 0.9s ${EASE} 0.1s both` }}>
                <h1 className="text-[42px] font-bold leading-[1.2] mb-2" style={{ color: BLACK, fontFamily: SERIF }}>{slide.title}</h1>
                <p className="text-lg mb-2" style={{ color: CHARCOAL, fontFamily: SERIF }}>{slide.subtitle}</p>
                <p className="text-xs mb-8" style={{ color: TEXT3, fontFamily: SERIF_EN, fontStyle: 'italic' }}>{slide.titleEn}</p>
                <div className="w-16 h-[2px] mb-6" style={{ background: ACCENT, animation: `art-fade-up 0.6s ${EASE} 0.4s both` }} />
                <div className="space-y-1 text-sm" style={{ color: TEXT2, animation: `art-fade-up 0.6s ${EASE} 0.5s both` }}>
                  <p>{slide.author}</p>
                  <p>{slide.advisor}</p>
                  <p style={{ color: TEXT3 }}>{slide.department}</p>
                  <p style={{ color: TEXT3 }}>{slide.date}</p>
                </div>
              </div>
              <div className="w-[220px] flex-shrink-0" style={{ animation: `art-fade-up 0.7s ${EASE} 0.3s both` }}>
                <ImagePlaceholder label="作品主视觉" w="100%" h={260} />
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'toc') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[5px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex flex-col justify-center px-16 py-6">
            <h2 className="text-lg font-bold mb-6 pb-2" style={{ color: BLACK, fontFamily: SERIF, borderBottom: `1px solid ${RULE}`, animation: `art-fade-up 0.6s ${EASE} both` }}>目 录</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-0">
              {slide.sections.map((sec, i) => (
                <div key={i} className="flex items-start gap-4 py-4" style={{ borderBottom: `1px solid ${RULE}`, ...staggerStyle(i, 0.15) }}>
                  <span className="text-2xl font-bold" style={{ color: ACCENT, fontFamily: SERIF }}>{sec.num}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold" style={{ color: BLACK, fontFamily: SERIF }}>{sec.title}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: TEXT3, fontFamily: SERIF_EN, fontStyle: 'italic' }}>{sec.titleEn}</p>
                    <p className="text-[11px] mt-1" style={{ color: TEXT2, fontFamily: SERIF }}>{sec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'section') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[5px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex flex-col justify-center px-16 py-6">
            <div className="flex gap-8 items-start">
              <div className="flex-1">
                <div className="text-6xl font-bold mb-3" style={{ color: ACCENT, opacity: 0.12, fontFamily: SERIF, lineHeight: 1, animation: `art-fade-down 0.6s ${EASE} both` }}>{slide.num}</div>
                <h2 className="text-[30px] font-bold leading-[1.3] mb-2" style={{ color: BLACK, fontFamily: SERIF, animation: `art-fade-up 0.7s ${EASE} 0.1s both` }}>{slide.title}</h2>
                <p className="text-sm mb-4" style={{ color: TEXT3, fontFamily: SERIF_EN, fontStyle: 'italic', animation: `art-fade-up 0.7s ${EASE} 0.2s both` }}>{slide.titleEn}</p>
                <div className="w-14 h-[2px] mb-4" style={{ background: ACCENT, animation: `art-fade-up 0.7s ${EASE} 0.25s both` }} />
                {slide.points && (
                  <div className="space-y-1.5" style={{ animation: `art-fade-up 0.7s ${EASE} 0.3s both` }}>
                    {slide.points.map((p, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                        <span className="text-sm" style={{ color: TEXT2, fontFamily: SERIF }}>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-[240px] flex-shrink-0" style={{ animation: `art-fade-up 0.7s ${EASE} 0.35s both` }}>
                <ImagePlaceholder label="章节配图" w="100%" h={170} />
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'concept') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[4px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex px-14 py-6 gap-5">
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `art-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="p-4 mb-5" style={{ background: ACCENT_SOFT, borderLeft: `3px solid ${ACCENT}`, animation: `art-fade-up 0.55s ${EASE} 0.1s both` }}>
                <p className="text-sm leading-[1.9]" style={{ color: BLACK, fontFamily: SERIF }}>{slide.statement}</p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div style={staggerStyle(0, 0.18)}>
                  <div className="text-[10px] font-bold mb-2 tracking-wider" style={{ color: ACCENT, fontFamily: SANS }}>核心关键词</div>
                  <div className="flex flex-wrap gap-2">
                    {slide.keywords.map((kw, i) => (
                      <span key={i} className="text-xs px-2.5 py-1" style={{ color: CHARCOAL, background: WARM, border: `1px solid ${RULE}`, fontFamily: SERIF }}>{kw}</span>
                    ))}
                  </div>
                </div>
                <div style={staggerStyle(1, 0.24)}>
                  <div className="text-[10px] font-bold mb-2 tracking-wider" style={{ color: ACCENT, fontFamily: SANS }}>理论参考</div>
                  <div className="space-y-1">
                    {slide.references.map((ref, i) => (
                      <p key={i} className="text-[11px] leading-relaxed" style={{ color: TEXT3, fontFamily: SERIF }}>[{i + 1}] {ref}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[210px] flex-shrink-0 flex flex-col justify-center" style={{ animation: `art-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label={slide.imgLabel || '配图'} w="100%" h="100%" style={{ minHeight: 280 }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'method') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[4px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex px-14 py-6 gap-5">
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `art-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="space-y-0">
                {slide.process.map((step, i) => (
                  <div key={i} className="flex gap-4" style={staggerStyle(i, 0.12)}>
                    <div className="flex flex-col items-center w-7 flex-shrink-0">
                      <div className="w-7 h-7 flex items-center justify-center text-[10px] font-bold" style={{ background: ACCENT, color: '#fff', fontFamily: SERIF }}>{i + 1}</div>
                      {i < slide.process.length - 1 && <div className="w-px flex-1 my-1" style={{ background: RULE }} />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold" style={{ color: BLACK, fontFamily: SERIF }}>{step.phase}</span>
                      </div>
                      <p className="text-sm leading-relaxed mb-0.5" style={{ color: CHARCOAL, fontFamily: SERIF }}>{step.desc}</p>
                      <p className="text-[11px] leading-relaxed" style={{ color: TEXT3, fontFamily: SERIF, fontStyle: 'italic' }}>{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[200px] flex-shrink-0 flex flex-col justify-center" style={{ animation: `art-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label={slide.imgLabel || '创作流程图'} w="100%" h="100%" style={{ minHeight: 280 }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'gallery') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[4px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex flex-col justify-center px-14 py-6">
            <h2 className="text-lg font-bold mb-2 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `art-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
            <p className="text-[11px] mb-5" style={{ color: TEXT3, fontFamily: SERIF, fontStyle: 'italic', animation: `art-fade-up 0.55s ${EASE} 0.06s both` }}>{slide.subtitle}</p>
            <div className="grid grid-cols-3 gap-4">
              {slide.works.map((work, i) => (
                <div key={i} style={staggerStyle(i, 0.12)}>
                  <ImagePlaceholder label={`作品 No.${i + 1}`} w="100%" h={140} className="mb-3" />
                  <div className="text-sm font-bold mb-0.5" style={{ color: BLACK, fontFamily: SERIF }}>{work.title}</div>
                  <p className="text-[11px] mb-1" style={{ color: TEXT3, fontFamily: SERIF }}>{work.medium}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: CHARCOAL, fontFamily: SERIF }}>{work.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'theory') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[4px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex px-14 py-6 gap-5">
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `art-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="space-y-3 mb-5">
                {slide.theories.map((t, i) => (
                  <div key={i} className="p-4" style={{ background: WARM, borderLeft: `3px solid ${ACCENT}`, ...staggerStyle(i, 0.1) }}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm font-bold" style={{ color: ACCENT, fontFamily: SERIF }}>{t.name}</span>
                      <span className="text-[11px]" style={{ color: TEXT3, fontFamily: SERIF_EN, fontStyle: 'italic' }}>{t.ref}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: CHARCOAL, fontFamily: SERIF }}>{t.desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-4" style={{ background: ACCENT_SOFT, borderLeft: `3px solid ${ACCENT}`, animation: `art-fade-up 0.55s ${EASE} 0.4s both` }}>
                <p className="text-sm leading-[1.8]" style={{ color: BLACK, fontFamily: SERIF }}>{slide.position}</p>
              </div>
            </div>
            <div className="w-[200px] flex-shrink-0 flex flex-col justify-center" style={{ animation: `art-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label={slide.imgLabel || '理论框架图'} w="100%" h="100%" style={{ minHeight: 280 }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'conclusion') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[4px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex px-14 py-6 gap-5">
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `art-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="space-y-3 mb-5">
                {slide.conclusions.map((c, i) => (
                  <div key={i} className="flex items-start gap-3" style={staggerStyle(i)}>
                    <span className="text-[10px] font-bold mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center" style={{ color: ACCENT, border: `1px solid ${ACCENT}`, fontFamily: SERIF }}>{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm leading-[1.7]" style={{ color: BLACK, fontFamily: SERIF }}>{c}</p>
                  </div>
                ))}
              </div>
              <div className="p-4" style={{ background: ACCENT_SOFT, borderLeft: `3px solid ${ACCENT}`, animation: `art-fade-up 0.55s ${EASE} 0.35s both` }}>
                <div className="text-[10px] font-bold mb-1" style={{ color: ACCENT, fontFamily: SANS }}>未来工作</div>
                <p className="text-[11px] leading-relaxed" style={{ color: TEXT2, fontFamily: SERIF }}>{slide.future}</p>
              </div>
            </div>
            <div className="w-[200px] flex-shrink-0 flex flex-col justify-center gap-3" style={{ animation: `art-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label={slide.imgLabel || '未来创作方向'} w="100%" h={160} />
              <div className="p-3 text-center" style={{ background: ACCENT_SOFT, border: `1px dashed ${RULE}`, borderRadius: 2 }}>
                <span className="text-[9px]" style={{ color: TEXT3, fontFamily: SANS }}>校徽 / 院徽</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'end') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[5px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-[2px] mb-8" style={{ background: ACCENT, animation: `art-fade-up 0.6s ${EASE} both` }} />
            <h1 className="text-[36px] font-bold mb-3" style={{ color: BLACK, fontFamily: SERIF, animation: `art-rise 0.8s ${EASE} 0.1s both` }}>{slide.title}</h1>
            <p className="text-sm" style={{ color: TEXT3, fontFamily: SERIF, animation: `art-fade-up 0.6s ${EASE} 0.3s both` }}>{slide.subtitle}</p>
            <div className="w-14 h-[2px] mt-8" style={{ background: ACCENT, animation: `art-fade-up 0.6s ${EASE} 0.4s both` }} />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#ddd9d2' }}>
      <style>{`
        @keyframes art-fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        @keyframes art-fade-down{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}}
        @keyframes art-rise{from{opacity:0;transform:translateY(36px) scale(.98);filter:blur(4px)}to{opacity:1;transform:none;filter:none}}
        @keyframes art-blur-in{from{opacity:0;filter:blur(8px)}to{opacity:1;filter:none}}
      `}</style>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-5xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#faf8f5', overflow: 'hidden' }}>
        <div className="flex-1 relative">
          {renderSlide()}
          <div className="absolute bottom-3 left-14 right-14 flex items-center justify-between">
            <span className="text-[10px]" style={{ color: TEXT3, fontFamily: SERIF_EN }}>XX美术学院 · 艺术硕士毕业创作答辩</span>
            <span className="text-[10px]" style={{ color: TEXT3, fontFamily: SERIF_EN, fontFeatureSettings: '"tnum"' }}>{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>
        <div className="h-[2px] relative" style={{ background: RULE }}>
          <div className="absolute left-0 top-0 h-full transition-all" style={{ width: `${progress}%`, background: ACCENT, transition: `width 0.4s ${EASE}` }} />
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
              ? { background: ACCENT, width: '16px', height: '4px' }
              : { background: RULE, width: '4px', height: '4px', opacity: 0.6 }}
          />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-1.5 disabled:opacity-20 cursor-pointer disabled:cursor-default" style={{ border: 'none', background: 'none' }}>
          <ChevronRight className="w-4 h-4" style={{ color: TEXT3 }} />
        </button>
      </div>
    </div>
  )
}
