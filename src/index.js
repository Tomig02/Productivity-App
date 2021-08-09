import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {DataProvider} from './contexts/DataContext';
import {FireProvider} from './contexts/FireContext';
import dotenv from 'dotenv';
dotenv.config()

ReactDOM.render(
	<React.StrictMode>
		<DataProvider>
			<FireProvider>
				<App />
			</FireProvider>
		</DataProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
