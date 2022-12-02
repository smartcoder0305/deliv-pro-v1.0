import React from 'react';

const Card = (props) => {
    return (
        <div className='bg-white flex flex-col justify-center w-80 mx-auto px-5 py-5 rounded-lg shadow-lg shadow-[rgba(0,0,0,0.5)]'>
            <span className="border-b border-b-green-500 border-b-2 mx-auto font-bold text-xl tracking-[.25rem]">
                {props.title}
            </span>
            {props.children}
        </div>
    );
}

export default Card;