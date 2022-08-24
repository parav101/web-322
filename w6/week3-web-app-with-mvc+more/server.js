const express = require("express");
const app = express();
const path = require("path");

const dataService = require('./data-service');

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true })); // middleware as bodyParser

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

// define a route to show a page with html form 
app.get("/newmember",  (req, res) => {
    res.sendFile(path.join(__dirname, "/views/newMember.html"));
});

app.post("/newmember",  (req, res) => {
    var formData = req.body;
    dataService.addNewMember(formData).then(()=>{
        res.redirect("/members");
      }).catch((err)=>{
        res.send(err);
    });
});

app.get("/members", (req,res) => {
    dataService.getAllMembers().then((data)=>{
        res.json(data); 
    }).catch((err)=>{
        res.send(err);
    });
});

app.get("/members/:id", (req,res) => {
    dataService.getMembersById(req.params.id).then((data)=>{
        res.send(`
            <h2>Member data</h2>
            <ul>
                <li>name: ${data.name}</li>
                <li>age:  ${data.age}</li>
                <li>photo: <img src="${data.photoUrl}" alt="${data.name}" height="75"></li>
                <li>occupation: ${data.occupation}</li>
                <li>company: ${data.company}</li>
            </ul>
        `);
    }).catch((err)=>{
        res.send(err);
    });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
