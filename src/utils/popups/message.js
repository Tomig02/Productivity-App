import React from 'react';
import Button from '../../components/Button';

/**
 * muestra un popup para transmitirle un mensaje al usuario
 * 
 * @param {{isOpen: Function, message: String}} param0 datos para el mensaje
 * @returns {JSX.Element} Popup 
 */
const MessagePopUp = ({isOpen, message}) => {

    const closePopUp = () => {
        isOpen(false);
    }

    return(
        <div className="popup-bg">

            <div className="popup-panel">
                <p>{message}</p>
                <Button imgSrc="" btnText="Close" action={closePopUp}/>
            </div>
        </div>
    )
}

export default MessagePopUp;