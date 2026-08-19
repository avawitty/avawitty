'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { v4 as uuidv4 } from 'uuid'
import { HomeScreen } from './screens/HomeScreen'
import { CaptureScreen } from './screens/CaptureScreen'
import { LedgerScreen } from './screens/LedgerScreen'
import { DetailScreen } from './screens/DetailScreen'
import { CurateScreen } from './screens/CurateScreen'
import { EditionScreen } from './screens/EditionScreen'
import {
  loadEvidence,
  saveEvidenceItem,
  updateEvidenceItem,
  deleteEvidenceItem,
  saveEdition,
  exportEditionMarkdown,
  downloadTextFile,
} from '@/lib/evidence-store'
import { generateReflection } from '@/lib/reflection'
import type { AppScreen, Edition, Evidence, EvidenceKind } from '@/lib/types'

export function Studio() {
  const [screen, setScreen] = useState<AppScreen>('home')
  const [evidence, setEvidence] = useState<Evidence[]>(() =>
    typeof window !== 'undefined' ? loadEvidence() : [],
  )
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeEdition, setActiveEdition] = useState<Edition | null>(null)
  const [detailReturn, setDetailReturn] = useState<AppScreen>('ledger')

  const activeItem = activeId ? evidence.find((e) => e.id === activeId) : null

  const handleSave = useCallback((data: { kind: EvidenceKind; title?: string; body: string }) => {
    const now = new Date().toISOString()
    const item: Evidence = {
      id: uuidv4(),
      kind: data.kind,
      title: data.title,
      body: data.body,
      createdAt: now,
      updatedAt: now,
    }
    const updated = saveEvidenceItem(item)
    setEvidence(updated)
    setActiveId(item.id)
    setDetailReturn('capture')
    setScreen('detail')
  }, [])

  const handleReflect = useCallback(() => {
    if (!activeItem) {
      return
    }
    const reflection = generateReflection(activeItem)
    const updated_item: Evidence = {
      ...activeItem,
      reflection,
      updatedAt: new Date().toISOString(),
    }
    const updated = updateEvidenceItem(updated_item)
    setEvidence(updated)
  }, [activeItem])

  const handleDelete = useCallback(() => {
    if (!activeId) {
      return
    }
    const updated = deleteEvidenceItem(activeId)
    setEvidence(updated)
    setActiveId(null)
    setScreen('ledger')
  }, [activeId])

  const handleCreateEdition = useCallback((title: string, evidenceIds: string[]) => {
    const edition: Edition = {
      id: uuidv4(),
      title,
      evidenceIds,
      createdAt: new Date().toISOString(),
    }
    saveEdition(edition)
    setActiveEdition(edition)
    setScreen('edition')
  }, [])

  const handleExport = useCallback(() => {
    if (!activeEdition) {
      return
    }
    const markdown = exportEditionMarkdown(activeEdition, evidence)
    const slug = activeEdition.title.toLowerCase().replace(/\s+/g, '-')
    downloadTextFile(`mimi-edition-${slug}.md`, markdown)
  }, [activeEdition, evidence])

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  }

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <HomeScreen
              recent={evidence}
              total={evidence.length}
              onAdd={() => setScreen('capture')}
              onLedger={() => setScreen('ledger')}
              onCurate={() => setScreen('curate')}
              onOpen={(id) => {
                setActiveId(id)
                setDetailReturn('home')
                setScreen('detail')
              }}
            />
          </motion.div>
        )}

        {screen === 'capture' && (
          <motion.div key="capture" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <CaptureScreen onSave={handleSave} onBack={() => setScreen('home')} />
          </motion.div>
        )}

        {screen === 'ledger' && (
          <motion.div key="ledger" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <LedgerScreen
              items={evidence}
              onBack={() => setScreen('home')}
              onOpen={(id) => {
                setActiveId(id)
                setDetailReturn('ledger')
                setScreen('detail')
              }}
              onAdd={() => setScreen('capture')}
              onCurate={() => setScreen('curate')}
            />
          </motion.div>
        )}

        {screen === 'detail' && activeItem && (
          <motion.div key="detail" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <DetailScreen
              item={activeItem}
              onBack={() => setScreen(detailReturn)}
              onReflect={handleReflect}
              onDelete={handleDelete}
            />
          </motion.div>
        )}

        {screen === 'curate' && (
          <motion.div key="curate" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <CurateScreen
              items={evidence}
              onBack={() => setScreen('home')}
              onCreateEdition={handleCreateEdition}
            />
          </motion.div>
        )}

        {screen === 'edition' && activeEdition && (
          <motion.div key="edition" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <EditionScreen
              edition={activeEdition}
              items={evidence}
              onBack={() => setScreen('curate')}
              onExport={handleExport}
              onHome={() => {
                setActiveEdition(null)
                setScreen('home')
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
