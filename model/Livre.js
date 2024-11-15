const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  auteur: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Livre = mongoose.model('Livre', livreSchema);

module.exports = Livre;