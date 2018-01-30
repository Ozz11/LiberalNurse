const fs = require('fs');
var gutil = require('gulp-util');
var nodemailer = require('nodemailer');
var jsonObj = require('../test.json');

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

ajouterIfYes = function(Nom, Prenom){
	var id_y = generate();
	fs.readFile('test.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(gutil.color.red(err));
		} else {
		Infirmier = JSON.parse(data); 
		Infirmier.table.push({id: id_y, nom:Nom, prenom:Prenom}); 
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
    		console.log(gutil.colors.green('Le fichier \'dataPatientDisplay.json\' existe. Suppression en cours.'));
			fs.unlink('dataPatientDisplay.json');
		} else {
    		console.log(gutil.colors.red('Le fichier \'dataPatientDisplay.json\' n\'existe pas'));
  		}
	});
	fs.exists('ListedesPatient.pdf', function(exists) {
		if(exists) {
    		console.log(gutil.colors.green('Le fichier \'ListedesPatient.pdf\' existe. Suppression en cours.'));
			fs.unlink('ListedesPatient.pdf');
		} else {
    		console.log(gutil.colors.red('Le fichier \'ListedesPatient.pdf\' n\'existe pas'));
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

covertJsonToPDF = function(){
	fs.readFile('dataPatientDisplay.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(gutil.colors.red(err));
		} else {
			Patient = JSON.parse(data);
			for (var i = 0; i < Patient.table.length; i++) {
				var nomPdf = Patient.table[i]._nomPatient;
				var prenomPdf = Patient.table[i]._prenomPatient;
				fs.appendFile('ListedesPatient.pdf', nomPdf + " " + prenomPdf + "\r\n", 'utf8');
			}
		}
	});
}

function MailPatients()//MailExpediteur, MdpExpediteur
{
	convertJsonToPDF();
	var smtpTransporter = nodemailer.createTransport({
  		service: "Gmail",
  		auth: {
    			user: 'dadalemaure@gmail.com', //a changer
    			pass: '23011995' // a changer
  		}
	});

	//var existe = new ActiveXObject("Scripting.FileSystemObject").FileExists(dataPatientDisplay.json)

//objet trop grand dans une fonction, c’est pourquoi j’ai préféré passer par une variable intermédiaire.
	var mailOptions = 
		{
  			from: "dadalemaure@gmail.com",
  			to: 'damien.maure@ynov.com',
  			subject: 'Test de mon appli javascript',
  			attachments: [
						{
						  filePath: 'ListedesPatient.pdf'
						},
					]
		};

	// if (existe)
	// {
	// 	var mailOptions = 
	// 	{
 //  			from: "dadalemaure@gmail.com",
 //  			to: 'damien.maure@ynov.com',
 //  			subject: 'Test de mon appli javascript',
 //  			attachments: [
	// 					{
	// 					  filePath: './test.txt'
	// 					},
	// 				]
	// 	};
 //  	}
 //  	else{
 //  		console.log("Erreur pas de patients selectionné");
 //  	}

	smtpTransporter.sendMail(mailOptions, function(err, response){
	  !!err ? console.error(err) : res.end();
	  smtpTransporter.close();
	});
	console.log(gutil.colors.green("Mail envoyé"));
}

modifyPatient = function(id, dataToEdit) {

	//la fonction map va effectuer une boucle sur l'objet et rendre un objet final avec les modifications table par table
	const table = jsonObj.table.map((obj) => {
	  console.log(obj);
	  if (obj.id === id) {
		return Object.assign(obj, dataToEdit);
	  }
	  return obj;
	});
  
	jsonObj.table = table;
	var myJSONString = JSON.stringify(jsonObj);
	console.log("mapped :", myJSONString);
	fs.writeFile('test.json', myJSONString, 'utf8');
}

exports.ajouterIfNot = ajouterIfNot;
exports.ajouterIfYes = ajouterIfYes;
exports.deleteP = deleteP;
exports.loadScript = loadScript;
exports.displayPatient = displayPatient;
exports.MailPatients = MailPatients;
exports.tempDataExist = tempDataExist;
exports.tempDataExist = tempDataExist;
exports.modifyPatient = modifyPatient;
