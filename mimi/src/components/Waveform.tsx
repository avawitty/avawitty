'use client'

import { useEffect, useRef } from 'react'
import { getStyleConfig } from '@/lib/styles'
import type { StyleLens } from '@/lib/types'

interface WaveformProps {
  style: StyleLens
  isPlaying?: boolean
}

export function Waveform({ style, isPlaying = true }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const config = getStyleConfig(style)
    let frame = 0
    let animationId: number

    const draw = () => {
      const width = canvas.width
      const height = canvas.height
      ctx.clearRect(0, 0, width, height)

      const barCount = 64
      const barWidth = width / barCount

      for (let i = 0; i < barCount; i++) {
        const amplitude = isPlaying
          ? Math.sin((frame + i * 0.3) * 0.08) * 0.5 + 0.5
          : 0.2
        const barHeight = amplitude * height * 0.8
        const color = config.palette[i % config.palette.length]

        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight)
        gradient.addColorStop(0, `${color}44`)
        gradient.addColorStop(1, `${color}CC`)

        ctx.fillStyle = gradient
        ctx.fillRect(i * barWidth + 1, height - barHeight, barWidth - 2, barHeight)
      }

      frame++
      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [style, isPlaying])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={60}
      className="w-full h-15 rounded-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
      }}
    />
  )
}
