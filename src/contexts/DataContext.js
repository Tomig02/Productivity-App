import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import { FireContext } from './FireContext';

export const DataContext = createContext(null);

/**
 * es un elemento que provee los datos de la aplicacion
 * 
 * @param {[JSX.Element]} param0 hijos del proveedor 
 * @returns {JSX.Element} proveedor
 */
export const DataProvider = ({children}) => {
    const firebase = useContext(FireContext);

    // datos de la aplicacion
    const [notes, setNotes] = useState([]);
    const [week, setWeek] = useState({});
    const [user, setUser] = useState(undefined);

    // carga los datos al iniciar la app
    useEffect(() => {
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
    }, [firebase.api, firebase.app]);

    // carga las notas en firebase al haber un cambio
    const setNotesCB = useCallback(() => {
        firebase.api.setNote(user, notes);
    }, [firebase.api, user, notes]);
    useEffect(() => {
        if(notes.length > 0){
            setNotesCB();
        }
    }, [setNotesCB, notes]);

    // carga los datos de la semana en firebase al haber un cambio
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
            }
        }}>
            {children}
        </DataContext.Provider>
    ); 
}