'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { FollowupKanban } from '@/components/followups/followup-kanban'
import { FollowupDetails } from '@/components/followups/followup-details'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus } from 'lucide-react'

interface Followup {
  id: string
  stage: string
  convertId: string
  convertName: string
  convertPhone: string
  convertEmail: string
  assignedTo: string
  scheduledDate: string
  status: string
  notes?: string
  outcome?: string
  nextAction?: string
  completedDate?: string
}

function FollowupsContent() {
  const router = useRouter()
  const [followups, setFollowups] = useState<Followup[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFollowup, setSelectedFollowup] = useState<Followup | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [view, setView] = useState<'kanban' | 'timeline'>('kanban')

  useEffect(() => {
    loadFollowups()
  }, [])

  const loadFollowups = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/followups')
      if (!response.ok) throw new Error('Failed to load followups')
      const data = await response.json()
      setFollowups(data)
    } catch (error) {
      console.error('Error loading followups:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (followupId: string, newStage: string) => {
    try {
      const response = await fetch('/api/followups', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: followupId,
          stage: newStage,
        }),
      })

      if (!response.ok) throw new Error('Failed to update followup')
      
      setFollowups(prev =>
        prev.map(f =>
          f.id === followupId ? { ...f, stage: newStage } : f
        )
      )
    } catch (error) {
      console.error('Error updating followup:', error)
    }
  }

  const handleSelectFollowup = (followup: Followup) => {
    setSelectedFollowup(followup)
    setDetailsOpen(true)
  }

  const handleUpdateFollowup = async (id: string, updates: Partial<Followup>) => {
    try {
      const response = await fetch('/api/followups', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })

      if (!response.ok) throw new Error('Failed to update followup')
      
      const updated = await response.json()
      setFollowups(prev => prev.map(f => f.id === id ? updated : f))
      setSelectedFollowup(updated)
    } catch (error) {
      console.error('Error updating followup:', error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-48" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Follow-up Management</h1>
          <p className="text-gray-600">Manage convert follow-ups and track progress</p>
        </div>
        <Button onClick={() => router.push('/dashboard/converts/new')}>
          <Plus className="w-4 h-4 mr-2" />
          New Convert
        </Button>
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as 'kanban' | 'timeline')}>
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="mt-6">
          <Card>
            <div className="p-6">
              <FollowupKanban followups={followups} onStatusChange={handleStatusChange} />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <div className="p-6">
              <div className="space-y-4">
                {followups.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No follow-ups to display</p>
                  </div>
                ) : (
                  followups
                    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
                    .map(followup => (
                      <div
                        key={followup.id}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSelectFollowup(followup)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{followup.convertName}</p>
                            <p className="text-sm text-gray-600">{followup.stage.replace(/_/g, ' ')}</p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(followup.scheduledDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <FollowupDetails
        followup={selectedFollowup}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onUpdate={handleUpdateFollowup}
      />
    </div>
  )
}

export default function FollowupsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FollowupsContent />
    </Suspense>
  )
}
