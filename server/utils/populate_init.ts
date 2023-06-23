import { User, UsersCollection } from '/imports/api/users';

const populateInit = async () => {};

const defaultUsers: User [] 
    = [
        {fname: "Dino", lname: "Fabrello", position: "officer"},
        {fname: "Walter", lname: "Marangoni", position: "manager"},
        {fname: "Angelo", lname: "Ottogialli", position: "operator"}
    ]

const popInitUsers: (users: User [])=> void 
    = async (users = defaultUsers) => {
        UsersCollection.insertAsync(users);

};
const popInitTranslations = async () => {};

const bulkInsert: <T>(itemList: T[])=>void = () => {}

export default populateInit;