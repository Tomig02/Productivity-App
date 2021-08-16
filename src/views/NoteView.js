import React, { useContext, useEffect, useState } from 'react';
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

    const [newNote, setNewNote] = useState(-1);
    const showNotes = () => {
        const comps = data.notes.value.map( (note, index) => {
            return (
                <Note 
                    id={index} 
                    {...note}
                    startEdit={newNote === index? true: false}    
                />      
            ); 
        });

        return comps.length > 0? comps: <h3>You dont have any notes</h3>
    }
    const createNewNote = () => {
        const newNote = {title: "New note", content: "Content", color: null};
        data.notes.set([...data.notes.value, newNote]);
        setNewNote(data.notes.value.length);
    }

    return(
        <div className="notes-grid">
            {showNotes()}
            <Button className="floating-btn" btnText="Add note" 
                imgSrc="bx bxs-plus-square" action={createNewNote}/>
        </div>
    );  
}

export default NoteView;