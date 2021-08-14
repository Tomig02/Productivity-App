import React, { useContext, useState } from 'react';
import Button from '../components/Button';
import RegisterPopUp from '../utils/popups/register';
import ChangePassword from '../utils/popups/changePass';
import { FireContext } from '../contexts/FireContext';

const LoginView = () => {
    const firebase = useContext(FireContext);

    const [errorMessage, setErrorMessage] = useState("");
    const [register, setRegister] = useState(false);
    const [changePass, setChangePass] = useState(false);

    const handleSubmit = async (event) => {
		event.preventDefault();
		const dataF = new FormData(event.target);

        try{
            await firebase.api.login(dataF.get('mail'), dataF.get("pass"));
        }catch(err){
            setErrorMessage(err)
        }
	}
    const handleRegister = () => {
        setRegister(true);
    }
    const changePassword = () => {
        setChangePass(true);
    }

    return(
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-panel">
                <h2>Login</h2>
                
                <label>Email</label>
                <input name="mail" type="email" required />
                
                <label>Password</label>
                <input name="pass" type="password" minLength={5} required />

                <small>{errorMessage}</small>

                <Button imgSrc="" btnText="Login"/>
            </form>
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

            {register? <RegisterPopUp isOpen={setRegister} />: null}
            {changePass? <ChangePassword isOpen={setChangePass} />: null}
        </div>
    );
}

export default LoginView;