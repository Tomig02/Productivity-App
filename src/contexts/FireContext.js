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

    const doLogin = (email, password) => {
        app.auth().signInWithEmailAndPassword(email, password)
            .then( result => {
                console.log(result);
            })
            .catch( error => {
                console.log(`ERROR: ${error.message}`);
            });
    }

    const signOut = () => {
        app.auth().signOut()
            .then(() => {
                console.log("out");
                
                // Sign-out successful.
            })
            .catch((error) => {
                console.log(error);
                // An error happened.
            });
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
            logout: signOut
        }
    });
    return(
        <FireContext.Provider value={firebase}>
            {children}
        </FireContext.Provider>
    );
}