# MATHIEUgregory_P7_OC
P7 OpenClassrooms

# Back
## Required
NodeJs est requis : https://nodejs.org/fr/download/

MySQL Server : https://dev.mysql.com/downloads/mysql/

Pour importer la base de données, dans le terminal du back :

sequelize db:create    puis sequelize db:migrate
## Required package 
express : npm install express

express-rate-limit : npm install express-rate-limit

bcrypt : npm install bcrypt

dotenv : npm install dotenv

jsonwebtoken : npm install jsonwebtoken

multer : npm install multer

mysql : npm install mysql

mysql2 : npm install mysql2

path : npm install path

sequelize : npm install sequelize

sequelize-cli : npm install -g sequelize-cli

validator : npm install validator

fs : npm install fs

nodemon : npm install -g nodemon

## Required file
.env with 

TOKEN_SECRET=   // clé secrète du token

PORT=   // Port du serveur

DB_USER=    // Utilisateur d'accès à la database 

DB_PASSWORD=    // Mot de passe d'accès à la database

DB_NAME=    // Nom de la database

DB_HOST=    // Localisation de la database 

You can run the server with : nodemon server


# front 
Framework : VueJs 

CLI : npm install -g @vue/cli

Router : npm install vue-router@next

Vuex : npm install vuex@next

axios : npm install axios

### Compiles and hot-reloads for development
npm run serve

### Compiles and minifies for production
npm run build

### Lints and fixes files
npm run lint

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
