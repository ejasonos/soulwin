'use client'

import { motion } from 'framer-motion'
import { User, Phone, Mail, MapPin, Calendar, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ConvertCardProps {
  id: string
  name: string
  phone?: string
  email?: string
  address?: string
  date_met: string
  follow_up_stage: string
  salvation_status: boolean
  baptism_status: boolean
  first_timer: boolean
  delay?: number
  onView?: () => void
}

const stageGradients: Record<string, string> = {
  'new': 'from-blue-500/40 to-cyan-600/40',
  'first_contact': 'from-indigo-500/40 to-blue-600/40',
  'prayer_followup': 'from-purple-500/40 to-pink-600/40',
  'church_attendance': 'from-green-500/40 to-emerald-600/40',
  'membership_class': 'from-orange-500/40 to-amber-600/40',
  'baptism': 'from-primary/40 to-primary/20',
  'worker_training': 'from-red-500/40 to-rose-600/40',
  'completed': 'from-green-500/40 to-teal-600/40',
}

const stageLabelMap: Record<string, string> = {
  'new': 'New',
  'first_contact': 'First Contact',
  'prayer_followup': 'Prayer Followup',
  'church_attendance': 'Church Attendance',
  'membership_class': 'Membership Class',
  'baptism': 'Baptism',
  'worker_training': 'Worker Training',
  'completed': 'Completed',
}

export function ConvertCard({ 
  id, 
  name, 
  phone, 
  email, 
  address, 
  date_met,
  follow_up_stage,
  salvation_status,
  baptism_status,
  first_timer,
  delay = 0,
  onView
}: ConvertCardProps) {
  const gradient = stageGradients[follow_up_stage] || stageGradients['new']
  const stageLabel = stageLabelMap[follow_up_stage] || follow_up_stage

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(212, 169, 66, 0.15)' }}
      className="relative group rounded-xl overflow-hidden backdrop-blur-xl border border-primary/20 hover:border-primary/40 transition-all cursor-pointer p-6"
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white flex-shrink-0">
              <User className="size-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate">{name}</h3>
              <p className="text-xs text-foreground/50 flex items-center gap-1 mt-1">
                <Calendar className="size-3" />
                {new Date(date_met).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex gap-2 ml-2">
            {first_timer && (
              <Badge variant="outline" className="bg-blue-500/20 border-blue-400/50 text-blue-300 text-xs">
                First Timer
              </Badge>
            )}
            {salvation_status && (
              <Badge variant="outline" className="bg-green-500/20 border-green-400/50 text-green-300 text-xs">
                Saved
              </Badge>
            )}
            {baptism_status && (
              <Badge variant="outline" className="bg-primary/20 border-primary/50 text-primary text-xs">
                Baptized
              </Badge>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {phone && (
            <div className="flex items-center gap-2 text-foreground/70">
              <Phone className="size-4 text-primary/70" />
              <span className="truncate">{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-2 text-foreground/70">
              <Mail className="size-4 text-primary/70" />
              <span className="truncate">{email}</span>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-2 text-foreground/70 sm:col-span-2">
              <MapPin className="size-4 text-primary/70 flex-shrink-0" />
              <span className="truncate">{address}</span>
            </div>
          )}
        </div>

        {/* Stage & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-primary" />
            <span className="text-xs font-semibold text-primary">{stageLabel}</span>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-primary hover:bg-primary/10"
            onClick={onView}
          >
            View
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
