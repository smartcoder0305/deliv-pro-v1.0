import react from 'react';
import CustomNavLink from '../common/CustomNavLink';
import Languagebar from '../common/Languagebar';

import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation();
    return (
        <div className='border-box bg-white flex p-4 w-full border-b-1 border-slate-500 absolute shadow-lg shadow-[rgba(0,0,0,0.2)]'>
            <div className='grow'>
                Logo
            </div>
            <div className='border-r-2 border-slate-500 pr-2 flex items-center'>
                <CustomNavLink to="/simple-settings">{t('search')}</CustomNavLink>
                <Languagebar />
            </div>
            <div className='flex items-center'>
                <CustomNavLink to='/signin'>{t('log_in')}</CustomNavLink>
                <CustomNavLink to='/signup'>{t('register')}</CustomNavLink>
            </div>
        </div>
    );
}

export default Navbar