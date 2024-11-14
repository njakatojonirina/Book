const mongoose = require('mongoose');

const connectDB = () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/livre';
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.log('Erreur de connexion MongoDB:', err));
};

module.exports = connectDB;