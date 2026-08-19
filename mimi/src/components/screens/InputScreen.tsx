'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { GlassButton, GlassPanel } from '../ui/GlassPanel'
import { STYLE_LENSES } from '@/lib/styles'
import type { StyleLens } from '@/lib/types'

interface InputScreenProps {
  onGenerate: (thought: string, style: StyleLens) => void
  onBack: () => void
}

export function InputScreen({ onGenerate, onBack }: InputScreenProps) {
  const [thought, setThought] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<StyleLens>('Iridescent')

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8FF 100%)' }}
      />

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          type="button"
          onClick={onBack}
          className="mb-6 text-sm"
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            color: '#6B7280',
          }}
        >
          ← Back
        </button>

        <h2
          className="text-center mb-8"
          style={{
            fontFamily: 'var(--font-bodoni), serif',
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            background: 'linear-gradient(135deg, #AEE4FF 0%, #F6C8FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          What are you thinking?
        </h2>

        <GlassPanel className="p-1 mb-10">
          <textarea
            value={thought}
            onChange={(e) => setThought(e.target.value)}
            placeholder="A thought worth preserving..."
            className="w-full px-6 py-4 rounded-3xl resize-none bg-transparent outline-none"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1.125rem',
              minHeight: '120px',
              color: '#1F2937',
            }}
          />
        </GlassPanel>

        <p
          className="text-center mb-6"
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            fontSize: '0.875rem',
            color: '#6B7280',
            letterSpacing: '0.05em',
          }}
        >
          CHOOSE YOUR LENS
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10">
          {STYLE_LENSES.map((style, index) => {
            const Icon = style.icon
            const isSelected = selectedStyle === style.name
            return (
              <motion.button
                key={style.name}
                type="button"
                onClick={() => setSelectedStyle(style.name)}
                className="relative p-5 rounded-2xl flex flex-col items-center gap-3"
                style={{
                  background: isSelected
                    ? 'rgba(255, 255, 255, 0.25)'
                    : 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(25px)',
                  border: isSelected
                    ? '2px solid rgba(174, 228, 255, 0.8)'
                    : '1px solid rgba(255, 255, 255, 0.4)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: style.gradient }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.875rem',
                    color: '#1F2937',
                  }}
                >
                  {style.name}
                </span>
              </motion.button>
            )
          })}
        </div>

        <div className="flex justify-center">
          <GlassButton
            onClick={() => onGenerate(thought.trim(), selectedStyle)}
            disabled={!thought.trim()}
            primary
          >
            Generate Echo
          </GlassButton>
        </div>
      </motion.div>
    </div>
  )
}
