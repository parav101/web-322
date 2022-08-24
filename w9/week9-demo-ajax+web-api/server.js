const express = require("express");
const app = express();
const path = require("path");

const HTTP_PORT = process.env.PORT || 8080;

// for Cross-Origin Resource Sharing (CORS) - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const cors = require('cors') 
app.use(cors()) // use as middleware

// Express middlewire for parsing json data in http request body, e.g. req.body.fName
app.use(express.json());

app.use(express.static('public'))
// app.get("/", (req,res) => {
//     res.sendFile(path.join(__dirname, "/public/index.html"));
// });


// WEB (Restful) API Example - CRUD operations for Users:

// Retrieve - GetAll users
app.get("/api/users", (req, res) => {
    res.json({message: "fetch all users"});
    // var users = [{
    //         "id": 1,
    //         "email": "george.bluth@reqres.in",
    //         "first_name": "George",
    //         "last_name": "Bluth",
    //         "avatar": "https://reqres.in/img/faces/1-image.jpg"
    //     },
    //     {
    //         "id": 2,
    //         "email": "janet.weaver@reqres.in",
    //         "first_name": "Janet",
    //         "last_name": "Weaver",
    //         "avatar": "https://reqres.in/img/faces/2-image.jpg"
    //     },
    //     {
    //         "id": 3,
    //         "email": "emma.wong@reqres.in",
    //         "first_name": "Emma",
    //         "last_name": "Wong",
    //         "avatar": "https://reqres.in/img/faces/3-image.jpg"
    //     }];
    // res.json(users)
});

// Create - Add New user
app.post("/api/users", (req, res) => {
    // res.json({message: "add a user"});
    res.json({message: "add the user: " + req.body.fName + " " + req.body.lName});
});

// Retrieve - GetOne user
app.get("/api/users/:userId", (req, res) => {
    res.json({message: "get user with Id: " + req.params.userId});
});

// Update - update existing user
app.put("/api/users/:userId", (req, res) => {
    // res.json({message: "update User with Id: " + req.params.userId});
    res.json({message: "update User with Id: " + req.params.userId + " to " + req.body.fName + " " + req.body.lName});
});

// Delete - delete user
app.delete("/api/users/:userId", (req, res) => {
        res.json({message: "delete User with Id: " + req.params.userId});
});


// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, () => {
    console.log("Express http server listening on: " + HTTP_PORT);
});
