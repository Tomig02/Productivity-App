import React, { useRef, useEffect, useContext, useState } from 'react';
import { Fragment } from 'react';
import { DataContext } from '../contexts/DataContext';
import Button from './Button';

const Note = (props) => {
    const data = useContext(DataContext);
    const {id} = props;

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const [memory, setMemory] = useState(false);
    useEffect(() => {
        if(isEditing){
            setMemory(true);
        }
        else{
            if(memory){
                const newNote = {title: title, content: content};
                const array = data.notes.value;
                
                array[id] = newNote;
                data.notes.set([...array]);
                
                setMemory(false);
            }
        }
    }, [isEditing]);

    return(
        <div className="note">
            {isEditing
                ? <Fragment>
                    <CustomControlTextArea value={title} setValue={setTitle} />
                    <CustomControlTextArea value={content} setValue={setContent} />
                </Fragment> 
                : <Fragment>
                    <h3>{title}</h3>
                    <p>{content}</p>
                </Fragment>
            }

            <div className="btn-row">
                {isEditing
                ? <Fragment>
                    <Button imgSrc="bx bxs-palette" />
                </Fragment>
                : null
                }
                <Button imgSrc={isEditing? "bx bxs-save": "bx bxs-pencil"} action={toggleEditing} />
            </div>
        </div>
    )
}

const CustomControlTextArea = ({value, setValue}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = (scrollHeight + 2) + "px";
    }, [value]);

    return ( 
        <textarea ref={textareaRef}
            value={value}
            onChange={ e => {setValue(e.target.value)}}
        />
    );
}

export default Note;