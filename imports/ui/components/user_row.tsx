import React from 'react';
import { User } from '/imports/api/collections';

interface IUserRow extends User {};

const UserRow: React.FC<IUserRow> = ({id, fname, lname, position}: IUserRow) => {
    return <>
        <tr>
            <td>{id}</td>
            <td>{`${fname} ${lname}`}</td>
            <td className='__t'>{position}</td>
        </tr>
    </>
};

export default UserRow;