var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.use(cors())

var mysql = require("mysql2");
const { json } = require('express');
var poolCluster = mysql.createPoolCluster();
poolCluster.add("node0", {
  host: "192.168.1.2",
  port: "3306",
  database: "mymariaDB",
  user: "devchon",
  password: "devchon101",
  charset: "utf8mb4",
});

app.get('/getUser', jsonParser,  function (req, res, next) {
  poolCluster.getConnection(function (err, connection) {
	if (err) {
	  console.log(err);
	} else {
	  connection.query("SELECT * FROM User", function (err, rows) {
		if (err) {
		  res.json({err})
		} else {
			res.json({rows})
			// connection.end();
			console.log(rows);
		  	connection.release();
		}
	  });
	}
  });
})

app.listen(3031, function () {
    console.log('CORS-enabled web server listening on port 3030')
  })