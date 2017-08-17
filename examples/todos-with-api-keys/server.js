const express = require('express');
const OopsieSite = require('./../../src/index.js');
const app = express();

const siteId = "6a4a3a28-23af-4693-a5fb-ab93bca9c803";
const customerId = "fefa1dbf-5f6d-4d38-aac1-1298fa80d4cf";
let apiUrl = 'http://oopsie-dev.techoopsie.com/api/api/v1';
//apiUrl = 'http://localhost:8080/api/v1';
const oopsieSite = new OopsieSite(apiUrl, siteId, customerId);
let todoResource;
function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

app.use(nocache);

app.use(express.static('public'))
app.use(express.static('node_modules'));


app.get('/todos', (req, res) => {

    todoResource.get().limit(10).execute((err, todos) => {
        if (err) {
            res.status(err.code).send(err.message);
            return;
        }
        res.json(todos);
    });

});

oopsieSite.init(err => {

    if (err) {
        console.log(err);
        throw new Error(err.message);
    }

    let todoApp = oopsieSite.getApp('TodoAppWithApiKey');
    if (!todoApp) {
        throw new Error('Didnt find app');
    }
    
    todoResource = todoApp.getResource('Todo');
    // We wait for oopsie to init before we start listen.
    app.listen(3000);
});
