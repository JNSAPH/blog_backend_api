import React, { useState } from 'react';
import { sendLoginRequest } from '../../utils/backend';

import './LoginRoute.css'; // Import the CSS file containing the styles
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {

        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        const response = await sendLoginRequest(username, password);

        if (response.error) {
            console.log(response.body);
            setError(response.body);
        } else {
            setError('');
            // save response.body to local storage
            localStorage.setItem('user', response.body);
            // redirect to home page
            window.location.href = '/blog/posts';
        }

    };

    return (
        <div className="login-body"> {/* Updated class name here */}
            <div className="login-card">
                <h1 className="login-title">Login</h1>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="button" onClick={handleLogin} className="login-btn">
                        Login
                    </button>
                    <p className="errorMsg">{error}</p>
                </form>
            </div>
        </div>
    );
    
};

export default Login;
