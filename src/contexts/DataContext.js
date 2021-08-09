import {createContext, useState} from 'react';

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {

    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);

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