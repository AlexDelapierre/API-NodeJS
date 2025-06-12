require('dotenv').config(); // Charger les variables d'environnement
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
