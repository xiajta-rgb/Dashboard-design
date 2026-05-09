import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Calendar,
  Tag,
  User,
  Star,
  Edit2,
  Trash2,
  Eye,
  Download,
  ChevronDown,
  List,
  LayoutGrid,
  BarChart3,
  FolderKanban,
  Timer,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  Flag,
  Repeat
} from 'lucide-react'
import { Badge } from '../components/ui'

const tasks = [
  {
    id: 1,
    title: '完成产品需求文档 PRD v2.0',
    project: '产品设计',
    assignee: '张明',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-05-15',
    estimated: 16,
    progress: 65,
    tags: ['文档', '重要'],
  },
  {
    id: 2,
    title: '用户调研报告数据分析',
    project: '用户研究',
    assignee: '李华',
    priority: 'medium',
    status: 'todo',
    dueDate: '2026-05-18',
    estimated: 8,
    progress: 0,
    tags: ['分析'],
  },
  {
    id: 3,
    title: '移动端组件库开发',
    project: '前端开发',
    assignee: '王芳',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-05-20',
    estimated: 40,
    progress: 45,
    tags: ['开发', '组件'],
  },
  {
    id: 4,
    title: 'Q2季度销售目标制定',
    project: '销售部',
    assignee: '刘洋',
    priority: 'urgent',
    status: 'todo',
    dueDate: '2026-05-12',
    estimated: 4,
    progress: 0,
    tags: ['规划'],
  },
  {
    id: 5,
    title: '客户反馈系统优化',
    project: '产品设计',
    assignee: '张明',
    priority: 'medium',
    status: 'done',
    dueDate: '2026-05-10',
    estimated: 12,
    progress: 100,
    tags: ['优化', '反馈'],
  },
  {
    id: 6,
    title: '竞品分析报告',
    project: '市场部',
    assignee: '陈静',
    priority: 'low',
    status: 'review',
    dueDate: '2026-05-14',
    estimated: 6,
    progress: 80,
    tags: ['分析', '竞品'],
  },
  {
    id: 7,
    title: '数据库性能优化',
    project: '后端开发',
    assignee: '赵强',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-05-16',
    estimated: 20,
    progress: 30,
    tags: ['开发', '性能'],
  },
  {
    id: 8,
    title: '新版官网 UI 设计',
    project: '设计部',
    assignee: '王芳',
    priority: 'medium',
    status: 'todo',
    dueDate: '2026-05-25',
    estimated: 32,
    progress: 0,
    tags: ['设计', '官网'],
  },
]

const projects = [
  { name: '产品设计', tasks: 24, completed: 18, color: 'from-violet-500 to-purple-500' },
  { name: '前端开发', tasks: 18, completed: 12, color: 'from-blue-500 to-cyan-500' },
  { name: '后端开发', tasks: 15, completed: 8, color: 'from-emerald-500 to-teal-500' },
  { name: '市场部', tasks: 12, completed: 5, color: 'from-amber-500 to-orange-500' },
  { name: '销售部', tasks: 8, completed: 6, color: 'from-pink-500 to-rose-500' },
]

const stats = [
  { label: '总任务数', value: '128', change: '+12%', trend: 'up', icon: List },
  { label: '进行中', value: '24', change: '+3', trend: 'up', icon: Clock },
  { label: '待办', value: '48', change: '+8', trend: 'up', icon: Circle },
  { label: '已完成', value: '56', change: '+5', trend: 'up', icon: CheckCircle2 },
]

const priorityConfig = {
  urgent: { label: '紧急', color: 'bg-red-500', textColor: 'text-red-400', borderColor: 'border-red-500/30' },
  high: { label: '高', color: 'bg-orange-500', textColor: 'text-orange-400', borderColor: 'border-orange-500/30' },
  medium: { label: '中', color: 'bg-amber-500', textColor: 'text-amber-400', borderColor: 'border-amber-500/30' },
  low: { label: '低', color: 'bg-emerald-500', textColor: 'text-emerald-400', borderColor: 'border-emerald-500/30' },
}

const statusConfig = {
  todo: { label: '待办', icon: Circle, color: 'text-neutral-400' },
  'in-progress': { label: '进行中', icon: Clock, color: 'text-blue-400' },
  review: { label: '审核中', icon: Eye, color: 'text-amber-400' },
  done: { label: '已完成', icon: CheckCircle2, color: 'text-emerald-400' },
}

const kanbanColumns = [
  { id: 'todo', title: '待办', color: 'neutral' },
  { id: 'in-progress', title: '进行中', color: 'blue' },
  { id: 'review', title: '审核中', color: 'amber' },
  { id: 'done', title: '已完成', color: 'emerald' },
]

export default function TaskManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterProject, setFilterProject] = useState('all')
  const [viewMode, setViewMode] = useState('list')
  const [selectedTask, setSelectedTask] = useState(null)

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.includes(searchQuery) || t.project.includes(searchQuery) || t.assignee.includes(searchQuery)
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus
    const matchesProject = filterProject === 'all' || t.project === filterProject
    return matchesSearch && matchesPriority && matchesStatus && matchesProject
  })

  const todoTasks = filteredTasks.filter(t => t.status === 'todo')
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress')
  const reviewTasks = filteredTasks.filter(t => t.status === 'review')
  const doneTasks = filteredTasks.filter(t => t.status === 'done')

  const getPriorityConfig = (priority) => priorityConfig[priority] || priorityConfig.medium
  const getStatusConfig = (status) => statusConfig[status] || statusConfig.todo

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">任务管理</h1>
              <p className="text-sm text-neutral-500 mt-1">高效管理团队任务和项目进度</p>
            </div>
            <div className="flex gap-3">
              <div className="flex bg-neutral-800 rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'timeline' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'}`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <Download className="w-4 h-4" />
                导出
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
                <Plus className="w-4 h-4" />
                新建任务
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
                  placeholder="搜索任务、项目或负责人..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="all">全部优先级</option>
                  <option value="urgent">紧急</option>
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="all">全部状态</option>
                  <option value="todo">待办</option>
                  <option value="in-progress">进行中</option>
                  <option value="review">审核中</option>
                  <option value="done">已完成</option>
                </select>
                <select
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value)}
                  className="px-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="all">全部项目</option>
                  {projects.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-6 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 text-sm">
                <FolderKanban className="w-4 h-4 text-violet-400" />
                <span className="text-neutral-400">项目</span>
              </div>
              {projects.map((project) => (
                <div key={project.name} className="flex items-center gap-3 bg-neutral-900/30 rounded-xl px-4 py-2 border border-white/5 min-w-fit">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`} />
                  <span className="text-sm text-white whitespace-nowrap">{project.name}</span>
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <span>{project.completed}/{project.tasks}</span>
                  </div>
                  <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${project.color} rounded-full`}
                      style={{ width: `${(project.completed / project.tasks) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {viewMode === 'list' && (
            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">任务名称</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">优先级</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">状态</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">负责人</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">截止日期</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">预计</th>
                      <th className="text-left p-4 text-sm font-medium text-neutral-400">进度</th>
                      <th className="text-right p-4 text-sm font-medium text-neutral-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task, index) => {
                      const priority = getPriorityConfig(task.priority)
                      const status = getStatusConfig(task.status)
                      const StatusIcon = status.icon
                      return (
                        <motion.tr
                          key={task.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                          onClick={() => setSelectedTask(task)}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <StatusIcon className={`w-5 h-5 ${status.color}`} />
                              <div>
                                <div className="text-white font-medium">{task.title}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">{task.project}</span>
                                  {task.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-xs text-neutral-500">{tag}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${priority.borderColor} ${priority.textColor} bg-current/5 text-xs font-medium`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${priority.color}`} />
                              {priority.label}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 text-sm ${status.color}`}>
                              <StatusIcon className="w-4 h-4" />
                              {status.label}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                                {task.assignee[0]}
                              </div>
                              <span className="text-sm text-white">{task.assignee}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-sm text-neutral-400">
                              <Calendar className="w-4 h-4" />
                              {task.dueDate}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-sm text-neutral-400">
                              <Timer className="w-4 h-4" />
                              {task.estimated}h
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden max-w-[100px]">
                                <div 
                                  className={`h-full rounded-full transition-all ${
                                    task.progress === 100 
                                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                                      : 'bg-gradient-to-r from-violet-500 to-purple-500'
                                  }`}
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                              <span className="text-sm text-neutral-400">{task.progress}%</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {kanbanColumns.map((column) => {
                const columnTasks = filteredTasks.filter(t => t.status === column.id)
                return (
                  <div key={column.id} className="bg-neutral-900/30 rounded-2xl border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-${
                          column.color === 'neutral' ? 'neutral' :
                          column.color === 'blue' ? 'blue' :
                          column.color === 'amber' ? 'amber' :
                          column.color === 'emerald' ? 'emerald' : 'neutral'
                        }-400`} />
                        <h3 className="text-sm font-medium text-white">{column.title}</h3>
                        <span className="text-xs text-neutral-500">({columnTasks.length})</span>
                      </div>
                      <button className="p-1 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded transition-all">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {columnTasks.map((task) => {
                        const priority = getPriorityConfig(task.priority)
                        return (
                          <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-neutral-900/70 rounded-xl border border-white/10 p-4 hover:border-violet-500/30 transition-all cursor-pointer group"
                            onClick={() => setSelectedTask(task)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border ${priority.borderColor} ${priority.textColor} text-xs font-medium`}>
                                <Flag className="w-3 h-3" />
                                {priority.label}
                              </div>
                              <button className="p-1 text-neutral-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                            <h4 className="text-sm font-medium text-white mb-2 line-clamp-2">{task.title}</h4>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">{task.project}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                                  {task.assignee[0]}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-neutral-500">
                                  <Calendar className="w-3 h-3" />
                                  {task.dueDate.slice(5)}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Timer className="w-3 h-3 text-neutral-500" />
                                <span className="text-xs text-neutral-500">{task.estimated}h</span>
                              </div>
                            </div>
                            <div className="mt-3 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  task.progress === 100 
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                                    : 'bg-gradient-to-r from-violet-500 to-purple-500'
                                }`}
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {viewMode === 'timeline' && (
            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">项目时间线</h3>
                <p className="text-sm text-neutral-500">查看所有任务的时间分布和进度</p>
              </div>
              <div className="space-y-4">
                {filteredTasks.map((task, index) => {
                  const priority = getPriorityConfig(task.priority)
                  const status = getStatusConfig(task.status)
                  const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 bg-neutral-900/30 rounded-xl border border-white/5 hover:border-violet-500/20 transition-all"
                    >
                      <div className="flex items-center gap-3 w-64">
                        <div className={`w-2 h-2 rounded-full ${priority.color}`} />
                        <span className="text-sm text-white truncate">{task.title}</span>
                      </div>
                      <div className="flex-1 relative h-8 bg-neutral-800/50 rounded-lg overflow-hidden">
                        <div 
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${
                            task.status === 'done' 
                              ? 'from-emerald-500/20 to-emerald-500/40' 
                              : 'from-violet-500/20 to-violet-500/40'
                          } rounded-lg`}
                          style={{ width: `${task.progress}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white font-medium">{task.progress}%</span>
                        </div>
                      </div>
                      <div className="w-32 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs ${
                          daysUntilDue < 0 ? 'text-red-400' :
                          daysUntilDue <= 3 ? 'text-amber-400' :
                          'text-neutral-400'
                        }`}>
                          <Calendar className="w-3 h-3" />
                          {task.dueDate}
                        </span>
                      </div>
                      <div className="w-24 flex items-center justify-end gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                          {task.assignee[0]}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {selectedTask && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTask(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-neutral-900 rounded-2xl border border-white/10 max-w-2xl w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">{selectedTask.project}</span>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-medium ${
                        getPriorityConfig(selectedTask.priority).borderColor
                      } ${getPriorityConfig(selectedTask.priority).textColor}`}>
                        <Flag className="w-3 h-3" />
                        {getPriorityConfig(selectedTask.priority).label}优先级
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{selectedTask.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-neutral-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-violet-400" />
                      <span className="text-xs text-neutral-400">负责人</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                        {selectedTask.assignee[0]}
                      </div>
                      <span className="text-white font-medium">{selectedTask.assignee}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-violet-400" />
                      <span className="text-xs text-neutral-400">截止日期</span>
                    </div>
                    <span className="text-white font-medium">{selectedTask.dueDate}</span>
                  </div>
                  <div className="p-4 bg-neutral-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Timer className="w-4 h-4 text-violet-400" />
                      <span className="text-xs text-neutral-400">预计工时</span>
                    </div>
                    <span className="text-white font-medium">{selectedTask.estimated} 小时</span>
                  </div>
                  <div className="p-4 bg-neutral-800/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-violet-400" />
                      <span className="text-xs text-neutral-400">当前进度</span>
                    </div>
                    <span className="text-white font-medium">{selectedTask.progress}%</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-white mb-3">任务标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-800/50 rounded-full text-sm text-neutral-300"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-white mb-3">进度详情</h3>
                  <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        selectedTask.progress === 100 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500' 
                          : 'bg-gradient-to-r from-violet-500 to-purple-500'
                      }`}
                      style={{ width: `${selectedTask.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-neutral-500">0%</span>
                    <span className="text-xs text-white font-medium">{selectedTask.progress}%</span>
                    <span className="text-xs text-neutral-500">100%</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
                    <Edit2 className="w-4 h-4" />
                    编辑任务
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                    完成
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
