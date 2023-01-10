import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CustomNavLink from '../common/CustomNavLink';

const Results = ({results}) => {
    const { t } = useTranslation();

    return (
        <div className='h-screen pt-20 px-20 text-white bg-center bg-cover' style={{
            background: `linear-gradient(to bottom, rgba(2,11,34,0.7), rgba(0,1,92,0.3)), url(${require('../../delivery-bg.jpg')}) no-repeat center`,
            backgroundSize: 'cover'
        }}>
            <CustomNavLink to="/search-detail">{t('go_back')}</CustomNavLink>
            <div className='text-3xl w-1/2 text-center mx-auto my-10'>{t('search_results')}</div>
            <div>
                <div className='flex justify-end'>
                    <button>Orderby</button>
                    <button>Filter</button>
                </div>
                <div>
                {
                    results.map(result => 
                        <div key={result._id} className='flex m-2 text-black'>
                            <div className='grow bg-blue-700 text-white p-8 mr-2'>
                                <div className='flex items-center mb-2'>
                                    <p className='grow text-4xl'>{result.trip_name}</p>
                                    <p>{new Date(result.date).toISOString().split('T')[0]}</p>
                                </div>
                                <div className='text-lg'>{result.route.reduce((prev, cur) => `${prev.address || prev} ➡ ${cur.address}`)}</div>
                            </div>
                            <button className='bg-blue-700 text-white px-3 py-2'>Ask for a quote</button>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    );
}

Results.propTypes = {
    results: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    results: state.search.results
});

export default connect(mapStateToProps, {})(Results);