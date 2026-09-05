'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { KPIBanner } from '../components/KPIBanner';
import { FilterBar } from '../components/FilterBar';
import { IncidentList } from '../components/IncidentList';
import { IncidentDetailModal } from '../components/IncidentDetailModal';
import { LocalRiskModal } from '../components/LocalRiskModal';
import { RelayStatusFooter } from '../components/RelayStatusFooter';
import { fetchAllDisasters, computeGlobalStats } from '../services/disasterService';
import type { DisasterEvent, DisasterType } from '../types/disaster';
import { RefreshCw } from 'lucide-react';

// Dynamic import with ssr: false ensures zero window/document hydration issues with Leaflet
const TacticalMap = dynamic(
  () => import('../components/TacticalMap').then((mod) => mod.TacticalMap),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-[480px] lg:h-[520px] rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center shadow-xl">
        <div className="flex flex-col items-center gap-2.5 text-outline">
          <div className="w-3 h-3 rounded-full bg-primary animate-ping"></div>
          <span className="font-label-mono-sm text-xs text-primary font-medium tracking-widest uppercase">
            Synchronizing Vector Telemetry...
          </span>
        </div>
      </div>
    ),
  }
);

export default function DashboardPage() {
  const [incidents, setIncidents] = useState<DisasterEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'all' | DisasterType>('all');
  const [selectedIncident, setSelectedIncident] = useState<DisasterEvent | null>(null);
  const [activeView, setActiveView] = useState<'radar' | 'risk'>('radar');
  const [showRiskModal, setShowRiskModal] = useState<boolean>(false);

  // Load initial data and poll every 60 seconds
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const data = await fetchAllDisasters();
        if (isMounted) {
          setIncidents(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load disaster telemetry:', err);
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Filter incidents based on active pill
  const filteredIncidents = useMemo(() => {
    if (activeFilter === 'all') return incidents;
    return incidents.filter((inc) => inc.type === activeFilter);
  }, [incidents, activeFilter]);

  // Compute live filter counts
  const filterCounts = useMemo(() => {
    return {
      all: incidents.length,
      earthquake: incidents.filter((i) => i.type === 'EARTHQUAKE').length,
      wildfire: incidents.filter((i) => i.type === 'WILDFIRE').length,
      cyclone: incidents.filter((i) => i.type === 'CYCLONE').length,
      flood: incidents.filter((i) => i.type === 'FLOOD').length,
      tsunami: incidents.filter((i) => i.type === 'TSUNAMI').length,
    };
  }, [incidents]);

  // Global sensor metrics
  const stats = useMemo(() => {
    return computeGlobalStats(incidents);
  }, [incidents]);

  const handleSelectIncident = (incident: DisasterEvent) => {
    setSelectedIncident(incident);
  };

  const handleSelectView = (view: 'radar' | 'risk') => {
    setActiveView(view);
    if (view === 'risk') {
      setShowRiskModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* Fixed Tactical Header */}
      <Header
        activeAlertsCount={incidents.filter((i) => i.severity === 'CRITICAL').length}
        onOpenNotifications={() => setShowRiskModal(true)}
      />

      {/* Persistent Tactical Sidebar */}
      <Sidebar
        activeDomain={activeFilter}
        onSelectDomain={setActiveFilter}
        activeView={activeView}
        onSelectView={handleSelectView}
      />

      {/* Main Content Area - matching stitch layout with pl-64 */}
      <div className="md:pl-64 flex-1 flex flex-col">
        <main className="relative w-full pt-20 px-grid-margin-desktop py-panel-padding-spacious flex flex-col gap-module-gap max-w-[1600px] mx-auto flex-1">
          {/* Top Filter Bar */}
          <FilterBar
            activeFilter={activeFilter}
            counts={filterCounts}
            onSelectFilter={setActiveFilter}
          />

          {isLoading ? (
            <div className="w-full h-96 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col items-center justify-center gap-3 text-outline">
              <RefreshCw className="w-8 h-8 text-primary animate-spin" />
              <span className="font-label-mono-sm text-sm text-on-surface-variant font-medium">
                ESTABLISHING SENSOR TELEMETRY LINK...
              </span>
            </div>
          ) : (
            /* Main Split Stage Grid */
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter-lg items-start w-full">
              {/* Left Stage: Vector Radar Map + KPI Banner (8 Cols) */}
              <div className="xl:col-span-8 flex flex-col gap-gutter-md w-full">
                {/* Interactive Dynamic Map Component */}
                <TacticalMap
                  incidents={filteredIncidents}
                  selectedIncident={selectedIncident}
                  onSelectIncident={handleSelectIncident}
                />

                {/* 4 Clean Metric Summary Cards */}
                <KPIBanner stats={stats} onFilterType={setActiveFilter} />
              </div>

              {/* Right Stage: Curated Incident List (4 Cols) */}
              <div className="xl:col-span-4 flex flex-col gap-gutter-md w-full">
                <IncidentList
                  incidents={filteredIncidents}
                  selectedIncident={selectedIncident}
                  onSelectIncident={handleSelectIncident}
                />
              </div>
            </div>
          )}

          {/* Bottom Relay Status & Ground Truth Relays */}
          <RelayStatusFooter />
        </main>
      </div>

      {/* Incident Deep Telemetry & AI Guidance Modal */}
      {selectedIncident && (
        <IncidentDetailModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}

      {/* Local Risk Profiles (PostGIS Engine) Modal */}
      {showRiskModal && (
        <LocalRiskModal
          incidents={incidents}
          onClose={() => {
            setShowRiskModal(false);
            setActiveView('radar');
          }}
          onFocusCoordinates={() => {
            // Focus viewport callback
          }}
        />
      )}
    </div>
  );
}
