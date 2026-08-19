import type { Edition, Evidence, EvidenceKind, LedgerStats } from './types'
import { getKindConfig } from './kinds'

const EVIDENCE_KEY = 'mimi-evidence-v2'
const EDITIONS_KEY = 'mimi-editions-v1'

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback
  }
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      return fallback
    }
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadEvidence(): Evidence[] {
  return readJson<Evidence[]>(EVIDENCE_KEY, [])
}

export function saveEvidenceItem(item: Evidence): Evidence[] {
  const existing = loadEvidence()
  const updated = [item, ...existing.filter((e) => e.id !== item.id)].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  writeJson(EVIDENCE_KEY, updated)
  return updated
}

export function updateEvidenceItem(item: Evidence): Evidence[] {
  const existing = loadEvidence()
  const updated = existing
    .map((e) => (e.id === item.id ? item : e))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  writeJson(EVIDENCE_KEY, updated)
  return updated
}

export function deleteEvidenceItem(id: string): Evidence[] {
  const updated = loadEvidence().filter((e) => e.id !== id)
  writeJson(EVIDENCE_KEY, updated)
  return updated
}

export function getEvidenceById(id: string): Evidence | undefined {
  return loadEvidence().find((e) => e.id === id)
}

export function getLedgerStats(items: Evidence[]): LedgerStats {
  const byKind: Record<EvidenceKind, number> = {
    fragment: 0,
    poem: 0,
    essay: 0,
    note: 0,
  }
  for (const item of items) {
    byKind[item.kind]++
  }
  return {
    total: items.length,
    byKind,
    latestAt: items[0]?.createdAt,
  }
}

export function loadEditions(): Edition[] {
  return readJson<Edition[]>(EDITIONS_KEY, [])
}

export function saveEdition(edition: Edition): Edition[] {
  const existing = loadEditions()
  const updated = [edition, ...existing.filter((e) => e.id !== edition.id)]
  writeJson(EDITIONS_KEY, updated)
  return updated
}

export function exportEditionMarkdown(edition: Edition, items: Evidence[]): string {
  const selected = edition.evidenceIds
    .map((id) => items.find((e) => e.id === id))
    .filter((e): e is Evidence => Boolean(e))

  const lines = [
    `# ${edition.title}`,
    '',
    `*Curated ${new Date(edition.createdAt).toLocaleDateString()} · ${selected.length} pieces*`,
    '',
    '---',
    '',
  ]

  for (const item of selected) {
    const heading = item.title || getKindConfig(item.kind).label
    lines.push(`## ${heading}`)
    lines.push('')
    lines.push(`*${item.kind} · ${new Date(item.createdAt).toLocaleDateString()}*`)
    lines.push('')
    lines.push(item.body)
    lines.push('')
    if (item.reflection) {
      lines.push('> **Reflection**')
      lines.push(`> ${item.reflection.observation}`)
      lines.push('')
    }
    lines.push('---')
    lines.push('')
  }

  lines.push('*Published with Mimi — identity is evidence, not output.*')
  return lines.join('\n')
}

export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
