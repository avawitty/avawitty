'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { GlassButton, GlassPanel } from '../ui/GlassPanel'
import { getKindConfig } from '@/lib/kinds'
import type { Evidence } from '@/lib/types'

interface CurateScreenProps {
  items: Evidence[]
  onBack: () => void
  onCreateEdition: (title: string, evidenceIds: string[]) => void
}

export function CurateScreen({ items, onBack, onCreateEdition }: CurateScreenProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [title, setTitle] = useState('')

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const canCreate = selected.size > 0 && title.trim().length > 0

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-6 py-10">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8FF 100%)' }}
      />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          type="button"
          onClick={onBack}
          className="mb-6 text-sm"
          style={{ fontFamily: 'var(--font-plex-mono), monospace', color: '#6B7280' }}
        >
          ← Back
        </button>

        <h2
          className="mb-2"
          style={{
            fontFamily: 'var(--font-bodoni), serif',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            color: '#1F2937',
          }}
        >
          Curate an edition
        </h2>
        <p
          className="mb-8"
          style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#6B7280', fontSize: '0.95rem' }}
        >
          Select evidence to publish as a zine edition. Editorial, not algorithmic.
        </p>

        <GlassPanel className="p-1 mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edition title (e.g. Winter Fragments)"
            className="w-full px-5 py-3 bg-transparent outline-none"
            style={{ fontFamily: 'var(--font-bodoni), serif', fontSize: '1.1rem', color: '#1F2937' }}
          />
        </GlassPanel>

        <div className="space-y-3 mb-10">
          {items.map((item) => {
            const isSelected = selected.has(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full text-left"
              >
                <GlassPanel
                  className="p-4 flex gap-4 items-start"
                  selected={isSelected}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, #AEE4FF, #F6C8FF)'
                        : 'rgba(255,255,255,0.3)',
                      border: '1px solid rgba(255,255,255,0.6)',
                    }}
                  >
                    {isSelected && <Check className="w-3 h-3" style={{ color: '#374151' }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontFamily: 'var(--font-plex-mono), monospace',
                        fontSize: '0.65rem',
                        color: '#AEE4FF',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {getKindConfig(item.kind).label.toUpperCase()}
                    </p>
                    <p
                      className="line-clamp-2"
                      style={{
                        fontFamily: 'var(--font-bodoni), serif',
                        fontSize: '1rem',
                        color: '#374151',
                      }}
                    >
                      {item.title || item.body}
                    </p>
                  </div>
                </GlassPanel>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between">
          <p
            style={{
              fontFamily: 'var(--font-plex-mono), monospace',
              fontSize: '0.75rem',
              color: '#9CA3AF',
            }}
          >
            {selected.size} selected
          </p>
          <GlassButton
            onClick={() => onCreateEdition(title.trim(), [...selected])}
            disabled={!canCreate}
            primary
          >
            Create edition
          </GlassButton>
        </div>
      </motion.div>
    </div>
  )
}
