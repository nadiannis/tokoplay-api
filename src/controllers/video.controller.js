const httpStatus = require('http-status');
const videoService = require('../services/video.service');
const { isValidId } = require('../utils/validation');

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sort = req.query.sort;

    const data = await videoService.getAll({ page, limit, sort });
    const count = await videoService.count();
    const totalPages = Math.ceil(count / limit);

    const message =
      count === 0
        ? 'There are no videos available'
        : 'Videos retrieved successfully';

    res.status(httpStatus.OK).json({
      status: 'success',
      message,
      data,
      page,
      totalPages,
      count,
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, thumbnailUrl, videoUrl } = req.body;

    if (!title || !thumbnailUrl || !videoUrl) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Invalid request body' });
    }

    const data = await videoService.create({ title, thumbnailUrl, videoUrl });

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Video created successfully',
      data,
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: error.message });
  }
};

const get = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!isValidId(videoId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Video ID is not valid' });
    }

    const data = await videoService.get(videoId);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Video retrieved successfully',
      data,
    });
  } catch (error) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { videoId } = req.params;
    const videoData = req.body;

    if (!isValidId(videoId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Video ID is not valid' });
    }

    const { products, ...otherVideoData } = videoData;
    console.log(products);
    const data = await videoService.update(videoId, otherVideoData);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Video updated successfully',
      data,
    });
  } catch (error) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!isValidId(videoId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Video ID is not valid' });
    }

    await videoService.remove(videoId);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Video deleted successfully',
    });
  } catch (error) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
};
