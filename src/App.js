import React, { useContext, useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import { DataContext } from './contexts/DataContext';
import NoteView from './views/NoteView';
import HelpView from './views/HelpView';
import LoginView from './views/LoginView';
import WeekView from './views/WeekView';
import './scss/style.css';
import Button from './components/Button';

/**
 * elemento base de la aplicaion, decide la opcion que ve el usuario
 * y tiene la logica del botom burguer
 * 
 * @returns {JSX.Element} App base 
 */
function App() {
	const data = useContext(DataContext);

	const [views, setView] = useState("notes");
	const [showSide, setShowSide] = useState(false);

	//---------------------------------------------------
	// consigue y actualiza el ancho actual de la ventana
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
	//---------------------------------------------------

	/**
	 * devuelve el elemento sidebar segun si el ancho de la pantalla
	 * es mayor al valor minimo
	 * @param {Number} minSize tamaño maximo en el que se muestra el sidebar automaticamente 
	 * @returns {JSX.Element} Sidebar
	 */
	const showSidebar = (minSize) => {
		
		if(data.user.value){
			if(width <= minSize){
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

	/**
	 * elige que parte de la app se muestra al usuario
	 * @param {String} route ruta actual
	 * @returns {JSX.Element} Ruta actual
	 */
	const RouteSwitch = (route) => {
		switch(true){
			case(data.user.value !== undefined && route === "help"):
				return <HelpView key={2} />;
			case(data.user.value !== undefined && route === "notes"):
				return <NoteView key={2} />;
			case(data.user.value !== undefined && route === "mail"):
				return <WeekView key={2} />;
			default:
				return <LoginView/>;
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
			{showSidebar(900)}
			{RouteSwitch(views)}
		</div>
	);
}

export default App;
