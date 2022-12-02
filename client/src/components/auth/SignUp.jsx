import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';
import InputText from '../common/InputText';

const SignUp = () => {
    const [formValues, setFormValues] = useState({
        companyname: '',
        companyaddr: '',
        contactperson: '',
        email: ''
    });
    const onInputChange = (ev) => {
        setFormValues({...formValues, [ev.target.name]: ev.target.value})
    }
    return (
        <div className='h-screen bg-gradient-to-b from-lime-400 to-green-500 flex items-center'>
            <Card title='SIGN UP'>
                <InputText type="text" name='companyname' value={formValues.companyname} onChange={onInputChange.bind(this)} placeholder='Company Name' />
                <InputText type="text" name='companyaddr' value={formValues.companyaddr} onChange={onInputChange.bind(this)} placeholder='Company Address' />
                <InputText type="text" name='contactperson' value={formValues.contactperson} onChange={onInputChange.bind(this)} placeholder='Contact Person'/>
                <InputText type="email" name='email' value={formValues.email} onChange={onInputChange.bind(this)} placeholder='Email' />
                <div className='flex items-center'>
                    <Link className='grow ml-2 underline text-green-900' to="/signin">Go to Login</Link>
                    <Button>Sign Up</Button>
                </div>
            </Card>
        </div>
    );
}

export default SignUp;