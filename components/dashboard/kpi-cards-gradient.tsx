'use client'

import { motion } from 'framer-motion'
import { Heart, Users, UserPlus, CalendarCheck, TrendingUp, TrendingDown, Minus, Zap, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactNode
  trend?: {
    value: number
    label: string
    direction: 'up' | 'down' | 'neutral'
  }
  gradient: string
  delay?: number
}

function KPICard({ title, value, description, icon, trend, gradient, delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(212, 169, 66, 0.15)' }}
      className={`relative group rounded-2xl overflow-hidden p-6 backdrop-blur-xl border border-primary/20 cursor-pointer transition-all`}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"></div>
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-primary/30 transition-all"></div>

      {/* Content */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-foreground/70">{title}</p>
            <div className="text-4xl font-bold mt-2 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {value}
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}
          >
            {icon}
          </motion.div>
        </div>

        {(description || trend) && (
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            {trend && (
              <span
                className={cn(
                  "flex items-center text-xs font-semibold",
                  trend.direction === 'up' && "text-green-400",
                  trend.direction === 'down' && "text-red-400",
                  trend.direction === 'neutral' && "text-foreground/50"
                )}
              >
                {trend.direction === 'up' && <TrendingUp className="mr-1 size-3" />}
                {trend.direction === 'down' && <TrendingDown className="mr-1 size-3" />}
                {trend.direction === 'neutral' && <Minus className="mr-1 size-3" />}
                {trend.value > 0 ? '+' : ''}{trend.value}%
              </span>
            )}
            {description && (
              <span className="text-xs text-foreground/50">{description}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

interface KPICardsProps {
  stats: {
    total_souls_won: number
    souls_won_this_week: number
    souls_won_this_month: number
    total_converts: number
    active_followups: number
    completed_followups: number
    first_timers: number
    baptized_count: number
    total_outreach_events: number
    upcoming_events: number
    conversion_rate: number
    retention_rate: number
  }
}

export function KPICards({ stats }: KPICardsProps) {
  const cards = [
    {
      title: 'Total Souls Won',
      value: stats.total_souls_won.toLocaleString(),
      icon: <Heart className="size-6" />,
      trend: { value: 12, label: 'vs last month', direction: 'up' as const },
      gradient: 'from-red-500/40 to-pink-600/40',
      delay: 0,
    },
    {
      title: 'This Week',
      value: stats.souls_won_this_week.toLocaleString(),
      icon: <TrendingUp className="size-6" />,
      trend: { value: 8, label: 'vs last week', direction: 'up' as const },
      gradient: 'from-blue-500/40 to-cyan-600/40',
      delay: 0.1,
    },
    {
      title: 'New Converts',
      value: stats.total_converts.toLocaleString(),
      icon: <Users className="size-6" />,
      trend: { value: 5, label: 'new this month', direction: 'up' as const },
      gradient: 'from-purple-500/40 to-indigo-600/40',
      delay: 0.2,
    },
    {
      title: 'First Timers',
      value: stats.first_timers.toLocaleString(),
      icon: <UserPlus className="size-6" />,
      trend: { value: 3, label: 'this week', direction: 'up' as const },
      gradient: 'from-green-500/40 to-emerald-600/40',
      delay: 0.3,
    },
    {
      title: 'Active Follow-ups',
      value: stats.active_followups.toLocaleString(),
      icon: <Zap className="size-6" />,
      trend: { value: 15, label: 'pending', direction: 'neutral' as const },
      gradient: 'from-orange-500/40 to-amber-600/40',
      delay: 0.4,
    },
    {
      title: 'Baptized',
      value: stats.baptized_count.toLocaleString(),
      icon: <Award className="size-6" />,
      trend: { value: 9, label: 'this month', direction: 'up' as const },
      gradient: 'from-primary/40 to-primary/20',
      delay: 0.5,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <KPICard
          key={idx}
          title={card.title}
          value={card.value}
          icon={card.icon}
          trend={card.trend}
          gradient={card.gradient}
          delay={card.delay}
        />
      ))}
    </div>
  )
}
