module.exports = function(knex, table) {
  table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
  table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
}
