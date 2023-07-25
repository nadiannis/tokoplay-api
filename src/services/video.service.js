const httpStatus = require('http-status');
const Video = require('../models/video.model');

const getAll = async (query) => {
  let videos;

  if (!query) {
    videos = await Video.find({}, '_id title thumbnailUrl');
  } else {
    const { page, limit } = query;
    videos = await Video.find({}, '_id title thumbnailUrl')
      .limit(limit)
      .skip((page - 1) * limit);
  }

  return videos;
};

const create = async (videoData) => {
  const video = await Video.create(videoData);

  return video;
};

const get = async (videoId) => {
  const video = await Video.findById(videoId).populate('products');

  if (!video) {
    let error = new Error('Video not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  return video;
};

const update = async (videoId, videoData) => {
  const video = await Video.findByIdAndUpdate(
    { _id: videoId },
    { ...videoData },
    { new: true }
  );

  if (!video) {
    let error = new Error('Video not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  return video;
};

const remove = async (videoId) => {
  const video = await Video.findByIdAndDelete({ _id: videoId });

  if (!video) {
    let error = new Error('Video not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  return video;
};

const count = async () => {
  const totalVideos = await Video.countDocuments();

  return totalVideos;
};

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
  count,
};
