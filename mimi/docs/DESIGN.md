# Mimi — Interface Design

## Design philosophy

Mimi should feel like a **quiet studio** — not a social app, not a game, not a dashboard. Unhurried. Glass surfaces. Typography that respects the writing.

## Visual language

| Element | Specification |
|---------|--------------|
| Background | White → `#F8F8FF` gradient with soft iridescent shimmer |
| Surfaces | Glass panels: `rgba(255,255,255,0.15)` + `blur(30px)` |
| Accent | Iridescent gradient: `#AEE4FF` → `#F6C8FF` |
| Display type | Bodoni Moda — titles, edition names, evidence headings |
| Labels | IBM Plex Mono — type badges, timestamps, boundaries |
| Body | Inter — evidence text, descriptions, reflections |

## Screen map

```
Home
├── Add evidence → Capture
├── Ledger (n) → Ledger
├── Curate edition → Curate
└── Recent items → Detail

Capture
└── Save → Detail

Ledger
├── Item tap → Detail
├── Add → Capture
└── Curate → Curate

Detail
├── Receive reflection (optional)
└── Delete

Curate
└── Create edition → Edition

Edition
├── Export markdown
└── Done → Home
```

## Key UX decisions

### 1. "Add evidence" not "Create" or "Generate"

The primary action preserves your work. It doesn't manufacture anything. Language matters.

### 2. Ledger replaces Profile

No avatar. No bio. Your ledger count and recent pieces *are* your identity page.

### 3. Reflection is opt-in per piece

Not forced after every capture. You choose when you want a mirror.

### 4. Curate is manual

Checkbox selection, edition title, export. No algorithm suggesting what to include.

### 5. Type pills, not style lenses

Four evidence types (fragment, poem, essay, note) — functional, not aesthetic. The aesthetic is Mimi's glass UI, not a filter on your content.

## Mobile

- Single column layout throughout
- Touch targets ≥ 44px
- Type pills wrap on narrow screens
- Evidence body uses comfortable line-height (1.6–1.7)

## What we removed from v1

These were OmniLoop artifacts, not Mimi:

- Style lenses (Iridescent, VHS Noir, etc.)
- Procedural echo generation
- Waveform visualization
- Loading/generation interstitial
- "Generate Scene" as primary action
