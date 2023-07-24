const httpStatus = require('http-status');
const Product = require('../models/product.model');

const getAll = async () => {
  const products = await Product.find();

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

module.exports = {
  getAll,
  create,
  update,
  remove,
};
