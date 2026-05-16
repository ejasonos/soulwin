'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Search, Heart, Calendar, Users, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchResult {
  id: string
  title: string
  type: 'convert' | 'event' | 'member' | 'department'
  description?: string
  url: string
  icon: React.ReactNode
}

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      // In a real app, you'd call /api/search with the query
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'John Doe',
          type: 'convert',
          description: 'Registered 2 weeks ago',
          url: '/dashboard/converts/1',
          icon: <Heart className="w-4 h-4 text-red-500" />,
        },
        {
          id: '2',
          title: 'Crusade 2024',
          type: 'event',
          description: 'March 15 - Community Center',
          url: '/dashboard/events/2',
          icon: <Calendar className="w-4 h-4 text-blue-500" />,
        },
        {
          id: '3',
          title: 'Jane Smith',
          type: 'member',
          description: 'Ushering Department',
          url: '/dashboard/profile/3',
          icon: <Users className="w-4 h-4 text-green-500" />,
        },
      ]

      setResults(
        mockResults.filter(
          result =>
            result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    performSearch(searchQuery)
  }

  const handleSelect = (result: SearchResult) => {
    router.push(result.url)
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  const typeIcons: Record<string, React.ReactNode> = {
    convert: <Heart className="w-3 h-3" />,
    event: <Calendar className="w-3 h-3" />,
    member: <Users className="w-3 h-3" />,
    department: <Users className="w-3 h-3" />,
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-sm relative"
          onClick={() => setIsOpen(true)}
        >
          <Search className="w-4 h-4 absolute left-3" />
          <span className="ml-2 text-sm text-gray-500">Search converts, events...</span>
          <kbd className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Cmd+K
          </kbd>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-0">
        <div className="space-y-2 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={query}
              onChange={e => handleSearch(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {isLoading && <div className="text-sm text-gray-500 text-center py-4">Searching...</div>}

          {!isLoading && results.length === 0 && query && (
            <div className="text-sm text-gray-500 text-center py-4">No results found</div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {results.map(result => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-3"
                >
                  {result.icon}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                    {result.description && (
                      <p className="text-xs text-gray-600 truncate">{result.description}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {result.type.replace('_', ' ')}
                  </span>
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="space-y-3">
              <div className="text-xs font-medium text-gray-600 px-2">Recent</div>
              <div className="space-y-1">
                <button className="w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-700">Recent Converts</span>
                </button>
                <button className="w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-gray-700">Trending Events</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
