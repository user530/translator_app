import {Mongo} from "meteor/mongo"

export interface User {
    id?: number;
    fname: string;
    lname: string;
    position: string;
}

export const UsersCollection = new Mongo.Collection<User>("allUsers");