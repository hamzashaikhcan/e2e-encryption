import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Col, Row, Collapse } from 'react-bootstrap';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';

import {
	UPDATE_TODO,
	CREATE_SUBTASK,
	UPDATE_SUBTASK,
} from '../../Utils/Endpoints';

const border = {
	border: '1px solid gray',
	padding: '1%',
	width: '100%',
	textAlign: 'start',
	marginTop: '2%',
};
const collapseBg = {
	width: '100%',
	textAlign: 'start',
	paddingLeft: '2%',
	paddingRight: '2%',
	marginLeft: '5%',
	marginRight: '5%',
};
const list = {
	border: '1px solid lightgray',
	width: '100%',
	padding: '2%',
};
const alignRight = {
	float: 'right',
	color: 'gray',
	fontSize: '12px',
};

const Tasks = (props) => {
	const [open, setOpen] = useState(false);
	const [subTask, setSubTask] = useState('');
	const [error, setError] = useState('');

	const addSubTask = (todo_id, e) => {
		if (subTask === undefined || subTask === '') {
			setError('Please enter sub task');
		} else if (subTask !== undefined && subTask !== '') {
			let body = {
				title: subTask,
				todo_id: todo_id,
			};
			axios
				.post(CREATE_SUBTASK, body)
				.then((res) => {
					setError('');
					setSubTask('');
					props.getData();
				})
				.catch((err) => {
					alert(err);
				});
		}
	};

	const TodoChange = (id, e) => {
		let body = {
			status: !e.target.checked ? 'pending' : 'completed',
		};
		axios
			.patch(UPDATE_TODO + id, body)
			.then((res) => {
				setError('');
				props.getData();
			})
			.catch((err) => {
				alert(err);
			});
	};

	const SubTaskChange = (id, subId, e) => {
		let body = {
			status: !e.target.checked ? 'pending' : 'completed',
		};
		axios
			.patch(UPDATE_SUBTASK + subId, body)
			.then((res) => {
				setError('');
				props.getData();
			})
			.catch((err) => {
				alert(err);
			});
	};

	const onChange = (e) => {
		setSubTask(e.target.value);
	};

	return (
		<>
			<Row>
				<Form.Group style={border}>
					<Row>
						<Col
							onClick={() => setOpen(!open)}
							aria-controls={props.item.title}
							aria-expanded={open}>
							<Form.Check
								type='checkbox'
								checked={props.item.status === 'completed'}
								id={`default-${props.item.title}`}
								label={props.item.title}
								onChange={TodoChange.bind(this, props.item.id)}
							/>
							&ensp;
							<Form.Label style={alignRight}>
								{props.completed.length} out of {props.total} completed &ensp;{' '}
								{open ? <CaretUpFill /> : <CaretDownFill />}
							</Form.Label>
						</Col>
					</Row>
				</Form.Group>
				<Collapse in={open} style={collapseBg} id={props.item.title}>
					<Row>
						<Form style={{ width: '100%' }}>
							{props.item.sub_tasks
								.sort((a, b) => (a.id > b.id ? 1 : -1))
								.map((sub_items, index) => (
									<Row key={index} style={list}>
										<Col>
											<Form.Check
												type='checkbox'
												checked={sub_items.status === 'completed'}
												id={`default-${sub_items.title}`}
												label={sub_items.title}
												onChange={SubTaskChange.bind(
													this,
													props.item.id,
													sub_items.id,
												)}
											/>
										</Col>
									</Row>
								))}
							<Row style={list}>
								<Col>
									<input
										type='text'
										placeholder='What are the steps?'
										onChange={onChange.bind(this)}
										value={subTask}
										style={{ border: '0px solid white', width: '85%' }}
									/>{' '}
									<Button
										variant='success'
										onClick={addSubTask.bind(this, props.item.id)}>
										New step
									</Button>
									<p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
									&ensp;
								</Col>
							</Row>
						</Form>
					</Row>
				</Collapse>
			</Row>
		</>
	);
};

export default Tasks;
