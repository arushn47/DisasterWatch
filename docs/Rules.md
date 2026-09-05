# DisasterWatch — Development Rules & AI Behavioral Guardrails

**Document Status:** Mandatory Enforcement  
**Scope:** All Developers, Subagents, and AI Assistants working on DisasterWatch  
**Version:** 1.0.0  

---

## 1. Core Architectural Axioms & AI Safety Guardrails

### 1.1 The Deterministic Risk Boundary
> [!CRITICAL]
> **RULE 1.1**: The Risk Engine MUST be 100% deterministic, mathematical, and reproducible.
- Under NO circumstance may Google Gemini or any LLM determine, classify, upgrade, downgrade, or infer a user's risk rating (`SAFE`, `MONITORING`, `WARNING`, `HIGH RISK`).
- All risk assessments are computed exclusively via deterministic PostGIS spatial functions (`ST_DWithin`, `ST_Contains`, `ST_Intersects`) against validated hazard geometries.
- AI's role is strictly limited to explaining verified telemetry and offering plain-language emergency preparedness checklists.

### 1.2 Zero Hallucination Policy for Life Safety Information
> [!CAUTION]
> **RULE 1.2**: AI must never synthesize, fabricate, or guess life-safety information.
- The AI context builder must only feed Gemini verified data extracted from system records (magnitude, depth, recorded wind speeds, official bulletins).
- The AI must NEVER invent national emergency contact numbers, local helpline numbers, or specific evacuation routes unless they are present in verified database records.
- If a data point is missing from the payload (e.g., casualty numbers or specific shelter capacity), Gemini must explicitly state: *"Information currently unavailable from official feeds."*

### 1.3 Client-Side AI Isolation
> [!IMPORTANT]
> **RULE 1.3**: The client application must NEVER communicate directly with the Gemini API.
- The Google Gemini API key must **never** be exposed in client bundles (`VITE_GEMINI_API_KEY` is strictly prohibited).
- All AI queries route through the Spring Boot backend `/api/v1/ai/guidance` endpoint.
- The backend sanitizes inputs, injects the verified disaster context, applies safety prompt boundaries, and returns structured JSON responses.

### 1.4 Mandatory Emergency Disclaimer
> [!WARNING]
> **RULE 1.4**: All UI views presenting hazard alerts, risk evaluations, or AI advice must prominently feature the official disclaimer:
> *"DisasterWatch is an informational decision-support tool. It does not replace official emergency broadcast systems or lawful instructions from civil defense authorities."*

---

## 2. Technology Stack Boundaries & Library Policies

### 2.1 Approved Frontend Libraries
- **Core**: React 18 (`react`, `react-dom`), TypeScript (`strict: true`), Vite.
- **Styling**: Tailwind CSS configured strictly with the **Stitch Tactical Design System** tokens (see `Design.md`).
- **Icons**: Lucide React (`lucide-react`) and Google Material Symbols Outlined.
- **Mapping**: MapLibre GL JS (`maplibre-gl`) or Leaflet (`leaflet`, `react-leaflet`) for vector/tile rendering.
- **State & Server Cache**: Zustand for client-side viewport and filter state; TanStack Query (`@tanstack/react-query`) for API data caching.
- **Data Visualization**: Recharts (`recharts`) styled with tactical dark theme and monospace labels.

### 2.2 Forbidden Frontend Libraries & Practices
- ❌ **Do NOT use Tailwind utility colors directly** (e.g., `bg-red-500`, `bg-blue-600`). Use system design tokens: `bg-secondary-container`, `bg-primary`, `text-tertiary`, `bg-surface-container`.
- ❌ **Do NOT use heavy, generic UI frameworks** (MUI, Ant Design, Bootstrap, Chakra) that pollute the CSS bundle and violate the tactical aerospace aesthetic.
- ❌ **Do NOT introduce client-side GIS computation engines** (e.g., Turf.js for massive polygon intersection). Heavy spatial calculations belong in PostgreSQL + PostGIS.

### 2.3 Approved Backend Libraries
- **Core**: Java 21 LTS, Spring Boot 3.2+, Spring Web, Spring Validation.
- **Persistence**: Spring Data JPA, Hibernate Spatial, PostgreSQL JDBC, Flyway for migrations.
- **Security**: Spring Security 6.x, `jjwt` (Java JWT).
- **HTTP & Resilience**: Spring WebFlux (`WebClient`) for asynchronous ingestion; Resilience4j for circuit breakers and retries.
- **Caching**: Spring Data Redis.

### 2.4 Forbidden Backend Practices
- ❌ **Do NOT split the backend into distributed microservices**. DisasterWatch is designed as a **Modular Monolith**. Keep all domains in their respective `com.disasterwatch.*` packages.
- ❌ **Do NOT introduce heavyweight message brokers** (Kafka, RabbitMQ) in Phase 1. Native Spring Scheduler and Server-Sent Events (SSE) satisfy all real-time requirements.

---

## 3. Code Quality & Aesthetic Guidelines

### 3.1 Layout & Rendering Performance
- **Zero Layout Jitter**: All dynamic numerical readouts (coordinates, magnitudes, Richter scales, UTC clocks) must use `font-mono` (`JetBrains Mono`) with tabular numbers (`tabular-nums`) to prevent optical wobble during live streaming.
- **Marker Virtualization**: Map markers must be rendered efficiently or clustered if count exceeds 200 items to guarantee smooth 60fps panning.
- **No Broken Placeholders**: Never render broken image tags or empty placeholder rectangles. Always use tactical SVG fallback skeletons or live map markers.

### 3.2 Separation of Concerns
- Component files must not exceed 250 lines. Extract sub-components (e.g., `IncidentCard`, `HazardPill`, `TelemetryHUD`).
- Business logic, coordinate transformations, and data formatting must be isolated into dedicated utility functions or custom hooks (`useDisasters`, `useRiskEngine`).

---

## 4. Privacy & Location Handling

1. **Explicit Geolocation Consent**: The browser's `navigator.geolocation` API must only be triggered when the user explicitly clicks the "Current Location" or "Radar Sync" button.
2. **Coordinate Protection**: Exact user coordinates must never be logged in application logs (`INFO` or `ERROR` level).
3. **Storage Minimization**: Saved user locations must allow one-click deletion, which cascades and purges all associated historical `RiskAssessment` records.

---

## 5. Ingestion Pipeline & Fault Tolerance

1. **Failure Isolation**: An exception or network timeout in one external source adapter (e.g., NASA EONET downtime) must be trapped and logged without terminating scheduled ingestion for other adapters (e.g., USGS).
2. **Rate Limit Courtesy**: All outbound HTTP requests via `WebClient` must respect upstream vendor rate limits and implement exponential backoff with jitter.
3. **Data Freshness & Caching**: External responses must be cached in Redis with realistic TTLs (60 seconds for high-velocity earthquakes, 300 seconds for wildfires) to prevent redundant upstream API exhaustion.

---

## 6. Development Workflow & Session Memory Protocol

1. **Phased Execution**: Features must be implemented strictly according to `Phases.md`. Do not leap ahead to AI integration or user management before the Phase 1 tactical radar dashboard is rock solid.
2. **Context Preservation**: As development proceeds, maintain `Memory.md` at the project root. Document completed features, active roadblocks, current file locations, and verification commands to preserve state across multi-turn sessions.
