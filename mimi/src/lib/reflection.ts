import { getStyleConfig } from './styles'
import type { Reflection, StyleLens } from './types'

const OBSERVATION_TEMPLATES = [
  'Your thought carries a {mood} quality — the kind that lingers after the first read.',
  'There is something deliberate in how you phrased this. It reads less like a caption and more like evidence.',
  'This thought sits at the edge between feeling and form — exactly where echoes tend to emerge.',
]

const INFERENCE_TEMPLATES = [
  'I read this as seeking expression rather than explanation. The {style} lens may amplify that.',
  'The emotional register here feels {mood}. I am inferring tone from word choice, not from knowing you.',
  'Based on structure alone, this seems to want visual space — not literal illustration.',
]

export function generateHonestReflection(
  thought: string,
  style: StyleLens,
): Reflection {
  const config = getStyleConfig(style)
  const thoughtHash = thought.length + thought.split(' ').length
  const observation =
    OBSERVATION_TEMPLATES[thoughtHash % OBSERVATION_TEMPLATES.length].replace(
      '{mood}',
      config.mood,
    )
  const inference =
    INFERENCE_TEMPLATES[thoughtHash % INFERENCE_TEMPLATES.length]
      .replace('{mood}', config.mood)
      .replace('{style}', style)

  return {
    observation,
    inference,
    boundaries: [
      'I do not know who you are beyond this single thought.',
      'This reflection is pattern-matching, not memory or intuition.',
      'The echo image is procedurally derived from your words — not a photograph of your inner life.',
      'You are the author. I am a mirror with stated limits.',
    ],
    createdAt: new Date().toISOString(),
  }
}
