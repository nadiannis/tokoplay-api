const httpStatus = require('http-status');
const productService = require('../services/product.service');
const { isValidId } = require('../utils/validation');

const getAll = async (req, res) => {
  try {
    const data = await productService.getAll();

    if (data.length === 0) {
      return res.status(httpStatus.OK).json({
        status: 'success',
        message: 'There are no products available',
        data,
      });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Products retrieved successfully',
      data,
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

    if (!data) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ status: 'error', message: 'Product not found' });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Product updated successfully',
      data,
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: error.message });
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

    const data = await productService.remove(productId);

    if (!data) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ status: 'error', message: 'Product not found' });
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
