/**
 * SmartphoneSpec model — query helpers for the smartphone_specs table using Prisma.
 */
const { prisma } = require('../config/database');

// Internal helper to map Prisma fields back to the expected snake_case format
const mapSpec = (s) => ({
  ...s,
  smartphone_id: s.smartphoneId,
  display_size: s.displaySize,
  display_size_number: s.displaySizeNumber,
  display_type: s.displayType,
  display_resolution: s.displayResolution,
  refresh_rate: s.refreshRate,
  peak_brightness: s.peakBrightness,
  display_protection: s.displayProtection,
  aspect_ratio: s.aspectRatio,
  hdr_support: s.hdrSupport,
  ram_type: s.ramType,
  storage_type: s.storageType,
  expandable_storage: s.expandableStorage,
  antutu_score: s.antutuScore,
  main_camera: s.mainCamera,
  main_sensor_mp: s.mainSensorMp,
  telephoto_mp: s.telephotoMp,
  front_camera: s.frontCamera,
  front_camera_mp: s.frontCameraMp,
  camera_features: s.cameraFeatures,
  battery_capacity: s.batteryCapacity,
  charging_speed: s.chargingSpeed,
  wireless_charging: s.wirelessCharging,
  wireless_charging_speed: s.wirelessChargingSpeed,
  reverse_charging: s.reverseCharging,
  battery_life_hours: s.batteryLifeHours,
  five_g: s.fiveG,
  os_version: s.osVersion,
  update_support_years: s.updateSupportYears,
  ip_rating: s.ipRating,
  build_materials: s.buildMaterials,
  created_at: s.createdAt,
  updated_at: s.updatedAt,
});

async function findBySmartphoneId(smartphoneId) {
  const s = await prisma.smartphoneSpec.findUnique({
    where: { smartphoneId: parseInt(smartphoneId, 10) },
  });
  return s ? mapSpec(s) : null;
}

async function findBySmartphoneIds(smartphoneIds) {
  if (!smartphoneIds || smartphoneIds.length === 0) return [];

  const specs = await prisma.smartphoneSpec.findMany({
    where: { smartphoneId: { in: smartphoneIds.map(id => parseInt(id, 10)) } },
  });
  return specs.map(mapSpec);
}

module.exports = { findBySmartphoneId, findBySmartphoneIds };
