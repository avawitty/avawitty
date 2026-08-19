import type { EvidenceKind } from './types'

export interface KindConfig {
  kind: EvidenceKind
  label: string
  placeholder: string
  description: string
}

export const EVIDENCE_KINDS: KindConfig[] = [
  {
    kind: 'fragment',
    label: 'Fragment',
    placeholder: 'A line, a moment, something half-formed...',
    description: 'Short captures — the raw material of meaning.',
  },
  {
    kind: 'poem',
    label: 'Poem',
    placeholder: 'Write your poem here...',
    description: 'Verse and rhythm, however structured.',
  },
  {
    kind: 'essay',
    label: 'Essay',
    placeholder: 'Begin your essay...',
    description: 'Longer form — an argument, a story, a thread.',
  },
  {
    kind: 'note',
    label: 'Note',
    placeholder: 'What do you want to remember?',
    description: 'Observations, reminders, private thoughts.',
  },
]

export function getKindConfig(kind: EvidenceKind): KindConfig {
  const found = EVIDENCE_KINDS.find((k) => k.kind === kind)
  if (!found) {
    return EVIDENCE_KINDS[0]
  }
  return found
}
