exports.up = function (knex) {
	return knex.schema
		.createTable('todos', (t) => {
			t.increments();
			t.string('title').notNullable();
			t.string('status').notNullable();
			t.timestamp('created_at').defaultTo(knex.fn.now());
			t.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.createTable('sub_tasks', (t) => {
			t.increments();
			t.integer('todo_id')
				.references('id')
				.inTable('todos')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			t.string('title').notNullable();
			t.string('status').notNullable();
			t.timestamp('created_at').defaultTo(knex.fn.now());
			t.timestamp('updated_at').defaultTo(knex.fn.now());
		});
};
exports.down = function (knex) {
	return knex.schema.dropTable('sub_tasks').dropTable('todos');
};
