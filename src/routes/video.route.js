const express = require('express');
const videoController = require('../controllers/video.controller');

const router = express.Router();

router.route('/').get(videoController.getAll).post(videoController.create);

router
  .route('/:videoId')
  .get(videoController.get)
  .patch(videoController.update)
  .delete(videoController.remove);

module.exports = router;
