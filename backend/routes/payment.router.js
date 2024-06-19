const express = require('express');
const passport = require('passport');

const PaymentService = require('./../services/payments.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createPaymentDto, updatePaymentDto, getPaymentDto } = require('../dtos/payment.dto');

const router = express.Router();
const service = new PaymentService();

router.get('/',
  // passport.authenticate('jwt', {session: false}), esto autentica el usuario(no disponible de momento)
  // checkRoles('admin', 'seller', 'customer'), esto es para agregar roles(no disponible de momento)
  async (req, res, next) => {
  try {
    const payments = await service.find();
    res.json(payments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller', 'customer'),
  validatorHandler(getPaymentDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  // passport.authenticate('jwt', {session: false}),
 // checkRoles('admin'),
  validatorHandler(createPaymentDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPayment = await service.create(body);
      res.status(201).json(newPayment);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validatorHandler(getPaymentDto, 'params'),
  validatorHandler(updatePaymentDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validatorHandler(getPaymentDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
