import { isColorDark } from './colorUtils'

export function generateCSSVars(style) {
  const c = style.colors
  const isDark = isColorDark(c.primary)
  return `:root {
  /* ${style.label} Color System */
  --color-primary: ${c.primary};
  --color-secondary: ${c.secondary};
  --color-accent: ${c.accent};
  --color-highlight: ${c.highlight};

  /* Semantic Colors */
  --color-bg: ${c.primary};
  --color-bg-secondary: ${c.secondary};
  --color-surface: ${c.accent};
  --color-text-primary: ${isDark ? '#ffffff' : '#000000'};
  --color-text-secondary: ${isDark ? '#a3a3a3' : '#525252'};
  --color-text-muted: ${isDark ? '#737373' : '#a3a3a3'};
  --color-border: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
  --color-border-hover: ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
}`
}

export function generateTailwindConfig(style) {
  const c = style.colors
  return `// Tailwind CSS Config for ${style.label}
colors: {
  primary: '${c.primary}',
  secondary: '${c.secondary}',
  accent: '${c.accent}',
  highlight: '${c.highlight}',
  surface: '${c.accent}',
  bg: '${c.primary}',
  'bg-secondary': '${c.secondary}',
}`
}

export function generateCoreCSS(style) {
  const c = style.colors
  const isDark = isColorDark(c.primary)
  const radiusMap = {
    '0px': '0', '2px': '2px', '4px': '4px', '6px': '6px',
    '8px': '8px', '10px': '10px', '12px': '12px', '16px': '16px',
    '20px': '20px', '24px': '24px', '28px': '28px',
    '16px/28px': '16px', '动态圆角': '20px', '不规则': '8px',
  }
  const radius = radiusMap[style.borderRadius] || '12px'

  const lines = [
    `/* ${style.label} - Base Layout */`,
    `.dashboard {`,
    `  background-color: var(--color-bg);`,
    `  color: var(--color-text-primary);`,
    `  font-family: '${style.typography.primary}', system-ui, sans-serif;`,
    `  border-radius: ${radius};`,
    `}`,
    ``,
    `/* Card Component */`,
    `.card {`,
    `  background-color: var(--color-surface);`,
    `  border-radius: ${radius};`,
    `  border: ${style.borderWidth !== '无' ? style.borderWidth + ' solid var(--color-border)' : 'none'};`,
  ]

  if (style.id === 'glassmorphism') {
    lines.push(`  backdrop-filter: blur(20px) saturate(180%);`)
    lines.push(`  background-color: rgba(255, 255, 255, 0.08);`)
    lines.push(`  border: 1px solid rgba(255, 255, 255, 0.1);`)
  } else if (style.id === 'neumorphism') {
    lines.push(`  box-shadow: 8px 8px 16px rgba(0,0,0,0.15), -8px -8px 16px rgba(255,255,255,0.7);`)
  } else if (style.id === 'claymorphism') {
    lines.push(`  box-shadow: 0 4px 0 0 rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.12);`)
  } else if (style.id === 'neubrutalism') {
    lines.push(`  box-shadow: 4px 4px 0 0 #000;`)
    lines.push(`  border: 3px solid #000;`)
  } else if (style.id === 'hud') {
    lines.push(`  box-shadow: 0 0 10px rgba(0, 212, 255, 0.3), inset 0 0 10px rgba(0, 212, 255, 0.05);`)
  } else if (style.shadows !== '无') {
    lines.push(`  box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);`)
  }

  lines.push(`}`)
  lines.push(``)
  lines.push(`/* Button Component */`)
  lines.push(`.btn-primary {`)
  lines.push(`  background-color: var(--color-highlight);`)
  lines.push(`  color: ${isDark ? '#ffffff' : '#ffffff'};`)
  lines.push(`  border-radius: ${radius};`)
  lines.push(`  padding: 8px 16px;`)
  lines.push(`  font-weight: 500;`)
  lines.push(`  transition: all 150ms ease;`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`.btn-secondary {`)
  lines.push(`  background-color: transparent;`)
  lines.push(`  color: var(--color-highlight);`)
  lines.push(`  border: 1px solid var(--color-highlight);`)
  lines.push(`  border-radius: ${radius};`)
  lines.push(`  padding: 8px 16px;`)
  lines.push(`  font-weight: 500;`)
  lines.push(`  transition: all 150ms ease;`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`/* Badge / Tag Component */`)
  lines.push(`.badge {`)
  lines.push(`  background-color: color-mix(in srgb, var(--color-highlight) 15%, transparent);`)
  lines.push(`  color: var(--color-highlight);`)
  lines.push(`  border-radius: calc(${radius} * 0.5);`)
  lines.push(`  padding: 2px 8px;`)
  lines.push(`  font-size: 12px;`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`/* Input Component */`)
  lines.push(`.input {`)
  lines.push(`  background-color: var(--color-bg-secondary);`)
  lines.push(`  border: 1px solid var(--color-border);`)
  lines.push(`  border-radius: ${radius};`)
  lines.push(`  padding: 8px 12px;`)
  lines.push(`  color: var(--color-text-primary);`)
  lines.push(`  transition: border-color 150ms ease;`)
  lines.push(`}`)
  lines.push(``)
  lines.push(`.input:focus {`)
  lines.push(`  outline: none;`)
  lines.push(`  border-color: var(--color-highlight);`)
  lines.push(`  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-highlight) 20%, transparent);`)
  lines.push(`}`)

  if (style.id === 'glassmorphism') {
    lines.push(``)
    lines.push(`/* Glassmorphism Overlay */`)
    lines.push(`.glass-overlay {`)
    lines.push(`  backdrop-filter: blur(20px) saturate(180%);`)
    lines.push(`  background-color: rgba(255, 255, 255, 0.05);`)
    lines.push(`  border: 1px solid rgba(255, 255, 255, 0.08);`)
    lines.push(`}`)
  }

  if (style.id === 'hud') {
    lines.push(``)
    lines.push(`/* Glow Effect */`)
    lines.push(`.glow-text {`)
    lines.push(`  color: ${c.accent};`)
    lines.push(`  text-shadow: 0 0 10px ${c.accent}80, 0 0 20px ${c.accent}40;`)
    lines.push(`}`)
  }

  return lines.join('\n')
}

export function generateStylePrompt(style, styleKeywords) {
  const keywords = styleKeywords[style.id] || []
  const c = style.colors
  const isDark = isColorDark(c.primary)

  const cssVars = `:root {
  /* ${style.label} Color System */
  --color-primary: ${c.primary};
  --color-secondary: ${c.secondary};
  --color-accent: ${c.accent};
  --color-highlight: ${c.highlight};

  /* Semantic Colors */
  --color-bg: ${c.primary};
  --color-bg-secondary: ${c.secondary};
  --color-surface: ${c.accent};
  --color-text-primary: ${isDark ? '#ffffff' : '#000000'};
  --color-text-secondary: ${isDark ? '#a3a3a3' : '#525252'};
  --color-text-muted: ${isDark ? '#737373' : '#a3a3a3'};
  --color-border: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
  --color-border-hover: ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
}`

  const tailwindConfig = `// Tailwind CSS Config for ${style.label}
colors: {
  primary: '${c.primary}',
  secondary: '${c.secondary}',
  accent: '${c.accent}',
  highlight: '${c.highlight}',
  surface: '${c.accent}',
  bg: '${c.primary}',
  'bg-secondary': '${c.secondary}',
}`

  const coreCSS = generateCoreCSS(style)

  return `# ${style.label} 风格设计规范

## 风格关键词 / Style Keywords
${keywords.join('、')}

## 风格描述
${style.description}
${style.descriptionZh}

## 适用场景
${style.useCases.join('、')}

## CSS 自定义属性 / CSS Custom Properties
\`\`\`css
${cssVars}
\`\`\`

## Tailwind CSS 配置 / Tailwind Config
\`\`\`javascript
${tailwindConfig}
\`\`\`

## 核心 CSS 样式 / Core CSS Styles
\`\`\`css
${coreCSS}
\`\`\`

## 设计参数 / Design Tokens
- 圆角: ${style.borderRadius}
- 间距系统: ${style.spacing}
- 边框: ${style.borderWidth}
- 阴影: ${style.shadows}
- 动效: ${style.animations}
- 字体: ${style.typography.primary} / ${style.typography.secondary}
- 对比度: WCAG ${style.contrast}
- 暗色模式: ${style.darkMode}
- 响应式: ${style.responsive}
- 性能: ${style.performance}
- 无障碍: ${style.accessibility}

---
提示: 将以上内容投喂给AI，可快速复刻该风格的页面设计。`
}
