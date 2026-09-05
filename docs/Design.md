# DisasterWatch — Design System & Visual Specification

**Design System:** Orbital Telemetry & Crisis Operations (Stitch Design System)  
**Aesthetic Style:** Tactical Brutalism & High-Contrast Dark Mode (Aerospace Mission Control)  
**Primary Target:** Zero-Latency Situational Awareness & Planetary Monitoring  
**Version:** 1.0.0  

---

## 1. Aesthetic Philosophy & Brand Identity

The DisasterWatch design language is engineered for high-velocity crisis triage, tactical emergency management, and planetary hazard observation. It abandons ornamental visual clutter in favor of technical **Brutalism** and strict **High-Contrast Dark Mode** principles: strictly structured, hyper-dense, mathematically balanced, and optimized for optical scannability under high-stress conditions.

The visual experience channels aerospace mission control consoles, seismological watch-floors, and orbital defense terminals:
- **Zero Ambiguity**: Critical hazard metrics (depth, magnitude, wind velocity, crest levels) command immediate optical priority.
- **Tonal Stratification**: Information depth is communicated through distinct surface levels and hairline structural boundaries rather than distracting ambient blur or soft shadows.
- **Tabular Precision**: Real-time numbers, coordinates, and UTC timestamps utilize fixed-pitch monospace characters to ensure zero layout shift during continuous live telemetry streams.

---

## 2. Color Palette & Token Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ FOUNDATION SURFACES (DARK VOID)                                            │
│ • Surface Void (#0F131C)        • Surface Container (#1C2028)              │
│ • Sub-Surface Low (#181C24)     • Surface Container High (#262A33)         │
│ • Surface Deepest (#0A0E16)     • Surface Container Highest (#31353E)      │
├─────────────────────────────────────────────────────────────────────────────┤
│ OPERATIONAL & THREAT TIERS                                                  │
│ • Primary Cyan (#06B6D4 / #4CD7F6): Nominal Operations & Sensor Sync       │
│ • Severe Crimson (#EF4444 / #A40217): Critical Emergency & High Risk        │
│ • Advisory Amber (#F59E0B / #E79400): Warning / Watch / Escalating Feeds    │
│ • Baseline Emerald (#10B981): System Healthy / Sensor Nominal               │
│ • Atmospheric Cyan-Blue (#38BDF8): Floods & Inundation Monitoring          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Foundation Surface Tokens

| Token Name | Hex Code | Purpose & Usage |
|---|---|---|
| `surface` | `#0F131C` | Primary application background canvas (Void Black). |
| `surface-dim` | `#0F131C` | Screen-edge gutters and canvas canvas underlay. |
| `surface-container-lowest`| `#0A0E16` | Persistent navigation header, side docked rail, map frame container. |
| `surface-container-low` | `#181C24` | Primary cards, incident list items, metric summary widgets. |
| `surface-container` | `#1C2028` | Hover state for interactive cards and base state for filter pills. |
| `surface-container-high`| `#262A33` | Active card state, focused inputs, tooltips, flyout drawers. |
| `surface-container-highest`| `#31353E` | Chip badges, secondary button fills, divider borders. |
| `surface-bright` | `#353942` | Highest elevation modals, emergency prompt overlays. |

### 2.2 Text & Content Contrast Tokens

| Token Name | Hex Code | Purpose & Usage |
|---|---|---|
| `on-surface` | `#DFE2EE` | Primary high-contrast text, headings, prominent numbers. |
| `on-surface-variant` | `#BCC9CD` | Secondary body text, metric labels, elapsed time strings. |
| `outline` | `#869397` | Muted metadata, inactive icons, hairline panel separators. |
| `outline-variant` | `#3D494C` | Structural boundaries, subtle card borders. |

### 2.3 Semantic Operational & Hazard Tokens

| Hazard Domain | Primary Token | Container Token | On-Container Token | Meaning & Threshold |
|---|---|---|---|---|
| **Operational Telemetry** | `#4CD7F6` (Cyan) | `#06B6D4` | `#003640` | System healthy, live sensor sync active, satellite relays. |
| **Severe Hazard / Critical** | `#FFB3AD` / `#EF4444` | `#A40217` / `#DC2626` | `#FFAEA8` / `#FFFFFF` | $M \ge 6.5$ quakes, Cat 4/5 storms, active uncontrolled fires, HIGH RISK. |
| **Advisory / Warning** | `#FFB95F` / `#F59E0B` | `#E79400` / `#D97706` | `#563400` / `#FFFFFF` | $M 5.0 - 6.4$, cyclone advisories, escalating floods, WARNING. |
| **Hydrological / Flood** | `#4CD7F6` / `#38BDF8` | `#0284C7` | `#082F49` | River gauge crest warnings, storm surge alerts. |
| **System Stability** | `#10B981` (Emerald) | `#047857` | `#064E3B` | All networks online, zero latency degradation. |

---

## 3. Typography Specification

The typographic system utilizes an **Asymmetric Dual-Engine Hierarchy**:
1. **Analytical Monospace Engine (`JetBrains Mono`)**: Strict tabular alignment (`tabular-nums`) for coordinates, UTC timestamps, Richter magnitudes, focal depths, and telemetry payloads to eliminate layout jitter during live data feeds.
2. **Editorial & Structural Engine (`Plus Jakarta Sans` & `Inter`)**: Clean geometric line-weights guaranteeing immediate readability across desktop monitors, field laptops, and mobile viewports.

### 3.1 Type Scale & Hierarchy

| Style Token | Font Family | Size | Line Height | Weight | Letter Spacing | Purpose |
|---|---|---|---|---|---|---|
| `headline-xl` | Plus Jakarta Sans | `40px` | `48px` | 800 (ExtraBold) | `-0.02em` | Major incident titles, primary KPI numbers. |
| `headline-lg` | Plus Jakarta Sans | `32px` | `40px` | 700 (Bold) | `-0.02em` | Section headers, "Active Situational Radar". |
| `headline-md` | Plus Jakarta Sans | `22px` | `28px` | 700 (Bold) | `-0.01em` | Metric card counts, modal titles. |
| `headline-sm` | Plus Jakarta Sans | `18px` | `24px` | 600 (SemiBold) | `0` | Incident names, panel headers, card titles. |
| `body-lg` | Inter | `16px` | `24px` | 400 (Regular) | `0` | Long-form disaster summaries, AI guidance text. |
| `body-md` | Inter | `14px` | `20px` | 400 (Regular) | `0` | Standard UI descriptions, navigation links. |
| `body-sm` | Inter | `12px` | `16px` | 400 (Regular) | `0` | Subtitles, helper text, card metadata. |
| `label-mono-lg` | JetBrains Mono | `14px` | `20px` | 600 (SemiBold) | `+0.05em` | Magnitude readouts (e.g. `M 7.2`), severity badges. |
| `label-mono-md` | JetBrains Mono | `12px` | `16px` | 500 (Medium) | `+0.04em` | Coordinates (`35.67° N, 139.65° E`), status chips. |
| `label-mono-sm` | JetBrains Mono | `10px` | `14px` | 500 (Medium) | `+0.06em` | Micro-badges, UTC timestamps, sensor sync indicators. |

---

## 4. Spacing, Elevation & Corner Radii

### 4.1 Grid & Spacing Units
- **Base Grid**: 4px density sub-grid (`0.25rem` multipliers).
- **Desktop Grid**: 12-column adaptive layout (Left Nav `64` / `16rem`, Main Canvas `8 cols`, Incident Drawer `4 cols`).
- **Standard Spacing Tokens**:
  - `gutter-xs`: `0.25rem` (4px)
  - `gutter-sm`: `0.5rem` (8px)
  - `gutter-md`: `0.75rem` (12px)
  - `gutter-lg`: `1.0rem` (16px)
  - `module-gap`: `1.25rem` (20px)
  - `panel-padding-standard`: `1.0rem` (16px)
  - `panel-padding-spacious`: `1.5rem` (24px)

### 4.2 Structural Elevation & Depth
Depth is communicated through **Tonal Stratification and Razor-Thin Hairline Borders** (`1px solid #1F2937` or `#374151`):
- **Layer 0 (Canvas Base)**: `#0F131C`
- **Layer 1 (Card Panels)**: `#181C24` with `1px solid #1F2937` border.
- **Layer 2 (Hover/Focus)**: `#1C2028` with `1px solid #374151` border.
- **Layer 3 (Modals & HUDs)**: `#262A33` with `backdrop-filter: blur(12px)`.
- **Hazard Bloom**: Critical incidents project a controlled crimson luminescent glow:
  ```css
  box-shadow: 0 0 16px rgba(239, 68, 68, 0.35);
  ```

### 4.3 Corner Radii
- All cards, badges, and layout panels feature disciplined corner radii:
  - `sm`: `0.125rem` (2px)
  - `md`: `0.25rem` (4px) — standard for tactical buttons & input boxes
  - `lg`: `0.5rem` (8px) — standard for metric & incident cards
  - `xl`: `0.75rem` (12px) — map frame container
  - `full`: `9999px` — live status pills & filter chips

---

## 5. Tactical Component Specifications

### 5.1 Tactical Buttons & Filter Pills
- **Primary Operational Button**: Background `#06B6D4`, text `#003640` font-bold, radius `0.25rem`. Hover state: `#22D3EE` with subtle cyan glow.
- **Filter Pills**:
  - *Inactive*: Background `#1C2028`, text `#BCC9CD`, hover background `#262A33`.
  - *Active*: Background `#06B6D4` (or hazard color), text `#003640` font-semibold, accompanied by a numeric badge showing total count.

### 5.2 Threat Badges & Severity Chips
- Constructed with `label-mono-sm` in `JetBrains Mono`:
  - **Severe / Critical**: Red background wash (`rgba(239, 68, 68, 0.15)`), border `#EF4444`, text `#FCA5A5`, with a pulsating red beacon dot.
  - **Warning / Advisory**: Amber background wash (`rgba(245, 158, 11, 0.15)`), border `#F59E0B`, text `#FCD34D`.
  - **Nominal / Telemetry**: Cyan background wash (`rgba(6, 182, 212, 0.12)`), border `#06B6D4`, text `#67E8F9`.

### 5.3 Incident Cards
- Container: Background `#181C24`, 1px border `#1F2937`, rounded `0.75rem`.
- Left Border Stripe: 3px solid color line corresponding to severity (Crimson for Severe, Amber for Warning, Cyan for Moderate).
- Content Structure:
  - Header: Domain badge (`EARTHQUAKE`), elapsed time (`12m ago`), and bold magnitude readout (`M 6.7`).
  - Title: Incident geographic name (e.g. `Off the Coast of Miyagi`).
  - Subtitle: Coordinates & focal depth (`Honshu, Japan · 24.3 km focal depth`).
  - Footer: Impact status summary & forward chevron.

### 5.4 Radar Map Beacon Markers
- Center dot: Solid 14px colored circle (`#EF4444` for earthquake, `#F59E0B` for cyclone, etc.).
- Animated Beacon Ring: 32px diameter ring animating with infinite pulse/ping effect (`animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite`).
- Hover Tooltip: Floating dark pill (`#262A33` with backdrop blur) revealing incident title and key metric.

### 5.5 Telemetry HUD Overlays
- **Coordinate Inspector HUD**: Positioned in lower-left or upper-left corner of the map viewport, displaying cursor coordinates (`Lat 35.6762° N | Lng 139.6503° E`) and zoom level in monospaced micro-text.
- **Sensor Sync Beacon**: Glowing green dot with `LIVE TELEMETRY ACTIVE · 1s AGO` indicator in the global header.
