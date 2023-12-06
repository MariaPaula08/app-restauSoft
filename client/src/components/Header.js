import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';
import { useSelector } from 'react-redux';

const Header = () => {
	let navigate = useNavigate();
	const { cart } = useSelector(state => state.cart);

	const handleLogout = evt => {
		logout(() => {
			navigate('/iniciarSesion');
		});
	};

	// views
	const showNavigation = () => (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			
			<Link to='/' className='navbar-brand	'>
				RestauSoft
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarTogglerDemo02'
				aria-controls='navbarTogglerDemo02'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>

			<div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
				<ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
					{!isAuthenticated() && (
						<Fragment>
							<li className='nav-item'>
								<Link to='/' className='nav-link'>
									<i className='fas fa-home'></i> Inicio
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/tienda' className='nav-link'>
									<i className='fas fa-shopping-bag'></i> Tienda
								</Link>
							</li>
							<li
								className='nav-item mr-2'
								style={{ position: 'relative' }}
							>
								<Link to='/carrito' className='nav-link'>
									<i className='fas fa-shopping-cart'></i>{' '}
									Carrito{' '}
									<span
										className='badge badge-danger'
										style={{
											position: 'absolute',
											top: '0px',
										}}
									>
										{cart.length}
									</span>
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/registrarse' className='nav-link'>
									<i className='fas fa-edit'></i> Registrarse
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/iniciarSesion' className='nav-link'>
									<i className='fas fa-sign-in-alt'></i>{' '}
									Iniciar Sesion
								</Link>
							</li>
						</Fragment>
					)}

					{isAuthenticated() && isAuthenticated().role === 0 && (
						<Fragment>
							{/* <li className='nav-item'>
								<Link to='/user/dashboard' className='nav-link'>
									<i className='fas fa-user-cog'></i>{' '}
									Dashboard
								</Link>
							</li> */}
							<li className='nav-item'>
								<Link to='/' className='nav-link'>
									<i className='fas fa-home'></i> Inicio
								</Link>
							</li>
							<li className='nav-item'>
								<Link to='/tienda' className='nav-link'>
									<i className='fas fa-shopping-bag'></i> Tienda
								</Link>
							</li>
							<li
								className='nav-item mr-2'
								style={{ position: 'relative' }}
							>
								<Link to='/carrito' className='nav-link'>
									<i className='fas fa-shopping-cart'></i>{' '}
									Carrrito{' '}
									<span
										className='badge badge-danger'
										style={{
											position: 'absolute',
											top: '0px',
										}}
									>
										{cart.length}
									</span>
								</Link>
							</li>
						</Fragment>
					)}

					{isAuthenticated() && isAuthenticated().role === 1 && (
						<Fragment>
							<li className='nav-item'>
								<Link
									to='/admin/dashboard'
									className='nav-link'
								>
									<i className='fas fa-user-cog'></i>{' '}
									Administrador
								</Link>
							</li>
						</Fragment>
					)}

					{isAuthenticated() && (
						<Fragment>
							<li className='nav-item'>
								<button
									className='btn btn-link text-secondary text-decoration-none pl-0'
									onClick={handleLogout}
								>
									<i className='fas fa-sign-out-alt'></i>{' '}
									Salir
								</button>
							</li>
						</Fragment>
					)}
				</ul>
			</div>
		</nav>
	);

	// render
	return <header id='header'>{showNavigation()}</header>;
};

export default Header;
