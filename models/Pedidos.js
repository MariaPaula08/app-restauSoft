const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [
        {
            count: Number,
            fileName: String,
            productCategory: String,
            productDesc: String,
            productName: String,
            productPrice: Number,
            productQty: Number,
            updatedAt: Date,
        }
    ],
    total: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Cart = mongoose.model('Pedido', cartSchema);

module.exports = Cart;
