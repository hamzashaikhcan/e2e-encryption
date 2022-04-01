import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LOGIN } from '../Utils/Endpoints';

const Login = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(name, email, password);

		axios
			.post(LOGIN, { email, password })
			.then((_) => {
				window.location.href = '/';
			})
			.catch((err) => {
				alert(err);
			});
	};

	const setState = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case 'name':
				setName(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
			default:
				break;
		}
	};

	return (
		<div className='container'>
			<form>
				<h3>Sign In</h3>

				<div className='form-group'>
					<label>Email address</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={setState.bind(this)}
						className='form-control'
						placeholder='Enter email'
					/>
				</div>

				<div className='form-group'>
					<label>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={setState.bind(this)}
						className='form-control'
						placeholder='Enter password'
					/>
				</div>

				<button
					type='button'
					onClick={onSubmit}
					className='btn btn-primary btn-block'>
					Submit
				</button>

				<br />

				<Link to={'/register'}>
					<p>Create New Account</p>
				</Link>
			</form>
		</div>
	);
};
export default Login;
