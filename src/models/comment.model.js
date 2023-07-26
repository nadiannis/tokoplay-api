const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
