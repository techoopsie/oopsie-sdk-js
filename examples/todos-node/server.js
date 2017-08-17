const express = require('express');
const OopsieSite = require('./../../src/index.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const siteId = "6a4a3a28-23af-4693-a5fb-ab93bca9c803";
const customerId = "fefa1dbf-5f6d-4d38-aac1-1298fa80d4cf";
let apiUrl = 'http://oopsie-dev.techoopsie.com/api/api/v1';

const oopsieSite = new OopsieSite(apiUrl, siteId, customerId);
let todoResource;

app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.get('/todos', (req, res) => {

    todoResource.get().limit(10).execute((err, todos) => {
 
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.json(todos);
    });

});

app.post('/todos', (req, res) => {
    let body = req.body;
    todoResource.create().withParams(body).execute((err, todo) => {
        if (err) {
            res.status(err.status).send(err.message);
            return;
        }
        res.json(todo);
    });
});

oopsieSite.init(err => {

    if (err) {
        console.log(err);
        throw new Error(err.message);
    }
    // This one should always be kept hidden.
    oopsieSite.setApiKey('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjMzJlZjY5MS0xODQyLTQ4ZDMtODI0ZS1iNDNhN2ZjYjkxNzEiLCJkZXNjciI6IlRvZG8iLCJzaXRlIjoiNmE0YTNhMjgtMjNhZi00NjkzLWE1ZmItYWI5M2JjYTljODAzIiwiaXNzIjoiZmVmYTFkYmYtNWY2ZC00ZDM4LWFhYzEtMTI5OGZhODBkNGNmIiwidHlwZSI6ImFwaUtleSIsImlhdCI6MTUwMjk4NzU2NSwianRpIjoiYzMyZWY2OTEtMTg0Mi00OGQzLTgyNGUtYjQzYTdmY2I5MTcxIn0.0Hfch2uIO9KHNlBb2tK4zBtTCZXwRGk5zkqMeMcoAFo');
    let todoApp = oopsieSite.getApp('TodoAppWithApiKey');

    if (!todoApp) {
        throw new Error('Didnt find app');
    }
    
    todoResource = todoApp.getResource('Todo');
    console.log('Initialized, starting node')
    // We wait for oopsie to init before we start listen.
    app.listen(3000);
});
