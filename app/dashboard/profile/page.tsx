'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Trophy, Award, Flame, Target, Users, Heart } from 'lucide-react'

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
  subteam: string
  avatar: string
  memberSince: string
}

interface Stats {
  soulsWon: number
  followupsCompleted: number
  badgesEarned: number
  totalPoints: number
  attendanceRate: number
  streak: number
}

interface Badge {
  id: string
  name: string
  icon: string
  color: string
  earnedAt: string
}

function ProfileContent() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [badges, setBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      // In a real app, you'd fetch from /api/profile
      setProfile({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        department: 'Ushering',
        subteam: 'Team Bluey Street',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        memberSince: '2023-01-15',
      })

      setStats({
        soulsWon: 24,
        followupsCompleted: 18,
        badgesEarned: 5,
        totalPoints: 1250,
        attendanceRate: 92,
        streak: 14,
      })

      setBadges([
        { id: '1', name: 'Soul Winner', icon: 'heart', color: '#ef4444', earnedAt: '2024-01-20' },
        { id: '2', name: 'Follow-up Champion', icon: 'check-circle', color: '#3b82f6', earnedAt: '2024-02-10' },
        { id: '3', name: '7-Day Streak', icon: 'flame', color: '#f43f5e', earnedAt: '2024-03-01' },
        { id: '4', name: 'Outreach Warrior', icon: 'map-pin', color: '#8b5cf6', earnedAt: '2024-03-15' },
        { id: '5', name: 'Team Player', icon: 'users', color: '#06b6d4', earnedAt: '2024-04-05' },
      ])
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (!profile || !stats) return null

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar} alt={profile.firstName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-sm text-gray-600">{profile.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge>{profile.department}</Badge>
                  <Badge variant="outline">{profile.subteam}</Badge>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Member since {new Date(profile.memberSince).toLocaleDateString()}
                </p>
              </div>
            </div>
            {!editing && (
              <Button onClick={() => setEditing(true)} variant="outline">
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{stats.soulsWon}</p>
            <p className="text-xs text-gray-600">Souls Won</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-500" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{stats.followupsCompleted}</p>
            <p className="text-xs text-gray-600">Follow-ups</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{stats.badgesEarned}</p>
            <p className="text-xs text-gray-600">Badges</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-500" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{stats.totalPoints}</p>
            <p className="text-xs text-gray-600">Points</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{stats.attendanceRate}%</p>
            <p className="text-xs text-gray-600">Attendance</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{stats.streak}</p>
            <p className="text-xs text-gray-600">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Badges & Achievements */}
      <Tabs defaultValue="badges" className="w-full">
        <TabsList>
          <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
          <TabsTrigger value="history">Activity History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Earned Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                {badges.map(badge => (
                  <div key={badge.id} className="text-center">
                    <div
                      className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full"
                      style={{ backgroundColor: badge.color + '20' }}
                    >
                      <Trophy className="h-8 w-8" style={{ color: badge.color }} />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(badge.earnedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-medium text-gray-900">Completed Follow-up</p>
                  <p className="text-sm text-gray-600">3 hours ago</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium text-gray-900">Registered New Convert</p>
                  <p className="text-sm text-gray-600">1 day ago</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="font-medium text-gray-900">Earned Badge: Soul Winner</p>
                  <p className="text-sm text-gray-600">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <Input defaultValue={profile.firstName} className="mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <Input defaultValue={profile.lastName} className="mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <Input type="email" defaultValue={profile.email} className="mt-1" />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setEditing(false)}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Click Edit Profile to change your details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function ProfilePage() {
  return <ProfileContent />
}
