//components/UserForm.js

// imports
import React, { useState } from 'react'; 
import axios from 'axios';

const userForm = ({ onUserAdded }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name)
            return;

        // send a POST request to the API
        axios.post('http://localhost:5000/api/users', { name })
            .then(response => {
                onUserAdded(response.data);
                setName('');
            })
            .catch(error => {
                console.error('Error adding user:', error);
            });
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholer="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default UserForm;