const httpStatus = require('http-status');
const Video = require('../models/video.model');
const Comment = require('../models/comment.model');

const getAllComments = async (videoId, query) => {
  const video = await Video.findById(videoId);

  if (!video) {
    let error = new Error('Video not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  let comments;

  if (!query) {
    comments = await Comment.find({ videoId });
  } else {
    const { page, limit } = query;
    comments = await Comment.find({ videoId })
      .limit(limit)
      .skip((page - 1) * limit);
  }

  return comments;
};

const createComment = async (videoId, commentData) => {
  const video = await Video.findById(videoId);

  if (!video) {
    let error = new Error('Video not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const comment = await Comment.create({ ...commentData, videoId });

  return comment;
};

const countComments = async (videoId) => {
  const video = await Video.findById(videoId);

  if (!video) {
    let error = new Error('Video not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const totalComments = await Comment.countDocuments({ videoId });

  return totalComments;
};

module.exports = {
  getAllComments,
  createComment,
  countComments,
};
