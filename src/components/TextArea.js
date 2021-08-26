import React, { useRef, useEffect } from 'react';

/**
 * elemento textarea controlado por un estado recibido por parametro
 * lo mas importante es que la altura es correspondiente al contenido
 * 
 * @param {{value: Number, setValue: Function}} param0 valor y setter
 * @returns {JSX.Element} area de texto
 */
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

export default CustomControlTextArea;