import { isVisible } from '@testing-library/user-event/dist/utils'
import React, { useState } from 'react'
import InputPassword from '../common/InputPassword'
import Button from '../common/Button'
import Card from '../common/Card'

const Password = () => {
    const [user, setUser] = useState({
        password: '',
        repassword: ''
    })
    const [show_input, setVisible] = useState(false)
    const handleChange = (ev) => setUser({
        ...user,
        [ev.target.name]: ev.target.value
    })
    const handleClick = () =>{
        setVisible(!show_input)
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
    }
    return(
        <div className='h-screen bg-gradient-to-b from-sky-800 to-sky-600 flex items-center'>
            <Card title="Input Password">
                <div className='flex justify-center py-3'>
                    {/* <input type={show_input?'text':'password'}
                        className="form-input border border-slate-400"
                        name="password"
                        value={user.password}
                        placeholder='password'
                        onChange={handleChange}
                    /> */}
                    <InputPassword name="password" />
                </div>
                <div className='flex justify-center py-3'>
                    <InputPassword name="repassword" />
                    {/* <input type={show_input?'text':'password'}
                        className="form-input border border-slate-400"
                        name="repassword"
                        placeholder='confirm password'
                        value={user.repassword}
                        onChange={handleChange}
                    /> */}
                </div>
                <div className='flex flex-col items-center'>
                    <Button className='bg-slate-300 hover:bg-slate-100'>Save</Button>
                </div>
            </Card>
        </div>
    )
}
export default Password