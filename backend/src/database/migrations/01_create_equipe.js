
exports.up = function(knex) {
    return knex.schema.createTable('equipe', function (table) {
        table.increments('idequipe').primary();
        table.string('nomeequipe').notNullable();
        table.string('inativo', 1).defaultTo('F');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('equipe')
};
