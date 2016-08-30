
exports.up = function(knex, Promise) {
  return knex.schema.createTable('submissions', function(table) {
    table.increments();
    table.jsonb('data').defaultTo('{}').notNullable();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
