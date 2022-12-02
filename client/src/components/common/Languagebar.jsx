import React, { useEffect, useRef, useState } from 'react';
import GlobalContext from '../../shared/context/global-context';

const langList = [
    {
        code: 'en',
        lang: 'English',
    },
    {
        code: 'ch',
        lang: 'Chinese',
    },
];

const Languagebar = () => {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef();
    const toggle = () => {
        setMenu(!menu);
    }
    useEffect(() => {
        window.addEventListener('click', (ev) => {
            if(!menuRef.current.contains(ev.target)) {
                setMenu(false);
            }
        });
        return () => {
            window.removeEventListener('click', () => {});
        }
    }, [])
    return (
        <GlobalContext.Consumer>
        {
            value =>
            <div className='relative'>
                <button onClick={toggle} ref={menuRef}>{langList[value.langIndex].lang}</button>
                <div className={`${menu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} flex flex-col items-stretch bg-slate-100 border border-slate-300 top-10 absolute transition-all duration-300`}>
                {
                    langList.map((lang, index) => 
                        <button className='bg-slate-100 hover:bg-slate-200 transition-all p-2' key={lang.code} onClick={() => value.changeLang(index)}>{lang.lang}</button>
                    )
                }
                </div>
            </div>
        }
        </GlobalContext.Consumer>
    );
}

export default Languagebar;