'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { v4 as uuidv4 } from 'uuid'
import { StartScreen } from './screens/StartScreen'
import { InputScreen } from './screens/InputScreen'
import { LoadingScreen } from './screens/LoadingScreen'
import { PreviewScreen } from './screens/PreviewScreen'
import { ReflectionScreen } from './screens/ReflectionScreen'
import { EvidenceScreen } from './screens/EvidenceScreen'
import { generateEchoArtAsync } from '@/lib/echo-generator'
import { generateHonestReflection } from '@/lib/reflection'
import { loadEchoes, saveEcho } from '@/lib/evidence-store'
import type { Echo, StudioScreen, StyleLens } from '@/lib/types'

export function Studio() {
  const [screen, setScreen] = useState<StudioScreen>('start')
  const [currentEcho, setCurrentEcho] = useState<Echo | null>(null)
  const [echoes, setEchoes] = useState<Echo[]>(() =>
    typeof window !== 'undefined' ? loadEchoes() : [],
  )
  const [pendingThought, setPendingThought] = useState('')

  const handleGenerate = useCallback(async (thought: string, style: StyleLens) => {
    setPendingThought(thought)
    setScreen('loading')

    const imageDataUrl = await generateEchoArtAsync(thought, style)
    const reflection = generateHonestReflection(thought, style)

    const echo: Echo = {
      id: uuidv4(),
      thought,
      style,
      imageDataUrl,
      createdAt: new Date().toISOString(),
      reflection,
    }

    setCurrentEcho(echo)
    setScreen('preview')
  }, [])

  const handleSaveEvidence = useCallback(() => {
    if (!currentEcho) {
      return
    }
    const updated = saveEcho(currentEcho)
    setEchoes(updated)
    setScreen('evidence')
  }, [currentEcho])

  const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  }

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <AnimatePresence mode="wait">
        {screen === 'start' && (
          <motion.div key="start" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <StartScreen
              onBegin={() => setScreen('input')}
              onViewEvidence={() => setScreen('evidence')}
              echoCount={echoes.length}
            />
          </motion.div>
        )}

        {screen === 'input' && (
          <motion.div key="input" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <InputScreen
              onGenerate={handleGenerate}
              onBack={() => setScreen('start')}
            />
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div key="loading" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <LoadingScreen thought={pendingThought} />
          </motion.div>
        )}

        {screen === 'preview' && currentEcho && (
          <motion.div key="preview" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <PreviewScreen
              echo={currentEcho}
              onContinue={() => setScreen('reflection')}
              onRemix={() => setScreen('input')}
            />
          </motion.div>
        )}

        {screen === 'reflection' && currentEcho && (
          <motion.div key="reflection" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ReflectionScreen
              echo={currentEcho}
              onSave={handleSaveEvidence}
              onHome={() => {
                setCurrentEcho(null)
                setScreen('start')
              }}
            />
          </motion.div>
        )}

        {screen === 'evidence' && (
          <motion.div key="evidence" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <EvidenceScreen
              echoes={echoes}
              onBack={() => setScreen('start')}
              onCreate={() => setScreen('input')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
