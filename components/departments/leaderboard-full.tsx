'use client'

import { useState } from 'react'
import { Trophy, Medal, Award, Crown, Flame, Target, Users, Heart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface LeaderEntry {
  rank: number
  name: string
  avatar?: string
  department: string
  souls_won: number
  followups_completed: number
  events_attended: number
  points: number
  badges: string[]
  streak_days: number
}

const mockLeaders: LeaderEntry[] = [
  {
    rank: 1,
    name: 'Sarah Thompson',
    department: 'Pastoring',
    souls_won: 45,
    followups_completed: 38,
    events_attended: 12,
    points: 2450,
    badges: ['Harvester', 'Soul Winner', '30-Day Streak'],
    streak_days: 45,
  },
  {
    rank: 2,
    name: 'Michael Chen',
    department: 'Drama',
    souls_won: 38,
    followups_completed: 32,
    events_attended: 15,
    points: 2100,
    badges: ['Evangelist', '30-Day Streak'],
    streak_days: 32,
  },
  {
    rank: 3,
    name: 'Grace Williams',
    department: 'Ushering',
    souls_won: 32,
    followups_completed: 28,
    events_attended: 18,
    points: 1850,
    badges: ['Soul Winner', 'Follow-up Champion'],
    streak_days: 28,
  },
  {
    rank: 4,
    name: 'David Brown',
    department: 'Multimedia',
    souls_won: 28,
    followups_completed: 24,
    events_attended: 10,
    points: 1600,
    badges: ['Outreach Warrior'],
    streak_days: 21,
  },
  {
    rank: 5,
    name: 'Emma Davis',
    department: 'Teens and Children',
    souls_won: 24,
    followups_completed: 22,
    events_attended: 14,
    points: 1400,
    badges: ['7-Day Streak'],
    streak_days: 14,
  },
  {
    rank: 6,
    name: 'James Wilson',
    department: 'Choir',
    souls_won: 22,
    followups_completed: 18,
    events_attended: 8,
    points: 1200,
    badges: ['Rising Star'],
    streak_days: 10,
  },
  {
    rank: 7,
    name: 'Ruth Johnson',
    department: 'Pastoring',
    souls_won: 20,
    followups_completed: 16,
    events_attended: 12,
    points: 1100,
    badges: [],
    streak_days: 7,
  },
  {
    rank: 8,
    name: 'Peter Okonkwo',
    department: 'Drama',
    souls_won: 18,
    followups_completed: 14,
    events_attended: 9,
    points: 950,
    badges: ['First Steps'],
    streak_days: 5,
  },
  {
    rank: 9,
    name: 'Mary Adeyemi',
    department: 'Ushering',
    souls_won: 16,
    followups_completed: 12,
    events_attended: 11,
    points: 850,
    badges: [],
    streak_days: 3,
  },
  {
    rank: 10,
    name: 'John Eze',
    department: 'Multimedia',
    souls_won: 14,
    followups_completed: 10,
    events_attended: 7,
    points: 750,
    badges: [],
    streak_days: 2,
  },
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="size-5 text-yellow-500" />
    case 2:
      return <Medal className="size-5 text-gray-400" />
    case 3:
      return <Medal className="size-5 text-amber-600" />
    default:
      return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>
  }
}

function getRankBg(rank: number) {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/20'
    case 2:
      return 'bg-gradient-to-r from-gray-500/10 to-slate-500/10 border-gray-500/20'
    case 3:
      return 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20'
    default:
      return ''
  }
}

export function LeaderboardFull() {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month')
  const maxPoints = Math.max(...mockLeaders.map((e) => e.points))

  // Top 3 podium
  const top3 = mockLeaders.slice(0, 3)
  const rest = mockLeaders.slice(3)

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
        <TabsList>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
          <TabsTrigger value="quarter">This Quarter</TabsTrigger>
          <TabsTrigger value="year">This Year</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Top 3 Podium */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Second Place */}
        <Card className={cn('order-1 md:order-1', getRankBg(2))}>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="size-20 border-4 border-gray-400">
                  <AvatarImage src={top3[1]?.avatar} />
                  <AvatarFallback className="text-xl bg-gray-100">
                    {top3[1]?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex size-8 items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                  2
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-lg">{top3[1]?.name}</h3>
            <p className="text-sm text-muted-foreground">{top3[1]?.department}</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Heart className="size-4 text-primary" />
              <span className="font-bold text-xl">{top3[1]?.souls_won}</span>
              <span className="text-muted-foreground">souls</span>
            </div>
            <p className="text-sm font-medium text-primary mt-2">{top3[1]?.points.toLocaleString()} pts</p>
          </CardContent>
        </Card>

        {/* First Place */}
        <Card className={cn('order-0 md:order-0 md:-mt-4', getRankBg(1))}>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="size-24 border-4 border-yellow-500">
                  <AvatarImage src={top3[0]?.avatar} />
                  <AvatarFallback className="text-2xl bg-yellow-100">
                    {top3[0]?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <Crown className="size-8 text-yellow-500" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex size-8 items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
                  1
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-lg">{top3[0]?.name}</h3>
            <p className="text-sm text-muted-foreground">{top3[0]?.department}</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Heart className="size-4 text-primary" />
              <span className="font-bold text-2xl">{top3[0]?.souls_won}</span>
              <span className="text-muted-foreground">souls</span>
            </div>
            <p className="text-sm font-medium text-primary mt-2">{top3[0]?.points.toLocaleString()} pts</p>
            <div className="mt-4 flex items-center justify-center gap-1">
              <Flame className="size-4 text-orange-500" />
              <span className="text-sm font-medium">{top3[0]?.streak_days} day streak</span>
            </div>
          </CardContent>
        </Card>

        {/* Third Place */}
        <Card className={cn('order-2 md:order-2', getRankBg(3))}>
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="size-20 border-4 border-amber-600">
                  <AvatarImage src={top3[2]?.avatar} />
                  <AvatarFallback className="text-xl bg-amber-100">
                    {top3[2]?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex size-8 items-center justify-center rounded-full bg-amber-600 text-white font-bold">
                  3
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-lg">{top3[2]?.name}</h3>
            <p className="text-sm text-muted-foreground">{top3[2]?.department}</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Heart className="size-4 text-primary" />
              <span className="font-bold text-xl">{top3[2]?.souls_won}</span>
              <span className="text-muted-foreground">souls</span>
            </div>
            <p className="text-sm font-medium text-primary mt-2">{top3[2]?.points.toLocaleString()} pts</p>
          </CardContent>
        </Card>
      </div>

      {/* Full Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Full Rankings</CardTitle>
          <CardDescription>All members ranked by soul-winning performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-center">Souls</TableHead>
                <TableHead className="text-center">Follow-ups</TableHead>
                <TableHead className="text-center">Events</TableHead>
                <TableHead className="text-center">Streak</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaders.map((entry) => (
                <TableRow key={entry.rank} className={getRankBg(entry.rank)}>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={entry.avatar} />
                        <AvatarFallback className="text-xs">
                          {entry.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{entry.name}</p>
                        {entry.badges.length > 0 && (
                          <div className="flex items-center gap-1 mt-0.5">
                            {entry.badges.slice(0, 2).map((badge) => (
                              <Badge key={badge} variant="secondary" className="text-[10px] h-4 px-1">
                                {badge}
                              </Badge>
                            ))}
                            {entry.badges.length > 2 && (
                              <span className="text-[10px] text-muted-foreground">
                                +{entry.badges.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{entry.department}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Heart className="size-3 text-primary" />
                      {entry.souls_won}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{entry.followups_completed}</TableCell>
                  <TableCell className="text-center">{entry.events_attended}</TableCell>
                  <TableCell className="text-center">
                    {entry.streak_days > 0 && (
                      <div className="flex items-center justify-center gap-1">
                        <Flame className="size-3 text-orange-500" />
                        {entry.streak_days}d
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Progress
                        value={(entry.points / maxPoints) * 100}
                        className="h-1.5 w-16"
                      />
                      <span className="font-medium tabular-nums">
                        {entry.points.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
