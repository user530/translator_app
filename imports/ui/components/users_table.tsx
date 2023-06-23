import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { User, UsersCollection } from '/imports/api/users';
import { UserRow } from '../components';

const UsersTable: React.FC = () => {
    const isLoading: ()=>boolean = useSubscribe('allUsers');
    const users: User[] = useFind<User>(() => UsersCollection.find());

    const tableRef = React.useRef<HTMLTableElement>(null);

    return (
    isLoading() ? 
    <div> Loading...</div> :
    <div>
        <table ref={tableRef}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Position</th>
            </tr>
            </thead>

            <tbody>
            {users.map(
                (user: User) => <UserRow key={user.id} {...user} />
            )}
            </tbody>
        </table>
    </div>);
};

export default UsersTable;