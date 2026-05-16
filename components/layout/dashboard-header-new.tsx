'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Bell, Settings, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CommandPalette } from '@/components/command-palette'

export function DashboardHeaderNew() {
  const router = useRouter()

  const handleLogout = async () => {
    router.push('/auth/login')
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 border-b border-primary/10 backdrop-blur-xl bg-background/80"
    >
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section - Title & Subtitle */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xs text-foreground/50">Track your evangelism impact in real-time</p>
        </motion.div>

        {/* Right Section - Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/10"
          >
            <Bell className="size-5" />
            <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full animate-pulse"></span>
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10"
            onClick={() => router.push('/dashboard/settings')}
          >
            <Settings className="size-5" />
          </Button>

          {/* User Menu */}
          <div className="flex items-center gap-2 pl-4 border-l border-primary/10">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <User className="size-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block text-sm">
              <p className="font-medium text-foreground">John Doe</p>
              <p className="text-xs text-foreground/50">Admin</p>
            </div>
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-red-500/10"
            onClick={handleLogout}
          >
            <LogOut className="size-5" />
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}
