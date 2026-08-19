# Mimi iOS — Companion App Concept

## Why iOS?

Mimi's core loop — capture a fleeting thought, receive a visual echo, save it as evidence — is inherently **mobile-first**. Thoughts happen on walks, in bed, on trains. The studio should live in your pocket.

The web MVP proves the concept. The iOS app makes it a daily practice.

## Recommended approach: **SwiftUI native app**

### Why native (not React Native / Capacitor)

| Factor | Native SwiftUI | Cross-platform |
|--------|---------------|----------------|
| Voice recording | AVAudioEngine, first-class | WebView limitations |
| Haptic feedback | UIImpactFeedbackGenerator | Limited |
| Widgets | WidgetKit for evidence glance | Not available |
| Design fidelity | Glass effects via `.ultraThinMaterial` | Approximation |
| Your SnapKit fork | Signals iOS comfort | — |

Given your iOS familiarity (SnapKit fork) and Mimi's emphasis on cinematic, tactile UX, **SwiftUI is the right call**.

## App name and positioning

**Mimi** — Evidence Studio

Tagline on App Store: *"Identity is evidence, not output."*

## Core screens (mirror web MVP)

```
TabView (minimal — 2 tabs max)
├── Studio (create flow)
│   ├── StartView
│   ├── InputView (thought + lens picker)
│   ├── LoadingView
│   ├── PreviewView (echo + waveform)
│   └── ReflectionView (honest AI + boundaries)
└── Evidence (ledger)
    ├── EvidenceListView
    └── EchoDetailView
```

## iOS-specific features (beyond web MVP)

### 1. Thought capture via Siri Shortcuts

```
"Hey Siri, echo this thought"
→ Opens Mimi InputView with dictation pre-filled
→ User picks lens → generates echo
```

This makes thought capture frictionless — the app's killer feature on mobile.

### 2. Voice Sculpt layer

Port the VoiceSculpt concept from Interactive Art Experience:

- `AVAudioRecorder` for capture
- `AVAudioEngine` + `AVAudioUnitEQ` for real-time sculpting (texture, distance, tone, presence sliders)
- Attach voice layer to echo as additional evidence

### 3. Evidence Widget (WidgetKit)

Small widget showing:
- Latest echo thumbnail
- Echo count
- "Create" deep link

Medium widget showing:
- Last 3 echoes in a horizontal scroll
- Tap to open detail

### 4. Haptic moments

| Moment | Haptic |
|--------|--------|
| Echo generated | `.success` |
| Save to evidence | `.medium` impact |
| Lens selected | `.light` impact |
| Reflection received | `.soft` |

### 5. Share Sheet integration

Export echo as:
- Image (echo artwork + quote overlay)
- Story-format card (9:16 with glass frame)
- Link to web evidence page (future)

## Technical architecture

```
MimiIOS/
├── MimiApp.swift              # @main entry
├── Models/
│   ├── Echo.swift             # Shared with web via Codable
│   ├── Reflection.swift
│   └── StyleLens.swift
├── Views/
│   ├── Studio/
│   │   ├── StartView.swift
│   │   ├── InputView.swift
│   │   ├── LoadingView.swift
│   │   ├── PreviewView.swift
│   │   └── ReflectionView.swift
│   ├── Evidence/
│   │   ├── EvidenceListView.swift
│   │   └── EchoDetailView.swift
│   └── Components/
│       ├── GlassPanel.swift
│       ├── LensPicker.swift
│       ├── WaveformView.swift
│       └── BoundariesCard.swift
├── Services/
│   ├── EchoGenerator.swift    # Core Graphics procedural art
│   ├── ReflectionService.swift
│   ├── EvidenceStore.swift    # SwiftData / Core Data
│   ├── VoiceService.swift     # AVAudioEngine
│   └── SyncService.swift      # Supabase sync (v2)
├── Widgets/
│   └── EvidenceWidget.swift
└── Intents/
    └── EchoThoughtIntent.swift  # Siri Shortcuts
```

## Shared data contract

Echo model is identical across web and iOS (JSON via Codable):

```swift
struct Echo: Codable, Identifiable {
    let id: UUID
    let thought: String
    let style: StyleLens
    let imageDataBase64: String
    let createdAt: Date
    var reflection: Reflection?
}

struct Reflection: Codable {
    let observation: String
    let inference: String
    let boundaries: [String]
    let createdAt: Date
}

enum StyleLens: String, Codable, CaseIterable {
    case iridescent = "Iridescent"
    case vhsNoir = "VHS Noir"
    case animeDiner = "Anime Diner"
    case spaceWestern = "Space Western"
}
```

Sync via Supabase in v2 — echoes created on iOS appear in web evidence and vice versa.

## SwiftUI design implementation

### Glass panel

```swift
struct GlassPanel<Content: View>: View {
    let content: Content

    var body: some View {
        content
            .padding()
            .background(.ultraThinMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 24))
            .overlay(
                RoundedRectangle(cornerRadius: 24)
                    .stroke(.white.opacity(0.6), lineWidth: 1)
            )
    }
}
```

### Iridescent title

```swift
Text("Mimi")
    .font(.custom("BodoniModa-Bold", size: 56))
    .foregroundStyle(
        LinearGradient(
            colors: [Color(hex: "AEE4FF"), Color(hex: "F6C8FF")],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
    )
```

### Procedural echo (Core Graphics)

Port `echo-generator.ts` logic to `EchoGenerator.swift`:
- Seed from thought hash + style
- Draw gradient background from lens palette
- Add orbs, bezier curves, particles
- Apply VHS scanlines for Noir lens
- Export as `UIImage`

## Repo structure recommendation

```
avawitty/mimi          ← Web MVP (this repo)
avawitty/mimi-ios      ← SwiftUI companion app
avawitty/mimi-schema   ← Shared JSON schema / OpenAPI (optional)
```

Keep iOS as its own repo. Share the Echo/Reflection JSON contract. Sync via Supabase when ready.

## MVP scope for iOS v0.1

| Feature | Include? |
|---------|----------|
| Thought + lens → echo | Yes |
| Procedural art generation | Yes |
| Honest reflection | Yes |
| Evidence ledger (local) | Yes |
| Voice sculpt | No (v0.2) |
| Siri Shortcuts | No (v0.2) |
| Widget | No (v0.2) |
| Supabase sync | No (v0.3) |
| Zine export | No (v0.3) |

## App Store category

**Graphics & Design** or **Photo & Video** — positioned as a creative tool, not a social network.

## Estimated build order

1. SwiftUI shell with Start → Input → Loading → Preview → Reflection → Evidence
2. Port procedural echo generator to Core Graphics
3. Port reflection templates
4. SwiftData persistence for evidence
5. Polish animations (matchedGeometryEffect for echo transitions)
6. TestFlight beta
7. Voice sculpt + Siri + Widget in v0.2
