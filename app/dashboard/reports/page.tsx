'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Download, FileText, BarChart3, Calendar } from 'lucide-react'
import {
  exportToCSV,
  exportToPDF,
  exportConvertsToPDF,
  exportFollowupsToPDF,
  exportAnalyticsToPDF,
} from '@/lib/utils/export'

interface Report {
  id: string
  name: string
  description: string
  type: 'converts' | 'followups' | 'analytics' | 'activity'
  generatedAt: string
  format: 'pdf' | 'csv'
}

const REPORT_TYPES = [
  { id: 'converts', name: 'Converts Report', description: 'List of all registered converts' },
  { id: 'followups', name: 'Follow-ups Report', description: 'Track follow-up progress' },
  { id: 'analytics', name: 'Analytics Report', description: 'Key metrics and insights' },
  { id: 'activity', name: 'Activity Report', description: 'Team activity and events' },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedFormat, setSelectedFormat] = useState('pdf')
  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: 'Monthly Converts Report',
      description: 'Converts registered in March 2024',
      type: 'converts',
      generatedAt: '2024-03-31',
      format: 'pdf',
    },
    {
      id: '2',
      name: 'Follow-up Progress',
      description: 'Follow-up completion rates for March',
      type: 'followups',
      generatedAt: '2024-03-30',
      format: 'pdf',
    },
    {
      id: '3',
      name: 'Department Analytics',
      description: 'Performance metrics by department',
      type: 'analytics',
      generatedAt: '2024-03-29',
      format: 'csv',
    },
    {
      id: '4',
      name: 'Q1 2024 Summary',
      description: 'Quarterly performance summary',
      type: 'analytics',
      generatedAt: '2024-03-28',
      format: 'pdf',
    },
  ])

  const handleGenerateReport = async (type: string) => {
    console.log(`Generating ${type} report in ${selectedFormat} format...`)
    // In a real app, this would fetch data and export it
    if (selectedFormat === 'pdf') {
      await exportAnalyticsToPDF(
        {
          'Souls Won': 543,
          'Active Converts': 312,
          'Baptisms': 87,
          'Follow-up Rate': '92%',
          'Department Average': '12.5 members',
        },
        { filename: `${type}_report.pdf`, title: 'Report' }
      )
    } else {
      await exportToCSV(
        [
          { name: 'John Doe', soulsWon: 24, followupsCompleted: 18 },
          { name: 'Jane Smith', soulsWon: 19, followupsCompleted: 15 },
        ],
        `${type}_report.csv`
      )
    }
  }

  const handleExportReport = async (report: Report) => {
    console.log(`Exporting ${report.name}...`)
    if (report.format === 'pdf') {
      await exportToPDF('Sample report content', {
        filename: `${report.name}.pdf`,
        title: report.name,
      })
    } else {
      await exportToCSV([], `${report.name}.csv`)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Generate and export reports for analysis and sharing</p>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        {/* Generate New Report */}
        <TabsContent value="generate" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Report</CardTitle>
              <CardDescription>Create a new report to analyze your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Report Type</label>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {REPORT_TYPES.map(type => (
                    <div
                      key={type.id}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <p className="font-medium text-gray-900">{type.name}</p>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="flex gap-2">
                  <Button
                    variant={selectedFormat === 'pdf' ? 'default' : 'outline'}
                    onClick={() => setSelectedFormat('pdf')}
                  >
                    PDF
                  </Button>
                  <Button
                    variant={selectedFormat === 'csv' ? 'default' : 'outline'}
                    onClick={() => setSelectedFormat('csv')}
                  >
                    CSV
                  </Button>
                  <Button variant="outline">Excel</Button>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => handleGenerateReport('report')} className="flex gap-2">
                  <Download className="w-4 h-4" />
                  Generate & Download
                </Button>
                <Button variant="outline">Save as Template</Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Exports</CardTitle>
              <CardDescription>One-click exports of common reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Button variant="outline" className="justify-start" onClick={() => handleGenerateReport('converts')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export Converts List
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleGenerateReport('followups')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Export Follow-ups
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleGenerateReport('analytics')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Analytics
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => handleGenerateReport('activity')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Export Activity Log
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report History */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>Previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reports generated yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reports.map(report => (
                    <div key={report.id} className="flex items-center justify-between border rounded-lg p-4">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{report.name}</p>
                        <p className="text-sm text-gray-600">{report.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge variant="outline">{report.type}</Badge>
                          <Badge variant="secondary">{report.format.toUpperCase()}</Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(report.generatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExportReport(report)}
                        className="gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
