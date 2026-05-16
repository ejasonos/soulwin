import { DashboardHeader } from '@/components/layout/dashboard-header'
import { DepartmentCards } from '@/components/departments/department-cards'
import { DepartmentStats } from '@/components/departments/department-stats'

export default function DepartmentsPage() {
  return (
    <>
      <DashboardHeader breadcrumbs={[{ label: 'Departments' }]} />
      <main className="flex-1 overflow-auto">
        <div className="container py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
            <p className="text-muted-foreground">
              View and manage your church&apos;s department performance
            </p>
          </div>

          <DepartmentStats />
          <DepartmentCards />
        </div>
      </main>
    </>
  )
}
