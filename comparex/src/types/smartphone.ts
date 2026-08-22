export type Brand = 
  | 'Apple'
  | 'Samsung'
  | 'OnePlus'
  | 'Google'
  | 'Xiaomi'
  | 'Nothing'
  | 'Motorola'
  | 'Realme'
  | 'Vivo'
  | 'Oppo';

export type PriceRange = 
  | 'under-15000'
  | '15000-25000'
  | '25000-40000'
  | '40000-60000'
  | 'above-60000';

export interface DisplaySpec {
  size: string; // e.g. "6.8 inch"
  sizeNumber: number; // e.g. 6.8
  type: string; // e.g. "Dynamic AMOLED 2X, LTPO"
  resolution: string; // e.g. "3120 x 1440 pixels (QHD+)"
  refreshRate: number; // e.g. 120
  peakBrightness: number; // e.g. 2600 (nits)
  protection: string; // e.g. "Corning Gorilla Armor"
  aspectRatio?: string;
  hdrSupport?: string;
}

export interface PerformanceSpec {
  processor: string; // e.g. "Snapdragon 8 Elite (3nm)"
  cpu: string; // e.g. "Octa-core (2x4.32 GHz Oryon & 6x3.53 GHz Oryon)"
  gpu: string; // e.g. "Adreno 830"
  ram: number; // in GB e.g. 12
  ramType: string; // e.g. "LPDDR5X"
  storage: number; // in GB e.g. 256
  storageType: string; // e.g. "UFS 4.0"
  expandableStorage: boolean;
  antutuScore: number; // e.g. 2850000
}

export interface CameraSpec {
  mainCamera: string; // e.g. "200 MP (f/1.7, OIS)"
  mainSensorMP: number; // 200
  ultrawide: string; // e.g. "50 MP (f/1.9, 120˚)"
  telephoto?: string; // e.g. "50 MP periscope (5x optical zoom, OIS) + 10 MP (3x zoom)"
  telephotoMP?: number; // 50
  frontCamera: string; // e.g. "12 MP (f/2.2, 4K60)"
  frontCameraMP: number; // 12
  video: string; // e.g. "8K@30fps, 4K@120fps, HDR10+"
  ois: boolean;
  features: string[];
}

export interface BatterySpec {
  capacity: number; // in mAh e.g. 5000
  chargingSpeed: number; // in Watts e.g. 45
  wirelessCharging: boolean;
  wirelessChargingSpeed?: number; // in Watts
  reverseCharging: boolean;
  batteryLifeHours: number; // estimated continuous screen-on hours e.g. 14.5
}

export interface ConnectivitySpec {
  fiveG: boolean;
  wifi: string; // e.g. "Wi-Fi 7 (802.11be)"
  bluetooth: string; // e.g. "5.4, A2DP, LE"
  nfc: boolean;
  usb: string; // e.g. "USB Type-C 3.2 Gen 2, DisplayPort"
  sim: string; // e.g. "Dual SIM (Nano-SIM and eSIM)"
}

export interface SoftwareSpec {
  os: string; // e.g. "Android"
  osVersion: string; // e.g. "Android 15 (One UI 7)"
  updateSupportYears: number; // e.g. 7
}

export interface PhysicalSpec {
  weight: number; // in grams e.g. 219
  dimensions: string; // e.g. "162.8 x 77.6 x 8.2 mm"
  ipRating: string; // e.g. "IP68 (up to 1.5m for 30 mins)"
  buildMaterials: string; // e.g. "Titanium frame, Glass front/back"
  colors: string[];
}

export interface SmartphoneScores {
  overall: number; // 1 - 100
  performance: number; // 1 - 100
  camera: number; // 1 - 100
  battery: number; // 1 - 100
  display: number; // 1 - 100
  value: number; // 1 - 100
}

export interface RetailOffer {
  storeName: string;
  price: number;
  originalPrice?: number;
  deliveryTime: string;
  badge?: string;
  url?: string;
}

export interface Smartphone {
  id: string;
  name: string;
  brand: Brand;
  model: string;
  price: number;
  originalPrice: number;
  rating: number; // e.g. 4.8
  reviewCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  shortDescription: string;
  highlights: string[];
  availability: 'In Stock' | 'Pre-Order' | 'Limited Stock';
  releaseDate: string;
  bestFor: string;
  scores: SmartphoneScores;
  display: DisplaySpec;
  performance: PerformanceSpec;
  camera: CameraSpec;
  battery: BatterySpec;
  connectivity: ConnectivitySpec;
  software: SoftwareSpec;
  physical: PhysicalSpec;
  pros: string[];
  cons: string[];
  offers?: RetailOffer[];
}

export interface FilterState {
  searchQuery: string;
  priceRange: PriceRange[];
  brands: Brand[];
  ram: number[];
  storage: number[];
  refreshRates: number[];
  batteryMin: number | null;
  cameraMinMP: number | null;
  fiveGOnly: boolean;
  minRating: number | null;
  screenSizeRange?: 'all' | 'compact' | 'large';
}

export type SortOption = 
  | 'relevance'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'newest'
  | 'popular';

export interface QuizPreferences {
  budget: 'under-15000' | '15000-25000' | '25000-40000' | '40000-60000' | 'above-60000';
  priority: 'Camera' | 'Gaming' | 'Battery' | 'Performance' | 'Display' | 'Value for Money';
  batteryImportance: 'Low' | 'Medium' | 'High';
  displayPreference: 'Compact phone' | 'Large display' | 'No preference';
  preferredBrand?: Brand | 'Any';
}

export interface RecommendationMatch {
  phone: Smartphone;
  matchScore: number; // 0-100%
  reasons: string[];
  prosForUser: string[];
}

export interface ComparisonWinnerSummary {
  overallWinner: Smartphone;
  overallReason: string;
  bestPerformance: Smartphone;
  bestPerformanceReason: string;
  bestCamera: Smartphone;
  bestCameraReason: string;
  bestBattery: Smartphone;
  bestBatteryReason: string;
  bestValue: Smartphone;
  bestValueReason: string;
}
