import React, {useContext, useState} from 'react';
import Button from '../../components/button/Button';
import { FireContext } from '../../contexts/FireContext';
import MessagePopUp from './message';

const ChangePassword = ({isOpen}) => {
    const firebase = useContext(FireContext);

    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    
    const closePopUp = () => {
        isOpen(false);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = (new FormData(event.target)).get("email");

        try{
            await firebase.api.changePassword(email);
            setShowMessage(true);
        }
        catch(err){
            setError(err.message);
        }
    }

    return(
        <div className="popup-bg">
            <form className="popup-panel" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" required/>

                <small>{error}</small>

                <Button imgSrc="" btnText="Change Password"/>
                <Button imgSrc="" addClass="close-btn" action={closePopUp}/>
            </form>

            {showMessage? <MessagePopUp message="Email sent" isOpen={setShowMessage}/>: null}
        </div>
    );
}

export default ChangePassword;