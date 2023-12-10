import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import AdminBody from './AdminBody';

// redux
import { useDispatch } from 'react-redux';
import { clearMessages } from '../redux/actions/messageActions';

const AdminOrdenes = () => {
	const dispatch = useDispatch();
	const [pedidos, setPedidos] = useState([]);

	const handleMessages = (evt) => {
		dispatch(clearMessages());
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(`${import.meta.env.REACT_APP_SERVER_URL}/api/cart/getPedidos`);
			console.log('Exito:', response.data);
			setPedidos(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	/****************************
	 * RENDERER
	 ***************************/
	return (
		<div id="AdminOrdenes" className="modal" onClick={handleMessages}>
			<div className="modal-dialog modal-dialog-centered modal-lg">
				<div className="modal-content">
					<h4>Pedidos</h4>
					<button onClick={() => fetchData()}>Actualizar Pedidos</button>
					{pedidos.map((pedido) => (
						<div key={pedido._id}>
							<h5>Pedido ID: {pedido._id}</h5>
							<p>Total: ${pedido.total.toFixed(2)}</p>
							<p>Fecha de Creación: {new Date(pedido.createdAt).toLocaleString()}</p>
							<h6>Productos:</h6>
							<ul>
								{pedido.products.map((producto, index) => (
									<li key={index}>
										{producto.count} x {producto.productName} - ${producto.productPrice.toFixed(2)} c/u
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default AdminOrdenes;
