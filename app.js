const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const task = require('task');
var hash = require('object-hash');


app.use(bodyParser.json({ extended: false }));

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
var cp = 0;
// Route pour ajouter un patient
app.post('/patient', (req, res) => {
	var nom = req.body.name;
	var prenom = req.body.lastname;
	
	if (cp == 0 ) {
		task.ajouterIfNot(nom, prenom);
		cp++;
	}else{
		task.ajouterIfYes();
		cp++;
	}
	//rrvfdfdsdsfrsegrdsgress
 	res.redirect('/patients');
});

app.delete('/patient/delete/:id', (req,res) => {
	task.deleteP(req.params.id);
	res.redirect('/patients');
	
});

// Route pour modifier un patient
app.put('/patient/:id', (req, res) => {

});

app.listen(1345, () => {
 	console.log('Server running on port 1345...');
});

function displayPatient(idPatient){
	res.sendFile(path.join(`${__dirname}/test.json/:idPatient`));
}
