# Utilisation de GitLab pour greco

## Processus

L'équipe de recette crée un ticket :

| ![Modèle](dev.png)| ![Modèle](int.png) | ![Modèle](for.png) |
|-------------------|--------------------|--------------------|
| **Mon ticket GitLab**<br>![Modèle](a_faire.png) | | |


Le développement est réalisé et prêt à être déployé sur INT :

| ![Modèle](dev.png) | ![Modèle](int.png) | ![Modèle](for.png) |
|--------------------|--------------------|--------------------|
| **Mon ticket GitLab**<br>![Modèle](termine.png) | | |


Le ticket est déployé sur INT et prêt à être testé par l'équipe de recette :

| ![Modèle](dev.png) | ![Modèle](int.png) | ![Modèle](for.png) |
|--------------------|--------------------|--------------------|
| | **Mon ticket GitLab**<br>![Modèle](a_faire.png) | |


Le ticket est validé et prêt à être déployé sur l'environnement suivant :

| ![Modèle](dev.png) | ![Modèle](int.png) | ![Modèle](for.png) |
|--------------------|--------------------|--------------------|
| | **Mon ticket GitLab**<br>![Modèle](termine.png) | |


Et ainsi de suite :

| ![Modèle](dev.png) | ![Modèle](int.png) | ![Modèle](for.png) |
|--------------------|--------------------|--------------------|
| | | **Mon ticket GitLab**<br>![Modèle](a_faire.png) |


## Résolution d'un ticket

* L'équipe de recette crée un ticket `Env. DEV` / `À faire` ;
* Le développeur s'assigne le ticket et change l'étiquette `À faire` en `En cours` ;
* Une nouvelle branche au nom explicite est créée depuis `develop`, préfixée par l'identifiant du ticket (par exemple : `312-requete-libre-agent-ajout-champ-civilite`) ;
l'ajout de l'identifiant dans le nom de la branche permet à Gitlab de la lier automatiquement au ticket ;
* Chaque part du développement est décomposé en `commits` préfixés par `#` suivi de l'identifiant du ticket (par exemple : `#312 Requête libre agent : Ajout du champ Civilité`) ;
ceci permet de lier le `commit` au ticket ;
* Le ticket est parcimonieusement testé ;
* L'étiquette est changée de `En cours` à `Terminé` ;
* Une demande de fusion est créée.


## Les demandes de fusion

* Après chaque lecture d'une demande de fusion, celle-ci est acceptée avec un 👍 ou une question ou un commentaire ;
* Si notre demande de fusion est commentée, soit nous apportons une réponse soit nous ajoutons un `commit` (qui devrait être automatiquement associé au commentaire) ;
* Si nous sommes le dernier à avoir lu la demande, elle peut être fusionnée si aucun commentaire est en attente.


Une fois le ticket déployé sur INT, le développeur modifie les étiquettes `Env. DEV` / `Terminée` en `Env. INT` / `À faire` pour l'équipe de recette. 
