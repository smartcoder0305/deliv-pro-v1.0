import React, { useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactCodeInput from 'react-code-input';
import Button from '../common/Button';
import Card from '../common/Card';
import { setAlert } from '../../actions/alert';
import { verify } from '../../actions/auth';
import { useNavigate, Navigate } from 'react-router-dom';
const props = {
    inputStyle: {
        fontFamily: 'monospace',
        margin:  '4px',
        MozAppearance: 'textfield',
        width: '40px',
        fontSize: '14px',
        height: '26px',
        paddingLeft: '7px',
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid black',
        outline: 'none',
      },
    inputStyleInvalid: {
        fontFamily: 'monospace',
        margin:  '4px',
        MozAppearance: 'textfield',
        width: '40px',
        fontSize: '14px',
        height: '26px' ,
        paddingLeft: '7px',
        backgroundColor: 'black',
        color: 'red',
        border: '1px solid red'
    }  
}
const Code = ({ verify, setAlert, verified }) => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const handleChange = (value) => {
        setCode(value);
    }
    const onConfirm = (ev) => {
        ev.preventDefault();
        if(code.trim().length !== 4) {
            setAlert('Please enter the full code', 'danger');
            return;
        }
        verify(code, navigate);
    }
    return (verified ?
            <Navigate to="/search" />
            :
            <div className='h-screen bg-gradient-to-b from-sky-800 to-sky-600 flex items-center justify-center'>
                <Card title="Verification code">
                    <form onSubmit={onConfirm} className='flex flex-col items-center'>
                        <ReactCodeInput className='py-10 mx-auto' type = "text" fields={4} {...props} value={code} onChange={handleChange} />
                        <Button>Confirm</Button>
                    </form>
                </Card>
            </div>
    )
}

Code.propTypes = {
    setAlert: PropTypes.func.isRequired,
    verify: PropTypes.func.isRequired,
    verified: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    verified: state.auth?.user?.verified
});

export default connect(mapStateToProps, { verify, setAlert })(Code);