import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  MessageCircle,
  Bell,
  Users,
  Settings,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreHorizontal,
  Circle,
  Check,
  CheckCheck
} from 'lucide-react'

const conversations = [
  {
    id: 1,
    name: '王芳',
    avatar: '王',
    lastMessage: '好的，明天见！',
    time: '刚刚',
    unread: 2,
    online: true,
    messages: [
      { id: 1, content: '嗨，在吗？', time: '10:30', sent: false },
      { id: 2, content: '在的，有什么事吗？', time: '10:31', sent: true },
      { id: 3, content: '想和你讨论一下项目的事情', time: '10:32', sent: false },
      { id: 4, content: '好的，明天见！', time: '10:35', sent: false },
    ]
  },
  {
    id: 2,
    name: '张伟',
    avatar: '张',
    lastMessage: '收到，我看看',
    time: '10分钟前',
    unread: 0,
    online: false,
    messages: []
  },
  {
    id: 3,
    name: '刘洋',
    avatar: '刘',
    lastMessage: '👍👍',
    time: '1小时前',
    unread: 0,
    online: true,
    messages: []
  },
  {
    id: 4,
    name: '陈静',
    avatar: '陈',
    lastMessage: '辛苦了！',
    time: '昨天',
    unread: 0,
    online: false,
    messages: []
  },
]

const notifications = [
  { id: 1, type: 'like', content: '王芳 赞了你的帖子', time: '5分钟前', read: false },
  { id: 2, type: 'comment', content: '张伟 评论了你的帖子：写得真好！', time: '30分钟前', read: false },
  { id: 3, type: 'follow', content: '刘洋 关注了你', time: '2小时前', read: true },
  { id: 4, type: 'mention', content: '陈静 在评论中提到了你', time: '昨天', read: true },
]

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('messages')
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const tabs = [
    { id: 'messages', label: '消息', icon: MessageCircle, count: 3 },
    { id: 'notifications', label: '通知', icon: Bell, count: 2 },
    { id: 'contacts', label: '联系人', icon: Users, count: 0 },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <div className="w-80 border-r border-white/10 flex flex-col bg-neutral-900/50">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-bold text-white mb-4">消息</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500/50"
            />
          </div>
        </div>

        <div className="flex border-b border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 relative transition-colors ${
                  activeTab === tab.id ? 'text-violet-400' : 'text-neutral-500 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.count > 0 && (
                  <span className="absolute top-2 right-4 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-violet-500 rounded-full" />
                )}
              </button>
            )
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'messages' && (
            <div className="p-2 space-y-1">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    selectedConversation?.id === conv.id
                      ? 'bg-violet-500/10 border border-violet-500/30'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-medium">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-neutral-900" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white truncate">{conv.name}</span>
                      <span className="text-xs text-neutral-500">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-neutral-500 truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="w-5 h-5 bg-violet-500 rounded-full text-[10px] text-white flex items-center justify-center">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="p-2 space-y-1">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 p-3 rounded-xl ${
                    notif.read ? 'opacity-60' : 'bg-white/5'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    {notif.content.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{notif.content}</p>
                    <p className="text-xs text-neutral-500 mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 bg-violet-500 rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="p-4 text-center text-neutral-500">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>暂无联系人</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {selectedConversation.avatar}
                  </div>
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-neutral-950" />
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-medium text-white">{selectedConversation.name}</h2>
                  <p className="text-xs text-neutral-500">
                    {selectedConversation.online ? '在线' : '离线'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-400 hover:text-white">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-400 hover:text-white">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-400 hover:text-white">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      msg.sent
                        ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white'
                        : 'bg-neutral-800 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sent ? 'text-white/70' : 'text-neutral-500'}`}>
                      <span className="text-[10px]">{msg.time}</span>
                      {msg.sent && (
                        <CheckCheck className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-end gap-3">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-400 hover:text-white">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 bg-neutral-800/50 border border-white/10 rounded-2xl">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="输入消息..."
                    rows={1}
                    className="w-full px-4 py-3 bg-transparent text-white placeholder-neutral-500 resize-none focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        setNewMessage('')
                      }
                    }}
                  />
                </div>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-neutral-400 hover:text-white">
                  <Smile className="w-5 h-5" />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto text-neutral-600 mb-4" />
              <p className="text-neutral-500">选择一个对话开始聊天</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}