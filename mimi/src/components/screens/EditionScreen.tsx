'use client'

import { motion } from 'motion/react'
import { Download } from 'lucide-react'
import { GlassButton, GlassPanel } from '../ui/GlassPanel'
import { getKindConfig } from '@/lib/kinds'
import type { Edition, Evidence } from '@/lib/types'

interface EditionScreenProps {
  edition: Edition
  items: Evidence[]
  onBack: () => void
  onExport: () => void
  onHome: () => void
}

export function EditionScreen({ edition, items, onBack, onExport, onHome }: EditionScreenProps) {
  const selected = edition.evidenceIds
    .map((id) => items.find((e) => e.id === id))
    .filter((e): e is Evidence => Boolean(e))

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

        <p
          className="mb-2 tracking-[0.1em] uppercase"
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            fontSize: '0.7rem',
            color: '#9CA3AF',
          }}
        >
          Edition ready
        </p>

        <h2
          className="mb-2"
          style={{
            fontFamily: 'var(--font-bodoni), serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            background: 'linear-gradient(135deg, #AEE4FF 0%, #F6C8FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {edition.title}
        </h2>
        <p
          className="mb-8"
          style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#6B7280' }}
        >
          {selected.length} pieces · {new Date(edition.createdAt).toLocaleDateString()}
        </p>

        <div className="space-y-4 mb-10">
          {selected.map((item, index) => (
            <GlassPanel key={item.id} className="p-5">
              <p
                className="mb-2"
                style={{
                  fontFamily: 'var(--font-plex-mono), monospace',
                  fontSize: '0.65rem',
                  color: '#AEE4FF',
                  letterSpacing: '0.08em',
                }}
              >
                {String(index + 1).padStart(2, '0')} · {getKindConfig(item.kind).label.toUpperCase()}
              </p>
              {item.title && (
                <p
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-bodoni), serif',
                    fontSize: '1.1rem',
                    color: '#1F2937',
                  }}
                >
                  {item.title}
                </p>
              )}
              <p
                className="line-clamp-4 whitespace-pre-wrap"
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.9rem',
                  color: '#4B5563',
                  lineHeight: 1.5,
                }}
              >
                {item.body}
              </p>
            </GlassPanel>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <GlassButton onClick={onExport} primary>
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export markdown
            </span>
          </GlassButton>
          <GlassButton onClick={onHome}>Done</GlassButton>
        </div>
      </motion.div>
    </div>
  )
}
