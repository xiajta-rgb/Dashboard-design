# 新增 6 种前沿视觉风格 Spec

## Why
当前已有 6 种基础风格（Glassmorphism、Bento Grid、Neumorphism、Dark Premium、Gradient Vibrant、Minimal Clean），但全球设计趋势中还涌现出多种专业级仪表盘风格，需要补充以形成完整的灵感仓库。

## What Changes
- 新增 Linear Style 线性风格（Stripe、Linear 等 SaaS 标准设计）
- 新增 Claymorphism 黏土风格（圆润、3D 感、柔和色彩）
- 新增 HUD / Sci-Fi 风格（科幻感、数据密集型、FUI 界面）
- 新增 Aurora UI 极光风格（流动渐变光带、高级氛围）
- 新增 Swiss Modernism 瑞士现代主义风格（严谨排版、网格、高信息密度）
- 新增 Spatial UI 空间感风格（深度、透视、层次悬浮）

## Impact
- 新增 6 个仪表盘组件文件
- 更新 App.jsx 导航和路由映射
- 更新 styles 数据

## ADDED Requirements

### Requirement: Linear 线性风格
采用 Stripe/Linear 的标准 SaaS 设计：深色背景 (#0F1117)、精细 1px 边框、高对比度文字、极致的排版细节。

#### Scenario: Linear 风格展示
- **WHEN** 查看 Linear 风格仪表盘
- **THEN** 页面呈现精密的 1px 边框体系、克制的强调色、优秀的字体层级

### Requirement: Claymorphism 黏土风格
3D 圆润卡片、厚重圆角、柔和内阴影、温暖色彩、友好亲和。

#### Scenario: 黏土效果展示
- **WHEN** 查看 Claymorphism 风格仪表盘
- **THEN** 卡片具有 3D 凸起感（多重阴影+内阴影）、大圆角（20px+）、温暖柔和配色

### Requirement: HUD / Sci-Fi 科幻仪表盘
科幻风格的 FUI (Fantasy User Interface)，技术感十足，适合网络安全、工业监控场景。

#### Scenario: 科幻效果展示
- **WHEN** 查看 HUD 风格仪表盘
- **THEN** 深色背景、扫描线效果、单色霓虹文字（青色或琥珀色）、细线框、等宽字体、技术数据展示

### Requirement: Aurora UI 极光风格
流动极光色彩、柔和光带效果、高级氛围感。

#### Scenario: 极光效果展示
- **WHEN** 查看 Aurora 风格仪表盘
- **THEN** 页面具有动态极光色彩流动、半透明卡片、柔和彩色光晕

### Requirement: Swiss Modernism 瑞士现代主义风格
严谨的网格系统、Helvetica 级排版、高信息密度、黑白色调为主。

#### Scenario: 瑞士风格展示
- **WHEN** 查看 Swiss 风格仪表盘
- **THEN** 页面具有严格的网格对齐、粗大的标题字体、黑白灰为主、极少装饰色、信息密度高但层次清晰

### Requirement: Spatial UI 空间感风格
元素呈现悬浮感、深度层次、微妙透视、类似 VisionOS 的空间设计。

#### Scenario: 空间效果展示
- **WHEN** 查看 Spatial 风格仪表盘
- **THEN** 卡片呈现不同高度的悬浮效果、背景深度模糊、元素有前后层次关系
