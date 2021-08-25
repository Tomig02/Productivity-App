import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {DataProvider} from './contexts/DataContext';
import {FireProvider} from './contexts/FireContext';

ReactDOM.render(
	<React.StrictMode>
		<FireProvider>
			<DataProvider>
				<App />
			</DataProvider>
		</FireProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
