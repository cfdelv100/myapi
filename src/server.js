'use strict';

/* 
TODO: 
-Implement jobsdatabase.users in the mySQL Database by creating more data
-Discover if can get json file online
-Create DB Sql queries to fill in data and test back end
DONE
-Create front end in react.js



*/

// server.js code to use express for entry point
const express = require('express');
const mysql = require('mysql2');
const app = express();

// middleware to part JSON requests
app.use(express.json());

// loading environment variables
require('dotenv').config();
// create a connection to the MySQL database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// connect to database 'jobdatabase'
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Test data for using in this sample, will implement to mySQL server
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];

// All POST methods to use in this program to build the api

// GET all users from /api/users
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fectching users:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(users);
    });
});

// GET /api/users/ :id to get a single user by id
app.get('/api/users/:id', (req, res) => {
    const user = users.find(x => x.id === parseInt(req.params.id));
    const query = 'SELECT id FROM users';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error getting id:', err);
            return res.status(404).json({ message: "User is not found..." });
        }
        res.json(user);
    });
});

// POST api/users to create a new user
app.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const query = 'INSERT INTO users (name) VALUES (?)';
    connection.query(query, [name], (err, results) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ message: 'Internal Server Error' });

        }
        res.status(201).json({ id: results. insertId, name})
    });
});

// PUT /api/users/:id - to update a user
app.put('/api/users/:id', (res, req) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is Required!' });
    }
    const query = 'UPDATE users SET name = ? WHERE id = ?';
    connection.query(query, [name, id], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ id, name });
    });
});

// DELETE /api/users/:id - Delete a user
app.delete('/api/users/:id', (res, req) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(400).json({ message: 'User not Found' });
        }
        res.status(204).send();

    });
    const userIndex = users.findIndex(x => x.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ messages: 'User is not found...' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});