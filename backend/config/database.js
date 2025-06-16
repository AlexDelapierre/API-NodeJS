require('dotenv').config(); // Charger les variables d'environnement

/*
// driver MongoDB natif (MongoClient)
const { MongoClient, ServerApiVersion } = require('mongodb');

// Récupérer l'URI depuis les variables d'environnement
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connexion à MongoDB réussie !");
  } catch (error) {
    console.error("❌ Échec de la connexion à MongoDB :", error);
  }
}

module.exports = {
  connectToDatabase,
  client
};
*/

// Connexion avec Mongoose
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connexion à MongoDB réussie !');
  } catch (error) {
    console.error('❌ Échec de la connexion à MongoDB :', error);
    throw error; // remonte l'erreur pour stopper le lancement si connexion impossible
  }
}

module.exports = {
  connectToDatabase
};

