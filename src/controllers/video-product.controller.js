const httpStatus = require('http-status');
const videoProductService = require('../services/video-product.service');
const { isValidId } = require('../utils/validation');

const getAllProducts = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!isValidId(videoId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Video ID is not valid' });
    }

    const data = await videoProductService.getAllProducts(videoId);

    const message =
      data.length === 0
        ? 'There are no products in the video'
        : 'Products of the video retrieved successfully';

    res.status(httpStatus.OK).json({
      status: 'success',
      message,
      data,
    });
  } catch (error) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};

const addProducts = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { productIds } = req.body;

    if (!isValidId(videoId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Video ID is not valid' });
    }

    if (!productIds) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Invalid request body' });
    }

    if (!Array.isArray(productIds)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'productIds should be an array' });
    }

    const data = await videoProductService.addProducts(videoId, productIds);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Products added to the video successfully',
      data,
    });
  } catch (error) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};

const removeProducts = async (req, res) => {
  try {
    const { videoId, productId } = req.params;

    if (!isValidId(videoId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Video ID is not valid' });
    }

    if (!isValidId(productId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Product ID is not valid' });
    }

    const data = await videoProductService.removeProduct(videoId, productId);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Product removed from the video successfully',
      data,
    });
  } catch (error) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAllProducts,
  addProducts,
  removeProducts,
};
