# Instruction pour faire marcher ce projet: 

1) Commencer par créer un dossier frontend dans le dossier à côté du backend. 

Il faudra suivre les instructions vis à vis l'installation des packages nécessaires.
(Node.js, Angular et node-sass) toutes les infos nécessaires sont à cette adresse :
https://github.com/OpenClassrooms-Student-Center/dwj-projet6


2) Je vous reccomande d'utiliser Nodemon pour faire tourner le backend.
https://www.npmjs.com/package/nodemon


3) Il vous faudra un fichier .env avec les valeurs suivantes : 

```shell
DB_USER=admin
DB_USER_PASS=PASSWORD
DB_KEY=MRu66qG+PjUPJu(e3Z{?
PROCESS_ENV_CLUSTER=p6cluster.zuvde
```
 
Host et user sont nécessaire pour l'usage de la base de donnée,
Pass sert comme clef de criptage vous pouvez y mettre ce que vous 
souhaitez mais quelque chose de long et complexe sera plus difficile 
à craquer.
 
## Nota Bene
Ici je vous fournie ces valeurs mais en pratique c'est vous qui 
aurait comme résponsabilité de créer un serveur Mongodb et mettre 
des valeurs qui vous conviennent. 
Elles devraient être caché mais pour une démonstration cela 
simplifiera les choses.

