import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Filter,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Settings,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  UserPlus,
  Link2,
  GitBranch,
  Circle,
  Square,
  Hexagon,
  Database,
  Server,
  Globe,
  Laptop,
  Smartphone,
  Cloud,
  Lock,
  Shield,
  AlertCircle,
  CheckCircle2,
  Pause,
  Play,
  Eye,
  Edit2,
  Trash2,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Move
} from 'lucide-react'

const nodeTypes = {
  person: { icon: Users, color: 'from-blue-500 to-cyan-500', label: '人员' },
  department: { icon: Database, color: 'from-purple-500 to-pink-500', label: '部门' },
  project: { icon: Server, color: 'from-emerald-500 to-teal-500', label: '项目' },
  system: { icon: Globe, color: 'from-amber-500 to-orange-500', label: '系统' },
  device: { icon: Laptop, color: 'from-indigo-500 to-violet-500', label: '设备' },
  cloud: { icon: Cloud, color: 'from-rose-500 to-pink-500', label: '云服务' },
}

const nodes = [
  { id: 1, name: '张明', type: 'person', role: '项目经理', status: 'active', x: 50, y: 30 },
  { id: 2, name: '李华', type: 'person', role: '技术总监', status: 'active', x: 30, y: 50 },
  { id: 3, name: '王芳', type: 'person', role: 'UI设计师', status: 'active', x: 70, y: 50 },
  { id: 4, name: '产品部', type: 'department', status: 'active', x: 50, y: 45 },
  { id: 5, name: '技术部', type: 'department', status: 'active', x: 30, y: 70 },
  { id: 6, name: '设计部', type: 'department', status: 'active', x: 70, y: 70 },
  { id: 7, name: '智慧城市项目', type: 'project', status: 'active', x: 50, y: 60 },
  { id: 8, name: '移动端APP', type: 'project', status: 'active', x: 75, y: 40 },
  { id: 9, name: '后台管理系统', type: 'project', status: 'review', x: 25, y: 40 },
  { id: 10, name: 'MySQL数据库', type: 'system', status: 'active', x: 20, y: 85 },
  { id: 11, name: 'Redis缓存', type: 'system', status: 'active', x: 35, y: 85 },
  { id: 12, name: '文件存储服务', type: 'cloud', status: 'active', x: 50, y: 80 },
  { id: 13, name: 'API网关', type: 'system', status: 'active', x: 65, y: 85 },
  { id: 14, name: '消息队列', type: 'system', status: 'active', x: 80, y: 85 },
]

const connections = [
  { source: 1, target: 4, type: 'manages', label: '管理' },
  { source: 2, target: 4, type: 'member', label: '成员' },
  { source: 3, target: 4, type: 'member', label: '成员' },
  { source: 1, target: 5, type: 'coordinates', label: '协调' },
  { source: 2, target: 5, type: 'leads', label: '领导' },
  { source: 3, target: 6, type: 'leads', label: '领导' },
  { source: 7, target: 4, type: 'belongs', label: '所属' },
  { source: 7, target: 5, type: 'belongs', label: '所属' },
  { source: 8, target: 6, type: 'belongs', label: '所属' },
  { source: 9, target: 5, type: 'belongs', label: '所属' },
  { source: 7, target: 10, type: 'uses', label: '使用' },
  { source: 7, target: 11, type: 'uses', label: '使用' },
  { source: 7, target: 12, type: 'uses', label: '使用' },
  { source: 7, target: 13, type: 'connects', label: '连接' },
  { source: 8, target: 13, type: 'connects', label: '连接' },
  { source: 9, target: 13, type: 'connects', label: '连接' },
  { source: 8, target: 14, type: 'uses', label: '使用' },
  { source: 9, target: 10, type: 'uses', label: '使用' },
  { source: 1, target: 7, type: 'manages', label: '负责' },
  { source: 2, target: 7, type: 'technicalLead', label: '技术负责' },
]

const connectionTypes = [
  { type: 'manages', label: '管理', color: '#6366f1', style: 'solid' },
  { type: 'member', label: '成员', color: '#8b5cf6', style: 'solid' },
  { type: 'leads', label: '领导', color: '#ec4899', style: 'solid' },
  { type: 'uses', label: '使用', color: '#10b981', style: 'dashed' },
  { type: 'connects', label: '连接', color: '#06b6d4', style: 'dashed' },
  { type: 'coordinates', label: '协调', color: '#f59e0b', style: 'dotted' },
]

const stats = [
  { label: '总节点数', value: '14', change: '+2', trend: 'up', icon: Circle },
  { label: '关联关系', value: '20', change: '+5', trend: 'up', icon: Link2 },
  { label: '活跃状态', value: '12', change: '+1', trend: 'up', icon: CheckCircle2 },
  { label: '待审核', value: '1', change: '0', trend: 'neutral', icon: AlertCircle },
]

export default function RelationshipGraphPage() {
  const [selectedNode, setSelectedNode] = useState(null)
  const [hoveredConnection, setHoveredConnection] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showLabels, setShowLabels] = useState(true)
  const [layoutMode, setLayoutMode] = useState('force')
  const [zoom, setZoom] = useState(1)
  const [selectedNodeTypes, setSelectedNodeTypes] = useState(Object.keys(nodeTypes))
  const [selectedConnectionTypes, setSelectedConnectionTypes] = useState(connectionTypes.map(c => c.type))

  const filteredNodes = nodes.filter(node => 
    node.name.includes(searchQuery) && selectedNodeTypes.includes(node.type)
  )

  const filteredConnections = connections.filter(conn =>
    selectedConnectionTypes.includes(conn.type) &&
    filteredNodes.some(n => n.id === conn.source) &&
    filteredNodes.some(n => n.id === conn.target)
  )

  const getNodeConfig = (type) => nodeTypes[type] || nodeTypes.person
  const getConnectionConfig = (type) => connectionTypes.find(c => c.type === type) || connectionTypes[0]

  const getNodePosition = (node) => {
    return {
      x: `${node.x}%`,
      y: `${node.y}%`,
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">关系图谱</h1>
              <p className="text-sm text-neutral-500 mt-1">可视化组织架构和系统依赖关系</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-neutral-800 rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => setLayoutMode('force')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    layoutMode === 'force' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  力导向
                </button>
                <button
                  onClick={() => setLayoutMode('hierarchical')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    layoutMode === 'hierarchical' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  层级
                </button>
                <button
                  onClick={() => setLayoutMode('radial')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    layoutMode === 'radial' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  放射
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <Download className="w-4 h-4" />
                导出
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
                  <span className={`flex items-center gap-1 text-xs ${
                    stat.trend === 'up' ? 'text-emerald-400' : 
                    stat.trend === 'down' ? 'text-red-400' : 'text-neutral-400'
                  }`}>
                    {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                    {stat.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="搜索节点..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-neutral-800/50 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 w-64"
                    />
                  </div>
                  <button
                    onClick={() => setShowLabels(!showLabels)}
                    className={`p-2 rounded-lg transition-all ${
                      showLabels ? 'bg-violet-500/20 text-violet-400' : 'text-neutral-500 hover:bg-neutral-800'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-neutral-400 w-16 text-center">{Math.round(zoom * 100)}%</span>
                  <button
                    onClick={() => setZoom(Math.min(2, zoom + 0.2))}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all ml-2">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative p-4" style={{ height: '550px' }}>
                <div 
                  className="relative w-full h-full bg-gradient-to-br from-neutral-800/20 to-neutral-900/20 rounded-xl border border-white/5"
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                >
                  <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                    {filteredConnections.map((conn, index) => {
                      const sourceNode = nodes.find(n => n.id === conn.source)
                      const targetNode = nodes.find(n => n.id === conn.target)
                      if (!sourceNode || !targetNode) return null
                      
                      const config = getConnectionConfig(conn.type)
                      const isHovered = hoveredConnection === `${conn.source}-${conn.target}`
                      
                      return (
                        <g key={`${conn.source}-${conn.target}-${index}`}>
                          <motion.line
                            x1={`${sourceNode.x}%`}
                            y1={`${sourceNode.y}%`}
                            x2={`${targetNode.x}%`}
                            y2={`${targetNode.y}%`}
                            stroke={isHovered ? config.color : config.color + '60'}
                            strokeWidth={isHovered ? 3 : 1.5}
                            strokeDasharray={config.style === 'dashed' ? '8,4' : config.style === 'dotted' ? '2,2' : '0'}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: index * 0.05 }}
                            onMouseEnter={() => setHoveredConnection(`${conn.source}-${conn.target}`)}
                            onMouseLeave={() => setHoveredConnection(null)}
                            style={{ cursor: 'pointer' }}
                          />
                          {showLabels && (
                            <text
                              x={`${(sourceNode.x + targetNode.x) / 2}%`}
                              y={`${(sourceNode.y + targetNode.y) / 2}%`}
                              fill={config.color}
                              fontSize="10"
                              textAnchor="middle"
                              className="pointer-events-none"
                            >
                              {conn.label}
                            </text>
                          )}
                        </g>
                      )
                    })}
                  </svg>

                  {filteredNodes.map((node, index) => {
                    const config = getNodeConfig(node.type)
                    const NodeIcon = config.icon
                    const isSelected = selectedNode?.id === node.id
                    
                    return (
                      <motion.div
                        key={node.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05, type: 'spring' }}
                        className="absolute cursor-pointer group"
                        style={{ 
                          left: `${node.x}%`, 
                          top: `${node.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => setSelectedNode(isSelected ? null : node)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className={`relative transition-all duration-300 ${
                            isSelected ? 'scale-110' : ''
                          }`}
                        >
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg ${isSelected ? 'ring-4 ring-violet-500' : ''}`}>
                            <NodeIcon className="w-7 h-7 text-white" />
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                            node.status === 'active' ? 'bg-emerald-500' :
                            node.status === 'review' ? 'bg-amber-500' :
                            'bg-neutral-500'
                          }`}>
                            {node.status === 'active' && <CheckCircle2 className="w-3 h-3 text-white" />}
                            {node.status === 'review' && <Pause className="w-3 h-3 text-white" />}
                          </div>
                          {showLabels && (
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap transition-all duration-300 ${
                              isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            }`}>
                              <div className="bg-neutral-900/90 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
                                <div className="text-sm font-medium text-white">{node.name}</div>
                                <div className="text-xs text-neutral-400">{node.role || config.label}</div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="absolute bottom-4 left-4 bg-neutral-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-neutral-400">连线样式：</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-0.5 bg-violet-400" />
                        <span className="text-neutral-400">实线</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-0.5 bg-emerald-400" style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, currentColor 50%)', backgroundSize: '8px 2px' }} />
                        <span className="text-neutral-400">虚线</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-0.5 bg-amber-400" style={{ backgroundImage: 'linear-gradient(90deg, currentColor 25%, transparent 25%, transparent 50%, currentColor 50%, currentColor 75%, transparent 75%)', backgroundSize: '4px 2px' }} />
                        <span className="text-neutral-400">点线</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">节点类型</h3>
                <div className="space-y-2">
                  {Object.entries(nodeTypes).map(([type, config]) => {
                    const NodeIcon = config.icon
                    const isSelected = selectedNodeTypes.includes(type)
                    return (
                      <button
                        key={type}
                        onClick={() => {
                          if (isSelected) {
                            if (selectedNodeTypes.length > 1) {
                              setSelectedNodeTypes(selectedNodeTypes.filter(t => t !== type))
                            }
                          } else {
                            setSelectedNodeTypes([...selectedNodeTypes, type])
                          }
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                          isSelected ? 'bg-violet-500/20 border border-violet-500/30' : 'bg-neutral-800/30 hover:bg-neutral-800/50 border border-transparent'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                          <NodeIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-white flex-1 text-left">{config.label}</span>
                        <span className="text-xs text-neutral-500">
                          {nodes.filter(n => n.type === type).length}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">关系类型</h3>
                <div className="space-y-2">
                  {connectionTypes.map((conn) => {
                    const isSelected = selectedConnectionTypes.includes(conn.type)
                    return (
                      <button
                        key={conn.type}
                        onClick={() => {
                          if (isSelected) {
                            if (selectedConnectionTypes.length > 1) {
                              setSelectedConnectionTypes(selectedConnectionTypes.filter(t => t !== conn.type))
                            }
                          } else {
                            setSelectedConnectionTypes([...selectedConnectionTypes, conn.type])
                          }
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                          isSelected ? 'bg-violet-500/20 border border-violet-500/30' : 'bg-neutral-800/30 hover:bg-neutral-800/50 border border-transparent'
                        }`}
                      >
                        <div 
                          className="w-8 h-0.5 rounded-full"
                          style={{ 
                            backgroundColor: conn.color,
                            backgroundImage: conn.style === 'dashed' ? `linear-gradient(90deg, transparent 50%, ${conn.color} 50%)` : 
                              conn.style === 'dotted' ? `linear-gradient(90deg, ${conn.color} 25%, transparent 25%, transparent 50%, ${conn.color} 50%, ${conn.color} 75%, transparent 75%)` : 'none',
                            backgroundSize: conn.style === 'dashed' ? '8px 2px' : conn.style === 'dotted' ? '4px 2px' : 'auto'
                          }}
                        />
                        <span className="text-sm text-white flex-1 text-left">{conn.label}</span>
                        <span className="text-xs text-neutral-500">
                          {connections.filter(c => c.type === conn.type).length}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {selectedNode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-violet-500/30 p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white">选中节点</h3>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="text-neutral-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getNodeConfig(selectedNode.type).color} flex items-center justify-center`}>
                      {(() => {
                        const NodeIcon = getNodeConfig(selectedNode.type).icon
                        return <NodeIcon className="w-6 h-6 text-white" />
                      })()}
                    </div>
                    <div>
                      <div className="text-white font-medium">{selectedNode.name}</div>
                      <div className="text-xs text-neutral-500">{selectedNode.role || getNodeConfig(selectedNode.type).label}</div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500">类型</span>
                      <span className="text-white">{getNodeConfig(selectedNode.type).label}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500">状态</span>
                      <span className={`${
                        selectedNode.status === 'active' ? 'text-emerald-400' :
                        selectedNode.status === 'review' ? 'text-amber-400' : 'text-neutral-400'
                      }`}>
                        {selectedNode.status === 'active' ? '活跃' : selectedNode.status === 'review' ? '待审核' : '未激活'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-500">关联数</span>
                      <span className="text-white">
                        {connections.filter(c => c.source === selectedNode.id || c.target === selectedNode.id).length}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors text-sm">
                      <Edit2 className="w-4 h-4" />
                      编辑
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors text-sm">
                      <Link2 className="w-4 h-4" />
                      关联
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
