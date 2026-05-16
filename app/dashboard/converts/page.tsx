'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DashboardHeader } from '@/components/layout/dashboard-header'
import { ConvertList } from '@/components/converts/convert-list'
import { ConvertCard } from '@/components/converts/convert-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// Sample data for featured converts
const featuredConverts = [
  {
    id: '1',
    name: 'Mary Johnson',
    phone: '+1 (555) 123-4567',
    email: 'mary@example.com',
    address: '123 Main St, City, State',
    date_met: '2024-01-15',
    follow_up_stage: 'baptism',
    salvation_status: true,
    baptism_status: true,
    first_timer: false,
  },
  {
    id: '2',
    name: 'David Smith',
    phone: '+1 (555) 234-5678',
    email: 'david@example.com',
    address: '456 Oak Ave, City, State',
    date_met: '2024-01-10',
    follow_up_stage: 'church_attendance',
    salvation_status: true,
    baptism_status: false,
    first_timer: true,
  },
  {
    id: '3',
    name: 'Sarah Williams',
    phone: '+1 (555) 345-6789',
    email: 'sarah@example.com',
    address: '789 Pine Rd, City, State',
    date_met: '2024-01-20',
    follow_up_stage: 'membership_class',
    salvation_status: true,
    baptism_status: false,
    first_timer: true,
  },
]

export default function ConvertsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <DashboardHeader breadcrumbs={[{ label: 'Converts' }]} />
      <main className="flex-1 overflow-auto">
        <div className="container py-6 space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Converts
                </h1>
                <p className="text-foreground/60 mt-1">
                  Manage and track all registered converts in your ministry
                </p>
              </div>
              <Button 
                asChild
                className="bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/60 shadow-lg"
              >
                <Link href="/dashboard/converts/new">
                  <Plus className="mr-2 size-4" />
                  Register Convert
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Featured Converts Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">Recent Additions</h2>
              <p className="text-foreground/60 text-sm">Newest converts added this week</p>
            </div>

            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {featuredConverts.map((convert, idx) => (
                <SwiperSlide key={convert.id}>
                  <ConvertCard
                    {...convert}
                    delay={idx * 0.1}
                    onView={() => {
                      // Handle view action
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Search & Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/5 backdrop-blur-xl">
              <Search className="size-5 text-primary/70" />
              <Input
                placeholder="Search by name, phone, email, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent text-foreground placeholder:text-foreground/40 focus-visible:ring-0"
              />
            </div>
          </motion.div>

          {/* Converts List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ConvertList />
          </motion.div>
        </div>
      </main>
    </>
  )
}
