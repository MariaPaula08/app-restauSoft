import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { showErrorMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { signin } from '../api/auth';

const Signin = () => {
	let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		if (isAuthenticated() && isAuthenticated().role === 1) {
			navigate('/admin/dashboard');
		} else if (isAuthenticated() && isAuthenticated().role === 0) {
			navigate('/');
		}
	}, [navigate]);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		errorMsg: false,
		loading: false,
	});

	const { email, password, errorMsg, loading } = formData;

	/****************************
	 * EVENT HANDLERS
	 ***************************/
	const handleChange = evt => {
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
			errorMsg: '',
		});
	};

	const handleSubmit = evt => {
		evt.preventDefault();

		// client-side validation
		if (isEmpty(email) || isEmpty(password)) {
			setFormData({
				...formData,
				errorMsg: 'Los campos son obligatorios',
			});
		} else if (!isEmail(email)) {
			setFormData({
				...formData,
				errorMsg: 'Invalid email',
			});
		} else {
			const { email, password } = formData;
			const data = { email, password };

			setFormData({ ...formData, loading: true });

			signin(data)
				.then(response => {
					setAuthentication(response.data.token, response.data.user);
					const redirect = location.search.split('=')[1];

					if (isAuthenticated() && isAuthenticated().role === 1) {
						console.log('Redirecting to admin dashboard');
						navigate('/admin/dashboard');
					} else if (
						isAuthenticated() &&
						isAuthenticated().role === 0 &&
						!redirect
					) {
						console.log('Redirecting to user dashboard');
						navigate('/');
					} else {
						console.log('Redirecting to shipping');
						navigate('/shipping');
					}
				})
				.catch(err => {
					console.log('signin api function error: ', err);
					setFormData({
						...formData,
						loading: false,
						errorMsg: err.response.data.errorMessage,
					});
				});
		}
	};

	/****************************
	 * VIEWS
	 ***************************/
	const showSigninForm = () => (
		<form className='signup-form' onSubmit={handleSubmit} noValidate>
			{/* email */}
			<div className='col-md-5 mx-auto' style={{textAlign: "center"}}><img src="LogoLeon.png"  width={"200px"}  ></img></div>
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-envelope'></i>
					</span>
				</div>
				<input
					name='email'
					value={email}
					className='form-control'
					placeholder='Correo Electronico'
					type='email'
					onChange={handleChange}
				/>
			</div>
			{/* password */}
			<div className='form-group input-group'>
				<div className='input-group-prepend'>
					<span className='input-group-text'>
						<i className='fa fa-lock'></i>
					</span>
				</div>
				<input
					name='password'
					value={password}
					className='form-control'
					placeholder='Ingresar Contraseña'
					type='password'
					onChange={handleChange}
				/>
			</div>
			{/* signin button */}
			<div className='form-group'>
				<button type='submit' className='btn btn-warning btn-block'>
					Iniciar Sesion
				</button>
			</div>
			{/* already have account */}
			<p className='text-center text-black'>
				¿No estas registrado? <Link to='/registrarse'>Registrarse</Link>
			</p>
		</form>
	);

	/****************************
	 * RENDERER
	 ***************************/
	return (
		<div
			className='signin-container'
		>
			<div className='row px-3 vh-100'>
				<div className='col-md-5 mx-auto align-self-center'>
					{errorMsg && showErrorMsg(errorMsg)}
					{loading && (
						<div className='text-center pb-4'>{showLoading()}</div>
					)}
					{showSigninForm()}
				</div>
			</div>
		</div>
	);
};

export default Signin;
