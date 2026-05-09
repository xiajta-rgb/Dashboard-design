import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Plus,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  TrendingUp,
  TrendingDown,
  Star,
  Edit2,
  Trash2,
  Eye,
  Download,
  ChevronDown
} from 'lucide-react'
import { Badge } from '../components/ui'

const customers = [
  {
    id: 1,
    name: '华为技术有限公司',
    contact: '张明',
    phone: '138****8888',
    email: 'zhangming@huawei.com',
    industry: '科技',
    status: 'active',
    level: 'A',
    value: 5000000,
    lastContact: '2026-05-08',
    growth: 25,
  },
  {
    id: 2,
    name: '腾讯科技（深圳）有限公司',
    contact: '李华',
    phone: '139****9999',
    email: 'lihua@tencent.com',
    industry: '互联网',
    status: 'active',
    level: 'A',
    value: 8000000,
    lastContact: '2026-05-07',
    growth: 18,
  },
  {
    id: 3,
    name: '阿里巴巴集团',
    contact: '王芳',
    phone: '137****7777',
    email: 'wangfang@alibaba.com',
    industry: '电商',
    status: 'inactive',
    level: 'B',
    value: 3000000,
    lastContact: '2026-04-20',
    growth: -5,
  },
  {
    id: 4,
    name: '字节跳动',
    contact: '刘洋',
    phone: '136****6666',
    email: 'liuyang@bytedance.com',
    industry: '科技',
    status: 'active',
    level: 'A',
    value: 6000000,
    lastContact: '2026-05-06',
    growth: 32,
  },
  {
    id: 5,
    name: '美团',
    contact: '陈静',
    phone: '135****5555',
    email: 'chenjing@meituan.com',
    industry: '本地生活',
    status: 'potential',
    level: 'C',
    value: 1500000,
    lastContact: '2026-05-01',
    growth: 10,
  },
]

const stats = [
  { label: '客户总数', value: '1,286', change: '+12%', trend: 'up' },
  { label: '活跃客户', value: '892', change: '+8%', trend: 'up' },
  { label: '客户价值', value: '¥2.8亿', change: '+15%', trend: 'up' },
  { label: '平均客单价', value: '¥21.8万', change: '-3%', trend: 'down' },
]

const levelColors = {
  A: 'from-amber-500 to-orange-500',
  B: 'from-blue-500 to-cyan-500',
  C: 'from-emerald-500 to-teal-500',
}

const statusConfig = {
  active: { label: '活跃', color: 'emerald' },
  inactive: { label: '不活跃', color: 'neutral' },
  potential: { label: '潜在', color: 'amber' },
}

export default function CustomerManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [filterIndustry, setFilterIndustry] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.includes(searchQuery) || c.contact.includes(searchQuery)
    const matchesIndustry = filterIndustry === 'all' || c.industry === filterIndustry
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus
    return matchesSearch && matchesIndustry && matchesStatus
  })

  const totalValue = filteredCustomers.reduce((sum, c) => sum + c.value, 0)

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">客户管理</h1>
              <p className="text-sm text-neutral-500 mt-1">管理和跟进您的企业客户</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <Download className="w-4 h-4" />
                导出
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
                <Plus className="w-4 h-4" />
                新建客户
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-neutral-900/50 rounded-2xl border border-white/5"
              >
                <p className="text-sm text-neutral-500 mb-2">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className={`text-sm flex items-center gap-1 ${
                    stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索客户名称或联系人..."
                  className="w-full pl-12 pr-4 py-3 bg-neutral-800/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500/50"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="px-4 py-3 bg-neutral-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500/50"
                >
                  <option value="all">全部行业</option>
                  <option value="科技">科技</option>
                  <option value="互联网">互联网</option>
                  <option value="电商">电商</option>
                  <option value="本地生活">本地生活</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-neutral-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500/50"
                >
                  <option value="all">全部状态</option>
                  <option value="active">活跃</option>
                  <option value="inactive">不活跃</option>
                  <option value="potential">潜在</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-4 px-4 text-xs font-medium text-neutral-500 uppercase">客户</th>
                    <th className="text-left py-4 px-4 text-xs font-medium text-neutral-500 uppercase">联系人</th>
                    <th className="text-left py-4 px-4 text-xs font-medium text-neutral-500 uppercase">行业</th>
                    <th className="text-left py-4 px-4 text-xs font-medium text-neutral-500 uppercase">等级</th>
                    <th className="text-left py-4 px-4 text-xs font-medium text-neutral-500 uppercase">客户价值</th>
                    <th className="text-left py-4 px-4 text-xs font-medium text-neutral-500 uppercase">增长</th>
                    <th className="text-left py-4 px-4 text-xs font-medium text-neutral-500 uppercase">最近联系</th>
                    <th className="text-left py-4 px-4 text-xs font-medium text-neutral-500 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <motion.tr
                      key={customer.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${levelColors[customer.level]} flex items-center justify-center text-white font-bold`}>
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{customer.name}</p>
                            <Badge 
                              variant={statusConfig[customer.status].color} 
                              size="sm"
                              className="mt-1"
                            >
                              {statusConfig[customer.status].label}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-white">{customer.contact}</p>
                        <p className="text-xs text-neutral-500">{customer.phone}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-neutral-800 rounded-lg text-xs text-neutral-400">
                          {customer.industry}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Star className={`w-4 h-4 ${
                            customer.level === 'A' ? 'text-amber-400 fill-amber-400' :
                            customer.level === 'B' ? 'text-blue-400 fill-blue-400' :
                            'text-emerald-400 fill-emerald-400'
                          }`} />
                          <span className="text-sm text-white">A级</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm font-medium text-white">¥{(customer.value / 10000).toFixed(0)}万</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`flex items-center gap-1 text-sm ${
                          customer.growth >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {customer.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {Math.abs(customer.growth)}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-neutral-400">{customer.lastContact}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-neutral-400" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4 text-neutral-400" />
                          </button>
                          <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
              <p className="text-sm text-neutral-500">
                共 {filteredCustomers.length} 条记录，总价值 ¥{(totalValue / 100000000).toFixed(2)}亿
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                  上一页
                </button>
                <button className="px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                  下一页
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}