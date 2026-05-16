import { DashboardHeader } from '@/components/layout/dashboard-header'
import { ConvertForm } from '@/components/converts/convert-form'

export default function NewConvertPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Converts', href: '/dashboard/converts' },
          { label: 'Register New Convert' },
        ]}
      />
      <main className="flex-1 overflow-auto">
        <div className="container max-w-3xl py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Register New Convert</h1>
            <p className="text-muted-foreground">
              Add a new soul to your church&apos;s converts database
            </p>
          </div>

          <ConvertForm />
        </div>
      </main>
    </>
  )
}
