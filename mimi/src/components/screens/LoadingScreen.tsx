'use client'

import { motion } from 'motion/react'

const MESSAGES = [
  'Listening to your thought...',
  'Translating feeling into form...',
  'Deriving evidence from words...',
  'Shaping your echo...',
]

interface LoadingScreenProps {
  thought: string
}

export function LoadingScreen({ thought }: LoadingScreenProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F8FF 100%)' }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-8 text-center max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-24 h-24 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #AEE4FF 0%, #F6C8FF 100%)',
            boxShadow: '0 0 40px rgba(174, 228, 255, 0.5)',
          }}
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.p
          style={{
            fontFamily: 'var(--font-bodoni), serif',
            fontSize: '1.5rem',
            color: '#4B5563',
            fontStyle: 'italic',
          }}
        >
          &ldquo;{thought}&rdquo;
        </motion.p>

        <motion.div
          style={{
            fontFamily: 'var(--font-plex-mono), monospace',
            fontSize: '0.875rem',
            color: '#6B7280',
            letterSpacing: '0.05em',
          }}
        >
          {MESSAGES.map((msg, i) => (
            <motion.p
              key={msg}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                times: [0, 0.1, 0.9, 1],
              }}
              className="absolute"
            >
              {msg}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
