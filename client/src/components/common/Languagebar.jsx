import React, { useEffect, useRef, useState } from 'react';
import i18next from 'i18next';

import { useTranslation } from 'react-i18next';

const Languagebar = () => {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef();
    const { t } = useTranslation();
    const toggle = () => {
        setMenu(!menu);
    }
    useEffect(() => {
        const handleGlobalClick = (ev) => {
            if(ev.target !== menuRef.current) {
                setMenu(false);
            }
        };
        window.addEventListener('click', handleGlobalClick);
        return () => {
            window.removeEventListener('click', handleGlobalClick);
        }
    }, [])
    return (
        <div className='relative'>
            <button onClick={toggle} ref={menuRef}>{t('language')}</button>
            <div className={`${menu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} flex flex-col items-stretch bg-slate-100 border border-slate-300 top-10 absolute transition-all duration-300 w-24`}>
                <button className='bg-slate-100 hover:bg-slate-200 transition-all p-2' onClick={() => i18next.changeLanguage('en')}>{t('english')}</button>
                <button className='bg-slate-100 hover:bg-slate-200 transition-all p-2' onClick={() => i18next.changeLanguage('ch')}>{t('chinese')}</button>
            </div>
        </div>
    );
}

export default Languagebar;