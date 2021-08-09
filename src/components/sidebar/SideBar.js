import React, { useContext } from 'react';
import { FireContext } from '../../contexts/FireContext';
import Button from '../button/Button';

export default () => {
    const firebase = useContext(FireContext);

    return(
        <div className="sidebar-panel">
            <h1>Logo</h1>
            <Button imgSrc="" btnText="Notes"/>
            <Button imgSrc="" btnText="Help" />
            <Button imgSrc="" btnText="Logout" action={firebase.api.logout}/>
        </div>
    )
}