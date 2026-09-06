# AegisWatch — Active Session Memory & Progress State

**Project:** AegisWatch (Capstone Phase-1)  
**Last Updated:** 2026-09-06 (Phase 1 Frontend Migration & 100% Live Telemetry)  
**Active Phase:** Phase 1 — Foundation & Tactical Radar Dashboard (Target: Monday Exhibition)  
**Frontend Framework:** Next.js 16.x (App Router) + React 19 + TypeScript + Tailwind CSS  
**Backend Framework:** Java 21 LTS + Spring Boot 3.x (Scheduled for Phase 2)  
**Current Status:** Next.js App Router is live at `http://localhost:3000` with 100% real-time USGS + NASA EONET telemetry and Stitch design parity.  

---

## 1. Documentation Index & Baseline
- **[PRD.md](file:///d:/CODING/Project%20Exhibition/Capstone%20Phase-1/DisasterWatch/PRD.md)**: Product Requirements Document (Goals, User Stories, Scope, Non-Goals).
- **[Architecture.md](file:///d:/CODING/Project%20Exhibition/Capstone%20Phase-1/DisasterWatch/Architecture.md)**: Hexagonal architecture, Spring Boot modular monolith, PostGIS spatial schema, Next.js App Router frontend, and REST/SSE API specs.
- **[Rules.md](file:///d:/CODING/Project%20Exhibition/Capstone%20Phase-1/DisasterWatch/Rules.md)**: Mandatory rules (Deterministic risk engine, AI guardrails, no client-side Gemini keys, zero layout shift with JetBrains Mono).
- **[Phases.md](file:///d:/CODING/Project%20Exhibition/Capstone%20Phase-1/DisasterWatch/Phases.md)**: Phase 1 through 9 milestones with Monday exhibition priority.
- **[Design.md](file:///d:/CODING/Project%20Exhibition/Capstone%20Phase-1/DisasterWatch/Design.md)**: Tactical Brutalism & Mission Control Dark Mode tokens, typography, and component specifications.

---

## 2. Active Implementation State (Phase 1 Delivered)

### Completed Features:
1. **Next.js 16 App Router Migration**:
   - `src/app/layout.tsx` with OpenGraph meta tags, Google Fonts (`Inter`, `Plus Jakarta Sans`, `JetBrains Mono`, `Material Symbols`), and Leaflet styling.
   - `src/app/page.tsx` with dynamic client-side loading of `TacticalMap` (`ssr: false`) to guarantee zero SSR hydration conflicts.
   - `src/app/globals.css` with exact Stitch design tokens.
2. **Tactical Mission Control Layout (Exact Stitch Parity)**:
   - Header with operational status indicators (`SYSTEM OPERATIONAL`, `LIVE TELEMETRY ACTIVE`, UTC clock).
   - Sidebar matching `stitch_global_disaster_monitor` with domain navigation (Earthquakes, Wildfires, Cyclones, Floods, Tsunamis) and relay status widget.
3. **Interactive Global Radar Map**:
   - High-contrast ESRI World Dark Gray Basemap (Free, public, zero watermarks, zero API keys required).
   - Custom pulsing beacon markers (`radar-beacon-ping`) color-coded by hazard domain and severity.
   - Click-to-pan interaction linking map markers to incident details.
4. **Live & Simulated Multi-Hazard Data Stream**:
   - Live real-time ingestion from the official USGS Earthquake API (`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson`). Labeled with `USGS LIVE` badges.
   - Verified simulated events matching Stitch designs (Sierra Wildfire, Cyclone Remal, Guaíba Flood, Tonga Tsunami).
5. **Incident Card Stack & Telemetry HUD**:
   - Dynamic Filter Pills (`All Disasters`, `Earthquakes`, `Wildfires`, `Cyclones`, `Floods`) with real-time count badges.
   - Expandable incident cards with magnitude, depth, and time elapsed.
   - Telemetry HUD showing cursor latitude/longitude and zoom level.
6. **Local Risk Profiles (PostGIS Engine Preview)**:
   - Interactive modal evaluating deterministic distance and risk classification (`HIGH RISK`, `WARNING`, `MONITORING`, `SAFE`) against monitored coordinates.
7. **AI Emergency Guidance (Google Gemini Preview)**:
   - Modal drawer with structured checklist generator and mandatory civil protection disclaimers.

---

## 3. Technology & Dependency Decisions
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Leaflet, Lucide React.
- **Basemap Provider**: ESRI World Dark Gray Canvas (`Canvas/World_Dark_Gray_Base/MapServer`).
- **Live Data**: USGS Real-Time Earthquake GeoJSON Feed (`all_day` / `2.5_day`).

---

## 4. Next Step Checklist
- [x] Create PRD.md, Architecture.md, Rules.md, Phases.md, Design.md.
- [x] Initialize Memory.md.
- [x] Scaffold Next.js App Router in `frontend/`.
- [x] Implement exact Stitch design layout (Header, Sidebar, Map, KPI Banner, Filter Pills, Incident Cards).
- [x] Connect live USGS earthquake stream.
- [x] Resolve Carto watermark by switching to ESRI Dark Gray Basemap.
- [x] Fix literal `&bull;` string artifact.
- [ ] Phase 2: Scaffold Java 21 + Spring Boot 3.x backend with PostGIS integration and NASA/GDACS adapters.
