'use client'

import { motion } from 'motion/react'
import { GlassButton } from '../ui/GlassPanel'
import { Waveform } from '../Waveform'
import type { Echo } from '@/lib/types'

interface PreviewScreenProps {
  echo: Echo
  onContinue: () => void
  onRemix: () => void
}

export function PreviewScreen({ echo, onContinue, onRemix }: PreviewScreenProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 py-12">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8FF 100%)' }}
      />

      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="relative mb-8 rounded-3xl overflow-hidden"
          style={{
            aspectRatio: '16/9',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 20px 60px rgba(174, 228, 255, 0.2)',
          }}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={echo.imageDataUrl}
            alt={`Echo: ${echo.thought}`}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute top-4 right-4 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              fontFamily: 'var(--font-plex-mono), monospace',
              fontSize: '0.75rem',
              color: '#1F2937',
              letterSpacing: '0.05em',
            }}
          >
            {echo.style.toUpperCase()}
          </div>
        </motion.div>

        <div className="mb-6">
          <Waveform style={echo.style} />
        </div>

        <p
          className="text-center mb-10 px-4"
          style={{
            fontFamily: 'var(--font-bodoni), serif',
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            color: '#4B5563',
            fontStyle: 'italic',
          }}
        >
          &ldquo;{echo.thought}&rdquo;
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GlassButton onClick={onRemix}>Remix Lens</GlassButton>
          <GlassButton onClick={onContinue} primary>
            Receive Reflection
          </GlassButton>
        </div>
      </motion.div>
    </div>
  )
}
