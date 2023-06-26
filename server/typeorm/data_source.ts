import { Meteor } from 'meteor/meteor';
import { DataSource } from 'typeorm'
import { TranslationsEntity } from './entities'
import { mysqlConnectionSettings } from '/imports/api/types'

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