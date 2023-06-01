const indexR = require("./index");
const usersR = require("./users");
// const cakeR = require("./cakes");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
//    app.use("/cakes",cakeR);
}