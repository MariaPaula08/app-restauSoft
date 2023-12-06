import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminActionBtns = () => {
	
	const navigate = useNavigate()

	return (
	
	<div className='bg-light my-2'>
		<div className='container'>
			<div className='row pb-3'>
				<div className='col-md-4 my-1'>
					<button
						className='btn btn-outline-info btn-block'
						data-toggle='modal'
						data-target='#addCategoryModal'
					>
						<i className='fas fa-plus'> Agregar Categoria</i>
					</button>
				</div>

				<div className='col-md-4 my-1'>
					<button
						className='btn btn-outline-warning btn-block'
						data-toggle='modal'
						data-target='#addFoodModal'
					>
						<i className='fas fa-plus'> Agregar Platos</i>
					</button>
				</div>

				<div className='col-md-4 my-1'>
					<button className='btn btn-outline-success btn-block'
					onClick={() => navigate('/admin/pedidos')}
					>
						<i className='fas fa-money-check-alt'> Ver Ordenes</i>
					</button>
				</div>
				<div className='col-md-4 my-1'>
					<button className='btn btn-outline-success btn-block'
					onClick={() => navigate('/admin/facturas')}
					>
						<i className='fas fa-money-check-alt'> Facturas</i>
					</button>
				</div>
			</div>
		</div>
	</div>
)};

export default AdminActionBtns;
