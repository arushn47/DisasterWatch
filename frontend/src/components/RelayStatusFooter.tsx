import React from 'react';
import { Satellite, Radio } from 'lucide-react';

export const RelayStatusFooter: React.FC = () => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full pt-3 pb-8">
      {/* Sentinel & Landsat Relays */}
      <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-surface-container border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
            <Satellite className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-sm font-semibold text-on-surface truncate">
              Sentinel &amp; Landsat Relays Active
            </span>
            <span className="font-body-sm text-xs text-on-surface-variant truncate">
              Mean sensor refresh rate 94.2s across primary coverage zones
            </span>
          </div>
        </div>
        <span className="font-label-mono-sm text-xs text-primary font-bold hidden sm:inline-block px-2.5 py-1 rounded bg-primary/10 border border-primary/20 flex-shrink-0">
          99.98% SYNC
        </span>
      </div>

      {/* Civil Protection Broadcast Net */}
      <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-surface-container border border-tertiary/30 flex items-center justify-center text-tertiary flex-shrink-0">
            <Radio className="w-5 h-5 text-tertiary animate-pulse" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-sm font-semibold text-on-surface truncate">
              Civil Protection Broadcast Net
            </span>
            <span className="font-body-sm text-xs text-on-surface-variant truncate">
              Instant localized push alerts operational for municipal agencies
            </span>
          </div>
        </div>
        <span className="font-label-mono-sm text-xs text-tertiary font-bold hidden sm:inline-block px-2.5 py-1 rounded bg-tertiary/10 border border-tertiary/20 flex-shrink-0">
          READY
        </span>
      </div>
    </footer>
  );
};
