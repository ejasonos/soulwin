import { createClient } from '@/lib/supabase/server'
import type { Convert, CreateConvertInput } from '@/lib/types'

export async function fetchConverts(
  churchId: string,
  filters?: {
    followUpStage?: string
    searchTerm?: string
    departmentId?: string
    limit?: number
    offset?: number
  }
) {
  const supabase = createClient()
  
  let query = supabase
    .from('converts')
    .select('*, profiles(first_name, last_name)', { count: 'exact' })
    .eq('church_id', churchId)

  if (filters?.followUpStage) {
    query = query.eq('follow_up_stage', filters.followUpStage)
  }

  if (filters?.departmentId) {
    query = query.eq('department_id', filters.departmentId)
  }

  if (filters?.searchTerm) {
    query = query.or(`full_name.ilike.%${filters.searchTerm}%,phone.ilike.%${filters.searchTerm}%,email.ilike.%${filters.searchTerm}%`)
  }

  query = query
    .order('created_at', { ascending: false })
    .limit(filters?.limit || 50)
    .offset(filters?.offset || 0)

  const { data, error, count } = await query

  if (error) throw error
  return { data: data as Convert[], count: count || 0 }
}

export async function createConvert(data: CreateConvertInput) {
  const supabase = createClient()
  
  const { data: convert, error } = await supabase
    .from('converts')
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return convert as Convert
}

export async function updateConvert(id: string, updates: Partial<Convert>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('converts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Convert
}

export async function getConvertById(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('converts')
    .select('*, profiles(first_name, last_name, email), followups(*)')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getConvertStats(churchId: string, branchId?: string) {
  const supabase = createClient()
  
  let query = supabase
    .from('converts')
    .select('follow_up_stage, salvation_status, baptism_status', { count: 'exact' })
    .eq('church_id', churchId)

  if (branchId) {
    query = query.eq('branch_id', branchId)
  }

  const { data, error, count } = await query

  if (error) throw error

  const stats = {
    totalConverts: count || 0,
    newConverts: data?.filter(c => c.follow_up_stage === 'new').length || 0,
    savedSouls: data?.filter(c => c.salvation_status).length || 0,
    baptized: data?.filter(c => c.baptism_status).length || 0,
    inFollowUp: data?.filter(c => !['completed', 'new'].includes(c.follow_up_stage)).length || 0,
  }

  return stats
}

export async function deleteConvert(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('converts')
    .delete()
    .eq('id', id)

  if (error) throw error
}
