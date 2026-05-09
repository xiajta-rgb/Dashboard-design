import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Edit3,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Image,
  Video,
  Smile,
  Send
} from 'lucide-react'

const posts = [
  {
    id: 1,
    content: '今天分享一组最新的设计作品，探索了新的视觉风格，希望你们喜欢！✨ #设计 #创意',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600'],
    likes: 234,
    comments: 45,
    shares: 12,
    time: '2小时前',
    user: { name: '李明', avatar: '李' },
  },
  {
    id: 2,
    content: '新项目终于上线了！经过几个月的努力，我们完成了这个从概念到落地的全流程设计。',
    images: ['https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600'],
    likes: 456,
    comments: 89,
    shares: 34,
    time: '1天前',
    user: { name: '李明', avatar: '李' },
  },
  {
    id: 3,
    content: '周末愉快！今天去了一个新发现的咖啡馆，环境很棒，适合工作也适合放松。☕',
    images: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600'],
    likes: 189,
    comments: 23,
    shares: 5,
    time: '3天前',
    user: { name: '李明', avatar: '李' },
  },
]

const friends = [
  { id: 1, name: '王芳', avatar: '王', status: '在线' },
  { id: 2, name: '张伟', avatar: '张', status: '离线' },
  { id: 3, name: '刘洋', avatar: '刘', status: '在线' },
  { id: 4, name: '陈静', avatar: '陈', status: '忙碌' },
]

const stats = [
  { label: '发帖', value: '128' },
  { label: '关注者', value: '2.5K' },
  { label: '关注', value: '356' },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts')
  const [isFollowing, setIsFollowing] = useState(false)
  const [newPost, setNewPost] = useState('')

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-neutral-900/50 rounded-3xl border border-white/5 overflow-hidden mb-8">
            <div className="h-48 bg-gradient-to-r from-violet-500 to-purple-600 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
            </div>

            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 relative z-10">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-neutral-900 bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-xl">
                  <span className="text-5xl font-bold text-white">李</span>
                </div>

                <div className="flex-1 pt-4 md:pt-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-white">李明</h1>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">设计师</span>
                  </div>
                  <p className="text-neutral-400 mb-4">创意设计师 | 热爱探索新的视觉语言</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      深圳
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <a href="#" className="text-violet-400 hover:underline">liming.design</a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      2023年3月加入
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                      isFollowing
                        ? 'bg-neutral-800 text-white border border-white/10'
                        : 'bg-violet-500 text-white hover:bg-violet-600'
                    }`}
                  >
                    {isFollowing ? '已关注' : '关注'}
                  </motion.button>
                  <button className="p-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-8 mt-8 border-t border-white/5 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center cursor-pointer hover:text-violet-400 transition-colors">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-medium flex-shrink-0">
                    李
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="分享你的想法..."
                      className="w-full bg-transparent text-white placeholder-neutral-500 resize-none focus:outline-none min-h-[80px]"
                    />
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-400 hover:text-violet-400">
                          <Image className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-400 hover:text-violet-400">
                          <Video className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-400 hover:text-violet-400">
                          <Smile className="w-5 h-5" />
                        </button>
                      </div>
                      <button className="px-6 py-2 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors">
                        发布
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 border-b border-white/10">
                {['posts', 'media', 'about'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
                      activeTab === tab ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {tab === 'posts' && '帖子'}
                    {tab === 'media' && '媒体'}
                    {tab === 'about' && '关于'}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="profileTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                        {post.user.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{post.user.name}</p>
                        <p className="text-xs text-neutral-500">{post.time}</p>
                      </div>
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-neutral-500" />
                      </button>
                    </div>

                    <p className="text-neutral-300 mb-4 leading-relaxed">{post.content}</p>

                    {post.images && post.images.length > 0 && (
                      <div className="rounded-xl overflow-hidden mb-4">
                        <img src={post.images[0]} alt="" className="w-full h-auto" />
                      </div>
                    )}

                    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                      <button className="flex items-center gap-2 text-neutral-400 hover:text-pink-400 transition-colors group">
                        <Heart className="w-5 h-5 group-hover:fill-pink-400" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                      <button className="ml-auto text-neutral-400 hover:text-amber-400 transition-colors">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
                <h3 className="text-sm font-medium text-white mb-4">在线好友</h3>
                <div className="space-y-3">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                          {friend.avatar}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-neutral-900 ${
                          friend.status === '在线' ? 'bg-emerald-500' :
                          friend.status === '忙碌' ? 'bg-amber-500' : 'bg-neutral-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{friend.name}</p>
                        <p className="text-xs text-neutral-500">{friend.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
                <h3 className="text-sm font-medium text-white mb-4">快捷操作</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-neutral-300">
                    <Edit3 className="w-4 h-4" />
                    <span className="text-sm">编辑资料</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-neutral-300">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">设置</span>
                  </button>
                </div>
              </div>

              <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
                <h3 className="text-sm font-medium text-white mb-4">推荐关注</h3>
                <div className="space-y-4">
                  {[
                    { name: '设计博物馆', avatar: '设', type: '官方' },
                    { name: '创意工坊', avatar: '创', type: '认证' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                        {item.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{item.name}</p>
                        <p className="text-xs text-neutral-500">{item.type}</p>
                      </div>
                      <button className="px-3 py-1 text-xs bg-violet-500/20 text-violet-400 rounded-lg hover:bg-violet-500/30 transition-colors">
                        + 关注
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}