const Knex = require('knex');
const { Model } = require('objection');
const KnexConfig = require('./knexFile');

const knex = Knex(KnexConfig);

const initializeDB = function () {
	Model.knex(knex);
};

const destroyKnex = function () {
	knex.destroy();
};

module.exports = { initializeDB, destroyKnex };
