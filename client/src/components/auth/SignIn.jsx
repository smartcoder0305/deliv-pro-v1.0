import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';
import InputPassword from '../common/InputPassword';
import InputText from '../common/InputText';

import { login } from '../../actions/auth';

const SignIn = ({login, auth: {isAuthenticated}}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {email, password} = formData;
    const onInputChange = (ev) => {
        setFormData({...formData, [ev.target.name]: ev.target.value})
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        login(formData, navigate);
    }
    if(isAuthenticated) {
        return <Navigate to='/search' />
    }
    return (
        <div className='h-screen bg-gradient-to-b from-sky-800 to-sky-600 flex items-center'>
            <Card title='SIGN IN'>
                <form onSubmit={onSubmit} className="flex flex-col">
                    <InputText type="text" name='email' value={email} onChange={onInputChange.bind(this)} placeholder='Email' />
                    <InputPassword type="password" name='password' value={password} onChange={onInputChange.bind(this)} placeholder='Password'/>
                    <div className='flex items-center'>
                        <Link className='grow ml-2 underline text-sky-600' to="/signup">Don't have an account yet?</Link>
                        <Button>Sign In</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

SignIn.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { login })(SignIn);