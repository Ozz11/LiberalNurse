const fs = require('fs');
var gutil = require('gulp-util');

var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

var ID_LENGTH = 8;

var Infirmier = {
	table: []
 };

 var Patient = {
 	table: []
 };

 var generate = function() {
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }


deleteP = function(index){
	var indexADelete;
	fs.readFile('test.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(gutil.color.red(err));
		} else {
			Infirmier = JSON.parse(data); 		
			for (var i = 0; i < Infirmier.table.length; i++) {				
				if (index === Infirmier.table[i].id) {
					indexADelete = i;	
				}				
			}
			console.log("index",indexADelete);
			Infirmier.table.splice(indexADelete,1);
			console.log("success delete");
			console.log("table", Infirmier.table);
			var json = JSON.stringify(Infirmier); 
			fs.writeFile('test.json', json, 'utf8');
		}
	});
}

ajouterIfYes = function(){
	var id_y = generate();
	fs.readFile('test.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(gutil.color.red(err));
		} else {
		Infirmier = JSON.parse(data); 
		Infirmier.table.push({id: id_y, nom:"albert", prenom:"la grenouille"}); 
		var json = JSON.stringify(Infirmier); 
		fs.writeFile('test.json', json, 'utf8'); 
	}});

	
} 

ajouterIfNot = function(Nom, Prenom){
	var id_t = generate();
	Infirmier.table.push({id: id_t, nom:Nom, prenom: Prenom});
	var json = JSON.stringify(Infirmier);
	
	console.log(id_t);
	fs.writeFileSync("test.json", json , "UTF-8");
}

loadScript = function(filename){
	var fileref=document.createElement('script');
	fileref.setAttribute("type", "text/javascript");
	fileref.setAttribute("src", filename);
	document.getElementsByTagName("head")[0].appendChild(fileref);
}

tempDataExist = function(){
	fs.exists('dataPatientDisplay.json', function(exists) {
		if(exists) {
    		console.log(gutil.colors.green('Le fichier existe. Suppression en cours.'));
			fs.unlink('dataPatientDisplay.json');
		} else {
    		console.log(gutil.colors.red('Le fichier n\'existe pas'));
  		}
	});
}

displayPatient = function(idPatient){
	var id;
	var nomPatient;
	var prenomPatient;
	fs.readFile('test.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(gutil.color.red(err));
		} else {
			Infirmier = JSON.parse(data); 		
			for (var i = 0; i < Infirmier.table.length; i++) {				
				 if (idPatient === Infirmier.table[i].id) {
					nomPatient = Infirmier.table[i].nom;	
					prenomPatient = Infirmier.table[i].prenom;
				}				
			}
			Patient.table.push({_nomPatient:nomPatient, _prenomPatient:prenomPatient})
			var json = JSON.stringify(Patient);
			fs.writeFile('dataPatientDisplay.json', json, 'utf8');
		}
	});
}

function MailPatients()
{
	var transporter = nodemailer.createTransport({
  		service: 'Gmail',
  		auth: 
  		{
    		user: 'dadalemaure@gmail.com', //a changer
    		pass: '23011995' // a changer
  		}
	});

//objet trop grand dans une fonction, c’est pourquoi j’ai préféré passer par une variable intermédiaire.

	var mailOptions = 
	{
  		from: mail.name+' <'+ mail.sender +'>',
  		to: 'robiclement@hotmail.com',
  		subject: 'Test de mon appli javascript',
  		text: mail.message,
  		html: mail.message,
  		attachments: [
						{
						  filePath: './nomFichier.ext'
						},
					]
	};

	transporter.sendMail(mailOptions, 
		function(err, response){
	  !!err ? console.error(err) : res.end();
	});
}

exports.ajouterIfNot = ajouterIfNot;
exports.ajouterIfYes = ajouterIfYes;
exports.deleteP = deleteP;
exports.loadScript = loadScript;
exports.displayPatient = displayPatient;
exports.MailPatients = MailPatients;
exports.tempDataExist = tempDataExist;
