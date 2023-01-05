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
  host: "192.168.1.22",
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

app.post('/register', jsonParser,  function (req, res, next) {
	  poolCluster.getConnection(function (err, connection) {
		if (err) {
			console.log(err);
			}else {
				connection.query("INSERT INTO User (UserName, Password, fName, lName, PhoneNumber, Address) VALUES (?, ?, ?, ?, ?, ?);", 
				[req.body.userName, req.body.passWord, req.body.fName, req.body.lName, req.body.phoneNumber, req.body.address], function (err) {
					if (err) {
						res.json({err})
					} else {
						res.json({"status" : "success"})
						connection.release();
					}
				});
			  }
			});
		  })

app.post('/login', jsonParser,  function (req, res, next) {
	  poolCluster.getConnection(function (err, connection) {
		if (err) {
			console.log(err);
			}else {
				connection.query("SELECT * FROM User WHERE UserName = ? AND Password = ?;",
				[req.body.userName, req.body.passWord], function (err, rows) {
					if (err) {
						res.json({err})
					} else {
						// console.log(req.body.userName);
						// console.log(req.body.passWord);
						if (rows.length == 0) {
							res.json({data: "Not found"})
							connection.release();
						} else {
							res.json({status : "success"})
							console.log(rows);
							console.log(rows.length);
							console.log(res.statusCode);
							connection.release();
						}
						
					}
				});
			}
		});
	})

app.post('/disease', jsonParser,  function (req, res, next) {
	poolCluster.getConnection(function (err, connection) {
		if (err) {
		console.log(err);
		} else {
		connection.query("SELECT * FROM Disease WHERE name = ?;",
		[req.body.name], function (err, data){
			if (err) {
				res.json({err})
			} else {
				res.json({data})
				// connection.end();
				console.log(data);
				connection.release();
			  }
			});
		  }
		});
	  })

// app.post('/inserttable', jsonParser,  function (req, res, next) {
//   poolCluster.getConnection(function (err, connection) {
// 	if (err) {
// 	  console.log(err);
// 	} else {
// 	  connection.query("INSERT INTO User (UserName, Password, fName, lName, PhoneNumber, Address) VALUES (?, ?, ?, ?, ?, ?);", 
//     [req.body.userName, req.body.passWord, req.body.fName, req.body.lName, req.body.phoneNumber, req.body.address] ,function (err, rows) {
// 		if (err) {
// 		  res.json({err})
// 		} else {
// 		  connection.release();
//       	res.json({rows})
// 		  connection.end();
// 		}
// 	  });
// 	}
//   });
// })

app.listen(3030, function () {
  console.log('CORS-enabled web server listening on port 3030')
})