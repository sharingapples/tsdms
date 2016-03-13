'use strict';

exports.up = function(knex, Promise) {
  // First off create all the core tables
  return Promise.all([
    knex.schema.createTable('station', function(table) {
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
    }),

    knex.schema.createTable('tag', function(table) {
      table.increments().primary();
      table.string('name').unique().notNullable();
      table.string('description');
      table.boolean('provides_uniqueness');
      table.boolean('starred');     // Seems unused at the moment
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    }),

    knex.schema.createTable('meta_data', function(table) {
      table.increments().primary();
      table.string('name').unique().notNullable();
      table.string('caption').notNullable();
      table.string('description');
      table.integer('regex');
      table.integer('seq');
      table.boolean('flagged');
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    }),

    knex.schema.createTable('resource', function(table) {
      table.increments().primary();
      table.string('name').unique().notNullable();
      table.integer('size').notNullable();
      table.integer('type').notNullable();
      table.string('description');
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    })
  ]).then(function() {
    // Then create all the dependent tables
    return Promise.all([
      knex.schema.createTable('tag_station', function(table) {
        table.increments().primary();
        table.integer('tag_id').notNullable().references('tag.id');
        table.integer('station_id').notNullable().references('station.id');
        table.string('unique_id').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.unique(['tag_id', 'unique_id']);
      }),

      knex.schema.createTable('meta_data_option', function(table) {
        table.increments().primary();
        table.integer('meta_data_id').notNullable().references('meta_data.id');
        table.string('value').notNullable();
        table.string('text').notNullable();
        table.integer('seq');
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
      }),
      knex.schema.createTable('station_meta_data', function(table) {
        table.increments().primary();
        table.integer('station_id').notNullable().references('station.id');
        table.integer('meta_data_id').notNullable().references('meta_data.id');
        table.string('value').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.unique(['station_id', 'meta_data_id'])
      }),

      knex.schema.createTable('station_resource', function(table) {
        table.integer('station_id').notNullable().references('station.id');
        table.integer('resource_id').notNullable().references('resource.id');
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
        table.primary(['station_id', 'resource_id']);
      })
    ]);
  });
};

exports.down = function(knex, Promise) {
  // First drop all the table for which there are no dependencies
  return Promise.all([
    knex.schema.dropTable('tag_station'),
    knex.schema.dropTable('station_resource'),
    knex.schema.dropTable('meta_data_option'),
    knex.schema.dropTable('station_meta_data'),
  ]).then(function() {
    // Finally all the core tables
    return Promise.all([
      knex.schema.dropTable('resource'),
      knex.schema.dropTable('meta_data'),
      knex.schema.dropTable('tag'),
      knex.schema.dropTable('station')
    ]);
  });
};
