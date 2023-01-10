import React from 'react';

const Loading = () => {
    return (
        <div className='flex'>
            <span className="flex absolute h-4 w-4 top-1/2 left-1/2 -ml-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
            </span>
            <span className="flex absolute h-4 w-4 top-1/2 left-1/2 -ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 animation-delay-150"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
            </span>
            <span className="flex absolute h-4 w-4 top-1/2 left-1/2 ml-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 animation-delay-150"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
            </span>
        </div>
    );
}

export default Loading;