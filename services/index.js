var bookshelf = require('./bookshelf');

module.exports = {
  bookshelf: bookshelf,
  knex: bookshelf.knex,
  postmark: require('./postmark')
};
