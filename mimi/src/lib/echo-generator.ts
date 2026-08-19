import { getStyleConfig } from './styles'
import type { StyleLens } from './types'

function hashString(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function seededRandom(seed: number): () => number {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

export function generateEchoArt(thought: string, style: StyleLens): string {
  const config = getStyleConfig(style)
  const seed = hashString(`${thought}:${style}`)
  const rand = seededRandom(seed)

  const width = 1080
  const height = 608
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return ''
  }

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  config.palette.forEach((color, index) => {
    gradient.addColorStop(index / (config.palette.length - 1), color)
  })
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const orbCount = 4 + Math.floor(rand() * 6)
  for (let i = 0; i < orbCount; i++) {
    const x = rand() * width
    const y = rand() * height
    const radius = 60 + rand() * 180
    const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    const color = config.palette[Math.floor(rand() * config.palette.length)]
    orbGradient.addColorStop(0, `${color}CC`)
    orbGradient.addColorStop(1, `${color}00`)
    ctx.fillStyle = orbGradient
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const lineCount = 8 + Math.floor(rand() * 12)
  ctx.lineWidth = 1 + rand() * 2
  for (let i = 0; i < lineCount; i++) {
    const color = config.palette[Math.floor(rand() * config.palette.length)]
    ctx.strokeStyle = `${color}66`
    ctx.beginPath()
    ctx.moveTo(rand() * width, rand() * height)
    ctx.bezierCurveTo(
      rand() * width,
      rand() * height,
      rand() * width,
      rand() * height,
      rand() * width,
      rand() * height,
    )
    ctx.stroke()
  }

  const particleCount = 40 + Math.floor(rand() * 80)
  for (let i = 0; i < particleCount; i++) {
    const x = rand() * width
    const y = rand() * height
    const size = 1 + rand() * 3
    const color = config.palette[Math.floor(rand() * config.palette.length)]
    ctx.fillStyle = `${color}${Math.floor(128 + rand() * 127).toString(16).padStart(2, '0')}`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }

  if (style === 'VHS Noir') {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
    for (let y = 0; y < height; y += 3) {
      ctx.fillRect(0, y, width, 1)
    }
  }

  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL('image/png')
}

export async function generateEchoArtAsync(
  thought: string,
  style: StyleLens,
  delayMs = 1800,
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, delayMs))
  return generateEchoArt(thought, style)
}
