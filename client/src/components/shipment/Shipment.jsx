import React from 'react';

import { useTranslation } from 'react-i18next';
import CustomNavLink from '../common/CustomNavLink';
import InputText from '../common/InputText';

const Shipment = () => {
    const {t} = useTranslation();
    return (
        <div className='pt-20 px-20'>
            <CustomNavLink className='float-left absolute' to="/simple-settings">{t('go_back')}</CustomNavLink>
            <div className='text-3xl w-1/2 text-center mx-auto my-10'>{t('shipment_settings_title')}</div>
            <div className='flex'>
                <div className='w-2/3 px-20 pt-10'>
                    <div className='flex items-center'>
                        <InputText className="grow" type="text" placeholder="Maximum Weight (kg)" />
                        <div>{`(${t('take_shipment_photo')})`}</div>
                    </div>
                    <div className='m-3'>{t('shipment_desc.0')}</div>
                    <div className='flex items-center w-full'>
                        <InputText className="w-1/3" placeholder={t('dimension_cm.length')} />X
                        <InputText className="w-1/3" placeholder={t('dimension_cm.width')} />X
                        <InputText className="w-1/3" placeholder={t('dimension_cm.height')} />
                    </div>
                    <div className='m-3'>{t('shipment_desc.1')}</div>
                    <div className='flex bg-slate-200 h-20'></div>
                </div>
                <div className='w-1/3 flex items-end justify-center'>
                    <div className='flex justify-center'><CustomNavLink to="/shipment-results" className='bg-slate-300 px-5 py-3'>{t('more_about_your_shipment')}</CustomNavLink></div>
                </div>
            </div>
        </div>
    );
}

export default Shipment;