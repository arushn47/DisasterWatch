'use client';

import React from 'react';
import type { DisasterType } from '../types/disaster';

interface FilterCounts {
  all: number;
  earthquake: number;
  wildfire: number;
  cyclone: number;
  flood: number;
  tsunami: number;
}

interface FilterBarProps {
  activeFilter: 'all' | DisasterType;
  counts: FilterCounts;
  onSelectFilter: (filter: 'all' | DisasterType) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  counts,
  onSelectFilter,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
      {/* Title & Telemetry Status */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-label-mono-sm text-xs uppercase tracking-widest text-primary font-semibold">
            Orbital Sync 24-Hour Stream
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping"></span>
        </div>
        <h1 className="font-headline-lg text-2xl lg:text-3xl text-on-surface font-bold tracking-tight mt-0.5">
          Active Situational Radar
        </h1>
      </div>

      {/* Filter Pills with Badge Counts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0" id="filter-container">
        {/* All Disasters */}
        <button
          onClick={() => onSelectFilter('all')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-body-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            activeFilter === 'all'
              ? 'bg-primary text-on-primary font-semibold shadow-sm shadow-primary/30'
              : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span>All Disasters</span>
          <span
            className={`px-1.5 py-0.5 rounded-full font-label-mono-sm text-[11px] font-bold ${
              activeFilter === 'all'
                ? 'bg-on-primary/20 text-on-primary'
                : 'bg-surface-container-highest text-on-surface-variant'
            }`}
          >
            {counts.all}
          </span>
        </button>

        {/* Earthquakes */}
        <button
          onClick={() => onSelectFilter('EARTHQUAKE')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-body-md text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
            activeFilter === 'EARTHQUAKE'
              ? 'bg-tertiary text-on-tertiary font-semibold shadow-sm shadow-tertiary/30'
              : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span>Earthquakes</span>
          <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-mono-sm text-[11px]">
            {counts.earthquake}
          </span>
        </button>

        {/* Wildfires */}
        <button
          onClick={() => onSelectFilter('WILDFIRE')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-body-md text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
            activeFilter === 'WILDFIRE'
              ? 'bg-secondary-container text-white font-semibold shadow-sm shadow-secondary/30'
              : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
          <span>Wildfires</span>
          <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-mono-sm text-[11px]">
            {counts.wildfire}
          </span>
        </button>

        {/* Cyclones */}
        <button
          onClick={() => onSelectFilter('CYCLONE')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-body-md text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
            activeFilter === 'CYCLONE'
              ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm shadow-primary/30'
              : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span>Cyclones</span>
          <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-mono-sm text-[11px]">
            {counts.cyclone}
          </span>
        </button>

        {/* Floods */}
        <button
          onClick={() => onSelectFilter('FLOOD')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-body-md text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
            activeFilter === 'FLOOD'
              ? 'bg-surface-tint text-on-primary-container font-semibold shadow-sm'
              : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="w-2 h-2 rounded-full bg-surface-tint"></span>
          <span>Floods</span>
          <span className="px-1.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-mono-sm text-[11px]">
            {counts.flood}
          </span>
        </button>
      </div>
    </div>
  );
};
