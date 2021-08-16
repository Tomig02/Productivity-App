import React, { useContext, useState } from 'react';
import SideBar from './components/SideBar';
import { DataContext } from './contexts/DataContext';
import NoteView from './views/NoteView';
import HelpView from './views/HelpView';
import LoginView from './views/LoginView';
import './scss/style.css';

function App() {
	const data = useContext(DataContext);

	const [views, setView] = useState("notes");

	const RouteSwitch = () => {
		if(Boolean(data.user.value)){
			switch(true){
				case(views === "help"):
					return <HelpView />;
				default:
					return <NoteView />;				
			}
		}else{
			return <LoginView/>;
		}
	}

	return (
		<div className="App">
			{data.user.value
				? <SideBar changeView={setView}/>
				: null}

			{RouteSwitch()}
		</div>
	);
}

export default App;
