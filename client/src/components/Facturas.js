import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/Pedidos.css';

const Facturas = () => {
    const [pedidos, setPedidos] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [searchPedido, setSearchPedido] = useState('');
    const [searchFactura, setSearchFactura] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cart/getPedidos');
            setPedidos(response.data.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const getFacturas = async () => {
        const response = await axios.get('http://localhost:5000/api/factura/getFacturas');
        setFacturas(response.data.reverse());
    };

    const handlePagar = async (pedidoId) => {
        try {
            const clientePedido = pedidos.find((pedido) => pedido._id === pedidoId).cliente;

            const response = await axios.post(`http://localhost:5000/api/factura/generarFactura/${pedidoId}`, {
                cliente: clientePedido,
                products: pedidos.find((pedido) => pedido._id === pedidoId).products,
                total: pedidos.find((pedido) => pedido._id === pedidoId).total,
            });

            console.log('Factura generada con éxito:', response.data);

            setPedidos(pedidos.filter((pedido) => pedido._id !== pedidoId));
            fetchData();
            getFacturas();

        } catch (error) {
            console.error('Error al generar la factura:', error.message);
        }
    };

    const filteredPedidos = pedidos.filter((pedido) =>
        pedido.cliente.toLowerCase().includes(searchPedido.toLowerCase())
    );

    const filteredFacturas = facturas.filter((factura) =>
        factura.cliente.toLowerCase().includes(searchFactura.toLowerCase())
    );

    useEffect(() => {
        fetchData();
        getFacturas();
    }, []);

    return (
        <div>
            <h2 className='titlePedidos'>Facturas</h2>
            <div className='search-container'>
                <label htmlFor='searchFactura'>Buscar Factura:</label>
                <input
                    type='text'
                    id='searchFactura'
                    value={searchFactura}
                    onChange={(e) => setSearchFactura(e.target.value)}
                />
            </div>
            <div className='facturas'>
                {filteredFacturas.map((factura) => (
                    <div className='factura' key={factura._id}>
                        <h1><b>Factura ID:</b> {factura._id}</h1>
                        <h1><b>Fecha Pago:</b> {new Date(factura.createdAt).toLocaleString()}</h1>
                        <h2 style={{ fontSize: '1em' }}><b>Cliente:</b> {factura.cliente}</h2>
                        <h2><b>Pedido:</b></h2>
                        <ul>
                            {factura.products.map((product, index) => (
                                <li key={index}>
                                    {product.productName} - {product.count}x{product.productPrice}
                                </li>
                            ))}
                        </ul>
                        <h2><b>Total:</b> ${factura.total.toLocaleString(
                            'en-CO',
                            {
                                style: 'currency',
                                currency: 'COP',
                            }
                        )}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facturas;
