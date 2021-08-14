import React from 'react';

/**
 * Elemento boton comun
 * @param {{imgSrc: String, btnText: String, action: Function, addClass: String}} props 
 * @returns {JSX.Element} Boton
 */
const Button = ( props ) => {
    const {imgSrc = null, btnText = "", action = () => {}, addClass = ""} = props;
    const placeholder = process.env.REACT_APP_PLACEHOLDER;
    
    const btnAction = () => {
        action();
    }

    const classString = `${addClass} ${btnText? "button": 'icon-button'}`
    return(
        <button className={classString} onClick={btnAction}>
            <img src={imgSrc? imgSrc: placeholder} alt=""/>
            {btnText}
        </button>
    )
}

export default Button;