
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = (URI) => {
  try {
    const mongoose = require('mongoose')
mongoose.connect('mongodb://user:user123@cluster0-shard-00-00.arwzj.mongodb.net:27017,cluster0-shard-00-01.arwzj.mongodb.net:27017,cluster0-shard-00-02.arwzj.mongodb.net:27017/bookdb?ssl=true&replicaSet=atlas-f3wnz1-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    const dbConnection = mongoose.connection
dbConnection.on('error', (err) => console.log(`Connection error ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

  } catch (error) {
    setTimeout(dbConnection,3001)
  }
};

module.exports = dbConnection;

