import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginRoute from './Login/LoginRoute';
import UIRoute from './UI/UIRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UIRoute/>} />
                <Route path="/login" element={<LoginRoute/>} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;