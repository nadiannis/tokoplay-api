const httpStatus = require('http-status');
const Video = require('../models/video.model');
const Product = require('../models/product.model');

const getAllProducts = async (videoId) => {
  const video = await Video.findById(videoId).populate('products');

  if (!video) {
    let error = new Error('Video not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  return video.products;
};

const addProducts = async (videoId, productIds) => {
  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length < productIds.length) {
    let error = new Error(
      'There is something wrong with the product ID. Product may not be found in the database. Make sure the product ID is correct.'
    );
    error.statusCode = httpStatus.BAD_REQUEST;
    throw error;
  }

  const video = await Video.findByIdAndUpdate(
    { _id: videoId },
    { $addToSet: { products: { $each: productIds } } },
    { new: true }
  );

  if (!video) {
    let error = new Error('Video not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  return video;
};

const removeProduct = async (videoId, productId) => {
  const selectedVideo = await Video.findById(videoId);

  if (!selectedVideo) {
    let error = new Error('Video not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  if (!selectedVideo.products.includes(productId)) {
    let error = new Error('Product not found in the video');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const video = await Video.findByIdAndUpdate(
    { _id: videoId },
    { $pull: { products: productId } },
    { new: true }
  );

  return video;
};

module.exports = {
  getAllProducts,
  addProducts,
  removeProduct,
};
