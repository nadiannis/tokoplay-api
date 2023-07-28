const httpStatus = require('http-status');
const productService = require('../services/product.service');
const { isValidId } = require('../utils/validation');

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const data = await productService.getAll({ page, limit });
    const count = await productService.count();
    const totalPages = Math.ceil(count / limit);

    const message =
      count === 0
        ? 'There are no products available'
        : 'Products retrieved successfully';

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
    const { title, price, pageUrl } = req.body;

    if (!title || price === undefined || !pageUrl) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Invalid request body' });
    }

    const data = await productService.create({ title, price, pageUrl });

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Product created successfully',
      data,
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    if (!isValidId(productId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Product ID is not valid' });
    }

    const data = await productService.update(productId, productData);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Product updated successfully',
      data,
    });
  } catch (error) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidId(productId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ status: 'error', message: 'Product ID is not valid' });
    }

    await productService.remove(productId);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
