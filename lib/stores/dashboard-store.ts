import { create } from 'zustand'
import type { DashboardStats, DepartmentStats, LeaderboardEntry, ChartDataPoint } from '@/lib/types'

interface DashboardState {
  stats: DashboardStats | null
  departmentStats: DepartmentStats[]
  leaderboard: LeaderboardEntry[]
  soulsPerMonth: ChartDataPoint[]
  departmentComparison: ChartDataPoint[]
  followupCompletion: ChartDataPoint[]
  isLoading: boolean
  error: string | null
  selectedPeriod: 'week' | 'month' | 'quarter' | 'year'
  
  // Actions
  setStats: (stats: DashboardStats) => void
  setDepartmentStats: (stats: DepartmentStats[]) => void
  setLeaderboard: (leaderboard: LeaderboardEntry[]) => void
  setSoulsPerMonth: (data: ChartDataPoint[]) => void
  setDepartmentComparison: (data: ChartDataPoint[]) => void
  setFollowupCompletion: (data: ChartDataPoint[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSelectedPeriod: (period: 'week' | 'month' | 'quarter' | 'year') => void
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  stats: null,
  departmentStats: [],
  leaderboard: [],
  soulsPerMonth: [],
  departmentComparison: [],
  followupCompletion: [],
  isLoading: true,
  error: null,
  selectedPeriod: 'month',

  setStats: (stats) => set({ stats }),
  setDepartmentStats: (departmentStats) => set({ departmentStats }),
  setLeaderboard: (leaderboard) => set({ leaderboard }),
  setSoulsPerMonth: (soulsPerMonth) => set({ soulsPerMonth }),
  setDepartmentComparison: (departmentComparison) => set({ departmentComparison }),
  setFollowupCompletion: (followupCompletion) => set({ followupCompletion }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
}))
