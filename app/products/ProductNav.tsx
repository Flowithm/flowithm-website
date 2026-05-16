'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const ITEMS = [
  { id: 'intakeops', label: 'IntakeOps' },
  { id: 'knowledgeflow', label: 'KnowledgeFlow' },
  { id: 'actionops', label: 'ActionOps' },
]

export function ProductNav() {
  const [active, setActive] = useState('intakeops')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div className="sticky top-16 z-40 bg-bg/90 backdrop-blur-md border-b border-border-subtle">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Products navigation"
      >
        <ul className="flex gap-1 py-2 overflow-x-auto" role="list">
          {ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  'inline-flex px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors whitespace-nowrap',
                  active === id
                    ? 'bg-primary text-white'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
