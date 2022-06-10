import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ResourcesList from "./resources-list/ResourcesList";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="users/:userName" element={<ResourcesList />} />
        </Routes>
    </BrowserRouter>
);

