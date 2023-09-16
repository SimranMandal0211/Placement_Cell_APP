const mongoose = require('mongoose');
const env = require('../config/environment');

// local mongodb connection
mongoose.connect(env.db);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function(){
    console.log('connected to database:: MongoDB');
});

module.exports = db;


// 2.
// module.exports.db = async () => {
//     try{
//       console.log('db string',env.db);
//       await mongoose.connect(env.db)
//       console.log('connect to MongoDB sucessfully')
//     }catch(error){
//       console.timeLog('connect failed' +error.message)
//     }
//   }