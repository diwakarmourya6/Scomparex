/**
 * Smartphone model — query helpers for the smartphones table using Prisma.
 * Supports filtering, sorting, pagination, and full-spec joins.
 */
const { prisma } = require('../config/database');

/**
 * Build a filtered, sorted, paginated smartphone query.
 * @param {object} options - Filter/sort/pagination options
 * @returns {{ rows: object[], totalCount: number }}
 */
async function findAll(options = {}) {
  const {
    search,
    brands,       // array of brand names e.g. ['Apple', 'Samsung']
    minPrice,
    maxPrice,
    ram,          // array of RAM values e.g. [8, 12]
    storage,      // array of storage values e.g. [128, 256]
    refreshRates, // array e.g. [120, 144]
    batteryMin,
    cameraMinMP,
    fiveGOnly,
    minRating,
    sort = 'relevance',
    page = 1,
    limit = 20,
  } = options;

  const where = {};

  // Search across name, brand, model, processor
  if (search && search.trim()) {
    const searchParam = search.trim();
    where.OR = [
      { name: { contains: searchParam, mode: 'insensitive' } },
      { model: { contains: searchParam, mode: 'insensitive' } },
      { brand: { name: { contains: searchParam, mode: 'insensitive' } } },
      { specs: { processor: { contains: searchParam, mode: 'insensitive' } } },
    ];
  }

  // Brand filter
  if (brands && brands.length > 0) {
    where.brand = {
      ...where.brand,
      name: { in: brands, mode: 'insensitive' },
    };
  }

  // Price range
  if (minPrice != null || maxPrice != null) {
    where.price = {};
    if (minPrice != null) where.price.gte = minPrice;
    if (maxPrice != null) where.price.lte = maxPrice;
  }

  // Minimum rating
  if (minRating != null) {
    where.rating = { gte: minRating };
  }

  // Spec filters
  const specsWhere = {};
  let hasSpecsFilter = false;

  if (ram && ram.length > 0) {
    specsWhere.ram = { in: ram };
    hasSpecsFilter = true;
  }
  if (storage && storage.length > 0) {
    specsWhere.storage = { in: storage };
    hasSpecsFilter = true;
  }
  if (refreshRates && refreshRates.length > 0) {
    specsWhere.refreshRate = { in: refreshRates };
    hasSpecsFilter = true;
  }
  if (batteryMin != null) {
    specsWhere.batteryCapacity = { gte: batteryMin };
    hasSpecsFilter = true;
  }
  if (cameraMinMP != null) {
    specsWhere.mainSensorMp = { gte: cameraMinMP };
    hasSpecsFilter = true;
  }
  if (fiveGOnly) {
    specsWhere.fiveG = true;
    hasSpecsFilter = true;
  }

  if (hasSpecsFilter) {
    if (where.OR && where.OR.some(c => c.specs)) {
      // If we have an OR condition that uses specs (like search), we merge it carefully
      where.specs = {
        ...where.specs,
        ...specsWhere
      };
    } else {
      where.specs = specsWhere;
    }
  }

  // Sort
  let orderBy = [];
  switch (sort) {
    case 'price-asc':
      orderBy.push({ price: 'asc' });
      break;
    case 'price-desc':
      orderBy.push({ price: 'desc' });
      break;
    case 'rating-desc':
      orderBy.push({ rating: 'desc' });
      orderBy.push({ reviewCount: 'desc' });
      break;
    case 'newest':
      orderBy.push({ createdAt: 'desc' });
      break;
    case 'popular':
      orderBy.push({ reviewCount: 'desc' });
      break;
    case 'relevance':
    default:
      orderBy.push({ scoreOverall: { sort: 'desc', nulls: 'last' } });
      orderBy.push({ rating: 'desc' });
      break;
  }

  const offset = (page - 1) * limit;

  // Run count and data fetch in parallel
  const [totalCount, smartphones] = await prisma.$transaction([
    prisma.smartphone.count({ where }),
    prisma.smartphone.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      include: {
        brand: true,
        specs: true,
      },
    }),
  ]);

  // Map to the expected row format
  const rows = smartphones.map(s => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    model: s.model,
    price: s.price,
    original_price: s.originalPrice,
    rating: s.rating ? parseFloat(s.rating) : 0,
    review_count: s.reviewCount,
    image: s.image,
    short_description: s.shortDescription,
    availability: s.availability,
    release_date: s.releaseDate,
    best_for: s.bestFor,
    score_overall: s.scoreOverall,
    score_performance: s.scorePerformance,
    score_camera: s.scoreCamera,
    score_battery: s.scoreBattery,
    score_display: s.scoreDisplay,
    score_value: s.scoreValue,
    brand_name: s.brand.name,
    brand_slug: s.brand.slug,
    processor: s.specs?.processor,
    ram: s.specs?.ram,
    storage: s.specs?.storage,
    main_sensor_mp: s.specs?.mainSensorMp,
    battery_capacity: s.specs?.batteryCapacity,
    charging_speed: s.specs?.chargingSpeed,
    refresh_rate: s.specs?.refreshRate,
    display_size: s.specs?.displaySize,
  }));

  return {
    rows,
    totalCount,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
  };
}

/**
 * Find a single smartphone by its numeric DB id.
 */
async function findById(id) {
  const s = await prisma.smartphone.findUnique({
    where: { id: parseInt(id, 10) },
    include: { brand: true },
  });
  if (!s) return null;
  
  return {
    ...s,
    original_price: s.originalPrice,
    review_count: s.reviewCount,
    gallery_images: s.galleryImages,
    short_description: s.shortDescription,
    release_date: s.releaseDate,
    best_for: s.bestFor,
    score_overall: s.scoreOverall,
    score_performance: s.scorePerformance,
    score_camera: s.scoreCamera,
    score_battery: s.scoreBattery,
    score_display: s.scoreDisplay,
    score_value: s.scoreValue,
    brand_name: s.brand.name,
    brand_slug: s.brand.slug,
  };
}

/**
 * Find a single smartphone by its slug.
 */
async function findBySlug(slug) {
  const s = await prisma.smartphone.findUnique({
    where: { slug },
    include: { brand: true },
  });
  if (!s) return null;
  
  return {
    ...s,
    original_price: s.originalPrice,
    review_count: s.reviewCount,
    gallery_images: s.galleryImages,
    short_description: s.shortDescription,
    release_date: s.releaseDate,
    best_for: s.bestFor,
    score_overall: s.scoreOverall,
    score_performance: s.scorePerformance,
    score_camera: s.scoreCamera,
    score_battery: s.scoreBattery,
    score_display: s.scoreDisplay,
    score_value: s.scoreValue,
    brand_name: s.brand.name,
    brand_slug: s.brand.slug,
  };
}

/**
 * Find multiple smartphones by an array of slugs (for comparison).
 */
async function findBySlugs(slugs) {
  if (!slugs || slugs.length === 0) return [];

  const smartphones = await prisma.smartphone.findMany({
    where: { slug: { in: slugs } },
    include: { brand: true },
  });

  return smartphones.map(s => ({
    ...s,
    original_price: s.originalPrice,
    review_count: s.reviewCount,
    gallery_images: s.galleryImages,
    short_description: s.shortDescription,
    release_date: s.releaseDate,
    best_for: s.bestFor,
    score_overall: s.scoreOverall,
    score_performance: s.scorePerformance,
    score_camera: s.scoreCamera,
    score_battery: s.scoreBattery,
    score_display: s.scoreDisplay,
    score_value: s.scoreValue,
    brand_name: s.brand.name,
    brand_slug: s.brand.slug,
  }));
}

module.exports = { findAll, findById, findBySlug, findBySlugs };
