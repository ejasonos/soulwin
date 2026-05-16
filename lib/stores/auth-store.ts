import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Profile, Church, Branch, Department, Subteam, MemberRole, RoleName } from '@/lib/types'

interface AuthState {
  profile: Profile | null
  church: Church | null
  branch: Branch | null
  department: Department | null
  subteam: Subteam | null
  roles: MemberRole[]
  isLoading: boolean
  isAuthenticated: boolean
  
  // Actions
  setProfile: (profile: Profile | null) => void
  setChurch: (church: Church | null) => void
  setBranch: (branch: Branch | null) => void
  setDepartment: (department: Department | null) => void
  setSubteam: (subteam: Subteam | null) => void
  setRoles: (roles: MemberRole[]) => void
  setLoading: (loading: boolean) => void
  setAuthenticated: (authenticated: boolean) => void
  clearAuth: () => void
  
  // Computed helpers
  hasRole: (roleName: RoleName) => boolean
  hasPermission: (permission: string) => boolean
  getFullName: () => string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      profile: null,
      church: null,
      branch: null,
      department: null,
      subteam: null,
      roles: [],
      isLoading: true,
      isAuthenticated: false,

      setProfile: (profile) => set({ profile }),
      setChurch: (church) => set({ church }),
      setBranch: (branch) => set({ branch }),
      setDepartment: (department) => set({ department }),
      setSubteam: (subteam) => set({ subteam }),
      setRoles: (roles) => set({ roles }),
      setLoading: (isLoading) => set({ isLoading }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      
      clearAuth: () => set({
        profile: null,
        church: null,
        branch: null,
        department: null,
        subteam: null,
        roles: [],
        isAuthenticated: false,
      }),

      hasRole: (roleName) => {
        // This is a simplified check - in real implementation,
        // we'd join with the roles table to check role names
        const { roles } = get()
        return roles.length > 0 // Simplified for now
      },

      hasPermission: (permission) => {
        const { roles } = get()
        // Simplified permission check
        return roles.length > 0
      },

      getFullName: () => {
        const { profile } = get()
        if (!profile) return ''
        return `${profile.first_name} ${profile.last_name}`.trim()
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        profile: state.profile,
        church: state.church,
        branch: state.branch,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
