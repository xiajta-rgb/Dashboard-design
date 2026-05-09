import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe,
  Languages,
  ChevronDown,
  Check,
  Search,
  Copy,
  Download,
  FileText,
  Settings,
  Sun,
  Moon,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Truck,
  Package,
  RefreshCw,
  Shield,
  Zap,
  Heart,
  Star,
  Bookmark,
  Share2,
  Printer,
  Edit,
  Trash2,
  Plus,
  Minus,
  Search as SearchIcon,
  Filter,
  ArrowRight,
  ArrowLeft,
  Check as CheckIcon,
  X,
  Eye,
  EyeOff
} from 'lucide-react'

const languages = [
  { code: 'zh-CN', name: '简体中文', nativeName: '简体中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'zh-TW', name: '繁体中文', nativeName: '繁體中文', flag: '🇹🇼', dir: 'ltr' },
  { code: 'en-US', name: '英语', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ja-JP', name: '日语', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ko-KR', name: '韩语', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' },
  { code: 'fr-FR', name: '法语', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de-DE', name: '德语', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'es-ES', name: '西班牙语', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'pt-BR', name: '葡萄牙语', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'ru-RU', name: '俄语', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'ar-SA', name: '阿拉伯语', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'he-IL', name: '希伯来语', nativeName: 'עברית', flag: '🇮🇱', dir: 'rtl' },
]

const translations = {
  'zh-CN': {
    welcome: '欢迎',
    greeting: '您好，欢迎来到国际化演示页面',
    description: '这里展示了多语言支持的各种功能，包括语言切换、文本翻译、数字格式化、日期格式化等。',
    selectLanguage: '选择语言',
    currentLanguage: '当前语言',
    features: '功能特性',
    feature1Title: '多语言支持',
    feature1Desc: '支持12种语言，包括从左到右和从右到左的排版方向',
    feature2Title: '实时切换',
    feature2Desc: '无需刷新页面，实时切换语言',
    feature3Title: '格式化支持',
    feature3Desc: '数字、日期、货币等本地化格式化',
    commonPhrases: '常用短语',
    hello: '你好',
    goodbye: '再见',
    thankYou: '谢谢',
    please: '请',
    yes: '是',
    no: '否',
    formSection: '表单示例',
    name: '姓名',
    email: '邮箱',
    phone: '电话',
    address: '地址',
    submit: '提交',
    cancel: '取消',
    notifications: '通知消息',
    success: '成功',
    successMsg: '操作已成功完成！',
    warning: '警告',
    warningMsg: '请注意此操作的潜在风险',
    error: '错误',
    errorMsg: '操作失败，请重试',
    info: '信息',
    infoMsg: '这是一条信息提示',
    numbers: '数字格式化',
    dateTime: '日期时间',
    currency: '货币',
  },
  'en-US': {
    welcome: 'Welcome',
    greeting: 'Hello, welcome to the internationalization demo page',
    description: 'This page demonstrates various features of multi-language support, including language switching, text translation, number formatting, date formatting, etc.',
    selectLanguage: 'Select Language',
    currentLanguage: 'Current Language',
    features: 'Features',
    feature1Title: 'Multi-language Support',
    feature1Desc: 'Supports 12 languages including left-to-right and right-to-left text directions',
    feature2Title: 'Real-time Switching',
    feature2Desc: 'Switch languages in real-time without page refresh',
    feature3Title: 'Formatting Support',
    feature3Desc: 'Localized formatting for numbers, dates, currencies, etc.',
    commonPhrases: 'Common Phrases',
    hello: 'Hello',
    goodbye: 'Goodbye',
    thankYou: 'Thank you',
    please: 'Please',
    yes: 'Yes',
    no: 'No',
    formSection: 'Form Example',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    submit: 'Submit',
    cancel: 'Cancel',
    notifications: 'Notifications',
    success: 'Success',
    successMsg: 'Operation completed successfully!',
    warning: 'Warning',
    warningMsg: 'Please note the potential risks of this operation',
    error: 'Error',
    errorMsg: 'Operation failed, please try again',
    info: 'Information',
    infoMsg: 'This is an information message',
    numbers: 'Number Formatting',
    dateTime: 'Date & Time',
    currency: 'Currency',
  },
  'ja-JP': {
    welcome: 'ようこそ',
    greeting: '国際化デモページへようこそ',
    description: 'このページでは、多言語サポート的各种機能を示しています。',
    selectLanguage: '言語を選択',
    currentLanguage: '現在の言語',
    features: '機能',
    feature1Title: '多言語サポート',
    feature1Desc: '12の言語をサポート',
    feature2Title: 'リアルタイム切替',
    feature2Desc: 'ページを更新せずに言語を切替',
    feature3Title: 'フォーマットサポート',
    feature3Desc: '数字、日付、通貨のローカライズ',
    commonPhrases: 'よく使うフレーズ',
    hello: 'こんにちは',
    goodbye: 'さようなら',
    thankYou: 'ありがとう',
    please: 'お願いします',
    yes: 'はい',
    no: 'いいえ',
    formSection: 'フォーム例',
    name: '名前',
    email: 'メール',
    phone: '電話',
    address: '住所',
    submit: '送信',
    cancel: 'キャンセル',
    notifications: '通知メッセージ',
    success: '成功',
    successMsg: '操作が正常に完了しました！',
    warning: '警告',
    warningMsg: 'この操作の潜在的なリスクにご注意ください',
    error: 'エラー',
    errorMsg: '操作が失敗しました。もう一度お試しください',
    info: '情報',
    infoMsg: 'これは情報メッセージです',
    numbers: '数字の書式設定',
    dateTime: '日付と時刻',
    currency: '通貨',
  },
}

const stats = [
  { label: '支持语言', value: '12', icon: Languages },
  { label: '翻译词条', value: '2,400+', icon: FileText },
  { label: '格式化选项', value: '8', icon: Settings },
  { label: 'RTL语言', value: '2', icon: Globe },
]

const sampleNumbers = [1234567.89, 9876543.21, 0.123456, 999999.99]
const sampleDates = [new Date(), new Date(2026, 0, 1), new Date(2026, 11, 25)]
const sampleCurrencies = [1234.56, 9999.99, 0.01, 100000]

export default function InternationalizationPage() {
  const [currentLang, setCurrentLang] = useState('zh-CN')
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' })

  const t = translations[currentLang] || translations['zh-CN']
  const currentLangInfo = languages.find(l => l.code === currentLang)

  const formatNumber = (num) => {
    return new Intl.NumberFormat(currentLang, {
      maximumFractionDigits: 2,
    }).format(num)
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat(currentLang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat(currentLang, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const formatCurrency = (amount) => {
    const currencyMap = {
      'zh-CN': { currency: 'CNY', locale: 'zh-CN' },
      'en-US': { currency: 'USD', locale: 'en-US' },
      'ja-JP': { currency: 'JPY', locale: 'ja-JP' },
      'fr-FR': { currency: 'EUR', locale: 'fr-FR' },
      'de-DE': { currency: 'EUR', locale: 'de-DE' },
    }
    const config = currencyMap[currentLang] || { currency: 'USD', locale: 'en-US' }
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
    }).format(amount)
  }

  const handleLanguageSelect = (langCode) => {
    setCurrentLang(langCode)
    setShowLangDropdown(false)
    document.documentElement.dir = languages.find(l => l.code === langCode)?.dir || 'ltr'
  }

  const filteredLanguages = languages.filter(lang =>
    lang.name.includes(searchQuery) || lang.nativeName.includes(searchQuery)
  )

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Globe className="w-8 h-8 text-violet-400" />
                {t.welcome}
              </h1>
              <p className="text-sm text-neutral-500 mt-1">{t.greeting}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-3 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors"
              >
                <span className="text-2xl">{currentLangInfo?.flag}</span>
                <div className="text-left">
                  <div className="text-sm font-medium">{currentLangInfo?.nativeName}</div>
                  <div className="text-xs text-neutral-500">{currentLangInfo?.name}</div>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showLangDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 right-0 w-80 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-white/10">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        placeholder={t.selectLanguage}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      />
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2">
                    {filteredLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                          currentLang === lang.code 
                            ? 'bg-violet-500/20 text-violet-400' 
                            : 'hover:bg-neutral-800 text-white'
                        }`}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">{lang.nativeName}</div>
                          <div className="text-xs text-neutral-500">{lang.name}</div>
                        </div>
                        {currentLang === lang.code && <Check className="w-4 h-4" />}
                        {lang.dir === 'rtl' && (
                          <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">RTL</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
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
                <stat.icon className="w-5 h-5 text-violet-400 mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">{t.features}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Languages, title: t.feature1Title, desc: t.feature1Desc },
                    { icon: Zap, title: t.feature2Title, desc: t.feature2Desc },
                    { icon: Settings, title: t.feature3Title, desc: t.feature3Desc },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-neutral-800/50 rounded-xl"
                    >
                      <feature.icon className="w-8 h-8 text-violet-400 mb-3" />
                      <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                      <p className="text-sm text-neutral-400">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">{t.numbers}</h2>
                <div className="space-y-3">
                  {sampleNumbers.map((num, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl">
                      <span className="text-neutral-400">原始值: {num}</span>
                      <span className="text-white font-medium">{formatNumber(num)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">{t.dateTime}</h2>
                <div className="space-y-3">
                  {sampleDates.map((date, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl">
                      <span className="text-neutral-400">原始值</span>
                      <span className="text-white font-medium">{formatDateTime(date)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">{t.currency}</h2>
                <div className="space-y-3">
                  {sampleCurrencies.map((amount, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl">
                      <span className="text-neutral-400">¥ {amount}</span>
                      <span className="text-white font-medium">{formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">{t.notifications}</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-emerald-400">{t.success}</div>
                      <div className="text-sm text-neutral-400">{t.successMsg}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-amber-400">{t.warning}</div>
                      <div className="text-sm text-neutral-400">{t.warningMsg}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-red-400">{t.error}</div>
                      <div className="text-sm text-neutral-400">{t.errorMsg}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-blue-400">{t.info}</div>
                      <div className="text-sm text-neutral-400">{t.infoMsg}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">{t.commonPhrases}</h2>
                <div className="grid grid-cols-2 gap-2">
                  {['hello', 'goodbye', 'thankYou', 'please', 'yes', 'no'].map((key) => (
                    <div key={key} className="p-3 bg-neutral-800/50 rounded-xl text-center">
                      <div className="text-xs text-neutral-500 mb-1">{t[key]}</div>
                      <div className="text-sm text-white font-medium">{translations[currentLang]?.[key] || t[key]}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">{t.formSection}</h2>
                <div className="space-y-3">
                  {[
                    { key: 'name', icon: User, placeholder: t.name },
                    { key: 'email', icon: Mail, placeholder: t.email },
                    { key: 'phone', icon: Phone, placeholder: t.phone },
                    { key: 'address', icon: MapPin, placeholder: t.address },
                  ].map((field) => (
                    <div key={field.key} className="relative">
                      <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type={field.key === 'email' ? 'email' : 'text'}
                        placeholder={field.placeholder}
                        value={formData[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-neutral-800 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 px-4 py-2.5 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors text-sm">
                      {t.cancel}
                    </button>
                    <button className="flex-1 px-4 py-2.5 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors text-sm">
                      {t.submit}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
