import React from 'react'
import ReactCodeInput from 'react-code-input'
const Code = () => {
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
    return (
        <div className='flex justify-center mx-auto py-60'>
            <ReactCodeInput type = "number" fields={4} {...props} />
        </div>
    )
}
export default Code