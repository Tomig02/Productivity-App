import React, {useContext, useState} from 'react';
import Button from '../../components/Button';
import { FireContext } from '../../contexts/FireContext';
import MessagePopUp from './message';

/**
 * un popup para que el usuario pueda cambiar su contraseñ ingresando su email
 * 
 * @param {{isOpen: Function}} param0 funcion para cerrar el popup
 * @returns {JSX.Element} Popup para cambiar la contraseña
 */
const ChangePassword = ({isOpen}) => {
    const firebase = useContext(FireContext);

    // mensajes de error
    const [error, setError] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    
    // cierra el popup
    const closePopUp = () => {
        isOpen(false);
    }

    /**
     * recibe el formulario con los dato del usuario y envia un mail para cambiar
     * la contraseña si el usuario existe
     * 
     * @param {React.SyntheticEvent} event 
     */
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

            {/* formulario para ingresar el email */}
            <form className="popup-panel" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" required/>

                <small>{error}</small>

                <Button imgSrc="" btnText="Change Password"/>
                <Button imgSrc="bx bx-window-close" className="close-btn" action={closePopUp}/>
            </form>

            {showMessage? <MessagePopUp message="Email sent" isOpen={setShowMessage}/>: null}
        </div>
    );
}

export default ChangePassword;