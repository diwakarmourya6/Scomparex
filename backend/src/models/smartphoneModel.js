/**
 * Smartphone model — query helpers for the smartphones table.
 * Supports filtering, sorting, pagination, and full-spec joins.
 */
const { pool } = require('../config/database');

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

  const conditions = [];
  const params = [];
  let paramIndex = 1;

  // Search across name, brand, model, processor
  if (search && search.trim()) {
    const searchParam = `%${search.trim().toLowerCase()}%`;
    conditions.push(`(
      LOWER(s.name) LIKE $${paramIndex}
      OR LOWER(b.name) LIKE $${paramIndex}
      OR LOWER(s.model) LIKE $${paramIndex}
      OR LOWER(sp.processor) LIKE $${paramIndex}
    )`);
    params.push(searchParam);
    paramIndex++;
  }

  // Brand filter
  if (brands && brands.length > 0) {
    const brandPlaceholders = brands.map((_, i) => `$${paramIndex + i}`);
    conditions.push(`LOWER(b.name) IN (${brandPlaceholders.join(', ')})`);
    brands.forEach(brand => params.push(brand.toLowerCase()));
    paramIndex += brands.length;
  }

  // Price range
  if (minPrice != null) {
    conditions.push(`s.price >= $${paramIndex}`);
    params.push(minPrice);
    paramIndex++;
  }
  if (maxPrice != null) {
    conditions.push(`s.price <= $${paramIndex}`);
    params.push(maxPrice);
    paramIndex++;
  }

  // RAM filter
  if (ram && ram.length > 0) {
    const ramPlaceholders = ram.map((_, i) => `$${paramIndex + i}`);
    conditions.push(`sp.ram IN (${ramPlaceholders.join(', ')})`);
    ram.forEach(r => params.push(r));
    paramIndex += ram.length;
  }

  // Storage filter
  if (storage && storage.length > 0) {
    const storagePlaceholders = storage.map((_, i) => `$${paramIndex + i}`);
    conditions.push(`sp.storage IN (${storagePlaceholders.join(', ')})`);
    storage.forEach(st => params.push(st));
    paramIndex += storage.length;
  }

  // Refresh rate filter
  if (refreshRates && refreshRates.length > 0) {
    const rrPlaceholders = refreshRates.map((_, i) => `$${paramIndex + i}`);
    conditions.push(`sp.refresh_rate IN (${rrPlaceholders.join(', ')})`);
    refreshRates.forEach(rr => params.push(rr));
    paramIndex += refreshRates.length;
  }

  // Battery minimum
  if (batteryMin != null) {
    conditions.push(`sp.battery_capacity >= $${paramIndex}`);
    params.push(batteryMin);
    paramIndex++;
  }

  // Camera minimum MP
  if (cameraMinMP != null) {
    conditions.push(`sp.main_sensor_mp >= $${paramIndex}`);
    params.push(cameraMinMP);
    paramIndex++;
  }

  // 5G only
  if (fiveGOnly) {
    conditions.push('sp.five_g = true');
  }

  // Minimum rating
  if (minRating != null) {
    conditions.push(`s.rating >= $${paramIndex}`);
    params.push(minRating);
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Sort
  let orderClause;
  switch (sort) {
    case 'price-asc':
      orderClause = 'ORDER BY s.price ASC';
      break;
    case 'price-desc':
      orderClause = 'ORDER BY s.price DESC';
      break;
    case 'rating-desc':
      orderClause = 'ORDER BY s.rating DESC, s.review_count DESC';
      break;
    case 'newest':
      orderClause = 'ORDER BY s.created_at DESC';
      break;
    case 'popular':
      orderClause = 'ORDER BY s.review_count DESC';
      break;
    case 'relevance':
    default:
      orderClause = 'ORDER BY s.score_overall DESC NULLS LAST, s.rating DESC';
      break;
  }

  // Count query
  const countQuery = `
    SELECT COUNT(*)::int AS total
    FROM smartphones s
    JOIN brands b ON s.brand_id = b.id
    LEFT JOIN smartphone_specs sp ON sp.smartphone_id = s.id
    ${whereClause}
  `;

  // Data query
  const offset = (page - 1) * limit;
  const dataQuery = `
    SELECT
      s.id, s.slug, s.name, s.model, s.price, s.original_price,
      s.rating, s.review_count, s.image,
      s.short_description, s.availability, s.release_date, s.best_for,
      s.score_overall, s.score_performance, s.score_camera,
      s.score_battery, s.score_display, s.score_value,
      b.name AS brand_name, b.slug AS brand_slug,
      sp.processor, sp.ram, sp.storage, sp.main_sensor_mp, 
      sp.battery_capacity, sp.charging_speed, sp.refresh_rate, sp.display_size
    FROM smartphones s
    JOIN brands b ON s.brand_id = b.id
    LEFT JOIN smartphone_specs sp ON sp.smartphone_id = s.id
    ${whereClause}
    ${orderClause}
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `;

  const countResult = await pool.query(countQuery, params);
  const totalCount = countResult.rows[0].total;

  const dataResult = await pool.query(dataQuery, [...params, limit, offset]);

  return {
    rows: dataResult.rows,
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
  const result = await pool.query(`
    SELECT s.*, b.name AS brand_name, b.slug AS brand_slug
    FROM smartphones s
    JOIN brands b ON s.brand_id = b.id
    WHERE s.id = $1
  `, [id]);
  return result.rows[0] || null;
}

/**
 * Find a single smartphone by its slug.
 */
async function findBySlug(slug) {
  const result = await pool.query(`
    SELECT s.*, b.name AS brand_name, b.slug AS brand_slug
    FROM smartphones s
    JOIN brands b ON s.brand_id = b.id
    WHERE s.slug = $1
  `, [slug]);
  return result.rows[0] || null;
}

/**
 * Find multiple smartphones by an array of slugs (for comparison).
 */
async function findBySlugs(slugs) {
  if (!slugs || slugs.length === 0) return [];

  const placeholders = slugs.map((_, i) => `$${i + 1}`).join(', ');
  const result = await pool.query(`
    SELECT s.*, b.name AS brand_name, b.slug AS brand_slug
    FROM smartphones s
    JOIN brands b ON s.brand_id = b.id
    WHERE s.slug IN (${placeholders})
  `, slugs);
  return result.rows;
}

module.exports = { findAll, findById, findBySlug, findBySlugs };
