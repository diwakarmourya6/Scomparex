/**
 * Brand controller — handles HTTP requests for brand endpoints.
 */
const brandModel = require('../models/brandModel');

/**
 * GET /api/brands
 * List all brands with their smartphone counts.
 */
async function listBrands(req, res, next) {
  try {
    const brands = await brandModel.findAll();

    const transformed = brands.map(b => ({
      id: b.name,         // Frontend uses brand name as id
      name: b.name,
      slug: b.slug,
      country: b.country,
      count: b.phone_count,
    }));

    res.json({
      success: true,
      data: transformed,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/brands/:slug
 * Get a single brand by slug.
 */
async function getBrand(req, res, next) {
  try {
    const { slug } = req.params;
    const brand = await brandModel.findBySlug(slug);

    if (!brand) {
      return res.status(404).json({
        success: false,
        error: { message: `Brand not found: ${slug}`, status: 404 },
      });
    }

    res.json({
      success: true,
      data: {
        id: brand.name,
        name: brand.name,
        slug: brand.slug,
        country: brand.country,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listBrands,
  getBrand,
  
  createBrand: async (req, res, next) => {
    try {
      const { name, slug, country } = req.body;
      const { pool } = require('../config/database');
      
      const result = await pool.query(
        'INSERT INTO brands (name, slug, country) VALUES ($1, $2, $3) RETURNING id, name, slug, country',
        [name, slug, country]
      );
      
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      next(error);
    }
  },
  
  updateBrand: async (req, res, next) => {
    try {
      const { name, country } = req.body;
      const { slug } = req.params;
      const { pool } = require('../config/database');
      
      const result = await pool.query(
        'UPDATE brands SET name = COALESCE($1, name), country = COALESCE($2, country) WHERE slug = $3 RETURNING id, name, slug, country',
        [name, country, slug]
      );
      
      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, error: 'Brand not found' });
      }
      
      res.json({ success: true, data: result.rows[0] });
    } catch (error) {
      next(error);
    }
  },
  
  deleteBrand: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { pool } = require('../config/database');
      
      const result = await pool.query('DELETE FROM brands WHERE slug = $1 RETURNING id', [slug]);
      
      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, error: 'Brand not found' });
      }
      
      res.json({ success: true, message: `Brand ${slug} deleted successfully` });
    } catch (error) {
      next(error);
    }
  }
};
