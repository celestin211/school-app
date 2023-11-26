/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import './styles/login.css';
import './styles/dashboard.css';
import './styles/school-dashboard.css';
import './styles/video-enter.css';
import './styles/toggle-menu-open.css';
import './styles/dropdown-styles.css';
import './styles/video-tchat.css';
// start the Stimulus application
import React from 'react';
import Chat from './js/video-calling/video-call.index';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Chat />);

