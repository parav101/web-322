const express = require("express");
// import express from 'express';
const app = express();
const exphbs = require("express-handlebars");
const clientSessions = require("client-sessions");
const HTTP_PORT = process.env.PORT || 8080;


const fs = require("fs");
const http = require("http");
const https = require("https");

const HTTPS_PORT = 4433; // https defalut port 443
// const WEEK10ASSETS = "./week10-assets/";
// const WEEK12ASSETS = "./week12-assets/";
const SSL_KEY_FILE = "./assets/" + "server.key";
const SSL_CRT_FILE = "./assets/" + "server.crt";

// read in the contents of the HTTPS certificate and key
const https_options = {
    key: fs.readFileSync(__dirname + "/" + SSL_KEY_FILE),
    cert: fs.readFileSync(__dirname + "/" + SSL_CRT_FILE)
};







// Register handlerbars as the rendering engine for views
// app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.engine('.hbs', exphbs.engine({ extname: ".hbs" })); // for "express-handlebars": "^6.0.1"
app.set("view engine", ".hbs");


// Setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static("static"));

// Setup client-sessions
app.use(clientSessions({
  cookieName: "session", // this is the object name that will be added to 'req'
  secret: "week10example_web322", // this should be a long un-guessable string.
  duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
  activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

function onHttpsStart() {
    console.log("Express https server listening on: " + HTTPS_PORT);
}


// This is a helper middleware function that checks if a user is logged in
// we can use it in any route that we want to protect against unauthenticated access.
// A more advanced version of this would include checks for authorization as well after
// checking if the user is authenticated
function ensureLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      next();
    }
}

function ensureAdminRole(req, res, next) {
    if (!req.session.user || req.session.user.role !="admin") {
      res.render("login", { errorMsg: "You're not allowed to access the Administration page!", layout: false});
    } else {
      next();
    }
}

// A simple user object (should retrieved from user account/db table), hardcoded for this example
const user = {
    username: "sampleuser",
    password: "samplepassword",
    email: "sampleuser@example.com",
    role: "admin" // try to change the role value from "admin" to "user", then access the Administration page
};

// Setup a route on the 'root' of the url to redirect to /login
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Display the login html page
app.get("/login", function(req, res) {
    res.render("login", { layout: false });
});

// The login route that adds the user to the session
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username === "" || password === "") {
    // Render 'missing credentials'
    return res.render("login", { errorMsg: "Missing credentials.", layout: false });
    }

    // use sample "user" (declared above)
    if(username === user.username && password === user.password){

    // Add the user on the session and redirect them to the dashboard page.
    req.session.user = {
        username: user.username,
        email: user.email,
        role: user.role
    };

    res.redirect("/dashboard");
    } else {
    // render 'invalid username or password'
    res.render("login", { errorMsg: "invalid username or password!", layout: false});
    }
});


// An authenticated route that requires the user to be logged in.
// Notice the middleware 'ensureLogin' that comes before the function
// that renders the dashboard page
app.get("/dashboard", ensureLogin, (req, res) => {
    res.render("dashboard", {user: req.session.user, layout: false});
});
  
app.get("/admin", ensureAdminRole, (req, res) => {
    res.render("administration", {user: req.session.user, layout: false});
});


// Log a user out by destroying their session
// and redirecting them to /login
app.get("/logout", function(req, res) {
    req.session.reset();
    res.redirect("/login");
});



// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});


// app.listen(HTTP_PORT, onHttpStart);

// listen on ports HTTP_PORT and HTTPS_PORT. The default port for http is 80, https is 443. We use 8080 and 4433 here
// because sometimes port 80 is in use by other applications on the machine and using port 443 requires admin access on osx
http.createServer(app).listen(HTTP_PORT, onHttpStart);
https.createServer(https_options, app).listen(HTTPS_PORT, onHttpsStart);
