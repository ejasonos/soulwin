'use client'

import { Activity, Heart, Users, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    title: 'Today&apos;s Activity',
    value: '24',
    description: 'events recorded',
    icon: Activity,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    title: 'Souls Won Today',
    value: '8',
    description: 'new converts registered',
    icon: Heart,
    color: 'text-red-600 bg-red-100',
  },
  {
    title: 'Active Members',
    value: '45',
    description: 'contributing today',
    icon: Users,
    color: 'text-green-600 bg-green-100',
  },
  {
    title: 'Real-time Updates',
    value: 'Live',
    description: 'syncing now',
    icon: Zap,
    color: 'text-amber-600 bg-amber-100',
  },
]

export function FeedStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title.replace('&apos;', "'")}
            </CardTitle>
            <div className={`flex size-8 items-center justify-center rounded-lg ${stat.color}`}>
              <stat.icon className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
