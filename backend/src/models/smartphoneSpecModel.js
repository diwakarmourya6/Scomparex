/**
 * SmartphoneSpec model — query helpers for the smartphone_specs table.
 */
const { pool } = require('../config/database');

async function findBySmartphoneId(smartphoneId) {
  const result = await pool.query(
    'SELECT * FROM smartphone_specs WHERE smartphone_id = $1',
    [smartphoneId]
  );
  return result.rows[0] || null;
}

async function findBySmartphoneIds(smartphoneIds) {
  if (!smartphoneIds || smartphoneIds.length === 0) return [];

  const placeholders = smartphoneIds.map((_, i) => `$${i + 1}`).join(', ');
  const result = await pool.query(
    `SELECT * FROM smartphone_specs WHERE smartphone_id IN (${placeholders})`,
    smartphoneIds
  );
  return result.rows;
}

module.exports = { findBySmartphoneId, findBySmartphoneIds };
