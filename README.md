# LiberalNurse

## Pour qui ?
Cette application concerne directement les **infirmiers libéraux.** Elle leur permet un gains de temps considérable lors du listing des soins prodigués pour chaque patient dont ils sont responsable. Grâce une utilisation simple,
ils auront la possibilité de **créer**, de **supprimer** & de **mettre à jour** différents patients. Tous, regroupés dans une **liste** qui pourra être **sauvegardé en format PDF & envoyé directement** sur leur **adresse email**.

## Mise en place de l’environnement nécessaire au bon fonctionnement de l’application.

Tout d'abord assurez-vous de bien tapez la commande : **npm install**

Cette commande va vous permettre une installation automatisé de tous les modules nécessaire au bon fonctionnement de notre application.

Les modules que vous installez grâce à cette commande sont les suivants :

Pour l’envoie de la fiche client par mail notre application utilise **nodemailer**. 

Pour l’affichage de la couleur nous utilisons **gulp-util**

Pour analyser un fichier JSON nous utilisons **body-parser**

# Comment utiliser notre application ?

## Create

- En **POST** 
-  localhost:1345/patient
La route, ci-dessus, fonctionne de la manière suivante :
```js
app.post('/patient')
addOnePatient(obj) // On attend un fichier json en paramètre dans lequel sera renseigné le nom et le prénom d'un patient.
```

https://github.com/Ozz11/LiberalNurse/blob/master/api/task.js#L50
 
 - Dans la fenêtre de code (Postman) suivez la syntaxe suivante pour créer le patient de votre choix  [syntaxe DANS le Body](https://imgur.com/a/oBsBj).
- Après avoir SEND la requête, celle-ci créée un patient et vous l’affiche.

> **Conseils :** Créez plusieurs patient pour avoir une meilleur expérience d'utilisation.

## Delete

-	**Copiez l'ID** d'un patient que vous venez de générer. L'id se trouve dans la fenêtre du bas.
[Where is my ID ?](https://imgur.com/a/oBsBj)
-	**DELETE** et écrivez l'URL suivante :

- (localhost:1345/patient/delete/**ID_a_Coller**)

Notre fonction permettra de prendre en paramètre l'id d'un patient, de match cet ID grâce à un parse dans notre tableau de patients et de le supprimer.

https://github.com/Ozz11/LiberalNurse/blob/master/api/task.js#L27

```js
DELETE /patient/delete/:id
task.deleteP(req.params.id); // Le paramètre correspond à l'id qu'on passe dans la requête.
```


## Update
-	Passez en **PUT** 
-	localhost:1345/patient/**ID_du_patient_à_modifier**	

```js
app.put('/patient/:id')
modifyPatient(id, obj);

// id : On renseigne un id dans la requête.
// obj : Objet json qui détient les changements fait par l'utilisateur.
```
Exemple de obj :  [syntaxe DANS le Body](https://imgur.com/a/oBsBj).

https://github.com/Ozz11/LiberalNurse/blob/master/api/task.js#L164


## Affichage & Sélection d'un patient

-	Passez en **GET**
-	 localhost:1345/patient/**ID_du_patient_choisi**	
Cette commande vous affiche le patient souhaité.

```js
app.get('/patient/:id')
task.displayPatient(req.params.id); 

//Ici l'id renseigné permet l'affichage
```

## Affichage de la liste des patients

- Passez en **GET** 
- localhost:1345/patients/

Affiche le fichier test.json

## Transformation en PDF
Automatique lors de l'envoie d'un email.

- La fonction permet de lire le fichier json de la selection des patients,
- créer le fichier pdf vierge, 
- le remplir avec les données du json,
- Enfin elle le stock à la racine du dossier de l'API.

https://github.com/Ozz11/LiberalNurse/blob/master/api/task.js#L114
## Envoi d'un mail

> **Conseil : Rentrez votre adresse d’expédition et de destinataire en dur pour faire votre test.**

- **POST**
- localhost:1345/patient/mail
```js
post('/patient/mail')
MailPatients();
```
- La fonction utilise le module nodemailer pour fonctionner.
- Utilise la fonction convertJsonToPDF();
- Elle utilise une adresse email et un mot de passe pour l'expediteur.
- Permet, dans un second temps, de renseigner le destinataire et tout cela grâce au protocole SMTP.

https://github.com/Ozz11/LiberalNurse/blob/master/api/task.js#L132
