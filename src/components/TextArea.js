import React, { useRef, useEffect } from 'react';

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