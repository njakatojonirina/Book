const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./connection/db');
const cors = require('cors');
const livreRoutes = require('./routes/LivresRoutes');
const app = express();
const port = 3000;
const path = require('path');

app.use(bodyParser.json());
app.use(cors());
connectDB();

app.use(express.static(path.join(__dirname, 'front')));

app.use(livreRoutes);

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});