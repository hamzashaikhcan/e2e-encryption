exports.up = function (knex) {
	return knex.schema.createTable('Tenant', (t) => {
		t.increments();
		t.string('name');
		t.string('email');
		t.string('password');
		t.string('key');
		t.timestamp('created_at').defaultTo(knex.fn.now());
		t.timestamp('updated_at').defaultTo(knex.fn.now());
	});
};
exports.down = function (knex) {
	return knex.schema.dropTable('Tenant');
};
