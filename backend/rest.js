const express = require('express');

const app = express();

diaryEntries = [
    { id: 1, date: "October 31st", entry: "Happy Halloween!" },
    { id: 2, date: "November 5th", entry: "I ate a hamburger." },
    { id: 3, date: "December 25th", entry: "Merry Christmas!" }
];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/diary-entries', (req, res, next) => {
    res.json({ 'diaryEntries': diaryEntries });
})

module.exports = app;