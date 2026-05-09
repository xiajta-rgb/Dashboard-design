import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trash2, 
  Minus, 
  Plus, 
  Heart,
  Truck,
  Tag,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  ShoppingBag
} from 'lucide-react'

const cartItems = [
  {
    id: 1,
    name: 'TechLife 智能手表 Pro',
    variant: '深邃黑',
    price: 2499,
    originalPrice: 2999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
    selected: true,
  },
  {
    id: 2,
    name: '无线耳机 Max',
    variant: '星空白',
    price: 1299,
    originalPrice: 1599,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200',
    selected: true,
  },
  {
    id: 3,
    name: '便携音箱 Mini',
    variant: '薄荷绿',
    price: 599,
    originalPrice: 699,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200',
    selected: false,
  },
]

const coupons = [
  { id: 1, name: '新人专享', discount: 100, minSpend: 500, desc: '满500减100' },
  { id: 2, name: '限时特惠', discount: 50, minSpend: 200, desc: '满200减50' },
  { id: 3, name: '会员专享', discount: 20, minSpend: 100, desc: '满100减20' },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [showCouponModal, setShowCouponModal] = useState(false)

  const selectedItems = items.filter(item => item.selected)
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalTotal = selectedItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const discount = originalTotal - subtotal
  const couponDiscount = selectedCoupon ? selectedCoupon.discount : 0
  const shipping = subtotal >= 299 ? 0 : 10
  const total = subtotal - couponDiscount + shipping

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQuantity }
      }
      return item
    }))
  }

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const toggleSelect = (id) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, selected: !item.selected }
      }
      return item
    }))
  }

  const selectAll = () => {
    const allSelected = items.every(item => item.selected)
    setItems(items.map(item => ({ ...item, selected: !allSelected })))
  }

  const moveToFavorites = (id) => {
    removeItem(id)
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag className="w-8 h-8 text-violet-400" />
            <h1 className="text-2xl font-bold text-white">购物车</h1>
            <span className="px-2 py-1 bg-violet-500/20 text-violet-400 rounded-lg text-sm">
              {items.length} 件商品
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-neutral-900/50 rounded-xl border border-white/5 p-4">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={items.every(item => item.selected)}
                      onChange={selectAll}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500"
                    />
                    <span className="text-sm text-white">全选</span>
                  </label>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className={`flex gap-4 p-4 rounded-xl border transition-colors ${
                        item.selected
                          ? 'bg-neutral-800/50 border-violet-500/20'
                          : 'bg-neutral-900/50 border-white/5'
                      }`}
                    >
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => toggleSelect(item.id)}
                          className="w-5 h-5 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500"
                        />
                      </label>

                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-neutral-800 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white mb-1 truncate">{item.name}</h3>
                        <p className="text-xs text-neutral-500 mb-2">{item.variant}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-violet-400">¥{item.price}</span>
                          <span className="text-xs text-neutral-500 line-through">¥{item.originalPrice}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div className="flex items-center border border-white/10 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-white/5 transition-colors"
                          >
                            <Minus className="w-4 h-4 text-neutral-400" />
                          </button>
                          <span className="w-10 text-center text-sm text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-white/5 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-neutral-400" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => moveToFavorites(item.id)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            title="移入收藏夹"
                          >
                            <Heart className="w-4 h-4 text-neutral-400" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {items.length === 0 && (
                  <div className="py-12 text-center">
                    <ShoppingBag className="w-12 h-12 mx-auto text-neutral-600 mb-4" />
                    <p className="text-neutral-400 mb-4">购物车是空的</p>
                    <button className="px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors">
                      去逛逛
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-neutral-900/50 rounded-xl border border-white/5 p-4">
                <h3 className="text-sm font-medium text-white mb-4">可用优惠券</h3>
                <div className="space-y-3">
                  {coupons.map((coupon) => (
                    <button
                      key={coupon.id}
                      onClick={() => setSelectedCoupon(selectedCoupon?.id === coupon.id ? null : coupon)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        selectedCoupon?.id === coupon.id
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex flex-col items-center justify-center text-white">
                        <span className="text-lg font-bold">¥{coupon.discount}</span>
                        <span className="text-[10px]">优惠券</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-white">{coupon.name}</p>
                        <p className="text-xs text-neutral-500">{coupon.desc}</p>
                        <p className="text-xs text-neutral-600 mt-1">满{coupon.minSpend}可用</p>
                      </div>
                      {selectedCoupon?.id === coupon.id && (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-white mb-6">订单总结</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">商品总价</span>
                    <span className="text-white">¥{originalTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">活动优惠</span>
                    <span className="text-emerald-400">-¥{discount.toLocaleString()}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">优惠券</span>
                      <span className="text-emerald-400">-¥{couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">运费</span>
                    <span className={shipping === 0 ? 'text-emerald-400' : 'text-white'}>
                      {shipping === 0 ? '免费' : `¥${shipping}`}
                    </span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-violet-500/10 rounded-lg mb-6">
                    <Truck className="w-4 h-4 text-violet-400" />
                    <span className="text-xs text-violet-400">满¥299免运费，再差¥{299 - subtotal}即可</span>
                  </div>
                )}

                <div className="h-px bg-white/10 mb-6" />

                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-neutral-400">应付总额</span>
                  <div>
                    <span className="text-3xl font-bold text-white">¥{total.toLocaleString()}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={selectedItems.length === 0}
                  className={`w-full py-4 rounded-xl font-medium transition-colors ${
                    selectedItems.length > 0
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  去结算 ({selectedItems.length})
                </motion.button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>7天无理由退换货</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <CreditCard className="w-4 h-4 text-violet-400" />
                    <span>支持多种支付方式</span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 rounded-xl border border-white/5 p-6">
                <h3 className="text-sm font-medium text-white mb-4">温馨提示</h3>
                <ul className="space-y-2 text-xs text-neutral-500">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    商品价格以结算页面为准
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    优惠券使用规则请查看活动详情
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    如遇问题可联系客服处理
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}