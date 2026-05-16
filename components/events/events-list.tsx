'use client'

import { useState } from 'react'
import { format, formatDistanceToNow, isPast, isFuture, isToday } from 'date-fns'
import {
  Calendar,
  MapPin,
  Users,
  Heart,
  Clock,
  Plus,
  Filter,
  Search,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

// Mock data for demonstration
const mockEvents = [
  {
    id: '1',
    title: 'Lekki Street Outreach',
    description: 'Weekly street evangelism at Lekki Phase 1',
    event_type: 'street_evangelism',
    location_name: 'Lekki Phase 1, Lagos',
    start_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
    expected_attendees: 25,
    actual_attendees: null,
    souls_won: 0,
    status: 'upcoming',
    department: 'Evangelism',
  },
  {
    id: '2',
    title: 'Campus Crusade - UNILAG',
    description: 'University outreach at main campus',
    event_type: 'campus_outreach',
    location_name: 'University of Lagos, Akoka',
    start_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    expected_attendees: 40,
    actual_attendees: null,
    souls_won: 0,
    status: 'upcoming',
    department: 'Youth Ministry',
  },
  {
    id: '3',
    title: 'Hospital Visitation',
    description: 'Monthly hospital ministry at Lagos State Hospital',
    event_type: 'hospital_visit',
    location_name: 'Lagos Island General Hospital',
    start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    expected_attendees: 15,
    actual_attendees: 12,
    souls_won: 8,
    status: 'completed',
    department: 'Welfare',
  },
  {
    id: '4',
    title: 'Door-to-Door Evangelism - Ajah',
    description: 'Community outreach in Ajah residential areas',
    event_type: 'door_to_door',
    location_name: 'Ajah, Lekki-Epe Expressway',
    start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
    expected_attendees: 30,
    actual_attendees: 28,
    souls_won: 15,
    status: 'completed',
    department: 'Evangelism',
  },
  {
    id: '5',
    title: 'Easter Crusade 2026',
    description: 'Annual Easter evangelism crusade',
    event_type: 'crusade',
    location_name: 'Tafawa Balewa Square, Lagos',
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    expected_attendees: 500,
    actual_attendees: 320,
    souls_won: 45,
    status: 'ongoing',
    department: 'All Departments',
  },
]

const eventTypeColors: Record<string, string> = {
  outreach: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  crusade: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  door_to_door: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  street_evangelism: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  campus_outreach: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  hospital_visit: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  prison_ministry: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  upcoming: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-green-100 text-green-800',
  completed: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
}

function EventCard({ event }: { event: typeof mockEvents[0] }) {
  const startDate = new Date(event.start_date)
  const isOngoing = event.status === 'ongoing'
  const isCompleted = event.status === 'completed'
  
  return (
    <Card className={cn(
      "transition-all hover:shadow-md",
      isOngoing && "border-green-500/50 bg-green-50/30 dark:bg-green-950/10"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className={cn("text-xs", eventTypeColors[event.event_type] || eventTypeColors.other)}
              >
                {event.event_type.replace(/_/g, ' ')}
              </Badge>
              <Badge 
                variant="outline" 
                className={cn("text-xs", statusColors[event.status])}
              >
                {isOngoing && <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />}
                {event.status}
              </Badge>
            </div>
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {event.description}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{format(startDate, 'PPP')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{format(startDate, 'p')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span className="truncate max-w-[200px]">{event.location_name}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {isCompleted 
                  ? `${event.actual_attendees}/${event.expected_attendees}` 
                  : `${event.expected_attendees} expected`
                }
              </span>
            </div>
            {(isCompleted || isOngoing) && event.souls_won > 0 && (
              <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                <Heart className="h-4 w-4 fill-current" />
                <span className="font-medium">{event.souls_won} souls</span>
              </div>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {event.department}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function CreateEventDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Outreach Event</DialogTitle>
          <DialogDescription>
            Plan a new evangelism outreach event for your team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" placeholder="e.g., Weekly Street Outreach" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Event Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="street_evangelism">Street Evangelism</SelectItem>
                <SelectItem value="door_to_door">Door-to-Door</SelectItem>
                <SelectItem value="campus_outreach">Campus Outreach</SelectItem>
                <SelectItem value="hospital_visit">Hospital Visitation</SelectItem>
                <SelectItem value="prison_ministry">Prison Ministry</SelectItem>
                <SelectItem value="crusade">Crusade</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Start Time</Label>
              <Input id="time" type="time" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Event location" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="attendees">Expected Attendees</Label>
            <Input id="attendees" type="number" min="1" placeholder="25" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe the outreach event..."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function EventsList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming' || e.status === 'ongoing')
  const completedEvents = mockEvents.filter(e => e.status === 'completed')
  
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming Events</CardDescription>
            <CardTitle className="text-2xl">{upcomingEvents.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              Next: {upcomingEvents[0] ? format(new Date(upcomingEvents[0].start_date), 'MMM d') : 'None'}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Events This Month</CardDescription>
            <CardTitle className="text-2xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              8 completed
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Souls Won</CardDescription>
            <CardTitle className="text-2xl text-green-600">
              {mockEvents.reduce((sum, e) => sum + e.souls_won, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-muted-foreground">
              <Heart className="h-3 w-3 mr-1" />
              From all events
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Attendance</CardDescription>
            <CardTitle className="text-2xl">
              {Math.round(completedEvents.reduce((sum, e) => sum + (e.actual_attendees || 0), 0) / completedEvents.length || 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="h-3 w-3 mr-1" />
              Per event
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <CreateEventDialog />
      </div>

      {/* Events Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedEvents.length})
          </TabsTrigger>
          <TabsTrigger value="all">All Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingEvents.length === 0 ? (
            <Card className="py-12">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No upcoming events</h3>
                <p className="text-muted-foreground mb-4">
                  Create a new outreach event to get started
                </p>
                <CreateEventDialog />
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {completedEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
