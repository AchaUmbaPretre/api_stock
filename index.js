const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const produitRoutes = require('./routes/produitRoutes');
const inventaireRoutes = require('./routes/inventaireRoutes');
const bodyParser = require('body-parser');

const app = express();


dotenv.config();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use('/api/produit', produitRoutes);
app.use('/api/inventaire', inventaireRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(
        `le serveur est connecté au port ${process.env.PORT}`
          .bgCyan.white
      );
  });