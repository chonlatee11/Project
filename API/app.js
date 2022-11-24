var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.use(cors())

var mysql = require("mysql");
const { json } = require('express');
var poolCluster = mysql.createPoolCluster();
poolCluster.add("node0", {
  host: "localhost",
  port: "3306",
  database: "mymariaDB",
  user: "devchon",
  password: "devchon101",
  charset: "utf8mb4",
});

app.post('/register', jsonParser,  function (req, res, next) {
  poolCluster.getConnection(function (err, connection) {
	if (err) {
	  console.log(err);
	} else {
	  connection.query("CREATE TABLE `mymariaDB`.`Researcher` (`researcherID` INT NOT NULL AUTO_INCREMENT , `Email` TEXT NOT NULL , `passWord` TEXT NOT NULL , `fName` TEXT NOT NULL , `lName` TEXT NOT NULL, `phonNumber` VARCHAR(10) NOT NULL, PRIMARY KEY (`researcherID`)) ENGINE = InnoDB CHARSET=utf8mb3 COLLATE utf8mb3_general_ci;;", function (err, rows) {
		if (err) {
		  res.json({err})
		} else {
		  connection.release();
      res.json({rows})
		}
	  });
	}
  });
})

app.post('/inserttable', jsonParser,  function (req, res, next) {
  poolCluster.getConnection(function (err, connection) {
	if (err) {
	  console.log(err);
	} else {
	  connection.query("INSERT INTO User (UserName, Password, fName, lName, PhoneNumber, Address) VALUES (?, ?, ?, ?, ?, ?);", 
    [req.body.userName, req.body.passWord, req.body.fName, req.body.lName, req.body.phoneNumber, req.body.address] ,function (err, rows) {
		if (err) {
		  res.json({err})
		} else {
		  connection.release();
      res.json({rows})
		}
	  });
	}
  });
})

app.listen(3030, function () {
  console.log('CORS-enabled web server listening on port 3030')
})

  