import React, {useContext} from 'react';
import {DataContext} from '../contexts/DataContext';
import Button from './Button';

/**
 * elemento que muestra un que-hacer del usuario
 * 
 * @param {{text: String, day: String, caution: Boolean, time: Number}} param0 datos del elemento
 * @returns {JSX.Element} to-do
 */
const ToDo = ({text, day, caution, time}) => {
    const {week} = useContext(DataContext);

    /**
     * busca dentro de la lista de to-dos un elemento y devuelve un valor de verdad
     * segun si existe ese velor en alguno de los elementos
     * 
     * @param {Number} value tiempo buscado
     * @param {[{}]} myArray todos los que-haceres
     * @returns {Boolean} True si existe el valor, False si no existe
     */
    function search(value, myArray){
        for (let i = 0; i < myArray.length; i++) {
            if (myArray[i].time === value) {
                return i;
            }
        }
    }

    /**
     * borra el que-hacer actual de la lista de que-haceres
     */
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