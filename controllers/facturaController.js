// controllers/facturaController.js
const Factura = require('../models/Factura');
const Cart = require('../models/Pedidos');

const generarFactura = async (req, res) => {
    try {
        const { cliente, products, total } = req.body;

        // Modificar la estructura de cada producto para incluir productPrice
        const productosConPrecio = products.map(product => {
            return {
                ...product,
            };
        });

        // Crear la factura con los detalles del pedido
        const factura = new Factura({
            cliente,
            products: productosConPrecio,
            total,
        });

        // Guardar la factura en la base de datos
        const savedFactura = await factura.save();

        // Eliminar el pedido correspondiente
        await Cart.findByIdAndDelete(req.params.id);

        res.status(201).json({ message: 'Factura generada con éxito', factura: savedFactura });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getFacturas = async (req, res) => {
    try {
        
        const data = await Factura.find()

        res.status(200).send(data)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    generarFactura,
    getFacturas
};
