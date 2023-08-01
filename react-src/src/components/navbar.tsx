import React, { useEffect } from 'react';

const Navbar = () => {
    useEffect(() => {
        // Check if localStorage is empty
        const localStorageData = localStorage.getItem('user');
        if (!localStorageData) {
            // Redirect to /login
            window.location.href = '/blog/login';
        }
    }, []); // Ensure that the effect runs only once on component mount

    const handleSignOut = () => {
        // Implement your signout logic here
        // For example, clearing localStorage and redirecting to /login
        localStorage.removeItem('user');
        window.location.href = '/blog/login';
    };
    return (
        <div className="header">
                <h1>Dashboard</h1>
                <a href="/blog/posts"><h1>Posts</h1></a>
                <a href="/blog/users"><h1>Users</h1></a>
                <h1></h1>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
    )
}

export default Navbar