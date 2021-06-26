import React from 'react';
import './ButtonCustom.css'
const ButtonCustom = props => {
    return (
        <div className="div-button">
            <button>{props.value}</button>
        </div>
    );
}

export default ButtonCustom;
