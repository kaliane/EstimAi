
exports.up = function(knex) {
    return knex.schema.createTable('atividade', function (table) {
        table.increments('idatividade').primary();
        table.integer('idsprint');
        table.string('resumo');
        table.text('descricao');
        table.string('numatvimport', 50);
        table.decimal('estimativateste');
        table.decimal('estimativadev');
        table.decimal('estimativaapiteste');
        table.decimal('estimativaapidev');
        table.decimal('temporealteste');
        table.decimal('temporealdev');
        
        table.foreign('idsprint').references('idsprint').inTable('sprint');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('atividade')
};
