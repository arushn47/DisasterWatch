# 🛡️ AegisWatch

> **Real-Time Global Natural Disaster Intelligence, Alert & Emergency Assistance Platform**  
> *Final Year Capstone Project (Engineering & Computer Science)*

---

## 🌟 Overview

AegisWatch aggregates fragmented global natural hazard data into a unified, high-contrast mission-control situational dashboard. It pairs deterministic geospatial calculations (PostGIS) with Google Gemini AI explainability to provide actionable, location-aware safety intelligence.

* **Core Principle:** *"Data and deterministic rules detect risk. AI explains the situation and assists the user."*

---

## 🚀 Phase 1 Live Features (Current State)

* **Interactive Tactical Situational Radar**: High-contrast ESRI World Dark Gray basemap with real-time pulsing beacon markers and zero watermarks.
* **Live Real-Time USGS Seismic Data**: Automatically polls the USGS Earthquake Hazards API with real coordinates, depths, and magnitudes.
* **Multi-Hazard Domains**: Real-time filters for Earthquakes, Wildfires, Cyclones, Floods, and Tsunamis with live badge counts.
* **Incident Telemetry Drawer**: In-depth telemetry metrics, situation narrative reports, and an AI emergency guidance preview.
* **Local Risk Profiles (PostGIS Engine Preview)**: Deterministic geospatial proximity evaluation for monitored personal locations.
* **Design Parity**: Built strictly against the team's Stitch **Orbital Telemetry & Crisis Operations** design tokens.

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS
* **Map Engine**: Leaflet + ESRI World Dark Gray Canvas
* **Live Ingestion**: USGS Earthquake Real-Time GeoJSON Feed
* **Backend (Phase 2)**: Java 21 LTS + Spring Boot 3.x
* **Database (Phase 2)**: PostgreSQL 16 + PostGIS extension + Redis

---

## 🏃 Quick Start (Run Locally)

### 1. Clone the repository
```bash
git clone https://github.com/arushn47/DisasterWatch.git
cd DisasterWatch
```

### 2. Install & Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Open in Browser
Visit **[http://localhost:3000](http://localhost:3000)** to view the live dashboard.

---

## 📚 Project Documentation Suite

* [PRD.md](./docs/PRD.md) — Product Requirements Document
* [Architecture.md](./docs/Architecture.md) — Full-Stack Architecture & Data Flow
* [Rules.md](./docs/Rules.md) — AI Safety Guardrails & Coding Standards
* [Phases.md](./docs/Phases.md) — Phased Milestone Roadmap (Phases 1–9)
* [Design.md](./docs/Design.md) — Stitch Design Tokens & Typography
* [STATUS.md](./docs/STATUS.md) — Current System Deliverables & Talking Points
* [Memory.md](./docs/Memory.md) — Session Context Tracker
