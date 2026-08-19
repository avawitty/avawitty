import { Sparkles, Tv, Utensils, Rocket } from 'lucide-react'
import type { StyleLens } from './types'

export interface StyleConfig {
  name: StyleLens
  icon: typeof Sparkles
  gradient: string
  palette: string[]
  mood: string
}

export const STYLE_LENSES: StyleConfig[] = [
  {
    name: 'Iridescent',
    icon: Sparkles,
    gradient: 'linear-gradient(135deg, #AEE4FF 0%, #F6C8FF 100%)',
    palette: ['#AEE4FF', '#F6C8FF', '#FFFFFF', '#E0F4FF', '#FFD6F8'],
    mood: 'luminous and open',
  },
  {
    name: 'VHS Noir',
    icon: Tv,
    gradient: 'linear-gradient(135deg, #1F2937 0%, #6B7280 100%)',
    palette: ['#1F2937', '#374151', '#6B7280', '#9CA3AF', '#111827'],
    mood: 'grainy and introspective',
  },
  {
    name: 'Anime Diner',
    icon: Utensils,
    gradient: 'linear-gradient(135deg, #FF6B9D 0%, #FFC371 100%)',
    palette: ['#FF6B9D', '#FFC371', '#FF8FAB', '#FFD93D', '#FF4D6D'],
    mood: 'warm and nostalgic',
  },
  {
    name: 'Space Western',
    icon: Rocket,
    gradient: 'linear-gradient(135deg, #4A5568 0%, #9B8B7E 100%)',
    palette: ['#4A5568', '#9B8B7E', '#718096', '#C4A882', '#2D3748'],
    mood: 'vast and solitary',
  },
]

export function getStyleConfig(style: StyleLens): StyleConfig {
  const found = STYLE_LENSES.find((s) => s.name === style)
  if (!found) {
    return STYLE_LENSES[0]
  }
  return found
}
