import React, {useContext, useState} from 'react';
import Button from '../../components/Button';
import { FireContext } from '../../contexts/FireContext';
import MessagePopUp from './message';

/**
 * popup donde el usuario se puede crear un usuario
 * @param {{isOpen: Function}} param0 
 * @returns {JSX.Element} popup para registrarse
 */
const RegisterPopUp = ({isOpen}) => {
    const firebase = useContext(FireContext);

    // controlan el mensaje de error
    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    /** cierra el popup */
    const closePopUp = () => {
        isOpen(false);
    }

    /**
     * recibe los datos ingresados por el usuario dentro del formulario
     * y crea el usuario en el auth de firebase
     * 
     * @param {React.SyntheticEvent} event formulario
     */
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

            {/* formulario para registrarse */}
            <form className="popup-panel" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" required/>

                <label htmlFor="password">Password</label>
                <input type="text" name="password" minLength={5} required/>
                
                <label htmlFor="password-confirm">Confirm Password</label>
                <input type="text" name="password-confirm" minLength={5} required/>

                <small>{error}</small>

                <Button btnText="Register"/>
                <Button imgSrc="bx bx-window-close" className="close-btn" action={closePopUp}/>
            </form>

            {/* popup para mensajes al usuario */}
            {showMessage? <MessagePopUp 
                message="Registered successfully" 
                isOpen={setShowMessage}
            />: null}
        </div>
    )
}

export default RegisterPopUp;