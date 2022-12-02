import React from 'react';

const InputText = (props) => {
    return (
        <input type={props.type} className='border-b border-b-green-300 border-b-2 outline-0 m-3 p-2' name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
    );
}

export default InputText;