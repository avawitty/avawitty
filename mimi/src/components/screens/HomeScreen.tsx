'use client'

import { motion } from 'motion/react'
import { GlassButton } from '../ui/GlassPanel'
import type { Evidence } from '@/lib/types'

interface HomeScreenProps {
  recent: Evidence[]
  total: number
  onAdd: () => void
  onLedger: () => void
  onCurate: () => void
  onOpen: (id: string) => void
}

export function HomeScreen({
  recent,
  total,
  onAdd,
  onLedger,
  onCurate,
  onOpen,
}: HomeScreenProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8FF 100%)' }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(174, 228, 255, 0.25) 0%, rgba(246, 200, 255, 0.15) 50%, transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <p
          className="mb-3 tracking-[0.2em] uppercase"
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            fontSize: '0.7rem',
            color: '#9CA3AF',
          }}
        >
          Evidence Studio
        </p>

        <h1
          className="mb-4"
          style={{
            fontFamily: 'var(--font-bodoni), serif',
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            background: 'linear-gradient(135deg, #AEE4FF 0%, #F6C8FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Mimi
        </h1>

        <p
          className="mb-10 max-w-md leading-relaxed"
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '1.05rem',
            color: '#4B5563',
          }}
        >
          Collect what you make. Your ledger is your identity — not a bio, not a persona.
        </p>

        <div className="flex flex-wrap gap-3 mb-12">
          <GlassButton onClick={onAdd} primary>
            Add evidence
          </GlassButton>
          {total > 0 && (
            <>
              <GlassButton onClick={onLedger}>Ledger ({total})</GlassButton>
              <GlassButton onClick={onCurate}>Curate edition</GlassButton>
            </>
          )}
        </div>

        {recent.length > 0 && (
          <div>
            <p
              className="mb-4 tracking-[0.1em] uppercase"
              style={{
                fontFamily: 'var(--font-plex-mono), monospace',
                fontSize: '0.7rem',
                color: '#9CA3AF',
              }}
            >
              Recent
            </p>
            <div className="space-y-3">
              {recent.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpen(item.id)}
                  className="w-full text-left p-4 rounded-2xl transition-all hover:scale-[1.01]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      style={{
                        fontFamily: 'var(--font-plex-mono), monospace',
                        fontSize: '0.65rem',
                        color: '#AEE4FF',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {item.kind.toUpperCase()}
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
                  <p
                    className="line-clamp-2"
                    style={{
                      fontFamily: 'var(--font-bodoni), serif',
                      fontSize: '1.05rem',
                      color: '#374151',
                    }}
                  >
                    {item.title || item.body}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
