'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Phone, FileText, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface Followup {
  id: string
  convertName: string
  convertPhone: string
  convertEmail: string
  stage: string
  status: string
  scheduledDate: string
  completedDate?: string
  assignedTo: string
  notes?: string
  outcome?: string
  nextAction?: string
}

interface FollowupDetailsProps {
  followup: Followup | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate?: (id: string, updates: Partial<Followup>) => Promise<void>
}

const STAGES = [
  'first_contact',
  'prayer_followup',
  'church_attendance',
  'membership_class',
  'baptism',
  'worker_training',
]

const STATUSES = [
  { id: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { id: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { id: 'missed', label: 'Missed', color: 'bg-red-100 text-red-800' },
  { id: 'escalated', label: 'Escalated', color: 'bg-purple-100 text-purple-800' },
]

export function FollowupDetails({ followup, open, onOpenChange, onUpdate }: FollowupDetailsProps) {
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState<Partial<Followup>>(followup || {})

  if (!followup) return null

  const statusConfig = STATUSES.find(s => s.id === followup.status)

  const handleSave = async () => {
    if (!onUpdate) return
    setLoading(true)
    try {
      await onUpdate(followup.id, formData)
      setEditMode(false)
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{followup.convertName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {followup.convertPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{followup.convertPhone}</span>
                </div>
              )}
              {followup.convertEmail && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">@</span>
                  <span>{followup.convertEmail}</span>
                </div>
              )}
            </div>
          </div>

          {/* Follow-up Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Follow-up Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Stage</label>
                {editMode ? (
                  <Select
                    value={formData.stage || followup.stage}
                    onValueChange={(value) => setFormData({ ...formData, stage: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STAGES.map(stage => (
                        <SelectItem key={stage} value={stage}>
                          {stage.replace(/_/g, ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-gray-600">{followup.stage.replace(/_/g, ' ')}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                {editMode ? (
                  <Select
                    value={formData.status || followup.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map(status => (
                        <SelectItem key={status.id} value={status.id}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={statusConfig?.color}>
                    {statusConfig?.label}
                  </Badge>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Scheduled Date
                </label>
                <p className="text-sm text-gray-600">
                  {format(new Date(followup.scheduledDate), 'MMM d, yyyy')}
                </p>
              </div>

              {followup.completedDate && (
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> Completed Date
                  </label>
                  <p className="text-sm text-gray-600">
                    {format(new Date(followup.completedDate), 'MMM d, yyyy')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <User className="w-4 h-4" /> Assigned To
            </label>
            <p className="text-sm text-gray-600">{followup.assignedTo}</p>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <FileText className="w-4 h-4" /> Notes
            </label>
            {editMode ? (
              <Textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add notes..."
                className="mt-2"
              />
            ) : (
              <p className="text-sm text-gray-600 mt-2">{followup.notes || 'No notes'}</p>
            )}
          </div>

          {/* Outcome */}
          {followup.outcome && (
            <div>
              <label className="text-sm font-medium text-gray-700">Outcome</label>
              <p className="text-sm text-gray-600">{followup.outcome}</p>
            </div>
          )}

          {/* Next Action */}
          {followup.nextAction && (
            <div>
              <label className="text-sm font-medium text-gray-700">Next Action</label>
              <p className="text-sm text-gray-600">{followup.nextAction}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            {editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button onClick={() => setEditMode(true)}>Edit</Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
