'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Heart, Sparkles, Users, TrendingUp, Zap, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default function HomePage() {
  const router = useRouter()
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((element) => {
        if (!element) return
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          element.classList.add('opacity-100')
          element.classList.remove('opacity-0')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg group-hover:shadow-primary/50 transition-shadow">
                <Heart className="size-5" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">Soulwin</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
              <a href="#impact" className="text-sm font-medium hover:text-primary transition-colors">Impact</a>
              <a href="#testimonies" className="text-sm font-medium hover:text-primary transition-colors">Testimonies</a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => router.push('/auth/login')}>
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/60">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="size-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Revolutionize Your Ministry</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                <span className="block">Soul Winning</span>
                <span className="block bg-gradient-to-r from-primary via-primary to-primary/50 bg-clip-text text-transparent">Made Simple</span>
              </h1>

              <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                Empower your church with enterprise-grade evangelism management. Track conversions, manage follow-ups, and inspire your team with real-time analytics.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/60 h-14 px-8 text-base font-semibold shadow-xl hover:shadow-2xl transition-all"
                onClick={() => router.push('/auth/sign-up')}
              >
                Start Free Trial
                <ChevronRight className="ml-2 size-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="h-14 px-8 text-base font-semibold border-2"
                onClick={() => router.push('/auth/login')}
              >
                Sign In
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-center gap-8 text-sm text-foreground/60 flex-wrap">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-primary" />
                <span>10K+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" />
                <span>500K+ Souls Won</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-primary" />
                <span>99.9% Uptime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section with Carousel */}
      <motion.section 
        ref={(el) => { sectionRefs.current[0] = el }}
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-4">
              Powerful Features
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Everything you need to manage evangelism at scale
            </motion.p>
          </motion.div>

          {/* Feature Cards Swiper */}
          <div className="relative px-8">
            <Swiper
              modules={[Autoplay, Pagination]}
              grabCursor
              centeredSlides
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1.5, spaceBetween: 16 },
                1024: { slidesPerView: 2.5, spaceBetween: 20 },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="!pb-16"
              onSlideChange={(swiper) => {
                // Remove active class from all slides
                document.querySelectorAll('.feature-slide').forEach(el => {
                  el.classList.remove('scale-100', 'opacity-100')
                  el.classList.add('scale-90', 'opacity-50')
                })
                // Add active class to current slide
                const activeSlide = document.querySelector('.feature-slide.swiper-slide-active')
                if (activeSlide) {
                  activeSlide.classList.remove('scale-90', 'opacity-50')
                  activeSlide.classList.add('scale-100', 'opacity-100')
                }
              }}
            >
              {[
                {
                  icon: Heart,
                  title: "Convert Registration",
                  description: "Register new souls with comprehensive forms and auto follow-up scheduling",
                  bgGradient: "from-pink-50 to-pink-50/80 dark:from-pink-950/40 dark:to-pink-950/20",
                  borderColor: "border-pink-200 dark:border-pink-800",
                },
                {
                  icon: TrendingUp,
                  title: "Advanced Analytics",
                  description: "Real-time dashboards with conversion rates, outreach metrics, and trends",
                  bgGradient: "from-blue-50 to-blue-50/80 dark:from-blue-950/40 dark:to-blue-950/20",
                  borderColor: "border-blue-200 dark:border-blue-800",
                },
                {
                  icon: Users,
                  title: "Team Management",
                  description: "Organize departments, subteams, and track individual performance",
                  bgGradient: "from-purple-50 to-purple-50/80 dark:from-purple-950/40 dark:to-purple-950/20",
                  borderColor: "border-purple-200 dark:border-purple-800",
                },
                {
                  icon: Zap,
                  title: "Follow-Up Workflow",
                  description: "Automated reminders and kanban-style follow-up stage management",
                  bgGradient: "from-emerald-50 to-emerald-50/80 dark:from-emerald-950/40 dark:to-emerald-950/20",
                  borderColor: "border-emerald-200 dark:border-emerald-800",
                },
              ].map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <SwiperSlide key={idx} className="feature-slide scale-90 opacity-50 transition-all duration-500">
                    <motion.div
                      whileHover={{ y: -8 }}
                      className={`h-80 rounded-2xl p-8 bg-gradient-to-br ${feature.bgGradient} ${feature.borderColor} border-2 backdrop-blur-sm cursor-grab active:cursor-grabbing shadow-lg hover:shadow-2xl transition-all duration-300`}
                    >
                      <div className="flex flex-col h-full">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-6 shadow-lg">
                          <Icon className="size-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                        <p className="text-foreground/80 flex-1 font-medium leading-relaxed">{feature.description}</p>
                        <div className="pt-4 border-t border-primary/20">
                          <Button variant="ghost" size="sm" className="text-primary font-semibold hover:bg-primary/15">
                            Learn more <ChevronRight className="ml-2 size-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </motion.section>

      {/* Impact Section */}
      <motion.section 
        ref={(el) => { sectionRefs.current[1] = el }}
        id="impact"
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Churches", value: "2,500+", gradient: "from-primary/20 to-transparent" },
              { label: "Active Members", value: "500K+", gradient: "from-primary/30 to-transparent" },
              { label: "Souls Won", value: "5M+", gradient: "from-primary/25 to-transparent" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className={`relative group p-8 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-primary/20 backdrop-blur-xl overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <p className="text-foreground/60 text-sm font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={(el) => { sectionRefs.current[2] = el }}
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group rounded-3xl overflow-hidden p-12 md:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/20 group-hover:from-primary/50 group-hover:to-primary/30 transition-all blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
            <div className="relative z-10 text-center space-y-8">
              <h2 className="text-5xl font-bold">
                Ready to Transform Your Ministry?
              </h2>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                Join thousands of churches using Soulwin to scale their evangelism efforts and track their impact.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/60 h-14 px-10 text-base font-semibold shadow-xl"
                onClick={() => router.push('/auth/sign-up')}
              >
                Start Your Free Trial Today
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-foreground/60">
          <p>&copy; 2024 Soulwin. Built with passion for ministry growth.</p>
        </div>
      </footer>
    </div>
  )
}
