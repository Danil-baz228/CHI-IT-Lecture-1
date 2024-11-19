const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const USERS_FILE = './users.json';


const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};


const writeUsersToFile = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};


app.get('/', (req, res) => {
    res.json({ author: 'Ваше Ім\'я' });
});


app.get('/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});


app.post('/users', (req, res) => {
    const { user, email } = req.body;
    if (!user || !email) {
        return res.status(400).json({ error: 'User and email are required' });
    }

    const users = readUsersFromFile();
    const newUser = { id: Date.now().toString(), user, email };
    users.push(newUser);
    writeUsersToFile(users);

    res.status(201).json(newUser);
});


app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { user, email } = req.body;

    let users = readUsersFromFile();
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (user) users[userIndex].user = user;
    if (email) users[userIndex].email = email;

    writeUsersToFile(users);
    res.json(users[userIndex]);
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let users = readUsersFromFile();
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    writeUsersToFile(users);

    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
