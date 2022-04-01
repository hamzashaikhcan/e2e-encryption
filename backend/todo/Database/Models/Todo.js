const Objection = require('objection');
const { Model } = require('objection');
const path = require('path');

class Todos extends Model {
	static get tableName() {
		return 'todos';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['title'],

			properties: {
				id: { type: 'integer' },
				title: { type: 'string' },
				status: {
					type: 'string',
					enum: ['pending', 'completed'],
					default: 'pending',
				},
			},
		};
	}

	$beforeInsert() {
		this.created_at = new Date().toISOString();
	}

	$beforeUpdate() {
		this.updated_at = new Date().toISOString();
	}

	static get relationMappings() {
		return {
			sub_tasks: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'Subtask'),

				join: {
					from: 'todos.id',
					to: 'sub_tasks.todo_id',
				},
			},
		};
	}
}

module.exports = Todos;
