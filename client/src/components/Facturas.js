import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { BiSearchAlt } from 'react-icons/bi';

const Facturas = () => {
    const [pedidos, setPedidos] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [searchFactura, setSearchFactura] = useState('');
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

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

    const filteredFacturas = facturas.filter((factura) =>
        factura.cliente.toLowerCase().includes(searchFactura.toLowerCase())
    );

    useEffect(() => {
        fetchData();
        getFacturas();
    }, []);

    const onGlobalFilterChange = (e) => {
        setSearchFactura(e.target.value);
        setFirst(0); // Resetear la paginación al buscar
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };


    const renderProductos = (rowData) => {
        return (
            <ul>
                {rowData.products.map((product, index) => (
                    <li key={index}>
                        {product.productName} - {product.count}x{product.productPrice}
                    </li>
                ))}
            </ul>
        );
    };

    const totalRecords = filteredFacturas.length;
    const visibleData = filteredFacturas.slice(first, first + rows);

    return (
        <div>
            <h2 className='titlePedidos'>Facturas</h2>
            <div className='search-container'>
                <BiSearchAlt style={{ color: 'black', fontSize: '1.6em' }} />
                <span className='p-input-icon-left'>
                    <InputText
                        style={{ outline: 'none', borderBottom: '2px solid black' }}
                        value={searchFactura}
                        onChange={onGlobalFilterChange}
                        placeholder='Buscar Cliente'
                    />
                    <span className='ml-5'><b>Facturas Totales:</b> {facturas.length}</span>
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
                <Column field='_id' header='Factura ID'></Column>
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
                    header='Fecha Pago'
                    body={(rowData) => new Date(rowData.createdAt).toLocaleString()}
                ></Column>
                <Column header='Productos' body={renderProductos}></Column>
            </DataTable>

            <Paginator first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                className='p-paginator-custom' />
        </div>
    );
};

export default Facturas;
