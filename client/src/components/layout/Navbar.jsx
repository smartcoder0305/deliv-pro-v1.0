import react from 'react';
import NavLink from '../common/NavLink';
import Languagebar from '../common/Languagebar';

const Navbar = () => {
    return (
        <div className='flex p-4 w-full border-b-1 border-slate-500 absolute shadow-lg shadow-[rgba(0,0,0,0.2)]'>
            <div className='grow'>
                Logo
            </div>
            <div className='border-r-2 border-slate-500 pr-2'>
                <Languagebar />
            </div>
            <div>
                <NavLink to='/signin'>Log In</NavLink>
                <NavLink to='/signup'>Register</NavLink>
            </div>
        </div>
    );
}

export default Navbar