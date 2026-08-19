'use client'

import { motion } from 'motion/react'
import { GlassButton, GlassPanel } from '../ui/GlassPanel'
import { getKindConfig } from '@/lib/kinds'
import type { Evidence } from '@/lib/types'

interface LedgerScreenProps {
  items: Evidence[]
  onBack: () => void
  onOpen: (id: string) => void
  onAdd: () => void
  onCurate: () => void
}

export function LedgerScreen({ items, onBack, onOpen, onAdd, onCurate }: LedgerScreenProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden px-6 py-10">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8FF 100%)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 text-sm"
          style={{ fontFamily: 'var(--font-plex-mono), monospace', color: '#6B7280' }}
        >
          ← Home
        </button>

        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-bodoni), serif',
                fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                background: 'linear-gradient(135deg, #AEE4FF 0%, #F6C8FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Ledger
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#6B7280', fontSize: '0.9rem' }}>
              {items.length} {items.length === 1 ? 'piece' : 'pieces'} of evidence
            </p>
          </div>
          <div className="flex gap-2">
            <GlassButton onClick={onAdd}>Add</GlassButton>
            {items.length > 0 && <GlassButton onClick={onCurate}>Curate</GlassButton>}
          </div>
        </div>

        {items.length === 0 ? (
          <GlassPanel className="p-10 text-center">
            <p style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#6B7280' }}>
              Nothing here yet. Add your first piece of evidence.
            </p>
          </GlassPanel>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => onOpen(item.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="w-full text-left"
              >
                <GlassPanel className="p-5 hover:scale-[1.01] transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      style={{
                        fontFamily: 'var(--font-plex-mono), monospace',
                        fontSize: '0.65rem',
                        color: '#AEE4FF',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {getKindConfig(item.kind).label.toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-plex-mono), monospace',
                        fontSize: '0.65rem',
                        color: '#9CA3AF',
                      }}
                    >
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {item.title && (
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: 'var(--font-bodoni), serif',
                        fontSize: '1.15rem',
                        color: '#1F2937',
                      }}
                    >
                      {item.title}
                    </p>
                  )}
                  <p
                    className="line-clamp-3 whitespace-pre-wrap"
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.95rem',
                      color: '#4B5563',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.body}
                  </p>
                  {item.reflection && (
                    <p
                      className="mt-3 text-xs"
                      style={{ fontFamily: 'var(--font-plex-mono), monospace', color: '#9CA3AF' }}
                    >
                      Has reflection
                    </p>
                  )}
                </GlassPanel>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
