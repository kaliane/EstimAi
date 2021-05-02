
exports.up = function(knex) {
    return knex.schema.createTable('sprint', function (table) {
        table.increments('idsprint').primary();
        table.string('nomesprint').notNullable();
        table.integer('idequipe').notNullable();

        table.foreign('idequipe').references('idequipe').inTable('equipe');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('sprint');
};
