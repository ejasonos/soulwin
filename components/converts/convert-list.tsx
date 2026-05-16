'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Heart,
  User,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { FollowUpStage } from '@/lib/types'

interface ConvertListItem {
  id: string
  full_name: string
  phone: string | null
  email: string | null
  gender: 'male' | 'female' | 'other' | null
  age_range: string | null
  department_name: string | null
  subteam_name: string | null
  date_met: string
  salvation_status: boolean
  baptism_status: boolean
  first_timer: boolean
  follow_up_stage: FollowUpStage
  invited_by_name: string | null
}

const stageColors: Record<FollowUpStage, string> = {
  new: 'bg-gray-100 text-gray-800',
  first_contact: 'bg-blue-100 text-blue-800',
  prayer_followup: 'bg-purple-100 text-purple-800',
  church_attendance: 'bg-amber-100 text-amber-800',
  membership_class: 'bg-orange-100 text-orange-800',
  baptism: 'bg-cyan-100 text-cyan-800',
  worker_training: 'bg-green-100 text-green-800',
  completed: 'bg-emerald-100 text-emerald-800',
}

const stageLabels: Record<FollowUpStage, string> = {
  new: 'New',
  first_contact: 'First Contact',
  prayer_followup: 'Prayer Follow-up',
  church_attendance: 'Church Attendance',
  membership_class: 'Membership Class',
  baptism: 'Baptism',
  worker_training: 'Worker Training',
  completed: 'Completed',
}

// Mock data
const mockConverts: ConvertListItem[] = [
  {
    id: '1',
    full_name: 'Sarah Johnson',
    phone: '+234 801 234 5678',
    email: 'sarah.j@email.com',
    gender: 'female',
    age_range: '26-35',
    department_name: 'Drama',
    subteam_name: 'Team Bluey Street',
    date_met: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    salvation_status: true,
    baptism_status: false,
    first_timer: true,
    follow_up_stage: 'first_contact',
    invited_by_name: 'John Doe',
  },
  {
    id: '2',
    full_name: 'Michael Brown',
    phone: '+234 802 345 6789',
    email: 'michael.b@email.com',
    gender: 'male',
    age_range: '18-25',
    department_name: 'Pastoring',
    subteam_name: 'Lekki Zone Team',
    date_met: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    salvation_status: true,
    baptism_status: true,
    first_timer: false,
    follow_up_stage: 'church_attendance',
    invited_by_name: 'Jane Smith',
  },
  {
    id: '3',
    full_name: 'Grace Williams',
    phone: '+234 803 456 7890',
    email: null,
    gender: 'female',
    age_range: '36-45',
    department_name: 'Ushering',
    subteam_name: null,
    date_met: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    salvation_status: true,
    baptism_status: false,
    first_timer: true,
    follow_up_stage: 'prayer_followup',
    invited_by_name: 'Peter James',
  },
  {
    id: '4',
    full_name: 'David Chen',
    phone: '+234 804 567 8901',
    email: 'david.chen@email.com',
    gender: 'male',
    age_range: '26-35',
    department_name: 'Multimedia',
    subteam_name: 'Campus Squad A',
    date_met: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    salvation_status: true,
    baptism_status: true,
    first_timer: false,
    follow_up_stage: 'membership_class',
    invited_by_name: null,
  },
  {
    id: '5',
    full_name: 'Emma Davis',
    phone: null,
    email: 'emma.d@email.com',
    gender: 'female',
    age_range: '18-25',
    department_name: 'Teens and Children',
    subteam_name: null,
    date_met: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    salvation_status: false,
    baptism_status: false,
    first_timer: true,
    follow_up_stage: 'new',
    invited_by_name: 'Mary Johnson',
  },
]

interface ConvertListProps {
  converts?: ConvertListItem[]
}

export function ConvertList({ converts = mockConverts }: ConvertListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [stageFilter, setStageFilter] = useState<string>('all')

  const filteredConverts = converts.filter((convert) => {
    const matchesSearch =
      convert.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convert.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convert.phone?.includes(searchQuery)
    
    const matchesStage = stageFilter === 'all' || convert.follow_up_stage === stageFilter

    return matchesSearch && matchesStage
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 size-4" />
              <SelectValue placeholder="Filter by stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              {Object.entries(stageLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Met</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConverts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <p className="text-muted-foreground">No converts found.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredConverts.map((convert) => (
                  <TableRow key={convert.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {convert.full_name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{convert.full_name}</p>
                          {convert.invited_by_name && (
                            <p className="text-xs text-muted-foreground">
                              by {convert.invited_by_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {convert.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="size-3" />
                            {convert.phone}
                          </div>
                        )}
                        {convert.email && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Mail className="size-3" />
                            {convert.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {convert.department_name ? (
                        <div>
                          <p className="text-sm">{convert.department_name}</p>
                          {convert.subteam_name && (
                            <p className="text-xs text-muted-foreground">
                              {convert.subteam_name}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn('font-normal', stageColors[convert.follow_up_stage])}
                      >
                        {stageLabels[convert.follow_up_stage]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {convert.salvation_status && (
                          <Badge variant="outline" className="text-green-600 border-green-600/30">
                            <Heart className="mr-1 size-3" />
                            Saved
                          </Badge>
                        )}
                        {convert.first_timer && (
                          <Badge variant="outline" className="text-blue-600 border-blue-600/30">
                            <User className="mr-1 size-3" />
                            1st Timer
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="size-3" />
                        {formatDistanceToNow(new Date(convert.date_met), { addSuffix: true })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/converts/${convert.id}`}>
                              <Eye className="mr-2 size-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/converts/${convert.id}/edit`}>
                              <Edit className="mr-2 size-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
