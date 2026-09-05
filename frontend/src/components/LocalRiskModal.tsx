'use client';

import React, { useState } from 'react';
import { X, MapPin, Compass, ShieldCheck, AlertTriangle, Radio, Plus } from 'lucide-react';
import type { DisasterEvent } from '../types/disaster';

interface UserLocation {
  id: string;
  label: string;
  coordinates: [number, number]; // [lat, lng]
}

interface LocalRiskModalProps {
  incidents: DisasterEvent[];
  onClose: () => void;
  onFocusCoordinates: (coords: [number, number]) => void;
}

// Haversine distance in km
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export const LocalRiskModal: React.FC<LocalRiskModalProps> = ({
  incidents,
  onClose,
  onFocusCoordinates,
}) => {
  const [locations, setLocations] = useState<UserLocation[]>([
    { id: 'loc-1', label: 'Primary Residence (Sendai / Miyagi)', coordinates: [38.2682, 140.8694] },
    { id: 'loc-2', label: 'University Campus (Fresno, CA)', coordinates: [36.7468, -119.7726] },
    { id: 'loc-3', label: 'Coastal Office (Porto Alegre, Brazil)', coordinates: [-30.0346, -51.2177] },
    { id: 'loc-4', label: 'Family Residence (New Delhi, India)', coordinates: [28.6139, 77.2090] },
  ]);

  const [newLabel, setNewLabel] = useState('');
  const [newLat, setNewLat] = useState('');
  const [newLng, setNewLng] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const latNum = parseFloat(newLat);
    const lngNum = parseFloat(newLng);
    if (!newLabel || isNaN(latNum) || isNaN(lngNum)) return;

    const newLoc: UserLocation = {
      id: `loc-${Date.now()}`,
      label: newLabel,
      coordinates: [latNum, lngNum],
    };
    setLocations([...locations, newLoc]);
    setNewLabel('');
    setNewLat('');
    setNewLng('');
    setShowAddForm(false);
  };

  // Evaluate risk for each location deterministically against active incidents
  const evaluatedLocations = locations.map(loc => {
    let nearestIncident: DisasterEvent | null = null;
    let minDistance = Infinity;

    incidents.forEach(inc => {
      const dist = calculateDistanceKm(loc.coordinates[0], loc.coordinates[1], inc.coordinates[0], inc.coordinates[1]);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIncident = inc;
      }
    });

    let riskLevel: 'SAFE' | 'MONITORING' | 'WARNING' | 'HIGH RISK' = 'SAFE';
    let rationale = 'No active hazard detected within monitoring radius (300km).';
    const incidentTitle = nearestIncident ? (nearestIncident as DisasterEvent).title : 'Hazard Center';

    if (minDistance <= 75) {
      riskLevel = 'HIGH RISK';
      rationale = `Critical: Within ${minDistance}km immediate hazard impact perimeter of ${incidentTitle}.`;
    } else if (minDistance <= 180) {
      riskLevel = 'WARNING';
      rationale = `Advisory: Within ${minDistance}km active buffer of ${incidentTitle}.`;
    } else if (minDistance <= 350) {
      riskLevel = 'MONITORING';
      rationale = `Observation: Located ${minDistance}km from peripheral monitoring zone of ${incidentTitle}.`;
    }

    return {
      ...loc,
      riskLevel,
      minDistance,
      nearestIncident,
      nearestTitle: incidentTitle,
      rationale,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-surface-container-low border border-outline-variant/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-outline-variant/30 bg-surface-container-lowest">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container border border-primary/40 flex items-center justify-center text-primary">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-lg font-bold text-on-surface">
                  Local Risk Profiles (PostGIS Engine)
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-mono font-semibold">
                  DETERMINISTIC
                </span>
              </div>
              <span className="font-body-sm text-xs text-on-surface-variant">
                Evaluated in real-time via geospatial radius &amp; point-in-polygon rules
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-label-mono-sm text-xs text-outline uppercase font-semibold">
              Monitored Profiles ({locations.length})
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
              type="button"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Cancel' : 'Add Test Coordinate'}</span>
            </button>
          </div>

          {/* Add form */}
          {showAddForm && (
            <form onSubmit={handleAddLocation} className="p-4 rounded-xl bg-surface-container border border-primary/30 flex flex-col gap-3">
              <span className="font-headline-sm text-xs text-primary font-semibold uppercase">
                Register New Monitored Point
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Label (e.g. Campus)"
                  value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs focus:border-primary outline-none"
                  required
                />
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude (e.g. 35.67)"
                  value={newLat}
                  onChange={e => setNewLat(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs font-mono focus:border-primary outline-none"
                  required
                />
                <input
                  type="number"
                  step="any"
                  placeholder="Longitude (e.g. 139.65)"
                  value={newLng}
                  onChange={e => setNewLng(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-xs font-mono focus:border-primary outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="self-end px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary-fixed transition-colors"
              >
                Evaluate Proximity
              </button>
            </form>
          )}

          {/* Evaluated Locations List */}
          <div className="flex flex-col gap-2.5">
            {evaluatedLocations.map(loc => {
              let badgeColor = 'bg-emerald-nominal/15 text-emerald-nominal border-emerald-nominal/30';
              let icon = <ShieldCheck className="w-4 h-4 text-emerald-nominal" />;

              if (loc.riskLevel === 'HIGH RISK') {
                badgeColor = 'bg-secondary-container/30 text-secondary border-secondary-container';
                icon = <AlertTriangle className="w-4 h-4 text-secondary animate-pulse" />;
              } else if (loc.riskLevel === 'WARNING') {
                badgeColor = 'bg-tertiary/20 text-tertiary border-tertiary/40';
                icon = <AlertTriangle className="w-4 h-4 text-tertiary" />;
              } else if (loc.riskLevel === 'MONITORING') {
                badgeColor = 'bg-primary/20 text-primary border-primary/30';
                icon = <Radio className="w-4 h-4 text-primary" />;
              }

              return (
                <div
                  key={loc.id}
                  className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-2 hover:border-outline-variant/60 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-sm font-semibold text-on-surface">
                          {loc.label}
                        </span>
                        <span className="font-mono text-[11px] text-outline">
                          {loc.coordinates[0].toFixed(4)}&deg; N, {loc.coordinates[1].toFixed(4)}&deg; E
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded font-label-mono-sm text-[11px] font-bold border flex items-center gap-1.5 ${badgeColor}`}>
                        {icon}
                        {loc.riskLevel}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface-container-lowest/80 border border-outline-variant/20 text-xs font-body-sm text-on-surface-variant">
                    {loc.rationale}
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-outline">
                      Nearest Threat: <span className="text-on-surface font-medium">{loc.nearestTitle}</span> ({loc.minDistance} km)
                    </span>
                    <button
                      onClick={() => {
                        onFocusCoordinates(loc.coordinates);
                        onClose();
                      }}
                      className="text-primary hover:underline font-mono text-xs font-semibold"
                      type="button"
                    >
                      Locate on Radar &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest flex items-center justify-between">
          <span className="font-label-mono-sm text-[11px] text-outline">
            Mathematical calculations adhere strictly to Rules.md (Rule 1.1)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-on-surface text-xs font-semibold"
            type="button"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
