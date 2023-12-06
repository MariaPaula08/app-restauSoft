import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/Pedidos.css';

// redux
import { useDispatch } from 'react-redux';

const Pedidos = () => {
    const dispatch = useDispatch();
    const [pedidos, setPedidos] = useState([]);
    const [facturas, setFacturas] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cart/getPedidos');
            console.log('Exito:', response.data);
            setPedidos(response.data);
            pedidos.reverse()
        } catch (error) {
            console.log(error);
        }
    };

    const getFacturas = async () => {
        const response = await axios.get('http://localhost:5000/api/factura/getFacturas')
        setFacturas(response.data);
    }

    const handlePagar = async (pedidoId) => {
        try {
            // Realizar la petición para generar la factura
            const response = await axios.post(`http://localhost:5000/api/factura/generarFactura/${pedidoId}`, {
                products: pedidos.find((pedido) => pedido._id === pedidoId).products,
                total: pedidos.find((pedido) => pedido._id === pedidoId).total,
            });

            console.log('Factura generada con éxito:', response.data);

            // Eliminar el pedido de la lista local
            setPedidos(pedidos.filter((pedido) => pedido._id !== pedidoId));

        } catch (error) {
            console.error('Error al generar la factura:', error.message);
        }
    };

    useEffect(() => {
            fetchData()
            getFacturas()
    }, []);

    // fetchData()
    // getFacturas()

    return (
        <>
            <div>
                <h4 className='titlePedidos'>Pedidos:</h4>
                <button className='btnUpdate' onClick={() => fetchData()}>Actualizar Pedidos</button>
                <div className='containerPedidos'>
                    {pedidos.map((pedido) => (
                        <div className='pedido' key={pedido._id}>
                            <h5><b>Pedido ID:</b> {pedido._id}</h5>
                            <p><b>Total:</b> ${pedido.total.toFixed(2)}</p>
                            <p><b>Fecha Pedido:</b> {new Date(pedido.createdAt).toLocaleString()}</p>
                            <h6><b>Productos:</b></h6>
                            <ul>
                                {pedido.products.map((producto, index) => (
                                    <li key={index}>
                                        {producto.count} x {producto.productName} - ${producto.productPrice.toFixed(2)} c/u
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handlePagar(pedido._id)}>Pagar</button>
                        </div>
                    ))}
                </div>
                <h2 style={{ marginTop: '1.5em' }}>Facturas</h2>
                <div className='facturas'>
                    {facturas.map((factura) => (
                        <div className='factura' key={factura._id}>
                            <h1>Factura ID: {factura._id}</h1>
                            <h2>Total: ${factura.total}</h2>
                            <ul>
                                {factura.products.map((product, index) => (
                                    <li key={index}>
                                        {product.productName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Pedidos;