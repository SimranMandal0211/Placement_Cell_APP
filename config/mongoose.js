const mongoose = require('mongoose');
const env = require('../config/environment');

// module.exports.db = async () => {
//     try{
//       await mongoose.connect(env.db)
//       console.log('connect to MongoDB sucessfully')
//     }catch(error){
//       console.timeLog('connect failed' +error.message)
//     }
//   }

// local mongodb connection
mongoose.connect(env.db);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function(){
    console.log('connected to database:: MongoDB');
});

module.exports = db;
