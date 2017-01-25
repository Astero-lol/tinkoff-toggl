import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


// Retrieve the object from storage
let taskStorage = JSON.parse(localStorage.getItem('tasks-storage'));

taskStorage === null ? taskStorage = [] : taskStorage;


ReactDOM.render( <App tasks={taskStorage} />, document.getElementById('root'));
