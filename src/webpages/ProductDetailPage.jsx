import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  ChevronRight,
  Minus,
  Plus,
  Check,
  ShoppingCart
} from 'lucide-react'

const productImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
]

const reviews = [
  { id: 1, user: '张明', avatar: '张', rating: 5, date: '2026-03-15', content: '非常满意！做工精细，质感很好。包装也很精美，送礼很有面子。' },
  { id: 2, user: '李华', avatar: '李', rating: 4, date: '2026-03-12', content: '整体不错，就是物流稍微慢了点。产品本身很满意。' },
  { id: 3, user: '王芳', avatar: '王', rating: 5, date: '2026-03-10', content: '已经是第二次购买了，品质一如既往的好。推荐！' },
]

const relatedProducts = [
  { id: 1, name: '智能手表 Pro', price: 2999, originalPrice: 3499, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
  { id: 2, name: '无线耳机 Max', price: 1299, originalPrice: 1599, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300' },
  { id: 3, name: '便携音箱 Mini', price: 599, originalPrice: 699, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300' },
  { id: 4, name: '充电宝 Ultra', price: 299, originalPrice: 399, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300' },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('black')
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  const colors = [
    { id: 'black', name: '深邃黑', hex: '#1a1a1a' },
    { id: 'silver', name: '星光银', hex: '#c0c0c0' },
    { id: 'gold', name: '香槟金', hex: '#d4af37' },
  ]

  const specs = [
    { label: '品牌', value: 'TechLife' },
    { label: '型号', value: 'TL-Watch Pro' },
    { label: '材质', value: '航空级铝合金' },
    { label: '防水等级', value: 'IP68' },
    { label: '屏幕尺寸', value: '1.9英寸 AMOLED' },
    { label: '电池容量', value: '500mAh' },
    { label: '续航时间', value: '最长14天' },
    { label: '重量', value: '45g' },
  ]

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
            <span className="hover:text-white cursor-pointer">首页</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-white cursor-pointer">智能穿戴</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">智能手表</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/10"
              >
                <img
                  src={productImages[selectedImage]}
                  alt="产品图片"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-violet-500'
                        : 'border-transparent hover:border-white/20'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-400">4.8 (128条评价)</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">
                  TechLife 智能手表 Pro
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-violet-400">¥2,499</span>
                  <span className="text-xl text-neutral-500 line-through">¥2,999</span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm">限时特惠</span>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-3">选择颜色</h3>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                        selectedColor === color.id
                          ? 'border-violet-500 bg-violet-500/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-sm text-white">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-3">数量</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/10 rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-white/5 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-neutral-400" />
                    </button>
                    <span className="w-12 text-center text-white font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-white/5 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-neutral-400" />
                    </button>
                  </div>
                  <span className="text-sm text-neutral-500">库存充足</span>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  加入购物车
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-400 hover:to-orange-400 transition-colors"
                >
                  立即购买
                </motion.button>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                    isFavorite
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : 'border-white/10 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-400' : ''}`} />
                  收藏
                </motion.button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-neutral-400 hover:border-white/20 transition-colors">
                  <Share2 className="w-4 h-4" />
                  分享
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 p-4 bg-neutral-900/50 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-sm text-white">免费配送</p>
                    <p className="text-xs text-neutral-500">下单后预计2-3个工作日送达</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-sm text-white">正品保障</p>
                    <p className="text-xs text-neutral-500">7天无理由退换货</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-sm text-white">轻松退货</p>
                    <p className="text-xs text-neutral-500">7天内可申请退货</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="flex gap-6 border-b border-white/10 mb-8">
              {['description', 'specs', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium transition-colors relative ${
                    activeTab === tab ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {tab === 'description' && '商品描述'}
                  {tab === 'specs' && '规格参数'}
                  {tab === 'reviews' && '用户评价'}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500"
                    />
                  )}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-invert max-w-none"
              >
                <p className="text-neutral-300 leading-relaxed mb-6">
                  TechLife 智能手表 Pro 采用航空级铝合金材质，搭载1.9英寸 AMOLED 高清触控屏，
                  支持全天候心率监测、血氧饱和度检测、睡眠分析等健康功能。
                  500mAh 大容量电池，最长续航可达14天。
                </p>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  支持 GPS、北斗、GLONASS 三系统定位，精准记录运动轨迹。
                  50米防水等级，游泳时也可佩戴。兼容 iOS 和 Android 系统，
                  通过蓝牙 5.0 与手机连接，接收通知、控制音乐、遥控拍照等功能一应俱全。
                </p>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {specs.map((spec) => (
                  <div key={spec.label} className="p-4 bg-neutral-900/50 rounded-xl border border-white/5">
                    <p className="text-xs text-neutral-500 mb-1">{spec.label}</p>
                    <p className="text-sm text-white font-medium">{spec.value}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-6 p-6 bg-neutral-900/50 rounded-xl border border-white/5">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-violet-400">4.8</p>
                    <div className="flex items-center gap-1 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-500">128条评价</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500 w-6">{star}星</span>
                        <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: star === 5 ? '70%' : star === 4 ? '20%' : '10%' }}
                          />
                        </div>
                        <span className="text-xs text-neutral-500 w-8">{star === 5 ? '70%' : star === 4 ? '20%' : '10%'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-6 bg-neutral-900/50 rounded-xl border border-white/5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-medium">
                            {review.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{review.user}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}`} />
                                ))}
                              </div>
                              <span className="text-xs text-neutral-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-400">{review.content}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">相关推荐</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-white/5 mb-3">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-violet-400 font-medium">¥{product.price}</span>
                    <span className="text-xs text-neutral-500 line-through">¥{product.originalPrice}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}