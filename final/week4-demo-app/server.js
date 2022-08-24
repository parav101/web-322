// server.js: start from week 2 example
var express = require("express");
var app = express();
const path = require("path");

var HTTP_PORT = process.env.PORT || 8080;

app.locals.title = 'Week 4 Demo App';

// use middleware: Express built-in "bodyParser" - to access form data in http body
app.use(express.urlencoded({ extended: true })); 

// setup the static folder that static resources can load from
// like images, css files, etc.
app.use(express.static("public"));

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// setup the "root" 'route' to listen on the default url path (http://localhost)
app.get("/", function(req, res){
    res.send(`<h2>Week 4 demo app - Express.js</h2>
        <p>Please go to <a href='/about'>the about page</a> or read server.js for more detatils</p>
        <br><br>The app title is ${app.locals.title}`);
});

app.get("/about", function(request, res) {
    // res.send("<h2>About</h2><p>This is the about page</p>")
    res.sendFile(path.join(__dirname,"/views/about.html"));
});

// IE: http://localhost:8080/headers
app.get("/headers", (req, res) => {
    var userAgent = req.get('user-agent');
    console.log("userAgent", userAgent);

    const headers = req.headers;
    res.send(headers);
});

app.get("/download", function(req,res){
    res.download('./public/images/Express.js.png');
});

app.get("/redirect", function(req,res){
    res.redirect("/");
});

// Create - Add new user
// define a route (using http GET method) to show a page with html form 
app.get("/newuser",  (req, res) => {
    res.sendFile(path.join(__dirname, "/views/newUser.html"));
});

// define a route (using http POST method) to process html from submission 
app.post("/newuser",  (req, res) => {

    res.send(`<h2>Data received from the Add New user form</h2>
              <ol>
                <li>req.body.name: ${ req.body.name } </li>
                <li>req.body.age: ${ req.body.age } </li>
                <li>req.body.occupation: ${ req.body.occupation } </li>
                <li>...</li>
              </ol>
              <ul>
                <li>req.body (all in one obj): ${ JSON.stringify(req.body) } </li>
              </ul>
            `);

    // res.json(req.body); // the same
});


// Read/retrieve - Get All users
// define a route to get/show all users   
app.get("/users", (req,res) => {
    if(!req.query.json4api) {
        res.send(`<h2>Data received from query string/parameters</h2>
            <ol>
               <li>req.query.occupation: ${ req.query.occupation } </li> 
               <li>req.query.page: ${ req.query.page } </li>
               <li>req.query.perPage: ${ req.query.perPage } </li>
            </ol>
            <ul>
               <li>all in one object (req.query): <mark>${ JSON.stringify(req.query) }</mark> </li>
            </ul>`
        );
    } else {
       res.json({ 
           "req.query.occupation": req.query.occupation,
           "req.query.page": req.query.page,
           "req.query": req.query,
       }); 
    }
});

// Read/retrieve - Get One user
// define a route to get/show a specific user   
app.get("/users/:id", (req,res) => {
    var parameters = req.params;
    res.send(`<h2>Data received from parameter(s) in route</h2>
    <ul>
      <li>req.params.id: ${ req.params.id } </li> 
      <li>req.params (all in one obj): ${ JSON.stringify(req.params) } </li>
    </ul>
  `);

});


// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("<h2>404</h2><p>Page Not Found</p>");
});


// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart );  



// * 3 important objects in express.js:
//   app, req, res

// * Routing - Defining routes in Express.js. The structure is:
//   app.METHOD(PATH, HANDLER)



// * app.get() vs app.post() in WEB APPs 
//   1. app.post() - is used for processing FORM submission: the form data is in the http body, <form method="post">...
//   2. app.get() - is used for presenting html FORM, web page, text in a web page
//   -. note: We don't use app.update() or app.delete() in web apps; 
//          Instead, we use app.get() vs app.post() to define routes of CRUD operations. 


// * What are the CRUD operations for manupilating data in Web API (e.g. week 9), +...
//   C - Create new object - corresponding HTTP method: post, so app.post() is used (in Web API)
//   R - Retrivev/Read:
//       Get All (objects) - corresponding HTTP method: get, so app.get() is used (in Web API)
//       Get One (object)  - corresponding HTTP method: get, so app.get()  is used (in Web API)
//   U - Update/Edit existing (object) - corresponding HTTP method: update, so app.update() is used (in Web API)
//                                                                  patch (partially update, seldom-used)
//   D - Delete item (/object) - corresponding HTTP method, delete, so app.delete() in Web API


// * The ways to use http request to send data to server
//   1. using query string on url, e.g. ?fname=John&lname=Doe - to access the data on server: req.query.fname
//   2. using the body of http request  e.g. fname=John and lname=Doe - to access the data on server: req.body.fname
//   3. using parameter in the route, e.g. route: /members/:id - to access the data on server: req.params.id
//   4. using cookies


// * easy-to-use debugging tool:
//   console.log("variable name or desc: ", dataVar);
