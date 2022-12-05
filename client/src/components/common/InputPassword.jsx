import React, {useState} from "react";

const InputPassword = (props) => {
    const [isVisible, setVisible] = useState(false)
    const toggle = () => {
      setVisible(!isVisible);
    };
  
    return (
      <div className="flex border-b border-b-sky-600 border-b-2 m-3 p-2">
        <input type={isVisible ? "text" : "password"} className='grow outline-0' name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
        <button className="hover:bg-slate-200 p-1 rounded-full" onClick={toggle}>
            <i className={`far ${!isVisible ? 'fa-eye-slash' : 'fa-eye'} text-sky-600`}></i>
        </button>
      </div>
    );

}
export default InputPassword