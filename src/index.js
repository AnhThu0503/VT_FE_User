import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import {UserProvider} from './context/userContext'
ReactDOM.render(
	<UserProvider><App /></UserProvider>,
	document.getElementById('root')
);
