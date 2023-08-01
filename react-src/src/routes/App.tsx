import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginRoute from './Login/LoginRoute';
import UserRoute from './Users/Users';
import PostRoute from './Posts/Posts';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/blog/users" element={<UserRoute/>} />
                <Route path="/blog/posts" element={<PostRoute/>} />
                <Route path="/blog/login" element={<LoginRoute/>} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;