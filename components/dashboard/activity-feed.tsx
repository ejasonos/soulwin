'use client'

import { formatDistanceToNow } from 'date-fns'
import { Heart, Users, Award, CalendarCheck, MessageSquare, Droplet, Trophy } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  convert_registered: 'bg-green-500/10 text-green-600',
  followup_completed: 'bg-blue-500/10 text-blue-600',
  outreach_completed: 'bg-amber-500/10 text-amber-600',
  testimony_added: 'bg-purple-500/10 text-purple-600',
  badge_earned: 'bg-yellow-500/10 text-yellow-600',
  milestone_reached: 'bg-pink-500/10 text-pink-600',
  event_created: 'bg-cyan-500/10 text-cyan-600',
  member_joined: 'bg-indigo-500/10 text-indigo-600',
  baptism_completed: 'bg-sky-500/10 text-sky-600',
}

// Mock data
const mockActivities: ActivityItem[] = [
  {
    id: '1',
    activity_type: 'convert_registered',
    title: 'New soul won!',
    description: 'Sarah Johnson was registered as a new convert',
    actor_name: 'John Doe',
    department_name: 'Drama',
    subteam_name: 'Team Bluey Street',
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    activity_type: 'followup_completed',
    title: 'Follow-up completed',
    description: 'Michael Brown completed first contact stage',
    actor_name: 'Jane Smith',
    department_name: 'Pastoring',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '3',
    activity_type: 'badge_earned',
    title: 'Badge earned!',
    description: 'You earned the Soul Winner badge',
    actor_name: 'You',
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: '4',
    activity_type: 'outreach_completed',
    title: 'Outreach completed',
    description: 'Lekki Zone outreach reached 45 people',
    actor_name: 'Team Lekki',
    department_name: 'Ushering',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '5',
    activity_type: 'baptism_completed',
    title: 'Baptism milestone!',
    description: 'David Chen completed baptism',
    actor_name: 'Pastor James',
    department_name: 'Pastoring',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: '6',
    activity_type: 'testimony_added',
    title: 'New testimony',
    description: 'Amazing healing testimony shared',
    actor_name: 'Mary Johnson',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: '7',
    activity_type: 'event_created',
    title: 'New outreach event',
    description: 'Campus Outreach scheduled for Saturday',
    actor_name: 'Admin',
    department_name: 'Teens and Children',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: '8',
    activity_type: 'milestone_reached',
    title: 'Team milestone!',
    description: 'Drama department reached 200 souls this quarter',
    actor_name: 'Drama Team',
    department_name: 'Drama',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
]

interface ActivityFeedProps {
  activities?: ActivityItem[]
  maxHeight?: string
}

export function ActivityFeed({ activities = mockActivities, maxHeight = '400px' }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>Recent activities across your church</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="px-6" style={{ height: maxHeight }}>
          <div className="space-y-4 pb-4">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full',
                      activityColors[activity.activity_type]
                    )}
                  >
                    {activityIcons[activity.activity_type]}
                  </div>
                  {index < activities.length - 1 && (
                    <div className="flex-1 w-px bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 space-y-1 pb-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    {activity.department_name && (
                      <Badge variant="secondary" className="text-xs">
                        {activity.department_name}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activity.actor_name}</span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
