'use client'

import { motion } from 'motion/react'
import { Shield, Trash2 } from 'lucide-react'
import { GlassButton, GlassPanel } from '../ui/GlassPanel'
import { getKindConfig } from '@/lib/kinds'
import type { Evidence } from '@/lib/types'

interface DetailScreenProps {
  item: Evidence
  onBack: () => void
  onReflect: () => void
  onDelete: () => void
}

export function DetailScreen({ item, onBack, onReflect, onDelete }: DetailScreenProps) {
  const config = getKindConfig(item.kind)

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
          ← Ledger
        </button>

        <div className="flex items-center justify-between mb-6">
          <span
            style={{
              fontFamily: 'var(--font-plex-mono), monospace',
              fontSize: '0.7rem',
              color: '#AEE4FF',
              letterSpacing: '0.1em',
            }}
          >
            {config.label.toUpperCase()}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-plex-mono), monospace',
              fontSize: '0.7rem',
              color: '#9CA3AF',
            }}
          >
            {new Date(item.createdAt).toLocaleString()}
          </span>
        </div>

        {item.title && (
          <h2
            className="mb-6"
            style={{
              fontFamily: 'var(--font-bodoni), serif',
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              color: '#1F2937',
            }}
          >
            {item.title}
          </h2>
        )}

        <GlassPanel className="p-6 mb-8">
          <p
            className="whitespace-pre-wrap"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.05rem',
              color: '#374151',
              lineHeight: 1.7,
            }}
          >
            {item.body}
          </p>
        </GlassPanel>

        {item.reflection ? (
          <GlassPanel className="p-6 mb-8">
            <p
              className="mb-4 tracking-[0.1em] uppercase"
              style={{
                fontFamily: 'var(--font-plex-mono), monospace',
                fontSize: '0.7rem',
                color: '#6B7280',
              }}
            >
              Reflection
            </p>
            <p
              className="mb-3 leading-relaxed"
              style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#374151' }}
            >
              {item.reflection.observation}
            </p>
            <p
              className="mb-4 italic leading-relaxed"
              style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#6B7280', fontSize: '0.95rem' }}
            >
              {item.reflection.inference}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-3.5 h-3.5" style={{ color: '#AEE4FF' }} />
              <span
                style={{
                  fontFamily: 'var(--font-plex-mono), monospace',
                  fontSize: '0.65rem',
                  color: '#9CA3AF',
                  letterSpacing: '0.08em',
                }}
              >
                AI BOUNDARIES
              </span>
            </div>
            <ul className="space-y-1">
              {item.reflection.boundaries.map((b) => (
                <li
                  key={b}
                  className="flex gap-2"
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.85rem',
                    color: '#6B7280',
                  }}
                >
                  <span style={{ color: '#AEE4FF' }}>·</span>
                  {b}
                </li>
              ))}
            </ul>
          </GlassPanel>
        ) : (
          <div className="mb-8">
            <GlassButton onClick={onReflect}>Receive reflection</GlassButton>
          </div>
        )}

        <button
          type="button"
          onClick={onDelete}
          className="flex items-center gap-2 text-sm mt-8"
          style={{ fontFamily: 'var(--font-plex-mono), monospace', color: '#9CA3AF' }}
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete evidence
        </button>
      </motion.div>
    </div>
  )
}
