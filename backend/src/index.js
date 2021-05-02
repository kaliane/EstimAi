require("dotenv").config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
  
const app = express();

const environment = process.env.NODE_ENV || 'development';

if (environment == 'development'){
  app.use(cors());
}else{
  app.use(cors({
      origin: 'https://estimai.herokuapp.com'
  }));
}

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);

