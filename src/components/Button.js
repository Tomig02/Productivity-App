import React from 'react';

/**
 * Elemento boton comun
 * @param {{imgSrc: String, btnText: String, action: Function, className: String}} props 
 * @returns {JSX.Element} Boton
 */
const Button = ( props ) => {
    const {imgSrc=null, btnText="", action=() => {}, style=null, className=""} = props;

    const classString = `${className} ${btnText? "button": 'icon-button'}`
    return(
        <button style={style} className={classString} onClick={action}>
            <div>
                {imgSrc? <i className={imgSrc}></i>: null}
                {btnText}
            </div>
        </button>
    )
}

export default Button;