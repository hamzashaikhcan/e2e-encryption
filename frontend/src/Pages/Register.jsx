import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { REGISTER } from '../Utils/Endpoints';
import { createKey } from '../Utils/PGP';

import axios from 'axios';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		const body = { name: name, email: email, password: password };
		const key = await createKey(body);
		const headers = {
			key: `${key.publicKey.replace(/\n/g, ' ')}`,
		};

		console.log('KEY => ' + key.publicKey.replace(/\n/g, ' '));
		axios
			.post(REGISTER, body, {
				headers: headers,
			})
			.then((_) => {
				window.location.href = '/login';
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
				<h3>Sign Up</h3>

				<div className='form-group'>
					<label>Name</label>
					<input
						type='text'
						name='name'
						value={name}
						onChange={setState.bind(this)}
						className='form-control'
						placeholder='Enter name'
					/>
				</div>

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
				<Link to={'/login'}>
					<p>Already have an account?</p>
				</Link>
			</form>
		</div>
	);
};
export default Register;
