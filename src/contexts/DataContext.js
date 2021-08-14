import {createContext, useContext, useEffect, useState} from 'react';
import { FireContext } from './FireContext';

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const firebase = useContext(FireContext);

    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if( Boolean(firebase.app.auth().currentUser) ){
            const uid = firebase.app.auth().currentUser.uid;
            setUser(uid);
            
            firebase.api.get(uid)
                .then(result => { setNotes(result) });
        }
        firebase.app.auth().onAuthStateChanged( async (user) => {
            // User is signed in
            if (user) {
                setUser(user.uid);
                setNotes( await firebase.api.get(user.uid));
            } 
            else {
                setUser(null);
                setNotes([]);
            }
        });

        window.addEventListener('beforeunload', () => {
            firebase.api.set(notes);
        });
    }, []);

    return(
        <DataContext.Provider value={{
            notes:{
                set: setNotes,
                value: notes
            },
            user:{
                set: setUser,
                value: user
            }
        }}>
            {children}
        </DataContext.Provider>
    ); 
}