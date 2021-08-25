import React, { useContext, useState } from 'react';
import Button from '../components/Button';
import RegisterPopUp from '../utils/popups/register';
import ChangePassword from '../utils/popups/changePass';
import { FireContext } from '../contexts/FireContext';

/**
 * pagina de login con funcion para registrarse y cambiar de contraseña
 * @returns {JSX.Element} pagina de login
 */
const LoginView = () => {
    const firebase = useContext(FireContext);

    // contiene el mensaje de error
    const [errorMessage, setErrorMessage] = useState("");
    
    // estados para mostrar o esconder los popups
    const [register, setRegister] = useState(false);
    const [changePass, setChangePass] = useState(false);

    /**
     * recibe el submit del formulario y ejecuta el login del usuario
     * con los datos ingresados o muestra el error si existe
     * @param {React.SyntheticEvent} event evento del submit
     */
    const handleSubmit = async (event) => {
		event.preventDefault();
		const dataF = new FormData(event.target);

        try{
            await firebase.api.login(dataF.get('mail'), dataF.get("pass"));
        }catch(err){
            setErrorMessage(err.message);
        }
	}

    // functiones para mostrar los popup
    const handleRegister = () => {
        setRegister(true);
    }
    const changePassword = () => {
        setChangePass(true);
    }

    return(
        <div className="login-container">

            {/* formulario para registrarse */}
            <form onSubmit={handleSubmit} className="login-panel">
                <h2>Login</h2>
                
                <label>Email</label>
                <input name="mail" type="email" required />
                
                <label>Password</label>
                <input name="pass" type="password" minLength={5} required />

                <small>{errorMessage}</small>

                <Button imgSrc="bx bxs-log-in" btnText="Login"/>
            </form>

            {/* panel con las opciones de crear un usuario o cambiar de contraseña */}
            <div className="login-panel">
                <div className="row">
                    <p>Forgot your password?</p>
                    <Button btnText="Click here" action={changePassword}/>
                </div>
                <div className="row">
                    <p>You don't have an account?</p>
                    <Button btnText="Click here" action={handleRegister}/>
                </div>
            </div>

            {/* popups */}
            {register? <RegisterPopUp isOpen={setRegister} />: null}
            {changePass? <ChangePassword isOpen={setChangePass} />: null}
        </div>
    );
}

export default LoginView;