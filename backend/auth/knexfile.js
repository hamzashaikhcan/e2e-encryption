module.exports = {
	client: 'pg',
	connection: {
		host: process.env.POSTGRES_HOST,
		user: process.env.POSTGRES_USERNAME,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DATABASE,
		timezone: 'UTC',
	},

	migrations: {
		directory: __dirname + '/database/migrations',
	},
	seeds: {
		directory: __dirname + '/database/seeds',
	},
};
