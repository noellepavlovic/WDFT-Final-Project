
exports.up = (knex, Promise) => {
    return knex.schema.createTableIfNotExists('users', (table) => {
        table.increments('id').primary();
        table.string('userid').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('firstname');
        table.string('lastname');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};

