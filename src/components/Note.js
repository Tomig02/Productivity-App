import React, { Fragment, useEffect, useContext, useState, useCallback } from 'react';
import CustomControlTextArea from './TextArea';
import { DataContext } from '../contexts/DataContext';
import Button from './Button';

/**
 * elemento que muestra los datos de las notas del usuario y permite editarlas
 * 
 * @param {{}} props datos de la nota
 * @returns {JSX.Element} elemento nota
 */
const Note = (props) => {
    const data = useContext(DataContext);
    const {id, startEdit = false} = props;

    // colores para las notas
    const colors = {
        white: "#FaFaFa",
        pink: "#ff65a3",
        yellow: "#fff740",
        blue: "#7afcff"
    }

    // estados de la nota
    const [isEditing, setIsEditing] = useState(startEdit);
    const [colorChange, setColorChange] = useState(false);
    
    // datos de la nota 
    const [BG, setBG] = useState(data.notes.value[id].color || colors.white);
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);
    const [image, setImage] = useState(props.image || null);

    /**
     * guarda los datos nuevos de la nota en el contexto de datos
     */
    const setNewNotesCB = useCallback(() => {
        const array = data.notes.value;
        array[id] = {image: image, color: BG, title: title, content: content};
        data.notes.set([...array]);
    }, [image, BG, title, content, data.notes, id]);

    // guarda las notas luego de terminar de editarla
    const [memory, setMemory] = useState(false);
    useEffect(() => {
        if(isEditing){
            setMemory(true);
        }
        else{
            if(memory){
                setNewNotesCB();
                setMemory(false);
            }
        }
    }, [memory, setNewNotesCB, isEditing]);

    /** setter del color de la nota 
     * @param {String} hex hex del color */
    const setBackground = (hex) => {
        setBG(hex);
    }

    // toggles para editar los datos y el color de la nota
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }
    const toggleColor = () => {
        setColorChange(!colorChange);
    }

    /**
     * borra la nota actual del arreglo de notas en el contexto de datos
     */
    const deleteNote = () => {
        const dataArr = data.notes.value;
        dataArr.splice(id, 1);
        data.notes.set([...dataArr]);
    }

    /** muestra las opciones de colores para la nota */
    const showColors = () => {
        return Object.values(colors).map( (hex) => {
            return <Button 
                action={() => {setBackground(hex)}} 
                className="color-btn" 
                style={{background: hex}}
            />
        })
    }

    // para que sea mas facil pasar como props
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

/**
 * permite editar los datos de la nota
 * 
 * @param {{title: String, image: String, content: String, 
 *          setTitle: Function, setContent: Function, setImage: Function}
 * } param0 datos y setters de la nota 
 * @returns {JSX.Element} editor de la nota
 */
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

/**
 * muestra los datos de la nota
 * @param {{title: String, image: String, content: String}} param0 datos de la nota
 * @returns {JSX.Element} muestra los datos
 */
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