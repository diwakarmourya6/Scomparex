/**
 * Seed: Insert sample brands, smartphones, and specs.
 * Data mirrors the frontend's src/data/smartphones.ts exactly.
 *
 * Run:  npm run seed
 *       (or: node database/seeds/001_seed_smartphones.js)
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { pool } = require('../../src/config/database');

// ---------------------------------------------------------------------------
// Brands
// ---------------------------------------------------------------------------
const brands = [
  { name: 'Apple',    slug: 'apple',    country: 'United States' },
  { name: 'Samsung',  slug: 'samsung',  country: 'South Korea' },
  { name: 'OnePlus',  slug: 'oneplus',  country: 'China' },
  { name: 'Google',   slug: 'google',   country: 'United States' },
  { name: 'Xiaomi',   slug: 'xiaomi',   country: 'China' },
  { name: 'Nothing',  slug: 'nothing',  country: 'United Kingdom' },
  { name: 'Motorola', slug: 'motorola', country: 'United States' },
  { name: 'Realme',   slug: 'realme',   country: 'China' },
  { name: 'Vivo',     slug: 'vivo',     country: 'China' },
  { name: 'Oppo',     slug: 'oppo',     country: 'China' },
];

// ---------------------------------------------------------------------------
// Smartphones — each entry uses brandSlug to resolve brand_id at insert time
// ---------------------------------------------------------------------------
const smartphones = [
  {
    brandSlug: 'apple',
    slug: 'iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max',
    model: 'iPhone 16 Pro Max',
    price: 144900,
    originalPrice: 159900,
    rating: 4.9,
    reviewCount: 4280,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'The pinnacle of Apple engineering featuring grade 5 titanium design, Camera Control button, the groundbreaking A18 Pro chip, and unprecedented battery endurance.',
    shortDescription: 'Apple flagship with A18 Pro, 48MP Fusion camera, 5x telephoto, and titanium body.',
    highlights: ['A18 Pro 3nm chipset with Apple Intelligence', 'Grade 5 Titanium frame with Ceramic Shield front', 'Dedicated capacitive Camera Control button', '48MP Fusion main with 4K120fps Dolby Vision video'],
    availability: 'In Stock',
    releaseDate: 'September 2024',
    bestFor: 'Pro Creators, iOS Enthusiasts, and Cinematic Video',
    scores: { overall: 96, performance: 98, camera: 97, battery: 93, display: 95, value: 78 },
    pros: ['Unmatched video recording quality with 4K@120fps Dolby Vision', 'Class-leading CPU & single-core performance efficiency', 'Huge 6.9-inch display with ultra-thin uniform bezels', 'Superb battery longevity'],
    cons: ['Slower 30W wired charging speed compared to Android rivals', 'Heavyweight 227g body', 'High starting price point'],
    offers: [
      { storeName: 'Amazon', price: 144900, originalPrice: 159900, deliveryTime: 'Tomorrow, Free', badge: 'Best Seller' },
      { storeName: 'Flipkart', price: 144900, originalPrice: 159900, deliveryTime: '2-3 Days' },
      { storeName: 'Apple Store', price: 144900, deliveryTime: 'Official Warranty' },
    ],
    specs: {
      display: { size: '6.9 inch', sizeNumber: 6.9, type: 'Super Retina XDR OLED, ProMotion LTPO', resolution: '2868 x 1320 pixels (460 ppi)', refreshRate: 120, peakBrightness: 2000, protection: 'Ceramic Shield (Latest Gen)', aspectRatio: '19.5:9', hdrSupport: 'HDR10, Dolby Vision' },
      performance: { processor: 'Apple A18 Pro (3nm)', cpu: '6-core CPU (2 performance & 4 efficiency)', gpu: 'Apple 6-core GPU (Hardware Ray Tracing)', ram: 8, ramType: 'LPDDR5X', storage: 256, storageType: 'NVMe', expandableStorage: false, antutuScore: 2150000 },
      camera: { mainCamera: '48 MP (f/1.8, 24mm, 1/1.28", sensor-shift OIS)', mainSensorMP: 48, ultrawide: '48 MP (f/2.2, 13mm, 120˚, hybrid AF)', telephoto: '12 MP (f/2.8, 120mm, 5x optical zoom, 3D sensor-shift OIS)', telephotoMP: 12, frontCamera: '12 MP TrueDepth (f/1.9, PDAF, 4K60)', frontCameraMP: 12, video: '4K@120fps Dolby Vision HDR, ProRes, Log video', ois: true, features: ['Apple ProRAW', 'Action Mode', 'Spatial Audio Capture', 'Camera Control Button', 'Smart HDR 5'] },
      battery: { capacity: 4685, chargingSpeed: 30, wirelessCharging: true, wirelessChargingSpeed: 25, reverseCharging: true, batteryLifeHours: 15.5 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 7 (802.11be)', bluetooth: 'Bluetooth 5.3', nfc: true, usb: 'USB Type-C 3.2 Gen 2 (up to 10Gbps, DisplayPort)', sim: 'Dual eSIM / Nano-SIM + eSIM' },
      software: { os: 'iOS', osVersion: 'iOS 18 (Apple Intelligence)', updateSupportYears: 6 },
      physical: { weight: 227, dimensions: '163 x 77.6 x 8.25 mm', ipRating: 'IP68 (6m up to 30 mins)', buildMaterials: 'Grade 5 Titanium frame, Textured matte glass back', colors: ['Desert Titanium', 'Natural Titanium', 'White Titanium', 'Black Titanium'] },
    },
  },
  {
    brandSlug: 'samsung',
    slug: 'samsung-galaxy-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    model: 'Galaxy S25 Ultra',
    price: 129999,
    originalPrice: 141999,
    rating: 4.9,
    reviewCount: 3820,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'],
    description: 'The definitive Android powerhouse with integrated S Pen, anti-reflective Gorilla Armor, 200MP Quad Telephoto AI camera system, and Snapdragon 8 Elite.',
    shortDescription: 'Ultimate Android power user flagship with 200MP camera, S Pen, and 7 years of OS updates.',
    highlights: ['Snapdragon 8 Elite for Galaxy (Custom tuned)', 'Anti-reflective Dynamic AMOLED 2X flat display', 'Embedded Bluetooth S Pen stylus', '200MP Quad Camera with 5x & 3x optical telephotos', 'Galaxy AI suite with Live Translate & Circle to Search'],
    availability: 'In Stock',
    releaseDate: 'January 2025',
    bestFor: 'Productivity Power Users, Zoom Photography, and Note Takers',
    scores: { overall: 97, performance: 99, camera: 98, battery: 92, display: 99, value: 82 },
    pros: ['Incredible anti-reflective display coating reduces outdoor glare significantly', 'Versatile 200MP + dual telephoto setup with 100x zoom capability', 'Industry-leading 7 years of full Android OS and security upgrades', 'Built-in S Pen stylus with remote gestures'],
    cons: ['Charging speed capped at 45W while rivals push 100W+', 'Box does not include a power adapter'],
    offers: [
      { storeName: 'Samsung Official', price: 129999, originalPrice: 141999, deliveryTime: '2 Days, Free S Pen tips', badge: 'Official Store' },
      { storeName: 'Amazon', price: 129999, originalPrice: 141999, deliveryTime: 'Tomorrow' },
      { storeName: 'Croma', price: 130999, deliveryTime: 'Store Pickup Available' },
    ],
    specs: {
      display: { size: '6.9 inch', sizeNumber: 6.9, type: 'Dynamic AMOLED 2X, LTPO Flat Screen', resolution: '3120 x 1440 pixels (QHD+, 498 ppi)', refreshRate: 120, peakBrightness: 2600, protection: 'Corning Gorilla Armor (Anti-Reflective)', aspectRatio: '19.5:9', hdrSupport: 'HDR10+' },
      performance: { processor: 'Qualcomm Snapdragon 8 Elite (3nm)', cpu: 'Octa-core (2x4.47 GHz Oryon + 6x3.53 GHz Oryon)', gpu: 'Adreno 830', ram: 12, ramType: 'LPDDR5X', storage: 256, storageType: 'UFS 4.0', expandableStorage: false, antutuScore: 2880000 },
      camera: { mainCamera: '200 MP (f/1.7, 24mm, 1/1.3", Multi-directional PDAF, OIS)', mainSensorMP: 200, ultrawide: '50 MP (f/2.0, 13mm, 120˚, Dual Pixel PDAF)', telephoto: '50 MP periscope (5x optical zoom, OIS) + 10 MP (3x optical zoom, OIS)', telephotoMP: 50, frontCamera: '12 MP (f/2.2, 26mm, Dual Pixel PDAF, 4K60)', frontCameraMP: 12, video: '8K@30fps, 4K@120fps, HDR10+, gyro-EIS, Stereo Audio', ois: true, features: ['100x Space Zoom', 'Expert RAW with Astro-photography', 'Nightography Video', 'Generative Photo Edit'] },
      battery: { capacity: 5000, chargingSpeed: 45, wirelessCharging: true, wirelessChargingSpeed: 15, reverseCharging: true, batteryLifeHours: 14.8 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 7 (802.11be tri-band)', bluetooth: 'Bluetooth 5.4', nfc: true, usb: 'USB Type-C 3.2 Gen 2 (DisplayPort, Samsung DeX)', sim: 'Dual SIM (Nano-SIM and eSIM)' },
      software: { os: 'Android', osVersion: 'Android 15 (One UI 7.0)', updateSupportYears: 7 },
      physical: { weight: 219, dimensions: '162.8 x 77.6 x 8.2 mm', ipRating: 'IP68 (1.5m up to 30 mins)', buildMaterials: 'Titanium frame, Gorilla Armor glass front, Gorilla Glass back', colors: ['Titanium Gray', 'Titanium Black', 'Titanium Silver', 'Titanium Blue'] },
    },
  },
  {
    brandSlug: 'google',
    slug: 'google-pixel-9-pro-xl',
    name: 'Google Pixel 9 Pro XL',
    model: 'Pixel 9 Pro XL',
    price: 109999,
    originalPrice: 124999,
    rating: 4.8,
    reviewCount: 2950,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'],
    description: 'The purest Android experience powered by Google Tensor G4, Gemini Live AI integration, Super Actua display, and standard-setting computational photography.',
    shortDescription: 'Google flagship with unmatched AI photo processing, Tensor G4, and 7 years of Feature Drops.',
    highlights: ['Google Tensor G4 processor with Titan M2 security', 'Super Actua LTPO OLED reaching up to 3000 nits', '50MP triple pro camera with Video Boost AI', 'Built-in Gemini Live and Pixel Studio image generator'],
    availability: 'In Stock',
    releaseDate: 'August 2024',
    bestFor: 'Still Photography, Pure Android Enthusiasts, and AI Early Adopters',
    scores: { overall: 94, performance: 90, camera: 99, battery: 89, display: 98, value: 84 },
    pros: ['Unrivaled point-and-shoot camera accuracy for people, skin tones, and low light', 'Blindingly bright 3000 nits Super Actua screen', 'Massive 16GB RAM as standard for heavy on-device AI tasks', 'Exclusive Pixel Feature drops and clean stock interface'],
    cons: ['Raw gaming benchmark performance trails Snapdragon 8 Elite', 'Base storage starts at 128GB at this premium price'],
    offers: [
      { storeName: 'Flipkart', price: 109999, originalPrice: 124999, deliveryTime: '2 Days' },
      { storeName: 'Reliance Digital', price: 109999, deliveryTime: '1 Day' },
    ],
    specs: {
      display: { size: '6.8 inch', sizeNumber: 6.8, type: 'Super Actua LTPO OLED', resolution: '2992 x 1344 pixels (486 ppi)', refreshRate: 120, peakBrightness: 3000, protection: 'Corning Gorilla Glass Victus 2', aspectRatio: '20:9', hdrSupport: 'HDR10+, Ultra HDR' },
      performance: { processor: 'Google Tensor G4 (4nm)', cpu: '8-core (1x3.1 GHz Cortex-X4 & 3x2.6 GHz & 4x1.92 GHz)', gpu: 'Mali-G715-Immortalis MC7', ram: 16, ramType: 'LPDDR5X', storage: 128, storageType: 'UFS 3.1', expandableStorage: false, antutuScore: 1320000 },
      camera: { mainCamera: '50 MP (f/1.68, 25mm, 1/1.31", dual pixel PDAF, OIS)', mainSensorMP: 50, ultrawide: '48 MP (f/1.7, 123˚, Quad PD with Macro Focus)', telephoto: '48 MP periscope (5x optical zoom, 30x Super Res Zoom, OIS)', telephotoMP: 48, frontCamera: '42 MP Dual PD (f/2.2, 103˚ ultrawide, 4K60)', frontCameraMP: 42, video: '8K@30fps (via Video Boost), 4K@60fps 10-bit HDR', ois: true, features: ['Best Take', 'Magic Editor', 'Add Me', 'Night Sight Video', 'Real Tone', 'Audio Magic Eraser'] },
      battery: { capacity: 5060, chargingSpeed: 37, wirelessCharging: true, wirelessChargingSpeed: 23, reverseCharging: true, batteryLifeHours: 13.9 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 7 (802.11be)', bluetooth: 'Bluetooth 5.3', nfc: true, usb: 'USB Type-C 3.2', sim: 'Single Nano-SIM and eSIM' },
      software: { os: 'Android', osVersion: 'Android 15 (Pixel UI)', updateSupportYears: 7 },
      physical: { weight: 221, dimensions: '162.8 x 76.6 x 8.5 mm', ipRating: 'IP68', buildMaterials: 'Polished aluminum frame, Matte glass back', colors: ['Obsidian', 'Porcelain', 'Hazel', 'Rose Quartz'] },
    },
  },
  {
    brandSlug: 'oneplus',
    slug: 'oneplus-13',
    name: 'OnePlus 13',
    model: '13',
    price: 69999,
    originalPrice: 74999,
    rating: 4.8,
    reviewCount: 2410,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'],
    description: 'Flagship speed redefined with Snapdragon 8 Elite, monster 6000mAh Glacier battery, 100W SuperVOOC flash charge, and Hasselblad 50MP triple camera system.',
    shortDescription: 'Flagship killer with Snapdragon 8 Elite, 6000mAh battery, 100W charging, and 2K Oriental display.',
    highlights: ['Qualcomm Snapdragon 8 Elite (3nm)', 'Massive 6000mAh Silicon-Carbon Glacier Battery', '100W wired & 50W magnetic wireless charging', '2K 120Hz Oriental OLED display with Glove Touch', 'IP68 + IP69 dual water resistance certification'],
    availability: 'In Stock',
    releaseDate: 'January 2025',
    bestFor: 'Hardcore Gamers, Power Users, and Fast-Charging Seekers',
    scores: { overall: 95, performance: 99, camera: 92, battery: 99, display: 96, value: 95 },
    pros: ['Enormous 6000mAh battery paired with rapid 100W charger in the box', 'Peak Snapdragon 8 Elite speed with top-tier cooling system', 'Stunning 4500 nits display with wet/glove touch support', 'Exceptional value-for-money under ₹70,000'],
    cons: ['Telephoto zoom maxes out optically at 3x compared to 5x on Ultra flagships'],
    offers: [
      { storeName: 'Amazon', price: 69999, originalPrice: 74999, deliveryTime: 'Tomorrow, Free', badge: 'Top Rated' },
      { storeName: 'OnePlus Store', price: 69999, deliveryTime: 'Free Protective Case' },
    ],
    specs: {
      display: { size: '6.82 inch', sizeNumber: 6.82, type: 'LTPO 4.0 Oriental OLED 2.0', resolution: '3168 x 1440 pixels (2K QHD+, 510 ppi)', refreshRate: 120, peakBrightness: 4500, protection: 'Crystal Shield Ceramic Glass', aspectRatio: '19.8:9', hdrSupport: 'Dolby Vision, HDR10+, DisplayMate A++' },
      performance: { processor: 'Qualcomm Snapdragon 8 Elite (3nm)', cpu: 'Octa-core (2x4.32 GHz Oryon & 6x3.53 GHz Oryon)', gpu: 'Adreno 830', ram: 12, ramType: 'LPDDR5X (up to 24GB available)', storage: 256, storageType: 'UFS 4.0', expandableStorage: false, antutuScore: 2950000 },
      camera: { mainCamera: '50 MP Sony LYT-808 (f/1.6, 23mm, 1/1.4", OIS)', mainSensorMP: 50, ultrawide: '50 MP Samsung JN5 (f/2.0, 120˚, AF with macro)', telephoto: '50 MP Sony LYT-600 periscope (3x optical zoom, OIS)', telephotoMP: 50, frontCamera: '32 MP (f/2.4, 4K60)', frontCameraMP: 32, video: '8K@30fps, 4K@60fps Dolby Vision HDR', ois: true, features: ['Hasselblad Color Calibration', 'Master Portrait Mode', 'TurboRAW HDR', 'XPAN mode'] },
      battery: { capacity: 6000, chargingSpeed: 100, wirelessCharging: true, wirelessChargingSpeed: 50, reverseCharging: true, batteryLifeHours: 17.2 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 7 (802.11be)', bluetooth: 'Bluetooth 5.4', nfc: true, usb: 'USB Type-C 3.2 Gen 1', sim: 'Dual Nano-SIM' },
      software: { os: 'Android', osVersion: 'Android 15 (OxygenOS 15)', updateSupportYears: 5 },
      physical: { weight: 213, dimensions: '162.9 x 76.5 x 8.5 mm', ipRating: 'IP68 & IP69 (High-pressure hot water resistant)', buildMaterials: 'Aluminum alloy frame, Eco-leather / AG Velvet glass back', colors: ['Midnight Black', 'Arctic Dawn', 'Emerald Green'] },
    },
  },
  {
    brandSlug: 'apple',
    slug: 'apple-iphone-16',
    name: 'Apple iPhone 16',
    model: 'iPhone 16',
    price: 74990,
    originalPrice: 79900,
    rating: 4.7,
    reviewCount: 3100,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
    description: 'Fresh vibrant colors with the versatile Action button, Camera Control, A18 chipset built for Apple Intelligence, and next-generation dual camera system.',
    shortDescription: 'Standard iPhone with A18 chip, Camera Control, 48MP Fusion camera, and Action button.',
    highlights: ['Apple A18 chip (3nm) with Apple Intelligence', 'Camera Control button and programmable Action button', '48MP 2-in-1 Fusion camera with 2x optical-quality zoom', 'Dynamic Island interactive notification hub'],
    availability: 'In Stock',
    releaseDate: 'September 2024',
    bestFor: 'Everyday Users wanting premium iOS ecosystem in a light form factor',
    scores: { overall: 90, performance: 94, camera: 89, battery: 86, display: 82, value: 80 },
    pros: ['Extremely lightweight (170g) and comfortable one-handed ergonomics', 'Fast A18 processor with Apple Intelligence readiness', 'Action button and Camera Control hardware button added', 'Vibrant color-infused matte back finish'],
    cons: ['Screen is limited to standard 60Hz refresh rate', 'Slow USB 2.0 data transfer speeds over Type-C'],
    offers: [
      { storeName: 'Amazon', price: 74990, originalPrice: 79900, deliveryTime: 'Tomorrow' },
      { storeName: 'Flipkart', price: 74990, originalPrice: 79900, deliveryTime: '2 Days' },
    ],
    specs: {
      display: { size: '6.1 inch', sizeNumber: 6.1, type: 'Super Retina XDR OLED', resolution: '2556 x 1179 pixels (460 ppi)', refreshRate: 60, peakBrightness: 2000, protection: 'Ceramic Shield (Latest Gen)', aspectRatio: '19.5:9', hdrSupport: 'HDR10, Dolby Vision' },
      performance: { processor: 'Apple A18 (3nm)', cpu: '6-core (2 performance & 4 efficiency)', gpu: 'Apple 5-core GPU', ram: 8, ramType: 'LPDDR5X', storage: 128, storageType: 'NVMe', expandableStorage: false, antutuScore: 1750000 },
      camera: { mainCamera: '48 MP Fusion (f/1.6, 26mm, 1/1.56", sensor-shift OIS)', mainSensorMP: 48, ultrawide: '12 MP (f/2.2, 13mm, 120˚ with Macro support)', telephoto: null, telephotoMP: null, frontCamera: '12 MP TrueDepth (f/1.9, PDAF, 4K60)', frontCameraMP: 12, video: '4K@60fps Dolby Vision HDR, Spatial Video', ois: true, features: ['Photographic Styles Gen-2', 'Spatial Photos', 'Audio Mix (In-frame / Studio / Cinematic)'] },
      battery: { capacity: 3561, chargingSpeed: 25, wirelessCharging: true, wirelessChargingSpeed: 25, reverseCharging: true, batteryLifeHours: 12.8 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 7 (802.11be)', bluetooth: 'Bluetooth 5.3', nfc: true, usb: 'USB Type-C 2.0 (480Mbps)', sim: 'Dual eSIM / Nano-SIM + eSIM' },
      software: { os: 'iOS', osVersion: 'iOS 18 (Apple Intelligence)', updateSupportYears: 6 },
      physical: { weight: 170, dimensions: '147.6 x 71.6 x 7.8 mm', ipRating: 'IP68 (6m up to 30 mins)', buildMaterials: 'Aerospace-grade Aluminum, Color-infused back glass', colors: ['Ultramarine', 'Teal', 'Pink', 'White', 'Black'] },
    },
  },
  {
    brandSlug: 'samsung',
    slug: 'samsung-galaxy-s25',
    name: 'Samsung Galaxy S25',
    model: 'Galaxy S25',
    price: 74999,
    originalPrice: 80999,
    rating: 4.7,
    reviewCount: 1980,
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80'],
    description: 'The premier compact Android flagship offering Snapdragon 8 Elite power, 120Hz Dynamic AMOLED, triple cameras, and 7 years of Android updates in a 162g body.',
    shortDescription: 'Compact Android flagship with Snapdragon 8 Elite, 120Hz LTPO display, and 7 years OS updates.',
    highlights: ['Snapdragon 8 Elite (3nm) in a pocket-friendly form factor', '6.2-inch 120Hz LTPO Dynamic AMOLED 2X', 'Triple lens camera with 3x optical telephoto', '7 years of Android OS & security updates'],
    availability: 'In Stock',
    releaseDate: 'January 2025',
    bestFor: 'Compact Phone Lovers who refuse to compromise on flagship processor power',
    scores: { overall: 92, performance: 98, camera: 90, battery: 84, display: 95, value: 86 },
    pros: ['One of the lightest and most compact flagships on the market (162g)', 'Smooth 120Hz LTPO display unlike the standard iPhone 16 (60Hz)', 'Dedicated 3x optical telephoto lens included', '7 years software update promise'],
    cons: ['Modest 4000mAh battery requires daily evening charging under heavy use', '25W charging speed is modest'],
    offers: [
      { storeName: 'Amazon', price: 74999, originalPrice: 80999, deliveryTime: 'Tomorrow' },
      { storeName: 'Samsung Shop', price: 74999, deliveryTime: '2 Days' },
    ],
    specs: {
      display: { size: '6.2 inch', sizeNumber: 6.2, type: 'Dynamic AMOLED 2X, LTPO (1-120Hz)', resolution: '2340 x 1080 pixels (FHD+, 416 ppi)', refreshRate: 120, peakBrightness: 2600, protection: 'Corning Gorilla Glass Victus 2', aspectRatio: '19.5:9', hdrSupport: 'HDR10+' },
      performance: { processor: 'Qualcomm Snapdragon 8 Elite (3nm)', cpu: 'Octa-core (2x4.32 GHz Oryon + 6x3.53 GHz Oryon)', gpu: 'Adreno 830', ram: 12, ramType: 'LPDDR5X', storage: 128, storageType: 'UFS 4.0', expandableStorage: false, antutuScore: 2750000 },
      camera: { mainCamera: '50 MP (f/1.8, 24mm, Dual Pixel PDAF, OIS)', mainSensorMP: 50, ultrawide: '12 MP (f/2.2, 13mm, 120˚)', telephoto: '10 MP (f/2.4, 67mm, 3x optical zoom, OIS)', telephotoMP: 10, frontCamera: '12 MP (f/2.2, Dual Pixel PDAF, 4K60)', frontCameraMP: 12, video: '8K@30fps, 4K@60fps, HDR10+', ois: true, features: ['Galaxy AI Photo Assist', 'Single Take', 'Super Steady video', 'Night Portrait'] },
      battery: { capacity: 4000, chargingSpeed: 25, wirelessCharging: true, wirelessChargingSpeed: 15, reverseCharging: true, batteryLifeHours: 12.5 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 7 (802.11be)', bluetooth: 'Bluetooth 5.4', nfc: true, usb: 'USB Type-C 3.2 Gen 1 (Samsung DeX)', sim: 'Dual Nano-SIM + eSIM' },
      software: { os: 'Android', osVersion: 'Android 15 (One UI 7.0)', updateSupportYears: 7 },
      physical: { weight: 162, dimensions: '146.9 x 70.4 x 7.6 mm', ipRating: 'IP68 (1.5m for 30 mins)', buildMaterials: 'Armor Aluminum frame, Glass Victus 2 back', colors: ['Icy Blue', 'Mint Green', 'Onyx Black', 'Marble Gray'] },
    },
  },
  {
    brandSlug: 'xiaomi',
    slug: 'xiaomi-15-pro',
    name: 'Xiaomi 15 Pro',
    model: '15 Pro',
    price: 64999,
    originalPrice: 69999,
    rating: 4.7,
    reviewCount: 1640,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'],
    description: 'Engineered with Leica Summilux optical lenses, monster 6100mAh battery, 90W HyperCharge, 2K micro-curved display, and Snapdragon 8 Elite.',
    shortDescription: 'Leica co-engineered photography monster with 6100mAh battery and Snapdragon 8 Elite.',
    highlights: ['Snapdragon 8 Elite chipset (3nm)', 'Triple 50MP Leica Summilux optics with 5x Periscope', 'Huge 6100mAh high-density Silicon-Carbon battery', '90W wired + 50W wireless HyperCharge'],
    availability: 'In Stock',
    releaseDate: 'November 2024',
    bestFor: 'Mobile Photographers and All-Day Battery Seekers',
    scores: { overall: 94, performance: 98, camera: 95, battery: 98, display: 95, value: 91 },
    pros: ['Incredible 6100mAh battery runtime lasting easily 2 full days', 'True 5x optical Leica periscope telephoto lens with great sharpness', 'Rapid 90W wired and 50W wireless charging included in box', 'Top-tier 3200 nits 2K display'],
    cons: ['HyperOS has occasional pre-installed recommendations', 'Slightly thicker camera module'],
    offers: [
      { storeName: 'Mi.com', price: 64999, originalPrice: 69999, deliveryTime: '2 Days, Official Bundle', badge: 'Official Brand' },
      { storeName: 'Amazon', price: 64999, deliveryTime: 'Tomorrow' },
    ],
    specs: {
      display: { size: '6.73 inch', sizeNumber: 6.73, type: 'LTPO OLED, 1-120Hz Dynamic', resolution: '3200 x 1440 pixels (2K WQHD+, 522 ppi)', refreshRate: 120, peakBrightness: 3200, protection: 'Xiaomi Dragon Crystal Glass 2.0', aspectRatio: '20:9', hdrSupport: 'Dolby Vision, HDR10+' },
      performance: { processor: 'Qualcomm Snapdragon 8 Elite (3nm)', cpu: 'Octa-core (2x4.32 GHz Oryon & 6x3.53 GHz Oryon)', gpu: 'Adreno 830', ram: 12, ramType: 'LPDDR5X', storage: 256, storageType: 'UFS 4.0', expandableStorage: false, antutuScore: 2910000 },
      camera: { mainCamera: '50 MP Leica Light Hunter 900 (f/1.44, 23mm, 1/1.3", OIS)', mainSensorMP: 50, ultrawide: '50 MP (f/2.2, 14mm, 115˚, macro AF)', telephoto: '50 MP Sony IMX858 periscope (5x optical zoom, 10x lossless, OIS)', telephotoMP: 50, frontCamera: '32 MP (f/2.0, 4K60)', frontCameraMP: 32, video: '8K@30fps, 4K@60fps HDR10+ Dolby Vision', ois: true, features: ['Leica Authentic & Vibrant Look', 'Master Portrait with Leica Filters', 'Pro Director Mode'] },
      battery: { capacity: 6100, chargingSpeed: 90, wirelessCharging: true, wirelessChargingSpeed: 50, reverseCharging: true, batteryLifeHours: 17.5 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 7 (802.11be)', bluetooth: 'Bluetooth 5.4', nfc: true, usb: 'USB Type-C 3.2 Gen 2 (10Gbps)', sim: 'Dual Nano-SIM' },
      software: { os: 'Android', osVersion: 'Android 15 (Xiaomi HyperOS 2.0)', updateSupportYears: 5 },
      physical: { weight: 213, dimensions: '161.3 x 75.3 x 8.35 mm', ipRating: 'IP68', buildMaterials: 'Aluminum alloy frame, Ceramic / Glass back', colors: ['Titanium Silver', 'Obsidian Black', 'Jade Green', 'White'] },
    },
  },
  {
    brandSlug: 'vivo',
    slug: 'vivo-x100-pro',
    name: 'Vivo X100 Pro',
    model: 'X100 Pro',
    price: 89999,
    originalPrice: 96999,
    rating: 4.8,
    reviewCount: 1420,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'],
    description: 'Equipped with a gigantic 1-inch Sony IMX989 sensor with ZEISS APO Floating Telephoto, V3 imaging chip, and MediaTek Dimensity 9300 powerhouse.',
    shortDescription: 'Ultimate photography phone with ZEISS 1-inch main sensor and APO floating telephoto.',
    highlights: ['1-inch Sony IMX989 main sensor with ZEISS T* coating', 'ZEISS APO Floating Telephoto with Macro zoom', 'Custom Vivo V3 6nm Imaging Chip', 'MediaTek Dimensity 9300 flagship processor', '100W FlashCharge with 5400mAh battery'],
    availability: 'In Stock',
    releaseDate: 'January 2024',
    bestFor: 'Pro Level Portrait Photographers and Low-Light Night Shooters',
    scores: { overall: 95, performance: 95, camera: 99, battery: 92, display: 94, value: 87 },
    pros: ['The 1-inch sensor produces natural optical bokeh and incredible low light detail', 'ZEISS APO telephoto doubles as an astonishing macro microscope', 'Generous 16GB RAM + 512GB base storage configuration', '100W charger juices to 50% in under 15 minutes'],
    cons: ['Heavier phone at 225g with pronounced circular camera halo'],
    offers: [
      { storeName: 'Flipkart', price: 89999, originalPrice: 96999, deliveryTime: 'Tomorrow' },
      { storeName: 'Vivo India', price: 89999, deliveryTime: '2 Days' },
    ],
    specs: {
      display: { size: '6.78 inch', sizeNumber: 6.78, type: '8T LTPO AMOLED Curved', resolution: '2800 x 1260 pixels (1.5K, 452 ppi)', refreshRate: 120, peakBrightness: 3000, protection: 'Armor Glass', aspectRatio: '20:9', hdrSupport: 'HDR10+, 2160Hz PWM Dimming' },
      performance: { processor: 'MediaTek Dimensity 9300 (4nm)', cpu: 'Octa-core (4x3.25 GHz Cortex-X4 & 4x2.0 GHz Cortex-A720)', gpu: 'Immortalis-G720 MC12', ram: 16, ramType: 'LPDDR5T', storage: 512, storageType: 'UFS 4.0', expandableStorage: false, antutuScore: 2280000 },
      camera: { mainCamera: '50 MP ZEISS 1-inch Sony IMX989 (f/1.75, 23mm, OIS, 1G+7P lens)', mainSensorMP: 50, ultrawide: '50 MP (f/2.0, 15mm, 119˚, AF)', telephoto: '50 MP ZEISS APO Floating periscope (4.3x optical zoom, 100x digital, OIS)', telephotoMP: 50, frontCamera: '32 MP (f/2.0, 4K60)', frontCameraMP: 32, video: '4K Cinematic Portrait Video, 8K@30fps', ois: true, features: ['ZEISS Multifocal Portrait', 'ZEISS Cine-flare Portrait', 'Sunshot Mode', 'Telephoto Sun & Sunset HDR'] },
      battery: { capacity: 5400, chargingSpeed: 100, wirelessCharging: true, wirelessChargingSpeed: 50, reverseCharging: true, batteryLifeHours: 15.0 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 7', bluetooth: 'Bluetooth 5.4', nfc: true, usb: 'USB Type-C 3.2 Gen 1', sim: 'Dual Nano-SIM' },
      software: { os: 'Android', osVersion: 'Android 15 (Funtouch OS 15)', updateSupportYears: 4 },
      physical: { weight: 225, dimensions: '164.05 x 75.28 x 8.91 mm', ipRating: 'IP68', buildMaterials: 'Aluminum frame, Vegan Leather / AG Fluorite Glass', colors: ['Asteroid Black', 'Sunset Orange (Leather)', 'Stargaze Blue'] },
    },
  },
  {
    brandSlug: 'motorola',
    slug: 'motorola-edge-50-ultra',
    name: 'Motorola Edge 50 Ultra',
    model: 'Edge 50 Ultra',
    price: 54999,
    originalPrice: 64999,
    rating: 4.6,
    reviewCount: 1120,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'],
    description: 'Exquisite design crafted in real Nordic Wood and Vegan Leather, Pantone-validated 144Hz pOLED screen, 125W TurboPower, and Snapdragon 8s Gen 3.',
    shortDescription: 'Sensational design phone with real wood finish, 144Hz Pantone display, and 125W charging.',
    highlights: ['Real Nordic Wood and Vegan Suede back panel finishes', 'World-first Pantone Validated camera and 144Hz pOLED display', '125W wired TurboPower + 50W wireless charging', 'Triple 50MP + 50MP + 64MP 3x periscope camera system'],
    availability: 'In Stock',
    releaseDate: 'May 2024',
    bestFor: 'Design Connoisseurs, Fast Charging Fans, and Display Enthusiasts',
    scores: { overall: 91, performance: 92, camera: 91, battery: 88, display: 96, value: 93 },
    pros: ['Real wood finish feels uniquely warm, premium, and fingerprint-proof', 'Ultra-fluid 144Hz refresh rate with Pantone color accuracy', 'Lightning-fast 125W charger powers phone 0-100% in 19 minutes', 'Clean, bloatware-free Hello UI with Motorola Moto Gestures'],
    cons: ['Battery is 4500mAh instead of 5000mAh+ on competitors', 'Curved edges may have slight palm touch sensitivity'],
    offers: [
      { storeName: 'Flipkart', price: 54999, originalPrice: 64999, deliveryTime: 'Tomorrow', badge: 'Special Deal' },
      { storeName: 'Motorola Store', price: 54999, deliveryTime: '2 Days' },
    ],
    specs: {
      display: { size: '6.7 inch', sizeNumber: 6.7, type: 'Super HD 1.5K pOLED (Pantone Validated)', resolution: '2712 x 1220 pixels (446 ppi)', refreshRate: 144, peakBrightness: 2500, protection: 'Corning Gorilla Glass Victus', aspectRatio: '20:9', hdrSupport: 'HDR10+, DCI-P3 100%' },
      performance: { processor: 'Qualcomm Snapdragon 8s Gen 3 (4nm)', cpu: 'Octa-core (1x3.0 GHz Cortex-X4 & 4x2.8 GHz & 3x2.0 GHz)', gpu: 'Adreno 735', ram: 12, ramType: 'LPDDR5X', storage: 512, storageType: 'UFS 4.0', expandableStorage: false, antutuScore: 1580000 },
      camera: { mainCamera: '50 MP (f/1.6, 1/1.3", OmniVision OV50H, OIS)', mainSensorMP: 50, ultrawide: '50 MP (f/2.0, 122˚ with macro focus)', telephoto: '64 MP periscope (3x optical zoom, 100x digital, OIS)', telephotoMP: 64, frontCamera: '50 MP (f/1.9, Quad Pixel AF, 4K60)', frontCameraMP: 50, video: '4K@60fps HDR10+', ois: true, features: ['Pantone Color Tuning', 'Moto AI Photo Enhancement', 'Action Shot Auto-Focus'] },
      battery: { capacity: 4500, chargingSpeed: 125, wirelessCharging: true, wirelessChargingSpeed: 50, reverseCharging: true, batteryLifeHours: 13.0 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 7', bluetooth: 'Bluetooth 5.4', nfc: true, usb: 'USB Type-C 3.1 Gen 2 (DisplayPort 1.4)', sim: 'Dual SIM (Nano + eSIM)' },
      software: { os: 'Android', osVersion: 'Android 15 (Hello UI)', updateSupportYears: 4 },
      physical: { weight: 197, dimensions: '161.09 x 72.38 x 8.59 mm', ipRating: 'IP68', buildMaterials: 'Sandblasted aluminum frame, Real Nordic Wood / Vegan Leather back', colors: ['Nordic Wood', 'Peach Fuzz', 'Forest Grey'] },
    },
  },
  {
    brandSlug: 'realme',
    slug: 'realme-gt-6',
    name: 'Realme GT 6',
    model: 'GT 6',
    price: 39999,
    originalPrice: 44999,
    rating: 4.7,
    reviewCount: 2180,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'],
    description: 'The Top-Tier Flagship Killer boasting 6000 nits Hyper Display, Snapdragon 8s Gen 3, Sony LYT-808 OIS main camera, and 120W SUPERVOOC charging.',
    shortDescription: 'Ultimate value flagship killer with 6000 nits 8T LTPO display and 120W charging.',
    highlights: ['World-record 6000 nits 8T LTPO Ultra Display', 'Snapdragon 8s Gen 3 flagship AI chipset', 'Sony LYT-808 OIS 50MP + 50MP 2x Telephoto portrait', '5500mAh dual-cell battery with 120W fast charging'],
    availability: 'In Stock',
    releaseDate: 'June 2024',
    bestFor: 'Value-Conscious Gamers and Outdoor Media Consumers',
    scores: { overall: 92, performance: 94, camera: 89, battery: 96, display: 98, value: 98 },
    pros: ['Unbelievable 6000 nits peak brightness handles direct glaring sunlight with ease', 'Big 5500mAh battery charges to 50% in just 10 minutes with 120W brick', 'Sony LYT-808 flagship primary camera sensor under ₹40,000', 'Outstanding overall price-to-performance ratio'],
    cons: ['No wireless charging', 'Ultrawide camera is basic 8MP sensor'],
    offers: [
      { storeName: 'Amazon', price: 39999, originalPrice: 44999, deliveryTime: 'Tomorrow', badge: 'Top Value' },
      { storeName: 'Flipkart', price: 39999, deliveryTime: '2 Days' },
    ],
    specs: {
      display: { size: '6.78 inch', sizeNumber: 6.78, type: '8T LTPO AMOLED (1-120Hz)', resolution: '2780 x 1264 pixels (1.5K, 450 ppi)', refreshRate: 120, peakBrightness: 6000, protection: 'Corning Gorilla Glass Victus 2', aspectRatio: '19.8:9', hdrSupport: 'Dolby Vision, Pro-XDR, 2160Hz PWM' },
      performance: { processor: 'Qualcomm Snapdragon 8s Gen 3 (4nm)', cpu: 'Octa-core (1x3.0 GHz Cortex-X4 & 4x2.8 GHz & 3x2.0 GHz)', gpu: 'Adreno 735', ram: 12, ramType: 'LPDDR5X', storage: 256, storageType: 'UFS 4.0', expandableStorage: false, antutuScore: 1620000 },
      camera: { mainCamera: '50 MP Sony LYT-808 (f/1.69, 1/1.4", OIS)', mainSensorMP: 50, ultrawide: '8 MP (f/2.2, 112˚)', telephoto: '50 MP Samsung JN5 (2x optical portrait zoom, f/2.0)', telephotoMP: 50, frontCamera: '32 MP Sony IMX615 (f/2.45, 4K30)', frontCameraMP: 32, video: '4K@60fps HDR, 1080p@120fps', ois: true, features: ['AI Night Vision Video', 'AI Smart Removal', 'Street Photography Mode 4.0'] },
      battery: { capacity: 5500, chargingSpeed: 120, wirelessCharging: false, wirelessChargingSpeed: null, reverseCharging: false, batteryLifeHours: 16.0 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 6', bluetooth: 'Bluetooth 5.4', nfc: true, usb: 'USB Type-C 2.0', sim: 'Dual Nano-SIM' },
      software: { os: 'Android', osVersion: 'Android 15 (Realme UI 6.0)', updateSupportYears: 4 },
      physical: { weight: 199, dimensions: '162 x 75.1 x 8.6 mm', ipRating: 'IP65', buildMaterials: 'Metallic middle frame, Dual-texture nano mirror glass', colors: ['Fluid Silver', 'Razor Green'] },
    },
  },
  {
    brandSlug: 'nothing',
    slug: 'nothing-phone-2a-plus',
    name: 'Nothing Phone (2a) Plus',
    model: 'Phone (2a) Plus',
    price: 27999,
    originalPrice: 29999,
    rating: 4.6,
    reviewCount: 1870,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
    description: 'Iconic transparent aesthetic with metallic sheen, Glyph Interface lights, custom MediaTek Dimensity 7350 Pro 5G, and triple 50MP cameras.',
    shortDescription: 'Unique transparent design with Glyph lights, 50MP selfie, and clean Nothing OS.',
    highlights: ['MediaTek Dimensity 7350 Pro 5G custom processor', 'Signature Glyph Interface with customizable ringtone glyphs', 'Triple 50MP Camera system (Main, Ultrawide, and Front Selfie)', 'Nothing OS 3.0 clean aesthetic with zero bloatware'],
    availability: 'In Stock',
    releaseDate: 'August 2024',
    bestFor: 'Aesthetic Trendsetters, Minimalists, and Clean Software Fans',
    scores: { overall: 88, performance: 86, camera: 88, battery: 91, display: 90, value: 94 },
    pros: ['Standout translucent design with functional Glyph notification LED strips', 'Clean Nothing OS with bespoke monochrome dot-matrix typography and zero bloat', 'Sharp 50MP selfie camera supporting 4K video', 'Consistent symmetrical bezels around screen'],
    cons: ['IP54 rating handles splashes only', 'No wireless charging'],
    offers: [
      { storeName: 'Flipkart', price: 27999, originalPrice: 29999, deliveryTime: 'Tomorrow', badge: 'Exclusive Partner' },
      { storeName: 'Nothing Store', price: 27999, deliveryTime: '2 Days' },
    ],
    specs: {
      display: { size: '6.7 inch', sizeNumber: 6.7, type: 'Flexible AMOLED, 1.07 Billion Colors', resolution: '2412 x 1084 pixels (FHD+, 394 ppi)', refreshRate: 120, peakBrightness: 1300, protection: 'Corning Gorilla Glass 5', aspectRatio: '20:9', hdrSupport: 'HDR10+' },
      performance: { processor: 'MediaTek Dimensity 7350 Pro (4nm)', cpu: 'Octa-core (2x3.0 GHz Cortex-A715 & 6x2.0 GHz Cortex-A510)', gpu: 'Mali-G610 MC4', ram: 8, ramType: 'LPDDR4X', storage: 256, storageType: 'UFS 2.2', expandableStorage: false, antutuScore: 805000 },
      camera: { mainCamera: '50 MP Samsung GN9 (f/1.88, 1/1.56", OIS & EIS)', mainSensorMP: 50, ultrawide: '50 MP Samsung JN1 (f/2.2, 114˚)', telephoto: null, telephotoMP: null, frontCamera: '50 MP Samsung JN1 (f/2.2, 4K30)', frontCameraMP: 50, video: '4K@30fps, 1080p@60fps, Action Mode', ois: true, features: ['Ultra XDR co-developed with Google', 'Motion Capture', 'Glyph Torch Fill Light', 'Night Mode'] },
      battery: { capacity: 5000, chargingSpeed: 50, wirelessCharging: false, wirelessChargingSpeed: null, reverseCharging: false, batteryLifeHours: 14.5 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 6', bluetooth: 'Bluetooth 5.3', nfc: true, usb: 'USB Type-C 2.0', sim: 'Dual Nano-SIM' },
      software: { os: 'Android', osVersion: 'Android 15 (Nothing OS 3.0)', updateSupportYears: 4 },
      physical: { weight: 190, dimensions: '161.7 x 76.3 x 8.5 mm', ipRating: 'IP54', buildMaterials: 'Metallic finish transparent back, Recycled plastic mid-frame', colors: ['Metallic Grey', 'Metallic Black'] },
    },
  },
  {
    brandSlug: 'samsung',
    slug: 'samsung-galaxy-a55-5g',
    name: 'Samsung Galaxy A55 5G',
    model: 'Galaxy A55 5G',
    price: 36999,
    originalPrice: 42999,
    rating: 4.5,
    reviewCount: 2310,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'],
    description: 'Premium metal frame with Gorilla Glass Victus+, Knox Vault security, Exynos 1480 with AMD graphics, and IP67 water protection.',
    shortDescription: 'Reliable mid-range all-rounder with metal build, IP67 rating, and 5-year security updates.',
    highlights: ['Metal frame and Gorilla Glass Victus+ front & back', 'Samsung Knox Vault hardware-level security', '50MP OIS camera with 4K video on all lenses', 'IP67 water and dust resistance'],
    availability: 'In Stock',
    releaseDate: 'March 2024',
    bestFor: 'Everyday Users seeking Samsung brand reliability, durability, and security',
    scores: { overall: 87, performance: 84, camera: 86, battery: 89, display: 91, value: 86 },
    pros: ['Flagship-grade metal and glass build quality with IP67 rating', 'MicroSD expandable storage support up to 1TB', 'Dedicated Samsung Knox Vault hardware crypto processor', 'Consistent 4K recording across main and selfie cameras'],
    cons: ['25W charging is relatively slow', 'Screen bezels are slightly thick for the price'],
    offers: [
      { storeName: 'Amazon', price: 36999, originalPrice: 42999, deliveryTime: 'Tomorrow' },
      { storeName: 'Samsung Official', price: 36999, deliveryTime: '2 Days' },
    ],
    specs: {
      display: { size: '6.6 inch', sizeNumber: 6.6, type: 'Super AMOLED, 120Hz', resolution: '2340 x 1080 pixels (FHD+, 390 ppi)', refreshRate: 120, peakBrightness: 1000, protection: 'Corning Gorilla Glass Victus+', aspectRatio: '19.5:9', hdrSupport: 'HDR10+, Vision Booster' },
      performance: { processor: 'Samsung Exynos 1480 (4nm)', cpu: 'Octa-core (4x2.75 GHz Cortex-A78 & 4x2.0 GHz Cortex-A55)', gpu: 'Xclipse 530 (AMD RDNA 2 architecture)', ram: 8, ramType: 'LPDDR5', storage: 128, storageType: 'UFS 3.1', expandableStorage: true, antutuScore: 720000 },
      camera: { mainCamera: '50 MP (f/1.8, 1/1.56", OIS, VDIS)', mainSensorMP: 50, ultrawide: '12 MP (f/2.2, 123˚)', telephoto: '5 MP Macro lens (f/2.4)', telephotoMP: null, frontCamera: '32 MP (f/2.2, 4K30)', frontCameraMP: 32, video: '4K@30fps, 1080p@60fps with gyro-EIS', ois: true, features: ['Nightography', 'Auto Framing', 'Object Eraser', '12-bit Super HDR'] },
      battery: { capacity: 5000, chargingSpeed: 25, wirelessCharging: false, wirelessChargingSpeed: null, reverseCharging: false, batteryLifeHours: 14.0 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 6', bluetooth: 'Bluetooth 5.3', nfc: true, usb: 'USB Type-C 2.0', sim: 'Dual Hybrid SIM / microSD slot' },
      software: { os: 'Android', osVersion: 'Android 15 (One UI 7.0)', updateSupportYears: 5 },
      physical: { weight: 213, dimensions: '161.1 x 77.4 x 8.2 mm', ipRating: 'IP67 (1m up to 30 mins)', buildMaterials: 'Brushed metal frame, Glass Victus+ back', colors: ['Awesome Navy', 'Awesome Iceblue', 'Awesome Lilac', 'Awesome Lemon'] },
    },
  },
  {
    brandSlug: 'xiaomi',
    slug: 'redmi-note-13-pro-plus-5g',
    name: 'Redmi Note 13 Pro+ 5G',
    model: 'Redmi Note 13 Pro+ 5G',
    price: 29999,
    originalPrice: 33999,
    rating: 4.6,
    reviewCount: 3410,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'],
    description: '3D Curved 1.5K AMOLED display with 200MP OIS main camera, MediaTek Dimensity 7200-Ultra, IP68 water resistance, and 120W HyperCharge.',
    shortDescription: 'Feature-packed midranger with 200MP OIS camera, 120W charging, and IP68 rating.',
    highlights: ['200MP Samsung ISOCELL HP3 camera with OIS', '120W HyperCharge (0 to 100% in 19 mins)', '3D Curved 1.5K CrystalRes AMOLED (120Hz)', 'IP68 flagship water and dust resistance'],
    availability: 'In Stock',
    releaseDate: 'January 2024',
    bestFor: 'Budget-Conscious Buyers wanting flagship specs under ₹30,000',
    scores: { overall: 89, performance: 87, camera: 90, battery: 92, display: 93, value: 96 },
    pros: ['200MP main camera with exceptional detail in daylight and 4x lossless zoom', 'True IP68 water resistance at under ₹30,000 is rare', 'Blazing 120W charging full charge in under 20 minutes', 'Gorgeous curved 1.5K display with thin chin'],
    cons: ['Secondary 8MP ultrawide and 2MP macro cameras are average', 'Pre-installed bloatware apps'],
    offers: [
      { storeName: 'Amazon', price: 29999, originalPrice: 33999, deliveryTime: 'Tomorrow' },
      { storeName: 'Mi.com', price: 29999, deliveryTime: '2 Days' },
    ],
    specs: {
      display: { size: '6.67 inch', sizeNumber: 6.67, type: '3D Curved CrystalRes AMOLED, 120Hz', resolution: '2712 x 1220 pixels (1.5K, 446 ppi)', refreshRate: 120, peakBrightness: 1800, protection: 'Corning Gorilla Glass Victus', aspectRatio: '20:9', hdrSupport: 'Dolby Vision, HDR10+' },
      performance: { processor: 'MediaTek Dimensity 7200-Ultra (4nm)', cpu: 'Octa-core (2x2.8 GHz Cortex-A715 & 6x2.0 GHz Cortex-A510)', gpu: 'Mali-G610 MC4', ram: 8, ramType: 'LPDDR5', storage: 256, storageType: 'UFS 3.1', expandableStorage: false, antutuScore: 800000 },
      camera: { mainCamera: '200 MP Samsung HP3 (f/1.65, 1/1.4", 2x/4x in-sensor zoom, OIS)', mainSensorMP: 200, ultrawide: '8 MP (f/2.2, 120˚)', telephoto: '2 MP Macro (f/2.4)', telephotoMP: null, frontCamera: '16 MP (f/2.4, 1080p60)', frontCameraMP: 16, video: '4K@30fps, 1080p@60fps', ois: true, features: ['200MP Ultra-HD Mode', 'Film Camera Filters', 'AI Scene Detection'] },
      battery: { capacity: 5000, chargingSpeed: 120, wirelessCharging: false, wirelessChargingSpeed: null, reverseCharging: false, batteryLifeHours: 13.8 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 6', bluetooth: 'Bluetooth 5.3', nfc: true, usb: 'USB Type-C 2.0', sim: 'Dual Nano-SIM' },
      software: { os: 'Android', osVersion: 'Android 14 (Xiaomi HyperOS)', updateSupportYears: 4 },
      physical: { weight: 204, dimensions: '161.4 x 74.2 x 8.9 mm', ipRating: 'IP68', buildMaterials: 'Aluminum chassis, Curved AG Glass / Vegan Leather back', colors: ['Fusion Black', 'Fusion White', 'Fusion Purple'] },
    },
  },
  {
    brandSlug: 'motorola',
    slug: 'moto-g85-5g',
    name: 'Motorola Moto G85 5G',
    model: 'Moto G85 5G',
    price: 17999,
    originalPrice: 20999,
    rating: 4.5,
    reviewCount: 2890,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80'],
    description: 'The premier budget champion with a luxury 3D curved 120Hz pOLED display, 50MP Sony LYT-600 OIS camera, and clean Hello UI under ₹18,000.',
    shortDescription: 'Affordable luxury phone with 120Hz curved pOLED, 50MP Sony OIS camera, and vegan leather.',
    highlights: ['Segment-first 3D Curved 120Hz pOLED display', '50MP Sony LYT-600 with Optical Image Stabilization (OIS)', '32MP front selfie camera with Quad Pixel technology', 'Premium Vegan Leather back in vibrant Pantone shades'],
    availability: 'In Stock',
    releaseDate: 'July 2024',
    bestFor: 'Budget Buyers wanting flagship styling, curved display, and clean software under ₹20k',
    scores: { overall: 85, performance: 80, camera: 85, battery: 90, display: 92, value: 98 },
    pros: ['Gorgeous curved pOLED screen feels like a ₹40,000 phone in hand', 'Solid 50MP Sony LYT-600 OIS main camera in budget segment', 'Lightweight and slim (173g and 7.59mm)', 'Clean Motorola Hello UI without spam notifications'],
    cons: ['Processor is adequate for daily use but not for high-FPS 3D gaming', 'No 4K video recording'],
    offers: [
      { storeName: 'Flipkart', price: 17999, originalPrice: 20999, deliveryTime: 'Tomorrow', badge: 'Best Budget Pick' },
      { storeName: 'Motorola India', price: 17999, deliveryTime: '2 Days' },
    ],
    specs: {
      display: { size: '6.67 inch', sizeNumber: 6.67, type: '3D Curved pOLED, 10-bit, 120Hz', resolution: '2400 x 1080 pixels (FHD+, 395 ppi)', refreshRate: 120, peakBrightness: 1600, protection: 'Corning Gorilla Glass 5', aspectRatio: '20:9', hdrSupport: 'DCI-P3 100%' },
      performance: { processor: 'Qualcomm Snapdragon 6s Gen 3 (6nm)', cpu: 'Octa-core (2x2.3 GHz Kryo 660 Gold & 6x2.0 GHz Kryo 660 Silver)', gpu: 'Adreno 619', ram: 8, ramType: 'LPDDR4X', storage: 128, storageType: 'UFS 2.2', expandableStorage: true, antutuScore: 470000 },
      camera: { mainCamera: '50 MP Sony LYT-600 (f/1.79, Quad Pixel, OIS)', mainSensorMP: 50, ultrawide: '8 MP (f/2.2, 118˚ with Macro Vision)', telephoto: null, telephotoMP: null, frontCamera: '32 MP (f/2.4, Quad Pixel, 1080p30)', frontCameraMP: 32, video: '1080p@60fps with EIS', ois: true, features: ['Auto Night Vision', 'Shot Optimization', 'Spot Color'] },
      battery: { capacity: 5000, chargingSpeed: 33, wirelessCharging: false, wirelessChargingSpeed: null, reverseCharging: false, batteryLifeHours: 15.0 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 5 (802.11ac)', bluetooth: 'Bluetooth 5.1', nfc: true, usb: 'USB Type-C 2.0', sim: 'Dual SIM (Nano-SIM + eSIM) / microSD' },
      software: { os: 'Android', osVersion: 'Android 14 (Hello UI)', updateSupportYears: 3 },
      physical: { weight: 173, dimensions: '161.91 x 73.06 x 7.59 mm', ipRating: 'IP52 (Water repellant design)', buildMaterials: 'Polymer frame, Vegan Leather back', colors: ['Olive Green', 'Cobalt Blue', 'Urban Grey'] },
    },
  },
  {
    brandSlug: 'oppo',
    slug: 'oppo-find-x8-pro',
    name: 'Oppo Find X8 Pro',
    model: 'Find X8 Pro',
    price: 99999,
    originalPrice: 109999,
    rating: 4.8,
    reviewCount: 980,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'],
    description: 'Hasselblad quad 50MP camera master featuring dual periscope telephoto lenses, Quick Button camera grabber, 5910mAh Glacier battery, and MediaTek Dimensity 9400.',
    shortDescription: 'Flagship with dual periscope telephotos, Hasselblad color engine, and 5910mAh battery.',
    highlights: ['Dual Periscope Telephoto lenses (3x and 6x optical zoom)', 'MediaTek Dimensity 9400 (3nm Next-Gen)', 'Quick Button physical capacitive camera slider', '5910mAh Silicon-Carbon battery with 80W SuperVOOC'],
    availability: 'In Stock',
    releaseDate: 'November 2024',
    bestFor: 'Stage & Concert Photographers, Wildlife Zoom, and Travel Shooters',
    scores: { overall: 96, performance: 98, camera: 99, battery: 97, display: 96, value: 88 },
    pros: ['Dual periscope telephoto setup offers unmatched clarity across both 3x and 6x zoom levels', 'Massive 5910mAh battery while maintaining slim 8.24mm profile', 'Physical camera quick button allows rapid candid snapping', 'Dual IP68 and IP69 water proofing'],
    cons: ['Premium pricing over ₹90,000'],
    offers: [
      { storeName: 'Amazon', price: 99999, originalPrice: 109999, deliveryTime: 'Tomorrow' },
      { storeName: 'Oppo Store', price: 99999, deliveryTime: '2 Days' },
    ],
    specs: {
      display: { size: '6.78 inch', sizeNumber: 6.78, type: 'Infinite View LTPO AMOLED (1-120Hz)', resolution: '2780 x 1264 pixels (1.5K, 450 ppi)', refreshRate: 120, peakBrightness: 4500, protection: 'Corning Gorilla Glass Victus 2', aspectRatio: '19.8:9', hdrSupport: 'Dolby Vision, ProXDR, HDR10+' },
      performance: { processor: 'MediaTek Dimensity 9400 (3nm)', cpu: 'All-Big-Core (1x3.63 GHz Cortex-X925 & 3x3.3 GHz & 4x2.4 GHz)', gpu: 'Immortalis-G925', ram: 16, ramType: 'LPDDR5X', storage: 512, storageType: 'UFS 4.0', expandableStorage: false, antutuScore: 2850000 },
      camera: { mainCamera: '50 MP Sony LYT-808 (f/1.6, 23mm, 1/1.4", OIS)', mainSensorMP: 50, ultrawide: '50 MP Samsung JN5 (f/2.0, 120˚)', telephoto: '50 MP Sony LYT-600 3x periscope (f/2.6, OIS) + 50 MP Sony IMX858 6x periscope (f/4.3, OIS)', telephotoMP: 50, frontCamera: '32 MP Sony IMX615 (f/2.4, 4K60)', frontCameraMP: 32, video: '4K@60fps Dolby Vision HDR across all four cameras', ois: true, features: ['Dual Periscope Zoom', 'Hasselblad Master Mode', 'Lightning Snap (Auto Action)', 'Stage Mode'] },
      battery: { capacity: 5910, chargingSpeed: 80, wirelessCharging: true, wirelessChargingSpeed: 50, reverseCharging: true, batteryLifeHours: 16.8 },
      connectivity: { fiveG: true, wifi: 'Wi-Fi 7', bluetooth: 'Bluetooth 5.4', nfc: true, usb: 'USB Type-C 3.2 Gen 1', sim: 'Dual Nano-SIM' },
      software: { os: 'Android', osVersion: 'Android 15 (ColorOS 15)', updateSupportYears: 5 },
      physical: { weight: 215, dimensions: '162.27 x 76.67 x 8.24 mm', ipRating: 'IP68 & IP69', buildMaterials: 'Aerospace aluminum frame, Cosmos ring glass back', colors: ['Space Black', 'Pearl White'] },
    },
  },
];

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------
async function seed() {
  const client = await pool.connect();
  try {
    console.log('🌱 Seeding database...\n');

    await client.query('BEGIN');

    // Clear existing data (in correct FK order)
    await client.query('DELETE FROM smartphone_specs');
    await client.query('DELETE FROM smartphones');
    await client.query('DELETE FROM brands');
    console.log('  Cleared existing data.');

    // ---- Insert brands ----
    const brandMap = {}; // slug → id
    for (const b of brands) {
      const res = await client.query(
        `INSERT INTO brands (name, slug, country)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [b.name, b.slug, b.country]
      );
      brandMap[b.slug] = res.rows[0].id;
    }
    console.log(`  Inserted ${brands.length} brands.`);

    // ---- Insert smartphones + specs ----
    let phoneCount = 0;
    for (const phone of smartphones) {
      const brandId = brandMap[phone.brandSlug];

      const phoneRes = await client.query(
        `INSERT INTO smartphones (
          brand_id, slug, name, model, price, original_price,
          rating, review_count, image, gallery_images,
          description, short_description, highlights,
          availability, release_date, best_for,
          score_overall, score_performance, score_camera,
          score_battery, score_display, score_value,
          pros, cons, offers
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10,
          $11, $12, $13,
          $14, $15, $16,
          $17, $18, $19,
          $20, $21, $22,
          $23, $24, $25
        ) RETURNING id`,
        [
          brandId, phone.slug, phone.name, phone.model, phone.price, phone.originalPrice,
          phone.rating, phone.reviewCount, phone.image, phone.galleryImages,
          phone.description, phone.shortDescription, phone.highlights,
          phone.availability, phone.releaseDate, phone.bestFor,
          phone.scores.overall, phone.scores.performance, phone.scores.camera,
          phone.scores.battery, phone.scores.display, phone.scores.value,
          phone.pros, phone.cons, JSON.stringify(phone.offers),
        ]
      );

      const phoneId = phoneRes.rows[0].id;
      const s = phone.specs;

      await client.query(
        `INSERT INTO smartphone_specs (
          smartphone_id,
          display_size, display_size_number, display_type, display_resolution,
          refresh_rate, peak_brightness, display_protection, aspect_ratio, hdr_support,
          processor, cpu, gpu, ram, ram_type,
          storage, storage_type, expandable_storage, antutu_score,
          main_camera, main_sensor_mp, ultrawide, telephoto, telephoto_mp,
          front_camera, front_camera_mp, video, ois, camera_features,
          battery_capacity, charging_speed, wireless_charging, wireless_charging_speed,
          reverse_charging, battery_life_hours,
          five_g, wifi, bluetooth, nfc, usb, sim,
          os, os_version, update_support_years,
          weight, dimensions, ip_rating, build_materials, colors
        ) VALUES (
          $1,
          $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15,
          $16, $17, $18, $19,
          $20, $21, $22, $23, $24,
          $25, $26, $27, $28, $29,
          $30, $31, $32, $33,
          $34, $35,
          $36, $37, $38, $39, $40, $41,
          $42, $43, $44,
          $45, $46, $47, $48, $49
        )`,
        [
          phoneId,
          s.display.size, s.display.sizeNumber, s.display.type, s.display.resolution,
          s.display.refreshRate, s.display.peakBrightness, s.display.protection, s.display.aspectRatio, s.display.hdrSupport,
          s.performance.processor, s.performance.cpu, s.performance.gpu, s.performance.ram, s.performance.ramType,
          s.performance.storage, s.performance.storageType, s.performance.expandableStorage, s.performance.antutuScore,
          s.camera.mainCamera, s.camera.mainSensorMP, s.camera.ultrawide, s.camera.telephoto, s.camera.telephotoMP,
          s.camera.frontCamera, s.camera.frontCameraMP, s.camera.video, s.camera.ois, s.camera.features,
          s.battery.capacity, s.battery.chargingSpeed, s.battery.wirelessCharging, s.battery.wirelessChargingSpeed,
          s.battery.reverseCharging, s.battery.batteryLifeHours,
          s.connectivity.fiveG, s.connectivity.wifi, s.connectivity.bluetooth, s.connectivity.nfc, s.connectivity.usb, s.connectivity.sim,
          s.software.os, s.software.osVersion, s.software.updateSupportYears,
          s.physical.weight, s.physical.dimensions, s.physical.ipRating, s.physical.buildMaterials, s.physical.colors,
        ]
      );

      phoneCount++;
    }

    await client.query('COMMIT');
    console.log(`  Inserted ${phoneCount} smartphones with full specs.\n`);
    console.log('✅ Database seeded successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('\n❌ Seeding failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
