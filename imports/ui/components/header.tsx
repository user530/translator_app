import React from 'react';

interface IAppHeader {
    main_heading: string;
    sub_heading: string;
}

const AppHeader: React.FC<IAppHeader> = ({main_heading, sub_heading}: IAppHeader) => {
    return (
    <>
        <h1>{main_heading}</h1>
        <h2>{sub_heading}</h2>
    </>
    )
};

export default AppHeader;

