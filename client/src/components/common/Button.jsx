import React from 'react';

const Button = (props) => {
    return (
        <button className='bg-gradient-to-r from-sky-800 to-sky-600 px-4 py-2 rounded-full text-white shadow-md shadow-[rgba(0,0,0,0.3)] hover:shadow-[rgba(0,0,0,0.7)] active:shadow-none transition-all ease-in-out'>{props.children}</button>
    )
}

export default Button;