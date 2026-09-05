# DisasterWatch — Phased Implementation Roadmap

**Project Scope:** Final Year Capstone Project  
**Strategic Focus:** Agile Delivery with a High-Impact Working Prototype for the **Monday Exhibition Review**  
**Version:** 1.0.0  

---

## Roadmap Overview

```text
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 (CURRENT): FOUNDATION & TACTICAL RADAR (MONDAY MILESTONE)      │
│ • Monorepo Scaffolding (React + TS + Vite + Tailwind Tactical Tokens)  │
│ • Interactive Global Vector Map with Live USGS Data + Simulated Feeds  │
│ • Hazard Domain Filtering, Incident Cards & Telemetry HUD              │
│ • Full Architectural & Technical Documentation for Faculty Review      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 2: SPRING BOOT BACKEND & MULTI-SOURCE INGESTION                  │
│ • Java 21 + Spring Boot 3.x Scaffolding & WebClient Adapters           │
│ • USGS, NASA EONET, GDACS, Open-Meteo Normalization Pipeline          │
│ • Deduplication Engine (Spatial Proximity & Temporal Windows)          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 3: POSTGRESQL + POSTGIS DETERMINISTIC RISK ENGINE                │
│ • Spatial Schemas (Point & Polygon Geometry with GIST Indexes)         │
│ • Deterministic Spatial Proximity Rules (SAFE, MONITORING, etc.)       │
│ • Mathematical Rationale Generation with Mandatory Disclaimers         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 4: USER AUTHENTICATION & LOCATION PROFILES                       │
│ • Spring Security 6 + Stateless JWT Auth (User, Researcher, Admin)    │
│ • Saved Location Management (Home, Campus, Travel Destinations)        │
│ • Personalized Hazard Assessment Dashboard                             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 5: REAL-TIME STREAMING & ALERT DISPATCH                          │
│ • Server-Sent Events (SSE) Unidirectional Event Hub                    │
│ • Real-time Radar Push Updates & In-App Notification Drawer            │
│ • Browser Web Push API Integration                                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 6: GOOGLE GEMINI AI EMERGENCY GUIDANCE                           │
│ • Server-Side AI Context Builder with Safety Prompt Boundaries         │
│ • Plain-Language Situation Summaries & Evacuation Checklists          │
│ • Anti-Hallucination Constraints & Official Hotline Verification       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 7: NEARBY EMERGENCY ASSISTANCE SERVICE                           │
│ • OpenStreetMap Overpass API Ingestion (Hospitals, Shelters, Stations) │
│ • Spatial Radius Distance Sorting & Navigational Directions            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 8: RESEARCH & HISTORICAL ANALYTICS DASHBOARD                     │
│ • Recharts Interactive Historical Views (Frequency, Depth, Trends)     │
│ • Geographic Hazard Density Maps & Dataset Export (GeoJSON/CSV)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 9: CONTAINERIZATION, REHEARSAL & CAPSTONE DEFENSE                │
│ • Multi-Container Docker Compose (Frontend, Backend, PostGIS, Redis)   │
│ • End-to-End Latency Optimization & Final Demonstration Rehearsal      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Foundation & Tactical Radar Dashboard (Target: Monday Demo)
**Goal:** Deliver a visually stunning, responsive, interactive web application matching the Stitch Mission Control designs that runs smoothly for faculty presentation.

### Deliverables:
1. **Repository & Build Setup**:
   - Modern Vite + React 18 + TypeScript environment initialized in `frontend/`.
   - Tailwind CSS configured with the complete tactical color palette and typography from `Design.md`.
   - Material Symbols and JetBrains Mono fonts linked for zero layout jitter.
2. **Tactical Mission Control Layout**:
   - Global navigation header with operational status indicators (`SYSTEM OPERATIONAL`, `LIVE TELEMETRY ACTIVE`, UTC clock).
   - Collapsible tactical sidebar featuring domain navigation (Earthquakes, Wildfires, Cyclones, Floods, Tsunamis).
3. **Interactive Global Radar Map**:
   - Integrated vector map (MapLibre GL JS / Leaflet) styled with high-contrast dark basemaps.
   - Pulsing beacon markers color-coded by hazard domain and severity (Crimson for High Risk, Amber for Warning, Cyan for Monitoring).
   - Click-to-pan interaction linking map markers to incident details.
4. **Live & Simulated Multi-Hazard Data Stream**:
   - Live real-time ingestion from the official USGS Earthquake API (`earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`).
   - High-fidelity simulated feeds for active wildfires (Sierra Complex), cyclones (Remal), and major floods (Rio Grande do Sul) directly aligned with the Stitch design specifications.
5. **Incident Card Stack & Telemetry HUD**:
   - Filter pills (All Disasters, Earthquakes, Wildfires, Cyclones, Floods) with live badge counts.
   - Expandable incident cards displaying magnitude, focal depth, affected area, and elapsed time.
   - Telemetry HUD showing cursor geo-coordinates (Lat/Long) and satellite sync status.
6. **Documentation & Memory Baseline**:
   - Complete `PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, `Design.md`, and initialized `Memory.md` ready for faculty inspection.

---

## Phase 2: Backend Scaffolding & Multi-Source Ingestion Pipeline
**Goal:** Establish the Spring Boot 3.x backend and build decoupled, fault-tolerant ingestion adapters.

### Deliverables:
1. Spring Boot 3.2+ Maven project setup with Java 21 virtual threads.
2. `IngestionAdapter` interface with specialized implementations:
   - `UsgsEarthquakeAdapter`: Consuming real-time GeoJSON streams.
   - `NasaEonetAdapter`: Ingesting wildfire and storm events.
   - `GdacsAlertAdapter`: Fetching international flood, tsunami, and cyclone bulletins.
   - `OpenMeteoAdapter`: Capturing extreme atmospheric data.
3. Normalization Service mapping raw payloads to the unified `DisasterEvent` domain entity.
4. Spatial & temporal deduplication service.
5. In-memory resilience and circuit breakers using Resilience4j.

---

## Phase 3: PostgreSQL + PostGIS Geospatial Risk Engine
**Goal:** Implement the deterministic geospatial database and sub-100ms risk evaluation queries.

### Deliverables:
1. Dockerized PostgreSQL 16 instance with PostGIS 3.4 enabled.
2. Flyway database migration scripts creating spatial tables and GIST indexes.
3. PostGIS spatial calculation queries:
   - `ST_DWithin` for radius threshold checks.
   - `ST_Contains` for polygon boundary intersections.
4. Deterministic Risk Evaluation Service outputting `SAFE`, `MONITORING`, `WARNING`, and `HIGH RISK` classifications.
5. Unit and integration tests validating geometric boundary edge cases.

---

## Phase 4: User Authentication & Monitored Location Profiles
**Goal:** Enable user registration, security, and personalized location-based monitoring.

### Deliverables:
1. Spring Security 6.x configuration with stateless JWT authentication filters.
2. User management endpoints (`/api/v1/auth/register`, `/api/v1/auth/login`, `/api/v1/auth/me`).
3. User location profile management (`/api/v1/locations` CRUD).
4. Personalized risk evaluation endpoint (`/api/v1/risk/my-locations`).
5. Frontend "My Locations" dashboard view.

---

## Phase 5: Real-Time Event Streaming & Notification Engine
**Goal:** Push live hazard updates to connected clients without page reloads.

### Deliverables:
1. Spring Boot Server-Sent Events (SSE) `/api/v1/stream/events` controller with an active `SseEmitter` registry.
2. Frontend `useSSE` hook with auto-reconnection and event dispatching.
3. Interactive In-App Notification Center with read/unread tracking.
4. Web Push API integration for critical hazard threshold alerts.

---

## Phase 6: Google Gemini AI Emergency Guidance
**Goal:** Provide plain-language, contextualized emergency safety checklists using Google Gemini.

### Deliverables:
1. Backend `AiContextBuilder` assembling verified disaster telemetry and user proximity facts.
2. Google Gemini API integration with strict system prompts forbidding risk recalculation or fake emergency numbers.
3. REST endpoint `/api/v1/ai/guidance`.
4. Frontend Emergency Guidance Drawer featuring bulleted action items, evacuation kit checklists, and official emergency disclaimers.

---

## Phase 7: Nearby Emergency Assistance Service
**Goal:** Help users discover nearest hospitals, shelters, and relief centers.

### Deliverables:
1. OpenStreetMap Overpass API integration to harvest public medical and relief infrastructure.
2. Proximity search endpoint `/api/v1/assistance/nearby`.
3. Frontend Assistance Map Layer with category filters (Hospitals, Shelters, Fire Stations) and external directions links.

---

## Phase 8: Research & Historical Analytics Dashboard
**Goal:** Enable longitudinal multi-hazard analysis for academic researchers.

### Deliverables:
1. Historical aggregation queries in Spring Data JPA (frequency by year/month, severity distribution).
2. Frontend Research View built with Recharts (monospaced axes, dark mode styling).
3. Data export utilities (GeoJSON and CSV).

---

## Phase 9: Containerization, Final Polish & Capstone Defense
**Goal:** Package the entire system for production and prepare presentation assets.

### Deliverables:
1. Unified `docker-compose.yml` spinning up Frontend, Backend, PostGIS, and Redis.
2. Comprehensive end-to-end testing and performance audits.
3. Project Exhibition slide deck, architecture diagrams, and live defense demonstration script.
