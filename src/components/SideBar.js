import React, { useContext, useState } from 'react';
import { FireContext } from '../contexts/FireContext';
import MessagePopUp from '../utils/popups/message';
import Button from './Button';

/**
 * sidebar de la aplicacion con botones para moverse entre los menus
 * 
 * @param {{changeView: Function}} param0 funcion para cambiar de menu
 * @returns {JSX.Element} elemento sidebar
 */
const SideBar = ({changeView}) => {
    const firebase = useContext(FireContext);

    const [showM, setShowM] = useState(false);
    const [message, setMessage] = useState(null);

    /**
     * se encarga de ejecutar el logout del usuario 
     */
    const handleLogout = async () => {
        try{
            await firebase.api.logout();
        }catch(err){
            setMessage(err.message);
            setShowM(true);
        }
    }

    return(
        <div className="sidebar-panel">
            <h1>Logo</h1>
            <Button imgSrc="bx bxs-notepad" btnText="Notes" action={() => {changeView("notes")}}/>
            <Button imgSrc="bx bxs-message" btnText="Week" action={() => {changeView("mail")}}/>
            <Button imgSrc="bx bxs-help-circle" btnText="Help" action={() => {changeView("help")}}/>
            <Button imgSrc="bx bxs-log-out" btnText="Logout" action={handleLogout}/>

            {showM? <MessagePopUp message={message} isOpen={setShowM}/>: null}
        </div>
    )
}

export default SideBar;