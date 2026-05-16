'use client'

import { Heart, Users, UserPlus, CalendarCheck, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  className?: string
}

function KPICard({ title, value, description, icon, trend, className }: KPICardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center gap-2 mt-1">
            {trend && (
              <span
                className={cn(
                  "flex items-center text-xs font-medium",
                  trend.direction === 'up' && "text-green-600",
                  trend.direction === 'down' && "text-red-600",
                  trend.direction === 'neutral' && "text-muted-foreground"
                )}
              >
                {trend.direction === 'up' && <TrendingUp className="mr-1 size-3" />}
                {trend.direction === 'down' && <TrendingDown className="mr-1 size-3" />}
                {trend.direction === 'neutral' && <Minus className="mr-1 size-3" />}
                {trend.value > 0 ? '+' : ''}{trend.value}%
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
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
      icon: <Heart className="size-4" />,
      trend: { value: 12, label: 'vs last month', direction: 'up' as const },
      description: 'vs last month',
    },
    {
      title: 'This Week',
      value: stats.souls_won_this_week.toLocaleString(),
      icon: <TrendingUp className="size-4" />,
      trend: { value: 8, label: 'vs last week', direction: 'up' as const },
      description: 'souls won',
    },
    {
      title: 'New Converts',
      value: stats.total_converts.toLocaleString(),
      icon: <Users className="size-4" />,
      trend: { value: 5, label: 'new this month', direction: 'up' as const },
      description: 'total registered',
    },
    {
      title: 'First Timers',
      value: stats.first_timers.toLocaleString(),
      icon: <UserPlus className="size-4" />,
      trend: { value: 3, label: 'this week', direction: 'up' as const },
      description: 'awaiting follow-up',
    },
    {
      title: 'Active Follow-ups',
      value: stats.active_followups.toLocaleString(),
      icon: <CalendarCheck className="size-4" />,
      trend: { value: -2, label: 'pending', direction: 'down' as const },
      description: 'in progress',
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversion_rate}%`,
      icon: <TrendingUp className="size-4" />,
      trend: { value: 4, label: 'improvement', direction: 'up' as const },
      description: 'visitor to member',
    },
    {
      title: 'Baptized',
      value: stats.baptized_count.toLocaleString(),
      icon: <Heart className="size-4" />,
      trend: { value: 15, label: 'this quarter', direction: 'up' as const },
      description: 'total baptisms',
    },
    {
      title: 'Upcoming Events',
      value: stats.upcoming_events.toLocaleString(),
      icon: <CalendarCheck className="size-4" />,
      description: 'scheduled outreaches',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <KPICard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          trend={card.trend}
          description={card.description}
        />
      ))}
    </div>
  )
}

// Mock data for development
export const mockStats = {
  total_souls_won: 1284,
  souls_won_this_week: 47,
  souls_won_this_month: 186,
  total_converts: 892,
  active_followups: 124,
  completed_followups: 768,
  first_timers: 56,
  baptized_count: 342,
  total_outreach_events: 89,
  upcoming_events: 12,
  conversion_rate: 72,
  retention_rate: 84,
}
