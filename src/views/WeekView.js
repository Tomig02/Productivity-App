import React, { useContext, useState } from 'react';
import Button from '../components/Button';
import AddPanel from '../components/AddPanel';
import ToDo from '../components/ToDo';
import { DataContext } from '../contexts/DataContext';

const WeekView = () => {
    const data = useContext(DataContext);

    const dayName = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]; 
    const [createToDo, setCreateToDo] = useState(false);
    const [dayID, setDayID] = useState(null);
    
    const showData = () => {
        const weekData = [];

        for(const day of dayName){
            const dayData = [];

            if(data.week.value[day]){
                data.week.value[day].forEach( data => {
                    dayData.push(<ToDo {...data} day={day} />)
                });
            }

            const showPopUp = () => { 
                setDayID(day);
                setCreateToDo(true);
            };
            weekData.push(
                <div key={day} className="day-data">
                    <div className="header">
                        <h2>{day}</h2>
                        <Button imgSrc="bx bxs-plus-square" action={showPopUp}/>
                    </div>
                    <div className="day-data-content">{dayData}</div>
                </div>
            );
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

export default WeekView;