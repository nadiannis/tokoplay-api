require('dotenv').config();

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const connectToDb = require('../utils/db');
const Product = require('../models/product.model');
const Video = require('../models/video.model');
const Comment = require('../models/comment.model');

const VIDEOS_FILE_PATH = path.join(__dirname, './data/tokoplay.videos.json');
const PRODUCTS_FILE_PATH = path.join(
  __dirname,
  './data/tokoplay.products.json'
);
const COMMENTS_FILE_PATH = path.join(
  __dirname,
  './data/tokoplay.comments.json'
);

const load = (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON, (key, value) => {
      if (key === '_id' && typeof value === 'object' && value.$oid) {
        return new mongoose.Types.ObjectId(value.$oid);
      }

      if (value instanceof Object && '$oid' in value) {
        return new mongoose.Types.ObjectId(value.$oid);
      }

      if (
        (key === 'createdAt' || key === 'updatedAt') &&
        typeof value === 'object' &&
        value.$date
      ) {
        return new Date(value.$date);
      }

      return value;
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

connectToDb();

const products = load(PRODUCTS_FILE_PATH);
const videos = load(VIDEOS_FILE_PATH);
const comments = load(COMMENTS_FILE_PATH);

const seedDb = async () => {
  try {
    await Product.deleteMany();
    await Video.deleteMany();
    await Comment.deleteMany();

    await Product.insertMany(products);
    await Video.insertMany(videos);
    await Comment.insertMany(comments);
  } catch (error) {
    console.log(error);
  }
};

seedDb().then(() => {
  console.log(
    'Successfully added products, videos, & comments to the database'
  );
  mongoose.connection.close();
});
