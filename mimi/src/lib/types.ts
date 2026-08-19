export type StyleLens =
  | 'Iridescent'
  | 'VHS Noir'
  | 'Anime Diner'
  | 'Space Western'

export type StudioScreen =
  | 'start'
  | 'input'
  | 'loading'
  | 'preview'
  | 'reflection'
  | 'evidence'

export interface Echo {
  id: string
  thought: string
  style: StyleLens
  imageDataUrl: string
  createdAt: string
  reflection?: Reflection
}

export interface Reflection {
  observation: string
  inference: string
  boundaries: string[]
  createdAt: string
}

export interface EvidenceStats {
  totalEchoes: number
  stylesUsed: StyleLens[]
  firstEcho?: string
  latestEcho?: string
}
