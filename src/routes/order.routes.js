const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/order-list', orderController.list);
router.post('/order-save', orderController.save);
router.get('/order-delete/:codigo', orderController.delete);

module.exports = router;