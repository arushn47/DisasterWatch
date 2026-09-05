'use client';

import React from 'react';
import type { DisasterType } from '../types/disaster';

interface SidebarProps {
  activeDomain: 'all' | DisasterType;
  onSelectDomain: (domain: 'all' | DisasterType) => void;
  activeView: 'radar' | 'risk';
  onSelectView: (view: 'radar' | 'risk') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeDomain,
  onSelectDomain,
  activeView,
  onSelectView,
}) => {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-surface-container-lowest z-40 hidden md:flex flex-col justify-between py-panel-padding-standard overflow-y-auto border-r border-outline-variant/20">
      <div className="flex flex-col gap-module-gap px-panel-padding-tight">
        {/* OVERVIEW SECTION */}
        <div className="flex flex-col gap-gutter-xs">
          <div className="px-gutter-sm py-gutter-xs">
            <span className="font-label-mono-sm text-label-mono-sm text-outline uppercase tracking-widest">
              OVERVIEW
            </span>
          </div>
          <nav className="flex flex-col gap-gutter-xs">
            <button
              onClick={() => {
                onSelectView('radar');
                onSelectDomain('all');
              }}
              className={`px-gutter-md py-gutter-sm rounded-lg transition-colors font-body-md text-body-md text-left ${
                activeView === 'radar' && activeDomain === 'all'
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
              type="button"
            >
              Live Map &amp; Radar
            </button>
            <button
              onClick={() => onSelectView('risk')}
              className={`px-gutter-md py-gutter-sm rounded-lg transition-colors font-body-md text-body-md text-left ${
                activeView === 'risk'
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
              type="button"
            >
              Local Risk Profiles
            </button>
          </nav>
        </div>

        {/* DISASTER DOMAINS SECTION */}
        <div className="flex flex-col gap-gutter-xs">
          <div className="px-gutter-sm py-gutter-xs">
            <span className="font-label-mono-sm text-label-mono-sm text-outline uppercase tracking-widest">
              DISASTER DOMAINS
            </span>
          </div>
          <nav className="flex flex-col gap-gutter-xs">
            {/* Earthquakes */}
            <button
              onClick={() => {
                onSelectView('radar');
                onSelectDomain('EARTHQUAKE');
              }}
              className={`px-gutter-md py-gutter-sm rounded-lg transition-colors font-body-md text-body-md text-left ${
                activeDomain === 'EARTHQUAKE'
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
              type="button"
            >
              Earthquakes
            </button>

            {/* Wildfires */}
            <button
              onClick={() => {
                onSelectView('radar');
                onSelectDomain('WILDFIRE');
              }}
              className={`px-gutter-md py-gutter-sm rounded-lg transition-colors font-body-md text-body-md text-left ${
                activeDomain === 'WILDFIRE'
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
              type="button"
            >
              Wildfires
            </button>

            {/* Cyclones & Hurricanes */}
            <button
              onClick={() => {
                onSelectView('radar');
                onSelectDomain('CYCLONE');
              }}
              className={`px-gutter-md py-gutter-sm rounded-lg transition-colors font-body-md text-body-md text-left ${
                activeDomain === 'CYCLONE'
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
              type="button"
            >
              Cyclones &amp; Hurricanes
            </button>

            {/* Floods */}
            <button
              onClick={() => {
                onSelectView('radar');
                onSelectDomain('FLOOD');
              }}
              className={`px-gutter-md py-gutter-sm rounded-lg transition-colors font-body-md text-body-md text-left ${
                activeDomain === 'FLOOD'
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
              type="button"
            >
              Floods
            </button>

            {/* Tsunamis */}
            <button
              onClick={() => {
                onSelectView('radar');
                onSelectDomain('TSUNAMI');
              }}
              className={`px-gutter-md py-gutter-sm rounded-lg transition-colors font-body-md text-body-md text-left ${
                activeDomain === 'TSUNAMI'
                  ? 'bg-primary-container text-on-primary-container font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
              type="button"
            >
              Tsunamis
            </button>
          </nav>
        </div>
      </div>

      {/* MONITOR STATUS */}
      <div className="px-panel-padding-standard pb-6">
        <div className="bg-surface-container-low p-gutter-md rounded-lg flex flex-col gap-gutter-xs border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <span className="font-label-mono-sm text-label-mono-sm text-outline uppercase">
              MONITOR STATUS
            </span>
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            All active sensor networks responding within target latency.
          </span>
        </div>
      </div>
    </aside>
  );
};
