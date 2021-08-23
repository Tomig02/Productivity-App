import {createContext, useCallback, useContext, useEffect, useState} from 'react';
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
    }, [firebase.api, firebase.app]);

    const setNotesCB = useCallback(() => {
        firebase.api.setNote(user, notes);
    }, [firebase.api, user, notes]);
    useEffect(() => {
        if(notes.length > 0){
            setNotesCB();
        }
    }, [setNotesCB, notes]);

    const setWeekCB = useCallback(() => {
        firebase.api.setWeek(user, week);
    }, [firebase.api, user, week]);
    useEffect(() => {
        if(Object.keys(week).length > 0){
            setWeekCB();
        }
    }, [setWeekCB, week]);

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