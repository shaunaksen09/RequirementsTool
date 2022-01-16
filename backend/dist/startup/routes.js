"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var userRoutes_1 = require("./../routes/userRoutes");
var config = require("./../Helper/config").config;
var Route = /** @class */ (function () {
    function Route() {
    }
    Route.ConfigureRoutes = function (app) {
        app.get('/', function (req, res) {
            // console.log("request" ,req.files)
            res.send("server is running on port 4000");
            // next();
        });
        app.listen(config.NODE_SERVER_PORT.port, function () {
            console.log("todo App running in port " + config.NODE_SERVER_PORT.port);
        });
        app.use('/reqdetails', userRoutes_1.userRoutes);
    };
    return Route;
}());
exports.Route = Route;
