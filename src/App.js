import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import UserList from './components/UserList.js';
import UserForm from './components/UserForm.js';

function App() {
    const [user, setUsers] = useState([]);

    const handleUserAdded = (newUser) => {
        setUsers([...user, newUser]);
    };
  return (
        <div className="App">
            <h1>User Management</h1>
            <UserForm onUserAdded={handleUserAdded} />
            <UserList />
        </div>
    );

}

export default App;
