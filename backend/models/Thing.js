const mongoose = require('mongoose');

// La méthode  Schema  de Mongoose permet de créer un schéma de données pour la base de données MongoDB.
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

// La méthode  model  transforme ce modèle en un modèle utilisable.
module.exports = mongoose.model('Thing', thingSchema);