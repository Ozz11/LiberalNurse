const fs = require('fs');

var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

var ID_LENGTH = 8;

var Infirmier = {
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
			console.log(err);
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
		}});
}

ajouterIfYes = function(){
	var id_y = generate();
	fs.readFile('test.json', 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(err);
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

displayPatient = function(idPatient){
	res.sendFile(path.join(`${__dirname}/test.json/:idPatient`));
}

exports.ajouterIfNot = ajouterIfNot;
exports.ajouterIfYes = ajouterIfYes;
exports.deleteP = deleteP;






    