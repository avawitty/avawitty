import type { Echo, EvidenceStats } from './types'

const STORAGE_KEY = 'mimi-evidence-v1'

export function loadEchoes(): Echo[] {
  if (typeof window === 'undefined') {
    return []
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    return JSON.parse(raw) as Echo[]
  } catch {
    return []
  }
}

export function saveEcho(echo: Echo): Echo[] {
  const existing = loadEchoes()
  const updated = [echo, ...existing.filter((e) => e.id !== echo.id)]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export function getEvidenceStats(echoes: Echo[]): EvidenceStats {
  const stylesUsed = [...new Set(echoes.map((e) => e.style))]
  return {
    totalEchoes: echoes.length,
    stylesUsed,
    firstEcho: echoes.at(-1)?.createdAt,
    latestEcho: echoes.at(0)?.createdAt,
  }
}
