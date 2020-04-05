import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root');

ReactDOM.render(<TodoList></TodoList>, rootElement);

registerServiceWorker();

