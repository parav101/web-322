// setup our requires
const express = require("express");
const app = express();
const multer = require("multer"); // used to parse the multipart form data (The file upload, +).
const path = require("path");

const HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


// multer requires a few options to be setup to store files with file extensions
// by default it won't store extensions for security reasons
const storage = multer.diskStorage({
    destination: "./public/photos/",
    filename: function (req, file, cb) {
      // we write the filename as the current date down to the millisecond
      // in a large web service this would possibly cause a problem if two people
      // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
      // this is a simple example.
      cb(null, Date.now() + path.extname(file.originalname));
    }
});

// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({ storage: storage });


// setup the static folder that static resources can load from
// we need this so that the photo can be loaded from the server
// by the browser after sending it
app.use(express.static("./public/"));


app.get("/", (req, res)=>{
  res.send(`
    <h2>Week 5 Demo App - Processing Forms with Express.js</h2>
    <ul>
      <li>The first form: <a href="/first-form">firstForm.html</a></li>
      <li><mark>The Register-User form:</mark> <a href="/register-user">registerUser.html</a></li>
    </ul>
  `);
});

app.get("/first-form", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/firstForm.html"));
});

// setup a route on the 'root' of the url that has our form
// IE: http://localhost/
app.get("/register-user", (req, res) => {
  // send the html view with our form to the client
  res.sendFile(path.join(__dirname, "/views/registerUser.html"));
});

// now add a route that we can POST the form data to
// IE: http://localhost/register-user
// add the middleware function (upload.single("photo")) for multer to process the file upload in the form
// the string you pass the single() function is the value of the
// 'name' attribute on the form for the file input element

app.post("/addVechile", upload.single("photo"), (req, res) => {
// app.post("/register-user", upload.array("images", 10), (req, res) => { // for processing multiple uploaded files
    const formData = req.body;
    const formFile = req.file;
    // const formFiles = req.files;

    const dataReceived = `<h4>Your submission was received:</h4>
                          <p>Your form data was:<br> ${JSON.stringify(formData)}</p>
                          <br>
                          <p>Your file data was:<br> ${JSON.stringify(formFile)}</p>
                          <br>
                          <p>This is the image you sent:<br><img src='photos/${formFile.filename}' height='150'/></p>
                         `;
    
    // // for processing multiple uploaded files
    // let dataReceived = `<h4>Your submission was received:</h4>
    //                      <p>Your form data was:<br> ${JSON.stringify(formData)}</p>
    //                      <br>
    //                      <p>Your file data was:<br> ${JSON.stringify(formFiles)}</p>
    //                      <br>
    //                      <p>This is the images you sent:</p>
    //                      `;
    // for (let i=0; i<formFiles.length; i++) {
    //   dataReceived += "<img src='/photos/" + formFiles[i].filename + "' height='150'/> ";
    // } 

    res.send(dataReceived);
    // res.json({"formData": req.body, "formFile": req.file});
});

app.listen(HTTP_PORT, onHttpStart);
