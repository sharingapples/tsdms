'use strict';
var addStandardColumns = require('../addStandardColumns.js');

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
      addStandardColumns(knex, table);
    }).then(function() {
      return knex.schema.createTable('parameter_unit', function(table) {
        table.increments().primary();
        table.string('name').unique().notNullable();
        table.string('symbol').unique().notNullable();
        addStandardColumns(knex, table);
      }).then(function() {
        // Create some default parameter units for hydro meteorological use
        return Promise.all([
          knex('parameter_unit').insert({ id: 0, name: 'Blank', symbol: '' }),              // 0
          knex('parameter_unit').insert({ name: 'Celcius', symbol: '°C' }),                 // 1
          knex('parameter_unit').insert({ name: 'Millimeter', symbol: 'mm' }),              // 2
          knex('parameter_unit').insert({ name: 'Percent', symbol: '%' }),                  // 3
          knex('parameter_unit').insert({ name: 'Meter', symbol: 'm' }),                    // 4
          knex('parameter_unit').insert({ name: 'Kilometer per hour', symbol: 'kmph' }),    // 5
          knex('parameter_unit').insert({ name: 'Degree', symbol: '°' }),                   // 6
          knex('parameter_unit').insert({ name: 'cusec', symbol: 'm³/s' }),                 // 7
          knex('parameter_unit').insert({ name: 'millibar', symbol: 'mb' }),                // 8
          knex('parameter_unit').insert({ name: 'Watt per sq. meter', symbol: 'W/m²'}),     // 9
        ]);
      }).then(function(res) {
        return knex.schema.createTable('parameter_type', function(table) {
          table.increments().primary();
          table.string('name');
          table.integer('parameter_unit_id').notNullable().references('parameter_unit.id');
          addStandardColumns(knex, table);
        }).then(function() {
          // Create some default parameter types for hydro metorological use
          return Promise.all([
            knex('parameter_type').insert({ name: 'Air Temperature', parameter_unit_id: 1 }),
            knex('parameter_type').insert({ name: 'Rainfall', parameter_unit_id: 2 }),
            knex('parameter_type').insert({ name: 'Relative Humidity', parameter_unit_id: 3 }),
            knex('parameter_type').insert({ name: 'Wind Speed', 'parameter_unit_id': 5 }),
            knex('parameter_type').insert({ name: 'Wind Direction', 'parameter_unit_id': 6 }),
            knex('parameter_type').insert({ name: 'Pressure', 'parameter_unit_id': 8 }),
            knex('parameter_type').insert({ name: 'Water Level', 'parameter_unit_id': 4 }),
            knex('parameter_type').insert({ name: 'Discharge', 'parameter_unit_id': 7 }),
            knex('parameter_type').insert({ name: 'Solar Radiation', 'parameter_unit_id': 9})
          ]);
        });
      }).then(function() {
        return knex.schema.createTable('parameter', function(table) {
          table.increments().primary();
          table.string('code').unique().notNullable();
          table.string('name').notNullable();
          table.string('description');
          table.integer('parameter_type_id').notNullable().references('parameter_type.id');
          addStandardColumns(knex, table);
        });
      }).then(function() {
        return knex.schema.createTable('data_series', function(table) {
          table.increments().primary();
          table.integer('station_id').notNullable().references('station.id');
          table.enu('type', ['Primary', 'Aggregated', 'Derived']).notNullable();
          table.string('name').notNullable();
          table.integer('parameter_id').notNullable().references('parameter.id');
          table.integer('parameter_unit_id').notNullable().references('parameter_unit.id');
          table.integer('interval').notNullable();
          table.time('start_time').notNullable();
          table.integer('tolerance').notNullable();
          addStandardColumns(knex, table);
        });
      }).then(function() {
        return knex.schema.createTable('observation', function(table) {
          table.increments().primary();
          table.integer('data_series_id').notNullable().references('data_series.id');
          table.date('time').notNullable();
          table.float('value');
          table.integer('stage').notNullable();
          table.integer('quality').notNullable();
          addStandardColumns(knex, table);
        });
      });
    }),
    knex.schema.createTable('tag', function(table) {
      table.increments().primary();
      table.string('name').unique().notNullable();
      table.string('description');
      table.boolean('provides_uniqueness');
      table.boolean('starred');     // Seems unused at the moment
      addStandardColumns(knex, table);
    }),

    knex.schema.createTable('meta_data', function(table) {
      table.increments().primary();
      table.string('name').unique().notNullable();
      table.string('caption').notNullable();
      table.string('description');
      table.integer('regex');
      table.integer('seq');
      table.boolean('flagged');
      addStandardColumns(knex, table);
    }),

    knex.schema.createTable('resource', function(table) {
      table.increments().primary();
      table.string('name').unique().notNullable();
      table.integer('size').notNullable();
      table.integer('type').notNullable();
      table.string('description');
      addStandardColumns(knex, table);
    })
  ]).then(function() {
    // Then create all the dependent tables
    return Promise.all([
      knex.schema.createTable('tag_station', function(table) {
        table.increments().primary();
        table.integer('tag_id').notNullable().references('tag.id');
        table.integer('station_id').notNullable().references('station.id');
        table.string('unique_id').nullable();
        table.unique(['tag_id', 'unique_id']);
        addStandardColumns(knex, table);
      }),

      knex.schema.createTable('meta_data_option', function(table) {
        table.increments().primary();
        table.integer('meta_data_id').notNullable().references('meta_data.id');
        table.string('value').notNullable();
        table.string('text').notNullable();
        table.integer('seq');
        addStandardColumns(knex, table);
      }),
      knex.schema.createTable('station_meta_data', function(table) {
        table.increments().primary();
        table.integer('station_id').notNullable().references('station.id');
        table.integer('meta_data_id').notNullable().references('meta_data.id');
        table.string('value').notNullable();
        table.unique(['station_id', 'meta_data_id']);
        addStandardColumns(knex, table);
      }),

      knex.schema.createTable('station_resource', function(table) {
        table.integer('station_id').notNullable().references('station.id');
        table.integer('resource_id').notNullable().references('resource.id');
        table.primary(['station_id', 'resource_id']);
        addStandardColumns(knex, table);
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
    knex.schema.dropTable('observation').then(function() {
      return knex.schema.dropTable('data_series');
    })
  ]).then(function() {
    // Finally all the core tables
    return Promise.all([
      knex.schema.dropTable('parameter').then(function() {
        return knex.schema.dropTable('parameter_type').then(function() {
          return knex.schema.dropTable('parameter_unit');
        });
      }),
      knex.schema.dropTable('resource'),
      knex.schema.dropTable('meta_data'),
      knex.schema.dropTable('tag'),
      knex.schema.dropTable('station')
    ]);
  });
};
