'use client'

import { motion } from 'motion/react'
import { GlassButton } from '../ui/GlassPanel'

interface StartScreenProps {
  onBegin: () => void
  onViewEvidence: () => void
  echoCount: number
}

export function StartScreen({ onBegin, onViewEvidence, echoCount }: StartScreenProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8FF 100%)' }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(174, 228, 255, 0.3) 0%, rgba(246, 200, 255, 0.3) 50%, rgba(255, 255, 255, 0) 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center px-8 py-12 text-center max-w-2xl">
        <motion.p
          className="mb-4 tracking-[0.2em] uppercase"
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            fontSize: '0.75rem',
            color: '#6B7280',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Evidence Studio
        </motion.p>

        <motion.h1
          className="mb-6 tracking-tight"
          style={{
            fontFamily: 'var(--font-bodoni), serif',
            fontSize: 'clamp(3rem, 10vw, 5.5rem)',
            background: 'linear-gradient(135deg, #AEE4FF 0%, #F6C8FF 50%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Mimi
        </motion.h1>

        <motion.p
          className="mb-10 max-w-md leading-relaxed"
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '1.125rem',
            color: '#4B5563',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Turn a thought into visual evidence. AI reflects — it never authors your identity.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GlassButton onClick={onBegin} primary>
            Create an Echo
          </GlassButton>
          {echoCount > 0 && (
            <GlassButton onClick={onViewEvidence}>
              View Evidence ({echoCount})
            </GlassButton>
          )}
        </motion.div>

        <motion.p
          className="mt-12"
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            fontSize: '0.7rem',
            color: '#9CA3AF',
            letterSpacing: '0.05em',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          IDENTITY IS EVIDENCE, NOT OUTPUT
        </motion.p>
      </div>
    </div>
  )
}
