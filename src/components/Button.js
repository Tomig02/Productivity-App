import React from 'react';

/**
 * Elemento boton comun
 * @param {{imgSrc: String, btnText: String, action: Function, addClass: String}} props 
 * @returns {JSX.Element} Boton
 */
const Button = ( props ) => {
    const {imgSrc = null, btnText = "", action = () => {}, addClass = ""} = props;
    
    const btnAction = () => {
        action();
    }

    const classString = `${addClass} ${btnText? "button": 'icon-button'}`
    return(
        <button className={classString} onClick={btnAction}>
            <div>
                {imgSrc? <i className={imgSrc}></i>: null}
                {btnText}
            </div>
        </button>
    )
}

export default Button;