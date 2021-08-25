import React, { useContext, useEffect, useState } from 'react';
import Button from '../components/Button';
import Note from '../components/Note';
import { DataContext } from '../contexts/DataContext';
import { FireContext } from '../contexts/FireContext';

/**
 * ruta donde el usuario puede ver y crear notas
 * @returns {JSX.Element} vista de las notas
 */
const NoteView = () => {
    const data = useContext(DataContext);
    const firebase = useContext(FireContext);

    const [newNote, setNewNote] = useState(-1);

    // carga los datos de las notas al montarse este
    // componente si no estan ya cargadas 
    useEffect(() => {
        if(!data){
            firebase.api.get()
                .then(result => { data.notes.set(result); })
        }
    // eslint-disable-next-line
    }, []);

    /**
     * muestra las notas del usuario en tarjetas 
     * utilizando los datos guardados
     * 
     * @returns {[JSX.Element]} arreglo de notas 
     */
    const showNotes = () => {
        if(data.notes.value){
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
        else{
            return <h3>Connection error when fetching data from the server</h3>
        }
    }

    /**
     * funcion para crear una nueva nota y guardarla en el contexto de datos
     */
    const createNewNote = () => {
        const newNote = {title: "New note", content: "Content", color: null};
        data.notes.set([...data.notes.value, newNote]);
        setNewNote(data.notes.value.length);
    }

    return(
        <div className="notes-grid">
            {showNotes()}
            <Button 
                className="floating-btn" 
                btnText="Add note" 
                imgSrc="bx bxs-plus-square" 
                action={createNewNote}
            />
        </div>
    );  
}

export default NoteView;