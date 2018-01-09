const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// Route principale
app.get('/', (req, res) => {

});

// Route pour afficher tous les patients
app.get('/patients', (req, res) => {
 	res.sendFile(path.join(`${__dirname}/test.json`));
});

// Route pour afficher un patient spécifique
app.get('/patient/:id', (req, res) => {
	displayPatient(id);
});

// Route pour ajouter un patient
app.post('/patient', (req, res) => {
 	res.redirect('/patients');
});

// Route pour modifier un patient
app.put('/patient/:id', (req, res) => {

});

app.listen(1345, () => {
 	console.log('Server running on port 1345...');
});

function displayPatient(idPatient){

}