var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Week 7 Heroku app for applying Postgres DB.");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);

// This simple Express server is used to apply a Postgres database 
// from the server deployed on Heroku. Then the obtained database
// can also be used in your local Express server in VSCode.