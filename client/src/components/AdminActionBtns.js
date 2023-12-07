import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/ADminBtns.css'

const AdminActionBtns = () => {

	const navigate = useNavigate()

	return (

		<div className='bg-light my-2 containerP'>
			<div className='container'>
				<div className='containerBtns' style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
					<div className='responsive' style={{width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
						<div className='col-md-4 my-1 '>
							<button
								className='btn btn-outline-info btn-block'
								data-toggle='modal'
								data-target='#addCategoryModal'
								style={{ width: '200%'}}
							>
								<i className='fas fa-plus'> Agregar Categoria</i>
							</button>
						</div>

						<div className='col-md-4 my-1'>
							<button
								className='btn btn-outline-warning btn-block'
								data-toggle='modal'
								data-target='#addFoodModal'
								style={{ width: '200%'}}
							>
								<i className='fas fa-plus'> Agregar Platos</i>
							</button>
						</div>
					</div>

					<div style={{width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
						<div className='col-md-4 my-1'>
							<button className='btn btn-outline-success btn-block'
								onClick={() => navigate('/admin/pedidos')}
								style={{ width: '200%'}}
							>
								<i className='fas fa-money-check-alt'> Ver Ordenes</i>
							</button>
						</div>
						<div className='col-md-4 my-1'>
							<button className='btn btn-outline-success btn-block'
								onClick={() => navigate('/admin/facturas')}
								style={{ width: '200%'}}
							>
								<i className='fas fa-money-check-alt'> Facturas</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default AdminActionBtns;
