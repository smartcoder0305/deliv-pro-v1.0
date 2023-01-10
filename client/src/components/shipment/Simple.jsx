import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import Map from '../common/Map';

import GoogleMapInput from '../common/GoogleMapInput';
import { setFromTo } from '../../actions/search';
import { useEffect } from 'react';

const REACT_APP_GOOGLE_MAP_API_KEY = "AIzaSyBGMYzjoRqpTmgGRDT1j016yi8TeyjNGAo";

const Simple = ({search, setFromTo}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(true);
    const [formData, setFormData] = useState({
        from: '',
        to: ''
    });
    const {from, to} = formData;
    const [route, setRoute] = useState({...search});
    useEffect(() => {
        if(route.from) {
            axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${route.from.lat},${route.from.lng}&key=${REACT_APP_GOOGLE_MAP_API_KEY}`
            ).then(res => {
                if(res.data.status === 'OK') {
                    const tempFrom = res.data.results[0].address_components[0].short_name;
                    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${route.to.lat},${route.to.lng}&key=${REACT_APP_GOOGLE_MAP_API_KEY}`
                    ).then(res => {
                        if(res.data.status === 'OK') {
                            setFormData({from: tempFrom, to: res.data.results[0].address_components[0].short_name});
                        }
                    }).catch(err => {
                        console.log('Google map api error', err);
                    })
                }
            }).catch(err => {
                console.log('Google map api error', err);
            })
        }
    }, []);
    const fromAtoB = [route.from, route.to].filter((value) => !!value);
    const onFromSelect = (geometry, address) => {
        setRoute({...route, from: geometry});
    }
    const onToSelect = (geometry, address) => {
        setRoute({...route, to: geometry});
    }
    const handleChange = (ev) => {
        setFormData({...formData, [ev.target.name]: ev.target.value});
    }
    const gotoSearchDetail = () => {
        if(fromAtoB.length === 2) {
            setFromTo(route);
            navigate('/search-detail');
        }
    }
    return (
        <div className='h-screen pt-20 px-20 bg-gradient-to-b from-sky-800 to-sky-600 text-white'>
            <div className='text-3xl w-1/2 text-center mx-auto my-10'>{t('simple_settings_title')}</div>
            <div className='flex'>
                <div className='w-1/2 pr-1 py-10'>
                    <div>
                        <button className={`${business ? '' : 'text-sky-400'} m-3`} onClick={() => setBusiness(false)}>Private</button>
                        <button className={`${business ? 'text-sky-400' : ''} m-3`} onClick={() => setBusiness(true)}>Business</button>
                    </div>
                    <div className='flex items-center'>
                        <GoogleMapInput type="text" name='from' value={from} onChange={handleChange} placeholder="From" onSelect={onFromSelect} />
                        <div>{`(${t('search_from_google_map')})`}</div>
                    </div>
                    <div className='flex items-center'>
                        <GoogleMapInput type="text" name='to' value={to} onChange={handleChange} placeholder="To" onSelect={onToSelect} />
                        <div>{`(${t('search_from_google_map')})`}</div>
                    </div>
                    <div className='flex justify-center'>
                        <Button onClick={gotoSearchDetail}>{t('more_about_your_shipment')}</Button>
                    </div>
                </div>
                <div className='w-1/2 h-96'>
                    <Map locations={fromAtoB} zoom={8} />
                </div>
            </div>
        </div>
    );
}

Simple.propTypes = {
    setFromTo: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    search: state.search
});

export default connect(mapStateToProps, {setFromTo})(Simple);