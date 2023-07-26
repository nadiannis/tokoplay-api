const httpStatus = require('http-status');
const videoCommentService = require('../services/video-comment.service');
const { isValidId } = require('../utils/validation');

const getAllComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    if (!isValidId(videoId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Video ID is not valid' });
    }

    const data = await videoCommentService.getAllComments(videoId, {
      page,
      limit,
    });
    const count = await videoCommentService.countComments(videoId);
    const totalPages = Math.ceil(count / limit);

    const message =
      count === 0
        ? 'There are no comments in the video'
        : 'Comments of the video retrieved successfully';

    res.status(httpStatus.OK).json({
      status: 'success',
      message,
      data,
      page,
      totalPages,
      count,
    });
  } catch (error) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};

const createComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { username, content } = req.body;

    if (!isValidId(videoId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Video ID is not valid' });
    }

    if (!username || !content) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Invalid request body' });
    }

    const data = await videoCommentService.createComment(videoId, {
      username,
      content,
    });

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Comment created successfully',
      data,
    });
  } catch (error) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAllComments,
  createComment,
};
