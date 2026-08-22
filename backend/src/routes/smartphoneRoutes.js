const express = require('express');
const router = express.Router();
const smartphoneController = require('../controllers/smartphoneController');
const { protect, admin } = require('../middleware/authMiddleware');

// Compare must come BEFORE :slug to avoid treating "compare" as a slug
router.get('/compare', smartphoneController.compareSmartphones);
router.get('/', smartphoneController.listSmartphones);
router.post('/', protect, admin, smartphoneController.createSmartphone);
router.get('/:slug', smartphoneController.getSmartphone);
router.put('/:slug', protect, admin, smartphoneController.updateSmartphone);
router.delete('/:slug', protect, admin, smartphoneController.deleteSmartphone);

module.exports = router;
