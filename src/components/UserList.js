//components/UserList.js

// imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Grab and fetch users from the API
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <u1>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </u1>
        </div>
    );
};

export default UserList;