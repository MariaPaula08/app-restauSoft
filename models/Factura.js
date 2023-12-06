const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productDesc: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,  // Agregar este campo
        required: true,
    },
    // Otros campos según sea necesario
});

const facturaSchema = new mongoose.Schema({
    products: [productoSchema],
    total: {
        type: Number,
        required: true,
    },
    cliente: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Factura = mongoose.model('Factura', facturaSchema);

module.exports = Factura;
