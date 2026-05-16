import { DashboardHeader } from '@/components/layout/dashboard-header'
import { ActivityFeedFull } from '@/components/feed/activity-feed-full'
import { FeedStats } from '@/components/feed/feed-stats'

export default function FeedPage() {
  return (
    <>
      <DashboardHeader breadcrumbs={[{ label: 'Activity Feed' }]} />
      <main className="flex-1 overflow-auto">
        <div className="container py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Activity Feed</h1>
            <p className="text-muted-foreground">
              Real-time updates from across your church
            </p>
          </div>

          <FeedStats />
          <ActivityFeedFull />
        </div>
      </main>
    </>
  )
}
