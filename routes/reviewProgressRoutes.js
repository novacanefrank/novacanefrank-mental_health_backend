const express = require('express');
const router = express.Router();
const reviewProgressController = require('../controller/reviewProgressController');

router.get('/', reviewProgressController.getAllReviews);
router.get('/:id', reviewProgressController.getReviewById);
router.post('/', reviewProgressController.createReview);
router.put('/:id', reviewProgressController.updateReview);
router.delete('/:id', reviewProgressController.deleteReview);

module.exports = router;
