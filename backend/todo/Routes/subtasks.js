const router = require('express').Router();
const e = require('express');
const sub_tasks = require('../Controllers/SubTasks');
const { StatusCode } = require('../Utils/statusCodes');

router.get('/', async (req, res) => {
	const data = await sub_tasks.list();
	res.status(data.status).json(result.data);
});
router.post('/', async (req, res) => {
	const { result, error } = await sub_tasks.create(req.body);
	if (error) {
		if (error.data === 'NotFoundError') {
			res.status(StatusCode.NOT_FOUND).json({ data: 'Data not found' });
		} else {
			res.status(StatusCode.BAD_REQUEST).json({ data: error });
		}
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
	}
});
router.patch('/:id', async (req, res) => {
	const { result, error } = await sub_tasks.update(
		req.params.id,
		req.body.status,
	);

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
