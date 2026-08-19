'use client'

import { motion } from 'motion/react'
import { Shield } from 'lucide-react'
import { GlassButton, GlassPanel } from '../ui/GlassPanel'
import type { Echo } from '@/lib/types'

interface ReflectionScreenProps {
  echo: Echo
  onSave: () => void
  onHome: () => void
}

export function ReflectionScreen({ echo, onSave, onHome }: ReflectionScreenProps) {
  const reflection = echo.reflection
  if (!reflection) {
    return null
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 py-12">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8FF 100%)' }}
      />

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p
          className="text-center mb-2 tracking-[0.15em] uppercase"
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            fontSize: '0.75rem',
            color: '#6B7280',
          }}
        >
          Honest Reflection
        </p>

        <h2
          className="text-center mb-8"
          style={{
            fontFamily: 'var(--font-bodoni), serif',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            background: 'linear-gradient(135deg, #AEE4FF 0%, #F6C8FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          What I notice
        </h2>

        <GlassPanel className="p-6 mb-6">
          <p
            className="mb-4 leading-relaxed"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.05rem',
              color: '#374151',
            }}
          >
            {reflection.observation}
          </p>
          <p
            className="leading-relaxed italic"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.95rem',
              color: '#6B7280',
            }}
          >
            {reflection.inference}
          </p>
        </GlassPanel>

        <GlassPanel className="p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4" style={{ color: '#AEE4FF' }} />
            <span
              style={{
                fontFamily: 'var(--font-plex-mono), monospace',
                fontSize: '0.75rem',
                color: '#6B7280',
                letterSpacing: '0.05em',
              }}
            >
              AI BOUNDARIES
            </span>
          </div>
          <ul className="space-y-2">
            {reflection.boundaries.map((boundary) => (
              <li
                key={boundary}
                className="flex gap-2"
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.875rem',
                  color: '#4B5563',
                }}
              >
                <span style={{ color: '#AEE4FF' }}>·</span>
                {boundary}
              </li>
            ))}
          </ul>
        </GlassPanel>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GlassButton onClick={onHome}>Create Another</GlassButton>
          <GlassButton onClick={onSave} primary>
            Save to Evidence
          </GlassButton>
        </div>
      </motion.div>
    </div>
  )
}
