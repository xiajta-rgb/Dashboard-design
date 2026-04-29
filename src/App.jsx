import { useState, Suspense, lazy, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ExternalLink, X, BookOpen, Zap, Palette, Sparkles, Layers, Code, ChevronLeft, PanelRightOpen, PanelRightClose, Copy, Check, User, LogOut, ChevronDown, LayoutGrid, Component, Paintbrush, Ruler, FileCode, Eye } from 'lucide-react'
import { DashboardProvider } from './context/DashboardContext'

// Lazy load all dashboard components
const DashboardImports = {
  glassmorphism: () => import('./dashboards/GlassmorphismDashboard'),
  bento: () => import('./dashboards/BentoDashboard'),
  neumorphism: () => import('./dashboards/NeumorphismDashboard'),
  'dark-premium': () => import('./dashboards/DarkPremiumDashboard'),
  gradient: () => import('./dashboards/GradientDashboard'),
  minimal: () => import('./dashboards/MinimalDashboard'),
  claymorphism: () => import('./dashboards/ClaymorphismDashboard'),
  hud: () => import('./dashboards/HUDDashboard'),
  swiss: () => import('./dashboards/SwissDashboard'),
  spatial: () => import('./dashboards/SpatialDashboard'),
  neubrutalism: () => import('./dashboards/NeubrutalismDashboard'),
  sketch: () => import('./dashboards/SketchDashboard'),
  'material3': () => import('./dashboards/Material3Dashboard'),
  stripe: () => import('./dashboards/StripePremiumDashboard'),
  diffusion: () => import('./dashboards/DiffusionDashboard'),
  skeuomorphism: () => import('./dashboards/SkeuomorphismDashboard'),
  'neo-chinese': () => import('./dashboards/NeoChineseDashboard'),
  'guochao-retro': () => import('./dashboards/GuochaoRetroDashboard'),
  y2k: () => import('./dashboards/Y2KDashboard'),
  cream: () => import('./dashboards/CreamDashboard'),
  'jelly-glass': () => import('./dashboards/JellyGlassDashboard'),
  'pixel-art': () => import('./dashboards/PixelArtDashboard'),
  cyberpunk: () => import('./dashboards/CyberpunkDashboard'),
  'tech-minimal': () => import('./dashboards/TechMinimalDashboard'),
  'matte-luxury': () => import('./dashboards/MatteLuxuryDashboard'),
  'enterprise-minimal': () => import('./dashboards/EnterpriseMinimalDashboard'),
  'dashboard-data': () => import('./dashboards/DashboardDataDashboard'),
  'magazine-layout': () => import('./dashboards/MagazineLayoutDashboard'),
  boundless: () => import('./dashboards/BoundlessDashboard'),
  'topological-scientific': () => import('./dashboards/TopologicalScientificDashboard'),
  'fluorescent-labeling': () => import('./dashboards/FluorescentLabelingDashboard'),
  'schematic-minimal': () => import('./dashboards/SchematicMinimalDashboard'),
  'crystal-lattice': () => import('./dashboards/CrystalLatticeDashboard'),
  'dynamic-trajectory': () => import('./dashboards/DynamicTrajectoryDashboard'),
  'microscopic-texture': () => import('./dashboards/MicroscopicTextureDashboard'),
  'academic-collage': () => import('./dashboards/AcademicCollageDashboard'),
  'cold-precision': () => import('./dashboards/ColdPrecisionDashboard'),
  'bionic-mechanism': () => import('./dashboards/BionicMechanismDashboard'),
  'meteorological-contour': () => import('./dashboards/MeteorologicalContourDashboard'),
  'satellite-cloud': () => import('./dashboards/SatelliteCloudDashboard'),
  'heatmap-scientific': () => import('./dashboards/HeatmapScientificDashboard'),
  'spectral-analysis': () => import('./dashboards/SpectralAnalysisDashboard'),
  'geological-map': () => import('./dashboards/GeologicalMapDashboard'),
}

const dashboardComponents = {
  glassmorphism: lazy(DashboardImports['glassmorphism']),
  bento: lazy(DashboardImports['bento']),
  neumorphism: lazy(DashboardImports['neumorphism']),
  'dark-premium': lazy(DashboardImports['dark-premium']),
  gradient: lazy(DashboardImports['gradient']),
  minimal: lazy(DashboardImports['minimal']),
  claymorphism: lazy(DashboardImports['claymorphism']),
  hud: lazy(DashboardImports['hud']),
  swiss: lazy(DashboardImports['swiss']),
  spatial: lazy(DashboardImports['spatial']),
  neubrutalism: lazy(DashboardImports['neubrutalism']),
  sketch: lazy(DashboardImports['sketch']),
  'material3': lazy(DashboardImports['material3']),
  stripe: lazy(DashboardImports['stripe']),
  diffusion: lazy(DashboardImports['diffusion']),
  skeuomorphism: lazy(DashboardImports['skeuomorphism']),
  'neo-chinese': lazy(DashboardImports['neo-chinese']),
  'guochao-retro': lazy(DashboardImports['guochao-retro']),
  y2k: lazy(DashboardImports['y2k']),
  cream: lazy(DashboardImports['cream']),
  'jelly-glass': lazy(DashboardImports['jelly-glass']),
  'pixel-art': lazy(DashboardImports['pixel-art']),
  cyberpunk: lazy(DashboardImports['cyberpunk']),
  'tech-minimal': lazy(DashboardImports['tech-minimal']),
  'matte-luxury': lazy(DashboardImports['matte-luxury']),
  'enterprise-minimal': lazy(DashboardImports['enterprise-minimal']),
  'dashboard-data': lazy(DashboardImports['dashboard-data']),
  'magazine-layout': lazy(DashboardImports['magazine-layout']),
  boundless: lazy(DashboardImports['boundless']),
  'topological-scientific': lazy(DashboardImports['topological-scientific']),
  'fluorescent-labeling': lazy(DashboardImports['fluorescent-labeling']),
  'schematic-minimal': lazy(DashboardImports['schematic-minimal']),
  'crystal-lattice': lazy(DashboardImports['crystal-lattice']),
  'dynamic-trajectory': lazy(DashboardImports['dynamic-trajectory']),
  'microscopic-texture': lazy(DashboardImports['microscopic-texture']),
  'academic-collage': lazy(DashboardImports['academic-collage']),
  'cold-precision': lazy(DashboardImports['cold-precision']),
  'bionic-mechanism': lazy(DashboardImports['bionic-mechanism']),
  'meteorological-contour': lazy(DashboardImports['meteorological-contour']),
  'satellite-cloud': lazy(DashboardImports['satellite-cloud']),
  'heatmap-scientific': lazy(DashboardImports['heatmap-scientific']),
  'spectral-analysis': lazy(DashboardImports['spectral-analysis']),
  'geological-map': lazy(DashboardImports['geological-map']),
}

// Eagerly loaded dashboards for preview rendering
import GlassmorphismDashboard from './dashboards/GlassmorphismDashboard'
import BentoDashboard from './dashboards/BentoDashboard'
import NeumorphismDashboard from './dashboards/NeumorphismDashboard'
import DarkPremiumDashboard from './dashboards/DarkPremiumDashboard'
import GradientDashboard from './dashboards/GradientDashboard'
import MinimalDashboard from './dashboards/MinimalDashboard'
import ClaymorphismDashboard from './dashboards/ClaymorphismDashboard'
import HUDDashboard from './dashboards/HUDDashboard'
import SwissDashboard from './dashboards/SwissDashboard'
import SpatialDashboard from './dashboards/SpatialDashboard'
import NeubrutalismDashboard from './dashboards/NeubrutalismDashboard'
import SketchDashboard from './dashboards/SketchDashboard'
import Material3Dashboard from './dashboards/Material3Dashboard'
import StripePremiumDashboard from './dashboards/StripePremiumDashboard'
import DiffusionDashboard from './dashboards/DiffusionDashboard'
import SkeuomorphismDashboard from './dashboards/SkeuomorphismDashboard'
import NeoChineseDashboard from './dashboards/NeoChineseDashboard'
import GuochaoRetroDashboard from './dashboards/GuochaoRetroDashboard'
import Y2KDashboard from './dashboards/Y2KDashboard'
import CreamDashboard from './dashboards/CreamDashboard'
import JellyGlassDashboard from './dashboards/JellyGlassDashboard'
import PixelArtDashboard from './dashboards/PixelArtDashboard'
import CyberpunkDashboard from './dashboards/CyberpunkDashboard'
import TechMinimalDashboard from './dashboards/TechMinimalDashboard'
import MatteLuxuryDashboard from './dashboards/MatteLuxuryDashboard'
import EnterpriseMinimalDashboard from './dashboards/EnterpriseMinimalDashboard'
import DashboardDataDashboard from './dashboards/DashboardDataDashboard'
import MagazineLayoutDashboard from './dashboards/MagazineLayoutDashboard'
import BoundlessDashboard from './dashboards/BoundlessDashboard'
import TopologicalScientificDashboard from './dashboards/TopologicalScientificDashboard'
import FluorescentLabelingDashboard from './dashboards/FluorescentLabelingDashboard'
import SchematicMinimalDashboard from './dashboards/SchematicMinimalDashboard'
import CrystalLatticeDashboard from './dashboards/CrystalLatticeDashboard'
import DynamicTrajectoryDashboard from './dashboards/DynamicTrajectoryDashboard'
import MicroscopicTextureDashboard from './dashboards/MicroscopicTextureDashboard'
import AcademicCollageDashboard from './dashboards/AcademicCollageDashboard'
import ColdPrecisionDashboard from './dashboards/ColdPrecisionDashboard'
import BionicMechanismDashboard from './dashboards/BionicMechanismDashboard'
import MeteorologicalContourDashboard from './dashboards/MeteorologicalContourDashboard'
import SatelliteCloudDashboard from './dashboards/SatelliteCloudDashboard'
import HeatmapScientificDashboard from './dashboards/HeatmapScientificDashboard'
import SpectralAnalysisDashboard from './dashboards/SpectralAnalysisDashboard'
import GeologicalMapDashboard from './dashboards/GeologicalMapDashboard'

const previewComponents = {
  glassmorphism: GlassmorphismDashboard,
  bento: BentoDashboard,
  neumorphism: NeumorphismDashboard,
  'dark-premium': DarkPremiumDashboard,
  gradient: GradientDashboard,
  minimal: MinimalDashboard,
  claymorphism: ClaymorphismDashboard,
  hud: HUDDashboard,
  swiss: SwissDashboard,
  spatial: SpatialDashboard,
  neubrutalism: NeubrutalismDashboard,
  sketch: SketchDashboard,
  'material3': Material3Dashboard,
  stripe: StripePremiumDashboard,
  diffusion: DiffusionDashboard,
  skeuomorphism: SkeuomorphismDashboard,
  'neo-chinese': NeoChineseDashboard,
  'guochao-retro': GuochaoRetroDashboard,
  y2k: Y2KDashboard,
  cream: CreamDashboard,
  'jelly-glass': JellyGlassDashboard,
  'pixel-art': PixelArtDashboard,
  cyberpunk: CyberpunkDashboard,
  'tech-minimal': TechMinimalDashboard,
  'matte-luxury': MatteLuxuryDashboard,
  'enterprise-minimal': EnterpriseMinimalDashboard,
  'dashboard-data': DashboardDataDashboard,
  'magazine-layout': MagazineLayoutDashboard,
  boundless: BoundlessDashboard,
  'topological-scientific': TopologicalScientificDashboard,
  'fluorescent-labeling': FluorescentLabelingDashboard,
  'schematic-minimal': SchematicMinimalDashboard,
  'crystal-lattice': CrystalLatticeDashboard,
  'dynamic-trajectory': DynamicTrajectoryDashboard,
  'microscopic-texture': MicroscopicTextureDashboard,
  'academic-collage': AcademicCollageDashboard,
  'cold-precision': ColdPrecisionDashboard,
  'bionic-mechanism': BionicMechanismDashboard,
  'meteorological-contour': MeteorologicalContourDashboard,
  'satellite-cloud': SatelliteCloudDashboard,
  'heatmap-scientific': HeatmapScientificDashboard,
  'spectral-analysis': SpectralAnalysisDashboard,
  'geological-map': GeologicalMapDashboard,
}

const styles = [
  { id: 'glassmorphism', label: 'Glassmorphism', group: 'Modern', description: 'Frosted glass, translucent layers, depth through blur', descriptionZh: '毛玻璃效果，半透明层次，模糊深度', colors: { primary: '#1a1a2e', secondary: '#16213e', accent: '#0f3460', highlight: '#e94560' }, useCases: ['数据可视化', '创意展示', '品牌官网'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Inter', secondary: 'SF Pro' }, borderRadius: '16px', shadows: '多层模糊阴影', animations: '微妙悬浮', spacing: '8px基准', borderWidth: '1px半透明', darkMode: '原生支持', responsive: '优秀', performance: '中（backdrop-filter开销）', accessibility: '注意半透明层对比度' },
  { id: 'bento', label: 'Bento Grid', group: 'Modern', description: 'Modular asymmetric grid, spatial hierarchy', descriptionZh: '模块化非对称网格，空间层次', colors: { primary: '#0f0f0f', secondary: '#1a1a1a', accent: '#2d2d2d', highlight: '#6366f1' }, useCases: ['产品展示', '内容聚合', '个人主页'], complexity: 2, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'SF Pro', secondary: 'Inter' }, borderRadius: '20px', shadows: '无阴影', animations: '网格重排', spacing: '12px基准', borderWidth: '无', darkMode: '原生暗色', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'neumorphism', label: 'Neumorphism', group: 'Modern', description: 'Soft UI, extruded elements, tactile depth', descriptionZh: '柔软UI，凸出元素，触感深度', colors: { primary: '#e0e5ec', secondary: '#d1d9e6', accent: '#c3cfe2', highlight: '#6d5dfc' }, useCases: ['控制面板', '智能家居', 'IoT设备'], complexity: 2, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Poppins', secondary: 'Roboto' }, borderRadius: '12px', shadows: '内外双层阴影', animations: '按压反馈', spacing: '16px基准', borderWidth: '无', darkMode: '需适配', responsive: '良好', performance: '中', accessibility: '对比度需注意' },
  { id: 'dark-premium', label: 'Dark Premium', group: 'Modern', description: 'Deep blacks, subtle accents, refined contrast', descriptionZh: '深黑底色，微妙点缀，精致对比', colors: { primary: '#0a0a0a', secondary: '#141414', accent: '#1f1f1f', highlight: '#c9a227' }, useCases: ['金融后台', '高端SaaS', '数据平台'], complexity: 2, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'JetBrains Mono' }, borderRadius: '8px', shadows: '微弱投影', animations: '克制过渡', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'gradient', label: 'Gradient Vibrant', group: 'Modern', description: 'Refined gradients, balanced color, dynamic energy', descriptionZh: '克制的渐变，平衡色彩，动态活力', colors: { primary: '#667eea', secondary: '#764ba2', accent: '#f093fb', highlight: '#f5576c' }, useCases: ['营销页面', '创意工具', '社交媒体'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Plus Jakarta Sans', secondary: 'Inter' }, borderRadius: '12px', shadows: '彩色光晕', animations: '渐变流动', spacing: '12px基准', borderWidth: '无', darkMode: '需适配', responsive: '良好', performance: '中', accessibility: '渐变文字需注意' },
  { id: 'minimal', label: 'Minimal Clean', group: 'Modern', description: 'Pure whitespace, restrained elegance, clarity', descriptionZh: '纯净留白，克制的优雅，最大化清晰', colors: { primary: '#ffffff', secondary: '#f8f9fa', accent: '#e9ecef', highlight: '#212529' }, useCases: ['文档工具', '笔记应用', '阅读平台'], complexity: 1, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'Georgia' }, borderRadius: '4px', shadows: '无', animations: '极简淡入', spacing: '24px基准', borderWidth: '1px', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'stripe', label: 'Stripe Premium', group: 'SaaS', description: 'Industry benchmark, polished micro-interactions', descriptionZh: '行业标杆，精致的微交互', colors: { primary: '#0a2540', secondary: '#1a3a5c', accent: '#635bff', highlight: '#00d4aa' }, useCases: ['支付平台', '金融科技', '企业SaaS'], complexity: 4, techDifficulty: 3, contrast: 'AAA', typography: { primary: 'Söhne', secondary: 'SF Mono' }, borderRadius: '10px', shadows: '多层精致阴影', animations: '丰富微交互', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '优秀', performance: '中高', accessibility: '优秀' },
  { id: 'material3', label: 'Material 3', group: 'SaaS', description: 'Google M3 Expressive, rounded containers', descriptionZh: 'Google M3表达性设计，圆角容器', colors: { primary: '#6750a4', secondary: '#eaddff', accent: '#d0bcff', highlight: '#4f378b' }, useCases: ['Android应用', 'Google生态', '企业工具'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Roboto', secondary: 'Google Sans' }, borderRadius: '16px/28px', shadows: 'M3高程系统', animations: 'M3动效规范', spacing: '8dp基准', borderWidth: '无', darkMode: 'M3动态色彩', responsive: '优秀', performance: '高', accessibility: 'M3规范保障' },
  { id: 'claymorphism', label: 'Claymorphism', group: 'Niche', description: '3D rounded cards, warm tones, friendly feel', descriptionZh: '3D圆角卡片，温暖色调，友好质感', colors: { primary: '#f5f0e8', secondary: '#e8e0d0', accent: '#d4c5a9', highlight: '#ff6b6b' }, useCases: ['教育平台', '儿童应用', '休闲游戏'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Nunito', secondary: 'Quicksand' }, borderRadius: '24px', shadows: '3D膨胀阴影', animations: '弹性回弹', spacing: '16px基准', borderWidth: '无', darkMode: '需适配', responsive: '良好', performance: '中', accessibility: '需注意' },
  { id: 'neubrutalism', label: 'Neubrutalism', group: 'Niche', description: 'Bold borders, solid shadows, high contrast', descriptionZh: '粗边框，实心阴影，高对比度', colors: { primary: '#ffffff', secondary: '#ffd60a', accent: '#ff6b6b', highlight: '#4ecdc4' }, useCases: ['创意工作室', '时尚品牌', '艺术平台'], complexity: 2, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Space Grotesk', secondary: 'IBM Plex Mono' }, borderRadius: '0px', shadows: '4px硬阴影', animations: '生硬位移', spacing: '12px基准', borderWidth: '3px', darkMode: '需反转', responsive: '良好', performance: '高', accessibility: '优秀' },
  { id: 'sketch', label: 'Sketch', group: 'Niche', description: 'Hand-drawn feel, paper texture, approachable', descriptionZh: '手绘风格，纸张质感，平易近人', colors: { primary: '#faf8f5', secondary: '#f0ebe3', accent: '#e5ddd3', highlight: '#4a4a4a' }, useCases: ['设计工具', '创意笔记', '原型展示'], complexity: 3, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Caveat', secondary: 'Patrick Hand' }, borderRadius: '不规则', shadows: '手绘阴影', animations: '手绘擦除', spacing: '12px基准', borderWidth: '2px手绘', darkMode: '需适配', responsive: '中等', performance: '中', accessibility: '手写字体需注意' },
  { id: 'hud', label: 'HUD / Sci-Fi', group: 'Niche', description: 'Futuristic interface, monochrome cyan, technical', descriptionZh: '未来界面，单色青色，技术美学', colors: { primary: '#0a0a0a', secondary: '#0d1117', accent: '#00d4ff', highlight: '#00ff88' }, useCases: ['监控系统', '游戏界面', '科技展示'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Orbitron', secondary: 'Share Tech Mono' }, borderRadius: '2px', shadows: '发光效果', animations: '扫描线/闪烁', spacing: '8px基准', borderWidth: '1px发光', darkMode: '原生暗色', responsive: '中等', performance: '中', accessibility: '发光效果需注意' },
  { id: 'swiss', label: 'Swiss Modern', group: 'Advanced', description: 'Strict grid, bold typography, information density', descriptionZh: '严格网格，粗体排版，高信息密度', colors: { primary: '#ffffff', secondary: '#f5f5f5', accent: '#000000', highlight: '#ff0000' }, useCases: ['新闻媒体', '数据报告', '学术平台'], complexity: 3, techDifficulty: 2, contrast: 'AAA', typography: { primary: 'Helvetica Neue', secondary: 'Akzidenz Grotesk' }, borderRadius: '0px', shadows: '无', animations: '网格切换', spacing: '8px基准', borderWidth: '无', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'spatial', label: 'Spatial UI', group: 'Advanced', description: 'Depth layers, floating elements, perspective', descriptionZh: '深度层次，浮动元素，透视效果', colors: { primary: '#000000', secondary: '#1a1a2e', accent: '#16213e', highlight: '#00d4ff' }, useCases: ['VR/AR界面', '3D展示', '空间计算'], complexity: 5, techDifficulty: 5, contrast: 'AA', typography: { primary: 'SF Pro', secondary: 'Inter' }, borderRadius: '16px', shadows: '3D透视阴影', animations: '空间变换', spacing: '12px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '中等', performance: '低（3D渲染）', accessibility: '空间交互需注意' },
  { id: 'diffusion', label: 'Diffusion Light', group: 'Advanced', description: 'Soft scattered light, gentle glow, ethereal atmosphere', descriptionZh: '柔和弥散光，温润光晕，空灵氛围', colors: { primary: '#0a0a1a', secondary: '#1a1a3a', accent: '#2d2d5a', highlight: '#a78bfa' }, useCases: ['冥想应用', '高端展示', '艺术平台'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'DM Sans' }, borderRadius: '20px', shadows: '弥散光晕', animations: '柔和呼吸', spacing: '12px基准', borderWidth: '1px半透明', darkMode: '原生暗色', responsive: '良好', performance: '中（多层光晕）', accessibility: '注意光晕对比度' },
  { id: 'skeuomorphism', label: 'Skeuomorphism', group: 'Modern', description: 'Realistic material textures, leather, metal, wood grain', descriptionZh: '经典拟物化，复刻现实材质肌理，皮革金属木纹', colors: { primary: '#2c2c3a', secondary: '#3a3a4a', accent: '#c9a84c', highlight: '#d4b65a' }, useCases: ['高端应用', '奢侈品展示', '经典风格'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Georgia', secondary: 'Palatino' }, borderRadius: '8px', shadows: '多层真实阴影', animations: '材质过渡', spacing: '12px基准', borderWidth: '1px金属描边', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意纹理对比' },
  { id: 'neo-chinese', label: 'Neo-Chinese', group: 'Eastern', description: 'Ink wash, mortise lines, muted traditional palette', descriptionZh: '新中式UI，水墨留白，榫卯线条，青灰朱红低饱和国风配色', colors: { primary: '#f5f0e8', secondary: '#ebe5d9', accent: '#8b7355', highlight: '#b5544a' }, useCases: ['国风产品', '文化平台', '茶道/书法'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Noto Serif SC', secondary: 'Source Han Sans' }, borderRadius: '4px', shadows: '淡墨晕染', animations: '水墨晕开', spacing: '24px基准', borderWidth: '1px细线', darkMode: '需适配', responsive: '良好', performance: '高', accessibility: '需注意低饱和对比' },
  { id: 'guochao-retro', label: 'Guochao Retro', group: 'Eastern', description: 'Traditional patterns, bold colors, cloud/lattice motifs', descriptionZh: '国潮风UI，传统纹样，撞色排版，祥云窗棂元素', colors: { primary: '#1a0a0a', secondary: '#2a1010', accent: '#c41e3a', highlight: '#ffd700' }, useCases: ['国潮品牌', '文创产品', '传统节庆'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'ZCOOL KuaiLe', secondary: 'Noto Sans SC' }, borderRadius: '0px', shadows: '硬朗投影', animations: '传统纹样动画', spacing: '12px基准', borderWidth: '2px', darkMode: '原生暗色', responsive: '良好', performance: '高', accessibility: '需注意撞色对比' },
  { id: 'y2k', label: 'Y2K Millennium', group: 'Niche', description: 'High-sat laser, large rounded corners, jelly gradients', descriptionZh: 'Y2K千禧风，高饱和镭射，大圆润角，果冻渐变', colors: { primary: '#0a0020', secondary: '#1a0040', accent: '#ff00ff', highlight: '#00ffff' }, useCases: ['潮流品牌', '音乐平台', 'Z世代产品'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Space Grotesk', secondary: 'Inter' }, borderRadius: '24px', shadows: '霓虹光晕', animations: '脉冲闪烁', spacing: '12px基准', borderWidth: '2px渐变', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意霓虹对比' },
  { id: 'cream', label: 'Cream UI', group: 'Niche', description: 'Macaron pastels, extra rounded, soft matte, healing', descriptionZh: '奶油软萌风，马卡龙低饱和，超大圆角，治愈系', colors: { primary: '#faf5f0', secondary: '#f5ede4', accent: '#e8c8b0', highlight: '#d4a0a0' }, useCases: ['母婴产品', '治愈系应用', '轻量化工具'], complexity: 2, techDifficulty: 1, contrast: 'AA', typography: { primary: 'Quicksand', secondary: 'Nunito' }, borderRadius: '20px', shadows: '柔和投影', animations: '弹性回弹', spacing: '16px基准', borderWidth: '无', darkMode: '需适配', responsive: '优秀', performance: '高', accessibility: '需注意低饱和对比' },
  { id: 'jelly-glass', label: 'Jelly Glass', group: 'Niche', description: 'High-sat translucent soft glass, jelly wobble', descriptionZh: '果冻玻璃，高饱和半透软质玻璃，区别冷调毛玻璃', colors: { primary: '#ff6b9d', secondary: '#c44dff', accent: '#6e5cff', highlight: '#00d4ff' }, useCases: ['社交产品', '创意工具', '潮流应用'], complexity: 3, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Poppins', secondary: 'Inter' }, borderRadius: '24px', shadows: '彩色半透阴影', animations: '果冻晃动', spacing: '12px基准', borderWidth: '1px半透', darkMode: '需适配', responsive: '良好', performance: '中', accessibility: '需注意半透对比' },
  { id: 'pixel-art', label: 'Pixel Art', group: 'Niche', description: '8/16-bit retro pixel, game-oriented, nostalgic', descriptionZh: '像素风UI，8/16位复古像素，游戏向界面，怀旧质感', colors: { primary: '#1a1c2c', secondary: '#262b44', accent: '#ef7d57', highlight: '#a7f070' }, useCases: ['游戏界面', '复古产品', '极客社区'], complexity: 2, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Press Start 2P', secondary: 'VT323' }, borderRadius: '0px', shadows: '像素阴影', animations: '像素闪烁', spacing: '4px基准', borderWidth: '3px', darkMode: '原生暗色', responsive: '中等', performance: '高', accessibility: '像素字体需注意' },
  { id: 'cyberpunk', label: 'Cyberpunk', group: 'Niche', description: 'Neon clash, glitch offset, dark neon, dystopian tech', descriptionZh: '赛博朋克UI，霓虹撞色，故障错位，暗底霓虹', colors: { primary: '#0a0010', secondary: '#0f0018', accent: '#ff003c', highlight: '#00f0ff' }, useCases: ['游戏界面', '科技展示', '潮流品牌'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Orbitron', secondary: 'Share Tech Mono' }, borderRadius: '0px/斜切角', shadows: '霓虹发光', animations: '故障闪烁', spacing: '8px基准', borderWidth: '1px霓虹', darkMode: '原生暗色', responsive: '中等', performance: '中', accessibility: '需注意霓虹对比' },
  { id: 'fluorescent-labeling', label: 'Fluorescent Labeling', group: 'Niche', description: 'Fluorescent color marking, high-transparency background, biological imaging', descriptionZh: '荧光标记风，荧光色标注，高透背景，生物成像/细胞标记绘图', colors: { primary: '#050510', secondary: '#080818', accent: '#1a1a40', highlight: '#00ff88' }, useCases: ['生物成像', '细胞标记', '荧光显微镜'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'JetBrains Mono' }, borderRadius: '2px', shadows: '荧光发光', animations: '脉冲闪烁', spacing: '8px基准', borderWidth: '1px荧光', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意荧光对比' },
  { id: 'dynamic-trajectory', label: 'Dynamic Trajectory', group: 'Niche', description: 'Smooth trajectory lines, dynamic blur, motion process visualization', descriptionZh: '动态轨迹风，流畅轨迹线条，动态模糊，运动过程/粒子轨迹绘图', colors: { primary: '#0a0a14', secondary: '#0e0e1a', accent: '#1a1a30', highlight: '#ff6b35' }, useCases: ['粒子轨迹', '运动分析', '流体力学'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Fira Code' }, borderRadius: '2px', shadows: '轨迹光晕', animations: '流动轨迹', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意动态效果' },
  { id: 'tech-minimal', label: 'Tech Minimal', group: 'SaaS', description: 'Cold gray monochrome, thin dividers, no decoration', descriptionZh: '科技极简，冷灰单色，细线条分割，政企科技产品专用', colors: { primary: '#fafafa', secondary: '#ffffff', accent: '#e5e5e5', highlight: '#171717' }, useCases: ['政企产品', '科技后台', 'B端系统'], complexity: 1, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'SF Mono' }, borderRadius: '0px', shadows: '无', animations: '无', spacing: '8px基准', borderWidth: '1px', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'matte-luxury', label: 'Matte Luxury', group: 'Advanced', description: 'Low-sat matte texture, fine metal outlines, no highlights', descriptionZh: '哑光轻奢，低饱和哑光肌理，细金属描边，无高光反光', colors: { primary: '#1a1816', secondary: '#1e1c1a', accent: '#8a7a5a', highlight: '#c8b898' }, useCases: ['高端品牌', '奢侈品官网', '私人银行'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Cormorant Garamond', secondary: 'Inter' }, borderRadius: '2px', shadows: '微妙投影', animations: '克制过渡', spacing: '12px基准', borderWidth: '1px金属描边', darkMode: '原生暗色', responsive: '优秀', performance: '高', accessibility: '需注意低饱和对比' },
  { id: 'enterprise-minimal', label: 'Enterprise Minimal', group: 'SaaS', description: 'Pure B/W/gray, function-oriented, no decoration, government/large B2B', descriptionZh: '企业极简风，纯黑白灰功能导向，政务大型B端系统标配', colors: { primary: '#ffffff', secondary: '#fafafa', accent: '#e0e0e0', highlight: '#111111' }, useCases: ['政务系统', '大型B端', '企业后台'], complexity: 1, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'System UI' }, borderRadius: '0px', shadows: '无', animations: '无', spacing: '8px基准', borderWidth: '1px', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'dashboard-data', label: 'Dashboard Data', group: 'SaaS', description: 'Modular data layout, minimal charts, strong hierarchy, BI/back-office', descriptionZh: '数据仪表盘风，模块化数据布局，极简图表，BI后台专用', colors: { primary: '#0f1117', secondary: '#131620', accent: '#6366f1', highlight: '#22c55e' }, useCases: ['BI平台', '数据后台', '运维监控'], complexity: 3, techDifficulty: 2, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'JetBrains Mono' }, borderRadius: '6px', shadows: '微弱投影', animations: '数据刷新', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'magazine-layout', label: 'Magazine Layout', group: 'Advanced', description: 'Bold headline breaking grid, text-image interweaving, free layout', descriptionZh: '杂志版式UI，大标题破格排版，图文穿插，自由化版式', colors: { primary: '#faf8f5', secondary: '#ffffff', accent: '#1a1a1a', highlight: '#c4a35a' }, useCases: ['内容产品', '媒体平台', '博客杂志'], complexity: 3, techDifficulty: 2, contrast: 'AAA', typography: { primary: 'Georgia', secondary: 'Playfair Display' }, borderRadius: '0px', shadows: '无', animations: '版式切换', spacing: '24px基准', borderWidth: '无', darkMode: '需反转', responsive: '良好', performance: '高', accessibility: '优秀' },
  { id: 'boundless', label: 'Boundless UI', group: 'Advanced', description: 'No borders, no dividers, floating elements, extreme whitespace', descriptionZh: '无边界极简，无边框无分割线，全屏元素悬浮，极致留白', colors: { primary: '#ffffff', secondary: '#ffffff', accent: '#f0f0f0', highlight: '#000000' }, useCases: ['高端品牌', '极简产品', '禅意应用'], complexity: 2, techDifficulty: 2, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'SF Pro' }, borderRadius: '0px', shadows: '无', animations: '极简淡入', spacing: '32px基准', borderWidth: '无', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'topological-scientific', label: 'Topological Scientific', group: 'Scientific', description: 'Vector topological lines, node connection, network mechanism', descriptionZh: '拓扑科研风，矢量拓扑线条，节点连接，网络机理专用', colors: { primary: '#fafafa', secondary: '#ffffff', accent: '#dddddd', highlight: '#333333' }, useCases: ['网络分析', '拓扑研究', '图论可视化'], complexity: 3, techDifficulty: 2, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'Roboto Mono' }, borderRadius: '0px', shadows: '无', animations: '节点高亮', spacing: '8px基准', borderWidth: '1px', darkMode: '需反转', responsive: '良好', performance: '高', accessibility: '优秀' },
  { id: 'schematic-minimal', label: 'Schematic Minimal', group: 'Scientific', description: 'Ultra-simple lines, no filling, core structure visualization', descriptionZh: '极简示意风，超简线条，无任何填色，核心机理/结构示意专用', colors: { primary: '#ffffff', secondary: '#ffffff', accent: '#eeeeee', highlight: '#333333' }, useCases: ['机理示意', '结构图', '流程图'], complexity: 1, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'Helvetica' }, borderRadius: '0px', shadows: '无', animations: '无', spacing: '16px基准', borderWidth: '1px', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'crystal-lattice', label: 'Crystal Lattice', group: 'Scientific', description: 'Multi-color atom labeling, regular lattice, chemistry/molecular modeling', descriptionZh: '晶体晶格风，多色原子标注，规整晶格结构，化学/分子晶体示意图', colors: { primary: '#0a0e1a', secondary: '#0d1220', accent: '#1a2540', highlight: '#ff4444' }, useCases: ['化学分子', '晶体建模', '原子结构'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Source Code Pro' }, borderRadius: '2px', shadows: '微弱发光', animations: '晶格振动', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '高', accessibility: '需注意暗色对比' },
  { id: 'microscopic-texture', label: 'Microscopic Texture', group: 'Scientific', description: 'Ultra-fine texture rendering, high-definition details, micro-material observation', descriptionZh: '微观肌理风，超细肌理渲染，高清细节，微观材料/组织观测图', colors: { primary: '#f8f6f2', secondary: '#ffffff', accent: '#e0dcd4', highlight: '#5a4a3a' }, useCases: ['微观材料', 'SEM成像', '金相分析'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Georgia' }, borderRadius: '0px', shadows: '自然投影', animations: '无', spacing: '12px基准', borderWidth: '1px', darkMode: '需适配', responsive: '良好', performance: '高', accessibility: '需注意低对比' },
  { id: 'academic-collage', label: 'Academic Collage', group: 'Scientific', description: 'Orderly collage of text, images and data, review paper matching', descriptionZh: '学术拼贴风，图文数据有序拼贴，综述论文配图专用', colors: { primary: '#ffffff', secondary: '#ffffff', accent: '#dddddd', highlight: '#333333' }, useCases: ['综述论文', '学术海报', '文献整理'], complexity: 2, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Georgia', secondary: 'Times New Roman' }, borderRadius: '0px', shadows: '无', animations: '无', spacing: '16px基准', borderWidth: '1px', darkMode: '需反转', responsive: '良好', performance: '高', accessibility: '优秀' },
  { id: 'cold-precision', label: 'Cold Precision Science', group: 'Scientific', description: 'Cold gray tone, precise scale, engineering/mechanical research', descriptionZh: '冷调精密科研风，冷灰主色调，精密刻度，工程/机械科研绘图', colors: { primary: '#f0f2f5', secondary: '#ffffff', accent: '#c8ccd4', highlight: '#4a5568' }, useCases: ['工程绘图', '机械科研', '精密测量'], complexity: 2, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'Roboto Mono' }, borderRadius: '0px', shadows: '微弱投影', animations: '无', spacing: '8px基准', borderWidth: '1px', darkMode: '需适配', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'bionic-mechanism', label: 'Bionic Mechanism', group: 'Scientific', description: 'Bionic structure simulation, natural texture, bionic research illustration', descriptionZh: '仿生机理风，仿生结构模拟，自然肌理，仿生学研究示意图', colors: { primary: '#f5f2ec', secondary: '#faf8f4', accent: '#d8d0c4', highlight: '#5a7a4a' }, useCases: ['仿生研究', '生物力学', '自然模拟'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Lora' }, borderRadius: '4px', shadows: '自然阴影', animations: '缓慢过渡', spacing: '12px基准', borderWidth: '1px', darkMode: '需适配', responsive: '良好', performance: '高', accessibility: '需注意低饱和对比' },
  { id: 'meteorological-contour', label: 'Meteorological Contour', group: 'Scientific', description: 'Heatmap gradient, contour lines, temperature/pressure field visualization', descriptionZh: '气象等值线风，热力图渐变配色，流畅等值线条，温度/气压场绘图', colors: { primary: '#0c1828', secondary: '#0f1e32', accent: '#1a3050', highlight: '#ff6b35' }, useCases: ['热力图', '温度场', '气压场'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Source Code Pro' }, borderRadius: '2px', shadows: '等值线光晕', animations: '等值线流动', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意暗色对比' },
  { id: 'satellite-cloud', label: 'Satellite Cloud Image', group: 'Scientific', description: 'Multi-band pseudo-color, HD texture, remote sensing observation', descriptionZh: '卫星云图适配风，多波段伪彩色渲染，高清肌理，遥感观测图专用', colors: { primary: '#060810', secondary: '#0a0e18', accent: '#141c2c', highlight: '#44ddaa' }, useCases: ['卫星气象', '云图分析', '遥感观测'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Source Code Pro' }, borderRadius: '2px', shadows: '伪彩色光晕', animations: '云层流动', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意伪彩色对比' },
  { id: 'heatmap-scientific', label: 'Heatmap Scientific', group: 'Scientific', description: 'Red-yellow-blue gradient, data density visualization, thermal/statistical analysis', descriptionZh: '热力图科研风，红黄蓝渐变配色，数据密度可视化，热力学/统计分析专用', colors: { primary: '#0a0a14', secondary: '#0e0e1a', accent: '#1a1a30', highlight: '#ffaa00' }, useCases: ['热力图', '数据密度', '统计分析'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'JetBrains Mono' }, borderRadius: '2px', shadows: '渐变光晕', animations: '数据刷新', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意渐变对比' },
  { id: 'spectral-analysis', label: 'Spectral Analysis', group: 'Scientific', description: 'Rainbow color spectrum, wavelength analysis, optical/spectroscopy research', descriptionZh: '光谱分析风，彩虹色带配色，波长分析，光学/光谱学研究专用', colors: { primary: '#080810', secondary: '#0c0c18', accent: '#181830', highlight: '#ff3366' }, useCases: ['光谱分析', '波长研究', '光学实验'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Fira Code' }, borderRadius: '2px', shadows: '光谱发光', animations: '波长扫描', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意光谱对比' },
  { id: 'geological-map', label: 'Geological Map', group: 'Scientific', description: 'Multi-color terrain grading, stratigraphic layers, geology/topography mapping', descriptionZh: '地质地形风，多色地形分级配色，地层分层，地质/地形测绘专用', colors: { primary: '#f5f0e8', secondary: '#faf8f4', accent: '#e0d8c8', highlight: '#8b5e3c' }, useCases: ['地质测绘', '地形分析', '地层研究'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Georgia' }, borderRadius: '2px', shadows: '自然投影', animations: '无', spacing: '12px基准', borderWidth: '1px', darkMode: '需适配', responsive: '良好', performance: '高', accessibility: '需注意低饱和对比' },
]

const groupedStyles = styles.reduce((acc, style) => {
  if (!acc[style.group]) acc[style.group] = []
  acc[style.group].push(style)
  return acc
}, {})

const styleKeywords = {
  glassmorphism: ['毛玻璃', 'frosted glass', 'backdrop-blur', '半透明', '模糊深度', 'glassmorphism', 'translucent layers'],
  bento: ['便当网格', 'bento grid', '模块化', '非对称布局', '卡片聚合', 'asymmetric grid', 'modular'],
  neumorphism: ['新拟态', 'neumorphism', 'soft UI', '凸出元素', '内外阴影', 'tactile depth', 'extruded'],
  'dark-premium': ['深色高端', 'dark premium', '深黑底色', '微妙点缀', '精致对比', 'refined contrast', 'luxury dark'],
  gradient: ['渐变活力', 'gradient vibrant', '彩色渐变', '动态活力', 'balanced color', 'dynamic energy', 'vibrant gradient'],
  minimal: ['极简纯净', 'minimal clean', '留白', '克制的优雅', 'whitespace', 'restrained elegance', 'clarity'],
  stripe: ['Stripe风格', 'stripe premium', '行业标杆', '精致微交互', 'polished micro-interactions', 'payment UI', 'fintech'],
  material3: ['Material Design 3', 'M3 Expressive', '圆角容器', '动态色彩', 'Google设计规范', 'M3 color system', 'tonal palette'],
  claymorphism: ['粘土拟态', 'claymorphism', '3D圆角', '温暖色调', '膨胀阴影', 'friendly feel', 'puffy shadows'],
  neubrutalism: ['新粗野主义', 'neubrutalism', '粗边框', '实心阴影', '高对比', 'bold borders', 'solid shadows', 'raw'],
  sketch: ['手绘风格', 'sketch', '纸张质感', '手绘线条', 'paper texture', 'hand-drawn', 'approachable'],
  hud: ['HUD科幻', 'sci-fi interface', '未来界面', '单色青', '发光效果', 'monochrome cyan', 'futuristic'],
  swiss: ['瑞士现代', 'Swiss modern', '严格网格', '粗体排版', '高信息密度', 'bold typography', 'strict grid', 'International Style'],
  spatial: ['空间UI', 'spatial UI', '深度层次', '浮动元素', '透视效果', 'depth layers', 'floating elements', 'perspective'],
  diffusion: ['弥散光', 'diffusion light', '柔和光晕', '温润光晕', '空灵氛围', 'scattered light', 'gentle glow', 'ethereal', 'breathing light'],
  skeuomorphism: ['拟物化', 'skeuomorphism', '材质肌理', '皮革', '金属', '木纹', 'realistic texture', 'leather', 'metal', 'wood grain'],
  'neo-chinese': ['新中式', 'neo-chinese', '水墨', '留白', '榫卯', '国风', '青灰朱红', 'ink wash', 'traditional chinese', 'mortise'],
  'guochao-retro': ['国潮', 'guochao', '传统纹样', '撞色', '祥云', '窗棂', 'chinese trend', 'cloud pattern', 'lattice'],
  y2k: ['千禧风', 'Y2K', '镭射', '果冻渐变', '大圆角', 'retro futurism', 'laser', 'jelly gradient', 'millennium'],
  cream: ['奶油风', 'cream UI', '马卡龙', '软萌', '治愈系', '超大圆角', 'macaron', 'pastel', 'soft matte', 'healing'],
  'jelly-glass': ['果冻玻璃', 'jelly glass', '半透玻璃', '软质玻璃', '高饱和', 'translucent', 'jelly wobble', 'soft glass'],
  'pixel-art': ['像素风', 'pixel art', '8位', '16位', '复古像素', '游戏界面', '8-bit', '16-bit', 'retro pixel', 'game UI'],
  cyberpunk: ['赛博朋克', 'cyberpunk', '霓虹', '故障', '暗底霓虹', '破败科技', 'neon', 'dystopian', 'dark neon'],
  'tech-minimal': ['科技极简', 'tech minimal', '冷灰', '细线条', '政企', 'cold gray', 'thin dividers', 'enterprise tech'],
  'matte-luxury': ['哑光轻奢', 'matte luxury', '哑光肌理', '金属描边', '无高光', 'matte texture', 'metal outline', 'low-sat luxury'],
  'enterprise-minimal': ['企业极简', 'enterprise minimal', '黑白灰', '功能导向', '政务', 'B端', 'B/W/gray', 'function-oriented', 'government'],
  'dashboard-data': ['数据仪表盘', 'dashboard data', '模块化数据', '极简图表', 'BI后台', 'modular data', 'BI platform', 'back-office'],
  'magazine-layout': ['杂志版式', 'magazine layout', '大标题', '破格排版', '图文穿插', 'bold headline', 'breaking grid', 'editorial'],
  boundless: ['无边界', 'boundless', '无边框', '无分割线', '极致留白', 'no borders', 'extreme whitespace', 'floating elements'],
  'topological-scientific': ['拓扑科研', 'topological', '矢量拓扑', '节点连接', '网络机理', 'network mechanism', 'node connection', 'graph theory'],
  'fluorescent-labeling': ['荧光标记', 'fluorescent', '荧光色', '高透背景', '生物成像', '细胞标记', 'biological imaging', 'cell labeling', 'DAPI', 'FITC'],
  'schematic-minimal': ['极简示意', 'schematic', '超简线条', '无填色', '核心机理', '结构示意', 'core structure', 'no filling', 'ultra-simple'],
  'crystal-lattice': ['晶体晶格', 'crystal lattice', '晶格结构', '单色渐变', '材料晶体', 'lattice structure', 'material crystal', 'XRD', 'unit cell'],
  'dynamic-trajectory': ['动态轨迹', 'dynamic trajectory', '轨迹线条', '动态模糊', '粒子轨迹', '运动过程', 'motion process', 'particle trajectory', 'trajectory lines'],
  'microscopic-texture': ['微观肌理', 'microscopic texture', '超细肌理', '高清细节', '微观材料', 'SEM', 'micro-material', 'ultra-fine texture', 'HD details'],
  'academic-collage': ['学术拼贴', 'academic collage', '图文拼贴', '综述论文', '文献配图', 'review paper', 'orderly collage', 'literature review'],
  'cold-precision': ['冷调精密', 'cold precision', '冷灰主色', '精密刻度', '工程科研', '机械科研', 'engineering research', 'precise scale', 'mechanical'],
  'bionic-mechanism': ['仿生机理', 'bionic mechanism', '仿生结构', '自然肌理', '仿生学', 'bionic structure', 'natural texture', 'biomimetic'],
  'meteorological-contour': ['气象等值线', 'meteorological contour', '等值线条', '渐变配色', '气压场', '温度场', 'atmospheric pressure', 'temperature field', 'contour lines'],
  'satellite-cloud': ['卫星云图', 'satellite cloud', '伪彩色', '卫星气象', '遥感观测', 'pseudo-color rendering', 'satellite observation', 'remote sensing', 'cloud image'],
  'heatmap-scientific': ['热力图', 'heatmap', '红黄蓝渐变', '数据密度', '统计分析', 'red-yellow-blue gradient', 'data density', 'thermal analysis'],
  'spectral-analysis': ['光谱分析', 'spectral analysis', '彩虹色带', '波长', '光学', 'rainbow spectrum', 'wavelength', 'optical research'],
  'geological-map': ['地质地形', 'geological map', '多色地形', '地层', '测绘', 'terrain grading', 'stratigraphic', 'topography'],
}

function generateStylePrompt(style) {
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

function isColorDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

function generateCoreCSS(style) {
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

const categoryDescriptions = {
  Modern: {
    en: 'Foundational styles with wide applicability',
    zh: '基础风格，应用广泛',
    icon: Zap,
    color: 'from-violet-500 to-purple-500',
  },
  SaaS: {
    en: 'Industry-standard styles for SaaS products',
    zh: 'SaaS产品的行业标准风格',
    icon: Layers,
    color: 'from-blue-500 to-cyan-500',
  },
  Niche: {
    en: 'Specialized styles for unique use cases',
    zh: '独特用例的专业风格',
    icon: Palette,
    color: 'from-amber-500 to-orange-500',
  },
  Advanced: {
    en: 'Cutting-edge styles pushing design boundaries',
    zh: '突破设计边界的前沿风格',
    icon: Sparkles,
    color: 'from-emerald-500 to-teal-500',
  },
  Eastern: {
    en: 'Eastern aesthetic styles with cultural depth',
    zh: '东方美学风格，文化底蕴深厚',
    icon: BookOpen,
    color: 'from-rose-500 to-pink-500',
  },
  Scientific: {
    en: 'Standard visual styles for paper illustration & scientific plotting',
    zh: '科研论文与专业绘图标准视觉风格',
    icon: Code,
    color: 'from-cyan-500 to-blue-500',
  },
}

function generateCSSVars(style) {
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

function generateTailwindConfig(style) {
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

function StyleListModal({ isOpen, onClose }) {
  const modalRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [copied, setCopied] = useState(false)
  const selectedStyleRef = useRef(null)

  useEffect(() => {
    selectedStyleRef.current = selectedStyle
  }, [selectedStyle])

  useEffect(() => {
    if (!isOpen) return
    setSelectedStyle(null)
    setCopied(false)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedStyleRef.current) {
          setSelectedStyle(null)
          setCopied(false)
        } else {
          onClose()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    modalRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleCopy = useCallback(() => {
    if (!selectedStyle) return
    const text = generateStylePrompt(selectedStyle)
    copyToClipboard(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [selectedStyle])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="风格指南"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        <motion.div
          ref={modalRef}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#0c0c0e] border border-white/[0.06] shadow-2xl shadow-black/50"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Style Guide</h2>
                <p className="text-sm text-neutral-400">风格指南 / 18 Styles</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="关闭风格指南"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(85vh-100px)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(groupedStyles).map(([group, items]) => {
                const info = categoryDescriptions[group]
                const Icon = info.icon
                return (
                  <motion.div
                    key={group}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
                  >
                    <div className={`p-4 bg-gradient-to-r ${info.color}`}>
                      <div className="flex items-center gap-2 text-white">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                        <h3 className="font-semibold">{group}</h3>
                        <span className="ml-auto text-sm opacity-80">{items.length} styles</span>
                      </div>
                      <p className="text-xs text-white/80 mt-1">{info.en}</p>
                      <p className="text-xs text-white/60 mt-0.5">{info.zh}</p>
                    </div>
                    <div className="p-3 space-y-1">
                      {items.map((style, i) => (
                        <div
                          key={style.id}
                          onClick={() => setSelectedStyle(style)}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors duration-150 cursor-pointer group/item"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xs font-mono text-neutral-500 flex-shrink-0 group-hover/item:border-violet-500/30 transition-colors">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium text-white truncate">{style.label}</h4>
                              <ArrowRight className="w-3 h-3 text-neutral-600 group-hover/item:text-violet-400 transition-colors flex-shrink-0" aria-hidden="true" />
                            </div>
                            <p className="text-xs text-neutral-400 truncate">{style.description}</p>
                            <p className="text-xs text-neutral-500 truncate">{style.descriptionZh}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-violet-500/[0.08] to-cyan-500/[0.08] border border-white/[0.06]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <Code className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Technical Stack / 技术栈</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Built with React 18 + Vite + Tailwind CSS + Framer Motion + Recharts + Lucide React.
                    All dashboards are fully interactive with real charts, tables, and animations.
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    使用 React 18 + Vite + Tailwind CSS + Framer Motion + Recharts + Lucide React 构建。
                    所有仪表盘都具有真实的图表、表格和动画效果。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {selectedStyle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                className="absolute inset-0 bg-[#0c0c0e]/98 backdrop-blur-sm flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setSelectedStyle(null); setCopied(false) }}
                      aria-label="返回列表"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      返回
                    </button>
                    <div className="w-px h-4 bg-white/10" aria-hidden="true" />
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md" style={{ backgroundColor: selectedStyle.colors.highlight }} />
                      <h3 className="text-sm font-semibold text-white">{selectedStyle.label}</h3>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                      copied
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                        : 'bg-violet-500/15 text-violet-400 border border-violet-500/25 hover:bg-violet-500/25'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? '已复制' : '复制全部代码'}
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">风格关键词 / Keywords</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(styleKeywords[selectedStyle.id] || []).map((kw, i) => (
                          <span key={i} className="text-[11px] text-neutral-300 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-md">{kw}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Palette className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">色彩系统 / Color System</h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { label: 'Primary', color: selectedStyle.colors.primary },
                          { label: 'Secondary', color: selectedStyle.colors.secondary },
                          { label: 'Accent', color: selectedStyle.colors.accent },
                          { label: 'Highlight', color: selectedStyle.colors.highlight },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                            <div className="w-6 h-6 rounded-md border border-white/10 shadow-sm" style={{ backgroundColor: item.color }} />
                            <div>
                              <p className="text-[10px] text-neutral-400">{item.label}</p>
                              <p className="text-[10px] text-neutral-500 font-mono">{item.color}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">CSS 自定义属性 / Custom Properties</h4>
                      </div>
                      <pre className="p-4 rounded-xl bg-[#0a0a0c] border border-white/[0.04] text-[11px] text-neutral-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                        <code>{generateCSSVars(selectedStyle)}</code>
                      </pre>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Tailwind CSS 配置 / Config</h4>
                      </div>
                      <pre className="p-4 rounded-xl bg-[#0a0a0c] border border-white/[0.04] text-[11px] text-neutral-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                        <code>{generateTailwindConfig(selectedStyle)}</code>
                      </pre>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">核心 CSS 样式 / Core Styles</h4>
                      </div>
                      <pre className="p-4 rounded-xl bg-[#0a0a0c] border border-white/[0.04] text-[11px] text-neutral-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                        <code>{generateCoreCSS(selectedStyle)}</code>
                      </pre>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">设计参数 / Design Tokens</h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { label: '圆角', value: selectedStyle.borderRadius },
                          { label: '间距系统', value: selectedStyle.spacing },
                          { label: '边框', value: selectedStyle.borderWidth },
                          { label: '阴影', value: selectedStyle.shadows },
                          { label: '动效', value: selectedStyle.animations },
                          { label: '字体', value: `${selectedStyle.typography.primary} / ${selectedStyle.typography.secondary}` },
                          { label: '对比度', value: `WCAG ${selectedStyle.contrast}` },
                          { label: '暗色模式', value: selectedStyle.darkMode },
                          { label: '响应式', value: selectedStyle.responsive },
                          { label: '性能', value: selectedStyle.performance },
                          { label: '无障碍', value: selectedStyle.accessibility },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                            <span className="text-[10px] text-neutral-500">{item.label}</span>
                            <span className="text-[10px] text-neutral-300 font-mono">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/[0.06] to-cyan-500/[0.06] border border-white/[0.04]">
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        💡 将以上内容投喂给AI，可快速复刻该风格的页面设计。点击右上角「复制全部代码」按钮即可一键复制完整风格规范。
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function UserDropdown({ style }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const c = style.colors
  const isDark = isColorDark(c.primary)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}
        aria-label="用户菜单"
        aria-expanded={open}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})` }}
        >
          <User className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>
          Admin
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-1.5 w-48 rounded-xl shadow-xl border overflow-hidden z-[60]"
            style={{
              backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            }}
          >
            <div className="p-2.5 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})` }}
                >
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: isDark ? '#fff' : '#000' }}>Admin User</p>
                  <p className="text-[10px]" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>admin@example.com</p>
                </div>
              </div>
            </div>
            <div className="p-1.5">
              {[
                { icon: User, label: 'Profile' },
                { icon: LayoutGrid, label: 'Dashboard' },
                { icon: Paintbrush, label: 'Appearance' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                  style={{
                    color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="p-1.5 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-red-400 transition-colors cursor-pointer hover:bg-red-500/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const layoutPages = [
  { key: 'components', label: '组件', labelEn: 'Components', icon: Component, desc: '按钮、卡片、表单、标签等' },
  { key: 'layout', label: '布局', labelEn: 'Layout', icon: LayoutGrid, desc: '网格、间距、响应式规范' },
  { key: 'styles', label: '样式', labelEn: 'Styles', icon: Paintbrush, desc: '色彩、字体、阴影、动效' },
  { key: 'tokens', label: 'Token', labelEn: 'Design Tokens', icon: Ruler, desc: '设计变量、语义化参数' },
  { key: 'code', label: '代码', labelEn: 'Code', icon: FileCode, desc: 'CSS、Tailwind 配置、代码片段' },
]

function LayoutLibraryPanel({ style, isOpen, onClose }) {
  const [activePage, setActivePage] = useState('components')
  const prefersReducedMotion = useReducedMotion()
  const c = style.colors
  const isDark = isColorDark(c.primary)

  if (!isOpen) return null

  const panelBg = isDark ? '#111827' : '#f8fafc'
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'
  const textPrimary = isDark ? '#fff' : '#111'
  const textSecondary = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
  const textMuted = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'

  return (
    <AnimatePresence>
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-30 flex"
        onClick={onClose}
      >
        <div className="flex-1" />
        <motion.div
          className="h-full w-[380px] flex-shrink-0 flex flex-col border-l overflow-hidden"
          style={{ backgroundColor: panelBg, borderColor: cardBorder }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: cardBorder }}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: c.highlight + '20', color: c.highlight }}>
                <LayoutGrid className="w-3 h-3" />
              </div>
              <h3 className="text-xs font-semibold" style={{ color: textPrimary }}>
                {style.label} 标准化布局库
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer"
              style={{ color: textSecondary }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = cardBg }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
              aria-label="关闭"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex border-b" style={{ borderColor: cardBorder }}>
            {layoutPages.map((page) => {
              const Icon = page.icon
              const isActive = activePage === page.key
              return (
                <button
                  key={page.key}
                  onClick={() => setActivePage(page.key)}
                  className="flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors cursor-pointer relative"
                  style={{ color: isActive ? c.highlight : textMuted }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{page.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{ backgroundColor: c.highlight }} />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activePage === 'components' && (
              <>
                <Section title="按钮 / Buttons" style={style} isDark={isDark}>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-white cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: c.highlight }}>
                      Primary
                    </button>
                    <button className="px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer border transition-transform active:scale-95" style={{ borderColor: c.highlight, color: c.highlight }}>
                      Secondary
                    </button>
                    <button className="px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: c.accent, color: isDark ? '#fff' : c.primary }}>
                      Accent
                    </button>
                    <button className="px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: cardBg, color: textSecondary, border: `1px solid ${cardBorder}` }}>
                      Ghost
                    </button>
                  </div>
                </Section>
                <Section title="标签 / Tags" style={style} isDark={isDark}>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ backgroundColor: c.highlight + '20', color: c.highlight }}>Success</span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ backgroundColor: c.accent + '20', color: c.accent }}>Warning</span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ backgroundColor: c.secondary, color: isDark ? '#fff' : c.primary }}>Default</span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ backgroundColor: '#ef444420', color: '#ef4444' }}>Error</span>
                  </div>
                </Section>
                <Section title="输入框 / Input" style={style} isDark={isDark}>
                  <div className="flex items-center px-3 py-2 rounded-lg border text-xs" style={{ backgroundColor: cardBg, borderColor: cardBorder, color: textMuted }}>
                    Placeholder text...
                  </div>
                </Section>
                <Section title="卡片 / Card" style={style} isDark={isDark}>
                  <div className="p-3 rounded-xl border" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: textPrimary }}>Card Title</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: textSecondary }}>Card description with sample content for this style.</p>
                  </div>
                </Section>
                <Section title="头像 / Avatar" style={style} isDark={isDark}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})` }}>A</div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border" style={{ backgroundColor: cardBg, borderColor: cardBorder, color: textSecondary }}>B</div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ backgroundColor: c.secondary, color: isDark ? '#fff' : c.primary }}>C</div>
                  </div>
                </Section>
              </>
            )}

            {activePage === 'layout' && (
              <>
                <Section title="网格系统 / Grid System" style={style} isDark={isDark}>
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-1">
                      {[12].map(w => (
                        <div key={w} className="col-span-12 h-6 rounded flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: c.highlight + '15', color: c.highlight }}>12</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                      {[6, 6].map((w, i) => (
                        <div key={i} className="col-span-6 h-6 rounded flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: c.accent + '15', color: c.accent }}>{w}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                      {[4, 4, 4].map((w, i) => (
                        <div key={i} className="col-span-4 h-6 rounded flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: c.highlight + '15', color: c.highlight }}>{w}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                      {[3, 3, 3, 3].map((w, i) => (
                        <div key={i} className="col-span-3 h-6 rounded flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: c.accent + '15', color: c.accent }}>{w}</div>
                      ))}
                    </div>
                  </div>
                </Section>
                <Section title="间距 / Spacing" style={style} isDark={isDark}>
                  <div className="space-y-1.5">
                    {[
                      { name: 'xs', value: '4px' },
                      { name: 'sm', value: '8px' },
                      { name: 'md', value: '16px' },
                      { name: 'lg', value: '24px' },
                      { name: 'xl', value: '32px' },
                      { name: '2xl', value: '48px' },
                    ].map((s) => (
                      <div key={s.name} className="flex items-center gap-2">
                        <span className="text-[10px] font-mono w-8" style={{ color: textMuted }}>{s.name}</span>
                        <div className="h-3 rounded-sm" style={{ width: s.value, backgroundColor: c.highlight + '30' }} />
                        <span className="text-[10px] font-mono" style={{ color: textSecondary }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </Section>
                <Section title="圆角 / Border Radius" style={style} isDark={isDark}>
                  <div className="flex items-end gap-3">
                    {[
                      { name: 'sm', radius: '4px' },
                      { name: 'md', radius: '8px' },
                      { name: 'lg', radius: '16px' },
                      { name: 'xl', radius: '24px' },
                      { name: 'full', radius: '9999px' },
                    ].map((r) => (
                      <div key={r.name} className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 border" style={{ borderRadius: r.radius, borderColor: c.highlight + '40', backgroundColor: c.highlight + '10' }} />
                        <span className="text-[9px] font-mono" style={{ color: textMuted }}>{r.name}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {activePage === 'styles' && (
              <>
                <Section title="色彩系统 / Color System" style={style} isDark={isDark}>
                  <div className="space-y-2">
                    {[
                      { label: 'Primary', color: c.primary },
                      { label: 'Secondary', color: c.secondary },
                      { label: 'Accent', color: c.accent },
                      { label: 'Highlight', color: c.highlight },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg border flex-shrink-0" style={{ backgroundColor: item.color, borderColor: cardBorder }} />
                        <div>
                          <p className="text-[11px] font-medium" style={{ color: textPrimary }}>{item.label}</p>
                          <p className="text-[10px] font-mono" style={{ color: textMuted }}>{item.color}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
                <Section title="字体 / Typography" style={style} isDark={isDark}>
                  <div className="space-y-2">
                    <div>
                      <p className="text-lg font-bold" style={{ color: textPrimary }}>Heading 1</p>
                      <p className="text-[10px] font-mono" style={{ color: textMuted }}>{style.typography.primary} / Bold / 18px</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: textPrimary }}>Heading 2</p>
                      <p className="text-[10px] font-mono" style={{ color: textMuted }}>{style.typography.primary} / SemiBold / 14px</p>
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: textSecondary }}>Body Text</p>
                      <p className="text-[10px] font-mono" style={{ color: textMuted }}>{style.typography.secondary} / Regular / 12px</p>
                    </div>
                  </div>
                </Section>
                <Section title="阴影 / Shadows" style={style} isDark={isDark}>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: cardBg, boxShadow: `0 1px 2px rgba(0,0,0,0.1)`, color: textMuted }}>sm</div>
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: cardBg, boxShadow: `0 4px 6px rgba(0,0,0,0.15)`, color: textMuted }}>md</div>
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: cardBg, boxShadow: `0 10px 15px rgba(0,0,0,0.2)`, color: textMuted }}>lg</div>
                  </div>
                </Section>
              </>
            )}

            {activePage === 'tokens' && (
              <>
                <Section title="设计变量 / Design Tokens" style={style} isDark={isDark}>
                  <div className="space-y-1">
                    {[
                      { label: '圆角', value: style.borderRadius },
                      { label: '间距', value: style.spacing },
                      { label: '边框', value: style.borderWidth },
                      { label: '阴影', value: style.shadows },
                      { label: '动效', value: style.animations },
                      { label: '对比度', value: `WCAG ${style.contrast}` },
                      { label: '暗色模式', value: style.darkMode },
                      { label: '响应式', value: style.responsive },
                      { label: '性能', value: style.performance },
                      { label: '无障碍', value: style.accessibility },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between px-2 py-1.5 rounded-md" style={{ backgroundColor: cardBg }}>
                        <span className="text-[10px]" style={{ color: textSecondary }}>{item.label}</span>
                        <span className="text-[10px] font-mono" style={{ color: textPrimary }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </Section>
                <Section title="语义色 / Semantic Colors" style={style} isDark={isDark}>
                  <pre className="p-3 rounded-lg text-[10px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap" style={{ backgroundColor: isDark ? '#0a0a0c' : '#f1f5f9', color: textSecondary, border: `1px solid ${cardBorder}` }}>
                    <code>{generateCSSVars(style)}</code>
                  </pre>
                </Section>
              </>
            )}

            {activePage === 'code' && (
              <>
                <Section title="Tailwind 配置 / Config" style={style} isDark={isDark}>
                  <pre className="p-3 rounded-lg text-[10px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap" style={{ backgroundColor: isDark ? '#0a0a0c' : '#f1f5f9', color: textSecondary, border: `1px solid ${cardBorder}` }}>
                    <code>{generateTailwindConfig(style)}</code>
                  </pre>
                </Section>
                <Section title="核心 CSS / Core Styles" style={style} isDark={isDark}>
                  <pre className="p-3 rounded-lg text-[10px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap" style={{ backgroundColor: isDark ? '#0a0a0c' : '#f1f5f9', color: textSecondary, border: `1px solid ${cardBorder}` }}>
                    <code>{generateCoreCSS(style)}</code>
                  </pre>
                </Section>
                <div className="pt-2">
                  <CopyStyleButton style={style} size="default" />
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Section({ title, style, isDark, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 mb-2 cursor-pointer w-full text-left"
      >
        <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${open ? '' : '-rotate-90'}`} style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }} />
        <h4 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>{title}</h4>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  textarea.style.top = '-9999px'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  return new Promise((resolve, reject) => {
    try {
      document.execCommand('copy')
      resolve()
    } catch (err) {
      reject(err)
    } finally {
      document.body.removeChild(textarea)
    }
  })
}

function CopyStyleButton({ style, size = 'sm' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback((e) => {
    e.stopPropagation()
    const text = generateStylePrompt(style)
    copyToClipboard(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [style])

  const isSm = size === 'sm'

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? '已复制风格代码' : `复制 ${style.label} 风格代码`}
      className={`flex items-center gap-1 rounded-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 flex-shrink-0 ${
        copied
          ? isSm
            ? 'bg-emerald-500/20 text-emerald-400 px-2 py-1 text-xs'
            : 'bg-emerald-500/20 text-emerald-400 px-3 py-1.5 text-xs'
          : isSm
            ? 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 px-2 py-1 text-xs border border-white/10 hover:border-white/20'
            : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 px-3 py-1.5 text-xs border border-white/10 hover:border-white/20'
      }`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? '已复制' : '复制'}
    </button>
  )
}

function StyleCard({ style, onClick, index }) {
  const PreviewComponent = previewComponents[style.id]
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback((e) => {
    e.stopPropagation()
    const text = generateStylePrompt(style)
    copyToClipboard(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [style])

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: prefersReducedMotion ? 0 : index * 0.03, duration: prefersReducedMotion ? 0.1 : 0.3 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`查看 ${style.label} 风格详情`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      className="group card-shine glow-border cursor-pointer rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 active:scale-[0.98]"
    >
      <div className="relative overflow-hidden bg-neutral-900 aspect-video">
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-[1280px] h-[800px] origin-top-left"
               style={{ transform: 'scale(0.3125)' }}>
            <Suspense fallback={<div className="w-full h-full bg-neutral-800" />}>
              <PreviewComponent />
            </Suspense>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center z-10">
          <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
        </div>

        <div className="absolute bottom-2 left-2 z-10">
          <span className="text-[10px] text-white/50 font-mono bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">{style.id}</span>
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? '已复制风格代码' : `复制 ${style.label} 风格代码`}
          className={`absolute top-2 right-2 z-20 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
            copied
              ? 'bg-emerald-500/90 text-white'
              : 'bg-black/50 text-white/70 backdrop-blur-sm hover:bg-black/70 hover:text-white opacity-0 group-hover:opacity-100'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="p-3.5 bg-[#0c0c0e]">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm font-semibold text-white">{style.label}</h3>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed mb-2.5 line-clamp-2">{style.descriptionZh}</p>
        <div className="flex items-center gap-1.5 mb-3">
          {style.useCases.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[10px] text-neutral-400 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-md">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-600 font-medium uppercase tracking-wider">{style.group}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.04] text-neutral-500 border border-white/[0.06]">
              WCAG {style.contrast}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5" aria-label={`复杂度 ${style.complexity}/5`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i <= style.complexity ? 'bg-violet-500' : 'bg-white/[0.06]'}`} />
              ))}
            </div>
            <div className="w-px h-3 bg-white/[0.06]" aria-hidden="true" />
            <div className="flex items-center gap-0.5" aria-label="色彩搭配">
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: style.colors.primary }} aria-label={`主色调 ${style.colors.primary}`} />
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: style.colors.secondary }} aria-label={`辅色调 ${style.colors.secondary}`} />
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: style.colors.accent }} aria-label={`强调色 ${style.colors.accent}`} />
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: style.colors.highlight }} aria-label={`点缀色 ${style.colors.highlight}`} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>

  )
}

function HomePage({ onSelectStyle }) {
  const [showStyleList, setShowStyleList] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const categoryIcons = {
    Modern: <Zap className="w-4 h-4" aria-hidden="true" />,
    SaaS: <Layers className="w-4 h-4" aria-hidden="true" />,
    Niche: <Palette className="w-4 h-4" aria-hidden="true" />,
    Advanced: <Sparkles className="w-4 h-4" aria-hidden="true" />,
  }

  const categoryGradients = {
    Modern: 'from-violet-500/20 to-purple-500/20',
    SaaS: 'from-blue-500/20 to-cyan-500/20',
    Niche: 'from-amber-500/20 to-orange-500/20',
    Advanced: 'from-emerald-500/20 to-teal-500/20',
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-[#09090b]">
      <div className="hero-gradient min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <motion.header
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25 mb-8 animate-float"
            />

            <h1 className="font-display font-bold text-5xl sm:text-6xl text-white tracking-tight mb-4">
              Dashboard{' '}
              <span className="text-gradient">Gallery</span>
            </h1>

            <p className="text-neutral-400 text-base max-w-xl mx-auto mb-4 leading-relaxed">
              {styles.length} professional dashboard designs across 4 categories.
              Click any card to explore the full interactive dashboard.
            </p>

            <p className="text-neutral-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              每个风格包含完整的设计规范、色彩系统、核心CSS代码，一键复制即可投喂AI快速复刻。
            </p>

            <div className="flex items-center justify-center gap-3">
              <motion.button
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0 : 0.3 }}
                onClick={() => setShowStyleList(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200 text-sm font-semibold shadow-lg shadow-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 cursor-pointer active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                风格指南
              </motion.button>

              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0 : 0.3 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-neutral-400 text-sm"
              >
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>一键复制风格代码</span>
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10">
              {Object.entries(categoryDescriptions).map(([group, info], i) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={group}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.6 + i * 0.08, duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="flex items-center gap-2 text-neutral-500"
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="text-xs font-medium">{group}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.header>

          {Object.entries(groupedStyles).map(([group, items], groupIndex) => {
            const info = categoryDescriptions[group]
            const Icon = info.icon
            return (
              <motion.section
                key={group}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : groupIndex * 0.1 + 0.3, duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16"
                aria-label={`${group} 风格分类`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${categoryGradients[group]} border border-white/5`}>
                    <Icon className="w-3.5 h-3.5 text-white/70" aria-hidden="true" />
                    <h2 className="text-xs font-semibold text-white/80 uppercase tracking-[0.12em]">{group}</h2>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  <span className="text-xs text-neutral-600 font-mono">{items.length} styles</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {items.map((style, i) => (
                    <StyleCard
                      key={style.id}
                      style={style}
                      onClick={() => onSelectStyle(style.id)}
                      index={i}
                    />
                  ))}
                </div>
              </motion.section>
            )
          })}

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1 }}
            className="text-center mt-20 pt-8 border-t border-white/5"
          >
            <p className="text-xs text-neutral-600">
              Built with React, Tailwind CSS, Framer Motion & Recharts
            </p>
          </motion.footer>
        </div>
      </div>

      <StyleListModal isOpen={showStyleList} onClose={() => setShowStyleList(false)} />
    </div>
  )
}

function App() {
  const [activeStyle, setActiveStyle] = useState(null)
  const [showSpecs, setShowSpecs] = useState(false)
  const [showLayoutLib, setShowLayoutLib] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const mainRef = useRef(null)
  const ActiveDashboard = activeStyle ? dashboardComponents[activeStyle] : null
  const activeStyleData = styles.find(s => s.id === activeStyle)

  const handleBack = useCallback(() => {
    setActiveStyle(null)
    setShowSpecs(false)
    setShowLayoutLib(false)
  }, [])

  useEffect(() => {
    if (!activeStyle) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleBack()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeStyle, handleBack])

  useEffect(() => {
    if (activeStyle && mainRef.current) {
      mainRef.current.focus()
    }
  }, [activeStyle])

  if (!activeStyle) {
    return <HomePage onSelectStyle={setActiveStyle} />
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#09090b] flex flex-col" ref={mainRef} tabIndex={-1}>
      <nav className="flex-shrink-0 border-b border-white/[0.06] bg-[#09090b]/80 nav-blur z-50" aria-label="仪表盘导航">
        <div className="flex items-center h-11 px-3">
          <button
            onClick={handleBack}
            aria-label="返回画廊"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.97]"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            Gallery
          </button>
          <div className="w-px h-4 bg-white/10 mx-2" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-gradient-to-br from-violet-500 to-cyan-500" aria-hidden="true" />
            <span className="font-display font-semibold text-white text-sm tracking-tight">
              Dashboard Gallery
            </span>
          </div>
          <div className="ml-3 flex items-center gap-0.5 overflow-x-auto flex-1 scrollbar-none" role="tablist" aria-label="风格切换">
            {Object.entries(groupedStyles).map(([group, items]) => (
              <div key={group} className="flex items-center gap-0.5 flex-shrink-0">
                {items.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setActiveStyle(style.id)}
                    role="tab"
                    aria-selected={activeStyle === style.id}
                    aria-label={`切换到 ${style.label} 风格`}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.97] ${
                      activeStyle === style.id
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            aria-label={showSpecs ? '隐藏设计规范面板' : '显示设计规范面板'}
            aria-expanded={showSpecs}
            className={`ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.97] ${
              showSpecs ? 'bg-violet-500/15 text-violet-400 border border-violet-500/25' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            {showSpecs ? <PanelRightClose className="w-3.5 h-3.5" aria-hidden="true" /> : <PanelRightOpen className="w-3.5 h-3.5" aria-hidden="true" />}
            设计规范
          </button>
          <button
            onClick={() => setShowLayoutLib(!showLayoutLib)}
            aria-label={showLayoutLib ? '关闭标准化布局库' : '打开标准化布局库'}
            aria-expanded={showLayoutLib}
            className={`ml-1 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.97] ${
              showLayoutLib ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
            布局库
          </button>
          {activeStyleData && <UserDropdown style={activeStyleData} />}
        </div>
      </nav>

      <div className="flex-1 overflow-hidden relative flex">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-full flex-1 relative"
            role="tabpanel"
            aria-label={`${activeStyleData?.label || ''} 仪表盘`}
          >
            <DashboardProvider openLayoutLib={() => setShowLayoutLib(true)}>
              <Suspense fallback={<div className="h-full w-full bg-neutral-900 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" role="status" aria-label="加载中" /></div>}>
                <ActiveDashboard />
              </Suspense>
            </DashboardProvider>
            {activeStyleData && (
              <LayoutLibraryPanel
                style={activeStyleData}
                isOpen={showLayoutLib}
                onClose={() => setShowLayoutLib(false)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showSpecs && activeStyleData && (
            <motion.aside
              initial={prefersReducedMotion ? { opacity: 0 } : { width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { width: 0, opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="h-full overflow-y-auto border-l border-white/[0.06] bg-[#0c0c0e]/95 nav-blur flex-shrink-0"
              aria-label="设计规范面板"
            >
              <div className="p-5 space-y-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeStyleData.colors.highlight }} />
                      <h3 className="text-base font-semibold text-white">{activeStyleData.label}</h3>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{activeStyleData.descriptionZh}</p>
                  </div>
                  <CopyStyleButton style={activeStyleData} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">适用场景</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeStyleData.useCases.map((tag, i) => (
                      <span key={i} className="text-[11px] text-neutral-300 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">色彩系统</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Primary', color: activeStyleData.colors.primary },
                      { label: 'Secondary', color: activeStyleData.colors.secondary },
                      { label: 'Accent', color: activeStyleData.colors.accent },
                      { label: 'Highlight', color: activeStyleData.colors.highlight },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                        <div className="w-6 h-6 rounded-md border border-white/10 flex-shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                        <div className="min-w-0">
                          <p className="text-[10px] text-neutral-400 leading-tight">{item.label}</p>
                          <p className="text-[10px] text-neutral-500 font-mono leading-tight">{item.color}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">字体规范</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.02]">
                      <span className="text-[11px] text-neutral-400">主字体</span>
                      <span className="text-[11px] text-white font-mono">{activeStyleData.typography.primary}</span>
                    </div>
                    <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.02]">
                      <span className="text-[11px] text-neutral-400">辅助字体</span>
                      <span className="text-[11px] text-white font-mono">{activeStyleData.typography.secondary}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">设计规范</h4>
                  <div className="space-y-1">
                    {[
                      { label: '圆角', value: activeStyleData.borderRadius },
                      { label: '间距系统', value: activeStyleData.spacing },
                      { label: '边框', value: activeStyleData.borderWidth },
                      { label: '阴影', value: activeStyleData.shadows },
                      { label: '动效', value: activeStyleData.animations },
                      { label: '对比度', value: `WCAG ${activeStyleData.contrast}` },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.02]">
                        <span className="text-[11px] text-neutral-400">{item.label}</span>
                        <span className="text-[11px] text-white font-mono">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">复杂度评估</h4>
                  <div className="space-y-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-neutral-400">设计复杂度</span>
                        <span className="text-[11px] text-neutral-500">{activeStyleData.complexity}/5</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= activeStyleData.complexity ? 'bg-violet-500' : 'bg-white/[0.06]'}`} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] text-neutral-400">技术难度</span>
                        <span className="text-[11px] text-neutral-500">{activeStyleData.techDifficulty}/5</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= activeStyleData.techDifficulty ? 'bg-cyan-500' : 'bg-white/[0.06]'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">业务落地参考</h4>
                  <div className="space-y-1">
                    {[
                      { label: '暗色模式', value: activeStyleData.darkMode },
                      { label: '响应式', value: activeStyleData.responsive },
                      { label: '性能', value: activeStyleData.performance },
                      { label: '无障碍', value: activeStyleData.accessibility },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/[0.02]">
                        <span className="text-[11px] text-neutral-400">{item.label}</span>
                        <span className="text-[11px] text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.1em]">组件展示</h4>
                  <div className="space-y-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div>
                      <p className="text-[10px] text-neutral-500 mb-1.5 uppercase tracking-wider">按钮</p>
                      <div className="flex flex-wrap gap-1.5">
                        <button className="px-3 py-1 rounded text-xs font-medium text-white cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: activeStyleData.colors.highlight }}>
                          Primary
                        </button>
                        <button className="px-3 py-1 rounded text-xs font-medium border cursor-pointer transition-transform active:scale-95" style={{ borderColor: activeStyleData.colors.highlight, color: activeStyleData.colors.highlight }}>
                          Secondary
                        </button>
                        <button className="px-3 py-1 rounded text-xs font-medium cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: activeStyleData.colors.accent, color: activeStyleData.colors.primary }}>
                          Tertiary
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 mb-1.5 uppercase tracking-wider">标签</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: activeStyleData.colors.highlight + '20', color: activeStyleData.colors.highlight }}>
                          Success
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: activeStyleData.colors.accent + '20', color: activeStyleData.colors.accent }}>
                          Warning
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: activeStyleData.colors.secondary, color: activeStyleData.colors.primary }}>
                          Default
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 mb-1.5 uppercase tracking-wider">卡片</p>
                      <div className="p-3 rounded border" style={{ backgroundColor: activeStyleData.colors.secondary, borderColor: activeStyleData.colors.accent + '40' }}>
                        <p className="text-xs font-medium" style={{ color: activeStyleData.colors.primary }}>Card Title</p>
                        <p className="text-xs mt-0.5" style={{ color: activeStyleData.colors.accent }}>Card description text</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 mb-1.5 uppercase tracking-wider">输入框</p>
                      <div className="flex items-center px-3 py-1.5 rounded border text-xs" style={{ backgroundColor: activeStyleData.colors.secondary, borderColor: activeStyleData.colors.accent + '60', color: activeStyleData.colors.primary }}>
                        <span className="opacity-50">Placeholder...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
