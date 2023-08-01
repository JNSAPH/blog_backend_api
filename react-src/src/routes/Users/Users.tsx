import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { getAllUsers, deleteUser, createUser } from '../../utils/backend'; // Assuming there's a function called deleteUser in your backend API

import './Users.css'

interface UserRouteProps { }

const UserRoute: React.FC<UserRouteProps> = () => {
    const [users, setUsers] = useState<string[]>([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    async function getUsers() {
        const response = await getAllUsers();
        setUsers(response.body);
    }

    async function handleSignUp() {
        try {
            if (username === '' || password === '') {
                alert('Please enter a username and password');
                return;
            }

            const response = await createUser(username, password);
            if (response.statusCode === 200) {
                alert(response.body)
                setUsers((prevUsers) => [...prevUsers, username]);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle error if needed
        }
    }

    async function handleDeleteUser(user: string) {
        try {
            const response = await deleteUser(user);
            if (response.statusCode === 200) {

                alert(response.body)
                setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error if needed
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Create User</h1>

            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div >
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="button" onClick={handleSignUp}>
                Login
            </button>

            <hr />
            <h1>All Users</h1>
            <ul className="user-list"> {/* Wrap the list with <ul> for an unordered list or <ol> for an ordered list */}
        {users.map((user) => (
          <li key={user}>
            <div className="user-item">
              <h3>{user}</h3>
              <button onClick={() => handleDeleteUser(user)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
            <h1></h1>
        </div>
    );
};

export default UserRoute;
