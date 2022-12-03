import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import CustomNavLink from '../common/CustomNavLink';
import InputText from '../common/InputText';

const Simple = () => {
    const { t } = useTranslation();
    const [active, setActive] = useState(true);
    return (
        <div className='pt-20 px-20'>
            <div className='text-3xl w-1/2 text-center mx-auto my-10'>{t('simple_settings_title')}</div>
            <div className='flex'>
                <div className='w-2/3 px-20 py-10'>
                    <div>
                        <button className={`${active ? 'text-sky-400' : ''} m-3`} onClick={() => setActive(true)}>Private</button>
                        <button className={`${active ? '' : 'text-sky-400'} m-3`} onClick={() => setActive(false)}>Business</button>
                    </div>
                    <div className='flex items-center'>
                        <InputText className="grow" type="text" placeholder="From" />
                        <div>{`(${t('search_from_google_map')})`}</div>
                    </div>
                    <div className='flex items-center'>
                        <InputText className="grow" type="text" placeholder="To" />
                        <div>{`(${t('search_from_google_map')})`}</div>
                    </div>
                </div>
                <div className='w-1/3 bg-black'></div>
            </div>
            <div className='flex justify-center'><CustomNavLink to="/shipment-settings" className='bg-slate-300 px-5 py-3 m-10'>{t('more_about_your_shipment')}</CustomNavLink></div>
        </div>
    );
}

export default Simple;