const express = require('express');
const productRoute = require('./product.route');
const videoRoute = require('./video.route');

const router = express.Router();

router.use('/products', productRoute);
router.use('/videos', videoRoute);

module.exports = router;
