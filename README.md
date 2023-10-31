#DOCUMENTATION HABILITATION

[school-app]

## Récuperation des ressources d'installation
* Depuis l'explorateur de fichiers, se rendre sur le disque réseau et parcourir le répertoire du projet : school-app
* Se rendre dans le dossier **01 - Ressources Installation**. Vous y trouverez les éléments suivants :

>  - .env.local
>  - composer.7z
>  - node.7z
>  - oracle_instantclient.7z
>  - outils.7z
>  - php.7z
>  - symfony.7z

* Copier toutes les archives sur le disque, dans le home (ex: C:\Users\\{username}-adc\).
* Sélectionner toutes les archives et les décompresser en effectuant **Clic droit > 7-Zip > Extraire Ici**

## Mise en place du proxy
* Ajouter les proxy http et https dans les variables d'environnement windows :

```
HTTP_PROXY=http://{username}:{password}@172.24.13.36:8080
HTTPS_PROXY=http://{username}:{password}@172.24.13.36:8080
NO_PROXY=172.0.0.1,localhost
 ```

## Installation d'Oracle
* S'assurer que la bonne version de Oracle 18c est installé. (Nécessite un compte administrateur)
* Ajouter le chemin du dossier **oracle_instantclient** dans la variable d'environnement PATH de windows.

## Installaton de PHP 8.1.10 NTS 64BITS
* Télécharger et installer **Git Bash** depuis https://git-scm.com/download/win
* Rajouter le chemin du dossier **symfony** dans la variable d'environnement PATH.
* Rajouter le chemin du dossier **php** dans la variable d'environnement PATH
* Vérifier dans le **php.ini** (a la racine du dossier php) que Opcache et l'extension oci8 sont bien activés.
* Lancer ensuite la commande suivante dans un invite de commande ou git bash :
```
php -v
```

* Le résultat attendu est le suivant (Bien s'assurer qu'il n'y a aucune erreur !) : 
```
PHP 8.1.10 (cli) (built: Aug 30 2022 18:08:04) (NTS Visual C++ 2019 x64)
Copyright (c) The PHP Group
Zend Engine v4.1.10, Copyright (c) Zend Technologies
    with Zend OPcache v8.1.10, Copyright (c), by Zend Technologies
```
* Télécharger et installer PHPStrom depuis https://www.jetbrains.com/fr-fr/phpstorm/download/#section=windows (Une licence vous sera attribuée par le chef de projet via un mail.)

## Installation de Composer

* Rajouter le chemin du dossier **composer** dans la variable d'environnement PATH.
* Ouvrir un invite de commande et lancer la commande :
```
composer.phar
```

* Résultat attendu :
```
   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 2.4.2 2022-09-14 16:11:15

[etc...]
```

## Installation de NodeJS 14.14.5
* Rajouter le chemin du dossier **node** dans la variable d'environnement PATH.
* Ouvrir un invite de commande et lancer la commande suivant pour vérifier la version de node :

```
node -v 
```
* Résultat attendu :
```
v14.18.0
```


* Effectuer ensuite la commande suivante pour copier la clé public dans le presse-papier :
```
cat ~/.ssh/id_ed25519.pub | clip
```

* Se rendre sur **Gitlab** et la coller dans Gitlab > Edit Profile > SSH Keys (Ne pas mettre de date d'expiration)


* Cloner ensuite le depot dans un dossier de votre choix (ex: C:\Users\\{username}-adc\Projets\) :

```
git config --global http.ssVerify false
```
```
git clone  https://github.com/celestin211/school-app.git
```


```
MAILER_DSN=smtp://localhost:25
```


* Lancer SQL Developer et ajouter une nouvelle connexion avec les identifiants utilisés ci-dessus.

## Installation du projet
* Ouvrir un invite de commande et se rendre dans le dossier **school-app** fraichement cloné et lancer les commandes suivants pour installer le projet :

```
composer.phar install
```
```
npm install
```
```
npm run dev
```

* Lancer ensuite les commandes doctrine pour importer les tables et fixtures vers la base de données :
```
symfony console d:m:m -n
```
```
symfony console d:f:l --group=for -n --append
```
* Les commandes doctrines pour vider et importer les tables et fixtures vers la base de données  :

```
php bin/console doctrine:schema:drop --force
php bin/console doctrine:query:sql "DROP table DOCTRINE_MIGRATION_VERSIONS"
php bin/console doctrine:query:sql "DROP table messenger_messages"
php bin/console doctrine:query:sql "DROP SEQUENCE MESSENGER_MESSAGES_SEQ"
php bin/console doctrine:migrations:migrate --no-interaction
php bin/console doctrine:fixtures:load --append --no-interaction --group=for
```


## Lancement du serveur
* L'installation de l'environnement étant terminée, il ne reste qu'à lancer le serveur local via les commandes suivantes :

<sub>Démarre le serveur et affiche les logs en continu</sub>
```
symfony start:server
```

<sub>Démarre le serveur et rends la main</sub>
```
symfony start:server -d
```

<sub>Arrête le serveur</sub>
```
symfony start:stop
```

