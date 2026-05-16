'use client'

import { Trophy, Medal, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface LeaderboardEntry {
  rank: number
  name: string
  avatar?: string
  department: string
  souls_won: number
  points: number
  badges: string[]
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Sarah Thompson',
    department: 'Pastoring',
    souls_won: 45,
    points: 2450,
    badges: ['Harvester', 'Soul Winner'],
  },
  {
    rank: 2,
    name: 'Michael Chen',
    department: 'Drama',
    souls_won: 38,
    points: 2100,
    badges: ['Evangelist', '30-Day Streak'],
  },
  {
    rank: 3,
    name: 'Grace Williams',
    department: 'Ushering',
    souls_won: 32,
    points: 1850,
    badges: ['Soul Winner', 'Follow-up Champion'],
  },
  {
    rank: 4,
    name: 'David Brown',
    department: 'Multimedia',
    souls_won: 28,
    points: 1600,
    badges: ['Outreach Warrior'],
  },
  {
    rank: 5,
    name: 'Emma Davis',
    department: 'Teens and Children',
    souls_won: 24,
    points: 1400,
    badges: ['7-Day Streak'],
  },
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="size-5 text-yellow-500" />
    case 2:
      return <Medal className="size-5 text-gray-400" />
    case 3:
      return <Medal className="size-5 text-amber-600" />
    default:
      return <span className="text-sm font-bold text-muted-foreground">{rank}</span>
  }
}

function getRankBg(rank: number) {
  switch (rank) {
    case 1:
      return 'bg-yellow-500/10 border-yellow-500/20'
    case 2:
      return 'bg-gray-500/10 border-gray-500/20'
    case 3:
      return 'bg-amber-500/10 border-amber-500/20'
    default:
      return 'bg-muted/50'
  }
}

interface LeaderboardProps {
  entries?: LeaderboardEntry[]
  title?: string
  description?: string
}

export function Leaderboard({
  entries = mockLeaderboard,
  title = 'Top Soul Winners',
  description = 'This month\'s leaderboard',
}: LeaderboardProps) {
  const maxPoints = Math.max(...entries.map((e) => e.points))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="size-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.rank}
              className={cn(
                'flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50',
                getRankBg(entry.rank)
              )}
            >
              <div className="flex size-8 items-center justify-center">
                {getRankIcon(entry.rank)}
              </div>
              <Avatar className="size-10">
                <AvatarImage src={entry.avatar} alt={entry.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {entry.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{entry.name}</p>
                  {entry.rank <= 3 && (
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {entry.department}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {entry.souls_won} souls
                  </span>
                  <Progress
                    value={(entry.points / maxPoints) * 100}
                    className="h-1.5 flex-1 max-w-24"
                  />
                  <span className="text-xs font-medium text-primary">
                    {entry.points.toLocaleString()} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
