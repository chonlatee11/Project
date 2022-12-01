var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


app.use(cors())

var mysql = require("mysql");
var poolCluster = mysql.createPoolCluster();
poolCluster.add("node0", {
   host: "localhost",
   port: "3306",
   database: "mymariaDB",
   user: "devchon",
   password: "devchon101",
   charset: "utf8mb4",
});

app.listen(3030, function () {
  console.log('CORS-enabled web server listening on port 3030')
})


app.post('/login', jsonParser,  function (req, res, next) {
  poolCluster.getConnection(function (err, connection) {
    if (err) {
        console.log(err);
        }else {
            connection.query("SELECT * FROM Admin WHERE email = ? AND password = ?;",
            [req.body.email, req.body.password], function (err, rows) {
                if (err) {
                    res.json({err})
                } else {
                    //  console.log(req.body.userName);
                    //  console.log(req.body.passWord);
                    if (rows.length == 0) {
                        res.json({data: "Not found"})
                        connection.release();
                    } else {
                        res.json({rows})
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

// app.post('/login', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     poolCluster.query(
//         "SELECT * FROM Admin WHERE email = ? AND password = ?",
//         [email, password],
//         (err, result) =>{
//             if(err){
//                 res.send({err: err})
//             }

//             if (result){
//                     res.send(result);
//             }else{
//                     res.send({message: "Wrong email/password"});
//             }
//         }
//     );
// });

// app.post('/insert',  jsonParser, function (req, res, next) {
// poolCluster.getConnection(function (err, connection) {
// 	if (err) {
// 	  console.log(err);
// 	} else {
// 	  connection.query("INSERT INTO Admin (name, email, password) VALUES (?,?,?);", 
//     [req.body.name, req.body.email, req.body.password], function (err, rows) {
// 		if (err) {
//       res.json({err})
// 		} else {
// 		  connection.release();
//       res.json({rows})
// 		}
// 	  });
// 	}
//   });
// })