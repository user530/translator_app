import React from 'react';
import {AppHeader, UsersTable} from '../components/';

const MainPage: React.FC = () => {
    return <>
        <main>
            <AppHeader main_heading='BabelShark TestCase' sub_heading='Meteor App'/>
            <UsersTable />
        </main>
    </>
}

export default MainPage;