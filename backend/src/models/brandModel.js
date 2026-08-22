/**
 * Brand model — query helpers for the brands table.
 */
const { pool } = require('../config/database');

async function findAll() {
  const result = await pool.query(`
    SELECT b.id, b.name, b.slug, b.logo_url, b.country,
           COUNT(s.id)::int AS phone_count
    FROM brands b
    LEFT JOIN smartphones s ON s.brand_id = b.id
    GROUP BY b.id, b.name, b.slug, b.logo_url, b.country
    ORDER BY b.name
  `);
  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    'SELECT id, name, slug, logo_url, country, created_at FROM brands WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

async function findBySlug(slug) {
  const result = await pool.query(
    'SELECT id, name, slug, logo_url, country, created_at FROM brands WHERE slug = $1',
    [slug]
  );
  return result.rows[0] || null;
}

async function findByName(name) {
  const result = await pool.query(
    'SELECT id, name, slug, logo_url, country, created_at FROM brands WHERE LOWER(name) = LOWER($1)',
    [name]
  );
  return result.rows[0] || null;
}

module.exports = { findAll, findById, findBySlug, findByName };
