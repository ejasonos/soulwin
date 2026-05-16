'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { ConvertFormData, AgeRange } from '@/lib/types'

const ageRanges: { value: AgeRange; label: string }[] = [
  { value: '0-12', label: '0-12 years' },
  { value: '13-17', label: '13-17 years' },
  { value: '18-25', label: '18-25 years' },
  { value: '26-35', label: '26-35 years' },
  { value: '36-45', label: '36-45 years' },
  { value: '46-55', label: '46-55 years' },
  { value: '56-65', label: '56-65 years' },
  { value: '65+', label: '65+ years' },
]

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

// Mock departments data
const departments = [
  { id: '1', name: 'Pastoring' },
  { id: '2', name: 'Drama' },
  { id: '3', name: 'Ushering' },
  { id: '4', name: 'Multimedia' },
  { id: '5', name: 'Teens and Children' },
]

// Mock subteams data
const subteams = [
  { id: '1', name: 'Team Bluey Street', department_id: '1' },
  { id: '2', name: 'Lekki Zone Team', department_id: '1' },
  { id: '3', name: 'Ajah Morning Outreach', department_id: '2' },
  { id: '4', name: 'Campus Squad A', department_id: '5' },
]

interface ConvertFormProps {
  initialData?: Partial<ConvertFormData>
  onSubmit?: (data: ConvertFormData) => Promise<void>
}

export function ConvertForm({ initialData, onSubmit }: ConvertFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>(initialData?.date_met ? new Date(initialData.date_met) : new Date())
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(initialData?.department_id)

  const form = useForm<ConvertFormData>({
    defaultValues: {
      full_name: '',
      phone: '',
      email: '',
      address: '',
      occupation: '',
      prayer_request: '',
      notes: '',
      salvation_status: false,
      baptism_status: false,
      first_timer: true,
      church_attendance_status: false,
      ...initialData,
    },
  })

  const { register, handleSubmit, setValue, watch, formState: { errors } } = form

  const filteredSubteams = subteams.filter(
    (subteam) => subteam.department_id === selectedDepartment
  )

  const handleFormSubmit = async (data: ConvertFormData) => {
    setIsSubmitting(true)
    try {
      const formData = {
        ...data,
        date_met: format(date, 'yyyy-MM-dd'),
      }
      
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Mock submission
        console.log('[v0] Form submitted:', formData)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.push('/dashboard/converts')
      }
    } catch (error) {
      console.error('[v0] Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Basic details about the new convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                placeholder="Enter full name"
                {...register('full_name', { required: 'Name is required' })}
              />
              {errors.full_name && (
                <p className="text-sm text-destructive">{errors.full_name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+234 800 000 0000"
                {...register('phone')}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register('email')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => setValue('gender', value as 'male' | 'female' | 'other')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age_range">Age Range</Label>
              <Select onValueChange={(value) => setValue('age_range', value as AgeRange)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  {ageRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                placeholder="Enter occupation"
                {...register('occupation')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Enter address"
              rows={2}
              {...register('address')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Meeting Details */}
      <Card>
        <CardHeader>
          <CardTitle>Meeting Details</CardTitle>
          <CardDescription>When and where you met this person</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Date Met *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {date ? format(date, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={selectedDepartment}
                onValueChange={(value) => {
                  setSelectedDepartment(value)
                  setValue('department_id', value)
                  setValue('subteam_id', undefined)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subteam">Subteam</Label>
            <Select
              disabled={!selectedDepartment || filteredSubteams.length === 0}
              onValueChange={(value) => setValue('subteam_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedDepartment ? 'Select subteam' : 'Select department first'} />
              </SelectTrigger>
              <SelectContent>
                {filteredSubteams.map((subteam) => (
                  <SelectItem key={subteam.id} value={subteam.id}>
                    {subteam.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Spiritual Status */}
      <Card>
        <CardHeader>
          <CardTitle>Spiritual Status</CardTitle>
          <CardDescription>Track their spiritual journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="salvation_status">Salvation</Label>
                <p className="text-sm text-muted-foreground">
                  Has accepted Jesus as Lord
                </p>
              </div>
              <Switch
                id="salvation_status"
                checked={watch('salvation_status')}
                onCheckedChange={(checked) => setValue('salvation_status', checked)}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="first_timer">First Timer</Label>
                <p className="text-sm text-muted-foreground">
                  First time visiting church
                </p>
              </div>
              <Switch
                id="first_timer"
                checked={watch('first_timer')}
                onCheckedChange={(checked) => setValue('first_timer', checked)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="baptism_status">Baptized</Label>
                <p className="text-sm text-muted-foreground">
                  Has been baptized
                </p>
              </div>
              <Switch
                id="baptism_status"
                checked={watch('baptism_status')}
                onCheckedChange={(checked) => setValue('baptism_status', checked)}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="church_attendance_status">Attending Church</Label>
                <p className="text-sm text-muted-foreground">
                  Actively attending services
                </p>
              </div>
              <Switch
                id="church_attendance_status"
                checked={watch('church_attendance_status')}
                onCheckedChange={(checked) => setValue('church_attendance_status', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Prayer requests and notes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prayer_request">Prayer Request</Label>
            <Textarea
              id="prayer_request"
              placeholder="Enter any prayer requests..."
              rows={3}
              {...register('prayer_request')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about this person..."
              rows={3}
              {...register('notes')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isSubmitting ? 'Registering...' : 'Register Convert'}
        </Button>
      </div>
    </form>
  )
}
