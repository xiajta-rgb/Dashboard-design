import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  Star,
  Heart,
  ShoppingCart,
  X
} from 'lucide-react'

const products = [
  { id: 1, name: 'TechLife 智能手表 Pro', price: 2499, originalPrice: 2999, rating: 4.8, reviews: 128, sales: 2560, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', badge: '热卖' },
  { id: 2, name: '无线耳机 Max', price: 1299, originalPrice: 1599, rating: 4.9, reviews: 256, sales: 5200, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', badge: '新品' },
  { id: 3, name: '便携音箱 Mini', price: 599, originalPrice: 699, rating: 4.7, reviews: 89, sales: 1800, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', badge: '' },
  { id: 4, name: '充电宝 Ultra', price: 299, originalPrice: 399, rating: 4.6, reviews: 456, sales: 8900, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400', badge: '特惠' },
  { id: 5, name: '智能手环 Lite', price: 199, originalPrice: 249, rating: 4.5, reviews: 234, sales: 12000, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400', badge: '' },
  { id: 6, name: '降噪耳机 Pro', price: 1899, originalPrice: 2299, rating: 4.9, reviews: 567, sales: 3400, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', badge: '热卖' },
  { id: 7, name: '智能眼镜 Vision', price: 3299, originalPrice: 3999, rating: 4.7, reviews: 78, sales: 890, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', badge: '新品' },
  { id: 8, name: '运动相机 Action', price: 1599, originalPrice: 1899, rating: 4.8, reviews: 189, sales: 2100, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400', badge: '' },
  { id: 9, name: '电子书阅读器', price: 999, originalPrice: 1199, rating: 4.6, reviews: 345, sales: 5600, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', badge: '特惠' },
  { id: 10, name: '游戏手柄 Pro', price: 399, originalPrice: 499, rating: 4.8, reviews: 678, sales: 7800, image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=400', badge: '' },
  { id: 11, name: '机械键盘 RGB', price: 599, originalPrice: 799, rating: 4.7, reviews: 890, sales: 4500, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400', badge: '热卖' },
  { id: 12, name: '无线鼠标 Ergonomic', price: 299, originalPrice: 399, rating: 4.5, reviews: 234, sales: 3200, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', badge: '' },
]

const categories = ['全部', '智能手表', '耳机音响', '充电设备', '智能手环', '相机设备', '键鼠外设']
const brands = ['TechLife', 'SoundMax', 'PowerBank', 'VisionTech', 'ActionCam']
const priceRanges = ['不限', '0-200', '200-500', '500-1000', '1000-2000', '2000以上']

export default function SearchPage() {
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('智能设备')
  const [sortBy, setSortBy] = useState('sales')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [priceRange, setPriceRange] = useState('不限')
  const [showFilters, setShowFilters] = useState(false)

  const sortOptions = [
    { value: 'sales', label: '销量优先' },
    { value: 'price-asc', label: '价格从低到高' },
    { value: 'price-desc', label: '价格从高到低' },
    { value: 'rating', label: '评分最高' },
    { value: 'newest', label: '最新上架' },
  ]

  const filteredProducts = products
    .filter(p => selectedCategory === '全部' || p.name.includes(selectedCategory))
    .sort((a, b) => {
      switch (sortBy) {
        case 'sales': return b.sales - a.sales
        case 'price-asc': return a.price - b.price
        case 'price-desc': return b.price - a.price
        case 'rating': return b.rating - a.rating
        case 'newest': return b.id - a.id
        default: return 0
      }
    })

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索商品..."
                className="w-full pl-12 pr-4 py-4 bg-neutral-900/50 border border-white/10 rounded-2xl text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/5 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                  showFilters
                    ? 'bg-violet-500/10 border-violet-500/30 text-violet-400'
                    : 'border-white/10 text-neutral-400 hover:border-white/20'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm">筛选</span>
              </button>

              <div className="hidden md:flex items-center gap-2 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-violet-500 text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-neutral-900/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50 cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>

              <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-violet-500/20 text-violet-400' : 'text-neutral-500 hover:text-white'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-violet-500/20 text-violet-400' : 'text-neutral-500 hover:text-white'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-8 p-6 bg-neutral-900/50 rounded-2xl border border-white/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-white mb-4">品牌</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === brand}
                          onChange={() => setSelectedBrand(selectedBrand === brand ? '' : brand)}
                          className="w-4 h-4 text-violet-500 focus:ring-violet-500"
                        />
                        <span className="text-sm text-neutral-400 hover:text-white">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white mb-4">价格区间</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range}
                        onClick={() => setPriceRange(range)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          priceRange === range
                            ? 'bg-violet-500 text-white'
                            : 'bg-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {range === '不限' ? '不限' : `¥${range}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white mb-4">评分</h3>
                  <div className="flex items-center gap-2">
                    {[4, 4.5, 4.7, 4.8].map((rating) => (
                      <button
                        key={rating}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm bg-neutral-800 text-neutral-400 hover:text-white"
                      >
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span>{rating}+</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-6 border-t border-white/5">
                <button
                  onClick={() => {
                    setSelectedBrand('')
                    setPriceRange('不限')
                  }}
                  className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  重置筛选
                </button>
              </div>
            </motion.div>
          )}

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-neutral-500">
              共找到 <span className="text-white font-medium">{filteredProducts.length}</span> 件商品
            </p>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 mb-4">
                    {product.badge && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg text-xs text-white font-medium z-10">
                        {product.badge}
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                        <Heart className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-white mb-2 line-clamp-2 group-hover:text-violet-400 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-violet-400">¥{product.price}</span>
                    <span className="text-xs text-neutral-500 line-through">¥{product.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-neutral-400">{product.rating}</span>
                      <span className="text-xs text-neutral-600">({product.reviews})</span>
                    </div>
                    <span className="text-xs text-neutral-600">已售{product.sales}+</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex gap-6 p-4 bg-neutral-900/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
                >
                  <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0">
                    {product.badge && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded text-xs text-white font-medium z-10">
                        {product.badge}
                      </div>
                    )}
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-2">
                    <h3 className="text-lg font-medium text-white mb-2 group-hover:text-violet-400 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm text-white">{product.rating}</span>
                        <span className="text-sm text-neutral-500">({product.reviews}条评价)</span>
                      </div>
                      <span className="text-sm text-neutral-500">销量 {product.sales}+</span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-2xl font-bold text-violet-400">¥{product.price}</span>
                      <span className="text-sm text-neutral-500 line-through">¥{product.originalPrice}</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-lg text-sm hover:bg-violet-600 transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                        加入购物车
                      </button>
                      <button className="p-2 border border-white/10 rounded-lg text-neutral-400 hover:text-white hover:border-white/20 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}