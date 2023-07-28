const httpStatus = require('http-status');
const Product = require('../models/product.model');

const getAll = async (query) => {
  let products;

  if (!query) {
    products = await Product.find();
  } else {
    const { page, limit } = query;

    products = await Product.find()
      .limit(limit)
      .skip((page - 1) * limit);
  }

  return products;
};

const create = async (productData) => {
  const product = await Product.create(productData);

  return product;
};

const update = async (productId, productData) => {
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    { ...productData },
    { new: true }
  );

  if (!product) {
    let error = new Error('Product not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  return product;
};

const remove = async (productId) => {
  const product = await Product.findByIdAndDelete({ _id: productId });

  if (!product) {
    let error = new Error('Product not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  return product;
};

const count = async () => {
  const totalProducts = await Product.countDocuments();

  return totalProducts;
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  count,
};
