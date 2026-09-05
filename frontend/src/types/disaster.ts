export type DisasterType = 'EARTHQUAKE' | 'WILDFIRE' | 'CYCLONE' | 'FLOOD' | 'TSUNAMI';

export type DisasterSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface DisasterMetrics {
  magnitude?: number;
  depthKm?: number;
  acresBurned?: number;
  containmentPercent?: number;
  windSpeedKmh?: number;
  categoryScale?: string; // e.g. "Cat 4 Extreme"
  crestHeightM?: number;
  displacedPop?: number;
  tsunamiAdvisory?: string;
  landfallProjectionHours?: number;
}

export interface DisasterEvent {
  id: string;
  type: DisasterType;
  title: string;
  locationName: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  severity: DisasterSeverity;
  status: 'ACTIVE' | 'MONITORING' | 'CONTAINED';
  timestamp: string;
  timeAgo: string;
  metrics: DisasterMetrics;
  primarySource: string;
  externalUrl?: string;
  summary: string;
  officialAdvisory: string;
  isLiveFeed?: boolean;
}

export interface IncidentFilter {
  type: 'all' | DisasterType;
  minSeverity?: DisasterSeverity;
  searchQuery?: string;
}

export interface GlobalSensorStats {
  activeFires: number;
  significantQuakes: number;
  tropicalStorms: number;
  majorFloods: number;
  tsunamiWatches: number;
  systemHealth: string;
  sensorLatencyMs: number;
  lastSyncUtc: string;
}
