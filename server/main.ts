import { Meteor } from 'meteor/meteor';
import { LiveMysql } from "meteor/vlasky:mysql";
import { callMyMethod, registerMyMethods } from '/imports/api/helpers';
import { mysqlConnectionSettings } from '/imports/api/types';

Meteor.startup(async () => {
  // Establish DB config using Vlasky:mysql using settings from the file
  const dbConfig: mysqlConnectionSettings = Meteor.settings.mysql;
  const liveDb: LiveMysql = new LiveMysql(dbConfig);

  // Publish users data for meteor subscription
  Meteor.publish('allCustomers', function () {
    return liveDb.select(
      `SELECT c.id, c.fname, c.lname, p.name AS position 
      FROM customers AS c 
      INNER JOIN positions AS p 
      ON c.position_id = p.id ORDER BY c.id`,
      null,
      LiveMysql.LiveMysqlKeySelector.Index(),
      [{ table: 'customers' }, { table: 'positions' }]
    )
  })

  // Register my methods
  registerMyMethods();

  // Initialize typeorm
  callMyMethod('typeormInit');
});