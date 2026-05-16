'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Users,
  Heart,
  Settings,
  FileText,
  BarChart3,
  Bell,
  LogOut,
  User,
  Home,
  Briefcase,
  Calendar,
  Search,
} from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  category: string
  icon: React.ReactNode
  action: () => void
  shortcut?: string
}

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const commands: CommandItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      category: 'Navigation',
      icon: <Home className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard')
        setOpen(false)
      },
      shortcut: 'Cmd+D',
    },
    {
      id: 'converts',
      label: 'View Converts',
      category: 'Navigation',
      icon: <Heart className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard/converts')
        setOpen(false)
      },
    },
    {
      id: 'new-convert',
      label: 'Register New Convert',
      category: 'Convert',
      icon: <Users className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard/converts/new')
        setOpen(false)
      },
      shortcut: 'Cmd+N',
    },
    {
      id: 'followups',
      label: 'Follow-up Board',
      category: 'Navigation',
      icon: <Calendar className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard/followups')
        setOpen(false)
      },
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      category: 'Navigation',
      icon: <BarChart3 className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard/leaderboard')
        setOpen(false)
      },
    },
    {
      id: 'departments',
      label: 'Departments',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard/departments')
        setOpen(false)
      },
    },
    {
      id: 'reports',
      label: 'Reports',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard/reports')
        setOpen(false)
      },
    },
    {
      id: 'events',
      label: 'Events',
      category: 'Navigation',
      icon: <Calendar className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard/events')
        setOpen(false)
      },
    },
    {
      id: 'profile',
      label: 'My Profile',
      category: 'Account',
      icon: <User className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard/profile')
        setOpen(false)
      },
      shortcut: 'Cmd+P',
    },
    {
      id: 'settings',
      label: 'Settings',
      category: 'Account',
      icon: <Settings className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard/settings')
        setOpen(false)
      },
      shortcut: 'Cmd+,',
    },
    {
      id: 'admin',
      label: 'Admin Panel',
      category: 'Admin',
      icon: <Users className="w-4 h-4" />,
      action: () => {
        router.push('/dashboard/admin')
        setOpen(false)
      },
    },
    {
      id: 'notifications',
      label: 'Notifications',
      category: 'Account',
      icon: <Bell className="w-4 h-4" />,
      action: () => {
        console.log('Opening notifications')
        setOpen(false)
      },
    },
  ]

  const groupedCommands = commands.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) {
        acc[cmd.category] = []
      }
      acc[cmd.category].push(cmd)
      return acc
    },
    {} as Record<string, CommandItem[]>
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search commands, converts, or navigate..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {Object.entries(groupedCommands).map(([category, items]) => (
          <CommandGroup key={category} heading={category}>
            {items.map(item => (
              <CommandItem key={item.id} onSelect={item.action} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && <span className="ml-auto text-xs text-gray-500">{item.shortcut}</span>}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => setOpen(false)} className="cursor-pointer">
            <Search className="w-4 h-4 mr-2" />
            <span>Search All Items</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
