const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.route('/').get(productController.getAll).post(productController.create);

router
  .route('/:productId')
  .patch(productController.update)
  .delete(productController.remove);

module.exports = router;
