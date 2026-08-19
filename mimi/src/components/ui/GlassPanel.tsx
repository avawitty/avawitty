import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  selected?: boolean
}

export function GlassPanel({ children, className = '', selected = false }: GlassPanelProps) {
  return (
    <div
      className={`rounded-3xl ${className}`}
      style={{
        background: selected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(30px)',
        border: selected
          ? '2px solid rgba(174, 228, 255, 0.8)'
          : '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: selected ? '0 0 30px rgba(174, 228, 255, 0.4)' : 'none',
      }}
    >
      {children}
    </div>
  )
}

export function GlassButton({
  children,
  onClick,
  disabled,
  primary,
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  primary?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-4 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{
        background: primary
          ? 'linear-gradient(135deg, #AEE4FF 0%, #F6C8FF 100%)'
          : 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: '1rem',
        color: '#1F2937',
      }}
    >
      {children}
    </button>
  )
}
