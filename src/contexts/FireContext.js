import {createContext, useContext} from 'react';
import {DataContext} from './DataContext';
import app from '../utils/fireInit';
import 'firebase/database';
import 'firebase/auth';

export const FireContext = createContext(null);

/**
 * proveedor con las funciones para poder comunicarse con firebase
 * 
 * @param {{children: [JSX.Element]}} param0 
 * @returns 
 */
export const FireProvider = ({children}) => {
    const data = useContext(DataContext);

    /* ---------------------------------------------------------------------
    *               FUNCIONES PARA INTERACTUAR CON FIREBASE
    *  ---------------------------------------------------------------------
    */

    /**
     * funcion que ejecuta el proceso de cambiar la contraseña del usuario
     * @param {String} email email del usuario
     */
    const changePassword = async (email) => {
        try{
            await app.auth().sendPasswordResetEmail(email)
        }
        catch(error){ 
            throw Error(error.message);
        }
    }

    /**
     * crea un nuevo usuario en el auth de firebase con los datos ingresados
     * y ingresa con ese usuario automaticamente
     * 
     * @param {String} email nuevo email
     * @param {String} password nueva contraseña
     */
    const register = async (email, password) => {
        try{
            const result = await app.auth().createUserWithEmailAndPassword(email, password);
            app.database().ref(`notes/${result}`).set([]);
            app.database().ref(`week/${result}`).set({});
            data.user.set(result);
        }
        catch(error){ 
            throw Error(error.message) 
        }
    }

    /**
     * chequea si el email y contraseña ingresados por el usuario son correctos, si lo son
     * entonces ingresa a la app
     * 
     * @param {String} email email del usuario
     * @param {String} password contraseña del usuario
     */
    const doLogin = async (email, password) => {
        try{
            const result = await app.auth().signInWithEmailAndPassword(email, password);
            data.user.set(result);
        }
        catch(error){ 
            throw Error(error.message) 
        }   
    }

    /** termina la sesion actual del usuario en firebase */
    const signOut = async () => {
        try{
            await app.auth().signOut()
            data.user.set(null);
        }
        catch(error){
            throw Error(error.message);
        }
    }

    /**
     * actualiza las notas del usuario en la base de datos de firebase
     * 
     * @param {String} userID id de firebase auth
     * @param {[{title: String, content: String, color: String, image: String}]} notes 
     * datos de las notas
     */
    const setNote = (userID, notes) => {
        app.database()
            .ref(`notes/${userID}`)
            .set(notes);
    }

    /**
     * recibe las notas del usuario actual desde firebase
     * @param {String} userID id de firebase auth
     * @returns {[{title: String, content: String, color: String, image: String}]} 
     * datos de las notas
     */
    const getNotes = async (userID) => {
        try{
            const snapshot = await app.database().ref(`notes/${userID}`).get()
            const data = snapshot.val();
            return data;
        }
        catch(error){
            console.log(error.message);
        }
    }

    /**
     * 
     * @param {String} userID id de firebase auth
     * @param {{day: [text: String, caution: Boolean, time: Number]}} week
     * datos de los to-dos 
     */
    const setWeek = (userID, week) => {
        app.database()
            .ref(`week/${userID}`)
            .set(week);
    }

    /**
     * 
     * @param {String} userID id de firebase auth
     * @returns {{day: [text: String, caution: Boolean, time: Number]}} datos de los to-dos 
     */
    const getWeek = async (userID) => {
        try{
            const snapshot = await app.database().ref(`week/${userID}`).get()
            const data = snapshot.val();
            
            return data;
        }
        catch(error){
            console.log(error.message);
        }
    }

    const firebase = {
        app: app,
        database: app.database(),
        api: {
            setNote: setNote,
            getNotes: getNotes,
            setWeek: setWeek,
            getWeek: getWeek,
            login: doLogin,
            logout: signOut,
            register: register,
            changePassword: changePassword
        }
    }
    return(
        <FireContext.Provider value={firebase}>
            {children}
        </FireContext.Provider>
    );
}