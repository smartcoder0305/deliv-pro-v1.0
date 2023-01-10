import React from 'react';
import { Link } from 'react-router-dom';

const CustomNavLink = (props) => {
    return (
        <Link className={`mx-2 p-1 border-b-2 border-b-transparent hover:border-b-2 hover:border-b-sky-600 transition-all ease-in-out duration-100 ${props.className || ''}`} to={props.to} onClick={props.onClick}>{props.children}</Link>
    );
}

export default CustomNavLink;