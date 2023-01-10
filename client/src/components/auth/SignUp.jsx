import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../../actions/auth';

import { Link, useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import Card from '../common/Card';
import InputText from '../common/InputText';

const SignUp = ({register}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        address: '',
        name: '',
        email: ''
    });
    const {company, address, name, email} = formData;
    const onInputChange = (ev) => {
        setFormData({...formData, [ev.target.name]: ev.target.value})
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        register(formData, navigate);
    }
    return (
        <div className='h-screen bg-gradient-to-b from-sky-800 to-sky-600 flex items-center'>
            <Card title='SIGN UP'>
                <form onSubmit={onSubmit} className="flex flex-col">
                    <InputText type="text" name='company' value={company} onChange={onInputChange.bind(this)} placeholder='Company Name' />
                    <InputText type="text" name='address' value={address} onChange={onInputChange.bind(this)} placeholder='Company Address' />
                    <InputText type="text" name='name' value={name} onChange={onInputChange.bind(this)} placeholder='Contact Person'/>
                    <InputText type="email" name='email' value={email} onChange={onInputChange.bind(this)} placeholder='Email' />
                    <div className='flex items-center'>
                        <Link className='grow ml-2 underline text-sky-600' to="/login">Already have an account?</Link>
                        <Button>Sign Up</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

SignUp.propTypes = {
    register: PropTypes.func.isRequired
}

export default connect(null, {register})(SignUp);