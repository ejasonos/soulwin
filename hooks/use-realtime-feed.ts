'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ActivityFeed } from '@/lib/types'
import type { RealtimeChannel } from '@supabase/supabase-js'

export function useRealtimeFeed(churchId?: string) {
  const [activities, setActivities] = useState<ActivityFeed[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)

  const fetchActivities = useCallback(async () => {
    if (!churchId) return
    
    const supabase = createClient()
    const { data, error } = await supabase
      .from('activity_feed')
      .select('*')
      .eq('church_id', churchId)
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(50)

    if (!error && data) {
      setActivities(data as ActivityFeed[])
    }
    setIsLoading(false)
  }, [churchId])

  useEffect(() => {
    if (!churchId) {
      setIsLoading(false)
      return
    }

    fetchActivities()

    const supabase = createClient()
    
    // Subscribe to realtime changes
    const channel: RealtimeChannel = supabase
      .channel(`activity-feed-${churchId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_feed',
          filter: `church_id=eq.${churchId}`,
        },
        (payload) => {
          const newActivity = payload.new as ActivityFeed
          setActivities((prev) => [newActivity, ...prev].slice(0, 50))
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED')
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [churchId, fetchActivities])

  return { activities, isLoading, isConnected, refetch: fetchActivities }
}

export function useRealtimeNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchNotifications = useCallback(async () => {
    if (!userId) return
    
    const supabase = createClient()
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('recipient_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)

    if (!error && data) {
      setNotifications(data)
      setUnreadCount(data.filter((n: any) => !n.is_read).length)
    }
    setIsLoading(false)
  }, [userId])

  const markAsRead = useCallback(async (notificationId: string) => {
    const supabase = createClient()
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, is_read: true } : n
      )
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }, [])

  const markAllAsRead = useCallback(async () => {
    if (!userId) return
    
    const supabase = createClient()
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('recipient_id', userId)
      .eq('is_read', false)

    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
    setUnreadCount(0)
  }, [userId])

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    fetchNotifications()

    const supabase = createClient()
    
    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `recipient_id=eq.${userId}`,
        },
        (payload) => {
          const newNotification = payload.new
          setNotifications((prev) => [newNotification, ...prev].slice(0, 20))
          setUnreadCount((prev) => prev + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, fetchNotifications])

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  }
}
