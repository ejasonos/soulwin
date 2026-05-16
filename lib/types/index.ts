// Database Types
export type UUID = string

export interface Church {
  id: UUID
  name: string
  slug: string
  logo_url: string | null
  address: string | null
  phone: string | null
  email: string | null
  website: string | null
  settings: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Branch {
  id: UUID
  church_id: UUID
  name: string
  slug: string
  address: string | null
  pastor_name: string | null
  contact_phone: string | null
  contact_email: string | null
  is_headquarters: boolean
  created_at: string
  updated_at: string
}

export interface Department {
  id: UUID
  branch_id: UUID
  name: string
  description: string | null
  icon: string | null
  color: string | null
  leader_id: UUID | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Subteam {
  id: UUID
  department_id: UUID
  name: string
  description: string | null
  leader_id: UUID | null
  meeting_location: string | null
  meeting_schedule: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Profile {
  id: UUID
  church_id: UUID | null
  branch_id: UUID | null
  department_id: UUID | null
  subteam_id: UUID | null
  first_name: string
  last_name: string
  avatar_url: string | null
  phone: string | null
  email: string | null
  address: string | null
  date_of_birth: string | null
  gender: 'male' | 'female' | 'other' | null
  occupation: string | null
  member_since: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Role {
  id: UUID
  name: string
  description: string | null
  permissions: string[]
  level: number
  created_at: string
}

export type RoleName = 'super_admin' | 'church_admin' | 'branch_admin' | 'department_leader' | 'subteam_leader' | 'member'

export interface MemberRole {
  id: UUID
  profile_id: UUID
  role_id: UUID
  church_id: UUID | null
  branch_id: UUID | null
  department_id: UUID | null
  subteam_id: UUID | null
  granted_by: UUID | null
  granted_at: string
}

export type AgeRange = '0-12' | '13-17' | '18-25' | '26-35' | '36-45' | '46-55' | '56-65' | '65+'

export type FollowUpStage = 
  | 'new' 
  | 'first_contact' 
  | 'prayer_followup' 
  | 'church_attendance' 
  | 'membership_class' 
  | 'baptism' 
  | 'worker_training' 
  | 'completed'

export interface Convert {
  id: UUID
  church_id: UUID
  branch_id: UUID
  department_id: UUID | null
  subteam_id: UUID | null
  invited_by_id: UUID | null
  full_name: string
  phone: string | null
  email: string | null
  address: string | null
  gender: 'male' | 'female' | 'other' | null
  age_range: AgeRange | null
  occupation: string | null
  photo_url: string | null
  prayer_request: string | null
  notes: string | null
  location_lat: number | null
  location_lng: number | null
  location_address: string | null
  date_met: string
  salvation_status: boolean
  baptism_status: boolean
  first_timer: boolean
  church_attendance_status: boolean
  follow_up_stage: FollowUpStage
  is_active: boolean
  created_at: string
  updated_at: string
  // Joined fields
  invited_by?: Profile
  department?: Department
  subteam?: Subteam
}

export type FollowUpStatus = 'pending' | 'in_progress' | 'completed' | 'missed' | 'escalated'

export interface Followup {
  id: UUID
  convert_id: UUID
  assigned_to_id: UUID
  stage: Exclude<FollowUpStage, 'new' | 'completed'>
  status: FollowUpStatus
  scheduled_date: string
  completed_date: string | null
  notes: string | null
  outcome: string | null
  next_action: string | null
  reminder_sent: boolean
  created_at: string
  updated_at: string
  // Joined fields
  convert?: Convert
  assigned_to?: Profile
}

export type EventType = 
  | 'outreach' 
  | 'crusade' 
  | 'door_to_door' 
  | 'street_evangelism' 
  | 'campus_outreach' 
  | 'hospital_visit' 
  | 'prison_ministry' 
  | 'other'

export type EventStatus = 'draft' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export interface OutreachEvent {
  id: UUID
  church_id: UUID
  branch_id: UUID
  department_id: UUID | null
  subteam_id: UUID | null
  created_by_id: UUID
  title: string
  description: string | null
  event_type: EventType
  location_name: string | null
  location_lat: number | null
  location_lng: number | null
  location_address: string | null
  start_date: string
  end_date: string | null
  expected_attendees: number | null
  actual_attendees: number | null
  souls_won: number
  status: EventStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export type ActivityType = 
  | 'convert_registered' 
  | 'followup_completed' 
  | 'outreach_completed' 
  | 'testimony_added' 
  | 'badge_earned' 
  | 'milestone_reached' 
  | 'event_created' 
  | 'member_joined' 
  | 'baptism_completed'

export interface ActivityFeed {
  id: UUID
  church_id: UUID
  branch_id: UUID | null
  department_id: UUID | null
  subteam_id: UUID | null
  actor_id: UUID | null
  activity_type: ActivityType
  title: string
  description: string | null
  metadata: Record<string, unknown>
  is_public: boolean
  created_at: string
  // Joined fields
  actor?: Profile
  department?: Department
  subteam?: Subteam
}

export type BadgeType = 'achievement' | 'milestone' | 'streak' | 'special'

export interface Badge {
  id: UUID
  name: string
  description: string | null
  icon: string | null
  color: string | null
  criteria: Record<string, unknown>
  points: number
  badge_type: BadgeType
  created_at: string
}

export interface MemberBadge {
  id: UUID
  profile_id: UUID
  badge_id: UUID
  earned_at: string
  badge?: Badge
}

export type NotificationType = 
  | 'followup_reminder' 
  | 'new_convert' 
  | 'badge_earned' 
  | 'event_reminder' 
  | 'achievement' 
  | 'announcement' 
  | 'mention' 
  | 'system'

export interface Notification {
  id: UUID
  recipient_id: UUID
  sender_id: UUID | null
  notification_type: NotificationType
  title: string
  message: string | null
  link: string | null
  metadata: Record<string, unknown>
  is_read: boolean
  created_at: string
}

export interface Testimony {
  id: UUID
  church_id: UUID
  branch_id: UUID | null
  author_id: UUID | null
  convert_id: UUID | null
  title: string
  content: string
  media_urls: string[]
  is_approved: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  author?: Profile
  convert?: Convert
}

// Analytics types
export interface DashboardStats {
  total_souls_won: number
  souls_won_this_week: number
  souls_won_this_month: number
  total_converts: number
  active_followups: number
  completed_followups: number
  first_timers: number
  baptized_count: number
  total_outreach_events: number
  upcoming_events: number
  conversion_rate: number
  retention_rate: number
}

export interface ChartDataPoint {
  name: string
  value: number
  fill?: string
}

export interface DepartmentStats {
  department_id: UUID
  department_name: string
  souls_won: number
  followups_completed: number
  active_members: number
  outreach_count: number
}

export interface LeaderboardEntry {
  profile_id: UUID
  profile: Profile
  souls_won: number
  followups_completed: number
  events_attended: number
  points: number
  rank: number
  badges: Badge[]
}

// Form types
export interface ConvertFormData {
  full_name: string
  phone?: string
  email?: string
  address?: string
  gender?: 'male' | 'female' | 'other'
  age_range?: AgeRange
  occupation?: string
  prayer_request?: string
  notes?: string
  date_met: string
  salvation_status: boolean
  baptism_status: boolean
  first_timer: boolean
  church_attendance_status: boolean
  department_id?: UUID
  subteam_id?: UUID
}

// Navigation types
export interface NavItem {
  title: string
  href: string
  icon: string
  badge?: number
  children?: NavItem[]
}

// User context
export interface UserContext {
  profile: Profile | null
  roles: MemberRole[]
  church: Church | null
  branch: Branch | null
  department: Department | null
  subteam: Subteam | null
  permissions: string[]
}
