
exports.up = function(knex, Promise) {
  return knex.schema.createTable('submissions', function(table) {
    table.increments();
    table.json('data', true).defaultTo({}).notNullable();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
