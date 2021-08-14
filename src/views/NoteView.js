import React, { useContext, useEffect } from 'react';
import Button from '../components/Button';
import Note from '../components/Note';
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
        const comps = data.notes.value.map( (note, index) => {
            return (
                <Note id={index} title={note.title} content={note.content} />      
            ); 
        });

        return comps.length > 0? comps: <h3>You dont have any notes</h3>
    }

    return(
        <div className="notes-grid">
            {showNotes()}
            <Button imgSrc="bx bxs-plus-square"/>
        </div>
    );  
}

export default NoteView;