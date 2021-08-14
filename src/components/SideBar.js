import React, { useContext, useState } from 'react';
import { FireContext } from '../contexts/FireContext';
import MessagePopUp from '../utils/popups/message';
import Button from './Button';

const SideBar = () => {
    const firebase = useContext(FireContext);

    const [showM, setShowM] = useState(false);
    const [message, setMessage] = useState(null);

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
            <Button imgSrc="" btnText="Notes"/>
            <Button imgSrc="" btnText="Help" />
            <Button imgSrc="" btnText="Logout" action={handleLogout}/>

            {showM? <MessagePopUp message={message} isOpen={setShowM}/>: null}
        </div>
    )
}

export default SideBar;