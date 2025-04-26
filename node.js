const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const messages = {
    'finance-and-savings': [],
    'share-market': [],
    'cooking': [],
    'general': [],
    'technology': []
};

// Get messages for a specific group
app.get('/api/messages', (req, res) => {
    const group = req.query.group;
    if (messages[group]) {
        res.json({ messages: messages[group] });
    } else {
        res.status(404).send('Group not found');
    }
});

// Post a new message to a group
app.post('/api/messages', (req, res) => {
    const group = req.query.group;
    const { text } = req.body;
    if (messages[group]) {
        messages[group].push({ text });
        res.status(201).send('Message sent');
    } else {
        res.status(404).send('Group not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
