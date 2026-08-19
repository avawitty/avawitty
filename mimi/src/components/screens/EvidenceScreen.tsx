'use client'

import { motion } from 'motion/react'
import { GlassButton, GlassPanel } from '../ui/GlassPanel'
import { getEvidenceStats } from '@/lib/evidence-store'
import type { Echo } from '@/lib/types'

interface EvidenceScreenProps {
  echoes: Echo[]
  onBack: () => void
  onCreate: () => void
}

export function EvidenceScreen({ echoes, onBack, onCreate }: EvidenceScreenProps) {
  const stats = getEvidenceStats(echoes)

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-6 py-12">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8FF 100%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 text-sm"
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            color: '#6B7280',
          }}
        >
          ← Home
        </button>

        <h2
          className="mb-2"
          style={{
            fontFamily: 'var(--font-bodoni), serif',
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            background: 'linear-gradient(135deg, #AEE4FF 0%, #F6C8FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Your Evidence
        </h2>

        <p
          className="mb-8"
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            color: '#6B7280',
          }}
        >
          This is your identity — not a generated bio, but a ledger of what you created.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <GlassPanel className="p-4 text-center">
            <p
              style={{
                fontFamily: 'var(--font-plex-mono), monospace',
                fontSize: '0.7rem',
                color: '#9CA3AF',
                letterSpacing: '0.05em',
              }}
            >
              ECHOES
            </p>
            <p
              style={{
                fontFamily: 'var(--font-bodoni), serif',
                fontSize: '2rem',
                color: '#1F2937',
              }}
            >
              {stats.totalEchoes}
            </p>
          </GlassPanel>
          <GlassPanel className="p-4 text-center col-span-1 sm:col-span-2">
            <p
              style={{
                fontFamily: 'var(--font-plex-mono), monospace',
                fontSize: '0.7rem',
                color: '#9CA3AF',
                letterSpacing: '0.05em',
              }}
            >
              LENSES USED
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.95rem',
                color: '#374151',
              }}
            >
              {stats.stylesUsed.length > 0 ? stats.stylesUsed.join(' · ') : 'None yet'}
            </p>
          </GlassPanel>
        </div>

        {echoes.length === 0 ? (
          <GlassPanel className="p-10 text-center mb-8">
            <p style={{ fontFamily: 'var(--font-inter), sans-serif', color: '#6B7280' }}>
              No evidence yet. Create your first echo.
            </p>
          </GlassPanel>
        ) : (
          <div className="grid gap-6 mb-10">
            {echoes.map((echo, index) => (
              <motion.div
                key={echo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassPanel className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={echo.imageDataUrl}
                      alt={echo.thought}
                      className="w-full sm:w-48 h-32 sm:h-auto object-cover"
                    />
                    <div className="p-5 flex-1">
                      <p
                        className="mb-2 italic"
                        style={{
                          fontFamily: 'var(--font-bodoni), serif',
                          fontSize: '1.1rem',
                          color: '#374151',
                        }}
                      >
                        &ldquo;{echo.thought}&rdquo;
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-plex-mono), monospace',
                          fontSize: '0.7rem',
                          color: '#9CA3AF',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {echo.style.toUpperCase()} ·{' '}
                        {new Date(echo.createdAt).toLocaleDateString()}
                      </p>
                      {echo.reflection && (
                        <p
                          className="mt-2 line-clamp-2"
                          style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: '0.85rem',
                            color: '#6B7280',
                          }}
                        >
                          {echo.reflection.observation}
                        </p>
                      )}
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <GlassButton onClick={onCreate} primary>
            Create New Echo
          </GlassButton>
        </div>
      </div>
    </div>
  )
}
