import mysql from "mysql";
import MySQLStore from "express-mysql-session";

const DBInfo = {
  host: "database-1.cnuhyiur1u6w.ap-northeast-2.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "!Cogus123",
  database: "gather"
};

export const db = mysql.createConnection(DBInfo);

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("Connection Successful");
// });

// session
// const sessionStore = new MySQLStore(DBInfo);
// app.use(
//   session({
//     secret: "PhigpydAbBukkaudNajtitshishjav",
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore
//   })
// );
