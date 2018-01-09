const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false});

//Route pour afficher tous les patients
app.get('/patients', function(req, res) {
    //res.sendFile(path.join(`${__dirname}/test.json`));
})

//Route pour afficher un patient spécifique
app.get('/patient/:id', function(req, res) {

})

//Route pour ajouter un patient
app.post('/patient', function(req, res) {

})

//Route pour modifier un patient
app.put('/patient/:id', function(req, res) {

})

app.listen(1345, () => {
    console.log("Server running on port 1345...");
})

