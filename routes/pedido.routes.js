const express = require('express');
const router = express.Router();
const cartController = require('../controllers/pedidoController');

// Rutas
router.get('/getPedidos', cartController.getPedidos);
router.post('/checkout', cartController.checkout);
router.delete('/deletePedido/:pedidoId', cartController.deletePedido);

module.exports = router;