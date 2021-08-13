import React, {useState} from 'react';

export default ( props ) => {
    const {imgSrc = null, btnText = "", action = () => {}, addClass = ""} = props;
    const placeholder = process.env.REACT_APP_PLACEHOLDER;
    
    const [working, setWorking] = useState(false);
    const btnAction = () => {
        setWorking(true);
        action();
        setWorking(false);
    }

    const classString = `${addClass} ${btnText? "button": 'icon-button'}`
    return(
        <button className={classString} onClick={btnAction} disabled={working}>
            <img src={imgSrc? imgSrc: placeholder} alt=""/>
            {btnText}
        </button>
    )
}