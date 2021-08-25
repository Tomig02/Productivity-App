import React, {useState} from 'react';
import { Fragment } from 'react';

const helpText = [
    {
        btnText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, saepe!",
        contentText: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Harum et nesciunt quisquam quos, fugit saepe eligendi perferendis 
        maiores aspernatur tempore ut rerum doloremque dignissimos voluptate 
        eos ducimus illum? Quidem ullam ipsum tempora nisi reprehenderit beatae, 
        aspernatur facere cupiditate veniam. Sequi.`},
    {
        btnText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, saepe!",
        contentText: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Harum et nesciunt quisquam quos, fugit saepe eligendi perferendis 
        maiores aspernatur tempore ut rerum doloremque dignissimos voluptate 
        eos ducimus illum? Quidem ullam ipsum tempora nisi reprehenderit beatae, 
        aspernatur facere cupiditate veniam. Sequi.`},
    {
        btnText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, saepe!",
        contentText: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Harum et nesciunt quisquam quos, fugit saepe eligendi perferendis 
        maiores aspernatur tempore ut rerum doloremque dignissimos voluptate 
        eos ducimus illum? Quidem ullam ipsum tempora nisi reprehenderit beatae, 
        aspernatur facere cupiditate veniam. Sequi.`
    }
]

/**
 * una vista de la app para mostrar ayudas y consejos utiles al usuario
 * 
 * @returns {JSX.Element} vista de ayuda al usuario
 */
const HelpView = () => {

    /**
     * crea los botones colapsables con la informacion de ayuda para el usuario
     * 
     * @returns {[JSX.Element]} colapsables con la info de ayuda
     */
    const showOptions = () => {
        return helpText.map( obj => {
            return <CollapseButton {...obj} />
        });
    }

    return(
        <div className="help-view">
            {showOptions()}
        </div>
    );
}

/**
 * boton colapsable para mostrar la informacion de ayuda
 * 
 * @param {{btnText: String, contentText: String}} param0 datos para el boton 
 * @returns {JSX.Element} boton colapsable
 */
const CollapseButton = ({btnText, contentText}) => {
    
    // controla si el boton esta colapsado(FALSE) o desplegado(TRUE)
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return(
        <Fragment>
            {/* parte clickeable */}
            <button className={`collapse-btn ${isOpen? "collapse-active": ""}`} onClick={toggleOpen}>
                <h2>{btnText}</h2>
                <i className={isOpen? 'bx bxs-down-arrow': 'bx bxs-right-arrow'}></i>
            </button>

            {/* parte colapsable */}
            {isOpen? <div className={'collapse-content collapse-active'}>
                <p>{contentText}</p>
            </div>: null}
        </Fragment>
    );
}

export default HelpView;