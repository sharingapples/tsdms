'use strict';
var User = require('../../api/models/User');

exports.up = function(knex, Promise) {

    // Create the user table
    return knex.schema.createTable('user', function(table) {
      table.increments().primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('designation').nullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    }).then(function() {
      // Insert the super admin user
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
    }).then(function() {
      return knex.schema.createTable('group', function(table) {
        table.increments().primary();
        table.string('name').unique().notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
      });
    }).then(function() {
      return knex.schema.createTable('user_group', function(table) {
        table.integer('user_id').notNullable().references('id').inTable('user');
        table.integer('group_id').notNullable().references('id').inTable('group');
        table.primary(['user_id', 'group_id']);
      });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_group').then(function() {
    return knex.schema.dropTable('user');
  }).then(function() {
    return knex.schema.dropTable('group');
  });
};
