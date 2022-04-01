const Objection = require('objection');
const { Model } = require('objection');
const path = require('path');

class SubTasks extends Model {
	static get tableName() {
		return 'sub_tasks';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['title', 'todo_id'],

			properties: {
				id: { type: 'integer' },
				title: { type: 'string' },
				todo_id: { type: 'integer' },
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
			todos: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(__dirname, 'Todo'),

				join: {
					from: 'sub_tasks.todo_id',
					to: 'todos.id',
				},
			},
		};
	}
}

module.exports = SubTasks;
