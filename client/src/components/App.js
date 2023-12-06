import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Shop from './tienda';
import Cart from './carrito';
import Shipping from './Shipping';
import PlaceOrder from './PlaceOrder';
import Payment from './Payment';
import Product from './Product';
import Signup from './registrarse';
import Signin from './iniciarSesion';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import AdminEditProduct from './AdminEditProduct';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import NotFound from './NotFound';
import Pedidos from './Pedidos';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/tienda' element={<Shop />} />
					<Route exact path='/carrito' element={<Cart />} />
					<Route
						exact
						path='/product/:productId'
						element={<Product />}
					/>
					<Route exact path='/shipping' element={<Shipping />} />
					<Route exact path='/placeorder' element={<PlaceOrder />} />
					<Route exact path='/payment' element={<Payment />} />
					<Route exact path='/registrarse' element={<Signup />} />
					<Route exact path='/iniciarSesion' element={<Signin />} />

					{/* protected user routes */}
					<Route element={<UserRoute />}>
						<Route
							exact
							path='/user/dashboard'
							element={<UserDashboard />}
						/>
					</Route>

					{/* protected admin routes */}
					<Route element={<AdminRoute />}>
						<Route
							exact
							path='/admin/dashboard'
							element={<AdminDashboard />}
						/>
						<Route
							exact
							path='/admin/edit/product/:productId'
							element={<AdminEditProduct />}
						/>
						<Route
							exact
							path='/admin/pedidos'
							element={<Pedidos />}
						/>
					</Route>

					<Route element={<NotFound />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
