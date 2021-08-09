import React, { useContext } from 'react';
import Button from '../../components/button/Button';
import { FireContext } from '../../contexts/FireContext';

export default () => {
    const firebase = useContext(FireContext);

    const handleSubmit = (event) => {
		event.preventDefault();
		const dataF = new FormData(event.target);

		firebase.api.login(dataF.get('mail'), dataF.get("pass"));
	}

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            
            <label>Email</label>
            <input name="mail" type="email" required />
            
            <label>Password</label>
            <input name="pass" type="password" minLength={5} required />
            <Button imgSrc="" btnText="Login"/>
        </form>
    );
}