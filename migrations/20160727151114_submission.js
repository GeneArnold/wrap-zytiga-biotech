
exports.up = function(knex, Promise) {
  return knex.schema.createTable('submissions', function(table) {
    table.increments();
    table.string('full_name');
    table.string('company');
    table.string('industry');
    table.string('phone_number');
    table.string('email');
    table.string('notes');
    table.string('topics');
    table.string('sales_full_name');
    table.string('sales_email');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {

};
