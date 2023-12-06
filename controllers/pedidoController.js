// controllers/cartController.js
const Cart = require('../models/Pedidos');

// Controladores
const checkout = async (req, res) => {
    try {
        const { cart, cliente } = req.body; // Asumiendo que las propiedades son 'cart' y 'cliente'

        // Calcular el total del pedido
        const total = cart.reduce(
            (currentSum, currentCartItem) =>
                currentSum + currentCartItem.count * currentCartItem.productPrice,
            0
        );

        // Crear un objeto de pedido
        const order = new Cart({
            products: cart,
            cliente,
            total,
        });

        // Guardar el pedido en la base de datos
        const savedOrder = await order.save();

        res.status(201).json({ message: 'Pedido creado con éxito', order: savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const getPedidos = async (req, res) => {
    try {

        const response = await Cart.find()

        res.status(200).json(response)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    checkout,
    getPedidos
};
