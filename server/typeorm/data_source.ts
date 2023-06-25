import { Meteor } from 'meteor/meteor';
import { mysqlConnectionSettings } from 'meteor/vlasky:mysql';
import { DataSource } from 'typeorm'
import { TranslationsEntity } from './entities'

const dbConfig: mysqlConnectionSettings = Meteor.settings.mysql;
const { host, port, user: username, password, database } = dbConfig;

export const myDataSource = new DataSource({
    type: 'mysql',
    host,
    port,
    username,
    password,
    database,
    entities: [
        TranslationsEntity
    ],
})