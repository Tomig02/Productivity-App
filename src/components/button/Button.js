import React, {useState} from 'react';

export default ( props ) => {
    const {imgSrc = null, btnText = "", action = () => {}} = props;
    const placeholder = process.env.REACT_APP_PLACEHOLDER;

    console.log(placeholder)
    
    const [working, setWorking] = useState(false);
    const btnAction = () => {
        setWorking(true);
        action();
        setWorking(false);
    }

    return(
        <button className={btnText? "button": 'icon-button'} onClick={btnAction} disabled={working}>
            <img src={imgSrc? imgSrc: placeholder} alt=""/>
            {btnText}
        </button>
    )
}