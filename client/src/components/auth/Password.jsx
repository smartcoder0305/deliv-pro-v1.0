
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import InputPassword from '../common/InputPassword'
import Button from '../common/Button';
import Card from '../common/Card';

import { setpassword } from '../../actions/auth';

const Password = ({setpassword}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmpassword: ''
    })
    const {password, confirmpassword} = formData;
    const handleChange = (ev) => {
        setFormData({...formData, [ev.target.name]: ev.target.value});
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        setpassword(formData, navigate);
    }
    return(
        <div className='h-screen bg-gradient-to-b from-sky-800 to-sky-600 flex items-center'>
            <Card title="Input Password">
                <form onSubmit={onSubmit}>
                    <InputPassword name="password" placeholder="Enter password" value={password} onChange={handleChange} />
                    <InputPassword name="confirmpassword" placeholder="Confirm password" value={confirmpassword} onChange={handleChange} />
                    <div className='flex flex-col items-center'>
                        <Button className='bg-slate-300 hover:bg-slate-100'>Save</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

Password.propTypes = {
    // isAuthenticated: PropTypes.bool.isRequired,
    setpassword: PropTypes.func.isRequired
}

// const mapStateToProps = (state) => ({
//     isAuthenticated: state.auth.isAuthenticated
// });

export default connect(null, { setpassword })(Password);