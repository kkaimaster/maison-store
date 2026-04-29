# MAISON — Design System

## Brand
- Name: MAISON
- Tagline: Refined Essentials. Elevated Living.
- Vibe: Luxury editorial, Shopify Supreme-inspired, clean & confident

## Color Palette
| Variable | Hex | Role |
|---|---|---|
| `--maison-bg` | `#FAFAF8` | Page background |
| `--maison-ink` | `#1A1A18` | Body text, borders |
| `--maison-muted` | `#8A8A82` | Meta, labels |
| `--maison-accent` | `#C9A96E` | Gold — CTAs, highlights |
| `--maison-surface` | `#F0EDE6` | Cards, surface |
| `--maison-dark` | `#0F0F0D` | Footer, dark sections |
| `--maison-white` | `#FFFFFF` | Overlays, cart bg |

## Typography
- Display: `Cormorant Garamond` — serif, italic, 300–500
- UI/Body: `Jost` — sans-serif, 300–500
- Labels: Jost 500, uppercase, letter-spacing 0.12em

## Layout
- Max content width: 1400px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Grid gaps: 16px product cards, 24px sections

## Motion
- Page load: stagger fade-up 0.08s delay per item
- Cards: scale 1.0 → 1.05 on hover, 600ms ease
- Cart drawer: translateX(100%) → 0, 350ms cubic-bezier(0.32,0,0,1)
- Modals: opacity 0 + scale 0.96 → 1.0
- Announcement: CSS infinite marquee

## Anti-patterns
- No rounded corners on product images (square/sharp)
- No purple gradients
- No cookie-cutter equal-width card grids
- No Inter or Roboto
