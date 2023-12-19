const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

const app = express();


dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(
        `le serveur est connecté au port ${process.env.PORT}`
          .bgCyan.white
      );
  });