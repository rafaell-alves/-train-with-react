import React from 'react';
import './InputType.css'

const InputText = props => {
    return (
        <div className="InputStyle">
            
            <i class="fa fa-user" aria-hidden="true"></i> <input name="username"type="text" placeholder={props.placeholder}/>
        </div>
    );
}

const Password = props =>{
    return(
    <div className="InputStylePass">
       <i class="fa fa-lock" aria-hidden="true"></i><input name="password"  type="password" placeholder={props.placeholder}></input>
    </div>);
}

const Email = props =>{
    return(
    <div className="InputStyleEmail">
       <i class="fa fa-envelope" aria-hidden="true"></i><input name="email"  type="text" placeholder={props.placeholder}></input>
    </div>);
}

InputText.Password = Password;
InputText.Email = Email

export default InputText;
