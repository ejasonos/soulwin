'use client'

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data
const soulsWonData = [
  { month: 'Jan', souls: 124, target: 100 },
  { month: 'Feb', souls: 156, target: 120 },
  { month: 'Mar', souls: 189, target: 140 },
  { month: 'Apr', souls: 178, target: 160 },
  { month: 'May', souls: 212, target: 180 },
  { month: 'Jun', souls: 245, target: 200 },
]

const departmentData = [
  { name: 'Pastoring', souls: 245, color: 'var(--chart-1)' },
  { name: 'Drama', souls: 189, color: 'var(--chart-2)' },
  { name: 'Ushering', souls: 156, color: 'var(--chart-3)' },
  { name: 'Multimedia', souls: 134, color: 'var(--chart-4)' },
  { name: 'Teens', souls: 98, color: 'var(--chart-5)' },
]

const followupData = [
  { stage: 'First Contact', completed: 85, pending: 15 },
  { stage: 'Prayer', completed: 72, pending: 28 },
  { stage: 'Attendance', completed: 68, pending: 32 },
  { stage: 'Membership', completed: 54, pending: 46 },
  { stage: 'Baptism', completed: 45, pending: 55 },
  { stage: 'Training', completed: 32, pending: 68 },
]

const weeklyActivityData = [
  { day: 'Mon', converts: 12, followups: 8 },
  { day: 'Tue', converts: 8, followups: 15 },
  { day: 'Wed', converts: 15, followups: 12 },
  { day: 'Thu', converts: 10, followups: 9 },
  { day: 'Fri', converts: 18, followups: 14 },
  { day: 'Sat', converts: 25, followups: 22 },
  { day: 'Sun', converts: 32, followups: 18 },
]

export function SoulsWonChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Souls Won Over Time</CardTitle>
        <CardDescription>Monthly soul-winning progress vs target</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={soulsWonData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="soulsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-sm text-primary">
                          Souls: {payload[0].value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Target: {payload[1]?.value}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="souls"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#soulsGradient)"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function DepartmentComparisonChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>Souls won by department this quarter</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <p className="text-sm font-medium">{payload[0].payload.name}</p>
                        <p className="text-sm text-primary">
                          {payload[0].value} souls
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="souls" radius={[0, 4, 4, 0]}>
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function FollowupCompletionChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Follow-up Completion Rate</CardTitle>
        <CardDescription>Progress through discipleship stages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={followupData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-sm text-green-600">
                          Completed: {payload[0].value}%
                        </p>
                        <p className="text-sm text-amber-600">
                          Pending: {payload[1].value}%
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="completed" stackId="a" fill="hsl(var(--chart-2))" radius={[0, 0, 0, 0]} />
              <Bar dataKey="pending" stackId="a" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function WeeklyActivityChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>Converts registered and follow-ups completed this week</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Activity</TabsTrigger>
            <TabsTrigger value="converts">Converts</TabsTrigger>
            <TabsTrigger value="followups">Follow-ups</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <p className="text-sm font-medium">{label}</p>
                          <p className="text-sm" style={{ color: 'hsl(var(--chart-1))' }}>
                            Converts: {payload[0].value}
                          </p>
                          <p className="text-sm" style={{ color: 'hsl(var(--chart-2))' }}>
                            Follow-ups: {payload[1].value}
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Line type="monotone" dataKey="converts" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-1))' }} />
                <Line type="monotone" dataKey="followups" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ fill: 'hsl(var(--chart-2))' }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="converts" className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="converts" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="followups" className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="followups" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
