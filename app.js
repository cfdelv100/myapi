// src/app.js
import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './app.css';

const App = () => {
    const [user, setUseres] = useState([]);

    const handleUserAdded = (newUser) => {
        setUsers([...users, newUser]);
    };

    return (
        <div className="App">
            <h1>User Management</h1>
            <UserForm onUserAdded={handleUserAdded} />
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/add" element={< UserForm />} />
            </Routes>
            <UserList />
        </div>

    );
};

export default App;

