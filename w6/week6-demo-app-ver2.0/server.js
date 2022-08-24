var express = require("express");
var app = express();
var path = require("path");

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'))

const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs' ,
    defaultLayout: 'main',
    helpers: { 
        // helper1: function(options){
        //     // helper without "context", ie {{#helper}} ... {{/helper}}
        // },
        // helper2: function(context, options){
        //     // helper with "context", ie {{#helper context}} ... {{/helper}}
        // }
        strong: function(options){
            return '<strong>' + options.fn(this) + '</strong>';
        },
        warning: function(options){
            return `<div class="alert alert-warning alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        ${options.fn(this)}
                    </div>`;
        },
        list: function(context, options) {
            var ret = "<ul>";
            
            for(var i = 0; i < context.length; i++) {
                ret = ret + "<li>" + options.fn(context[i]) + "</li>";
            }
            
            return ret + "</ul>";
        }
                
    }
}));
app.set('view engine', '.hbs');


// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    // res.send(`
    //     <h2>Week 6 Demo App - Template Engines: Handlebars.js</h2>
    //     <ul>
    //         <li>R - GetOne <a href='/getData'>/getData</a> (for web API) </li>
    //         <li>R - GetOne <a href='/viewData'>/viewData</a> (for web app) </li>
    //         <li>R - GetAll <a href='/viewData2'>/viewData2</a> (for web app)</li>
    //         <li>Go to the <a href='/about'>About page</a></li>
    //     </ul>
    // `);
    res.render('home');
});

// setup another route to listen on /about
app.get("/about", function(req,res){
    // res.sendFile(path.join(__dirname, "/views/about.html"));
    res.render('about');
});

// Retrieve: Get One - for WEB API
app.get("/getData", function(req,res){
    
    var someData = {
            name: "John",
            age: 23,
            occupation: "developer",
            company: "Scotiabank",
            visible: true,
            contract: false
        };

    res.json(someData);
});

// Retrieve: GetOne - for WEB APP
app.get("/viewData", function(req,res){
    
    var someData = {
        name: "John",
        age: 23,
        photo: "https://reqres.in/img/faces/8-image.jpg",
        occupation: "developer",
        company: "Scotiabank",
        visible: true,
        contract: true
    };

    // var htmlString = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>View Data</title>
    //     </head>
    //     <body>
    //         <table border=1>
    //             <tr>
    //                 <th>Name</th>
    //                 <th>Age</th>
    //                 <th>Ocupation</th>
    //                 <th>Company</th>
    //             </tr>
    //             <tr>
    //                 <td>${someData.name}</td>
    //                 <td>${someData.age}</td>
    //                 <td>${someData.occupation}</td>
    //                 <td>${someData.company}</td>
    //             </tr>
    //         </table>
    //     </body>
    //     </html>   
    // `;

    // res.send(htmlString);

    res.render('viewData', {
        data: someData
        // ,layout: true // not work //false // do not use the default Layout (main.hbs)
    });
});

// Retrieve: GetOne - for WEB APP
app.get("/viewData2", function(req,res){
    var someData = [{
        name: "John",
        age: 23,
        photo: "https://reqres.in/img/faces/8-image.jpg",
        occupation: "developer",
        company: "Scotiabank"
    },
    {
        name: "Sarah",
        age: 32,
        photo: "https://reqres.in/img/faces/7-image.jpg",
        occupation: "manager",
        company: "TD"
    }];

    res.render('viewData2', {
        data: someData
        // ,layout: false // do not use the default Layout (main.hbs)
    });
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
