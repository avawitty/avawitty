# Mimi — Evidence Studio

> **Identity is evidence, not output.**

Mimi is a local-first creative ledger for collecting what you make — fragments, poems, essays, notes — and curating them into zine editions.

## What it does

1. **Add evidence** — Capture writing in four types: fragment, poem, essay, note
2. **Build your ledger** — A timeline of everything you've created (your identity, not a bio)
3. **Receive reflection** — Optional honest commentary with stated AI boundaries
4. **Curate editions** — Select pieces and export as markdown for mimi-zine

## Quick start

```bash
cd mimi
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Core loop

```
Add evidence → Ledger → Reflect (optional) → Curate edition → Export
```

Everything stays in your browser (localStorage). No account, no cloud, no API keys.

## Architecture

```
mimi/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/
│   │   ├── screens/            # Home, Capture, Ledger, Detail, Curate, Edition
│   │   ├── ui/                 # Glass design system
│   │   └── Studio.tsx          # App state machine
│   └── lib/
│       ├── kinds.ts            # Evidence types (fragment, poem, essay, note)
│       ├── evidence-store.ts   # localStorage + markdown export
│       └── reflection.ts       # Honest template reflections
└── docs/
    ├── CONCEPT.md
    ├── DESIGN.md
    └── IOS.md
```

## Own repo

Designed to live as `avawitty/mimi`:

```bash
cd mimi
git init
git remote add origin https://github.com/avawitty/mimi.git
git add . && git commit -m "feat: Mimi Evidence Studio"
git push -u origin main
```

## What Mimi is not

- Not an AI art generator (that's OmniLoop — a separate project)
- Not a social platform
- Not a cloud service

## Roadmap

- [ ] Import/export full ledger as JSON (backup + portability)
- [ ] Image evidence (upload photos/art)
- [ ] Direct publish flow to mimi-zine
- [ ] Optional opt-in AI reflection (BYOK)
- [ ] iOS companion (see `docs/IOS.md`)

## License

MIT
