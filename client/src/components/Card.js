import React from 'react';
import { Link } from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';

const Card = ({ product, adminPage = false, homePage = false }) => {
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(addToCart(product));
	};

	return (
		<div className='col-md-4 my-3'>
			<div className='card h-100'>
				<a href='#!'>
					<img
						className='img-fluid w-100'
						src={`${process.env.REACT_APP_SERVER_URL}/uploads/${product.fileName}`}
						alt='product'
					/>
				</a>

				<div className='card-body text-center'>
					<h5>{product.productName}</h5>
					<hr />
					<h6 className='mb-3'>
						<span className='text-secondary mr-2'>
							{product.productPrice.toLocaleString('es-CO', {
								style: 'currency',
								currency: 'USD',
							})}
						</span>
					</h6>
					<p className='text-muted'>
						{product.productQty <= 0 ? 'Out of Stock' : 'En Stock'}
					</p>
					<p>
						{product.productDesc.length > 60
							? product.productDesc.substring(0, 60) + '...'
							: product.productDesc.substring(0, 60)}
					</p>
					{adminPage && (
						<>
							<Link
								to={`/admin/edit/product/${product._id}`}
								type='button'
								className='btn btn-secondary btn-sm mr-1 my-1'
							>
								<i className='far fa-edit pr-1'></i>
								Editar
							</Link>
							<button
								type='button'
								className='btn btn-danger btn-sm'
								onClick={() =>
									dispatch(deleteProduct(product._id))
								}
							>
								<i className='far fa-trash-alt pr-1'></i>
							Eliminar
							</button>
						</>
					)}

					{homePage && (
						<>
							<Link
								to={`/product/${product._id}`}
								type='button'
								className='btn btn-primary btn-sm mr-1 my-1'
							>
								Ver Plato
							</Link>
							<button
								type='button'
								className='btn btn-warning btn-sm'
								disabled={product.productQty <= 0}
								onClick={handleAddToCart}
							>
								Agregar al carrito
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
