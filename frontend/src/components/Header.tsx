'use client';

import React from 'react';

interface HeaderProps {
  activeAlertsCount: number;
  onOpenNotifications?: () => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeAlertsCount,
  onOpenNotifications,
  onOpenSettings,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/20">
      <div className="h-16 w-full px-grid-margin-desktop flex items-center justify-between gap-gutter-md">
        {/* Logo & Platform Titles */}
        <div className="flex items-center gap-gutter-md">
          <img
            alt="Aegis Watch Logo"
            className="h-9 w-9 rounded-lg object-cover ring-1 ring-primary/40 shadow-sm shadow-primary/20"
            src="/logo.png"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm uppercase text-on-surface tracking-wider font-semibold">
              AEGIS WATCH
            </span>
            <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase font-medium">
              GLOBAL SENSOR NET
            </span>
          </div>
        </div>

        {/* Status Pill & Action Buttons */}
        <div className="flex items-center gap-gutter-lg">
          <div className="hidden md:flex items-center gap-gutter-sm px-gutter-md py-gutter-xs bg-surface-container-low rounded-full border border-outline-variant/30">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant font-medium">
              SYSTEM OPERATIONAL
            </span>
            <span className="h-3 w-px bg-surface-variant"></span>
            <span className="font-label-mono-sm text-label-mono-sm text-primary font-semibold">
              LIVE TELEMETRY ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-gutter-xs">
            <button
              onClick={onOpenNotifications}
              className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
              type="button"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {activeAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary-container text-white text-[10px] font-label-mono-sm font-bold flex items-center justify-center">
                  {activeAlertsCount}
                </span>
              )}
            </button>
            <button
              onClick={onOpenSettings}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
              type="button"
              title="Settings & Diagnostics"
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
            </button>
            <div className="flex items-center pl-gutter-xs">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-label-mono-md text-label-mono-md font-bold">
                AW
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
