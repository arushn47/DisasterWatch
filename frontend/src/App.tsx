import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { KPIBanner } from './components/KPIBanner';
import { FilterBar } from './components/FilterBar';
import { TacticalMap } from './components/TacticalMap';
import { IncidentList } from './components/IncidentList';
import { IncidentDetailModal } from './components/IncidentDetailModal';
import { LocalRiskModal } from './components/LocalRiskModal';
import { RelayStatusFooter } from './components/RelayStatusFooter';
import { fetchAllDisasters, computeGlobalStats } from './services/disasterService';
import type { DisasterEvent, DisasterType } from './types/disaster';
import { RefreshCw } from 'lucide-react';

export const App: React.FC = () => {
  const [incidents, setIncidents] = useState<DisasterEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'all' | DisasterType>('all');
  const [selectedIncident, setSelectedIncident] = useState<DisasterEvent | null>(null);
  const [activeView, setActiveView] = useState<'radar' | 'risk'>('radar');
  const [showRiskModal, setShowRiskModal] = useState<boolean>(false);

  // Load initial data & poll every 60 seconds
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
    const interval = setInterval(loadData, 60000); // 60s live poll

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Filter incidents based on active pill
  const filteredIncidents = useMemo(() => {
    if (activeFilter === 'all') return incidents;
    return incidents.filter(inc => inc.type === activeFilter);
  }, [incidents, activeFilter]);

  // Compute live filter counts
  const filterCounts = useMemo(() => {
    return {
      all: incidents.length,
      earthquake: incidents.filter(i => i.type === 'EARTHQUAKE').length,
      wildfire: incidents.filter(i => i.type === 'WILDFIRE').length,
      cyclone: incidents.filter(i => i.type === 'CYCLONE').length,
      flood: incidents.filter(i => i.type === 'FLOOD').length,
      tsunami: incidents.filter(i => i.type === 'TSUNAMI').length,
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
        activeAlertsCount={incidents.filter(i => i.severity === 'CRITICAL').length}
        onOpenNotifications={() => setShowRiskModal(true)}
      />

      {/* Persistent Tactical Sidebar */}
      <Sidebar
        activeDomain={activeFilter}
        onSelectDomain={setActiveFilter}
        activeView={activeView}
        onSelectView={handleSelectView}
        sensorLatencyMs={stats.sensorLatencyMs}
      />

      {/* Main Content Area */}
      <div className="md:pl-64 flex-1 flex flex-col">
        <main className="w-full pt-20 px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-6 max-w-[1600px] mx-auto flex-1">
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
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start w-full">
              {/* Left Stage: Vector Radar Map + KPI Banner (8 Cols) */}
              <div className="xl:col-span-8 flex flex-col gap-4 w-full">
                {/* Interactive Map Component */}
                <TacticalMap
                  incidents={filteredIncidents}
                  selectedIncident={selectedIncident}
                  onSelectIncident={handleSelectIncident}
                />

                {/* 4 Clean Metric Summary Cards */}
                <KPIBanner
                  stats={stats}
                  onFilterType={setActiveFilter}
                />
              </div>

              {/* Right Stage: Curated Incident List (4 Cols) */}
              <div className="xl:col-span-4 w-full">
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
            // Can be used to center map
          }}
        />
      )}
    </div>
  );
};

export default App;
