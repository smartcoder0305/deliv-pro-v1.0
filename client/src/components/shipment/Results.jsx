import React from 'react';
import { useTranslation } from 'react-i18next';

import CustomNavLink from '../common/CustomNavLink';

const Results = () => {
    const { t } = useTranslation();
    return (
        <div className='pt-20 px-20'>
            <CustomNavLink className='float-left' to="/shipment-settings">{t('go_back')}</CustomNavLink>
            Result!
        </div>
    );
}

export default Results;