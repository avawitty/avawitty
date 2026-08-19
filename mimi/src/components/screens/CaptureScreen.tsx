'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { GlassButton, GlassPanel } from '../ui/GlassPanel'
import { EVIDENCE_KINDS } from '@/lib/kinds'
import type { EvidenceKind } from '@/lib/types'

interface CaptureScreenProps {
  onSave: (data: { kind: EvidenceKind; title?: string; body: string }) => void
  onBack: () => void
}

export function CaptureScreen({ onSave, onBack }: CaptureScreenProps) {
  const [kind, setKind] = useState<EvidenceKind>('fragment')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const config = EVIDENCE_KINDS.find((k) => k.kind === kind) ?? EVIDENCE_KINDS[0]
  const canSave = body.trim().length > 0

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
          Add evidence
        </h2>
        <p
          className="mb-8"
          style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#6B7280', fontSize: '0.95rem' }}
        >
          {config.description}
        </p>

        <p
          className="mb-3 tracking-[0.1em] uppercase"
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            fontSize: '0.7rem',
            color: '#9CA3AF',
          }}
        >
          Type
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {EVIDENCE_KINDS.map((k) => (
            <button
              key={k.kind}
              type="button"
              onClick={() => setKind(k.kind)}
              className="px-4 py-2 rounded-full text-sm transition-all"
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                background: kind === k.kind ? 'linear-gradient(135deg, #AEE4FF, #F6C8FF)' : 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.5)',
                color: '#374151',
              }}
            >
              {k.label}
            </button>
          ))}
        </div>

        <GlassPanel className="p-1 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full px-5 py-3 bg-transparent outline-none"
            style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#1F2937' }}
          />
        </GlassPanel>

        <GlassPanel className="p-1 mb-8">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={config.placeholder}
            className="w-full px-5 py-4 bg-transparent outline-none resize-none"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.05rem',
              minHeight: '200px',
              color: '#1F2937',
              lineHeight: 1.6,
            }}
            autoFocus
          />
        </GlassPanel>

        <div className="flex justify-end">
          <GlassButton
            onClick={() => onSave({ kind, title: title.trim() || undefined, body: body.trim() })}
            disabled={!canSave}
            primary
          >
            Save to ledger
          </GlassButton>
        </div>
      </motion.div>
    </div>
  )
}
