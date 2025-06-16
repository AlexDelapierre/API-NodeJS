const express = require('express');
const Thing = require('./models/Thing');
const { connectToDatabase } = require('./config/database');

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Routes
app.post('/api/stuff', (req, res) => {
  const thing = new Thing({
    ...req.body
  });

  thing
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré en base de données !' }))
    .catch((error) => {
      console.error('Erreur lors de l\'enregistrement :', error);
      res.status(400).json({ error });
    });
});

app.get('/api/stuff', (req, res) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      if (!thing) {
        return res.status(404).json({ message: 'Objet non trouvé' });
      }
      res.status(200).json(thing);
    })
    .catch(error => res.status(400).json({ error }));
});


// Lancement serveur uniquement après connexion à la base réussie
connectToDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log('Serveur lancé sur le port 3001');
    });
  })
  .catch((error) => {
    console.error('Impossible de démarrer le serveur, erreur de connexion à la DB :', error);
  });

module.exports = app;
