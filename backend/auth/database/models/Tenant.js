const { Model } = require('objection');
const path = require('path');

class Tenant extends Model {
	static get tableName() {
		return 'Tenant';
	}

	static get jsonSchema() {
		return {
			type: 'object',

			properties: {
				id: { type: 'integer' },
				name: {
					type: 'string',
				},
				email: {
					type: 'string',
				},
				password: {
					type: 'string',
				},
				key: {
					type: 'string',
				},
				created_at: { type: 'number' },
				updated_at: { type: 'number' },
			},
		};
	}

	$beforeInsert() {
		this.created_at = new Date().toISOString();
	}

	$beforeUpdate() {
		this.updated_at = new Date().toISOString();
	}
}

module.exports = Tenant;
