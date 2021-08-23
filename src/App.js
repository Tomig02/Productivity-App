import React, { useContext, useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import { DataContext } from './contexts/DataContext';
import NoteView from './views/NoteView';
import HelpView from './views/HelpView';
import LoginView from './views/LoginView';
import WeekView from './views/WeekView';
import './scss/style.css';
import Button from './components/Button';

function App() {
	const data = useContext(DataContext);

	const [views, setView] = useState("notes");
	const [showSide, setShowSide] = useState(false);

	const [width, setWidth] = useState(window.innerWidth);
	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
			window.addEventListener('resize', handleWindowSizeChange);
			return () => {
				window.removeEventListener('resize', handleWindowSizeChange);
			}
		}, []);

	const showSidebar = () => {
		
		if(data.user.value){
			if(width <= 900){
				console.log(width);
				if(showSide){
					console.log("showing");
					return <SideBar changeView={setView}/>
				}
			}
			else{
				return <SideBar closeFunc={() => {setShowSide(false)}} changeView={setView}/>
			}
		}
	}

	const RouteSwitch = () => {
		if(!data.loading){
			switch(true){
				case(data.user.value !== undefined && views === "help"):
					return <HelpView key={2} />;
				case(data.user.value !== undefined && views === "notes"):
					return <NoteView key={2} />;
				case(data.user.value !== undefined && views === "mail"):
					return <WeekView key={2} />;
				default:
					return <LoginView/>;
			}
		}else{
			return <Loading />;
		}
	}

	return (
		<div className="App">
			{data.user.value && width <= 900
				? <Button className="burger"
					imgSrc={showSide? "bx bx-chevrons-left": "bx bx-menu-alt-left"} 
					action={() => {setShowSide(!showSide)}}
				/>
				: null
			}
			{showSidebar()}
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
