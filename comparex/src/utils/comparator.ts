import { Smartphone, ComparisonWinnerSummary } from '../types/smartphone';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export type BestSpecKey = 
  | 'price'
  | 'rating'
  | 'ram'
  | 'storage'
  | 'battery'
  | 'charging'
  | 'refreshRate'
  | 'peakBrightness'
  | 'weight'
  | 'mainCamera'
  | 'updateYears'
  | 'antutuScore';

export function getBestValues(phones: Smartphone[]): Record<BestSpecKey, string | number | null> {
  if (phones.length === 0) {
    return {
      price: null,
      rating: null,
      ram: null,
      storage: null,
      battery: null,
      charging: null,
      refreshRate: null,
      peakBrightness: null,
      weight: null,
      mainCamera: null,
      updateYears: null,
      antutuScore: null
    };
  }

  const prices = phones.map(p => p.price);
  const minPrice = Math.min(...prices);

  const ratings = phones.map(p => p.rating);
  const maxRating = Math.max(...ratings);

  const rams = phones.map(p => p.performance.ram);
  const maxRam = Math.max(...rams);

  const storages = phones.map(p => p.performance.storage);
  const maxStorage = Math.max(...storages);

  const batteries = phones.map(p => p.battery.capacity);
  const maxBattery = Math.max(...batteries);

  const chargings = phones.map(p => p.battery.chargingSpeed);
  const maxCharging = Math.max(...chargings);

  const refreshRates = phones.map(p => p.display.refreshRate);
  const maxRefreshRate = Math.max(...refreshRates);

  const brightnesses = phones.map(p => p.display.peakBrightness);
  const maxBrightness = Math.max(...brightnesses);

  const weights = phones.map(p => p.physical.weight);
  const minWeight = Math.min(...weights);

  const cameras = phones.map(p => p.camera.mainSensorMP);
  const maxCamera = Math.max(...cameras);

  const updates = phones.map(p => p.software.updateSupportYears);
  const maxUpdates = Math.max(...updates);

  const antutu = phones.map(p => p.performance.antutuScore);
  const maxAntutu = Math.max(...antutu);

  return {
    price: minPrice,
    rating: maxRating,
    ram: maxRam,
    storage: maxStorage,
    battery: maxBattery,
    charging: maxCharging,
    refreshRate: maxRefreshRate,
    peakBrightness: maxBrightness,
    weight: minWeight,
    mainCamera: maxCamera,
    updateYears: maxUpdates,
    antutuScore: maxAntutu
  };
}

export function generateComparisonSummary(phones: Smartphone[]): ComparisonWinnerSummary | null {
  if (phones.length < 2) return null;

  // 1. Overall Winner: weighted sum of scores
  const sortedByOverall = [...phones].sort((a, b) => b.scores.overall - a.scores.overall);
  const overallWinner = sortedByOverall[0];

  // 2. Best Performance
  const sortedByPerf = [...phones].sort((a, b) => {
    if (b.scores.performance !== a.scores.performance) {
      return b.scores.performance - a.scores.performance;
    }
    return b.performance.antutuScore - a.performance.antutuScore;
  });
  const bestPerformance = sortedByPerf[0];

  // 3. Best Camera
  const sortedByCamera = [...phones].sort((a, b) => {
    if (b.scores.camera !== a.scores.camera) {
      return b.scores.camera - a.scores.camera;
    }
    return b.camera.mainSensorMP - a.camera.mainSensorMP;
  });
  const bestCamera = sortedByCamera[0];

  // 4. Best Battery
  const sortedByBattery = [...phones].sort((a, b) => {
    const batteryScoreA = a.battery.capacity * 0.6 + a.battery.chargingSpeed * 0.4;
    const batteryScoreB = b.battery.capacity * 0.6 + b.battery.chargingSpeed * 0.4;
    return batteryScoreB - batteryScoreA;
  });
  const bestBattery = sortedByBattery[0];

  // 5. Best Value for money
  const sortedByValue = [...phones].sort((a, b) => {
    const valA = (a.scores.overall / a.price) * 100000;
    const valB = (b.scores.overall / b.price) * 100000;
    return valB - valA;
  });
  const bestValue = sortedByValue[0];

  // Dynamic explanations
  const overallProcessor = overallWinner.performance?.processor || 'top-tier';
  const overallReason = `${overallWinner.name} takes the crown with the highest overall score of ${overallWinner.scores?.overall || 0}/100, combining top-tier ${overallProcessor.split(' ')[0]} processing, a class-leading ${overallWinner.display?.refreshRate || 60}Hz display, and refined software ecosystem.`;

  const perfProcessor = bestPerformance.performance?.processor || 'powerful';
  const perfAntutu = bestPerformance.performance?.antutuScore ? (bestPerformance.performance.antutuScore / 1000000).toFixed(2) + 'M' : 'untested';
  const bestPerformanceReason = `${bestPerformance.name} leads with ${perfProcessor}, ${bestPerformance.performance?.ram || 8}GB ${bestPerformance.performance?.ramType || ''} RAM, and an impressive AnTuTu benchmark score of ~${perfAntutu}.`;

  const cameraStr = bestCamera.camera?.mainCamera || `${bestCamera.camera?.mainSensorMP || 50}MP`;
  const bestCameraReason = `${bestCamera.name} offers the most versatile optical imaging setup with a ${cameraStr.split('(')[0].trim()} sensor${bestCamera.camera?.telephoto ? ' and dedicated periscope optical zoom' : ''}.`;

  const bestBatteryReason = `${bestBattery.name} packs a huge ${bestBattery.battery?.capacity || 5000} mAh battery paired with ${bestBattery.battery?.chargingSpeed || 30}W fast charging, delivering around ${bestBattery.battery?.batteryLifeHours || 12} hours of active screen time.`;

  const bestValueReason = `At ${formatPrice(bestValue.price)}, the ${bestValue.name} delivers the most balanced feature set per rupee spent with ${bestValue.performance?.ram || 8}GB RAM and ${bestValue.battery?.capacity || 5000} mAh battery.`;


  return {
    overallWinner,
    overallReason,
    bestPerformance,
    bestPerformanceReason,
    bestCamera,
    bestCameraReason,
    bestBattery,
    bestBatteryReason,
    bestValue,
    bestValueReason
  };
}
