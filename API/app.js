var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(3030, function () {
  console.log('CORS-enabled web server listening on port 3030')
})

// var mysql = require("mysql");
// var poolCluster = mysql.createPoolCluster();
// poolCluster.add("node0", {
//   host: "localhost",
//   port: "3306",
//   database: "mymariaDB",
//   user: "devchon",
//   password: "devchon101",
//   charset: "utf8mb4",
// });

// poolCluster.getConnection(function (err, connection) {
// 	if (err) {
// 	  console.log(err);
// 	} else {
// 	  connection.query("SELECT * FROM example", function (err, rows) {
// 		if (err) {
// 		  console.log(err);
// 		} else {
// 		  console.log("ALL FREE: ");
// 		  console.log(rows);
// 		  connection.release();
// 		}
// 	  });
// 	}
//   });

  