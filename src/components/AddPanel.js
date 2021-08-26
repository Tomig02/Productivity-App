import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';
import Button from './Button';

const AddPanel = ({day, isOpen}) => {
    const {week} = useContext(DataContext);

    const [selected, setSelected] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formD = new FormData(event.target);

        const [text, caution] = [formD.get("text"), formD.get("caution")];

        const newToDos = [];
        for( const time of selected){
            newToDos.push({
                text: text,
                caution: caution, 
                time: time
            });    
        }

        let newData = week.value[day];
        if(newData){
            newData = [...newData, ...newToDos];
        }else{
            newData = newToDos;
        }
        newData.sort((a, b) => { return a.time > b.time? 1: -1 })
        
        week.value[day] = newData;
        week.set({...week.value});
        isOpen(false);
    }

    

    const timeStamps = () => {
        const stringArr = [];

        const isUsed = [];
        for( const elem of week.value[day] || []){
            if(elem){ isUsed.push(elem.time) };
        }

        for(let i = 1; i < 25; i++){
            if( !isUsed.includes(i)){
                const elem = <Option kwy={i} selected={selected} setSelected={setSelected} value={i} />
                
                stringArr.push(elem);
            }
        }

        return stringArr;
    }

    const handleClose = () => {isOpen(false)};
    return(
        <div className="popup-bg">
            <form className="add-panel popup-panel" onSubmit={handleSubmit}>
                <button type="button" onClick={handleClose} className="close-btn">
                    <i className="bx bx-window-close"/>
                </button>
                
                <input type="text" name="text" required maxLength={150}/>
                
                <div className="options">
                    {timeStamps()}
                </div>
                <div className="btn-container">
                    <label htmlFor="caution">
                        <input type="checkbox" name="caution" />
                        Is important
                    </label>
                    
                    <Button imgSrc="bx bxs-plus-circle" />
                </div>
            </form>
        </div>
    );
}

const Option = ({value, selected, setSelected}) => {
    
    const [active, setActive] = useState(false);

    const handleOption = (op) => {

        if(active){
            const index = selected.indexOf(op);
            selected.splice(index, 1);
        }else{
            selected.push(op);
        }
        setSelected(selected);
        setActive(!active);
    }

    return (<button type="button"
        onClick={() => {handleOption(value)}} 
        className={`option-btn ${active? "active": "inactive"}`}
    > 
        {("0" + value).slice(-2) + ":00"} 
    </button>);
}

export default AddPanel;