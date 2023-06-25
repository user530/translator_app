import React from 'react';
import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { User, UsersCollection } from '/imports/api/collections';
import { UserRow } from '../components';
import { useTranslator } from '../customHooks/translate';
import { useMutationObserver } from '../customHooks/mutator';

const UsersTable: React.FC = () => {
    const classSelector = '__t';
    const tableRef = React.useRef<HTMLTableElement>(null);

    // Vlasky subscription
    const isLoading: boolean = useSubscribe('allUsers')();
    const users: User[] = useFind<User>(() => UsersCollection.find());

    // Translator custom hook
    const {initTranslate, setInitTranslate, translate} = useTranslator();

    // Mutation observer custom hook
    const { isObserving, setIsObserving, startObserver, stopObserver } = useMutationObserver(
        classSelector, 
        async (elementsToMutate: (Element | Node)[]) => translate(elementsToMutate))

    React.useEffect(() => {
        // Array of elements with target class
        const initialElements: Element[] = Array.from(document.querySelectorAll(`.${classSelector}`));

        // Initial translation
        if (!initTranslate && initialElements.length > 0)
        {
            stopObserver();

            translate(initialElements);

            setInitTranslate(true);
        }

        // Checking ref target 
        const tableElement: HTMLTableElement | null = tableRef.current;

        // Restart observer if disabled
        if (tableElement && !isObserving) 
        {
            startObserver(tableElement);

            setIsObserving(true);
        }
    }, [users, isObserving])

    return (
    isLoading ? 
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