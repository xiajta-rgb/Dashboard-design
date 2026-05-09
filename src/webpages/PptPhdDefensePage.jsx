import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, ImageIcon } from 'lucide-react'

const ACCENT = '#1a3a7a'
const ACCENT_SOFT = '#e8edf8'
const BLACK = '#0a0a0a'
const TEXT2 = '#333333'
const TEXT3 = '#707070'
const BG = '#fdfcf8'
const BG_SOFT = '#f7f5ed'
const SURFACE = '#ffffff'
const BORDER = 'rgba(20,20,20,.14)'
const BORDER_STRONG = 'rgba(20,20,20,.35)'
const BORDER_MID = 'rgba(20,20,20,.25)'
const RED = '#8a1a1a'
const GREEN = '#1a5a2a'

const EASE = 'cubic-bezier(.4,0,.2,1)'
const SERIF = "'Noto Serif SC','Source Han Serif SC','SimSun',Georgia,serif"
const SERIF_EN = "'Latin Modern Roman','Playfair Display',Georgia,serif"
const MONO = "'JetBrains Mono','Fira Code','Consolas',monospace"

function ImagePlaceholder({ label = '图片', w, h, className = '', style = {} }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}
      style={{ background: ACCENT_SOFT, border: `1px dashed ${BORDER_MID}`, borderRadius: 2, width: w, height: h, ...style }}>
      <ImageIcon style={{ width: 18, height: 18, color: BORDER_MID, marginBottom: 3 }} />
      <span style={{ fontSize: 9, color: TEXT3, fontFamily: "'Inter',sans-serif" }}>{label}</span>
    </div>
  )
}

const slides = [
  {
    type: 'cover',
    institution: 'XX大学',
    title: '基于深度学习的多模态数据融合方法研究',
    titleEn: 'Research on Multi-modal Data Fusion Methods Based on Deep Learning',
    author: '答辩人：张明远',
    advisor: '指导教师：李建国 教授',
    department: '计算机科学与技术学院',
    date: '二〇二六年六月',
  },
  {
    type: 'toc',
    sections: [
      { num: '01', title: '研究背景与问题提出', titleEn: 'Background & Problem Statement', desc: '数据增长、语义鸿沟、精度-效率权衡' },
      { num: '02', title: '研究方法与创新点', titleEn: 'Methodology & Contributions', desc: 'CMAFN框架、Bi-CMA机制、AGFM模块、MAKD策略' },
      { num: '03', title: '结论与展望', titleEn: 'Conclusion & Future Work', desc: 'SOTA性能、理论框架、边缘部署' },
    ],
  },
  {
    type: 'section',
    num: '01',
    title: '研究背景与问题提出',
    titleEn: 'Background & Problem Statement',
    points: ['多模态数据的指数增长与挑战', '跨模态语义鸿沟问题', '精度-效率权衡困境'],
  },
  {
    type: 'content-img',
    heading: '研究背景',
    items: [
      { text: '多源异构数据（文本、图像、音频、视频）的规模呈指数增长，跨模态语义理解成为核心挑战', sub: 'IDC预测2025年全球数据量达175ZB，其中80%为非结构化多模态数据' },
      { text: '现有融合方法在跨模态表示对齐中存在语义鸿沟，导致信息损失与性能退化', sub: 'Baltrušaitis et al., 2019; Ramachandram & Taylor, 2017' },
      { text: '实时应用场景对推理效率提出严格约束，精度-效率权衡尚未有效解决', sub: '工业部署要求延迟<50ms，现有方法普遍>100ms' },
    ],
    imgLabel: '多模态数据增长趋势',
  },
  {
    type: 'framework-img',
    heading: '研究框架',
    problem: '核心问题：如何构建统一的多模态融合框架，在保证语义一致性的同时满足实时推理需求？',
    aspects: [
      { label: '表示学习', desc: '跨模态统一表示空间构建', icon: 'R' },
      { label: '对齐机制', desc: '细粒度语义对齐与关联发现', icon: 'A' },
      { label: '融合策略', desc: '自适应加权与层次化融合', icon: 'F' },
      { label: '效率优化', desc: '知识蒸馏与模型压缩', icon: 'E' },
    ],
    imgLabel: '研究框架结构图',
  },
  {
    type: 'section',
    num: '02',
    title: '研究方法与创新点',
    titleEn: 'Methodology & Contributions',
    points: ['CMAFN核心架构', 'Bi-CMA注意力机制', 'AGFM门控融合模块', 'MAKD蒸馏策略'],
  },
  {
    type: 'method-img',
    heading: '核心方法：跨模态注意力融合网络 (CMAFN)',
    formula: 'L = α·L_align + β·L_fuse + γ·L_distill',
    formulaDesc: '其中 L_align 为跨模态对齐损失，L_fuse 为融合损失，L_distill 为蒸馏损失',
    points: [
      '提出双向跨模态注意力机制 (Bi-CMA)，实现细粒度语义对齐',
      '设计自适应门控融合模块 (AGFM)，动态调节各模态贡献权重',
      '引入模态感知知识蒸馏策略 (MAKD)，压缩模型至1/3参数量',
    ],
    imgLabel: 'CMAFN网络架构图',
  },
  {
    type: 'kpi-img',
    heading: '核心性能指标',
    metrics: [
      { value: 86.5, unit: '%', label: 'CMU-MOSEI Accuracy', delta: '+2.4', good: true },
      { value: 95.3, unit: '%', label: 'AV-MNIST Accuracy', delta: '+2.3', good: true },
      { value: 38, unit: 'ms', label: '推理延迟', delta: '-82', good: true },
      { value: 0.852, unit: '', label: 'CMU-MOSEI F1', delta: '+0.028', good: true },
    ],
    imgLabel: '性能对比雷达图',
  },
  {
    type: 'table',
    heading: '实验结果：与现有方法的对比',
    subtitle: '在三个基准数据集上的性能 (Accuracy % / F1-Score)',
    headers: ['Method', 'CMU-MOSEI', 'AV-MNIST', 'MM-IMDb'],
    rows: [
      ['MulT (Tsai et al., 2019)', '82.3 / 0.801', '91.2 / 0.908', '78.5 / 0.772'],
      ['MISA (Hazarika et al., 2020)', '83.7 / 0.819', '92.1 / 0.916', '79.8 / 0.785'],
      ['Self-MM (Yu et al., 2021)', '84.1 / 0.824', '93.0 / 0.925', '80.2 / 0.791'],
      ['CMAFN (Ours)', '86.5 / 0.852', '95.3 / 0.948', '82.7 / 0.813'],
    ],
    highlight: 3,
  },
  {
    type: 'content-img',
    heading: '创新点总结',
    items: [
      { text: '理论贡献：提出双向跨模态注意力机制，从信息论角度证明其优于单向注意力', sub: '定理1：Bi-CMA的互信息下界严格大于单向注意力' },
      { text: '方法贡献：设计自适应门控融合模块，实现模态贡献的动态感知与加权', sub: '相比固定权重策略，AGFM在缺失模态场景下性能提升4.2%' },
      { text: '工程贡献：提出模态感知知识蒸馏，将模型压缩至1/3参数量且精度损失<0.5%', sub: '推理延迟从120ms降至38ms，满足工业部署要求' },
    ],
    imgLabel: 'Bi-CMA vs 单向注意力对比',
  },
  {
    type: 'section',
    num: '03',
    title: '结论与展望',
    titleEn: 'Conclusion & Future Work',
    points: ['SOTA性能验证', '理论分析框架', '边缘设备部署', '未来研究方向'],
  },
  {
    type: 'conclusion',
    heading: '研究结论',
    conclusions: [
      '构建了统一的多模态融合框架CMAFN，在3个基准数据集上取得SOTA性能',
      '从信息论角度为跨模态注意力机制提供了理论分析框架',
      '提出的蒸馏策略使模型可部署于资源受限的边缘设备',
    ],
    publications: [
      'Zhang, M. et al. "Bi-directional Cross-modal Attention for Multi-modal Fusion." NeurIPS 2025.',
      'Zhang, M. et al. "Adaptive Gated Fusion with Modality-aware Distillation." ICML 2025.',
      'Zhang, M. et al. "Efficient Multi-modal Learning on Edge Devices." CVPR 2026.',
    ],
    future: '未来将探索开放场景下的模态缺失鲁棒性，以及大语言模型驱动的多模态推理范式。',
    imgLabel: '未来研究方向',
  },
  {
    type: 'end',
    title: '谢谢各位专家',
    subtitle: '恳请批评指正',
  },
]

function useCounter(target, duration = 1200, startOnMount = true) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const start = useCallback(() => {
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((eased * target).toFixed(target < 1 ? 3 : 1)))
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

function CounterNumber({ value, unit, duration = 1200 }) {
  const count = useCounter(value, duration)
  return <span>{count}{unit}</span>
}

export default function PptPhdDefensePage() {
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const prevRef = useRef(0)
  const go = useCallback((dir) => {
    setCurrent((c) => {
      const next = Math.max(0, Math.min(slides.length - 1, c + dir))
      if (next !== c) { prevRef.current = c; setAnimKey((k) => k + 1) }
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
    animation: `phd-fade-up 0.55s ${EASE} ${baseDelay + i * 0.09}s both`,
  })

  const renderSlide = () => {
    if (slide.type === 'cover') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="flex-1 flex flex-col justify-center px-16 py-8 relative">
            <div className="absolute top-6 left-16 right-6 flex items-center justify-between" style={{ animation: `phd-fade-down 0.6s ${EASE} both` }}>
              <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: TEXT3, fontFamily: SERIF_EN }}>{slide.institution}</span>
              <span className="text-[10px] tracking-[0.2em]" style={{ color: TEXT3, fontFamily: SERIF_EN }}>Ph.D. DISSERTATION DEFENSE</span>
            </div>
            <div className="absolute top-14 left-16 right-6 h-px" style={{ background: BORDER }} />
            <div style={{ animation: `phd-blur-in 0.9s ${EASE} 0.15s both` }}>
              <h1 className="text-[30px] font-bold leading-[1.5] mb-2 max-w-[560px]" style={{ color: BLACK, fontFamily: SERIF }}>{slide.title}</h1>
              <p className="text-xs mb-8" style={{ color: TEXT3, fontFamily: SERIF_EN, fontStyle: 'italic' }}>{slide.titleEn}</p>
            </div>
            <div className="w-14 h-[2px] mb-6" style={{ background: ACCENT, animation: `phd-fade-up 0.6s ${EASE} 0.4s both` }} />
            <div className="space-y-1 text-sm" style={{ color: TEXT2, animation: `phd-fade-up 0.6s ${EASE} 0.5s both` }}>
              <p>{slide.author}</p>
              <p>{slide.advisor}</p>
              <p style={{ color: TEXT3 }}>{slide.department}</p>
              <p style={{ color: TEXT3 }}>{slide.date}</p>
            </div>
          </div>
          <div className="w-[240px] flex-shrink-0 flex items-center justify-center p-6" style={{ animation: `phd-fade-up 0.7s ${EASE} 0.3s both` }}>
            <ImagePlaceholder label="校徽 / 院徽" w="100%" h="100%" style={{ minHeight: 260 }} />
          </div>
        </div>
      )
    }

    if (slide.type === 'toc') {
      return (
        <div key={animKey} className="flex flex-col justify-center h-full px-16 py-6">
          <h2 className="text-lg font-bold mb-6 pb-2" style={{ color: BLACK, fontFamily: SERIF, borderBottom: `1px solid ${BORDER_STRONG}`, animation: `phd-fade-up 0.6s ${EASE} both` }}>目 录</h2>
          <div className="space-y-0">
            {slide.sections.map((sec, i) => (
              <div key={i} className="flex items-center gap-5 py-4" style={{ borderBottom: `1px solid ${BORDER}`, ...staggerStyle(i, 0.15) }}>
                <span className="text-3xl font-bold" style={{ color: ACCENT, fontFamily: SERIF_EN, fontFeatureSettings: '"tnum"' }}>{sec.num}</span>
                <div className="flex-1">
                  <p className="text-base font-bold" style={{ color: BLACK, fontFamily: SERIF }}>{sec.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: TEXT3, fontFamily: SERIF_EN, fontStyle: 'italic' }}>{sec.titleEn}</p>
                  <p className="text-xs mt-1" style={{ color: TEXT2, fontFamily: SERIF }}>{sec.desc}</p>
                </div>
                <span className="text-xs" style={{ color: TEXT3, fontFamily: SERIF_EN }}>→</span>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (slide.type === 'section') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[3px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex flex-col justify-center px-16 py-6">
            <div className="flex gap-8 items-start">
              <div className="flex-1">
                <div className="text-6xl font-bold mb-3" style={{ color: ACCENT, opacity: 0.1, fontFamily: SERIF_EN, lineHeight: 1, animation: `phd-fade-down 0.6s ${EASE} both` }}>{slide.num}</div>
                <h2 className="text-[32px] font-bold leading-[1.3] mb-2" style={{ color: BLACK, fontFamily: SERIF, animation: `phd-fade-up 0.7s ${EASE} 0.1s both` }}>{slide.title}</h2>
                <p className="text-sm mb-4" style={{ color: TEXT3, fontFamily: SERIF_EN, fontStyle: 'italic', animation: `phd-fade-up 0.7s ${EASE} 0.2s both` }}>{slide.titleEn}</p>
                <div className="w-14 h-[2px] mb-4" style={{ background: ACCENT, animation: `phd-fade-up 0.7s ${EASE} 0.25s both` }} />
                {slide.points && (
                  <div className="space-y-1.5" style={{ animation: `phd-fade-up 0.7s ${EASE} 0.3s both` }}>
                    {slide.points.map((p, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                        <span className="text-sm" style={{ color: TEXT2, fontFamily: SERIF }}>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-[260px] flex-shrink-0" style={{ animation: `phd-fade-up 0.7s ${EASE} 0.35s both` }}>
                <ImagePlaceholder label="章节配图" w="100%" h={170} />
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'content-img') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[3px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex px-14 py-6 gap-5">
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h2 className="text-lg font-bold mb-5 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `phd-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="space-y-4">
                {slide.items.map((item, i) => (
                  <div key={i} style={staggerStyle(i, 0.12)}>
                    <div className="flex items-start gap-3 mb-0.5">
                      <span className="text-[10px] font-bold mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center" style={{ color: ACCENT, border: `1px solid ${ACCENT}`, fontFamily: SERIF_EN }}>{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-sm leading-[1.7]" style={{ color: BLACK, fontFamily: SERIF }}>{item.text}</p>
                    </div>
                    <p className="ml-8 text-[11px] leading-relaxed" style={{ color: TEXT3, fontFamily: SERIF, fontStyle: 'italic' }}>{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[220px] flex-shrink-0 flex flex-col justify-center" style={{ animation: `phd-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label={slide.imgLabel || '配图'} w="100%" h="100%" style={{ minHeight: 260 }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'framework-img') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[3px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex px-14 py-6 gap-5">
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `phd-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="p-4 mb-5" style={{ background: ACCENT_SOFT, borderLeft: `3px solid ${ACCENT}`, animation: `phd-fade-up 0.55s ${EASE} 0.1s both` }}>
                <p className="text-sm leading-[1.8]" style={{ color: BLACK, fontFamily: SERIF }}>{slide.problem}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {slide.aspects.map((a, i) => (
                  <div key={i} className="p-4" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderTop: `2px solid ${ACCENT}`, ...staggerStyle(i, 0.18) }}>
                    <div className="w-7 h-7 flex items-center justify-center text-xs font-bold mb-2" style={{ background: ACCENT, color: '#fff', fontFamily: SERIF_EN }}>{a.icon}</div>
                    <div className="text-sm font-bold mb-1" style={{ color: BLACK, fontFamily: SERIF }}>{a.label}</div>
                    <p className="text-[11px] leading-relaxed" style={{ color: TEXT3, fontFamily: SERIF }}>{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[210px] flex-shrink-0 flex flex-col justify-center" style={{ animation: `phd-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label={slide.imgLabel || '框架图'} w="100%" h="100%" style={{ minHeight: 280 }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'method-img') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[3px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex px-14 py-6 gap-5">
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `phd-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="p-4 mb-5 text-center" style={{ background: BG_SOFT, border: `1px solid ${BORDER}`, animation: `phd-fade-up 0.55s ${EASE} 0.1s both` }}>
                <p className="text-lg mb-1" style={{ color: BLACK, fontFamily: MONO, fontStyle: 'italic', letterSpacing: '0.02em' }}>{slide.formula}</p>
                <p className="text-[11px]" style={{ color: TEXT3, fontFamily: SERIF }}>{slide.formulaDesc}</p>
              </div>
              <div className="space-y-3">
                {slide.points.map((p, i) => (
                  <div key={i} className="flex items-start gap-3" style={staggerStyle(i, 0.2)}>
                    <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-[10px] font-bold" style={{ background: ACCENT, color: '#fff', fontFamily: SERIF_EN }}>{i + 1}</span>
                    <p className="text-sm leading-[1.7]" style={{ color: BLACK, fontFamily: SERIF }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[230px] flex-shrink-0 flex flex-col justify-center" style={{ animation: `phd-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label={slide.imgLabel || '网络架构图'} w="100%" h="100%" style={{ minHeight: 280 }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'kpi-img') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[3px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex px-14 py-6 gap-5">
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h2 className="text-lg font-bold mb-5 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `phd-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="grid grid-cols-2 gap-3">
                {slide.metrics.map((m, i) => (
                  <div key={i} className="p-4" style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderTop: `2px solid ${ACCENT}`, ...staggerStyle(i, 0.15) }}>
                    <div className="text-3xl font-bold mb-1" style={{ color: ACCENT, fontFamily: SERIF_EN, fontFeatureSettings: '"tnum"' }}>
                      <CounterNumber value={m.value} unit={m.unit} duration={1400} />
                    </div>
                    <p className="text-xs mb-1" style={{ color: TEXT2, fontFamily: SERIF }}>{m.label}</p>
                    <span className="text-[10px] font-bold px-1.5 py-0.5" style={{ color: m.good ? GREEN : RED, background: m.good ? 'rgba(26,90,42,.08)' : 'rgba(138,26,26,.08)' }}>{m.delta}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[210px] flex-shrink-0 flex flex-col justify-center" style={{ animation: `phd-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label={slide.imgLabel || '性能对比图'} w="100%" h="100%" style={{ minHeight: 280 }} />
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'table') {
      return (
        <div key={animKey} className="flex flex-col justify-center h-full px-16 py-6">
          <h2 className="text-lg font-bold mb-2 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `phd-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
          <p className="text-[11px] mb-5" style={{ color: TEXT3, fontFamily: SERIF, fontStyle: 'italic', animation: `phd-fade-up 0.55s ${EASE} 0.06s both` }}>{slide.subtitle}</p>
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse', animation: `phd-fade-up 0.55s ${EASE} 0.15s both` }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${ACCENT}` }}>
                {slide.headers.map((h, i) => (
                  <th key={i} className="text-left py-2.5 px-3 text-xs font-bold tracking-wider" style={{ color: ACCENT, fontFamily: SERIF_EN }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slide.rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${BORDER}`, background: i === slide.highlight ? ACCENT_SOFT : 'transparent', transition: 'background 0.3s' }}>
                  {row.map((cell, j) => (
                    <td key={j} className={`py-2.5 px-3 text-xs ${i === slide.highlight ? 'font-bold' : ''}`} style={{ color: i === slide.highlight ? ACCENT : BLACK, fontFamily: j === 0 ? SERIF : SERIF_EN, fontFeatureSettings: '"tnum"' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    if (slide.type === 'conclusion') {
      return (
        <div key={animKey} className="flex h-full">
          <div className="w-[3px] flex-shrink-0" style={{ background: ACCENT }} />
          <div className="flex-1 flex px-14 py-6 gap-5">
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h2 className="text-lg font-bold mb-4 pb-2" style={{ color: BLACK, borderBottom: `2px solid ${ACCENT}`, fontFamily: SERIF, animation: `phd-fade-up 0.55s ${EASE} both` }}>{slide.heading}</h2>
              <div className="space-y-3 mb-5">
                {slide.conclusions.map((c, i) => (
                  <div key={i} className="flex items-start gap-3" style={staggerStyle(i)}>
                    <span className="text-[10px] font-bold mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center" style={{ color: ACCENT, border: `1px solid ${ACCENT}`, fontFamily: SERIF_EN }}>{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm leading-[1.7]" style={{ color: BLACK, fontFamily: SERIF }}>{c}</p>
                  </div>
                ))}
              </div>
              <div className="mb-4" style={{ animation: `phd-fade-up 0.55s ${EASE} 0.35s both` }}>
                <div className="text-[10px] font-bold mb-2 tracking-wider" style={{ color: ACCENT, fontFamily: SERIF_EN }}>PUBLICATIONS</div>
                <div className="space-y-1">
                  {slide.publications.map((pub, i) => (
                    <p key={i} className="text-[11px] leading-relaxed" style={{ color: TEXT3, fontFamily: SERIF }}>[{i + 1}] {pub}</p>
                  ))}
                </div>
              </div>
              <div className="p-4" style={{ background: ACCENT_SOFT, borderLeft: `3px solid ${ACCENT}`, animation: `phd-fade-up 0.55s ${EASE} 0.45s both` }}>
                <div className="text-[10px] font-bold mb-1 tracking-wider" style={{ color: ACCENT, fontFamily: SERIF_EN }}>FUTURE WORK</div>
                <p className="text-[11px] leading-relaxed" style={{ color: TEXT2, fontFamily: SERIF }}>{slide.future}</p>
              </div>
            </div>
            <div className="w-[200px] flex-shrink-0 flex flex-col justify-center gap-3" style={{ animation: `phd-fade-up 0.6s ${EASE} 0.3s both` }}>
              <ImagePlaceholder label={slide.imgLabel || '研究展望图'} w="100%" h={160} />
              <div className="p-3 text-center" style={{ background: ACCENT_SOFT, border: `1px dashed ${BORDER_MID}`, borderRadius: 2 }}>
                <span className="text-[9px]" style={{ color: TEXT3, fontFamily: "'Inter',sans-serif" }}>校徽 / 院徽</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slide.type === 'end') {
      return (
        <div key={animKey} className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-14 h-[2px] mb-8" style={{ background: ACCENT, animation: `phd-fade-up 0.6s ${EASE} both` }} />
          <h1 className="text-[36px] font-bold mb-3" style={{ color: BLACK, fontFamily: SERIF, animation: `phd-rise 0.8s ${EASE} 0.1s both` }}>{slide.title}</h1>
          <p className="text-sm mb-6" style={{ color: TEXT3, fontFamily: SERIF, animation: `phd-fade-up 0.6s ${EASE} 0.3s both` }}>{slide.subtitle}</p>
          <div className="w-14 h-[2px]" style={{ background: ACCENT, animation: `phd-fade-up 0.6s ${EASE} 0.4s both` }} />
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#e8e6de' }}>
      <style>{`
        @keyframes phd-fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        @keyframes phd-fade-down{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}}
        @keyframes phd-rise{from{opacity:0;transform:translateY(36px) scale(.98);filter:blur(4px)}to{opacity:1;transform:none;filter:none}}
        @keyframes phd-blur-in{from{opacity:0;filter:blur(8px)}to{opacity:1;filter:none}}
      `}</style>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-5xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: BG, overflow: 'hidden' }}>
        <div className="flex-1 relative">
          {renderSlide()}
          <div className="absolute bottom-3 left-14 right-14 flex items-center justify-between">
            <span className="text-[10px]" style={{ color: TEXT3, fontFamily: SERIF_EN }}>XX大学 · 博士学位论文答辩</span>
            <span className="text-[10px]" style={{ color: TEXT3, fontFamily: SERIF_EN, fontFeatureSettings: '"tnum"' }}>{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>
        <div className="h-[2px] relative" style={{ background: BORDER }}>
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
              : { background: BORDER_STRONG, width: '4px', height: '4px', opacity: 0.5 }}
          />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-1.5 disabled:opacity-20 cursor-pointer disabled:cursor-default" style={{ border: 'none', background: 'none' }}>
          <ChevronRight className="w-4 h-4" style={{ color: TEXT3 }} />
        </button>
      </div>
    </div>
  )
}
