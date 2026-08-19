import { getKindConfig } from './kinds'
import type { Evidence, Reflection } from './types'

const OBSERVATIONS: Record<string, string[]> = {
  fragment: [
    'This reads like raw material — unfinished on purpose, or stopping before it over-explains.',
    'Fragments often carry more weight than polished pieces. Something here was worth catching.',
  ],
  poem: [
    'The rhythm and line breaks suggest care in how this was shaped, not just what it says.',
    'There is attention to sound and silence here — the form is doing work alongside the words.',
  ],
  essay: [
    'This piece builds something — an argument, a narrative, a line of thinking held across sentences.',
    'The length and structure suggest you were working something out, not just recording a moment.',
  ],
  note: [
    'Notes are evidence of attention — something you noticed and did not want to lose.',
    'This has the directness of something written for yourself first.',
  ],
}

const INFERENCES: string[] = [
  'I am reading tone and structure only. I do not know the context behind this.',
  'Any meaning I suggest is pattern-matching on language, not knowledge of your life.',
  'What resonates here is what you wrote — not what I project onto it.',
]

export function generateReflection(evidence: Evidence): Reflection {
  const config = getKindConfig(evidence.kind)
  const pool = OBSERVATIONS[evidence.kind]
  const seed = evidence.body.length + (evidence.title?.length ?? 0)
  const observation = pool[seed % pool.length]
  const inference = INFERENCES[seed % INFERENCES.length]

  return {
    observation,
    inference,
    boundaries: [
      `I have only this ${config.label.toLowerCase()} — no other evidence about you.`,
      'This reflection is generated from text patterns, not memory or intuition.',
      'You authored this piece. I am offering a mirror, not an interpretation of who you are.',
      'If this does not land, discard it. Your work stands without my commentary.',
    ],
    createdAt: new Date().toISOString(),
  }
}
