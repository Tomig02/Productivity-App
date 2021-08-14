import React, { useContext, useEffect } from 'react';
import Button from '../components/Button';
import { DataContext } from '../contexts/DataContext';
import { FireContext } from '../contexts/FireContext';

const NoteView = () => {
    const data = useContext(DataContext);
    const firebase = useContext(FireContext);

    useEffect(() => {
        if(!data){
            firebase.api.get()
                .then(result => { data.notes.set(result); })
        }
    }, []);

    const showNotes = () => {
        const comps = data.notes.value.map( note => {
            return (
                <div className="note" key={Math.random() * 10000}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            ); 
        });

        return comps.length > 0? comps: <h3>You dont have any notes</h3>
    }

    return(
        <div className="notes-grid">
            {showNotes()}
            <Button/>
        </div>
    );  
}

export default NoteView;