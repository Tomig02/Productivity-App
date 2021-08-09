import React, { useContext, useEffect, useState } from 'react';
import SideBar from './components/sidebar/SideBar';
import { DataContext } from './contexts/DataContext';
import {FireContext} from './contexts/FireContext';
import NoteView from './views/NoteView';
import LoginView from './views/login/LoginView';
import './style.css';

function App() {
	const firebase = useContext(FireContext);
	const data = useContext(DataContext);

	const RouteSwitch = () => {
		switch(true){
			case(Boolean(data.user.value)):
				return <NoteView />;
			default:
				return <LoginView/>;
		}
	}

	return (
		<div className="App">
			{data.user.value
				? <SideBar/>
				: null}

			<RouteSwitch />
		</div>
	);
}

export default App;
