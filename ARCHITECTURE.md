# Dashboard 项目架构优化说明

## 问题分析

原始架构存在以下问题：

1. **配置分散**：所有风格配置、组件导入都集中在 App.jsx 中，导致文件过大且维护困难
2. **添加新 dashboard 流程繁琐**：需要在多个地方手动修改代码
3. **缺少自动化工具**：没有快速创建新 dashboard 的工具

## 优化方案

### 1. 创建集中配置文件 (`src/dashboard-config.js`)
- 将所有风格配置集中管理
- 提供统一的访问接口和辅助函数
- 便于后续扩展和维护

### 2. 创建 Dashboard Generator Skill (`.trae/skills/dashboard-generator/`)
- **SKILL.md**：技能说明文档
- **dashboard-template.jsx**：dashboard 组件模板
- **generate-dashboard.py**：自动化创建脚本

### 3. 架构改进点

#### 文件结构
```
src/
├── dashboard-config.js    # 新增：集中配置文件
├── context/
│   └── DashboardContext.jsx
├── dashboards/            # 所有 dashboard 组件
├── data/
│   └── mockData.js
├── App.jsx
├── main.jsx
└── index.css

.trae/skills/dashboard-generator/
├── SKILL.md               # 技能说明
├── dashboard-template.jsx # 组件模板
└── generate-dashboard.py  # 自动化脚本
```

## 使用指南

### 方法 1：使用 Python 脚本自动化创建（推荐）

```bash
cd .trae/skills/dashboard-generator
python generate-dashboard.py
```

按照提示输入信息，脚本会自动：
1. 创建 dashboard 组件文件
2. 更新配置文件
3. 更新 App.jsx 的导入

### 方法 2：手动创建

1. 复制模板文件
   ```bash
   cp .trae/skills/dashboard-generator/dashboard-template.jsx src/dashboards/YourStyleNameDashboard.jsx
   ```

2. 替换模板中的占位符
   - `{{StyleName}}` → 你的风格名称（PascalCase）
   - `{{style-id}}` → 你的风格 ID（kebab-case）

3. 更新 `src/dashboard-config.js`
   - 在 `styles` 数组中添加新风格配置
   - 在 `styleKeywords` 中添加关键词（可选）

4. 更新 `src/App.jsx`
   - 添加懒加载导入
   - 添加组件映射
   - 添加预加载导入

## 配置文件说明

### style 对象结构
```javascript
{
  id: 'style-id',              // kebab-case 风格 ID
  label: 'Style Label',        // 可读的风格名称
  group: 'Modern',             // 分组（Modern, SaaS, Niche, Advanced, Eastern, Scientific）
  description: 'English desc', // 英文描述
  descriptionZh: '中文描述',    // 中文描述
  colors: {
    primary: '#000000',
    secondary: '#111111',
    accent: '#222222',
    highlight: '#333333'
  },
  useCases: ['场景1', '场景2'],
  complexity: 2,
  techDifficulty: 1,
  contrast: 'AA',
  typography: { primary: 'Inter', secondary: 'SF Pro' },
  borderRadius: '12px',
  shadows: '阴影描述',
  animations: '动画描述',
  spacing: '间距基准',
  borderWidth: '1px',
  darkMode: '原生暗色',
  responsive: '优秀',
  performance: '高',
  accessibility: '良好'
}
```

## 已完成的优化

- ✅ 创建集中配置文件
- ✅ 创建 dashboard 生成工具
- ✅ 创建组件模板
- ✅ 整理架构文档
- ✅ 修复 SatelliteCloudDashboard 的颜色解析问题
- ✅ 修复 BionicMechanismDashboard 的语法错误

## 后续建议

1. **进一步重构 App.jsx**：将配置相关代码移到 `dashboard-config.js`
2. **添加类型支持**：考虑使用 TypeScript 或 PropTypes
3. **完善测试**：添加组件测试和配置验证
4. **CI/CD 集成**：在自动化流程中加入配置验证
