import React, {useState} from 'react';
import { Fragment } from 'react';

const HelpView = () => {

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

const CollapseButton = ({btnText, contentText}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }
    return(
        <Fragment>
            <button className={`collapse-btn ${isOpen? "collapse-active": ""}`} onClick={toggleOpen}>
                <h2>{btnText}</h2>
                <i className={isOpen? 'bx bxs-down-arrow': 'bx bxs-right-arrow'}></i>
            </button>
            {isOpen? <div className={'collapse-content collapse-active'}>
                <p>{contentText}</p>
            </div>: null}
        </Fragment>
    );
}

export default HelpView;