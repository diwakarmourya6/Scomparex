const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', brandController.listBrands);
router.post('/', protect, admin, brandController.createBrand);
router.get('/:slug', brandController.getBrand);
router.put('/:slug', protect, admin, brandController.updateBrand);
router.delete('/:slug', protect, admin, brandController.deleteBrand);

module.exports = router;
