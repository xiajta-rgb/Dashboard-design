import { LayoutDashboard, BarChart3, Users, Package, ShoppingCart, MessageSquare, Settings } from 'lucide-react'

export const sidebarIcons = {
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  customers: Users,
  products: Package,
  orders: ShoppingCart,
  messages: MessageSquare,
  settings: Settings,
}

export const kpiData = [
  { title: 'Total Revenue', value: '$48,295', change: '+12.5%', trend: 'up' },
  { title: 'Active Users', value: '24,589', change: '+8.2%', trend: 'up' },
  { title: 'Conversion Rate', value: '3.42%', change: '-0.8%', trend: 'down' },
  { title: 'Avg. Session', value: '4m 32s', change: '+5.1%', trend: 'up' },
  { title: 'Bounce Rate', value: '28.4%', change: '-2.3%', trend: 'up' },
  { title: 'Page Views', value: '1.2M', change: '+15.7%', trend: 'up' },
]

export const chartData = [
  { name: 'Jan', revenue: 4000, users: 2400, conversion: 2.4 },
  { name: 'Feb', revenue: 3000, users: 1398, conversion: 2.8 },
  { name: 'Mar', revenue: 5000, users: 3800, conversion: 3.2 },
  { name: 'Apr', revenue: 4780, users: 3908, conversion: 3.5 },
  { name: 'May', revenue: 5890, users: 4800, conversion: 3.1 },
  { name: 'Jun', revenue: 6390, users: 3800, conversion: 3.8 },
  { name: 'Jul', revenue: 7490, users: 4300, conversion: 4.1 },
  { name: 'Aug', revenue: 6800, users: 4100, conversion: 3.6 },
  { name: 'Sep', revenue: 7200, users: 4600, conversion: 3.9 },
  { name: 'Oct', revenue: 8100, users: 5200, conversion: 4.3 },
  { name: 'Nov', revenue: 7600, users: 4900, conversion: 4.0 },
  { name: 'Dec', revenue: 9200, users: 5800, conversion: 4.5 },
]

export const barChartData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
]

export const tableData = [
  { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', status: 'Active', lastActive: '2 min ago' },
  { id: 2, name: 'Marcus Rivera', email: 'marcus@example.com', role: 'Editor', status: 'Active', lastActive: '15 min ago' },
  { id: 3, name: 'Elena Volkov', email: 'elena@example.com', role: 'Viewer', status: 'Inactive', lastActive: '2 days ago' },
  { id: 4, name: 'James Park', email: 'james@example.com', role: 'Editor', status: 'Active', lastActive: '1 hour ago' },
  { id: 5, name: 'Aisha Patel', email: 'aisha@example.com', role: 'Admin', status: 'Active', lastActive: '5 min ago' },
  { id: 6, name: 'Liam O\'Brien', email: 'liam@example.com', role: 'Viewer', status: 'Pending', lastActive: 'Never' },
]

export const navItems = [
  { label: 'Overview', key: 'overview' },
  { label: 'Analytics', key: 'analytics' },
  { label: 'Users', key: 'users' },
  { label: 'Reports', key: 'reports' },
  { label: 'Settings', key: 'settings' },
]

export const sidebarItems = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Analytics', key: 'analytics' },
  { label: 'Customers', key: 'customers' },
  { label: 'Products', key: 'products' },
  { label: 'Orders', key: 'orders' },
  { label: 'Messages', key: 'messages' },
  { label: 'Settings', key: 'settings' },
]
