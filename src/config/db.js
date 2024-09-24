import mysql from "mysql2/promise";
import bluebird from "bluebird";

const db = mysql.createPool({
    host: "127.0.0.1",
    database: "space_spost",
    user: "root",
    password: "root",
    port: 3306,
    Promise: bluebird,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

db.on("connection", function (connection) {
    console.log("DB Connection established");

    connection.on("error", function (err) {
        console.error(new Date(), "MySQL error", err.code);
    });
    connection.on("close", function (err) {
        console.error(new Date(), "MySQL close", err);
    });
});

export default db;