import { Meteor } from 'meteor/meteor';
import { LiveMysql, mysqlConnectionSettings } from "meteor/vlasky:mysql";
import { UsersCollection, User } from '/imports/api/collections';
import * as methods from '/imports/api/methods';

// async function insertLink({ title, url }: Pick<Link, 'title' | 'url'>) {
//   await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
// }

Meteor.startup(async () => {
  // // If collection is empty, add some placeholder data.
  // if (await UsersCollection.find().countAsync() === 0) {
  //   await insertLink({
  //     title: 'Do the Tutorial',
  //     url: 'https://www.meteor.com/tutorials/react/creating-an-app',
  //   });

  //   await insertLink({
  //     title: 'Follow the Guide',
  //     url: 'https://guide.meteor.com',
  //   });

  //   await insertLink({
  //     title: 'Read the Docs',
  //     url: 'https://docs.meteor.com',
  //   });

  //   await insertLink({
  //     title: 'Discussions',
  //     url: 'https://forums.meteor.com',
  //   });
  // }

  // // We publish the entire Links collection to all clients.
  // // In order to be fetched in real-time to the clients
  // Meteor.publish("links", function () {
  //   return LinksCollection.find();
  // });

  // Establish DB config using Vlasky:mysql using settings from the file
  const dbConfig: mysqlConnectionSettings = Meteor.settings.mysql;
  const liveDb: LiveMysql = new LiveMysql(dbConfig);

  Meteor.publish('allUsers', function () {
    return liveDb.select(
      `SELECT * FROM users`,
      null,
      LiveMysql.LiveMysqlKeySelector.Index(),
      [{ table: 'users' }]
    )
  })

  Meteor.methods({
    'typeormInit': methods.typeormInit,
    'getTranslations': methods.getTranslations
  })

  Meteor.call('typeormInit');
});
