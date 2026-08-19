# Mimi iOS — Companion Concept

## Why iOS fits Mimi

Evidence capture is mobile-native. Thoughts happen away from a desk. A pocket ledger for fragments and notes is more natural than a generative art studio.

## Recommended approach

**SwiftUI native app** in a separate repo (`avawitty/mimi-ios`), sharing the Echo/Reflection JSON contract with web for future sync.

## Core screens (match web)

| Screen | Purpose |
|--------|---------|
| Home | Recent evidence, quick add, ledger count |
| Capture | Type picker + title + body |
| Ledger | Full timeline |
| Detail | Read piece, optional reflection, delete |
| Curate | Select for edition |
| Edition | Preview + share/export |

## iOS-specific additions (v0.2+)

| Feature | Why |
|---------|-----|
| Siri Shortcut: "Add to Mimi" | Frictionless fragment capture |
| Share Sheet import | Send text from any app into Mimi |
| Widget: recent evidence | Glanceable ledger |
| iCloud sync | Cross-device without a custom backend |

## What iOS should NOT include (unless OmniLoop is separate)

- Style lenses / visual echo generation
- Voice sculpt
- Social gallery

## Data model (shared with web)

```swift
struct Evidence: Codable, Identifiable {
    let id: UUID
    let kind: EvidenceKind
    let title: String?
    let body: String
    let createdAt: Date
    let updatedAt: Date
    var reflection: Reflection?
}

enum EvidenceKind: String, Codable, CaseIterable {
    case fragment, poem, essay, note
}
```

## MVP scope for iOS v0.1

- [x] Concept aligned with web
- [ ] Capture + ledger + detail
- [ ] SwiftData local persistence
- [ ] Curate + export markdown via Share Sheet
- [ ] Reflection with boundaries UI

## Repo structure

```
avawitty/mimi       ← Web (this repo)
avawitty/mimi-ios   ← SwiftUI companion
```

Keep them separate. Share docs and JSON schema, not code.
