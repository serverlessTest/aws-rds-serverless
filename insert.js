"use strict";

module.exports.create = async (event) => {
  const data = JSON.parse(event.body);
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: "your db endpoint",
    user: "your username",
    password: "your password of db",
    database: "db name",
  });
  const p = new Promise((resolve) => {
    const queri =
      "INSERT INTO Persons (PersonID, LastName, FirstName, Address, City) VALUES ('" +
      data.id +
      "', '" +
      data.lastname +
      "', '" +
      data.firstname +
      "', '" +
      data.address +
      "', '" +
      data.city +
      "');";
    connection.query(queri, function (err, results) {
      resolve(results);
    });
  });

  const result = await p;

  return {
    statusCode: 200,
    body: JSON.stringify({
      results: result,
      data: data,
    }),
  };
};
