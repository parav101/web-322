const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

const Sequelize = require("sequelize"); // to be removed

const dataService = require("./data-service");

const HTTP_PORT = process.env.PORT || 8080;
// const WEEK7ASSETS = "./week7-assets/";

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// instruct the app to use the "express.urlencoded" middleware
app.use(express.urlencoded({ extended: true }));

// instruct the app to use express handlebars for the view engine with the .hbs extension
// app.set("views", WEEK7ASSETS);
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static("public" )); /*WEEK7ASSETS*/


// to be removed
// set up sequelize to point to our postgres database
// var sequelize = new Sequelize('database', 'user', 'password', { 
var sequelize = new Sequelize('d5pvjfh1esobk2', 'opfxwuqmavrvuz', 'a97ccdd7965e28393d7adb46c22e909289d9e39251f2ae9b0b93fa1236b12dad', {
    host: 'ec2-3-212-143-188.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});

// to be removed
// Define our Models - "Name"
const Name = sequelize.define("Name", {
  fName: Sequelize.STRING,  // first Name
  lName: Sequelize.STRING, // Last Name
});


// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("<h2>Week 7 Code Example on GitHub with data-service.js added</h2>" +
    "<p>PostgreSQL (Postgres) &amp; Sequelize</p>" +
    "<p>Refactoring the week 7 Code Examples on GitHub to conform to the Model-View-Controller architectural pattern.</p>" +
    "<p>Click <a href='/names'>viewTable</a> to see all Names</p>");
});


// define the "/addName" route - C: Create - AddNew
app.post("/addName", (req, res) => {
    // create a record using the "Name" model with the data from req.body
    dataService.addName(req.body)
    .then((data) => {
        // console.log("successfully created a new name: ", data);
        res.redirect("/names");
    }).catch((err)=>{
        res.status(500).send("Unable to Add the name");
    });
});

// define the "/names" route - R: Read/Retrieve - GetAll
app.get("/names", (req, res) => {
    dataService.getAllNames()
    .then((data) => {
        // render the "viewTable" view with the data
        res.render("viewTable", {
            data: data,
            layout: false // do not use the default Layout (main.hbs)
        });
    }).catch((err) => {
        res.status(500).send("Unable to get all names.");
    });
});

// define the "/names" route - R: Read/Retrieve - GetOne
app.get("/names/:id", (req, res) => {
    res.send("Retrieve - GatOne - not included in this app")
});

// define the "/updateName" route - U & D - Update and Delete
app.post("/updateName", (req, res) => {
    // check to see if both first name & last name fields are blank
    if (req.body.lName.length == 0 && req.body.fName.length == 0) {
        dataService.deleteName(req.body.id)
        .then(() => {
            console.log("successsfully removed user: " + req.body.id);
            res.redirect("/names"); // redirect back to the home page
        }).catch((msg) => {
            res.status(500).send("Unable to delete the name.");
        });
    } else {
        dataService.updateName(req.body)
        .then(() => {
            console.log("successfully updated in server.js. req.body.id: " + req.body.id);
            res.redirect("/names"); // redirect back to the home page
        }).catch(() => {
            res.status(500).send("Unable to update the name.");
        });
    }
});

// synchronize the database before we start the server
// sequelize.sync().then(() => {
//     // start the server to listen on HTTP_PORT
//     app.listen(HTTP_PORT, onHttpStart);
// });
dataService.initialize().then(()=>{
    // start the server to listen on HTTP_PORT
    app.listen(HTTP_PORT, onHttpStart);
}).catch(()=>{
    console.log("unable to start server: " + err);
})
