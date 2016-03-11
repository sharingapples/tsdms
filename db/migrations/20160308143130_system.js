'use strict';
var User = require('../../api/models/User');

exports.up = function(knex, Promise) {
  // First create all the independent tables
  return Promise.all([
    knex.schema.createTable('user', function(table) {
      table.increments().primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('designation').nullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    }).then(function() {
      // Add a super admin user with default configuration
      return new Promise(function(resolve, reject) {
        User.beforeCreate({
          username: 'admin',
          password: 'Adm1n1str@t0R',
          name: 'Administrator',
          email: 'admin@localhost',
          designation: 'Data Administrator'
        }, function(err, user) {
          if (err) {
            reject(err);
          }
          resolve(knex('user').insert(user));
        });
      })
    }),
    knex.schema.createTable('group', function(table) {
      table.increments().primary();
      table.string('name').unique().notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    })
  ]).then(function() {
    // Create the dependent tables
    return Promise.all([
      knex.schema.createTable('user_group', function(table) {
        table.integer('user_id').notNullable().references('id').inTable('user');
        table.integer('group_id').notNullable().references('id').inTable('group');
        table.primary(['user_id', 'group_id']);
      })
    ])
  });
};

exports.down = function(knex, Promise) {
  // First drop all the dependent tables
  return Promise.all([
    knex.schema.dropTable('user_group')
  ]).then(function() {
    // Drop all the independent tables
    knex.schema.dropTable('group'),
    knex.schema.dropTable('user')
  });
};
