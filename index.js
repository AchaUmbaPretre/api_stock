const express = require('express');
const cors = require('cors');
const colors = require('colors')
const app = express();
const dotenv = require('dotenv')

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', (req, res)=>{
    res.send('bonjour')
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(
        `le serveur est connecté au port ${process.env.PORT}`
          .bgCyan.white
      );
  });