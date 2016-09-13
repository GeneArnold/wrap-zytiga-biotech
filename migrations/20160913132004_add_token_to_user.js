
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.string('token');
      table.string('email');
      table.string('password_digest');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('token');
      table.dropColumn('email');
      table.dropColumn('password_digest');
    })
  ]);
};
