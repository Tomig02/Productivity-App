import React, { useRef, useEffect, useContext, useState } from 'react';
import { Fragment } from 'react';
import { DataContext } from '../contexts/DataContext';
import Button from './Button';

const Note = (props) => {
    const data = useContext(DataContext);
    const {id, startEdit = false} = props;

    const colors = {
        white: "#FaFaFa",
        pink: "#ff65a3",
        yellow: "#fff740",
        blue: "#7afcff"
    }

    const [isEditing, setIsEditing] = useState(startEdit);
    const [colorChange, setColorChange] = useState(false);
    const [BG, setBG] = useState(data.notes.value[id].color || colors.white);
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    const [memory, setMemory] = useState(false);
    useEffect(() => {
        if(isEditing){
            setMemory(true);
        }
        else{
            if(memory){
                const array = data.notes.value;
                array[id] = {color: BG, title: title, content: content};
                data.notes.set([...array]);
                
                setMemory(false);
            }
        }
    }, [isEditing]);

    const setBackground = (hex) => {
        setBG(hex);
    }
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }
    const toggleColor = () => {
        setColorChange(!colorChange);
    }

    const deleteNote = () => {
        const dataArr = data.notes.value;
        dataArr.splice(id, 1);
        data.notes.set([...dataArr]);
    }

    const showColors = () => {
        return Object.values(colors).map( (hex) => {
            return <Button 
                action={() => {setBackground(hex)}} 
                className="color-btn" 
                style={{background: hex}}
            />
        })
    }

    return(
        <div className="note" style={{background: BG}}>
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
                    <Button imgSrc="bx bxs-palette" action={toggleColor}/>
                </Fragment>
                : null
                }
                <Button imgSrc="bx bxs-trash" action={deleteNote} />
                <Button imgSrc={isEditing? "bx bxs-save": "bx bxs-pencil"} action={toggleEditing} />
            </div>

            {isEditing && colorChange? <div className="color-display">
                {showColors()}
            </div>: null}
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