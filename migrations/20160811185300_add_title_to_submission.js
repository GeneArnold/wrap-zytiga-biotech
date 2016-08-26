exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('submissions', function(table) {
      table.string('title');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('submissions', function(table) {
      table.dropColumn('title');
    })
  ]);
};
