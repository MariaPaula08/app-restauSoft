import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/Pedidos.css';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [searchPedido, setSearchPedido] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cart/getPedidos');
            setPedidos(response.data.reverse());
        } catch (error) {
            console.log(error);
        }
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

        } catch (error) {
            console.error('Error al generar la factura:', error.message);
        }
    };

    const filteredPedidos = pedidos.filter((pedido) =>
        pedido.cliente.toLowerCase().includes(searchPedido.toLowerCase())
    );

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h4 className='titlePedidos'>Pedidos:</h4>
            <button className='btnUpdate' onClick={() => fetchData()}>Actualizar Pedidos</button>
            <div className='search-container' style={{ margin: '1em 0' }}>
                <label htmlFor='searchPedido'>Buscar Pedido:</label>
                <input
                    type='text'
                    id='searchPedido'
                    value={searchPedido}
                    onChange={(e) => setSearchPedido(e.target.value)}
                />
            </div>
            <div className='containerPedidos'>
                {filteredPedidos.map((pedido) => (
                    <div className='pedido' key={pedido._id}>
                        <h5><b>Pedido ID:</b> {pedido._id}</h5>
                        <h5 style={{ textTransform: 'capitalize' }}><b>Cliente:</b> {pedido.cliente}</h5>
                        <p><b>Total:</b> ${pedido.total.toLocaleString(
                            'en-CO',
                            {
                                style: 'currency',
                                currency: 'COP',
                            }
                        )}</p>
                        <p><b>Fecha Pedido:</b> {new Date(pedido.createdAt).toLocaleString()}</p>
                        <h6><b>Productos:</b></h6>
                        <ul>
                            {pedido.products.map((producto, index) => (
                                <li key={index}>
                                    {producto.count} x {producto.productName} - ${producto.productPrice.toLocaleString(
                                        'en-CO',
                                        {
                                            style: 'currency',
                                            currency: 'COP',
                                        }
                                    )} U
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => handlePagar(pedido._id)}>Pagar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pedidos;
