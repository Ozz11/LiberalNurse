const fs = require('fs');
var gutil = require('gulp-util'); // Sert à colorer les logs sur la console
var nodemailer = require('nodemailer');
var jsonObj = require('../test.json');
var PDFDocument = require('pdfkit'); // Sert à la création du fichier PDF

var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

var ID_LENGTH = 8;

var Infirmier = {
	table: []
 };

 var Patient = {  // Table temporaire pour la sélection des patients
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

addOnePatient = function(dataToAdd){
	var id_y = generate();
	fs.readFile('test.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(gutil.color.red(err));
		} else {
			const myObj = {id: id_y};
			const newObj = Object.assign(myObj, dataToAdd);
			Infirmier = JSON.parse(data); 
			Infirmier.table.push(newObj); 
			var json = JSON.stringify(Infirmier); 
			fs.writeFile('test.json', json, 'utf8');
			console.log("Patient " + id_y + " added");
	}});	
}

loadScript = function(filename){
	var fileref=document.createElement('script');
	fileref.setAttribute("type", "text/javascript");
	fileref.setAttribute("src", filename);
	document.getElementsByTagName("head")[0].appendChild(fileref);
}

tempDataExist = function(){  // Supprime les fichiers temporaire
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
			for (var i = 0; i < Infirmier.table.length; i++) { // Boucle pour chercher le patient à l'id cherché		
				 if (idPatient === Infirmier.table[i].id) { // Permet de remplir les variables déclarées au début de la fonction
					nomPatient = Infirmier.table[i].nom;	
					prenomPatient = Infirmier.table[i].prenom;
				}				
			}
			Patient.table.push({_nomPatient:nomPatient, _prenomPatient:prenomPatient}) // Rempli la table Patient
			var json = JSON.stringify(Patient);
			fs.writeFile('dataPatientDisplay.json', json, 'utf8');
		}
	});
}

convertJsonToPDF = function(){
	fs.readFile('dataPatientDisplay.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(gutil.colors.red(err));
		} else {
			Patient = JSON.parse(data);
			doc = new PDFDocument;
			doc.pipe(fs.createWriteStream('ListedesPatient.pdf')); // Création du fichier PDF vide
			for (var i = 0; i < Patient.table.length; i++) { // Boucle pour écrire dans le fichier PDF créé
				var nomPdf = Patient.table[i]._nomPatient;
				var prenomPdf = Patient.table[i]._prenomPatient;
				doc.text("Nom : " + nomPdf + " Prénom : " + prenomPdf + "\r\n");
			}
			doc.end(); // Sauvegarde du fichier PDF
		}
	});
}

mailPatients = function()//MailExpediteur, MdpExpediteur
{
	convertJsonToPDF();
	var smtpTransporter = nodemailer.createTransport({
  		service: "Gmail", // Rentrer le service mail utilisé
  		auth: {
    			user: '', // Contact émetteur valide
    			pass: '' // Mot de passe émetteur valide
  		}
	});

	var mailOptions = 
		{
  			from: "", // Adresse d'émission
  			to: '', // Adresse de réception
  			subject: 'Envoie de la sélection des patients en PDF', // Sujet de l'email
  			attachments: [ // Fichier join à l'email
						{
						  	filename: 'ListedesPatient.pdf',
						  	path: './ListedesPatient.pdf',
    						contentType: 'application/pdf'
						},
					]
		};

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

exports.addOnePatient = addOnePatient;
exports.deleteP = deleteP;
exports.loadScript = loadScript;
exports.displayPatient = displayPatient;
exports.mailPatients = mailPatients;
exports.tempDataExist = tempDataExist;
exports.tempDataExist = tempDataExist;
exports.modifyPatient = modifyPatient;
