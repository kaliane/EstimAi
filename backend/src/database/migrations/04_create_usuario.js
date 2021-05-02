
exports.up = function(knex) {
    return knex.schema.createTable('usuario', function (table) {
        table.increments('idusuario').primary();
        table.string('email').notNullable();
        table.string('senha').notNullable();
        table.string('nome');
        table.string('telefone', 50);
        table.string('inativo', 1).defaultTo('F');
        table.string('administrador', 1).defaultTo('F');
        table.string('salt');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario')
};
