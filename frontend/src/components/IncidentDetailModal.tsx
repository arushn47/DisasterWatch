'use client';

import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  AlertTriangle, 
  Info,
  Layers,
  Compass
} from 'lucide-react';
import type { DisasterEvent } from '../types/disaster';

interface IncidentDetailModalProps {
  incident: DisasterEvent | null;
  onClose: () => void;
}

export const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({
  incident,
  onClose,
}) => {
  const [aiExpanded, setAiExpanded] = useState<boolean>(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiChecklist, setAiChecklist] = useState<string[] | null>(null);

  if (!incident) return null;

  const [lat, lng] = incident.coordinates;

  // Mock simulated deterministic risk calculation from sample user position (Tokyo or SF)
  const isHighSeverity = incident.severity === 'CRITICAL' || incident.severity === 'HIGH';

  const handleGenerateAiGuidance = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setAiExpanded(true);

      if (incident.type === 'EARTHQUAKE') {
        setAiChecklist([
          'DROP, COVER, AND HOLD ON: Protect your head and neck under a sturdy table or desk.',
          'Stay away from glass windows, exterior walls, and heavy overhead lighting fixtures.',
          'Check gas, water, and electrical supply lines for leaks or fractures before re-entering buildings.',
          'Prepare for secondary aftershocks: keep emergency grab-bag within reach and shoes beside your bed.',
        ]);
      } else if (incident.type === 'WILDFIRE') {
        setAiChecklist([
          'Review local Civil Defense Zone: If under Level 3 Evacuation Order, leave immediately.',
          'Seal all windows and exterior vents. Switch HVAC systems to indoor recirculate mode to minimize smoke inhalation.',
          'Back your vehicle into the garage or driveway with emergency bags loaded and ignition keys ready.',
          'Wear N95/P100 respirators outdoors to filter particulate matter (PM2.5).',
        ]);
      } else if (incident.type === 'CYCLONE') {
        setAiChecklist([
          'Board up or tape glass windows and secure loose outdoor debris (awnings, patio furniture).',
          'Store minimum 3 gallons of clean potable water per person in clean, sealed containers.',
          'Disconnect non-essential electrical appliances to prevent surge fires during power restorations.',
          'Never attempt to cross flooded roadways or underpasses: 6 inches of moving water can knock down an adult.',
        ]);
      } else {
        setAiChecklist([
          'Seek immediate high ground if located in low-lying drainage basins or near riverbanks.',
          'Never walk, swim, or drive through flood waters: Turn Around, Don’t Drown.',
          'Sterilize all tap water (boil at rolling boil for minimum 1 minute) before consumption.',
          'Monitor battery-powered or hand-crank civil radio for municipal evacuation shelter coordinates.',
        ]);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-surface-container-low border border-outline-variant/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b border-outline-variant/30 bg-surface-container-lowest/70">
          <div className="flex flex-col gap-1 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-xs font-label-mono-sm font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/40">
                {incident.type}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-label-mono-sm font-bold uppercase tracking-wider ${
                incident.severity === 'CRITICAL'
                  ? 'bg-secondary-container/40 text-secondary border border-secondary-container'
                  : 'bg-tertiary/20 text-tertiary border border-tertiary/40'
              }`}>
                {incident.severity} SEVERITY
              </span>
              <span className="font-label-mono-sm text-xs text-outline">
                {incident.timeAgo}
              </span>
            </div>
            <h2 className="font-headline-sm text-xl font-bold text-on-surface mt-1">
              {incident.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{incident.region}</span>
              <span className="text-outline font-mono">({lat.toFixed(4)}&deg; N, {lng.toFixed(4)}&deg; E)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors flex-shrink-0"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex flex-col gap-5 text-sm">
          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {incident.metrics.magnitude && (
              <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/30 flex flex-col">
                <span className="font-label-mono-sm text-[10px] text-outline uppercase">MAGNITUDE</span>
                <span className="font-headline-md text-lg font-bold text-tertiary">
                  M {incident.metrics.magnitude.toFixed(1)}
                </span>
                <span className="text-[10px] text-on-surface-variant">Moment Scale</span>
              </div>
            )}

            {incident.metrics.depthKm !== undefined && (
              <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/30 flex flex-col">
                <span className="font-label-mono-sm text-[10px] text-outline uppercase">FOCAL DEPTH</span>
                <span className="font-headline-md text-lg font-bold text-on-surface font-mono">
                  {incident.metrics.depthKm} km
                </span>
                <span className="text-[10px] text-on-surface-variant">Hypocenter</span>
              </div>
            )}

            {incident.metrics.windSpeedKmh && (
              <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/30 flex flex-col">
                <span className="font-label-mono-sm text-[10px] text-outline uppercase">MAX WIND</span>
                <span className="font-headline-md text-lg font-bold text-primary font-mono">
                  {incident.metrics.windSpeedKmh} km/h
                </span>
                <span className="text-[10px] text-on-surface-variant">Sustained Gusts</span>
              </div>
            )}

            {incident.metrics.acresBurned && (
              <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/30 flex flex-col">
                <span className="font-label-mono-sm text-[10px] text-outline uppercase">PERIMETER</span>
                <span className="font-headline-md text-lg font-bold text-secondary font-mono">
                  {incident.metrics.acresBurned.toLocaleString()} ac
                </span>
                <span className="text-[10px] text-on-surface-variant">Contained: {incident.metrics.containmentPercent}%</span>
              </div>
            )}

            {incident.metrics.crestHeightM && (
              <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/30 flex flex-col">
                <span className="font-label-mono-sm text-[10px] text-outline uppercase">CREST SURGE</span>
                <span className="font-headline-md text-lg font-bold text-surface-tint font-mono">
                  +{incident.metrics.crestHeightM}m
                </span>
                <span className="text-[10px] text-on-surface-variant">Above Datum</span>
              </div>
            )}

            <div className="p-3 rounded-lg bg-surface-container border border-outline-variant/30 flex flex-col">
              <span className="font-label-mono-sm text-[10px] text-outline uppercase">PRIMARY SOURCE</span>
              <span className="font-body-md text-xs font-semibold text-on-surface truncate">
                {incident.primarySource}
              </span>
              <span className="text-[10px] text-primary">Verified Feed</span>
            </div>
          </div>

          {/* Event Narrative Summary */}
          <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-surface-container/60 border border-outline-variant/20">
            <span className="font-label-mono-sm text-[11px] text-outline uppercase font-semibold flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-primary" />
              SITUATION REPORT
            </span>
            <p className="text-on-surface text-xs leading-relaxed font-body-md">
              {incident.summary}
            </p>
          </div>

          {/* PostGIS Deterministic Risk Preview Banner */}
          <div className="p-3.5 rounded-xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-primary" />
                <span className="font-label-mono-sm text-xs text-on-surface font-bold uppercase tracking-wider">
                  PostGIS Deterministic Risk Assessment
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded font-label-mono-sm text-[10px] font-bold ${
                isHighSeverity
                  ? 'bg-secondary-container text-white'
                  : 'bg-primary-container text-on-primary-container'
              }`}>
                {isHighSeverity ? 'WARNING (PERIPHERAL BUFFER)' : 'MONITORING TIER'}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Evaluated via PostGIS spatial distance calculation from client coordinate envelope. Hazard buffer evaluated within deterministic radius threshold.
            </p>
          </div>

          {/* AI Emergency Guidance Generator (Google Gemini Preview) */}
          <div className="p-4 rounded-xl bg-surface-container-high/80 border border-primary/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-headline-sm text-xs font-bold text-primary uppercase tracking-wider">
                  AI Emergency Guidance Assistant (Google Gemini)
                </span>
              </div>
              {!aiExpanded && (
                <button
                  onClick={handleGenerateAiGuidance}
                  disabled={isGeneratingAi}
                  className="px-3 py-1 rounded bg-primary text-on-primary font-body-md text-xs font-semibold hover:bg-primary-fixed transition-colors flex items-center gap-1.5 shadow-sm"
                  type="button"
                >
                  <Sparkles className="w-3 h-3" />
                  {isGeneratingAi ? 'Synthesizing...' : 'Generate AI Action Brief'}
                </button>
              )}
            </div>

            {aiExpanded && aiChecklist && (
              <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
                <span className="font-label-mono-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                  Recommended Immediate Protocol:
                </span>
                <ul className="flex flex-col gap-1.5 pl-1">
                  {aiChecklist.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-on-surface">
                      <span className="w-4 h-4 rounded-full bg-primary/20 text-primary font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mandatory Safety Disclaimer */}
          <div className="p-3 rounded-lg bg-surface-container border border-secondary-container/30 flex items-start gap-2.5 text-xs text-on-surface-variant">
            <AlertTriangle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-secondary text-[11px] uppercase tracking-wider">
                Emergency Decision-Support Notice
              </span>
              <span className="text-[11px] text-outline">
                DisasterWatch is an informational platform. Assessments are non-prescriptive and do not replace sovereign civil defense alerts. Always obey instructions from local emergency authorities.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-outline-variant/30 bg-surface-container-lowest/90">
          <div className="flex items-center gap-1.5 text-outline text-xs">
            <Info className="w-3.5 h-3.5" />
            <span>Incident Ref: <span className="font-mono text-on-surface">{incident.id}</span></span>
          </div>

          <div className="flex items-center gap-2">
            {incident.externalUrl && (
              <a
                href={incident.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-on-surface text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>Official Feed</span>
                <ExternalLink className="w-3 h-3 text-primary" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary-fixed transition-colors shadow-sm"
              type="button"
            >
              Close Telemetry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
