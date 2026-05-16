'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
  Heart,
  Users,
  Award,
  CalendarCheck,
  MessageSquare,
  Droplet,
  Trophy,
  Filter,
  Bell,
  RefreshCw,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { ActivityType } from '@/lib/types'

interface ActivityItem {
  id: string
  activity_type: ActivityType
  title: string
  description: string
  actor_name: string
  actor_avatar?: string
  department_name?: string
  subteam_name?: string
  created_at: string
  metadata?: Record<string, unknown>
}

const activityIcons: Record<ActivityType, React.ReactNode> = {
  convert_registered: <Heart className="size-4" />,
  followup_completed: <CalendarCheck className="size-4" />,
  outreach_completed: <Users className="size-4" />,
  testimony_added: <MessageSquare className="size-4" />,
  badge_earned: <Award className="size-4" />,
  milestone_reached: <Trophy className="size-4" />,
  event_created: <CalendarCheck className="size-4" />,
  member_joined: <Users className="size-4" />,
  baptism_completed: <Droplet className="size-4" />,
}

const activityColors: Record<ActivityType, string> = {
  convert_registered: 'bg-green-500/10 text-green-600 border-green-500/20',
  followup_completed: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  outreach_completed: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  testimony_added: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  badge_earned: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  milestone_reached: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  event_created: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
  member_joined: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
  baptism_completed: 'bg-sky-500/10 text-sky-600 border-sky-500/20',
}

const activityLabels: Record<ActivityType, string> = {
  convert_registered: 'Convert Registered',
  followup_completed: 'Follow-up Completed',
  outreach_completed: 'Outreach Completed',
  testimony_added: 'Testimony Added',
  badge_earned: 'Badge Earned',
  milestone_reached: 'Milestone Reached',
  event_created: 'Event Created',
  member_joined: 'Member Joined',
  baptism_completed: 'Baptism Completed',
}

// Mock data generator
function generateMockActivities(): ActivityItem[] {
  const activities: ActivityItem[] = [
    {
      id: '1',
      activity_type: 'convert_registered',
      title: 'New soul won!',
      description: 'Sarah Johnson was registered as a new convert after the street outreach',
      actor_name: 'John Doe',
      department_name: 'Drama',
      subteam_name: 'Team Bluey Street',
      created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    },
    {
      id: '2',
      activity_type: 'followup_completed',
      title: 'Follow-up completed',
      description: 'Michael Brown completed first contact stage and is ready for prayer follow-up',
      actor_name: 'Jane Smith',
      department_name: 'Pastoring',
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: '3',
      activity_type: 'badge_earned',
      title: 'Badge earned: Soul Winner',
      description: 'Grace Williams earned the Soul Winner badge for reaching 10 souls this month',
      actor_name: 'Grace Williams',
      department_name: 'Ushering',
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: '4',
      activity_type: 'outreach_completed',
      title: 'Outreach completed',
      description: 'Lekki Zone outreach reached 45 people with 12 new converts recorded',
      actor_name: 'Team Lekki',
      department_name: 'Ushering',
      created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      id: '5',
      activity_type: 'baptism_completed',
      title: 'Baptism milestone!',
      description: 'David Chen completed baptism after 3 months of discipleship',
      actor_name: 'Pastor James',
      department_name: 'Pastoring',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: '6',
      activity_type: 'testimony_added',
      title: 'New testimony shared',
      description: 'Amazing healing testimony from the prayer and fasting week',
      actor_name: 'Mary Johnson',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
      id: '7',
      activity_type: 'event_created',
      title: 'New outreach event',
      description: 'Campus Outreach scheduled for Saturday at University of Lagos',
      actor_name: 'Admin',
      department_name: 'Teens and Children',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: '8',
      activity_type: 'milestone_reached',
      title: 'Team milestone!',
      description: 'Drama department reached 200 souls this quarter - breaking all records!',
      actor_name: 'Drama Team',
      department_name: 'Drama',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    },
    {
      id: '9',
      activity_type: 'member_joined',
      title: 'New team member',
      description: 'Emmanuel Okafor joined the Ushering department',
      actor_name: 'Emmanuel Okafor',
      department_name: 'Ushering',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
    {
      id: '10',
      activity_type: 'convert_registered',
      title: 'Multiple souls won!',
      description: '5 new converts registered from hospital visitation ministry',
      actor_name: 'Visitation Team',
      department_name: 'Pastoring',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: '11',
      activity_type: 'followup_completed',
      title: 'Follow-up milestone',
      description: 'Ruth completed all follow-up stages and is now a church worker',
      actor_name: 'Pastor Ruth',
      department_name: 'Pastoring',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    },
    {
      id: '12',
      activity_type: 'badge_earned',
      title: 'Badge earned: 30-Day Streak',
      description: 'Peter maintained a 30-day soul winning streak!',
      actor_name: 'Peter Adeyemi',
      department_name: 'Drama',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
  ]
  return activities
}

export function ActivityFeedFull() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [newActivityCount, setNewActivityCount] = useState(0)

  useEffect(() => {
    setActivities(generateMockActivities())
    
    // Simulate new activities coming in
    const interval = setInterval(() => {
      setNewActivityCount((prev) => prev + 1)
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const filteredActivities = activities.filter((activity) => {
    if (filter === 'all') return true
    return activity.activity_type === filter
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 500))
    setActivities(generateMockActivities())
    setNewActivityCount(0)
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-4">
      {/* Filters and Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="mr-2 size-4" />
              <SelectValue placeholder="Filter activities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              {Object.entries(activityLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {newActivityCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <Bell className="mr-2 size-4" />
              {newActivityCount} new {newActivityCount === 1 ? 'activity' : 'activities'}
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn('size-4', isRefreshing && 'animate-spin')} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Live updates from your church community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No activities found matching your filter.
              </div>
            ) : (
              filteredActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={cn(
                    'relative flex gap-4 pb-4',
                    index < filteredActivities.length - 1 && 'border-b'
                  )}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-full border',
                        activityColors[activity.activity_type]
                      )}
                    >
                      {activityIcons[activity.activity_type]}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{activity.title}</p>
                      {activity.department_name && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.department_name}
                        </Badge>
                      )}
                      {activity.subteam_name && (
                        <Badge variant="outline" className="text-xs">
                          {activity.subteam_name}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Avatar className="size-4">
                          <AvatarImage src={activity.actor_avatar} />
                          <AvatarFallback className="text-[8px]">
                            {activity.actor_name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{activity.actor_name}</span>
                      </div>
                      <span>•</span>
                      <span>
                        {formatDistanceToNow(new Date(activity.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
