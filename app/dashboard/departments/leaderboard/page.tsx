import { DashboardHeader } from '@/components/layout/dashboard-header'
import { LeaderboardFull } from '@/components/departments/leaderboard-full'

export default function LeaderboardPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Departments', href: '/dashboard/departments' },
          { label: 'Leaderboard' },
        ]}
      />
      <main className="flex-1 overflow-auto">
        <div className="container py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
            <p className="text-muted-foreground">
              Top performers across all departments
            </p>
          </div>

          <LeaderboardFull />
        </div>
      </main>
    </>
  )
}
