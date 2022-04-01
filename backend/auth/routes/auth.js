const router = require('express').Router();
const {
	login,
	register,
	create_key,
	message,
} = require('./../controllers/rback');

router.post('/login', async (req, res) => {
	console.log('Logging in');
	const auth = await login(req.body);
	res.status(auth.status).json(auth.message);
});

router.post('/register', async (req, res) => {
	console.log('Registering');
	const authorizationHeader = req.headers['key'];
	// const key = authorizationHeader && authorizationHeader.split(' ')[1];

	const auth = await register(req.body, authorizationHeader);
	res.status(auth.status).json(auth.message);
});

router.post('/create-key', async (req, res) => {
	console.log('Creating Key');
	const auth = await create_key(req.body);
	res.status(auth.status).json(auth.message);
});

router.post('/message', async (req, res) => {
	console.log('Creating Message');
	const auth = await message(req.body, req.headers);
	res
		.status(auth.status)
		.json({ encrypted: auth.encrypted, decrypted: auth.decrypted });
});

module.exports = router;
