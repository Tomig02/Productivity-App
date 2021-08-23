import {createContext, useContext, useEffect, useState} from 'react';
import { FireContext } from './FireContext';

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const firebase = useContext(FireContext);

    const [notes, setNotes] = useState([]);
    const [week, setWeek] = useState({});
    const [user, setUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if( Boolean(firebase.app.auth().currentUser) ){
            const uid = firebase.app.auth().currentUser.uid;
            
            firebase.api.getNotes(uid)
                .then(result => { 
                    setUser(uid);
                    setNotes(result); 
                });
        }
        else{
            setUser(undefined);
        }

        firebase.app.auth().onAuthStateChanged( async (user) => {
            if (user) {
                setUser(user.uid);
                setNotes( await firebase.api.getNotes(user.uid));
                setWeek( await firebase.api.getWeek(user.uid));
            } 
            else {
                setUser(undefined);
            }
        });

        setIsLoading(false);
    }, []);

    useEffect(() => {
        if(notes.length > 0){
            firebase.api.setNote(user, notes);
        }
    }, [notes]);
    useEffect(() => {
        if(Object.keys(week).length > 0){
            firebase.api.setWeek(user, week);
        }
    }, [week]);

    return(
        <DataContext.Provider value={{
            notes: {
                set: setNotes,
                value: notes
            },
            user: {
                set: setUser,
                value: user
            },
            week: {
                set: setWeek,
                value: week
            },
            loading: isLoading
        }}>
            {children}
        </DataContext.Provider>
    ); 
}