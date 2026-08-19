export type EvidenceKind = 'fragment' | 'poem' | 'essay' | 'note'

export type AppScreen = 'home' | 'capture' | 'ledger' | 'detail' | 'curate' | 'edition'

export interface Evidence {
  id: string
  kind: EvidenceKind
  title?: string
  body: string
  createdAt: string
  updatedAt: string
  reflection?: Reflection
}

export interface Reflection {
  observation: string
  inference: string
  boundaries: string[]
  createdAt: string
}

export interface Edition {
  id: string
  title: string
  evidenceIds: string[]
  createdAt: string
}

export interface LedgerStats {
  total: number
  byKind: Record<EvidenceKind, number>
  latestAt?: string
}
