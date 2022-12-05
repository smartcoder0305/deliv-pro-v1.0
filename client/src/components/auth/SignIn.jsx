import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Card from '../common/Card';
import InputPassword from '../common/InputPassword';
import InputText from '../common/InputText';

const SignIn = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const onInputChange = (ev) => {
        setFormValues({...formValues, [ev.target.name]: ev.target.value})
    }
    return (
        <div className='h-screen bg-gradient-to-b from-sky-800 to-sky-600 flex items-center'>
            <Card title='SIGN IN'>
                <InputText type="text" name='email' value={formValues.email} onChange={onInputChange.bind(this)} placeholder='Email' />
                <InputPassword type="password" name='password' value={formValues.password} onChange={onInputChange.bind(this)} placeholder='Contact Person'/>
                <div className='flex items-center'>
                    <Link className='grow ml-2 underline text-sky-600' to="/signup">Go to Register</Link>
                    <Button>Sign In</Button>
                </div>
            </Card>
        </div>
    );
}

export default SignIn;