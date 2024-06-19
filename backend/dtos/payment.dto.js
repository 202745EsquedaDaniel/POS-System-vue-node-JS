const Joi = require('joi');

const id = Joi.number().integer();
const total = Joi.number();
const paymentMethod = Joi.string();

const createPaymentDto = Joi.object({
  total: total.required(),
  paymentMethod: paymentMethod.required()
});

const updatePaymentDto = Joi.object({
  total: total,
  paymentMethod: paymentMethod
});

const getPaymentDto = Joi.object({
  id: id.required(),
});

module.exports = { createPaymentDto, updatePaymentDto, getPaymentDto }
