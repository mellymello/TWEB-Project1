/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
    provider: 'local',
    role: 'prof',
    name: 'Prof',
    email: 'prof@mail.com',
    password: 'prof'
  }, {
    provider: 'local',
    role: 'student',
    name: 'Student',
    email: 'student@mail.com',
    password: 'student'
  }, {
    provider: 'local',
    role: 'both',
    name: 'Both',
    email: 'both@mail.com',
    password: 'both'
  }, function() {
      console.log('finished populating users');
    }
  );
});