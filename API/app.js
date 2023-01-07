var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const fileUpload = require("express-fileupload");
const path = require("path");
const mime = require('mime');
const fs = require('fs');

// Use cors to allow cross origin resource sharing
app.use(cors());
// Use the express-fileupload middleware
app.use(fileUpload());
var mysql = require("mysql");

var poolCluster = mysql.createPoolCluster();
poolCluster.add("node0", {
  host: "192.168.1.22",
  port: "3306",
  database: "mymariaDB",
  user: "devchon",
  password: "devchon101",
  charset: "utf8mb4",
});

app.get("/getUser", jsonParser, function (req, res, next) {
  poolCluster.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
    } else {
      connection.query("SELECT * FROM User", function (err, rows) {
        if (err) {
          res.json({ err });
        } else {
          res.json({ rows });
          // connection.end();
          console.log(rows);
          connection.release();
        }
      });
    }
  });
});

app.post("/register", jsonParser, function (req, res, next) {
  poolCluster.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        "INSERT INTO User (UserName, Password, fName, lName, PhoneNumber, Address) VALUES (?, ?, ?, ?, ?, ?);",
        [
          req.body.userName,
          req.body.passWord,
          req.body.fName,
          req.body.lName,
          req.body.phoneNumber,
          req.body.address,
        ],
        function (err) {
          if (err) {
            res.json({ err });
          } else {
            res.json({ status: "success" });
            connection.release();
          }
        }
      );
    }
  });
});

app.post("/login", jsonParser, function (req, res, next) {
  poolCluster.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        "SELECT * FROM User WHERE UserName = ? AND Password = ?;",
        [req.body.userName, req.body.passWord],
        function (err, rows) {
          if (err) {
            res.json({ err });
          } else {
            // console.log(req.body.userName);
            // console.log(req.body.passWord);
            if (rows.length == 0) {
              res.json({ data: "Not found" });
              connection.release();
            } else {
              res.json({ status: "success" });
              console.log(rows);
              console.log(rows.length);
              console.log(res.statusCode);
              connection.release();
            }
          }
        }
      );
    }
  });
});

app.post("/disease", jsonParser, function (req, res, next) {
  poolCluster.getConnection(function (err, connection) {
	//   let disease = new disease({
	// 	DiseaseID: '',
	// 	DiseaseName: '',  //update this
	// 	InfoDisease: '',
	// 	ProtectInfo: '',
	// 	ImageName: '',
  	// })
    if (err) {
      console.log(err);
    } else {
      connection.query(
        "SELECT * FROM Disease WHERE DiseaseName = ?;",
        [req.body.name],
        function (err, data) {
          if (err) {
            res.json({ err });
          } else {
            res.json({ data: data });
            // connection.end();
            console.log(data[0].DiseaseID);
            connection.release();
          }
        }
      );
    }
  });
});

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files;
  console.log(sampleFile.file.name);
  uploadPath = __dirname + "/image/" + sampleFile.file.name;
  console.log(uploadPath);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    res.send("File uploaded!");
  });
});

app.get('/image/:filename', (req, res) => {
	const filePath = path.join(__dirname, '/image/', req.params.filename);
	console.log(filePath);
	const fileType = mime.lookup(filePath);
  
	fs.readFile(filePath, (err, data) => {
	  if (err) throw err;
  
	  res.writeHead(200, {'Content-Type': fileType});
	  res.end(data);
	});
  });

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
  console.log("CORS-enabled web server listening on port 3030");
});
