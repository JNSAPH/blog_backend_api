import React, { useEffect } from 'react';
import './UIRoute.css'
const UIRoute = () => {
    useEffect(() => {
        // Check if localStorage is empty
        const localStorageData = localStorage.getItem('user');
        if (!localStorageData) {
            // Redirect to /login
            window.location.href = '/login';
        }
    }, []); // Ensure that the effect runs only once on component mount

    const handleSignOut = () => {
        // Implement your signout logic here
        // For example, clearing localStorage and redirecting to /login
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className='ui-body'>
            <div className="header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
            <h1>Hello World</h1>
        </div>
    );
};

export default UIRoute;
