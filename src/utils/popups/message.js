import React from 'react';
import Button from '../../components/button/Button';

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