import { Meteor } from 'meteor/meteor';
import { LiveMysql, mysqlConnectionSettings } from "meteor/vlasky:mysql";
import { callMyMethod, registerMyMethods } from '/imports/api/helpers';

Meteor.startup(async () => {
  // Establish DB config using Vlasky:mysql using settings from the file
  const dbConfig: mysqlConnectionSettings = Meteor.settings.mysql;
  const liveDb: LiveMysql = new LiveMysql(dbConfig);

  // Publish users data for meteor subscription
  Meteor.publish('allUsers', function () {
    return liveDb.select(
      `SELECT * FROM users`,
      null,
      LiveMysql.LiveMysqlKeySelector.Index(),
      [{ table: 'users' }]
    )
  })

  // Register my methods
  registerMyMethods();

  // Initialize typeorm
  callMyMethod('typeormInit');
});
