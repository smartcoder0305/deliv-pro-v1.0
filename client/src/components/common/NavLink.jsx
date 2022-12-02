import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
    return (
        <Link className='mx-2 p-1 hover:border-b-2 hover:border-b-green-400 transition-all ease-in-out duration-100' to={props.to}>{props.children}</Link>
    );
}

export default NavLink;