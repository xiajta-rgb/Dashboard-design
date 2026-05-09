import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Users,
  FolderKanban,
  Target,
  Star,
  Edit2,
  Trash2,
  Eye,
  Download,
  ChevronDown,
  Layers,
  GitBranch,
  Milestone,
  Activity,
  PieChart,
  BarChart3,
  Award,
  Briefcase,
  Code2,
  Palette,
  Globe,
  Smartphone,
  Server,
  Database
} from 'lucide-react'
import { Badge } from '../components/ui'

const projects = [
  {
    id: 1,
    name: '智慧城市大数据平台',
    description: '整合城市各类数据资源，构建统一的数据分析和可视化平台',
    status: 'active',
    progress: 72,
    priority: 'high',
    category: '数据平台',
    startDate: '2026-03-01',
    endDate: '2026-08-30',
    budget: 5000000,
    spent: 3200000,
    teamSize: 12,
    completedMilestones: 8,
    totalMilestones: 12,
    members: [
      { name: '张明', role: '项目经理', avatar: '张' },
      { name: '李华', role: '技术总监', avatar: '李' },
      { name: '王芳', role: 'UI设计师', avatar: '王' },
    ],
    recentActivity: [
      { user: '张明', action: '完成了', target: '数据可视化模块', time: '2小时前' },
      { user: '李华', action: '提交了', target: 'API接口文档', time: '5小时前' },
      { user: '王芳', action: '更新了', target: '仪表盘设计稿', time: '昨天' },
    ],
    tags: ['大数据', '可视化', '智慧城市'],
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    name: '移动端电商APP 3.0',
    description: '全新改版的移动电商应用，优化用户体验和购物流程',
    status: 'active',
    progress: 45,
    priority: 'high',
    category: '移动开发',
    startDate: '2026-04-15',
    endDate: '2026-07-30',
    budget: 3000000,
    spent: 1200000,
    teamSize: 8,
    completedMilestones: 3,
    totalMilestones: 8,
    members: [
      { name: '刘洋', role: '产品经理', avatar: '刘' },
      { name: '陈静', role: 'iOS开发', avatar: '陈' },
      { name: '赵强', role: 'Android开发', avatar: '赵' },
    ],
    recentActivity: [
      { user: '刘洋', action: '创建了', target: '商品详情页原型', time: '1小时前' },
      { user: '陈静', action: '修复了', target: '购物车逻辑bug', time: '3小时前' },
      { user: '赵强', action: '优化了', target: '首页加载速度', time: '昨天' },
    ],
    tags: ['移动端', '电商', 'iOS', 'Android'],
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    name: '企业官网重构项目',
    description: '全新设计语言的企业官网，提升品牌形象和用户体验',
    status: 'review',
    progress: 90,
    priority: 'medium',
    category: 'Web开发',
    startDate: '2026-02-01',
    endDate: '2026-05-30',
    budget: 1500000,
    spent: 1350000,
    teamSize: 5,
    completedMilestones: 9,
    totalMilestones: 10,
    members: [
      { name: '王芳', role: '设计负责人', avatar: '王' },
      { name: '孙伟', role: '前端开发', avatar: '孙' },
      { name: '周琳', role: '内容编辑', avatar: '周' },
    ],
    recentActivity: [
      { user: '王芳', action: '审核了', target: '首页设计稿', time: '30分钟前' },
      { user: '孙伟', action: '完成了', target: '响应式布局', time: '昨天' },
      { user: '周琳', action: '上传了', target: '产品图文素材', time: '2天前' },
    ],
    tags: ['官网', '品牌', '响应式'],
    icon: Globe,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 4,
    name: 'AI智能客服系统',
    description: '基于大语言模型的智能客服系统，提升服务效率',
    status: 'planning',
    progress: 15,
    priority: 'medium',
    category: 'AI应用',
    startDate: '2026-05-01',
    endDate: '2026-12-30',
    budget: 8000000,
    spent: 500000,
    teamSize: 15,
    completedMilestones: 1,
    totalMilestones: 15,
    members: [
      { name: '吴磊', role: 'AI工程师', avatar: '吴' },
      { name: '郑婷', role: '产品经理', avatar: '郑' },
      { name: '钱伟', role: '后端开发', avatar: '钱' },
    ],
    recentActivity: [
      { user: '吴磊', action: '调研了', target: '主流LLM模型', time: '今天' },
      { user: '郑婷', action: '编写了', target: '需求文档', time: '昨天' },
      { user: '钱伟', action: '搭建了', target: '开发环境', time: '3天前' },
    ],
    tags: ['AI', 'NLP', '智能客服'],
    icon: Code2,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 5,
    name: '品牌视觉升级',
    description: '全新品牌形象系统，包括Logo、色彩、字体等全套VI设计',
    status: 'done',
    progress: 100,
    priority: 'low',
    category: '品牌设计',
    startDate: '2026-01-15',
    endDate: '2026-04-15',
    budget: 800000,
    spent: 750000,
    teamSize: 4,
    completedMilestones: 6,
    totalMilestones: 6,
    members: [
      { name: '王芳', role: '设计总监', avatar: '王' },
      { name: '林晓', role: '品牌设计师', avatar: '林' },
    ],
    recentActivity: [
      { user: '王芳', action: '交付了', target: '全套VI设计', time: '1个月前' },
      { user: '林晓', action: '整理了', target: '设计规范文档', time: '1个月前' },
    ],
    tags: ['VI', '品牌', '设计'],
    icon: Palette,
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 6,
    name: '后台管理系统2.0',
    description: '重构后台管理系统，采用微服务架构和现代化前端框架',
    status: 'active',
    progress: 35,
    priority: 'high',
    category: 'Web开发',
    startDate: '2026-03-15',
    endDate: '2026-09-30',
    budget: 2500000,
    spent: 800000,
    teamSize: 6,
    completedMilestones: 2,
    totalMilestones: 10,
    members: [
      { name: '李华', role: '技术负责人', avatar: '李' },
      { name: '孙伟', role: '前端开发', avatar: '孙' },
      { name: '钱伟', role: '后端开发', avatar: '钱' },
    ],
    recentActivity: [
      { user: '李华', action: '完成了', target: '微服务架构设计', time: '1天前' },
      { user: '孙伟', action: '开发了', target: '权限管理模块', time: '2天前' },
      { user: '钱伟', action: '搭建了', target: 'Spring Cloud环境', time: '3天前' },
    ],
    tags: ['后台', '微服务', 'Vue3'],
    icon: Server,
    color: 'from-indigo-500 to-violet-500',
  },
]

const stats = [
  { label: '项目总数', value: '24', change: '+3', trend: 'up', icon: FolderKanban },
  { label: '进行中', value: '12', change: '+2', trend: 'up', icon: Activity },
  { label: '即将到期', value: '3', change: '-1', trend: 'down', icon: AlertCircle },
  { label: '已完成', value: '9', change: '+2', trend: 'up', icon: CheckCircle2 },
]

const categoryIcons = {
  '数据平台': Database,
  '移动开发': Smartphone,
  'Web开发': Globe,
  'AI应用': Code2,
  '品牌设计': Palette,
}

const statusConfig = {
  active: { label: '进行中', color: 'emerald', bgColor: 'bg-emerald-500/10', textColor: 'text-emerald-400' },
  planning: { label: '规划中', color: 'blue', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400' },
  review: { label: '审核中', color: 'amber', bgColor: 'bg-amber-500/10', textColor: 'text-amber-400' },
  done: { label: '已完成', color: 'violet', bgColor: 'bg-violet-500/10', textColor: 'text-violet-400' },
  paused: { label: '已暂停', color: 'neutral', bgColor: 'bg-neutral-500/10', textColor: 'text-neutral-400' },
}

const priorityConfig = {
  urgent: { label: '紧急', color: 'bg-red-500', textColor: 'text-red-400' },
  high: { label: '高', color: 'bg-orange-500', textColor: 'text-orange-400' },
  medium: { label: '中', color: 'bg-amber-500', textColor: 'text-amber-400' },
  low: { label: '低', color: 'bg-emerald-500', textColor: 'text-emerald-400' },
}

export default function ProjectOverviewPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.includes(searchQuery) || p.description.includes(searchQuery)
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const categories = [...new Set(projects.map(p => p.category))]

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">项目概览</h1>
              <p className="text-sm text-neutral-500 mt-1">全面了解所有项目的进度和状态</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <Download className="w-4 h-4" />
                导出报告
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
                <Plus className="w-4 h-4" />
                新建项目
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-violet-400" />
                  <span className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="搜索项目名称或描述..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="all">全部状态</option>
                  <option value="planning">规划中</option>
                  <option value="active">进行中</option>
                  <option value="review">审核中</option>
                  <option value="done">已完成</option>
                  <option value="paused">已暂停</option>
                </select>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="all">全部分类</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProjects.map((project, index) => {
              const status = statusConfig[project.status]
              const priority = priorityConfig[project.priority]
              const ProjectIcon = project.icon
              const budgetPercent = (project.spent / project.budget) * 100

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-violet-500/30 transition-all cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                          <ProjectIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{project.name}</h3>
                          <span className="text-xs text-neutral-500">{project.category}</span>
                        </div>
                      </div>
                      <button className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${status.bgColor} ${status.textColor}`}>
                        {status.label}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 text-xs ${priority.textColor}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${priority.color}`} />
                        {priority.label}优先级
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-neutral-500">项目进度</span>
                        <span className="text-sm text-white font-medium">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            project.status === 'done' 
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                              : project.progress >= 70
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                              : 'bg-gradient-to-r from-violet-500 to-purple-500'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-neutral-800/50 rounded-lg">
                        <div className="text-lg font-bold text-white">{project.teamSize}</div>
                        <div className="text-xs text-neutral-500">团队成员</div>
                      </div>
                      <div className="text-center p-2 bg-neutral-800/50 rounded-lg">
                        <div className="text-lg font-bold text-white">{project.completedMilestones}/{project.totalMilestones}</div>
                        <div className="text-xs text-neutral-500">里程碑</div>
                      </div>
                      <div className="text-center p-2 bg-neutral-800/50 rounded-lg">
                        <div className="text-lg font-bold text-white">{Math.round(budgetPercent)}%</div>
                        <div className="text-xs text-neutral-500">预算使用</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-2">
                          {project.members.slice(0, 3).map((member, i) => (
                            <div
                              key={i}
                              className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium border-2 border-neutral-900"
                              title={`${member.name} - ${member.role}`}
                            >
                              {member.avatar}
                            </div>
                          ))}
                          {project.members.length > 3 && (
                            <div className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center text-white text-xs font-medium border-2 border-neutral-900">
                              +{project.members.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <Calendar className="w-3 h-3" />
                        {project.endDate}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-neutral-900/30 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">最近动态</span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {project.recentActivity.slice(0, 2).map((activity, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <span className="text-violet-400">{activity.user}</span>
                          <span className="text-neutral-500">{activity.action}</span>
                          <span className="text-white truncate flex-1">{activity.target}</span>
                          <span className="text-neutral-600">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-neutral-900 rounded-2xl border border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedProject.color} flex items-center justify-center`}>
                        {(() => {
                          const Icon = selectedProject.icon
                          return <Icon className="w-8 h-8 text-white" />
                        })()}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{selectedProject.name}</h2>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${statusConfig[selectedProject.status].bgColor} ${statusConfig[selectedProject.status].textColor}`}>
                            {statusConfig[selectedProject.status].label}
                          </span>
                          <span className="text-xs text-neutral-500">{selectedProject.category}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-neutral-400 mb-6">{selectedProject.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-neutral-800/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-violet-400" />
                        <span className="text-xs text-neutral-400">当前进度</span>
                      </div>
                      <span className="text-xl font-bold text-white">{selectedProject.progress}%</span>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-violet-400" />
                        <span className="text-xs text-neutral-400">团队规模</span>
                      </div>
                      <span className="text-xl font-bold text-white">{selectedProject.teamSize}人</span>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Milestone className="w-4 h-4 text-violet-400" />
                        <span className="text-xs text-neutral-400">里程碑</span>
                      </div>
                      <span className="text-xl font-bold text-white">{selectedProject.completedMilestones}/{selectedProject.totalMilestones}</span>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <PieChart className="w-4 h-4 text-violet-400" />
                        <span className="text-xs text-neutral-400">预算使用</span>
                      </div>
                      <span className="text-xl font-bold text-white">{Math.round((selectedProject.spent / selectedProject.budget) * 100)}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-neutral-800/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-violet-400" />
                        <span className="text-xs text-neutral-400">项目周期</span>
                      </div>
                      <div className="text-sm text-white">{selectedProject.startDate} 至 {selectedProject.endDate}</div>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-violet-400" />
                        <span className="text-xs text-neutral-400">预算情况</span>
                      </div>
                      <div className="text-sm text-white">¥{(selectedProject.budget / 10000).toFixed(0)}万 / 已用 ¥{(selectedProject.spent / 10000).toFixed(0)}万</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-white mb-3">团队成员</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.members.map((member, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-xl">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-medium">
                            {member.avatar}
                          </div>
                          <div>
                            <div className="text-sm text-white font-medium">{member.name}</div>
                            <div className="text-xs text-neutral-500">{member.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-white mb-3">项目标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-violet-500/10 text-violet-400 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-white mb-3">最近活动</h3>
                    <div className="space-y-3">
                      {selectedProject.recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-neutral-800/30 rounded-xl">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                            {activity.user[0]}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-white">
                              <span className="text-violet-400">{activity.user}</span>
                              <span className="text-neutral-500"> {activity.action} </span>
                              <span>{activity.target}</span>
                            </div>
                            <div className="text-xs text-neutral-500">{activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
                      <Edit2 className="w-4 h-4" />
                      编辑项目
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors">
                      <Eye className="w-4 h-4" />
                      查看详情
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
