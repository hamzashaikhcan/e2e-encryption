import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CREATE_TODO, GET_TODOS } from '../Utils/Endpoints';

import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import Tasks from './Components/Tasks';

const heading = {
	marginTop: '2%',
	textAlign: 'center',
	fontWeight: 'bold',
};

const Index = () => {
	const [data, setData] = useState([]);
	const [todo, setTodo] = useState();
	const [error, setError] = useState('');

	const onChange = (e) => {
		setTodo(e.target.value);
	};

	const addList = (e) => {
		if (todo === undefined || todo === '') {
			setError('Please enter task');
			// alert('Please enter task');
		} else if (todo !== undefined && todo !== '') {
			let body = {
				title: todo,
			};
			axios
				.post(CREATE_TODO, body)
				.then((res) => {
					setError('');
					setTodo('');
					getData();
				})
				.catch((err) => {
					alert(err);
				});
		}
	};

	const getData = () => {
		axios
			.get(GET_TODOS)
			.then((resp) => {
				setData(resp.data);
			})
			.catch((err) => {
				alert(err);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Container style={heading}>
			<Form.Label>Todo App</Form.Label>
			<Form>
				<Row>
					<Form.Group as={Col} controlId='formFirstName'>
						<Form.Control
							type='text'
							name='todo'
							value={todo}
							onChange={onChange.bind(this)}
							placeholder='What to do?'
							required
						/>
						<p style={{ color: 'red', textAlign: 'left' }}>{error}</p>
					</Form.Group>

					<Button variant='primary' onClick={addList.bind(this)}>
						New list
					</Button>
				</Row>

				{data.map((item, index) => (
					<Tasks
						key={index}
						item={item}
						total={item.sub_tasks.length}
						completed={item.sub_tasks.filter((i, task) => {
							return i.status === 'completed';
						})}
						getData={getData}
					/>
				))}
			</Form>
		</Container>
	);
};

export default Index;
