import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import CustomNavLink from '../common/CustomNavLink';
import InputText from '../common/InputText';

import { setAlert } from '../../actions/alert';
import { searchDeliveries, setShipmentDetail } from '../../actions/search';

const Shipment = ({search, setAlert, setShipmentDetail, searchDeliveries}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        weight: '',
        length: '',
        width: '',
        height: '',
    })
    if(search && !(search.from && search.to)) {
        setAlert('You have to confirm route first', 'danger');
        return <Navigate to='/search' />
    }
    const {weight, length, width, height} = formData;
    const onChange = (ev) => {
        setFormData({...formData, [ev.target.name]: ev.target.value});
    }
    const handleSubmit = () => {
        setShipmentDetail({weight, size: {
            length, width, height
        }});
        searchDeliveries({from: search.from, to: search.to});
        navigate('/search-results');
    }
    return (
        <div className='h-screen pt-20 px-20 bg-gradient-to-b from-sky-800 to-sky-600 text-white'>
            <CustomNavLink to={`/search`}>{t('go_back')}</CustomNavLink>
            <div className='text-3xl w-1/2 text-center mx-auto my-10'>{t('shipment_settings_title')}</div>
            <div className='flex'>
                <div className='w-2/3 px-20 pt-10'>
                    <div className='flex items-center'>
                        <InputText className="grow" type="text" name='weight' value={weight} placeholder="Maximum Weight (kg)" onChange={onChange} />
                        <div>{`(${t('take_shipment_photo')})`}</div>
                    </div>
                    <div className='m-3'>{t('shipment_desc.0')}</div>
                    <div className='flex items-center w-full'>
                        <InputText className="w-1/3" name='length' value={length} placeholder={t('dimension_cm.length')} onChange={onChange} />X
                        <InputText className="w-1/3" name='width' value={width} placeholder={t('dimension_cm.width')} onChange={onChange} />X
                        <InputText className="w-1/3" name='height' value={height} placeholder={t('dimension_cm.height')} onChange={onChange} />
                    </div>
                    <div className='m-3'>{t('shipment_desc.1')}</div>
                    <div className='flex bg-slate-200 h-20'></div>
                </div>
                <div className='w-1/3 flex flex-col'>
                    <div className='grow bg-center' style={{backgroundImage: `url(${require('./delivery_guy.jpg')}`}}></div>
                    <Button className='bg-slate-300 px-5 py-3 mt-1' onClick={handleSubmit}>{t('search')}</Button>
                </div>
            </div>
        </div>
    );
}

Shipment.propTypes = {
    setAlert: PropTypes.func.isRequired,
    setShipmentDetail: PropTypes.func.isRequired,
    searchDeliveries: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    search: state.search
});

export default connect(mapStateToProps, {setAlert, setShipmentDetail, searchDeliveries})(Shipment);