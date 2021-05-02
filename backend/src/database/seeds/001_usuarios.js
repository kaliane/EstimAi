
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usuario').del()
    .then(function () {

      // Inserts seed entries
      return knex('usuario').insert([
        {nome: 'Administrador', email: 'admin', senha: 'senhaadmin', administrador:'T'}
      ]);
    });
};
