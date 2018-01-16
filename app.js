const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
var hash = require('object-hash');

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

});
var cp = 0;
// Route pour ajouter un patient
app.post('/patient', (req, res) => {
	var nom = req.body.name;
	var prenom = req.body.lastname;
	console.log(req.body.name);
	if (cp == 0 ) {
		ajouterIfNot(nom, prenom);
		cp++;
	}else{
		ajouterIfYes();
		cp++;
	}
	
 	res.redirect('/patients');
});

app.delete('/patient', (req,res) => {
	
});

// Route pour modifier un patient
app.put('/patient/:id', (req, res) => {

});

app.listen(1345, () => {
 	console.log('Server running on port 1345...');
});

var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

var ID_LENGTH = 8;

var generate = function() {
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}

var Infirmier = {
	table: []
 };

ajouterIfNot = function(Nom, Prenom){
	var id_t = generate();
	Infirmier.table.push({id: id_t, nom:Nom, prenom: Prenom});
	var json = JSON.stringify(Infirmier);
	
	console.log(id_t);
	fs.writeFileSync("test.json", json , "UTF-8");
}

ajouterIfYes = function(){
	var id_y = generate();
	fs.readFile('test.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(err);
		} else {
		Infirmier = JSON.parse(data); 
		Infirmier.table.push({id: id_y, nom:"albert", prenom:"la grenouille"}); 
		json = JSON.stringify(Infirmier); 
		fs.writeFile('test.json', json, 'utf8'); 
	}});
} 