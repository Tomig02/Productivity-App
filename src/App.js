import React, { useContext, useState } from 'react';
import SideBar from './components/SideBar';
import { DataContext } from './contexts/DataContext';
import NoteView from './views/NoteView';
import HelpView from './views/HelpView';
import LoginView from './views/LoginView';
import WeekView from './views/WeekView';
import './scss/style.css';

function App() {
	const data = useContext(DataContext);

	const [views, setView] = useState("notes");

	const RouteSwitch = () => {
		switch(true){
			case(data.user.value != undefined && views === "help"):
				return [<SideBar changeView={setView}/>, <HelpView />];
			case(data.user.value != undefined && views === "notes"):
				return [<SideBar changeView={setView}/>, <NoteView />];
			case(data.user.value != undefined && views === "mail"):
				return [<SideBar changeView={setView}/>, <WeekView />]
			case(data.user.value === undefined):
				return <LoginView/> 
			default:
				return <Loading />	
		}
	}

	return (
		<div className="App">
			{RouteSwitch()}
		</div>
	);
}

const Loading = () => {
	return(
		<div className="loading">
			<img src="https://media.giphy.com/media/Vk7VKS50xcSC4/giphy.gif" alt=""/>
			<p>Loading...</p>
		</div>
	);
}

export default App;
