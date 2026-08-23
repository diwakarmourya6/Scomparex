/**
 * Smartphone service — business logic and data transformation.
 * Transforms flat DB rows into the nested shape the frontend expects.
 */
const smartphoneModel = require('../models/smartphoneModel');
const smartphoneSpecModel = require('../models/smartphoneSpecModel');

/**
 * Transform a flat DB smartphone row into the frontend Smartphone shape.
 */
function transformSmartphoneRow(row) {
  return {
    id: row.slug,
    name: row.name,
    brand: row.brand_name,
    model: row.model,
    price: row.price,
    originalPrice: row.original_price,
    rating: parseFloat(row.rating),
    reviewCount: row.review_count,
    image: row.image,
    galleryImages: row.gallery_images || [],
    description: row.description,
    shortDescription: row.short_description,
    highlights: row.highlights || [],
    availability: row.availability,
    releaseDate: row.release_date,
    bestFor: row.best_for,
    scores: {
      overall: row.score_overall,
      performance: row.score_performance,
      camera: row.score_camera,
      battery: row.score_battery,
      display: row.score_display,
      value: row.score_value,
    },
    performance: {
      processor: row.processor,
      ram: row.ram,
      storage: row.storage
    },
    camera: {
      mainSensorMP: row.main_sensor_mp
    },
    battery: {
      capacity: row.battery_capacity,
      chargingSpeed: row.charging_speed
    },
    display: {
      refreshRate: row.refresh_rate,
      size: row.display_size
    },
    pros: row.pros || [],
    cons: row.cons || [],
    offers: typeof row.offers === 'string' ? JSON.parse(row.offers) : (row.offers || []),
  };
}

/**
 * Transform a flat DB smartphone row into the frontend Smartphone shape for list view.
 * Omits heavy fields like description, pros, cons, etc.
 */
function transformSmartphoneListRow(row) {
  return {
    id: row.slug,
    name: row.name,
    brand: row.brand_name,
    model: row.model,
    price: row.price,
    originalPrice: row.original_price,
    rating: parseFloat(row.rating),
    reviewCount: row.review_count,
    image: row.image,
    shortDescription: row.short_description,
    availability: row.availability,
    releaseDate: row.release_date,
    bestFor: row.best_for,
    scores: {
      overall: row.score_overall,
      performance: row.score_performance,
      camera: row.score_camera,
      battery: row.score_battery,
      display: row.score_display,
      value: row.score_value,
    },
    performance: {
      processor: row.processor,
      ram: row.ram,
      storage: row.storage
    },
    camera: {
      mainSensorMP: row.main_sensor_mp
    },
    battery: {
      capacity: row.battery_capacity,
      chargingSpeed: row.charging_speed
    },
    display: {
      refreshRate: row.refresh_rate,
      size: row.display_size
    }
  };
}

/**
 * Transform a flat DB spec row into the frontend's nested spec shape.
 */
function transformSpecRow(spec) {
  if (!spec) return null;

  return {
    display: {
      size: spec.display_size,
      sizeNumber: spec.display_size_number ? parseFloat(spec.display_size_number) : null,
      type: spec.display_type,
      resolution: spec.display_resolution,
      refreshRate: spec.refresh_rate,
      peakBrightness: spec.peak_brightness,
      protection: spec.display_protection,
      aspectRatio: spec.aspect_ratio,
      hdrSupport: spec.hdr_support,
    },
    performance: {
      processor: spec.processor,
      cpu: spec.cpu,
      gpu: spec.gpu,
      ram: spec.ram,
      ramType: spec.ram_type,
      storage: spec.storage,
      storageType: spec.storage_type,
      expandableStorage: spec.expandable_storage,
      antutuScore: spec.antutu_score,
    },
    camera: {
      mainCamera: spec.main_camera,
      mainSensorMP: spec.main_sensor_mp,
      ultrawide: spec.ultrawide,
      telephoto: spec.telephoto || null,
      telephotoMP: spec.telephoto_mp || null,
      frontCamera: spec.front_camera,
      frontCameraMP: spec.front_camera_mp,
      video: spec.video,
      ois: spec.ois,
      features: spec.camera_features || [],
    },
    battery: {
      capacity: spec.battery_capacity,
      chargingSpeed: spec.charging_speed,
      wirelessCharging: spec.wireless_charging,
      wirelessChargingSpeed: spec.wireless_charging_speed || null,
      reverseCharging: spec.reverse_charging,
      batteryLifeHours: spec.battery_life_hours ? parseFloat(spec.battery_life_hours) : null,
    },
    connectivity: {
      fiveG: spec.five_g,
      wifi: spec.wifi,
      bluetooth: spec.bluetooth,
      nfc: spec.nfc,
      usb: spec.usb,
      sim: spec.sim,
    },
    software: {
      os: spec.os,
      osVersion: spec.os_version,
      updateSupportYears: spec.update_support_years,
    },
    physical: {
      weight: spec.weight,
      dimensions: spec.dimensions,
      ipRating: spec.ip_rating,
      buildMaterials: spec.build_materials,
      colors: spec.colors || [],
    },
  };
}

/**
 * Get paginated, filtered smartphone list (card-level data, no specs).
 */
async function getSmartphones(options) {
  const result = await smartphoneModel.findAll(options);

  return {
    smartphones: result.rows.map(transformSmartphoneListRow),
    pagination: {
      page: result.page,
      limit: result.limit,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
    },
  };
}

/**
 * Get a single smartphone with full specs by slug.
 */
async function getSmartphoneBySlug(slug) {
  const row = await smartphoneModel.findBySlug(slug);
  if (!row) return null;

  const specRow = await smartphoneSpecModel.findBySmartphoneId(row.id);

  const phone = transformSmartphoneRow(row);
  const specs = transformSpecRow(specRow);

  // Merge specs into the phone object (matching frontend Smartphone type)
  return {
    ...phone,
    ...(specs || {}),
  };
}

/**
 * Get multiple smartphones with full specs for comparison.
 */
async function getSmartphonesForComparison(slugs) {
  const rows = await smartphoneModel.findBySlugs(slugs);
  if (rows.length === 0) return [];

  const dbIds = rows.map(r => r.id);
  const specRows = await smartphoneSpecModel.findBySmartphoneIds(dbIds);

  // Map spec rows by smartphone_id for fast lookup
  const specMap = {};
  specRows.forEach(spec => {
    specMap[spec.smartphone_id] = spec;
  });

  return rows.map(row => {
    const phone = transformSmartphoneRow(row);
    const specs = transformSpecRow(specMap[row.id]);
    return { ...phone, ...(specs || {}) };
  });
}

module.exports = {
  getSmartphones,
  getSmartphoneBySlug,
  getSmartphonesForComparison,
  transformSmartphoneRow,
  transformSpecRow,
};
