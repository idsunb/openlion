import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import App from './App.js';

ReactDOM.render(  <React.StrictMode>
    <App />
  </React.StrictMode>, document.getElementById('root'));
  
=======
import { createRoot } from 'react-dom/client';
import App from './App.js';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

>>>>>>> c2b5c09 (0.1.8.9.1)