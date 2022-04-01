const express = require('express');
const dbConfig = require('./database/DatabaseConfig');
const cors = require('cors');
const router = require('./routes/index');

const app = express();

dbConfig.initializeDB();

app.use(express.urlencoded({ extended: true }));

app.use(cors());

// parse application/json
app.use(express.json());
app.use(router);

//Configure app on port
app.listen(process.env.PORT, () => {
	console.log('Server Started');
});
