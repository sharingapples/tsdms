'use strict';

exports.up = function(knex, Promise) {
  // Create the station table
  return knex.schema.createTable('station', function(table) {
      table.increments().primary();
      table.string('identifier').unique().notNullable();
      table.string('name').notNullable();
      table.float('longitude').nullable();
      table.float('latitude').nullable();
      table.float('elevation').nullable();
      table.string('description').nullable();
      table.date('established').nullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
  }).then(function() {
    return knex.schema.createTable('tag', function(table) {
      table.increments().primary();
      table.string('name').unique().notNullable();
      table.string('description');
      table.boolean('provides_uniqueness');
      table.boolean('starred');     // Seems unused at the moment
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    }).then(function() {
      return knex.schema.createTable('tag_station', function(table) {
        table.increments().primary();
        table.integer('tag_id').notNullable().references('tag.id');
        table.integer('station_id').notNullable().references('station.id');
        table.string('unique_id').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.unique(['tag_id', 'unique_id']);
      });
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tag_station').then(function() {
    return knex.schema.dropTable('tag')
  }).then(function() {
    return knex.schema.dropTable('tag_station');
  });
};
