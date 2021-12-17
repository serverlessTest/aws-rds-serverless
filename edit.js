"use strict";

module.exports.Update = async (event) => {
    console.log("events:", event);
  const data = JSON.parse(event.body);
  console.log('orBody:', event.body);
  console.log('jsonbody:', data);
  const id = event.pathParameters.id;
  console.log(id);

  const text = await Object.entries(data)
    .map((e) => e[0] + "='" + e[1] + "'")
    .join(",");
  console.log(text);
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: "your db endpoint",
    user: "your username",
    password: "your password of db",
    database: "db name",
  });
  const p = new Promise((resolve) => {
    const queri =
      "UPDATE Persons SET " + text + " WHERE PersonID = " + id + ";";
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
