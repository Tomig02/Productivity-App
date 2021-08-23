import React, {useContext} from 'react';
import {DataContext} from '../contexts/DataContext';
import Button from './Button';

const ToDo = ({text, day, caution, time}) => {
    const {week} = useContext(DataContext);

    function search(value, myArray){
        for (let i = 0; i < myArray.length; i++) {
            if (myArray[i].time === value) {
                return i;
            }
        }
    }
    const deleteToDo = () => {
        const index = search(time, week.value[day]);

        week.value[day].splice(index, 1);
        week.set({...week.value});
    };

    const timeFormated = ('0' + time).slice(-2) + ":00";
    return(
        <div className='to-do'>
            {caution? <i className="bx bxs-star"/>: null}
            <small>{timeFormated}</small>
            <p>{text}</p>

            
            <Button action={deleteToDo} imgSrc="bx bxs-trash"/>
        </div>
    );
}

export default ToDo;