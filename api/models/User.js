/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {
  columnName: "user",
  
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },


    // Make sure the password is not used in JSON documents
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  // Hash the password before storing
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb(null, user);
        }
      })
    })
  },

  /**
    * Try to login with the given credentials and returns the User instance
    * for sucessful login
    */
  attemptLogin: function(inputs, cb) {
    User.findOne({
      username: inputs.username
    }, function(err, user) {
      if (err) {
        return cb(err, null);
      }

      if (!user) { // Username not found
        return cb(null, false, {
          message: 'Unknown user ' + inputs.username
        });
      }

      // finally check the password against the hash
      bcrypt.compare(inputs.password, user.password, function(err, res) {
        if (!res) {
          return cb(null, false, { message: 'Invalid Password' });
        }
        return cb(null, user, { message: 'Logged in Successfully' });
      });
    });
  }
};
