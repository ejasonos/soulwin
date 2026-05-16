import jsPDF from 'jspdf'
import { jsPDFDocument } from 'jspdf'
import Papa from 'papaparse'

export interface ExportOptions {
  filename?: string
  title?: string
}

export async function exportToCSV(
  data: Record<string, any>[],
  filename = 'export.csv'
) {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  downloadFile(blob, filename)
}

export async function exportToPDF(
  content: string,
  options: ExportOptions = {}
) {
  const { filename = 'export.pdf', title = 'Report' } = options

  const doc = new jsPDF()
  const width = doc.internal.pageSize.getWidth()
  const height = doc.internal.pageSize.getHeight()

  // Add title
  doc.setFontSize(16)
  doc.text(title, width / 2, 20, { align: 'center' })

  // Add date
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, width / 2, 30, { align: 'center' })

  // Add content
  doc.setFontSize(12)
  const text = doc.splitTextToSize(content, width - 20)
  doc.text(text, 10, 40)

  // Save
  doc.save(filename)
}

export async function exportTableToPDF(
  title: string,
  headers: string[],
  rows: (string | number)[][],
  options: ExportOptions = {}
) {
  const { filename = 'report.pdf' } = options
  const doc = new jsPDF()
  const width = doc.internal.pageSize.getWidth()

  // Title
  doc.setFontSize(16)
  doc.text(title, width / 2, 15, { align: 'center' })

  // Date
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, width / 2, 25, { align: 'center' })

  // Table
  const columnWidth = (width - 20) / headers.length
  let yPosition = 35

  // Headers
  doc.setFontSize(11)
  doc.setFillColor(200, 200, 200)
  headers.forEach((header, i) => {
    doc.cell(10 + i * columnWidth, yPosition, columnWidth, 8, header, 1, 'center')
  })
  yPosition += 10

  // Rows
  doc.setFontSize(10)
  rows.forEach(row => {
    if (yPosition > doc.internal.pageSize.getHeight() - 10) {
      doc.addPage()
      yPosition = 20
    }
    row.forEach((cell, i) => {
      doc.cell(10 + i * columnWidth, yPosition, columnWidth, 8, String(cell), 1, 'center')
    })
    yPosition += 10
  })

  doc.save(filename)
}

export async function exportConvertsToPDF(converts: any[], options: ExportOptions = {}) {
  const { filename = 'converts_report.pdf', title = 'Converts Report' } = options

  const headers = ['Name', 'Phone', 'Email', 'Stage', 'Baptism', 'Status', 'Date Met']
  const rows = converts.map(c => [
    c.full_name,
    c.phone || '-',
    c.email || '-',
    c.follow_up_stage,
    c.baptism_status ? 'Yes' : 'No',
    c.is_active ? 'Active' : 'Inactive',
    new Date(c.date_met).toLocaleDateString(),
  ])

  await exportTableToPDF(title, headers, rows, { filename })
}

export async function exportFollowupsToPDF(followups: any[], options: ExportOptions = {}) {
  const { filename = 'followups_report.pdf', title = 'Follow-ups Report' } = options

  const headers = ['Convert', 'Stage', 'Status', 'Scheduled', 'Assigned To']
  const rows = followups.map(f => [
    f.convertName,
    f.stage,
    f.status,
    new Date(f.scheduled_date).toLocaleDateString(),
    f.assignedTo || '-',
  ])

  await exportTableToPDF(title, headers, rows, { filename })
}

export async function exportAnalyticsToPDF(
  analytics: Record<string, any>,
  options: ExportOptions = {}
) {
  const { filename = 'analytics_report.pdf', title = 'Analytics Report' } = options
  const doc = new jsPDF()
  const width = doc.internal.pageSize.getWidth()

  // Title
  doc.setFontSize(16)
  doc.text(title, width / 2, 15, { align: 'center' })

  // Content
  let yPosition = 30
  doc.setFontSize(12)

  Object.entries(analytics).forEach(([key, value]) => {
    if (yPosition > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage()
      yPosition = 20
    }
    doc.text(`${key}: ${value}`, 10, yPosition)
    yPosition += 10
  })

  doc.save(filename)
}

export function downloadFile(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
