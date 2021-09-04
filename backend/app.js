// -------- Importation des packages -------- //
// import du framework express
const express = require('express');
//import de bodyParser 
const bodyParser = require('body-parser');

// -------- Importation des routes -------- //
const userRoutes = require("./routes/user");

// -------- utilisation des imports -------- //
// mise en place du framework express
const app = express();


// paramétrage des entetes des requetes globales
app.use((req, res, next) =>{
    // autorisaion d'accès : tout le monde
    res.setHeader('Access-Control-Allow-Origin', '*');
    // autorisation d'utilisation des entetes définies
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // autorisation pour utiliser les méthodes définies
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //on passe au middleware suivant
    next();
});


// mise en place de bodyParser 
// permet de recuperer les arguments et paramètres dans les header de requetes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// utilisation des routes crées après import
app.use('/api/user', userRoutes);

module.exports = app;