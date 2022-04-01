const Todo = require('../Database/Models/Todo');
const Subtask = require('../Database/Models/Subtask');
const { StatusCode } = require('../Utils/statusCodes');

const create = async (body) => {
	try {
		const data = await Todo.query().insert(body);
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
	const data = await Todo.query()
		.orderBy('id')
		.withGraphFetched('sub_tasks')
		.orderBy('id');

	return { result: { status: StatusCode.SUCCESS, data: data } };
};

const update = async (id, body) => {
	const trx = await Todo.startTransaction();
	try {
		const data = await Todo.query(trx)
			.findById(id)
			.patch({ status: body })
			.throwIfNotFound({
				code: StatusCode.NOT_FOUND,
				data: 'Todo not found',
			});
		const d1 = await Subtask.query(trx)
			.patch({ status: body })
			.where('todo_id', id);
		await trx.commit();
		return { result: { status: StatusCode.SUCCESS, data: data } };
	} catch (err) {
		await trx.rollback();
		return {
			error: {
				status: StatusCode.BAD_REQUEST,
				data: err.message,
			},
		};
	}
};

const deleteData = async (id) => {
	try {
		await Todo.query().deleteById(id).throwIfNotFound();
		return {
			result: {
				status: StatusCode.SUCCESS,
				data: {
					data: 'Todo deleted',
				},
			},
		};
	} catch (err) {
		return {
			error: {
				status: StatusCode.BAD_REQUEST,
				data: err.message,
			},
		};
	}
};

module.exports = {
	create,
	list,
	update,
	deleteData,
};
