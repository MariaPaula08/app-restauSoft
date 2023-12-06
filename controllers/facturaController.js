// controllers/facturaController.js
const Factura = require('../models/Factura');
const Cart = require('../models/Pedidos');

const generarFactura = async (req, res) => {
    try {
        const { products, total } = req.body;

        // Crear la factura con los detalles del pedido
        const factura = new Factura({
            products,
            total,
        });

        // Guardar la factura en la base de datos
        const savedFactura = await factura.save();

        // Eliminar el pedido correspondiente
        await Cart.findByIdAndDelete(req.params.id); // Ajusta según tu esquema de datos

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
