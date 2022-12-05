import React from 'react';
import { useTranslation } from 'react-i18next';

import CustomNavLink from '../common/CustomNavLink';

const results = [
    {
        title: 'Sky Transportation GmbH',
        route: 'Berlin-Leipzig-Numberg-Munich',
        date: 'Monday'
    },
    {
        title: 'Sky Transportation',
        route: 'Berlin-Leipzig-Numberg-Munich',
        date: 'Monday'
    },
    {
        title: 'Sky Transport',
        route: 'Berlin-Leipzig-Numberg-Munich',
        date: 'Monday'
    },
]

const Results = () => {
    const { t } = useTranslation();

    return (
        <div className='pt-20 px-20'>
            <CustomNavLink to="/shipment-settings">{t('go_back')}</CustomNavLink>
            <div className='text-3xl w-1/2 text-center mx-auto my-10'>{t('search_results')}</div>
            <div>
                <div className='flex justify-end'>
                    <button>Orderby</button>
                    <button>Filter</button>
                </div>
                <div>
                {
                    results.map(result => 
                        <div key={result.title} className='flex m-2'>
                            <div className='grow bg-slate-200 px-3 py-2 mr-2'>
                                <div>{result.title}
                                    <div className='float-right'>{result.date}</div>
                                </div>
                                <div>{result.route}</div>
                            </div>
                            <button className='bg-slate-200 px-3 py-2'>Ask for a quote</button>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    );
}

export default Results;