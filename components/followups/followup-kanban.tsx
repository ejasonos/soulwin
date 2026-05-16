'use client'

import { useState, useEffect } from 'react'
import { useDroppable, useDraggable, DndContext, closestCorners } from '@dnd-kit/core'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ChevronRight, Plus, Calendar, User, Phone } from 'lucide-react'

const FOLLOWUP_STAGES = [
  { id: 'first_contact', name: 'First Contact', color: 'bg-blue-100 text-blue-800' },
  { id: 'prayer_followup', name: 'Prayer Follow-up', color: 'bg-purple-100 text-purple-800' },
  { id: 'church_attendance', name: 'Church Attendance', color: 'bg-amber-100 text-amber-800' },
  { id: 'membership_class', name: 'Membership Class', color: 'bg-green-100 text-green-800' },
  { id: 'baptism', name: 'Baptism', color: 'bg-cyan-100 text-cyan-800' },
  { id: 'worker_training', name: 'Worker Training', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'completed', name: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
]

interface Followup {
  id: string
  stage: string
  convertId: string
  convertName: string
  convertPhone: string
  assignedTo: string
  scheduledDate: string
  status: string
  notes?: string
}

interface FollowupKanbanProps {
  followups: Followup[]
  onStatusChange: (followupId: string, newStage: string) => Promise<void>
}

function KanbanCard({ followup }: { followup: Followup }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: followup.id,
    data: followup,
  })

  const stageConfig = FOLLOWUP_STAGES.find(s => s.id === followup.stage)

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-3 bg-white border rounded-lg cursor-move transition-all ${
        isDragging ? 'opacity-50 shadow-lg scale-105' : 'shadow-sm hover:shadow-md'
      }`}
    >
      <div className="space-y-2">
        <div>
          <p className="font-medium text-sm text-gray-900">{followup.convertName}</p>
          <Badge variant="outline" className={`text-xs ${stageConfig?.color}`}>
            {stageConfig?.name}
          </Badge>
        </div>

        <div className="space-y-1 text-xs text-gray-600">
          {followup.convertPhone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>{followup.convertPhone}</span>
            </div>
          )}
          {followup.scheduledDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(followup.scheduledDate).toLocaleDateString()}</span>
            </div>
          )}
          {followup.assignedTo && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{followup.assignedTo}</span>
            </div>
          )}
        </div>

        {followup.notes && (
          <p className="text-xs text-gray-500 line-clamp-2">{followup.notes}</p>
        )}
      </div>
    </div>
  )
}

function KanbanColumn({
  stage,
  followups,
  onDrop,
}: {
  stage: (typeof FOLLOWUP_STAGES)[0]
  followups: Followup[]
  onDrop: (followupId: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4 transition-colors ${
        isOver ? 'bg-gray-100 ring-2 ring-primary' : ''
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{stage.name}</h3>
          <p className="text-xs text-gray-500">{followups.length} items</p>
        </div>
        <Badge variant="secondary">{followups.length}</Badge>
      </div>

      <div className="space-y-3">
        {followups.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No items in this stage</p>
          </div>
        ) : (
          followups.map(followup => (
            <KanbanCard key={followup.id} followup={followup} />
          ))
        )}
      </div>
    </div>
  )
}

export function FollowupKanban({ followups, onStatusChange }: FollowupKanbanProps) {
  const [loading, setLoading] = useState(false)
  const [selectedFollowup, setSelectedFollowup] = useState<Followup | null>(null)

  const handleDragEnd = async (event: any) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    setLoading(true)
    try {
      await onStatusChange(active.id, over.id)
    } finally {
      setLoading(false)
    }
  }

  const groupedByStage = FOLLOWUP_STAGES.reduce(
    (acc, stage) => {
      acc[stage.id] = followups.filter(f => f.stage === stage.id)
      return acc
    },
    {} as Record<string, Followup[]>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Follow-up Board</h2>
          <p className="text-sm text-gray-600">Manage convert follow-ups by stage</p>
        </div>
      </div>

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {FOLLOWUP_STAGES.map(stage => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              followups={groupedByStage[stage.id] || []}
              onDrop={() => {}}
            />
          ))}
        </div>
      </DndContext>

      {selectedFollowup && (
        <Dialog open={!!selectedFollowup} onOpenChange={() => setSelectedFollowup(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedFollowup.convertName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Stage</label>
                <p className="text-sm text-gray-600">{selectedFollowup.stage}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <p className="text-sm text-gray-600">{selectedFollowup.status}</p>
              </div>
              {selectedFollowup.notes && (
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <p className="text-sm text-gray-600">{selectedFollowup.notes}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
