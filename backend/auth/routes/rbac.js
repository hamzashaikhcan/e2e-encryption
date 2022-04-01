const router = require('express').Router();
const { authenticate } = require('./../controllers/rback');

router.use('/check', (req, res) => {
	console.log('Authentication check');
	const auth = authenticate();
	res.status(auth.status).json(auth.message);
});

module.exports = router;
