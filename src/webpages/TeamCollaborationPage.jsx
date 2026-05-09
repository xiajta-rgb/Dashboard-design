import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Calendar,
  Clock,
  MessageSquare,
  Users,
  UserPlus,
  Mail,
  Phone,
  Video,
  FileText,
  Send,
  Paperclip,
  Smile,
  ThumbsUp,
  Reply,
  Edit2,
  Trash2,
  Eye,
  Download,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Award,
  Briefcase,
  Star,
  Shield,
  Zap,
  Circle,
  AtSign,
  Hash,
  Bell,
  Settings,
  Search as SearchIcon,
  Filter as FilterIcon,
  UserCheck,
  UserX,
  Clock3,
  CalendarDays,
  CalendarCheck,
  ArrowRight,
  Code,
  Palette,
  Coffee
} from 'lucide-react'

const teamMembers = [
  {
    id: 1,
    name: '张明',
    avatar: '张',
    role: '项目经理',
    department: '产品部',
    email: 'zhangming@company.com',
    phone: '138****8888',
    status: 'online',
    avatarColor: 'from-violet-500 to-purple-500',
    skills: ['项目管理', 'Scrum', '沟通协调'],
    workload: 78,
    tasksCompleted: 24,
    tasksInProgress: 5,
    joinDate: '2024-03-15',
  },
  {
    id: 2,
    name: '李华',
    avatar: '李',
    role: '技术总监',
    department: '技术部',
    email: 'lihua@company.com',
    phone: '139****9999',
    status: 'online',
    avatarColor: 'from-blue-500 to-cyan-500',
    skills: ['架构设计', 'Java', '微服务'],
    workload: 85,
    tasksCompleted: 32,
    tasksInProgress: 8,
    joinDate: '2023-08-20',
  },
  {
    id: 3,
    name: '王芳',
    avatar: '王',
    role: 'UI设计师',
    department: '设计部',
    email: 'wangfang@company.com',
    phone: '137****7777',
    status: 'away',
    avatarColor: 'from-pink-500 to-rose-500',
    skills: ['UI设计', 'Figma', '动效设计'],
    workload: 65,
    tasksCompleted: 18,
    tasksInProgress: 3,
    joinDate: '2024-01-10',
  },
  {
    id: 4,
    name: '刘洋',
    avatar: '刘',
    role: '产品经理',
    department: '产品部',
    email: 'liuyang@company.com',
    phone: '136****6666',
    status: 'online',
    avatarColor: 'from-emerald-500 to-teal-500',
    skills: ['需求分析', '数据分析', '用户研究'],
    workload: 72,
    tasksCompleted: 21,
    tasksInProgress: 4,
    joinDate: '2024-02-28',
  },
  {
    id: 5,
    name: '陈静',
    avatar: '陈',
    role: 'iOS开发',
    department: '技术部',
    email: 'chenjing@company.com',
    phone: '135****5555',
    status: 'offline',
    avatarColor: 'from-amber-500 to-orange-500',
    skills: ['Swift', 'SwiftUI', 'iOS'],
    workload: 90,
    tasksCompleted: 28,
    tasksInProgress: 6,
    joinDate: '2023-11-05',
  },
  {
    id: 6,
    name: '赵强',
    avatar: '赵',
    role: '后端开发',
    department: '技术部',
    email: 'zhaoqiang@company.com',
    phone: '134****4444',
    status: 'online',
    avatarColor: 'from-indigo-500 to-violet-500',
    skills: ['Python', 'Django', 'PostgreSQL'],
    workload: 68,
    tasksCompleted: 25,
    tasksInProgress: 4,
    joinDate: '2024-04-12',
  },
  {
    id: 7,
    name: '孙伟',
    avatar: '孙',
    role: '前端开发',
    department: '技术部',
    email: 'sunwei@company.com',
    phone: '133****3333',
    status: 'online',
    avatarColor: 'from-cyan-500 to-blue-500',
    skills: ['React', 'TypeScript', 'Tailwind'],
    workload: 75,
    tasksCompleted: 22,
    tasksInProgress: 5,
    joinDate: '2024-01-22',
  },
  {
    id: 8,
    name: '周琳',
    avatar: '周',
    role: '内容运营',
    department: '运营部',
    email: 'zhoulin@company.com',
    phone: '132****2222',
    status: 'away',
    avatarColor: 'from-rose-500 to-pink-500',
    skills: ['内容创作', '文案撰写', '社交媒体'],
    workload: 55,
    tasksCompleted: 16,
    tasksInProgress: 2,
    joinDate: '2024-05-08',
  },
]

const departments = [
  { name: '产品部', count: 4, color: 'from-violet-500 to-purple-500' },
  { name: '技术部', count: 6, color: 'from-blue-500 to-cyan-500' },
  { name: '设计部', count: 3, color: 'from-pink-500 to-rose-500' },
  { name: '运营部', count: 2, color: 'from-emerald-500 to-teal-500' },
]

const channels = [
  { id: 1, name: 'general', description: '公共频道', unread: 0, members: 15, icon: Hash },
  { id: 2, name: 'development', description: '技术开发讨论', unread: 3, members: 8, icon: Code },
  { id: 3, name: 'design', description: '设计交流', unread: 0, members: 5, icon: Palette },
  { id: 4, name: 'product', description: '产品需求', unread: 12, members: 6, icon: Briefcase },
  { id: 5, name: 'random', description: '随便聊聊', unread: 0, members: 15, icon: Coffee },
  { id: 6, name: 'announcements', description: '公告频道', unread: 1, members: 15, icon: Bell },
]

const messages = [
  {
    id: 1,
    user: '李华',
    avatar: '李',
    avatarColor: 'from-blue-500 to-cyan-500',
    content: '各位早上好！今天的站会将在9:30开始，请大家准时参加。',
    time: '09:00',
    reactions: [{ emoji: '👍', count: 5 }],
  },
  {
    id: 2,
    user: '王芳',
    avatar: '王',
    avatarColor: 'from-pink-500 to-rose-500',
    content: '好的，收到！我已经把今天的设计进度更新到飞书文档了，大家可以先看一下。',
    time: '09:05',
    reactions: [],
  },
  {
    id: 3,
    user: '张明',
    avatar: '张',
    avatarColor: 'from-violet-500 to-purple-500',
    content: '@王芳 谢谢芳姐！刘洋，智慧城市项目的UI评审定在下午2点，麻烦确认一下时间是否OK？',
    time: '09:12',
    reactions: [{ emoji: '👌', count: 2 }],
    mentions: ['王芳', '刘洋'],
  },
  {
    id: 4,
    user: '刘洋',
    avatar: '刘',
    avatarColor: 'from-emerald-500 to-teal-500',
    content: '没问题，下午2点可以！对了，关于数据可视化模块的交互方案，我有一些想法想和大家讨论一下。',
    time: '09:15',
    reactions: [],
  },
  {
    id: 5,
    user: '陈静',
    avatar: '陈',
    avatarColor: 'from-amber-500 to-orange-500',
    content: '我也有类似的想法，感觉可以借鉴一下苹果的Dashboard设计语言，你们觉得呢？',
    time: '09:20',
    reactions: [{ emoji: '💡', count: 3 }],
  },
  {
    id: 6,
    user: '孙伟',
    avatar: '孙',
    avatarColor: 'from-cyan-500 to-blue-500',
    content: '同意！我先在设计稿上加一些动效demo，下午评审的时候一起看。',
    time: '09:25',
    reactions: [{ emoji: '👍', count: 4 }],
  },
]

const stats = [
  { label: '团队总人数', value: '15', change: '+2', trend: 'up', icon: Users },
  { label: '在线人数', value: '8', change: '+1', trend: 'up', icon: UserCheck },
  { label: '进行中任务', value: '42', change: '+5', trend: 'up', icon: Clock3 },
  { label: '本月完成', value: '68', change: '+12', trend: 'up', icon: CheckCircle2 },
]

const statusConfig = {
  online: { label: '在线', color: 'bg-emerald-500' },
  away: { label: '离开', color: 'bg-amber-500' },
  offline: { label: '离线', color: 'bg-neutral-500' },
}

export default function TeamCollaborationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [messageInput, setMessageInput] = useState('')
  const [viewMode, setViewMode] = useState('members')

  const filteredMembers = teamMembers.filter(m => {
    const matchesSearch = m.name.includes(searchQuery) || m.role.includes(searchQuery) || m.skills.some(s => s.includes(searchQuery))
    const matchesDepartment = filterDepartment === 'all' || m.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('')
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <div className="hero-gradient flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">团队协作</h1>
              <p className="text-sm text-neutral-500 mt-1">高效管理团队成员和沟通协作</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <UserPlus className="w-4 h-4" />
                邀请成员
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
                <Plus className="w-4 h-4" />
                创建群组
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

          <div className="flex-1 flex gap-6 min-h-0">
            <div className="w-80 flex-shrink-0 flex flex-col bg-neutral-900/50 rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setViewMode('members')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      viewMode === 'members' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:bg-neutral-800'
                    }`}
                  >
                    成员
                  </button>
                  <button
                    onClick={() => setViewMode('channels')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      viewMode === 'channels' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:bg-neutral-800'
                    }`}
                  >
                    频道
                  </button>
                </div>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    placeholder={viewMode === 'members' ? '搜索成员...' : '搜索频道...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-neutral-800/50 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {viewMode === 'members' && (
                  <>
                    <div className="mb-4 p-3 bg-neutral-800/30 rounded-xl">
                      <div className="text-xs text-neutral-500 mb-2">部门分布</div>
                      <div className="space-y-2">
                        {departments.map((dept) => (
                          <button
                            key={dept.name}
                            onClick={() => setFilterDepartment(dept.name)}
                            className={`w-full flex items-center justify-between p-2 rounded-lg transition-all ${
                              filterDepartment === dept.name ? 'bg-violet-500/20 text-violet-400' : 'hover:bg-neutral-800/50 text-neutral-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${dept.color}`} />
                              <span className="text-sm">{dept.name}</span>
                            </div>
                            <span className="text-xs text-neutral-500">{dept.count}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {filteredMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800/50 transition-all cursor-pointer"
                        >
                          <div className="relative">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-white font-medium`}>
                              {member.avatar}
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-neutral-900 ${statusConfig[member.status].color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white font-medium">{member.name}</div>
                            <div className="text-xs text-neutral-500 truncate">{member.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {viewMode === 'channels' && (
                  <div className="space-y-1">
                    {channels.map((channel) => {
                      const ChannelIcon = channel.icon
                      return (
                        <button
                          key={channel.id}
                          onClick={() => setSelectedChannel(channel)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                            selectedChannel?.id === channel.id ? 'bg-violet-500/20 border border-violet-500/30' : 'hover:bg-neutral-800/50 border border-transparent'
                          }`}
                        >
                          <ChannelIcon className="w-5 h-5 text-neutral-500" />
                          <div className="flex-1 text-left">
                            <div className="text-sm text-white font-medium">#{channel.name}</div>
                            <div className="text-xs text-neutral-500">{channel.members} 成员</div>
                          </div>
                          {channel.unread > 0 && (
                            <div className="px-2 py-0.5 bg-violet-500 rounded-full text-xs text-white font-medium">
                              {channel.unread}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col bg-neutral-900/50 rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-neutral-500" />
                  <div>
                    <h3 className="text-white font-medium">#{selectedChannel?.name}</h3>
                    <p className="text-xs text-neutral-500">{selectedChannel?.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${message.avatarColor} flex items-center justify-center text-white font-medium flex-shrink-0`}>
                      {message.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{message.user}</span>
                        <span className="text-xs text-neutral-500">{message.time}</span>
                      </div>
                      <p className="text-neutral-300 text-sm leading-relaxed">{message.content}</p>
                      {message.reactions.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          {message.reactions.map((reaction, i) => (
                            <div key={i} className="flex items-center gap-1 px-2 py-1 bg-neutral-800/50 rounded-full text-xs">
                              <span>{reaction.emoji}</span>
                              <span className="text-neutral-400">{reaction.count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <button className="text-xs text-neutral-500 hover:text-violet-400 transition-colors flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          点赞
                        </button>
                        <button className="text-xs text-neutral-500 hover:text-violet-400 transition-colors flex items-center gap-1">
                          <Reply className="w-3 h-3" />
                          回复
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex items-end gap-3">
                  <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="输入消息..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                  </div>
                  <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-80 flex-shrink-0 bg-neutral-900/50 rounded-2xl border border-white/10 overflow-hidden p-4">
              <h3 className="text-white font-medium mb-4">成员详情</h3>
              <div className="space-y-4">
                {filteredMembers.slice(0, 4).map((member) => (
                  <div key={member.id} className="p-4 bg-neutral-800/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-white font-medium`}>
                          {member.avatar}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-neutral-900 ${statusConfig[member.status].color}`} />
                      </div>
                      <div>
                        <div className="text-white font-medium">{member.name}</div>
                        <div className="text-xs text-neutral-500">{member.role}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">工作负载</span>
                        <span className="text-white">{member.workload}%</span>
                      </div>
                      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            member.workload >= 90 ? 'bg-red-500' :
                            member.workload >= 70 ? 'bg-amber-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${member.workload}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs">
                      <div className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        {member.tasksCompleted} 已完成
                      </div>
                      <div className="flex items-center gap-1 text-blue-400">
                        <Clock3 className="w-3 h-3" />
                        {member.tasksInProgress} 进行中
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
