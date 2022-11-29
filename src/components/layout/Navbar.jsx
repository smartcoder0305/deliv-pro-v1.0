import react from 'react';

const Navbar = () => {
    return (
        <div className='flex p-4 border-b border-b-1 border-slate-500'>
            <div className='grow'>
                Logo
            </div>
            <div>A, HanYu</div>
            <button>Log In</button>
        </div>
    );
}

export default Navbar