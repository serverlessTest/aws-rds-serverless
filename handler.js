'use strict';

module.exports.getCustomers = async event => {
  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host: "your db endpoint",
    user: "your username",
    password: "your password of db",
    database: "db name",
  });
  const p = new Promise((resolve) => {
    connection.query("SELECT * FROM Persons", function(err, results) {
      resolve(results);
    })
  })

  const result = await p;

  return {
    statusCode: 200,
    body: JSON.stringify({results: result})
  };
};
