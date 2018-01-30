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

Dans la barre de requête, tapez la première route (localhost:1345/)

Cela va rediriger sur notre page principale (localhost:1345/patient).
Une fois arrivé faire les appels suivants :

En **POST** pour la **création**, faire :  localhost:1345/patient

- Dans Postman, vous vous situez dans l’onglet « Authorization ».

- Cliquez sur l’onglet « Body », en dessous cliquez sur l’option : « raw ».

- Toujours sur la même barre de navigation vous trouvez une flèche grise vers le bas,
  cliquez dessus et sélectionnez « JSON »
  [ Image Body - raw - JSON](https://imgur.com/a/oBsBj)

 - Dans la fenêtre de code suivez la syntaxe suivante pour créer le patient de votre choix
  [syntaxe DANS le Body](https://imgur.com/a/oBsBj). Une fois votre code écrit, cliquez sur **SEND**
- Après avoir SEND la requête, celle-ci créée un patient et vous l’affiche.


```json
{
	"toto": "eee",
}
```
> **Conseils :** Créez plusieurs patient pour avoir une meilleur expérience d'utilisation.

## Delete

-	**Copiez l'ID** d'un patient que vous venez de générer. L'id se trouve dans la fenêtre du bas.
[Where is my ID ?](https://imgur.com/a/oBsBj)
-	Passez maintenant en **DELETE** et écrivez l'URL suivante (localhost:1345/patient/delete/**ID_a_Coller**)
- Faites un SEND et voyez, le patient est maintenant supprimé.

## Update
-	Passez maintenant en PUT et faites localhost:1345/patient/**ID_du_patient_à_modifier**	
-	Dans la fenêtre de code choisissez l'information que vous désirez modifier.
-	Cela fait, faites un SEND. Le patient aura vos modifications.

> **RAPPEL** : Pour afficher la liste de patients, tapez la première route (localhost:1345/).

## Affichage d'un patient choisi

-	Passez en GET et faites localhost:1345/patient/**ID_du_patient_choisi**	
Cette commande vous affiche le patient souhaité.

## Sélection de plusieurs patients 
## Transformation en PDF
## Envoi d'un mail
-	 
-	
-	
Appel type id paramètre dans url :id préciser id requête et réponse.
