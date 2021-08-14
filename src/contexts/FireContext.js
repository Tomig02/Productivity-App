import {createContext, useContext, useState} from 'react';
import {DataContext} from './DataContext';
import app from '../utils/fireInit';
import 'firebase/database';
import 'firebase/auth';

export const FireContext = createContext(null);

export const FireProvider = ({children}) => {
    const data = useContext(DataContext);

    /* ---------------------------------------------------------------------
    *               FUNCIONES PARA INTERACTUAR CON FIREBASE
    *  ---------------------------------------------------------------------
    */

    const changePassword = async (email) => {
        try{
            await app.auth().sendPasswordResetEmail(email)
        }
        catch(error){ 
            throw Error(error.message);
        }
    }

    const register = async (email, password) => {
        try{
            const result = await app.auth().createUserWithEmailAndPassword(email, password)
            data.user.set(result);
        }
        catch(error){ 
            throw Error(error.message) 
        }
    }

    const doLogin = async (email, password) => {
        try{
            const result = await app.auth().signInWithEmailAndPassword(email, password);
            data.user.set(result);
        }
        catch(error){ 
            throw Error(error.message) 
        }   
    }

    const signOut = async () => {
        try{
            await app.auth().signOut()
            data.user.set(null);
        }
        catch(error){
            throw Error(error.message);
        }
    }

    const setNote = (userID) => {
        app.database()
            .ref(`notes/${userID}`)
            .set(data.notes.value);
    }
    const getNotes = async (userID) => {
        try{
            const snapshot = await app.database().ref(`notes/${userID}`).get()
            const data = snapshot.val();
            return data.filter(elem => { return Boolean(elem) });
        }
        catch(error){
            console.log(error.message);
        }
    }

    const [firebase, setFirebase] = useState({
        app: app,
        database: app.database(),
        api: {
            set: setNote,
            get: getNotes,
            login: doLogin,
            logout: signOut,
            register: register,
            changePassword: changePassword
        }
    });
    return(
        <FireContext.Provider value={firebase}>
            {children}
        </FireContext.Provider>
    );
}