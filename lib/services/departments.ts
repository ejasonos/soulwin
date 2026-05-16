import { createClient } from '@/lib/supabase/server'
import type { Department, Subteam } from '@/lib/types'

export async function fetchDepartments(branchId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('departments')
    .select('*, subteams(count)', { count: 'exact' })
    .eq('branch_id', branchId)
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return data as Department[]
}

export async function fetchSubteams(departmentId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('subteams')
    .select('*')
    .eq('department_id', departmentId)
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return data as Subteam[]
}

export async function getDepartmentStats(departmentId: string) {
  const supabase = createClient()
  
  const [
    { data: converts, error: convertError },
    { data: members, error: memberError },
    { data: followups, error: followupError },
  ] = await Promise.all([
    supabase
      .from('converts')
      .select('id, salvation_status, baptism_status', { count: 'exact' })
      .eq('department_id', departmentId),
    supabase
      .from('profiles')
      .select('id', { count: 'exact' })
      .eq('department_id', departmentId),
    supabase
      .from('followups')
      .select('status', { count: 'exact' })
      .eq('converts.department_id', departmentId),
  ])

  if (convertError || memberError || followupError) {
    throw convertError || memberError || followupError
  }

  return {
    soulsWon: converts?.length || 0,
    memberCount: members?.length || 0,
    followupsCompleted: followups?.filter(f => f.status === 'completed').length || 0,
    totalFollowups: followups?.length || 0,
    baptisms: converts?.filter(c => c.baptism_status).length || 0,
  }
}

export async function getLeaderboard(
  churchId: string,
  type: 'member' | 'department' | 'subteam',
  period: 'weekly' | 'monthly' | 'quarterly' | 'yearly',
  branchId?: string
) {
  const supabase = createClient()
  
  let query

  if (type === 'member') {
    query = supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url')
      .eq('church_id', churchId)

    if (branchId) {
      query = query.eq('branch_id', branchId)
    }
  } else if (type === 'department') {
    query = supabase
      .from('departments')
      .select('id, name, color')
      .eq('branches.church_id', churchId)

    if (branchId) {
      query = query.eq('branch_id', branchId)
    }
  } else {
    query = supabase
      .from('subteams')
      .select('id, name')
      .eq('departments.branches.church_id', churchId)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getMemberStats(memberId: string) {
  const supabase = createClient()
  
  const [
    { data: converts, error: convertError },
    { data: followups, error: followupError },
    { data: badges, error: badgeError },
  ] = await Promise.all([
    supabase
      .from('converts')
      .select('id', { count: 'exact' })
      .eq('invited_by_id', memberId),
    supabase
      .from('followups')
      .select('id', { count: 'exact' })
      .eq('assigned_to_id', memberId)
      .eq('status', 'completed'),
    supabase
      .from('member_badges')
      .select('badges(name, points)', { count: 'exact' })
      .eq('profile_id', memberId),
  ])

  if (convertError || followupError || badgeError) {
    throw convertError || followupError || badgeError
  }

  return {
    soulsWon: converts?.length || 0,
    followupsCompleted: followups?.length || 0,
    badgesEarned: badges?.length || 0,
    totalPoints: badges?.reduce((sum, b) => sum + (b.badges?.points || 0), 0) || 0,
  }
}
