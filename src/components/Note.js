import React, { Fragment, useEffect, useContext, useState } from 'react';
import CustomControlTextArea from './TextArea';
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
    const [image, setImage] = useState(props.image || null);

    const [memory, setMemory] = useState(false);
    useEffect(() => {
        if(isEditing){
            setMemory(true);
        }
        else{
            if(memory){
                const array = data.notes.value;
                array[id] = {image: image, color: BG, title: title, content: content};
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

    const values = {title: title, image: image, content: content}
    const setValues = {setTitle: setTitle, setContent: setContent, setImage: setImage}
    return(
        <div className="note" style={{background: BG}}>
            {isEditing
                ? <EditNote {...values} {...setValues}/>
                : <ShowNote {...values}/>
            }

            <div className="btn-row">
                {isEditing
                ? <Button imgSrc="bx bxs-palette" action={toggleColor}/>
                : null}

                <Button imgSrc="bx bxs-trash" action={deleteNote} />
                <Button imgSrc={isEditing? "bx bxs-save": "bx bxs-pencil"} action={toggleEditing} />
            </div>

            {isEditing && colorChange
                ? <div className="color-display">
                    {showColors()}
                </div>
                : null}
        </div>
    )
}

const EditNote = ({title, image, content, setTitle, setContent, setImage}) => {
    return (
        <Fragment>
            <small>Title</small>
            <CustomControlTextArea value={title} setValue={setTitle} />
            <small>Content</small>
            <CustomControlTextArea value={content} setValue={setContent} />
            <small>Image link</small>
            <CustomControlTextArea value={image} setValue={setImage} />
        </Fragment>
    )
}
const ShowNote = ({title, image, content}) => {
    return (
        <Fragment>
            <h3>{title}</h3>
            <p>{content}</p>
            {image? <img src={image} alt=""/>: null}
        </Fragment>
    )
}



export default Note;