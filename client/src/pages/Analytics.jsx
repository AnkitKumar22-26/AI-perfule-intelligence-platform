import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, TrendingUp, Users, Percent, DollarSign, Download, Sparkles, Activity } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import VialMeter from '../components/VialMeter.jsx'
import Loader from '../components/Loader.jsx'
import { useToast } from '../components/Toast.jsx'

const RANGES = {
  '7d': {
    label: 'Last 7 days',
    revenue: [
      { month: 'Mon', revenue: 3800 }, { month: 'Tue', revenue: 4200 }, { month: 'Wed', revenue: 3950 },
      { month: 'Thu', revenue: 4600 }, { month: 'Fri', revenue: 5200 }, { month: 'Sat', revenue: 6100 }, { month: 'Sun', revenue: 5400 }
    ],
    users: [
      { month: 'Mon', users: 320 }, { month: 'Tue', users: 355 }, { month: 'Wed', users: 340 },
      { month: 'Thu', users: 410 }, { month: 'Fri', users: 460 }, { month: 'Sat', users: 520 }, { month: 'Sun', users: 480 }
    ],
    kpis: { conversion: '4.6%', revenue: '$7,400', accuracy: '86%', repeat: '35%', growth: '+3.2%' }
  },
  '30d': {
    label: 'Last 30 days',
    revenue: [{ month: 'W1', revenue: 18200 }, { month: 'W2', revenue: 21400 }, { month: 'W3', revenue: 19800 }, { month: 'W4', revenue: 24600 }],
    users: [{ month: 'W1', users: 2100 }, { month: 'W2', users: 2350 }, { month: 'W3', users: 2600 }, { month: 'W4', users: 3020 }],
    kpis: { conversion: '4.8%', revenue: '$31,500', accuracy: '87%', repeat: '38%', growth: '+15.4%' }
  },
  '90d': {
    label: 'Last 90 days',
    revenue: [
      { month: 'Jan', revenue: 18200 }, { month: 'Feb', revenue: 21400 }, { month: 'Mar', revenue: 19800 },
      { month: 'Apr', revenue: 24600 }, { month: 'May', revenue: 27300 }, { month: 'Jun', revenue: 31500 }
    ],
    users: [
      { month: 'Jan', users: 1800 }, { month: 'Feb', users: 2050 }, { month: 'Mar', users: 2200 },
      { month: 'Apr', users: 2600 }, { month: 'May', users: 2900 }, { month: 'Jun', users: 3400 }
    ],
    kpis: { conversion: '5.1%', revenue: '$92,300', accuracy: '89%', repeat: '41%', growth: '+38.6%' }
  }
}

const BEST_SELLERS = [
  { name: 'Velvet Oud', sales: 412 }, { name: 'Rose Noir', sales: 356 }, { name: 'Citrus Bloom', sales: 298 },
  { name: 'Golden Vanilla', sales: 271 }, { name: 'Sea Salt & Cedar', sales: 204 }
]

const CATEGORY_TRAFFIC = [
  { name: 'Woody', value: 32 }, { name: 'Floral', value: 26 }, { name: 'Oud', value: 22 }, { name: 'Citrus', value: 20 }
]
const CAT_COLORS = ['#7C3AED', '#A855F7', '#EC4899', '#94A3B8']

const ACTIVITY_FEED = [
  { text: 'New recommendation generated for a repeat customer', time: '2m ago' },
  { text: 'Sentiment batch analyzed — 128 reviews processed', time: '18m ago' },
  { text: 'Marketing Studio campaign exported (Instagram)', time: '41m ago' },
  { text: 'New chatbot session started', time: '1h ago' },
  { text: '3 recommendations saved by a returning visitor', time: '2h ago' }
]

export default function Analytics() {
  const [range, setRange] = useState('30d')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const data = RANGES[range]

  const changeRange = (key) => {
    if (key === range) return
    setLoading(true)
    setTimeout(() => { setRange(key); setLoading(false) }, 450)
  }

  const exportCSV = () => {
    const rows = [['Period', 'Revenue'], ...data.revenue.map((r) => [r.month, r.revenue])]
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `revenue-${range}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast('CSV exported')
  }

  const KPIS = [
    { icon: Percent, label: 'Conversion rate', value: data.kpis.conversion },
    { icon: DollarSign, label: `Revenue (${data.label.toLowerCase()})`, value: data.kpis.revenue },
    { icon: TrendingUp, label: 'Recommendation accuracy', value: data.kpis.accuracy },
    { icon: Users, label: 'Repeat buyers', value: data.kpis.repeat }
  ]

  const tooltipStyle = { background: 'rgb(var(--c-surface))', border: '1px solid rgb(var(--c-primary) / 0.3)', borderRadius: 10, color: 'rgb(var(--c-text))' }

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="eyebrow inline-flex items-center gap-2"><LayoutDashboard size={13} /> Module 05</span>
          <h1 className="font-display text-3xl md:text-4xl mt-3 text-ivory">Admin Analytics Dashboard</h1>
          <p className="text-mauve mt-3 max-w-xl">Revenue, growth, AI usage and conversion metrics for data-driven decisions.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="card p-1 flex gap-1">
            {Object.entries(RANGES).map(([key, r]) => (
              <button key={key} onClick={() => changeRange(key)} className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${range === key ? 'bg-primary text-white font-medium' : 'text-mauve hover:text-ivory'}`}>
                {r.label}
              </button>
            ))}
          </div>
          <button onClick={exportCSV} className="btn-ghost text-xs px-3 py-2 inline-flex items-center gap-1.5">
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card p-10 mt-10 flex items-center justify-center">
          <Loader label="Refreshing dashboard" />
        </div>
      ) : (
        <motion.div key={range} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-10">
            {KPIS.map((k) => (
              <div key={k.label} className="card p-5">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4"><k.icon size={17} /></div>
                <p className="text-mauve text-xs">{k.label}</p>
                <p className="font-display text-2xl text-ivory mt-1">{k.value}</p>
              </div>
            ))}
            <div className="card p-5">
              <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4"><Activity size={17} /></div>
              <p className="text-mauve text-xs">Monthly growth</p>
              <p className="font-display text-2xl text-ivory mt-1">{data.kpis.growth}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-5 mt-8">
            <div className="card p-6 md:col-span-3">
              <p className="eyebrow mb-4">Revenue trend</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.revenue}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgb(148 163 184 / 0.12)" vertical={false} />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={2} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card p-6 md:col-span-2">
              <p className="eyebrow mb-4">Traffic by fragrance category</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={CATEGORY_TRAFFIC} dataKey="value" nameKey="name" innerRadius={40} outerRadius={65} paddingAngle={3}>
                      {CATEGORY_TRAFFIC.map((c, i) => <Cell key={c.name} fill={CAT_COLORS[i % CAT_COLORS.length]} stroke="none" />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 mt-1 text-[11px] text-mauve">
                {CATEGORY_TRAFFIC.map((c, i) => (
                  <span key={c.name} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: CAT_COLORS[i % CAT_COLORS.length] }} /> {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-5 mt-5">
            <div className="card p-6 md:col-span-2">
              <p className="eyebrow mb-4">User growth</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.users}>
                    <CartesianGrid stroke="rgb(148 163 184 / 0.12)" vertical={false} />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="users" stroke="#EC4899" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card p-6 md:col-span-3">
              <p className="eyebrow mb-4">Best-selling perfumes</p>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={BEST_SELLERS} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} width={90} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="sales" fill="#A855F7" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-5 mt-5">
            <div className="card p-7 md:col-span-3">
              <p className="eyebrow mb-5">AI influence on purchases</p>
              <div className="grid sm:grid-cols-3 gap-6">
                <VialMeter label="Purchases influenced by recommendation" value={62} />
                <VialMeter label="Sessions using the chatbot" value={41} />
                <VialMeter label="Marketing content usage rate" value={73} />
              </div>
              <div className="mt-6 pt-5 border-t border-white/5">
                <p className="eyebrow mb-2 inline-flex items-center gap-2"><Sparkles size={12} /> AI insight</p>
                <p className="text-ivory/85 text-sm leading-relaxed">
                  Recommendation-influenced purchases are up alongside the {data.kpis.growth} growth this period —
                  woody and floral categories are driving the most traffic, and the chatbot is now touching {data.kpis.conversion.replace('%', '')}
                  % of pre-purchase sessions. Consider promoting Velvet Oud and Rose Noir, your top two sellers, in the next campaign.
                </p>
              </div>
            </div>

            <div className="card p-7 md:col-span-2">
              <p className="eyebrow mb-4">Recent activity</p>
              <div className="space-y-3">
                {ACTIVITY_FEED.map((a, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                    <p className="text-xs text-ivory/85 leading-relaxed">{a.text}</p>
                    <span className="text-[10px] text-mauve shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
