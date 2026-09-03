import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import App from './app/App.jsx';
import './styles/global.css';

createRoot(document.getElementById('root')).render(createElement(App));
