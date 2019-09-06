var mysql = require('mysql');
var config = require('./config/config.json')
var credentials = config['development']


module.exports = mysql.createConnection({
  host: "127.0.0.1",
  user: "gr8chairmanmeow",
  database: "transitmigoapi",
  password: "346#Bluff"
})

// var con = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "gr8chairmanmeow",
//   database: "transitmigoapi"
//   password: "346#Bluff"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });