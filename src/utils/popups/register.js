import React, {useContext, useState} from 'react';
import Button from '../../components/Button';
import { FireContext } from '../../contexts/FireContext';
import MessagePopUp from './message';

const RegisterPopUp = ({isOpen}) => {
    const firebase = useContext(FireContext);

    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const closePopUp = () => {
        isOpen(false);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);

        const email = form.get("email");
        const password = form.get("password"); 
        const confirm = form.get("password-confirm");

        if(password === confirm){
            try{
                await firebase.api.register(email, password);
                setShowMessage(true);
            }
            catch(err){
                setError(err.message);
            }
        }
        else{
            setError("Passwords do not match");
        }
    }

    return(
        <div className="popup-bg">
            <form className="popup-panel" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" required/>

                <label htmlFor="password">Password</label>
                <input type="text" name="password" minLength={5} required/>
                <label htmlFor="password-confirm">Confirm Password</label>
                <input type="text" name="password-confirm" minLength={5} required/>

                <small>{error}</small>

                <Button imgSrc="" btnText="Register"/>
                <Button imgSrc="" className="close-btn" action={closePopUp}/>
            </form>

            {showMessage? <MessagePopUp 
                message="Registered successfully" 
                isOpen={setShowMessage}
            />: null}
        </div>
    )
}

export default RegisterPopUp;