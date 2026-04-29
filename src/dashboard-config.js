// Dashboard Configuration
// Centralized place to manage all dashboards and styles
// When adding a new dashboard, update this file!

// =======================================
// STYLE CONFIGURATIONS
// =======================================
export const styles = [
  { id: 'glassmorphism', label: 'Glassmorphism', group: 'Modern', description: 'Frosted glass, translucent layers, depth through blur', descriptionZh: '毛玻璃效果，半透明层次，模糊深度', colors: { primary: '#1a1a2e', secondary: '#16213e', accent: '#0f3460', highlight: '#e94560' }, useCases: ['数据可视化', '创意展示', '品牌官网'], complexity: 4, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Inter', secondary: 'SF Pro' }, borderRadius: '16px', shadows: '多层模糊阴影', animations: '微妙悬浮', spacing: '8px基准', borderWidth: '1px半透明', darkMode: '原生支持', responsive: '优秀', performance: '中（backdrop-filter开销）', accessibility: '注意半透明层对比度' },
  { id: 'bento', label: 'Bento Grid', group: 'Modern', description: 'Modular asymmetric grid, spatial hierarchy', descriptionZh: '模块化非对称网格，空间层次', colors: { primary: '#0f0f0f', secondary: '#1a1a1a', accent: '#2d2d2d', highlight: '#6366f1' }, useCases: ['产品展示', '内容聚合', '个人主页'], complexity: 2, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'SF Pro', secondary: 'Inter' }, borderRadius: '20px', shadows: '无阴影', animations: '网格重排', spacing: '12px基准', borderWidth: '无', darkMode: '原生暗色', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'neumorphism', label: 'Neumorphism', group: 'Modern', description: 'Soft UI, extruded elements, tactile depth', descriptionZh: '柔软UI，凸出元素，触感深度', colors: { primary: '#e0e5ec', secondary: '#d1d9e6', accent: '#c3cfe2', highlight: '#6d5dfc' }, useCases: ['控制面板', '智能家居', 'IoT设备'], complexity: 2, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Poppins', secondary: 'Roboto' }, borderRadius: '12px', shadows: '内外双层阴影', animations: '按压反馈', spacing: '16px基准', borderWidth: '无', darkMode: '需适配', responsive: '良好', performance: '中', accessibility: '对比度需注意' },
  { id: 'dark-premium', label: 'Dark Premium', group: 'Modern', description: 'Deep blacks, subtle accents, refined contrast', descriptionZh: '深黑底色，微妙点缀，精致对比', colors: { primary: '#0a0a0a', secondary: '#141414', accent: '#1f1f1f', highlight: '#c9a227' }, useCases: ['金融后台', '高端SaaS', '数据平台'], complexity: 2, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'JetBrains Mono' }, borderRadius: '8px', shadows: '微弱投影', animations: '克制过渡', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'gradient', label: 'Gradient Vibrant', group: 'Modern', description: 'Refined gradients, balanced color, dynamic energy', descriptionZh: '克制的渐变，平衡色彩，动态活力', colors: { primary: '#667eea', secondary: '#764ba2', accent: '#f093fb', highlight: '#f5576c' }, useCases: ['营销页面', '创意工具', '社交媒体'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Plus Jakarta Sans', secondary: 'Inter' }, borderRadius: '12px', shadows: '彩色光晕', animations: '渐变流动', spacing: '12px基准', borderWidth: '无', darkMode: '需适配', responsive: '良好', performance: '中', accessibility: '渐变文字需注意' },
  { id: 'minimal', label: 'Minimal Clean', group: 'Modern', description: 'Pure whitespace, restrained elegance, clarity', descriptionZh: '纯净留白，克制的优雅，最大化清晰', colors: { primary: '#ffffff', secondary: '#f8f9fa', accent: '#e9ecef', highlight: '#212529' }, useCases: ['文档工具', '笔记应用', '阅读平台'], complexity: 1, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'Georgia' }, borderRadius: '4px', shadows: '无', animations: '极简淡入', spacing: '24px基准', borderWidth: '1px', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'claymorphism', label: 'Claymorphism', group: 'Niche', description: '3D rounded cards, warm tones, friendly feel', descriptionZh: '3D圆角卡片，温暖色调，友好质感', colors: { primary: '#f5f0e8', secondary: '#e8e0d0', accent: '#d4c5a9', highlight: '#ff6b6b' }, useCases: ['教育平台', '儿童应用', '休闲游戏'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Nunito', secondary: 'Quicksand' }, borderRadius: '24px', shadows: '3D膨胀阴影', animations: '弹性回弹', spacing: '16px基准', borderWidth: '无', darkMode: '需适配', responsive: '良好', performance: '中', accessibility: '需注意' },
  { id: 'hud', label: 'HUD / Sci-Fi', group: 'Niche', description: 'Futuristic interface, monochrome cyan, technical', descriptionZh: '未来界面，单色青，技术美学', colors: { primary: '#0a0a0a', secondary: '#0d1117', accent: '#00d4ff', highlight: '#00ff88' }, useCases: ['监控系统', '游戏界面', '科技展示'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Orbitron', secondary: 'Share Tech Mono' }, borderRadius: '2px', shadows: '发光效果', animations: '扫描线/闪烁', spacing: '8px基准', borderWidth: '1px发光', darkMode: '原生暗色', responsive: '中等', performance: '中', accessibility: '发光效果需注意' },
  { id: 'swiss', label: 'Swiss Modern', group: 'Advanced', description: 'Strict grid, bold typography, information density', descriptionZh: '严格网格，粗体排版，高信息密度', colors: { primary: '#ffffff', secondary: '#f5f5f5', accent: '#000000', highlight: '#ff0000' }, useCases: ['新闻媒体', '数据报告', '学术平台'], complexity: 3, techDifficulty: 2, contrast: 'AAA', typography: { primary: 'Helvetica Neue', secondary: 'Akzidenz Grotesk' }, borderRadius: '0px', shadows: '无', animations: '网格切换', spacing: '8px基准', borderWidth: '无', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'spatial', label: 'Spatial UI', group: 'Advanced', description: 'Depth layers, floating elements, perspective', descriptionZh: '深度层次，浮动元素，透视效果', colors: { primary: '#000000', secondary: '#1a1a2e', accent: '#16213e', highlight: '#00d4ff' }, useCases: ['VR/AR界面', '3D展示', '空间计算'], complexity: 5, techDifficulty: 5, contrast: 'AA', typography: { primary: 'SF Pro', secondary: 'Inter' }, borderRadius: '16px', shadows: '3D透视阴影', animations: '空间变换', spacing: '12px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '中等', performance: '低（3D渲染）', accessibility: '空间交互需注意' },
  { id: 'neubrutalism', label: 'Neubrutalism', group: 'Niche', description: 'Bold borders, solid shadows, high contrast', descriptionZh: '粗边框，实心阴影，高对比', colors: { primary: '#ffffff', secondary: '#ffd60a', accent: '#ff6b6b', highlight: '#4ecdc4' }, useCases: ['创意工作室', '时尚品牌', '艺术平台'], complexity: 2, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Space Grotesk', secondary: 'IBM Plex Mono' }, borderRadius: '0px', shadows: '4px硬阴影', animations: '生硬位移', spacing: '12px基准', borderWidth: '3px', darkMode: '需反转', responsive: '良好', performance: '高', accessibility: '优秀' },
  { id: 'sketch', label: 'Sketch', group: 'Niche', description: 'Hand-drawn feel, paper texture, approachable', descriptionZh: '手绘风格，纸张质感，平易近人', colors: { primary: '#faf8f5', secondary: '#f0ebe3', accent: '#e5ddd3', highlight: '#4a4a4a' }, useCases: ['设计工具', '创意笔记', '原型展示'], complexity: 3, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Caveat', secondary: 'Patrick Hand' }, borderRadius: '不规则', shadows: '手绘阴影', animations: '手绘擦除', spacing: '12px基准', borderWidth: '2px手绘', darkMode: '需适配', responsive: '中等', performance: '中', accessibility: '手写字体需注意' },
  { id: 'material3', label: 'Material 3', group: 'SaaS', description: 'Google M3 Expressive, rounded containers', descriptionZh: 'Google M3表达性设计，圆角容器', colors: { primary: '#6750a4', secondary: '#eaddff', accent: '#d0bcff', highlight: '#4f378b' }, useCases: ['Android应用', 'Google生态', '企业工具'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Roboto', secondary: 'Google Sans' }, borderRadius: '16px/28px', shadows: 'M3高程系统', animations: 'M3动效规范', spacing: '8dp基准', borderWidth: '无', darkMode: 'M3动态色彩', responsive: '优秀', performance: '高', accessibility: 'M3规范保障' },
  { id: 'stripe', label: 'Stripe Premium', group: 'SaaS', description: 'Industry benchmark, polished micro-interactions', descriptionZh: '行业标杆，精致的微交互', colors: { primary: '#0a2540', secondary: '#1a3a5c', accent: '#635bff', highlight: '#00d4aa' }, useCases: ['支付平台', '金融科技', '企业SaaS'], complexity: 4, techDifficulty: 3, contrast: 'AAA', typography: { primary: 'Söhne', secondary: 'SF Mono' }, borderRadius: '10px', shadows: '多层精致阴影', animations: '丰富微交互', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '优秀', performance: '中高', accessibility: '优秀' },
  { id: 'diffusion', label: 'Diffusion Light', group: 'Advanced', description: 'Soft scattered light, gentle glow, ethereal atmosphere', descriptionZh: '柔和弥散光，温润光晕，空灵氛围', colors: { primary: '#0a0a1a', secondary: '#1a1a3a', accent: '#2d2d5a', highlight: '#a78bfa' }, useCases: ['冥想应用', '高端展示', '艺术平台'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'DM Sans' }, borderRadius: '20px', shadows: '弥散光晕', animations: '柔和呼吸', spacing: '12px基准', borderWidth: '1px半透明', darkMode: '原生暗色', responsive: '良好', performance: '中（多层光晕）', accessibility: '注意光晕对比度' },
  { id: 'skeuomorphism', label: 'Skeuomorphism', group: 'Modern', description: 'Realistic material textures, leather, metal, wood grain', descriptionZh: '经典拟物化，复刻现实材质肌理，皮革金属木纹', colors: { primary: '#2c2c3a', secondary: '#3a3a4a', accent: '#c9a84c', highlight: '#d4b65a' }, useCases: ['高端应用', '奢侈品展示', '经典风格'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Georgia', secondary: 'Palatino' }, borderRadius: '8px', shadows: '多层真实阴影', animations: '材质过渡', spacing: '12px基准', borderWidth: '1px金属描边', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意纹理对比' },
  { id: 'neo-chinese', label: 'Neo-Chinese', group: 'Eastern', description: 'Ink wash, mortise lines, muted traditional palette', descriptionZh: '新中式UI，水墨留白，榫卯线条，青灰朱红低饱和国风配色', colors: { primary: '#f5f0e8', secondary: '#ebe5d9', accent: '#8b7355', highlight: '#b5544a' }, useCases: ['国风产品', '文化平台', '茶道/书法'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Noto Serif SC', secondary: 'Source Han Sans' }, borderRadius: '4px', shadows: '淡墨晕染', animations: '水墨晕开', spacing: '24px基准', borderWidth: '1px细线', darkMode: '需适配', responsive: '良好', performance: '高', accessibility: '需注意低饱和对比' },
  { id: 'guochao-retro', label: 'Guochao Retro', group: 'Eastern', description: 'Traditional patterns, bold colors, cloud/lattice motifs', descriptionZh: '国潮风UI，传统纹样，撞色排版，祥云窗棂元素', colors: { primary: '#1a0a0a', secondary: '#2a1010', accent: '#c41e3a', highlight: '#ffd700' }, useCases: ['国潮品牌', '文创产品', '传统节庆'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'ZCOOL KuaiLe', secondary: 'Noto Sans SC' }, borderRadius: '0px', shadows: '硬朗投影', animations: '传统纹样动画', spacing: '12px基准', borderWidth: '2px', darkMode: '原生暗色', responsive: '良好', performance: '高', accessibility: '需注意撞色对比' },
  { id: 'y2k', label: 'Y2K Millennium', group: 'Niche', description: 'High-sat laser, large rounded corners, jelly gradients', descriptionZh: 'Y2K千禧风，高饱和镭射，大圆角，果冻渐变', colors: { primary: '#0a0020', secondary: '#1a0040', accent: '#ff00ff', highlight: '#00ffff' }, useCases: ['潮流品牌', '音乐平台', 'Z世代产品'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Space Grotesk', secondary: 'Inter' }, borderRadius: '24px', shadows: '霓虹光晕', animations: '脉冲闪烁', spacing: '12px基准', borderWidth: '2px渐变', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意霓虹对比' },
  { id: 'cream', label: 'Cream UI', group: 'Niche', description: 'Macaron pastels, extra rounded, soft matte, healing', descriptionZh: '奶油软萌风，马卡龙低饱和，超大圆角，治愈系', colors: { primary: '#faf5f0', secondary: '#f5ede4', accent: '#e8c8b0', highlight: '#d4a0a0' }, useCases: ['母婴产品', '治愈系应用', '轻量化工具'], complexity: 2, techDifficulty: 1, contrast: 'AA', typography: { primary: 'Quicksand', secondary: 'Nunito' }, borderRadius: '20px', shadows: '柔和投影', animations: '弹性回弹', spacing: '16px基准', borderWidth: '无', darkMode: '需适配', responsive: '优秀', performance: '高', accessibility: '需注意低饱和对比' },
  { id: 'jelly-glass', label: 'Jelly Glass', group: 'Niche', description: 'High-sat translucent soft glass, jelly wobble', descriptionZh: '果冻玻璃，高饱和半透软质玻璃，区别冷调毛玻璃', colors: { primary: '#ff6b9d', secondary: '#c44dff', accent: '#6e5cff', highlight: '#00d4ff' }, useCases: ['社交产品', '创意工具', '潮流应用'], complexity: 3, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Poppins', secondary: 'Inter' }, borderRadius: '24px', shadows: '彩色半透阴影', animations: '果冻晃动', spacing: '12px基准', borderWidth: '1px半透', darkMode: '需适配', responsive: '良好', performance: '中', accessibility: '需注意半透对比' },
  { id: 'pixel-art', label: 'Pixel Art', group: 'Niche', description: '8/16-bit retro pixel, game-oriented, nostalgic', descriptionZh: '像素风UI，8/16位复古像素，游戏向界面，怀旧质感', colors: { primary: '#1a1c2c', secondary: '#262b44', accent: '#ef7d57', highlight: '#a7f070' }, useCases: ['游戏界面', '复古产品', '极客社区'], complexity: 2, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Press Start 2P', secondary: 'VT323' }, borderRadius: '0px', shadows: '像素阴影', animations: '像素闪烁', spacing: '4px基准', borderWidth: '3px', darkMode: '原生暗色', responsive: '中等', performance: '高', accessibility: '像素字体需注意' },
  { id: 'cyberpunk', label: 'Cyberpunk', group: 'Niche', description: 'Neon clash, glitch offset, dark neon, dystopian tech', descriptionZh: '赛博朋克UI，霓虹撞色，故障错位，暗底霓虹', colors: { primary: '#0a0010', secondary: '#0f0018', accent: '#ff003c', highlight: '#00f0ff' }, useCases: ['游戏界面', '科技展示', '潮流品牌'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Orbitron', secondary: 'Share Tech Mono' }, borderRadius: '0px/斜切角', shadows: '霓虹发光', animations: '故障闪烁', spacing: '8px基准', borderWidth: '1px霓虹', darkMode: '原生暗色', responsive: '中等', performance: '中', accessibility: '需注意霓虹对比' },
  { id: 'tech-minimal', label: 'Tech Minimal', group: 'SaaS', description: 'Cold gray monochrome, thin dividers, no decoration', descriptionZh: '科技极简，冷灰单色，细线条分割，政企科技产品专用', colors: { primary: '#fafafa', secondary: '#ffffff', accent: '#e5e5e5', highlight: '#171717' }, useCases: ['政企产品', '科技后台', 'B端系统'], complexity: 1, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'SF Mono' }, borderRadius: '0px', shadows: '无', animations: '无', spacing: '8px基准', borderWidth: '1px', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'matte-luxury', label: 'Matte Luxury', group: 'Advanced', description: 'Low-sat matte texture, fine metal outlines, no highlights', descriptionZh: '哑光轻奢，低饱和哑光肌理，细金属描边，无高光反光', colors: { primary: '#1a1816', secondary: '#1e1c1a', accent: '#8a7a5a', highlight: '#c8b898' }, useCases: ['高端品牌', '奢侈品官网', '私人银行'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Cormorant Garamond', secondary: 'Inter' }, borderRadius: '2px', shadows: '微妙投影', animations: '克制过渡', spacing: '12px基准', borderWidth: '1px金属描边', darkMode: '原生暗色', responsive: '优秀', performance: '高', accessibility: '需注意低饱和对比' },
  { id: 'enterprise-minimal', label: 'Enterprise Minimal', group: 'SaaS', description: 'Pure B/W/gray, function-oriented, no decoration, government/large B2B', descriptionZh: '企业极简风，纯黑白灰功能导向，政务大型B端系统标配', colors: { primary: '#ffffff', secondary: '#fafafa', accent: '#e0e0e0', highlight: '#111111' }, useCases: ['政务系统', '大型B端', '企业后台'], complexity: 1, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'System UI' }, borderRadius: '0px', shadows: '无', animations: '无', spacing: '8px基准', borderWidth: '1px', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'dashboard-data', label: 'Dashboard Data', group: 'SaaS', description: 'Modular data layout, minimal charts, strong hierarchy, BI/back-office', descriptionZh: '数据仪表盘风，模块化数据布局，极简图表，BI后台专用', colors: { primary: '#0f1117', secondary: '#131620', accent: '#6366f1', highlight: '#22c55e' }, useCases: ['BI平台', '数据后台', '运维监控'], complexity: 3, techDifficulty: 2, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'JetBrains Mono' }, borderRadius: '6px', shadows: '微弱投影', animations: '数据刷新', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'magazine-layout', label: 'Magazine Layout', group: 'Advanced', description: 'Bold headline breaking grid, text-image interweaving, free layout', descriptionZh: '杂志版式UI，大标题破格排版，图文穿插，自由化版式', colors: { primary: '#faf8f5', secondary: '#ffffff', accent: '#1a1a1a', highlight: '#c4a35a' }, useCases: ['内容产品', '媒体平台', '博客杂志'], complexity: 3, techDifficulty: 2, contrast: 'AAA', typography: { primary: 'Georgia', secondary: 'Playfair Display' }, borderRadius: '0px', shadows: '无', animations: '版式切换', spacing: '24px基准', borderWidth: '无', darkMode: '需反转', responsive: '良好', performance: '高', accessibility: '优秀' },
  { id: 'boundless', label: 'Boundless UI', group: 'Advanced', description: 'No borders, no dividers, floating elements, extreme whitespace', descriptionZh: '无边界极简，无边框无分割线，全屏元素悬浮，极致留白', colors: { primary: '#ffffff', secondary: '#ffffff', accent: '#f0f0f0', highlight: '#000000' }, useCases: ['高端品牌', '极简产品', '禅意应用'], complexity: 2, techDifficulty: 2, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'SF Pro' }, borderRadius: '0px', shadows: '无', animations: '极简淡入', spacing: '32px基准', borderWidth: '无', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'topological-scientific', label: 'Topological Scientific', group: 'Scientific', description: 'Vector topological lines, node connection, network mechanism', descriptionZh: '拓扑科研风，矢量拓扑线条，节点连接，网络机理专用', colors: { primary: '#fafafa', secondary: '#ffffff', accent: '#dddddd', highlight: '#333333' }, useCases: ['网络分析', '拓扑研究', '图论可视化'], complexity: 3, techDifficulty: 2, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'Roboto Mono' }, borderRadius: '0px', shadows: '无', animations: '节点高亮', spacing: '8px基准', borderWidth: '1px', darkMode: '需反转', responsive: '良好', performance: '高', accessibility: '优秀' },
  { id: 'fluorescent-labeling', label: 'Fluorescent Labeling', group: 'Scientific', description: 'Fluorescent color marking, high-transparency background, biological imaging', descriptionZh: '荧光标记风，荧光色标注，高透背景，生物成像/细胞标记绘图', colors: { primary: '#050510', secondary: '#080818', accent: '#1a1a40', highlight: '#00ff88' }, useCases: ['生物成像', '细胞标记', '荧光显微镜'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'JetBrains Mono' }, borderRadius: '2px', shadows: '荧光发光', animations: '脉冲闪烁', spacing: '8px基准', borderWidth: '1px荧光', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意荧光对比' },
  { id: 'schematic-minimal', label: 'Schematic Minimal', group: 'Scientific', description: 'Ultra-simple lines, no filling, core structure visualization', descriptionZh: '极简示意风，超简线条，无任何填色，核心机理/结构示意专用', colors: { primary: '#ffffff', secondary: '#ffffff', accent: '#eeeeee', highlight: '#333333' }, useCases: ['机理示意', '结构图', '流程图'], complexity: 1, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'Helvetica' }, borderRadius: '0px', shadows: '无', animations: '无', spacing: '16px基准', borderWidth: '1px', darkMode: '需反转', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'crystal-lattice', label: 'Crystal Lattice', group: 'Scientific', description: 'Multi-color atom labeling, regular lattice, chemistry/molecular modeling', descriptionZh: '晶体晶格风，多色原子标注，规整晶格结构，化学/分子晶体示意图', colors: { primary: '#0a0e1a', secondary: '#0d1220', accent: '#1a2540', highlight: '#ff4444' }, useCases: ['化学分子', '晶体建模', '原子结构'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Source Code Pro' }, borderRadius: '2px', shadows: '微弱发光', animations: '晶格振动', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '高', accessibility: '需注意暗色对比' },
  { id: 'dynamic-trajectory', label: 'Dynamic Trajectory', group: 'Scientific', description: 'Smooth trajectory lines, dynamic blur, motion process visualization', descriptionZh: '动态轨迹风，流畅轨迹线条，动态模糊，运动过程/粒子轨迹绘图', colors: { primary: '#0a0a14', secondary: '#0e0e1a', accent: '#1a1a30', highlight: '#ff6b35' }, useCases: ['粒子轨迹', '运动分析', '流体力学'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Fira Code' }, borderRadius: '2px', shadows: '轨迹光晕', animations: '流动轨迹', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意动态效果' },
  { id: 'microscopic-texture', label: 'Microscopic Texture', group: 'Scientific', description: 'Ultra-fine texture rendering, high-definition details, micro-material observation', descriptionZh: '微观肌理风，超细肌理渲染，高清细节，微观材料/组织观测图', colors: { primary: '#f8f6f2', secondary: '#ffffff', accent: '#e0dcd4', highlight: '#5a4a3a' }, useCases: ['微观材料', 'SEM成像', '金相分析'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Georgia' }, borderRadius: '0px', shadows: '自然投影', animations: '无', spacing: '12px基准', borderWidth: '1px', darkMode: '需适配', responsive: '良好', performance: '高', accessibility: '需注意低对比' },
  { id: 'academic-collage', label: 'Academic Collage', group: 'Scientific', description: 'Orderly collage of text, images and data, review paper matching', descriptionZh: '学术拼贴风，图文数据有序拼贴，综述论文配图专用', colors: { primary: '#ffffff', secondary: '#ffffff', accent: '#dddddd', highlight: '#333333' }, useCases: ['综述论文', '学术海报', '文献整理'], complexity: 2, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Georgia', secondary: 'Times New Roman' }, borderRadius: '0px', shadows: '无', animations: '无', spacing: '16px基准', borderWidth: '1px', darkMode: '需反转', responsive: '良好', performance: '高', accessibility: '优秀' },
  { id: 'cold-precision', label: 'Cold Precision Science', group: 'Scientific', description: 'Cold gray tone, precise scale, engineering/mechanical research', descriptionZh: '冷调精密科研风，冷灰主色调，精密刻度，工程/机械科研绘图', colors: { primary: '#f0f2f5', secondary: '#ffffff', accent: '#c8ccd4', highlight: '#4a5568' }, useCases: ['工程绘图', '机械科研', '精密测量'], complexity: 2, techDifficulty: 1, contrast: 'AAA', typography: { primary: 'Inter', secondary: 'Roboto Mono' }, borderRadius: '0px', shadows: '微妙投影', animations: '无', spacing: '8px基准', borderWidth: '1px', darkMode: '需适配', responsive: '优秀', performance: '高', accessibility: '优秀' },
  { id: 'bionic-mechanism', label: 'Bionic Mechanism', group: 'Scientific', description: 'Bionic structure simulation, natural texture, bionic research illustration', descriptionZh: '仿生机理风，仿生结构模拟，自然肌理，仿生学研究示意图', colors: { primary: '#f5f2ec', secondary: '#faf8f4', accent: '#d8d0c4', highlight: '#5a7a4a' }, useCases: ['仿生研究', '生物力学', '自然模拟'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Lora' }, borderRadius: '4px', shadows: '自然阴影', animations: '缓慢过渡', spacing: '12px基准', borderWidth: '1px', darkMode: '需适配', responsive: '良好', performance: '高', accessibility: '需注意低饱和对比' },
  { id: 'meteorological-contour', label: 'Meteorological Contour', group: 'Scientific', description: 'Heatmap gradient, contour lines, temperature/pressure field visualization', descriptionZh: '气象等值线风，热力图渐变配色，流畅等值线条，温度/气压场绘图', colors: { primary: '#0c1828', secondary: '#0f1e32', accent: '#1a3050', highlight: '#ff6b35' }, useCases: ['热力图', '温度场', '气压场'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Source Code Pro' }, borderRadius: '2px', shadows: '等值线光晕', animations: '等值线流动', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意暗色对比' },
  { id: 'satellite-cloud', label: 'Satellite Cloud Image', group: 'Scientific', description: 'Multi-band pseudo-color, HD texture, remote sensing observation', descriptionZh: '卫星云图适配风，多波段伪彩色渲染，高清肌理，遥感观测图专用', colors: { primary: '#060810', secondary: '#0a0e18', accent: '#141c2c', highlight: '#44ddaa' }, useCases: ['卫星气象', '云图分析', '遥感观测'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Source Code Pro' }, borderRadius: '2px', shadows: '伪彩色光晕', animations: '云层流动', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意伪彩色对比' },
  { id: 'heatmap-scientific', label: 'Heatmap Scientific', group: 'Scientific', description: 'Red-yellow-blue gradient, data density visualization, thermal/statistical analysis', descriptionZh: '热力图科研风，红黄蓝渐变配色，数据密度可视化，热力学/统计分析专用', colors: { primary: '#0a0a14', secondary: '#0e0e1a', accent: '#1a1a30', highlight: '#ffaa00' }, useCases: ['热力图', '数据密度', '统计分析'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'JetBrains Mono' }, borderRadius: '2px', shadows: '渐变光晕', animations: '数据刷新', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意渐变对比' },
  { id: 'spectral-analysis', label: 'Spectral Analysis', group: 'Scientific', description: 'Rainbow color spectrum, wavelength analysis, optical/spectroscopy research', descriptionZh: '光谱分析风，彩虹色带配色，波长分析，光学/光谱学研究专用', colors: { primary: '#080810', secondary: '#0c0c18', accent: '#181830', highlight: '#ff3366' }, useCases: ['光谱分析', '波长研究', '光学实验'], complexity: 4, techDifficulty: 3, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Fira Code' }, borderRadius: '2px', shadows: '光谱发光', animations: '波长扫描', spacing: '8px基准', borderWidth: '1px', darkMode: '原生暗色', responsive: '良好', performance: '中', accessibility: '需注意光谱对比' },
  { id: 'geological-map', label: 'Geological Map', group: 'Scientific', description: 'Multi-color terrain grading, stratigraphic layers, geology/topography mapping', descriptionZh: '地质地形风，多色地形分级配色，地层分层，地质/地形测绘专用', colors: { primary: '#f5f0e8', secondary: '#faf8f4', accent: '#e0d8c8', highlight: '#8b5e3c' }, useCases: ['地质测绘', '地形分析', '地层研究'], complexity: 3, techDifficulty: 2, contrast: 'AA', typography: { primary: 'Inter', secondary: 'Georgia' }, borderRadius: '2px', shadows: '自然投影', animations: '无', spacing: '12px基准', borderWidth: '1px', darkMode: '需适配', responsive: '良好', performance: '高', accessibility: '需注意低饱和对比' },
]

// =======================================
// STYLE KEYWORDS
// =======================================
export const styleKeywords = {
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
  'cold-precision': ['冷调精密', 'cold precision', '冷灰主色调', '精密刻度', '工程科研', '机械科研', 'engineering research', 'precise scale', 'mechanical'],
  'bionic-mechanism': ['仿生机理', 'bionic mechanism', '仿生结构', '自然肌理', '仿生学', 'bionic structure', 'natural texture', 'biomimetic'],
  'meteorological-contour': ['气象等值线', 'meteorological contour', '等值线条', '渐变配色', '气压场', '温度场', 'atmospheric pressure', 'temperature field', 'contour lines'],
  'satellite-cloud': ['卫星云图', 'satellite cloud', '伪彩色', '卫星气象', '遥感观测', 'pseudo-color rendering', 'satellite observation', 'remote sensing', 'cloud image'],
  'heatmap-scientific': ['热力图', 'heatmap', '红黄蓝渐变', '数据密度', '统计分析', 'red-yellow-blue gradient', 'data density', 'thermal analysis'],
  'spectral-analysis': ['光谱分析', 'spectral analysis', '彩虹色带', '波长', '光学', 'rainbow spectrum', 'wavelength', 'optical research'],
  'geological-map': ['地质地形', 'geological map', '多色地形', '地层', '测绘', 'terrain grading', 'stratigraphic', 'topography'],
}

// =======================================
// DASHBOARD COMPONENT MAPPING
// Maps style IDs to their component file names (PascalCase)
// =======================================
const dashboardComponentMap = {
  glassmorphism: 'GlassmorphismDashboard',
  bento: 'BentoDashboard',
  neumorphism: 'NeumorphismDashboard',
  'dark-premium': 'DarkPremiumDashboard',
  gradient: 'GradientDashboard',
  minimal: 'MinimalDashboard',
  claymorphism: 'ClaymorphismDashboard',
  hud: 'HUDDashboard',
  swiss: 'SwissDashboard',
  spatial: 'SpatialDashboard',
  neubrutalism: 'NeubrutalismDashboard',
  sketch: 'SketchDashboard',
  material3: 'Material3Dashboard',
  stripe: 'StripePremiumDashboard',
  diffusion: 'DiffusionDashboard',
  skeuomorphism: 'SkeuomorphismDashboard',
  'neo-chinese': 'NeoChineseDashboard',
  'guochao-retro': 'GuochaoRetroDashboard',
  y2k: 'Y2KDashboard',
  cream: 'CreamDashboard',
  'jelly-glass': 'JellyGlassDashboard',
  'pixel-art': 'PixelArtDashboard',
  cyberpunk: 'CyberpunkDashboard',
  'tech-minimal': 'TechMinimalDashboard',
  'matte-luxury': 'MatteLuxuryDashboard',
  'enterprise-minimal': 'EnterpriseMinimalDashboard',
  'dashboard-data': 'DashboardDataDashboard',
  'magazine-layout': 'MagazineLayoutDashboard',
  boundless: 'BoundlessDashboard',
  'topological-scientific': 'TopologicalScientificDashboard',
  'fluorescent-labeling': 'FluorescentLabelingDashboard',
  'schematic-minimal': 'SchematicMinimalDashboard',
  'crystal-lattice': 'CrystalLatticeDashboard',
  'dynamic-trajectory': 'DynamicTrajectoryDashboard',
  'microscopic-texture': 'MicroscopicTextureDashboard',
  'academic-collage': 'AcademicCollageDashboard',
  'cold-precision': 'ColdPrecisionDashboard',
  'bionic-mechanism': 'BionicMechanismDashboard',
  'meteorological-contour': 'MeteorologicalContourDashboard',
  'satellite-cloud': 'SatelliteCloudDashboard',
  'heatmap-scientific': 'HeatmapScientificDashboard',
  'spectral-analysis': 'SpectralAnalysisDashboard',
  'geological-map': 'GeologicalMapDashboard',
}

// =======================================
// HELPER FUNCTIONS
// =======================================
export function isColorDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

export function kebabToPascal(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

export function getComponentName(styleId) {
  return dashboardComponentMap[styleId] || kebabToPascal(styleId) + 'Dashboard'
}

export function groupedStyles() {
  return styles.reduce((acc, style) => {
    if (!acc[style.group]) acc[style.group] = []
    acc[style.group].push(style)
    return acc
  }, {})
}

// =======================================
// UTILITY: Generate style prompt
// =======================================
export function generateStylePrompt(style) {
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
\`\`\``
}
