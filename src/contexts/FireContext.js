import {createContext, useContext, useEffect, useState} from 'react';
import {DataContext} from './DataContext';
import app from '../utils/fireInit';
import 'firebase/database';
import 'firebase/auth';

export const FireContext = createContext(null);

export const FireProvider = ({children}) => {
    const data = useContext(DataContext);

    /* ---------------------------------------------------------------------
    *                      FIREBASE LOGIN DEL USUARIO
    *  ---------------------------------------------------------------------
    */

    if( Boolean(app.auth().currentUser) ){
        data.user.set(app.auth().currentUser.uid);
    }
    app.auth().onAuthStateChanged((user) => {
        // User is signed in
        if (user) {
            data.user.set(user.uid);
        } 
        else {
            data.user.set(null);
        }
    });

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

    const setNote = (noteID, userID) => {
        app.database
            .ref(`notes/${userID}/${noteID}`)
            .set(data.notes.value);
    }
    const getNotes = (userID) => {
        app.database
            .ref(`posts/${userID}`)
            .on('value', (snapshot) => {
                const data = snapshot.val();
                data.notes.set(data);
            }
        );
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