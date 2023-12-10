import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { BiSearchAlt } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';

import { MdDelete } from "react-icons/md";
import { MdPayments } from "react-icons/md";

import '../styles/Pedidos.css'

import "react-toastify/dist/ReactToastify.css";

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [searchPedido, setSearchPedido] = useState('');
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/cart/getPedidos`);
            setPedidos(response.data.reverse());
        } catch (error) {
            console.log(error);
        }
    };

    const handlePagar = async (pedidoId, clientePedido) => {
        const confirmPayment = window.confirm(`¿Deseas pagar el pedido del cliente ${clientePedido}?`);

        if (confirmPayment) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/factura/generarFactura/${pedidoId}`, {
                    cliente: clientePedido,
                    products: pedidos.find((pedido) => pedido._id === pedidoId).products,
                    total: pedidos.find((pedido) => pedido._id === pedidoId).total,
                });

                console.log('Factura generada con éxito:', response.data);

                setPedidos(pedidos.filter((pedido) => pedido._id !== pedidoId));
                fetchData();

                // Mostrar notificación de éxito
                toast.success("Pago Realizado", {
                    position: toast.POSITION.TOP_CENTER
                });
            } catch (error) {
                console.error('Error al generar la factura:', error.message);

                // Mostrar notificación de error
                toast.error("Error en el Pago", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
    };

    const deletePedido = async (pedidoId, clientePedido) => {
        const confirmDelete = window.confirm(`¿Deseas eliminar el pedido del cliente ${clientePedido}?`);

        if (confirmDelete) {
            try {
                await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/cart/deletePedido/${pedidoId}`);
                setPedidos(pedidos.filter((pedido) => pedido._id !== pedidoId));

                // Mostrar notificación de éxito
                toast.success("Pedido Eliminado", {
                    position: toast.POSITION.TOP_CENTER
                });
            } catch (error) {
                console.error('Error al eliminar el pedido:', error.message);

                // Mostrar notificación de error
                toast.error("Error al Eliminar el Pedido", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
    };

    const onGlobalFilterChange = (e) => {
        setSearchPedido(e.target.value);
        setFirst(0); // Resetear la paginación al buscar
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const filteredPedidos = pedidos.filter((pedido) =>
        pedido.cliente.toLowerCase().includes(searchPedido.toLowerCase())
    );
    const totalRecords = filteredPedidos.length;
    const visibleData = filteredPedidos.slice(first, first + rows);

    return (
        <div>
            <ToastContainer />
            <h4 className='titlePedidos'>Pedidos:</h4>
            <div className='search-container' style={{ margin: '1em 0' }}>
                <BiSearchAlt style={{ color: 'black', fontSize: '1.6em' }} />
                <span className='p-input-icon-left'>
                    <InputText
                        style={{ outline: 'none', borderBottom: '2px solid black' }}
                        value={searchPedido}
                        onChange={onGlobalFilterChange}
                        placeholder='Buscar Cliente'
                    />
                    <button className='btnUpdate' onClick={fetchData} style={{ marginLeft: '1em', marginRight: '1em' }}>
                        Actualizar Pedidos
                    </button>
                    <span><b>Pedidos Totales:</b> {pedidos.length}</span>
                </span>
            </div>

            <DataTable
                value={visibleData}
                className='p-datatable-custom'
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10]}
                emptyMessage='No hay facturas'
                currentPageReportTemplate='{first} - {last} de {totalRecords} facturas'
                paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                rowsPerPageTemplate='5,10,20'
            >
                <Column field='_id' header='Pedido ID'></Column>
                <Column
                    field='cliente'
                    header='Cliente'
                    style={{ textTransform: 'capitalize' }}
                ></Column>
                <Column
                    field='total'
                    header='Total'
                    body={(rowData) => (
                        <span>
                            {rowData.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                        </span>
                    )}
                ></Column>
                <Column
                    field='createdAt'
                    header='Fecha Pedido'
                    body={(rowData) => new Date(rowData.createdAt).toLocaleString()}
                ></Column>
                <Column header='Productos' body={renderProductos}></Column>
                <Column
                    header='Acciones'
                    body={(rowData) => (
                        <div className='btnsActions'>
                            <button className='btnPagar' onClick={() => handlePagar(rowData._id, rowData.cliente)}><MdPayments/></button>
                            <button className='btnPagar' onClick={() => deletePedido(rowData._id, rowData.cliente)}><MdDelete/></button>
                        </div>
                    )}
                ></Column>
            </DataTable>

            <Paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                className='p-paginator-custom'
            />
        </div>
    );
};

const renderProductos = (rowData) => {
    return (
        <ul>
            {rowData.products.map((producto, index) => (
                <li key={index}>
                    {producto.count} x {producto.productName} - ${producto.productPrice.toLocaleString('en-CO', { style: 'currency', currency: 'COP' })} U
                </li>
            ))}
        </ul>
    );
};

export default Pedidos;
