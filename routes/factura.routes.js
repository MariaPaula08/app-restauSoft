const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.post('/generarFactura/:id', facturaController.generarFactura);
router.get('/getFacturas', facturaController.getFacturas);

module.exports = router;