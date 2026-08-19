# Mimi — Evidence Studio

> **Identity is evidence, not output.**

Mimi is a minimum viable product that synthesizes your creative work across repos — OmniLoop's iridescent aesthetic, the mimi-zine publishing ethos, and the honest human–AI philosophy from `you` — into a single personal creative studio.

## What it does

1. **Capture** — Write a thought and choose a visual lens (Iridescent, VHS Noir, Anime Diner, Space Western)
2. **Echo** — Generate a unique procedural artwork derived from your words (not a stock image)
3. **Reflect** — Receive an honest AI reflection with stated boundaries (no false consciousness)
4. **Evidence** — Save echoes to a personal ledger that *is* your profile

## Quick start

```bash
cd mimi
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture

```
mimi/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/
│   │   ├── screens/      # Start → Input → Loading → Preview → Reflection → Evidence
│   │   ├── ui/           # Glass design system
│   │   └── Studio.tsx    # Main state machine
│   └── lib/
│       ├── echo-generator.ts   # Procedural art from thought + style
│       ├── reflection.ts       # Honest AI reflection with boundaries
│       ├── evidence-store.ts   # localStorage persistence
│       └── styles.ts           # Four visual lenses
├── docs/
│   ├── CONCEPT.md        # Product vision
│   ├── DESIGN.md         # Interface design system
│   └── IOS.md            # iOS app concept
└── README.md
```

## Synthesized from your repos

| Source | What Mimi inherits |
|--------|-------------------|
| [Interactiveartexperience](https://github.com/avawitty/Interactiveartexperience) | Iridescent glass UI, four style lenses, cinematic flow |
| [mimi-zine](https://github.com/avawitty/mimi-zine) | Evidence-based identity, editorial publishing ethos |
| [you](https://github.com/avawitty/you) | Honest AI boundaries, "built for you" philosophy |
| [inbucube](https://github.com/avawitty/inbucube) | Structured spec patterns (future: DesignSpec for features) |

## Own repo

This MVP is designed to live as its own repository (`avawitty/mimi`). To split it out:

```bash
cd mimi
git init
git remote add origin https://github.com/avawitty/mimi.git
git add .
git commit -m "feat: Mimi Evidence Studio MVP"
git push -u origin main
```

## Roadmap

- [ ] AI image generation (Vercel AI Gateway / Gemini) behind style lenses
- [ ] Voice sculpt layer (MediaRecorder + Web Audio)
- [ ] Zine edition export to mimi-zine
- [ ] iOS companion app (see `docs/IOS.md`)
- [ ] Supabase sync for cross-device evidence

## License

MIT
