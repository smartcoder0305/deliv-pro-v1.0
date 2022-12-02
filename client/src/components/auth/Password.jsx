import { isVisible } from '@testing-library/user-event/dist/utils'
import React, { useState } from 'react'
import InputPassword from '../common/InputPassword'
import Button from '../common/Button'

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
        <form className='mt-20 justify-center border border-slate-300 w-80 mx-auto my-auto px-5 py-7' onSubmit={onSubmit}>
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
                <Button className='bg-slate-300 hover:bg-slate-100'>SignUp</Button>
            </div>
        </form>
    )
}
export default Password