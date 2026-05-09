import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronRight,
  CreditCard,
  Truck,
  MapPin,
  Plus,
  Check,
  ShieldCheck,
  Package,
  Clock
} from 'lucide-react'

const addresses = [
  {
    id: 1,
    name: '张三',
    phone: '138****8888',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园路1号A栋1001室',
    isDefault: true,
  },
  {
    id: 2,
    name: '李四',
    phone: '139****9999',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '建国路88号SOHO现代城',
    isDefault: false,
  },
]

const paymentMethods = [
  { id: 'wechat', name: '微信支付', icon: '💬', selected: true },
  { id: 'alipay', name: '支付宝', icon: '💙', selected: false },
  { id: 'card', name: '银行卡', icon: '💳', selected: false },
]

const deliveryMethods = [
  { id: 'standard', name: '标准配送', price: 0, time: '预计3-5个工作日', desc: '免运费' },
  { id: 'express', name: '快速配送', price: 10, time: '预计1-2个工作日', desc: '加急服务' },
  { id: 'same-day', name: '当日达', price: 30, time: '今日 18:00 前送达', desc: '限时服务' },
]

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState(addresses[0])
  const [selectedPayment, setSelectedPayment] = useState('wechat')
  const [selectedDelivery, setSelectedDelivery] = useState('standard')
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [invoiceType, setInvoiceType] = useState('normal')
  const [couponCode, setCouponCode] = useState('')

  const orderItems = [
    { id: 1, name: 'TechLife 智能手表 Pro', variant: '深邃黑', price: 2499, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' },
    { id: 2, name: '无线耳机 Max', variant: '星空白', price: 1299, quantity: 2, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100' },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const couponDiscount = couponCode === 'SAVE10' ? 100 : 0
  const deliveryPrice = deliveryMethods.find(d => d.id === selectedDelivery)?.price || 0
  const total = subtotal - couponDiscount + deliveryPrice

  const handleSubmit = () => {
    alert('订单提交成功！')
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-white mb-8">确认订单</h1>

          <div className="space-y-6">
            <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-violet-400" />
                  <h2 className="text-lg font-semibold text-white">收货地址</h2>
                </div>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300"
                >
                  <Plus className="w-4 h-4" />
                  添加新地址
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedAddress.id === addr.id
                        ? 'border-violet-500 bg-violet-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{addr.name}</span>
                        <span className="text-xs text-neutral-500">{addr.phone}</span>
                      </div>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 bg-violet-500/20 text-violet-400 rounded text-xs">默认</span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-500">
                      {addr.province} {addr.city} {addr.district} {addr.detail}
                    </p>
                    {selectedAddress.id === addr.id && (
                      <div className="mt-3 flex items-center gap-1 text-xs text-violet-400">
                        <Check className="w-3 h-3" />
                        已选择此地址
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-violet-400" />
                <h2 className="text-lg font-semibold text-white">配送方式</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {deliveryMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedDelivery(method.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedDelivery === method.id
                        ? 'border-violet-500 bg-violet-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{method.name}</span>
                      <span className="text-sm font-medium text-violet-400">
                        {method.price === 0 ? '免费' : `¥${method.price}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-neutral-500 mb-1">
                      <Clock className="w-3 h-3" />
                      {method.time}
                    </div>
                    <p className="text-xs text-neutral-600">{method.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-violet-400" />
                <h2 className="text-lg font-semibold text-white">支付方式</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedPayment === method.id
                        ? 'border-violet-500 bg-violet-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.icon}</span>
                      <span className="text-sm font-medium text-white">{method.name}</span>
                      {selectedPayment === method.id && (
                        <Check className="w-4 h-4 text-violet-400 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">商品清单</h2>
              </div>

              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-neutral-800/50 rounded-xl">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-700">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-white mb-1">{item.name}</h3>
                      <p className="text-xs text-neutral-500 mb-2">{item.variant}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-violet-400">¥{item.price}</span>
                        <span className="text-sm text-neutral-500">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">优惠码</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="输入优惠码"
                  className="flex-1 px-4 py-3 bg-neutral-800/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500/50"
                />
                <button className="px-6 py-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors">
                  验证
                </button>
              </div>
              {couponCode === 'SAVE10' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2 text-sm text-emerald-400"
                >
                  <Check className="w-4 h-4" />
                  优惠码有效，立减 ¥100
                </motion.div>
              )}
            </div>

            <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">发票信息</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setInvoiceType('normal')}
                  className={`flex-1 p-4 rounded-xl border text-center transition-all ${
                    invoiceType === 'normal'
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <p className="text-sm font-medium text-white">普通发票</p>
                </button>
                <button
                  onClick={() => setInvoiceType('VAT')}
                  className={`flex-1 p-4 rounded-xl border text-center transition-all ${
                    invoiceType === 'VAT'
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <p className="text-sm font-medium text-white">增值税发票</p>
                </button>
              </div>
            </div>

            <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6 sticky bottom-4">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">商品总价</span>
                  <span className="text-white">¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">运费</span>
                  <span className="text-white">
                    {deliveryPrice === 0 ? '免费' : `¥${deliveryPrice}`}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">优惠</span>
                    <span className="text-emerald-400">-¥{couponDiscount}</span>
                  </div>
                )}
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-baseline">
                  <span className="text-neutral-400">应付总额</span>
                  <div>
                    <span className="text-3xl font-bold text-white">¥{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-medium hover:from-violet-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
              >
                提交订单
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>交易安全，由平台保障</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}