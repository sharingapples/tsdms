'use strict';

var addStandardColumns = require('../addStandardColumns');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('data_source', function(table) {
    table.increments().primary();
    table.string('name').unique().notNullable();
    table.string('description');
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
      addStandardColumns(knex, table);
    }).then(function() {
      return knex.schema.createTable('daq_processor_parameter', function(table) {
        table.increments().primary();
        table.integer('daq_processor_id').notNullable().references('daq_processor.id');
        table.string('parameter').notNullable();
        table.string('value').notNullable();
        addStandardColumns(knex, table);
      });
    }).then(function() {
      return knex.schema.createTable('daq_processor_filter', function(table) {
        table.increments().primary();
        table.integer('daq_processor_id').notNullable().references('daq_processor.id');
        table.string('filter').notNullable();
        table.string('value').notNullable();
        addStandardColumns(knex, table);
      });
    }).then(function() {
      return knex.schema.createTable('daq_parser_parameter', function(table) {
        table.increments().primary();
        table.integer('daq_processor_id').notNullable().references('daq_processor.id');
        table.string('parameter').notNullable();
        table.string('value').notNullable();
        addStandardColumns(knex, table);
      });
    })
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
      table.string('origin_code').notNullable();
      table.string('parameter_code').notNullable();
      table.date('time').notNullable();
      table.float('value');
      table.integer('flag').notNullable();
      addStandardColumns(knex, table);
    }).then(function() {
      return knex.schema.createTable('origin_data', function(table) {
        table.increments().primary();
        table.integer('raw_data_id').notNullable().references('raw_data.id');
        table.integer('data_origin_parameter_id').notNullable().references('data_origin_parameter.id');
        table.integer('flag').notNullable();
        addStandardColumns(knex, table);
      })
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('origin_data').then(function() {
    return knex.schema.dropTable('raw_data');
  }).then(function() {
    return knex.schema.dropTable('request');
  }).then(function() {
    return Promise.all([
      knex.schema.dropTable('daq_parser_parameter'),
      knex.schema.dropTable('daq_processor_parameter'),
      knex.schema.dropTable('daq_processor_filter'),
    ]);
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
