'use client';

import React from 'react';
import { ChevronRight, Radio } from 'lucide-react';
import type { DisasterEvent } from '../types/disaster';

interface IncidentListProps {
  incidents: DisasterEvent[];
  selectedIncident: DisasterEvent | null;
  onSelectIncident: (incident: DisasterEvent) => void;
}

export const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  selectedIncident,
  onSelectIncident,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* List Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="font-headline-sm text-lg text-on-surface font-bold tracking-tight">
            Recent Global Alerts
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/40 font-label-mono-sm text-[10px] text-primary flex items-center gap-1 font-semibold">
            <Radio className="w-2.5 h-2.5 text-primary animate-pulse" />
            LIVE
          </span>
        </div>
        <span className="font-label-mono-sm text-xs text-outline tabular-nums">
          {incidents.length} EVENTS
        </span>
      </div>

      {/* Incident Card Stack */}
      <div className="flex flex-col gap-2 max-h-[640px] overflow-y-auto pr-1">
        {incidents.length === 0 ? (
          <div className="p-8 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center flex flex-col items-center justify-center gap-2 text-outline">
            <span className="font-headline-sm text-sm text-on-surface-variant font-semibold">
              No Active Hazards in Filter Range
            </span>
            <span className="font-body-sm text-xs">
              Try switching the domain filter to &ldquo;All Disasters&rdquo;.
            </span>
          </div>
        ) : (
          incidents.map(incident => {
            const isSelected = selectedIncident?.id === incident.id;

            // Domain tag styles
            let badgeBg = 'bg-primary/15 text-primary border-primary/30';
            let metricColor = 'text-primary';
            let metricText = '';
            let borderAccent = 'border-l-primary';

            if (incident.type === 'EARTHQUAKE') {
              badgeBg = 'bg-tertiary/15 text-tertiary border-tertiary/30';
              metricColor = 'text-tertiary';
              metricText = incident.metrics.magnitude ? `M ${incident.metrics.magnitude.toFixed(1)}` : 'Quake';
              borderAccent = 'border-l-tertiary';
            } else if (incident.type === 'WILDFIRE') {
              badgeBg = 'bg-secondary-container/25 text-secondary border-secondary-container/50';
              metricColor = 'text-secondary';
              metricText = incident.metrics.categoryScale || 'Cat 4';
              borderAccent = 'border-l-secondary';
            } else if (incident.type === 'CYCLONE') {
              badgeBg = 'bg-primary-container/20 text-primary border-primary-container/40';
              metricColor = 'text-primary';
              metricText = incident.metrics.windSpeedKmh ? `${incident.metrics.windSpeedKmh} km/h` : 'Cyclone';
              borderAccent = 'border-l-primary';
            } else if (incident.type === 'FLOOD') {
              badgeBg = 'bg-surface-tint/15 text-surface-tint border-surface-tint/30';
              metricColor = 'text-surface-tint';
              metricText = incident.metrics.crestHeightM ? `+${incident.metrics.crestHeightM}m` : 'Flood Alert';
              borderAccent = 'border-l-surface-tint';
            } else if (incident.type === 'TSUNAMI') {
              badgeBg = 'bg-tertiary-fixed/20 text-tertiary border-tertiary/30';
              metricColor = 'text-tertiary';
              metricText = 'Tsunami Watch';
              borderAccent = 'border-l-tertiary';
            }

            return (
              <div
                key={incident.id}
                onClick={() => onSelectIncident(incident)}
                className={`alert-card flex flex-col gap-2 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-sm border-l-4 ${borderAccent} ${
                  isSelected
                    ? 'bg-surface-container-high border-primary/50 shadow-md shadow-primary/10 ring-1 ring-primary/40'
                    : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/30 hover:border-outline-variant/60'
                }`}
              >
                {/* Card Top Row: Badge, Time, and Metric */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded border font-label-mono-sm text-[10px] font-bold uppercase tracking-wider ${badgeBg}`}
                    >
                      {incident.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-label-mono-sm text-[11px] text-outline">
                      {incident.timeAgo}
                    </span>
                    {incident.isLiveFeed && (
                      <span className="text-[9px] px-1 rounded bg-primary/10 text-primary font-mono font-medium">
                        USGS LIVE
                      </span>
                    )}
                  </div>
                  <span className={`font-label-mono-md text-xs sm:text-sm font-bold tabular-nums ${metricColor}`}>
                    {metricText}
                  </span>
                </div>

                {/* Title & Region */}
                <div className="flex flex-col">
                  <span className="font-headline-sm text-sm font-semibold text-on-surface line-clamp-1">
                    {incident.title}
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                    {incident.region}
                    {incident.metrics.depthKm ? ` • ${incident.metrics.depthKm} km depth` : ''}
                  </span>
                </div>

                {/* Footer Advisory Note */}
                <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20 text-on-surface-variant text-[11px]">
                  <span className="truncate pr-2 text-outline">
                    {incident.metrics.tsunamiAdvisory || incident.officialAdvisory.substring(0, 48) + '...'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-outline-variant group-hover:text-primary transition-colors" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
