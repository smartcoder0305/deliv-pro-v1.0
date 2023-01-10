import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {v4 as uuid} from 'uuid';

import InputText from "../common/InputText";
import { useState } from "react";

import Button from "../common/Button";
import { addRoute } from "../../actions/delivery";
import Map from "../common/Map";
import GoogleMapInput from "../common/GoogleMapInput";

const Delivery = ({addRoute}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        route: '',
        contact: '',
        phone: '',
        date: '',
        vehi_type: '',
        vehi_reg: '',
        trip_name: ''
    })
    const [routes, setRoutes] = useState([]);
    const [routeNames, setRouteNames] = useState([]);
    const {route, contact, phone, date, vehi_type, vehi_reg, trip_name} = formData;
    const handleChange = (ev) => {
        setFormData({...formData, [ev.target.name]: ev.target.value})
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        addRoute({...formData, route: routes.map((value, index) => ({...value, address: routeNames[index]}))}, navigate);
    }
    const onSelect = (geometry, address) => {
        setRoutes([...routes, geometry]);
        setRouteNames([...routeNames, address]);
    }
    const deleteRouteName = (index) => {
        setRoutes(routes.slice(0, index).concat(routes.slice(index+1)));
        setRouteNames(routeNames.slice(0, index).concat(routeNames.slice(index+1)));
    }
    return(
        <div className="flex pt-24">
            <form className="w-1/3 flex flex-col mx-20" onSubmit={handleSubmit}>
                <div className="flex flex-wrap items-center">{
                    routeNames.length ?
                    routeNames.map((routeName, index) => (
                        <div key={uuid()} className="px-2 py-1 text-sm border border-slate-300 cursor-pointer my-2 select-none bg-white">
                            {routeName}<span className="border border-slate-300 px-1 ml-2 hover:bg-slate-300" onClick={() => deleteRouteName(index)}>x</span>
                        </div>
                    )).reduce((prev, cur) => [prev, '➡', cur])
                    : <></>
                }</div>
                <GoogleMapInput type='text' name='route' value={route} onChange={handleChange} placeholder='Route plan based on Google map' propRoutes={routes} onSelect={onSelect} />
                <InputText type="text" name='contact' value={contact} onChange={handleChange} placeholder='Contact Person' />
                <InputText type="text" name='phone' value={phone} onChange={handleChange} placeholder='Phone' />
                <InputText type="date" name='date' value={date} onChange={handleChange} placeholder='Planed Date and time(optional)' />
                <InputText type="text" name='vehi_type' value={vehi_type} onChange={handleChange} placeholder='Vehicle type' />
                <InputText type="text" name='vehi_reg' value={vehi_reg} onChange={handleChange} placeholder='Vehicle registration plate' />
                <InputText type="text" name='trip_name' value={trip_name} onChange={handleChange} placeholder='Trip name or code' />
                <div className='flex justify-end'>
                    <Button>SAVE</Button>
                </div>
            </form>
            <div className="flex w-2/3 justify-center pr-5">
                <Map locations={routes} zoom={7} />
            </div>
        </div>
    )
}

Delivery.propTypes = {
    addRoute: PropTypes.func.isRequired
};

export default connect(null, {addRoute})(Delivery);