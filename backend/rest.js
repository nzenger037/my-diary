const express = require('express');
const bodyParser = require('body-parser');
const DiaryEntryModel = require('./entry-schema')
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb+srv://nzenger110:<db_password>!@diarycluster.byc55.mongodb.net/diarydb?retryWrites=true&w=majority&appName=DiaryCluster')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(() => {
        console.log('Error connecting to MongoDB');
    })


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nzenger110:<db_password>@diarycluster.byc55.mongodb.net/?retryWrites=true&w=majority&appName=DiaryCluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.delete('/remove-entry/:id', (req, res) => {
    DiaryEntryModel.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: 'Post deleted'
            })
        })
})

app.put('/update-entry/:id', (req, res) => {
    const updatedEntry = new DiaryEntryModel({ _id: req.body.id, date: req.body.date, entry: req.body.entry })
    DiaryEntryModel.updateOne({ _id: req.body.id }, updatedEntry).then(() => {
        res.status(200).json({
            message: 'Update completed'
        })
    })
})

app.get('/diary-entries', (req, res, next) => {
    DiaryEntryModel.find().then((data) => {
        res.json({ 'diaryEntries': data });
    }).catch(() => {
        console.log('Error fetching entries');
    });
});

app.post('/add-entry', (req, res) => {
    const diaryEntry = new DiaryEntryModel({ date: req.body.date, entry: req.body.entry })
    diaryEntry.save();
    res.status(200).json({
        message: 'Post submitted'
    });
});

module.exports = app;