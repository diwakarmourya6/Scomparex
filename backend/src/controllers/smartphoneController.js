/**
 * Smartphone controller — handles HTTP requests for smartphone endpoints.
 */
const smartphoneService = require('../services/smartphoneService');

/**
 * GET /api/smartphones
 * List smartphones with optional filtering, sorting, and pagination.
 *
 * Query params:
 *   search       - text search across name, brand, processor
 *   brands       - comma-separated brand names (e.g. "Apple,Samsung")
 *   minPrice     - minimum price filter
 *   maxPrice     - maximum price filter
 *   ram          - comma-separated RAM values (e.g. "8,12")
 *   storage      - comma-separated storage values (e.g. "128,256")
 *   refreshRates - comma-separated refresh rates (e.g. "120,144")
 *   batteryMin   - minimum battery capacity in mAh
 *   cameraMinMP  - minimum main camera megapixels
 *   fiveGOnly    - "true" to filter 5G phones only
 *   minRating    - minimum rating (e.g. "4.5")
 *   sort         - relevance | price-asc | price-desc | rating-desc | newest | popular
 *   page         - page number (default 1)
 *   limit        - items per page (default 20, max 50)
 */
async function listSmartphones(req, res, next) {
  try {
    const {
      search,
      brands,
      minPrice,
      maxPrice,
      ram,
      storage,
      refreshRates,
      batteryMin,
      cameraMinMP,
      fiveGOnly,
      minRating,
      sort,
      page,
      limit,
    } = req.query;

    const options = {
      search: search || undefined,
      brands: brands ? brands.split(',').map(b => b.trim()) : undefined,
      minPrice: minPrice ? parseInt(minPrice, 10) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
      ram: ram ? ram.split(',').map(Number) : undefined,
      storage: storage ? storage.split(',').map(Number) : undefined,
      refreshRates: refreshRates ? refreshRates.split(',').map(Number) : undefined,
      batteryMin: batteryMin ? parseInt(batteryMin, 10) : undefined,
      cameraMinMP: cameraMinMP ? parseInt(cameraMinMP, 10) : undefined,
      fiveGOnly: fiveGOnly === 'true',
      minRating: minRating ? parseFloat(minRating) : undefined,
      sort: sort || 'relevance',
      page: Math.max(1, parseInt(page, 10) || 1),
      limit: Math.min(1000, Math.max(1, parseInt(limit, 10) || 100)),
    };

    const result = await smartphoneService.getSmartphones(options);

    res.json({
      success: true,
      data: result.smartphones,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/smartphones/compare?slugs=slug1,slug2,slug3
 * Get full details of multiple smartphones for side-by-side comparison.
 * Accepts 2-4 slugs.
 */
async function compareSmartphones(req, res, next) {
  try {
    const { slugs } = req.query;

    if (!slugs) {
      return res.status(400).json({
        success: false,
        error: { message: 'Missing required query parameter: slugs (comma-separated smartphone slugs)', status: 400 },
      });
    }

    const slugArray = slugs.split(',').map(s => s.trim()).filter(Boolean);

    if (slugArray.length < 2) {
      return res.status(400).json({
        success: false,
        error: { message: 'At least 2 smartphone slugs are required for comparison', status: 400 },
      });
    }

    if (slugArray.length > 4) {
      return res.status(400).json({
        success: false,
        error: { message: 'Maximum 4 smartphones can be compared at once', status: 400 },
      });
    }

    const smartphones = await smartphoneService.getSmartphonesForComparison(slugArray);

    if (smartphones.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'No smartphones found for the provided slugs', status: 404 },
      });
    }

    res.json({
      success: true,
      data: smartphones,
      meta: {
        requested: slugArray.length,
        found: smartphones.length,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/smartphones/:slug
 * Get a single smartphone with full specs.
 */
async function getSmartphone(req, res, next) {
  try {
    const { slug } = req.params;

    const smartphone = await smartphoneService.getSmartphoneBySlug(slug);

    if (!smartphone) {
      return res.status(404).json({
        success: false,
        error: { message: `Smartphone not found: ${slug}`, status: 404 },
      });
    }

    res.json({
      success: true,
      data: smartphone,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listSmartphones,
  getSmartphone,
  compareSmartphones,
  
  createSmartphone: async (req, res, next) => {
    try {
      // TODO: Implement full insert logic for all nested JSON specs
      res.status(501).json({ success: false, error: 'Not implemented yet' });
    } catch (error) {
      next(error);
    }
  },
  
  updateSmartphone: async (req, res, next) => {
    try {
      // TODO: Implement full update logic
      res.status(501).json({ success: false, error: 'Not implemented yet' });
    } catch (error) {
      next(error);
    }
  },
  
  deleteSmartphone: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { pool } = require('../config/database');
      
      const result = await pool.query('DELETE FROM smartphones WHERE slug = $1 RETURNING id', [slug]);
      
      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, error: 'Smartphone not found' });
      }
      
      res.json({ success: true, message: `Smartphone ${slug} deleted successfully` });
    } catch (error) {
      next(error);
    }
  }
};
