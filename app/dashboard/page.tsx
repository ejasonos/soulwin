import { DashboardHeader } from '@/components/layout/dashboard-header'
import { KPICards } from '@/components/dashboard/kpi-cards-gradient'
import {
  SoulsWonChart,
  DepartmentComparisonChart,
  FollowupCompletionChart,
  WeeklyActivityChart,
} from '@/components/dashboard/analytics-charts'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { Leaderboard } from '@/components/dashboard/leaderboard'

const mockStats = {
  total_souls_won: 1247,
  souls_won_this_week: 42,
  souls_won_this_month: 156,
  total_converts: 890,
  active_followups: 34,
  completed_followups: 245,
  first_timers: 23,
  baptized_count: 67,
  total_outreach_events: 28,
  upcoming_events: 5,
  conversion_rate: 78.5,
  retention_rate: 85.2,
}

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <main className="flex-1 overflow-auto">
        <div className="container py-6 space-y-6">
          {/* Welcome Section */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, John</h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your evangelism efforts today.
            </p>
          </div>

          {/* KPI Cards */}
          <KPICards stats={mockStats} />

          {/* Charts Row 1 */}
          <div className="grid gap-4 lg:grid-cols-7">
            <SoulsWonChart />
            <DepartmentComparisonChart />
          </div>

          {/* Charts Row 2 + Activity */}
          <div className="grid gap-4 lg:grid-cols-7">
            <div className="lg:col-span-4 space-y-4">
              <WeeklyActivityChart />
            </div>
            <div className="lg:col-span-3 space-y-4">
              <Leaderboard />
            </div>
          </div>

          {/* Follow-up + Activity Feed */}
          <div className="grid gap-4 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <FollowupCompletionChart />
            </div>
            <div className="lg:col-span-3">
              <ActivityFeed maxHeight="340px" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
