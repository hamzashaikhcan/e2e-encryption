const router = require('express').Router();
const todo = require('../Controllers/Todos');
const { StatusCode } = require('../Utils/statusCodes');

router.get('/', async (req, res) => {
	console.log('GETTING TASKS');
	const { result, error } = await todo.list();
	if (error) {
		res.status(error.status).json(error.data);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
	}
});

router.post('/', async (req, res) => {
	console.log('ADDING TASKS');
	const { result, error } = await todo.create(req.body);
	if (error) {
		res.status(error.status).json(error.data);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
	}
});

router.patch('/:id', async (req, res) => {
	const { result, error } = await todo.update(req.params.id, req.body.status);

	if (error) {
		if (error.data === 'NotFoundError') {
			res.status(StatusCode.NOT_FOUND).json({ data: 'Data not found' });
		} else {
			res.status(StatusCode.NOT_FOUND).json(error);
		}
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
	}
});

module.exports = router;
