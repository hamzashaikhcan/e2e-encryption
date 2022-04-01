const Subtask = require('../Database/Models/Subtask');
const Todos = require('../Database/Models/Todo');
const { StatusCode } = require('../Utils/statusCodes');

const create = async (body) => {
	try {
		const data = await Subtask.query().insert(body);
		return { result: { status: StatusCode.CREATED, data: data } };
	} catch (err) {
		return {
			error: {
				status: StatusCode.BAD_REQUEST,
				data: err.message,
			},
		};
	}
};
const list = async () => {
	const data = await Subtask.query().withGraphFetched('todos');
	return { result: { status: StatusCode.SUCCESS, data: data } };
};
const update = async (id, body) => {
	if (body === 'pending') {
		const trx = await Todos.startTransaction();
		try {
			const todo_id = await Subtask.query().select('todo_id').where('id', id);

			const data = await Todos.query(trx)
				.patch({ status: body })
				.findById(todo_id[0].todo_id);
			await Subtask.query(trx).patch({ status: body }).findById(id);
			trx.commit();
			return { result: { status: StatusCode.SUCCESS, data: data } };
		} catch (err) {
			trx.rollback();
			return {
				error: {
					status: StatusCode.BAD_REQUEST,
					data: err.message,
				},
			};
		}
	} else {
		const data = await Subtask.query().patch({ status: body }).findById(id);
		return { result: { status: StatusCode.SUCCESS, data: data } };
	}
};

module.exports = {
	create,
	list,
	update,
};
