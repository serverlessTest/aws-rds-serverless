'use strict';

module.exports.createTables = async event => {
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: "your db endpoint",
  user: "your username",
  password: "your password of db",
  database: "db name",
});
//   const connection = mysql.connect();
  const p = new Promise((resolve) => {
    connection.query("CREATE TABLE Persons (PersonID int,LastName varchar(255),FirstName varchar(255),Address varchar(255),City varchar(255));", function(err, results) {
      resolve(results);
    })
  })

  const result = await p;

  return {
    statusCode: 200,
    body: JSON.stringify({results: result})
  };
};
