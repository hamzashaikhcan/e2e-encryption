// const { readMessage, decrypt } = require('openpgp');
// const generateKey = require('openpgp/lightweight');
const openpgp = require('openpgp');
const Tenant = require('../database/models/Tenant');
// const generateKey = (await import('openpgp/lightweight')).default;

const authenticate = () => {
	return {
		status: 200,
		message: 'All OK!',
	};
	// return {
	// 	status: 400,
	// 	message: 'Not authorized',
	// };
};

const login = async (body) => {
	const data = await Tenant.query().where({
		email: body.email,
		password: body.password,
	});
	if (data.length > 0) {
		return {
			status: 200,
			message: 'Login successful',
		};
	} else {
		return {
			status: 401,
			message: 'Invalid email password',
		};
	}
};

const register = async (body, key) => {
	body['key'] = key;
	await Tenant.query().insert(body);

	// const key = await openpgp.generateKey({
	// 	curve: 'curve25519',
	// 	userIDs: [{ name: body.name, email: body.email }],
	// 	passphrase: process.env.KEY_SECRET_TOKEN,
	// 	format: 'armored',
	// });
	return {
		status: 200,
		message: key,
	};
};

const create_key = async (body) => {
	const key = await openpgp.generateKey({
		type: 'rsa', // Type of the key
		rsaBits: 4096, // RSA key size (defaults to 4096 bits)
		curve: 'curve25519',
		userIDs: [{ name: body.name, email: body.email }],
		passphrase: process.env.KEY_SECRET_TOKEN,
		format: 'armored',
	});
	return {
		status: 200,
		message: key,
	};
};

const message = async (body, headers) => {
	// const message = await openpgp.createMessage({
	// 	binary: new Uint8Array([0x01, 0x01, 0x01]),
	// });
	// const encrypted = await openpgp.encrypt({
	// 	message, // input as Message object
	// 	passwords: ['secret stuff'], // multiple passwords possible
	// 	format: 'binary', // don't ASCII armor (for Uint8Array output)
	// });

	// const key = `${headers.public_key.trim()}`;
	const key =
		'-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n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\nCO+Qe5aF9taM+VA=\n=MJEf\n-----END PGP PUBLIC KEY BLOCK-----\n';
	const privateKey =
		'-----BEGIN PGP PRIVATE KEY BLOCK-----\n\n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\n=vx9/\n-----END PGP PRIVATE KEY BLOCK-----\n';
	// const message = body;
	// console.clear();
	// console.log('KEY => ', key);
	// const publicKey = await openpgp.readKey({ armoredKey: key });
	// // const publicKey = (await openpgp.key.readArmored([key])).keys[0];

	// const plaintext = 'Hello, World!';

	// const msg = await openpgp.createMessage({ text: JSON.stringify(plaintext) });

	// // console.log('Body: ', body.text, 'Message: ', msg);
	// // const encrypted = await openpgp.encrypt({
	// // 	msg,
	// // 	encryptionKeys: key,
	// // });

	// const encrypted = await openpgp.encrypt({
	// 	message: msg, // input as Message object
	// 	encryptionKeys: publicKey,
	// });

	// const enc_msg = await openpgp.readMessage({
	// 	armoredMessage: encrypted, // parse armored message
	// });

	// console.log('Encrypted Message: ', enc_msg);

	// const { data: decrypted, signatures } = await openpgp.decrypt({
	// 	enc_msg,
	// 	decryptionKeys: privateKey,
	// });

	// const encrypted = encryptData(headers.public_key, body.text);
	// console.log(body);
	const plaintext = JSON.stringify(body);
	const msg = await openpgp.createMessage({ text: JSON.stringify(plaintext) });
	const data = await encryptData(key, msg);
	const dec_data = await decryptData(privateKey, data);
	console.log(JSON.parse(dec_data));
	return {
		status: 200,
		encrypted: data,
		decrypted: JSON.parse(dec_data),
	};
};

const encryptData = async (pubkeys, message) => {
	const publicKey = await openpgp.readKey({ armoredKey: pubkeys });
	const encrypted = await openpgp.encrypt({
		message,
		encryptionKeys: publicKey,
	});
	return encrypted;
};

const decryptData = async (privateKeyArmored, msg) => {
	const passphrase = process.env.KEY_SECRET_TOKEN;
	const privateKey = await openpgp.decryptKey({
		privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
		passphrase,
	});
	const message = await openpgp.readMessage({
		armoredMessage: msg, // parse armored message
	});
	const { data: decrypted, signatures } = await openpgp.decrypt({
		message,

		decryptionKeys: privateKey,
	});
	return decrypted;
};

module.exports = { authenticate, login, register, create_key, message };
