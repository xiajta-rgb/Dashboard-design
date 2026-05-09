import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  Timer,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Coffee,
  Briefcase,
  Target,
  Award,
  TrendingUp as TrendingUpIcon,
  Clock3,
  CalendarDays,
  CalendarCheck,
  Home,
  Wrench,
  Code,
  Palette,
  FileText,
  Video,
  Phone,
  MessageSquare
} from 'lucide-react'

const weeklyData = [
  { day: '周一', hours: 8.5, normal: 8, overtime: 0.5 },
  { day: '周二', hours: 9.0, normal: 8, overtime: 1.0 },
  { day: '周三', hours: 7.5, normal: 8, overtime: 0 },
  { day: '周四', hours: 8.0, normal: 8, overtime: 0 },
  { day: '周五', hours: 9.5, normal: 8, overtime: 1.5 },
  { day: '周六', hours: 4.0, normal: 0, overtime: 4.0 },
  { day: '周日', hours: 0, normal: 0, overtime: 0 },
]

const projectDistribution = [
  { name: '智慧城市平台', hours: 120, percentage: 35, color: 'from-blue-500 to-cyan-500' },
  { name: '移动端APP', hours: 85, percentage: 25, color: 'from-purple-500 to-pink-500' },
  { name: '企业官网', hours: 60, percentage: 18, color: 'from-emerald-500 to-teal-500' },
  { name: 'AI客服系统', hours: 45, percentage: 13, color: 'from-amber-500 to-orange-500' },
  { name: '内部工具', hours: 32, percentage: 9, color: 'from-indigo-500 to-violet-500' },
]

const activityBreakdown = [
  { name: '开发工作', hours: 180, percentage: 52, icon: Code, color: 'text-blue-400' },
  { name: '设计工作', hours: 65, percentage: 19, icon: Palette, color: 'text-pink-400' },
  { name: '文档撰写', hours: 40, percentage: 12, icon: FileText, color: 'text-emerald-400' },
  { name: '会议讨论', hours: 30, percentage: 9, icon: Video, color: 'text-amber-400' },
  { name: '沟通协调', hours: 20, percentage: 6, icon: MessageSquare, color: 'text-violet-400' },
  { name: '其他', hours: 7, percentage: 2, icon: Coffee, color: 'text-neutral-400' },
]

const teamMembers = [
  {
    id: 1,
    name: '张明',
    avatar: '张',
    avatarColor: 'from-violet-500 to-purple-500',
    totalHours: 42,
    normalHours: 40,
    overtimeHours: 2,
    billableHours: 38,
    projects: ['智慧城市平台', '移动端APP'],
    dailyAverage: 8.4,
  },
  {
    id: 2,
    name: '李华',
    avatar: '李',
    avatarColor: 'from-blue-500 to-cyan-500',
    totalHours: 45,
    normalHours: 40,
    overtimeHours: 5,
    billableHours: 42,
    projects: ['智慧城市平台', 'AI客服系统'],
    dailyAverage: 9.0,
  },
  {
    id: 3,
    name: '王芳',
    avatar: '王',
    avatarColor: 'from-pink-500 to-rose-500',
    totalHours: 40,
    normalHours: 40,
    overtimeHours: 0,
    billableHours: 36,
    projects: ['企业官网', '移动端APP'],
    dailyAverage: 8.0,
  },
  {
    id: 4,
    name: '刘洋',
    avatar: '刘',
    avatarColor: 'from-emerald-500 to-teal-500',
    totalHours: 38,
    normalHours: 40,
    overtimeHours: 0,
    billableHours: 35,
    projects: ['智慧城市平台', '企业官网'],
    dailyAverage: 7.6,
  },
  {
    id: 5,
    name: '陈静',
    avatar: '陈',
    avatarColor: 'from-amber-500 to-orange-500',
    totalHours: 44,
    normalHours: 40,
    overtimeHours: 4,
    billableHours: 40,
    projects: ['移动端APP', '内部工具'],
    dailyAverage: 8.8,
  },
  {
    id: 6,
    name: '孙伟',
    avatar: '孙',
    avatarColor: 'from-cyan-500 to-blue-500',
    totalHours: 41,
    normalHours: 40,
    overtimeHours: 1,
    billableHours: 38,
    projects: ['企业官网', '移动端APP'],
    dailyAverage: 8.2,
  },
]

const stats = [
  { label: '本周总工时', value: '342h', change: '+12%', trend: 'up', icon: Clock },
  { label: '人均工时', value: '8.5h', change: '+0.5h', trend: 'up', icon: Users },
  { label: '加班总时', value: '28h', change: '-5%', trend: 'down', icon: AlertCircle },
  { label: '人均产值', value: '¥3.2万', change: '+8%', trend: 'up', icon: DollarSign },
]

const months = ['1月', '2月', '3月', '4月', '5月']
const monthlyHours = [156, 168, 162, 175, 180]

export default function WorkHoursStatsPage() {
  const [selectedMonth, setSelectedMonth] = useState('5月')
  const [selectedWeek, setSelectedWeek] = useState('本周')
  const [filterProject, setFilterProject] = useState('all')

  const maxHours = Math.max(...weeklyData.map(d => d.hours))
  const totalWeeklyHours = weeklyData.reduce((sum, d) => sum + d.hours, 0)
  const totalMonthlyHours = monthlyHours[monthlyHours.length - 1]

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">工时统计</h1>
              <p className="text-sm text-neutral-500 mt-1">追踪团队工时投入和工作效率</p>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <Download className="w-4 h-4" />
                导出报表
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">本周工时趋势</h3>
                  <p className="text-sm text-neutral-500">每日工时投入分布</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                    <span className="text-neutral-400">正常工时</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                    <span className="text-neutral-400">加班工时</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between gap-4 h-64">
                {weeklyData.map((day, index) => {
                  const normalHeight = (day.normal / maxHours) * 100
                  const overtimeHeight = (day.overtime / maxHours) * 100
                  const isWeekend = day.day === '周六' || day.day === '周日'
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full h-48 flex flex-col justify-end gap-1">
                        {day.hours > 0 && (
                          <>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${normalHeight}%` }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                              className="w-full bg-gradient-to-t from-violet-500 to-purple-500 rounded-t-lg"
                            />
                            {day.overtime > 0 && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${overtimeHeight}%` }}
                                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                                className="w-full bg-gradient-to-t from-amber-500 to-orange-500 rounded-t-lg"
                              />
                            )}
                          </>
                        )}
                        {day.hours === 0 && (
                          <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
                            休息
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-neutral-400">{day.day}</div>
                      <div className="text-xs text-white font-medium">{day.hours}h</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white">月度汇总</h3>
                <p className="text-sm text-neutral-500">{selectedMonth}工时统计</p>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-1">{totalMonthlyHours}h</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <TrendingUpIcon className="w-4 h-4" />
                    +12%
                  </span>
                  <span className="text-neutral-500">较上月</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-violet-400" />
                    <span className="text-sm text-neutral-400">正常工作</span>
                  </div>
                  <span className="text-white font-medium">160h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-neutral-400">加班</span>
                  </div>
                  <span className="text-white font-medium">20h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-neutral-400">人均</span>
                  </div>
                  <span className="text-white font-medium">180h</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">项目工时分布</h3>
                  <p className="text-sm text-neutral-500">各项目投入占比</p>
                </div>
              </div>
              <div className="space-y-4">
                {projectDistribution.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`} />
                        <span className="text-sm text-white">{project.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-400">{project.hours}h</span>
                        <span className="text-sm text-white font-medium w-12 text-right">{project.percentage}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                        className={`h-full bg-gradient-to-r ${project.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">活动类型分布</h3>
                  <p className="text-sm text-neutral-500">工作内容占比</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {activityBreakdown.map((activity, index) => {
                  const ActivityIcon = activity.icon
                  return (
                    <motion.div
                      key={activity.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-neutral-800/30 rounded-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <ActivityIcon className={`w-5 h-5 ${activity.color}`} />
                        <span className="text-sm text-white">{activity.name}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-white">{activity.hours}h</span>
                        <span className="text-sm text-neutral-500">{activity.percentage}%</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">团队成员工时</h3>
                  <p className="text-sm text-neutral-500">查看每位成员的工时投入</p>
                </div>
                <select
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value)}
                  className="px-4 py-2 bg-neutral-800 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm"
                >
                  <option value="all">全部项目</option>
                  {projectDistribution.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">成员</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">总工时</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">正常工时</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">加班工时</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">计费工时</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">日均</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">参与项目</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member, index) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-white font-medium`}>
                            {member.avatar}
                          </div>
                          <span className="text-white font-medium">{member.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-white font-medium">{member.totalHours}h</span>
                      </td>
                      <td className="p-4">
                        <span className="text-neutral-400">{member.normalHours}h</span>
                      </td>
                      <td className="p-4">
                        <span className={`${member.overtimeHours > 0 ? 'text-amber-400' : 'text-neutral-500'}`}>
                          {member.overtimeHours}h
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-emerald-400">{member.billableHours}h</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white">{member.dailyAverage}h</span>
                          {member.dailyAverage >= 8 && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {member.projects.map((project, i) => (
                            <span key={i} className="text-xs text-violet-400 bg-violet-500/10 px-2 py-1 rounded-full">
                              {project}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
