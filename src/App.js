import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import UserList from './components/UserList.js';
import UserForm from './components/UserForm.js';
import axios from 'axios'

function App() {
    const [user, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        fetchUsers();

    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
            setError('');
        } catch (error) {
            setError('Failed to Fetch users');
        } finally {
            setLoading(false);
        }

    };

    const addUser = async () => {
        if (!newUser.trim()) {
            setError('Name cannot be empty');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/users', { name: newUser });
            setUsers([...user, response.data]);
            setNewUser('');
            setError('');
        } catch (error) {
            setError('Failed to add user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>User Management</h1>
            {/* Add User Form */}
            <div>
                <input
                    type="text"
                    placeholder="Enter User Name"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                />
                <button onClick={addUser} disabled={loading}>
                    {loading ? 'Adding...' : 'Add User'}
                </button>               
            </div>
            {/* Add Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Load Spinner */}
            {loading && <p>Loading...</p>}


           {/* Add User List */}
            <u1>
              {user.map(user => (
                  <li key={user.id}>{user.name}</li>
              ))}
             </u1>
                {/*<UserForm onUserAdded={handleUserAdded} />*/}
                {/*<UserList />*/}
        </div>
    );

};

export default App;
