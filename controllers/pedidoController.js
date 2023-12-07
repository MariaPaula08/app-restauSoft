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

const deletePedido = async (req, res) => {
    try {
        const pedidoId = req.params.pedidoId; // Suponiendo que el id del pedido está en los parámetros de la ruta

        // Verificar si el pedido existe
        const pedidoExistente = await Cart.findById(pedidoId);

        if (!pedidoExistente) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        // Eliminar el pedido de la base de datos
        await Cart.findByIdAndRemove(pedidoId);

        res.status(200).json({ message: 'Pedido eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    checkout,
    getPedidos,
    deletePedido
};
