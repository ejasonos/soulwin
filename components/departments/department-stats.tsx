'use client'

import { Building2, Users, Heart, Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    title: 'Total Departments',
    value: '6',
    description: 'Active departments',
    icon: Building2,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    title: 'Total Members',
    value: '297',
    description: 'Across all departments',
    icon: Users,
    color: 'text-green-600 bg-green-100',
  },
  {
    title: 'Combined Souls',
    value: '900',
    description: 'Total souls won this year',
    icon: Heart,
    color: 'text-red-600 bg-red-100',
  },
  {
    title: 'Top Department',
    value: 'Pastoring',
    description: '245 souls this quarter',
    icon: Trophy,
    color: 'text-amber-600 bg-amber-100',
  },
]

export function DepartmentStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
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
