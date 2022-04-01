const { todoController, subTaskController } = require('../Controllers');
const dbConfig = require('../Database/connect');
const { StatusCode } = require('../Utils/statusCodes');

const todo_id = 1000;
const subTask_id = 1000;

const body = {
	todo: {
		title: 'Test Case Todo',
	},
	subTask: {
		title: 'Test Case Sub Task',
		todo_id: todo_id,
	},
};

beforeAll(async () => {
	dbConfig.initializeDB();
});

afterAll(() => {
	dbConfig.destroyKnex();
});

describe('UNIT TEST: TODO', () => {
	/* [TODO] POSITIVE TEST CASES */
	describe('POSITIVE TEST CASES', () => {
		/* CREATE */
		it('Should CREATE TODO and output success status code', async () => {
			const { result } = await todoController.create({
				title: body.todo.title,
			});
			body.todo.id = result.data.id;
			expect(result).toMatchObject({ status: StatusCode.CREATED });
		});

		/* LIST */
		it('Should LIST TODO and output success status code', async () => {
			const { result } = await todoController.list();
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* UPDATE */
		it('Should UPDATE TODO and output success status code', async () => {
			const { result } = await todoController.update(body.todo.id, 'completed');
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});
	});

	/* [TODO] NEGATIVE TEST CASES */
	describe('NEGATIVE TEST CASES', () => {
		body.todo.id = Number(body.todo.id) - 1;
		/* CREATE */
		it('Should CREATE TODO and output error status code', async () => {
			const { error } = await todoController.create({});
			expect(error).not.toMatchObject({ status: StatusCode.CREATED });
		});

		/* LIST */
		it('Should LIST TODO and output error status code', async () => {
			const { result } = await todoController.list();
			expect(result).not.toMatchObject({ status: StatusCode.BAD_REQUEST });
		});

		/* UPDATE */
		it('Should UPDATE TODO and output error status code', async () => {
			const { error } = await todoController.update(
				body.todo.id + 20,
				'completed',
			);
			expect(error).toMatchObject({ status: StatusCode.BAD_REQUEST });
		});

		/* DELETE */
		it('Should NOT DELETE TODO and output error status code', async () => {
			const { error } = await todoController.deleteData(body.todo.id + 20);
			expect(error).toMatchObject({ status: StatusCode.BAD_REQUEST });
		});
	});
});

describe('UNIT TEST: SUB TASKS', () => {
	/* [SUB TASKS] POSITIVE TEST CASES */
	describe('POSITIVE TEST CASES', () => {
		/* CREATE */
		it('Should CREATE SUB TASKS and output success status code', async () => {
			const { result } = await subTaskController.create({
				title: body.subTask.title,
				todo_id: body.todo.id,
			});
			body.subTask.id = result.data.id;
			expect(result).toMatchObject({ status: StatusCode.CREATED });
		});

		/* LIST */
		it('Should LIST SUB TASKS and output success status code', async () => {
			const { result } = await subTaskController.list();
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* UPDATE */
		it('Should UPDATE SUB TASKS and output success status code', async () => {
			const { result } = await subTaskController.update(
				body.subTask.id,
				'completed',
			);
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* UPDATE TO PENDING */
		it('Should SUB TASKS UPDATE TO PENDING and output success status code', async () => {
			const { result } = await subTaskController.update(
				body.subTask.id,
				'pending',
			);
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});
	});

	/* [SUB TASKS] NEGATIVE TEST CASES */
	describe('NEGATIVE TEST CASES', () => {
		/* CREATE */
		it('Should NOT CREATE SUB TASKS and output error status code', async () => {
			const { error } = await subTaskController.create({
				title: body.subTask.title,
				todo_id: body.todo.id + 100,
			});
			body.subTask.id = Number(body.subTask.id) + 1;
			expect(error).toMatchObject({ status: StatusCode.BAD_REQUEST });
		});

		/* LIST */
		it('Should NOT LIST SUB TASKS and output error status code', async () => {
			const { result } = await subTaskController.list();
			expect(result).not.toMatchObject({ status: StatusCode.BAD_REQUEST });
		});

		/* UPDATE */
		it('Should NOT UPDATE SUB TASKS and output error status code', async () => {
			const { result } = await subTaskController.update(
				Number(body.subTask.id) + 50,
				'completed',
			);
			expect(result).not.toMatchObject({ status: StatusCode.BAD_REQUEST });
		});

		/* UPDATE TO PENDING */
		it('Should NOT UPDATE SUB TASKS TO PENDING and output error status code', async () => {
			const { error } = await subTaskController.update(
				body.subTask.id + 20,
				'pending',
			);
			expect(error).toMatchObject({ status: StatusCode.BAD_REQUEST });
		});
	});
});

describe('UNIT TEST: DELETE TEST CASES', () => {
	/* [TODO] TEST CASES */
	it('Should DELETE [TODO] and output success status code', async () => {
		const { result } = await todoController.deleteData(body.todo.id);
		expect(result).toMatchObject({ status: StatusCode.SUCCESS });
	});
});
