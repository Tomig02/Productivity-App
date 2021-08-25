import React, { useContext, useState } from 'react';
import Button from '../components/Button';
import AddPanel from '../components/AddPanel';
import ToDo from '../components/ToDo';
import { DataContext } from '../contexts/DataContext';

/**
 * ruta de la app para el planeador se semana
 * @returns pagina del planeador de semana
 */
const WeekView = () => {
    const data = useContext(DataContext);

    // dias de la semana e id para la posicion del dia en el arreglo
    const dayName = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]; 
    const [dayID, setDayID] = useState(null);

    // controla si se ve o no el popup para crear to-dos
    const [createToDo, setCreateToDo] = useState(false);
    
    /**
     * crea las tarjetas con los datos para cada dia de la semana
     * @returns {[JSX.Element]} dias de la semana
     */
    const showData = () => {
        const weekData = [];

        for(const day of dayName){
            const dayData = [];

            // por si el dia no existe al no tener datos
            if(data.week.value[day]){

                // crear to-dos
                data.week.value[day].forEach( data => {
                    dayData.push(<ToDo {...data} day={day} />)
                });
            }

            // funcion para mostrar los popup
            const showPopUp = () => { 
                setDayID(day);
                setCreateToDo(true);
            };
            weekData.push(<WeekData day={day} dayData={dayData} showPopUp={showPopUp}/>);
        }

        return(weekData);
    }

    return(
        <div className="week">
            <div className="week-days">
                {showData()}
            </div>
            
            {createToDo? <AddPanel isOpen={setCreateToDo} day={dayID}/>: null}
        </div>
    );
}

/**
 * tarjeta con los to-dos de un dia de la semana
 * @param {{day: String, dayData: [JSX.Element], showPopUp: Function}} param0
 * datos del dia
 * @returns {JSX.Element} tarjeta del dia de la semana
 */
const WeekData = ({day, dayData, showPopUp}) => {

    return(
        <div key={day} className="day-data">
            <div className="header">
                <h2>{day}</h2>
                <Button imgSrc="bx bxs-plus-square" action={showPopUp}/>
            </div>

            <div className="day-data-content">
                {dayData}
            </div>
        </div>
    );
}

export default WeekView;