const express = require("express");

//creating app
const app = express();

//handling static HTML and EJS templates
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index"); //no need for ejs extension });
});

//route for contacts
app.get("/contacts", (req, res) => {
  res.render("contacts");
});

//route for register
app.get("/register", (req, res) => {
  res.render("register");
});

//make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Cart app listening at http://localhost:${port}`);
});

const mysql = require("mysql");
const databasename = "sql6440943";

var pool = mysql.createPool({
  connectionLimit: 100,
  host: "sql6.freemysqlhosting.net",
  user: "sql6440943",
  password: "",
  database: "sql6440943",
  debug: true
});

function executeQuery(query, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      return callback(err, null);
    } else if (connection) {
      connection.query(query, function (err, rows, fields) {
        connection.release();
        if (err) {
          return callback(err, null);
        }
        return callback(null, rows);
      });
    } else {
      return callback(true, "No Connection");
    }
  });
}

function getResult(query, callback) {
  executeQuery(query, function (err, rows) {
    if (!err) {
      callback(null, rows);
    } else {
      callback(true, err);
    }
  });
}

module.exports = {
  getResult
};
