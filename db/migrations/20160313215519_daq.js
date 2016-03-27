'use strict';

var addStandardColumns = require('../addStandardColumns');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('data_source', function(table) {
    table.increments().primary();
    table.string('name').unique().notNullable();
    table.string('description');
    table.text('attributes');
    addStandardColumns(knex, table);
  }).then(function() {
    return knex.schema.createTable('data_source_parameter', function(table) {
      table.increments().primary();
      table.integer('data_source_id').notNullable().references('data_source.id');
      table.integer('parameter_id').notNullable().references('parameter.id');
      table.string('code').notNullable();
      table.integer('parameter_unit_id').notNullable().references('parameter_unit.id');
      addStandardColumns(knex, table);
    });
  }).then(function() {
    return knex.schema.createTable('data_origin', function(table) {
      table.increments().primary();
      table.integer('data_source_id').notNullable().references('data_source.id');
      table.string('code').notNullable();
      table.string('timezone').notNullable();
      table.text('options');
      table.unique(['data_source_id', 'code']);
      addStandardColumns(knex, table);
    })
  }).then(function() {
    return knex.schema.createTable('station_data_origin', function(table) {
      table.increments().primary();
      table.integer('station_id').notNullable().references('station.id');
      table.integer('data_origin_id').notNullable().references('data_origin.id');
      table.date('installed').notNullable();
      table.date('removed');
      addStandardColumns(knex, table);
    });
  }).then(function() {
    return knex.schema.createTable('data_origin_parameter', function(table) {
      table.increments().primary();
      table.integer('data_origin_id').notNullable().references('data_origin.id');
      table.string('code').notNullable();
      table.integer('parameter_id').notNullable().references('parameter.id');
      table.integer('parameter_unit_id').notNullable().references('parameter_unit.id');
      table.boolean('is_diagnostic');
      table.unique(['data_origin_id', 'code']);
      addStandardColumns(knex, table);
    })
  }).then(function() {
    return knex.schema.createTable('daq_processor', function(table) {
      table.increments().primary();
      table.integer('data_source_id').notNullable().references('data_source.id');
      table.string('protocol').notNullable();
      table.string('parser').notNullable();
      table.text('protocol_filter').notNullable();
      table.text('parser_parameters').notNullable();
      addStandardColumns(knex, table);
    });
  }).then(function() {
    return knex.schema.createTable('request', function(table) {
      table.increments().primary();
      table.integer('daq_processor_id').notNullable().references('daq_processor.id');
      table.string('payload').notNullable();
      table.boolean('payload_is_file').notNullable();
      addStandardColumns(knex, table);
    });
  }).then(function() {
    return knex.schema.createTable('raw_data', function(table) {
      table.increments().primary();
      table.integer('request_id').notNullable().references('request.id');
      table.integer('data_origin_parameter_id').notNullable().references('data_origin_parameter.id');
      table.string('origin_code').notNullable();
      table.string('parameter_code').notNullable();
      table.date('time').notNullable();
      table.float('value');
      table.integer('flag').notNullable();
      addStandardColumns(knex, table);
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('raw_data').then(function() {
    return knex.schema.dropTable('request');
  }).then(function() {
    return knex.schema.dropTable('daq_processor');
  }).then(function() {
    return knex.schema.dropTable('data_origin_parameter');
  }).then(function() {
    return knex.schema.dropTable('station_data_origin');
  }).then(function() {
    return knex.schema.dropTable('data_origin');
  }).then(function() {
    return knex.schema.dropTable('data_source_parameter');
  }).then(function() {
    return knex.schema.dropTable('data_source');
  });
};
