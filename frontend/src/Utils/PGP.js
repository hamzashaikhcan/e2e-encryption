import {
	generateKey,
	decryptKey,
	readPrivateKey,
	readMessage,
	decrypt,
} from 'openpgp';

const createKey = async (body) => {
	const key = await generateKey({
		curve: 'curve25519',
		userIDs: [{ name: body.name, email: body.email }],
		passphrase: process.env.KEY_SECRET_TOKEN,
		format: 'armored',
	});
	return key;
};

const decryptData = async (privateKeyArmored, msg) => {
	const passphrase = process.env.KEY_SECRET_TOKEN;
	const privateKey = await decryptKey({
		privateKey: await readPrivateKey({ armoredKey: privateKeyArmored }),
		passphrase,
	});
	const message = await readMessage({
		armoredMessage: msg, // parse armored message
	});
	const { data: decrypted, signatures } = await decrypt({
		message,

		decryptionKeys: privateKey,
	});
	return decrypted;
};

export { createKey, decryptData };
