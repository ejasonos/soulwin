import { Metadata } from 'next'
import { EventsList } from '@/components/events/events-list'

export const metadata: Metadata = {
  title: 'Outreach Events',
  description: 'Manage outreach events and evangelism activities',
}

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Outreach Events</h1>
        <p className="text-muted-foreground">
          Plan and manage evangelism outreach activities
        </p>
      </div>
      
      <EventsList />
    </div>
  )
}
