'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GradientSectionProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  delay?: number
}

export function GradientSection({ 
  title, 
  subtitle, 
  children, 
  className,
  delay = 0 
}: GradientSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: '-100px' }}
      className={cn(
        'relative rounded-2xl overflow-hidden border border-primary/10 backdrop-blur-xl',
        'bg-gradient-to-br from-card via-card/80 to-card/50',
        'p-6 sm:p-8 lg:p-10',
        className
      )}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.1 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className="text-foreground/60">{subtitle}</p>
          )}
        </motion.div>

        {/* Children */}
        {children}
      </div>
    </motion.section>
  )
}
