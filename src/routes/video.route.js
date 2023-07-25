const express = require('express');
const videoController = require('../controllers/video.controller');
const videoProductController = require('../controllers/video-product.controller');

const router = express.Router();

router.route('/').get(videoController.getAll).post(videoController.create);

router
  .route('/:videoId')
  .get(videoController.get)
  .patch(videoController.update)
  .delete(videoController.remove);

router
  .route('/:videoId/products')
  .get(videoProductController.getAllProducts)
  .post(videoProductController.addProducts);

router.delete(
  '/:videoId/products/:productId',
  videoProductController.removeProducts
);

module.exports = router;
