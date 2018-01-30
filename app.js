const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const task = require('./api/task');
var hash = require('object-hash');
var nodemailer = require('nodemailer');


app.use(bodyParser.json({ extended: false }));

// Route principale
app.get('/', (req, res) => {
	task.tempDataExist();
	res.redirect('/patients');
});

// Route pour afficher tous les patients
app.get('/patients', (req, res) => {
 	res.sendFile(path.join(`${__dirname}/test.json`));
});

// Route pour sélectionner un patient spécifique et afficher les listes des patients sélectionnés
app.get('/patient/:id', (req, res) => {
	task.displayPatient(req.params.id);
	res.sendFile(path.join(`${__dirname}/dataPatientDisplay.json`));
});

// Route pour envoyer par email la sélèction des patients
app.post('/patient/mail', (req, res) => {
	task.mailPatients();
	res.redirect('/patients');
});

// Route pour ajouter un patient
app.post('/patient', (req, res) => {
	var obj = req.body;
	task.addOnePatient(obj);
 	res.redirect('/patients');
});

// Route pour supprimer un patient
app.delete('/patient/delete/:id', (req,res) => {
	task.deleteP(req.params.id);
	res.redirect('/patients');
});

// Route pour modifier un patient
app.put('/patient/:id', (req, res) => {
	var id = req.params.id;
  	var obj = req.body;
  	task.modifyPatient(id, obj);
  	res.redirect('/patients');
});

app.listen(1345, () => {
 	console.log('Server running on port 1345...');
});
