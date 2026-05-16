import { createClient } from '@/lib/supabase/server'
import type { Followup } from '@/lib/types'

export async function fetchFollowups(
  convertId: string,
  filters?: {
    status?: string
    stage?: string
    assignedToId?: string
  }
) {
  const supabase = createClient()
  
  let query = supabase
    .from('followups')
    .select('*, profiles(first_name, last_name), converts(full_name)')
    .eq('convert_id', convertId)

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.stage) {
    query = query.eq('stage', filters.stage)
  }

  const { data, error } = await query.order('scheduled_date', { ascending: true })

  if (error) throw error
  return data as Followup[]
}

export async function getFollowupsByUser(userId: string, filters?: { status?: string }) {
  const supabase = createClient()
  
  let query = supabase
    .from('followups')
    .select('*, converts(full_name, phone, email), profiles(first_name, last_name)')
    .eq('assigned_to_id', userId)

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  const { data, error } = await query.order('scheduled_date', { ascending: true })

  if (error) throw error
  return data as Followup[]
}

export async function createFollowup(data: {
  convertId: string
  assignedToId: string
  stage: string
  scheduledDate: string
  notes?: string
}) {
  const supabase = createClient()
  
  const { data: followup, error } = await supabase
    .from('followups')
    .insert([
      {
        convert_id: data.convertId,
        assigned_to_id: data.assignedToId,
        stage: data.stage,
        scheduled_date: data.scheduledDate,
        notes: data.notes,
        status: 'pending',
      },
    ])
    .select()
    .single()

  if (error) throw error
  return followup as Followup
}

export async function updateFollowup(id: string, updates: Partial<Followup>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('followups')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Followup
}

export async function getFollowupStats(churchId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('followups')
    .select('status', { count: 'exact' })
    .eq('converts.church_id', churchId)

  if (error) throw error

  const stats = {
    total: data?.length || 0,
    completed: data?.filter(f => f.status === 'completed').length || 0,
    pending: data?.filter(f => f.status === 'pending').length || 0,
    missed: data?.filter(f => f.status === 'missed').length || 0,
    completionRate: data ? ((data.filter(f => f.status === 'completed').length / data.length) * 100).toFixed(1) : '0',
  }

  return stats
}
