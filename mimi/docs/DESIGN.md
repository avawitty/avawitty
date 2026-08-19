# Mimi — Interface Design System

## Design philosophy

Mimi's interface should feel like **looking through iridescent glass at your own thoughts** — luminous, honest, and unhurried. It is not a dashboard. It is a studio.

## Recommended interface concept: **Glass Evidence**

### Visual language

| Element | Specification |
|---------|--------------|
| **Background** | White → `#F8F8FF` vertical gradient with animated iridescent radial shimmer |
| **Surfaces** | Glass panels: `rgba(255,255,255,0.15)` + `blur(30px)` + white border at 60% opacity |
| **Primary accent** | Iridescent gradient: `#AEE4FF` → `#F6C8FF` |
| **Typography — Display** | Bodoni Moda (serif) — titles, quotes, echo text |
| **Typography — Labels** | IBM Plex Mono — uppercase metadata, boundaries, timestamps |
| **Typography — Body** | Inter — reflections, descriptions, UI copy |
| **Shape** | Heavy `rounded-3xl` panels, `rounded-full` buttons |
| **Motion** | Page transitions via AnimatePresence; subtle pulse on loading; hover scale 1.02–1.05 |

### Screen architecture

```
┌─────────────────────────────────────────┐
│  START                                  │
│  "Mimi" title + tagline                 │
│  [Create an Echo]  [View Evidence (n)]    │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  INPUT                                  │
│  Thought textarea (glass)               │
│  4 lens cards (2×2 grid)               │
│  [Generate Echo]                        │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  LOADING                                │
│  Animated cube + cycling status text    │
│  User's thought displayed as quote      │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  PREVIEW                                │
│  16:9 echo artwork (procedural)         │
│  Animated waveform                      │
│  Thought quote (Bodoni italic)          │
│  [Remix Lens]  [Receive Reflection]     │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  REFLECTION                             │
│  "What I notice" (observation)          │
│  Inference (italic, muted)              │
│  ┌─ AI BOUNDARIES ─────────────────┐   │
│  │ · I do not know who you are...  │   │
│  │ · This is pattern-matching...   │   │
│  └─────────────────────────────────┘   │
│  [Create Another]  [Save to Evidence]   │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  EVIDENCE                               │
│  Stats: echo count, lenses used         │
│  Scrollable ledger of saved echoes      │
│  Each card: thumbnail + quote + meta    │
│  [Create New Echo]                      │
└─────────────────────────────────────────┘
```

### Key design decisions

#### 1. Reflection is a separate screen (not inline)

Most apps bury AI commentary in small text. Mimi gives reflection its own moment — with an explicit **AI Boundaries** section. This is the ethical differentiator made visible.

#### 2. Evidence replaces Profile

No avatar upload. No bio field. No "about me." Your evidence ledger IS your identity page. Stats show echo count and lenses used — factual, not narrative.

#### 3. Procedural echoes (MVP) → AI echoes (v2)

The MVP generates unique canvas art from thought hash + lens palette. This is intentional: the echo is **evidence of your input**, not a random stock image. v2 can add AI image generation behind the same lens system.

#### 4. Glass over chrome

No navigation bars, no sidebars, no settings panels in MVP. The interface is a linear flow with back buttons. This matches the cinematic quality of your OmniLoop prototype.

### Color tokens

```css
--mimi-cyan: #AEE4FF;
--mimi-pink: #F6C8FF;
--mimi-bg: #F8F8FF;
--mimi-text: #1F2937;
--mimi-muted: #6B7280;
--mimi-subtle: #9CA3AF;
```

### Lens palettes

| Lens | Mood | Primary colors |
|------|------|---------------|
| Iridescent | luminous and open | `#AEE4FF`, `#F6C8FF`, `#FFFFFF` |
| VHS Noir | grainy and introspective | `#1F2937`, `#6B7280`, `#9CA3AF` |
| Anime Diner | warm and nostalgic | `#FF6B9D`, `#FFC371`, `#FF8FAB` |
| Space Western | vast and solitary | `#4A5568`, `#9B8B7E`, `#C4A882` |

### Mobile considerations

- Lens grid: 2×2 on mobile, 4×1 on desktop
- Echo preview: full-width, 16:9 aspect ratio
- Buttons: stack vertically on small screens
- Touch targets: minimum 44px (iOS HIG aligned)
- `viewport` meta: `maximum-scale=1` to prevent zoom jank during transitions

### What NOT to do

- No dark mode in MVP (the iridescent aesthetic depends on light backgrounds)
- No infinite scroll in evidence view (editorial, not feed)
- No social features in MVP (evidence is personal first)
- No AI-generated user bios anywhere in the UI
