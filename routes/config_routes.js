const indexR = require("./index");
const usersR = require("./users");
  const cakeR = require("./cakes");
// const countriesR = require("./countries");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
   app.use("/cakes",cakeR);
// app.use("/countries",countriesR);
}