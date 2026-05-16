import { createClient } from '@/lib/supabase/server'

export async function fetchActivityFeed(
  churchId: string,
  filters?: {
    departmentId?: string
    activityType?: string
    limit?: number
    offset?: number
  }
) {
  const supabase = createClient()
  
  let query = supabase
    .from('activity_feed')
    .select('*, profiles(first_name, last_name, avatar_url)')
    .eq('church_id', churchId)
    .eq('is_public', true)

  if (filters?.departmentId) {
    query = query.eq('department_id', filters.departmentId)
  }

  if (filters?.activityType) {
    query = query.eq('activity_type', filters.activityType)
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .limit(filters?.limit || 50)
    .offset(filters?.offset || 0)

  if (error) throw error
  return data
}

export async function createActivityFeed(data: {
  churchId: string
  branchId: string
  departmentId?: string
  subteamId?: string
  actorId?: string
  activityType: string
  title: string
  description?: string
  metadata?: Record<string, any>
}) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('activity_feed')
    .insert([
      {
        church_id: data.churchId,
        branch_id: data.branchId,
        department_id: data.departmentId,
        subteam_id: data.subteamId,
        actor_id: data.actorId,
        activity_type: data.activityType,
        title: data.title,
        description: data.description,
        metadata: data.metadata,
        is_public: true,
      },
    ])

  if (error) throw error
}

export async function getActivityStats(churchId: string, branchId?: string) {
  const supabase = createClient()
  
  let query = supabase
    .from('activity_feed')
    .select('activity_type', { count: 'exact' })
    .eq('church_id', churchId)
    .eq('is_public', true)

  if (branchId) {
    query = query.eq('branch_id', branchId)
  }

  const { data, error } = await query

  if (error) throw error

  const stats = {
    convertsRegistered: data?.filter(a => a.activity_type === 'convert_registered').length || 0,
    followupsCompleted: data?.filter(a => a.activity_type === 'followup_completed').length || 0,
    outreachCompleted: data?.filter(a => a.activity_type === 'outreach_completed').length || 0,
    testimoniesAdded: data?.filter(a => a.activity_type === 'testimony_added').length || 0,
  }

  return stats
}
