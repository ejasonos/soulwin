'use client'

import Link from 'next/link'
import { Users, Heart, CalendarCheck, ArrowRight, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Department {
  id: string
  name: string
  description: string
  icon: string
  color: string
  leader_name: string
  leader_avatar?: string
  member_count: number
  souls_won: number
  active_followups: number
  target: number
  subteam_count: number
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Pastoring',
    description: 'Shepherding and discipleship ministry',
    icon: 'Heart',
    color: 'bg-red-500',
    leader_name: 'Pastor James',
    member_count: 45,
    souls_won: 245,
    active_followups: 32,
    target: 300,
    subteam_count: 6,
  },
  {
    id: '2',
    name: 'Drama',
    description: 'Creative arts and drama outreach',
    icon: 'Theater',
    color: 'bg-purple-500',
    leader_name: 'Sister Grace',
    member_count: 38,
    souls_won: 189,
    active_followups: 24,
    target: 200,
    subteam_count: 4,
  },
  {
    id: '3',
    name: 'Ushering',
    description: 'Hospitality and welcoming ministry',
    icon: 'HandHelping',
    color: 'bg-blue-500',
    leader_name: 'Brother David',
    member_count: 52,
    souls_won: 156,
    active_followups: 18,
    target: 180,
    subteam_count: 8,
  },
  {
    id: '4',
    name: 'Multimedia',
    description: 'Technical and media ministry',
    icon: 'Video',
    color: 'bg-amber-500',
    leader_name: 'Sister Faith',
    member_count: 28,
    souls_won: 134,
    active_followups: 15,
    target: 150,
    subteam_count: 3,
  },
  {
    id: '5',
    name: 'Teens and Children',
    description: 'Youth and children ministry',
    icon: 'Baby',
    color: 'bg-green-500',
    leader_name: 'Pastor Ruth',
    member_count: 62,
    souls_won: 98,
    active_followups: 28,
    target: 120,
    subteam_count: 5,
  },
  {
    id: '6',
    name: 'Choir',
    description: 'Praise and worship ministry',
    icon: 'Music',
    color: 'bg-pink-500',
    leader_name: 'Brother Emmanuel',
    member_count: 72,
    souls_won: 78,
    active_followups: 12,
    target: 100,
    subteam_count: 4,
  },
]

export function DepartmentCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {mockDepartments.map((dept) => (
        <Card key={dept.id} className="group relative overflow-hidden hover:shadow-lg transition-shadow">
          <div className={cn('absolute top-0 left-0 w-1 h-full', dept.color)} />
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{dept.name}</CardTitle>
                <CardDescription className="line-clamp-1">{dept.description}</CardDescription>
              </div>
              <Badge variant="secondary">{dept.subteam_count} teams</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Leader */}
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage src={dept.leader_avatar} />
                <AvatarFallback className="bg-muted text-sm">
                  {dept.leader_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{dept.leader_name}</p>
                <p className="text-xs text-muted-foreground">Department Leader</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-muted/50 p-2">
                <div className="flex items-center justify-center gap-1 text-primary">
                  <Heart className="size-3" />
                  <span className="text-lg font-bold">{dept.souls_won}</span>
                </div>
                <p className="text-xs text-muted-foreground">Souls Won</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2">
                <div className="flex items-center justify-center gap-1 text-primary">
                  <Users className="size-3" />
                  <span className="text-lg font-bold">{dept.member_count}</span>
                </div>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2">
                <div className="flex items-center justify-center gap-1 text-primary">
                  <CalendarCheck className="size-3" />
                  <span className="text-lg font-bold">{dept.active_followups}</span>
                </div>
                <p className="text-xs text-muted-foreground">Follow-ups</p>
              </div>
            </div>

            {/* Progress to target */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Target Progress</span>
                <span className="font-medium">
                  {Math.round((dept.souls_won / dept.target) * 100)}%
                </span>
              </div>
              <Progress value={(dept.souls_won / dept.target) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {dept.souls_won} of {dept.target} souls
              </p>
            </div>

            {/* Action */}
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`/dashboard/departments/${dept.id}`}>
                View Details
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
