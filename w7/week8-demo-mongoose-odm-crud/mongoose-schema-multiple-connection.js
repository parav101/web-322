// require mongoose and setup the Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// // connect to Your MongoDB Atlas Database
// mongoose.connect("mongodb+srv://dbAdmin:mypasswd@senecaweb.lfp3r.mongodb.net/web322_week8?retryWrites=true&w=majority"
//         // , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
//     );

// new way to connect to MongoDb:
let pass1 = encodeURIComponent("mypasswd"); // this step is needed if there are special characters in your password, ie "$"
let db1 = mongoose.createConnection(`mongodb+srv://dbAdmin:${pass1}@senecaweb.x0fzf.mongodb.net/web322_week8?retryWrites=true&w=majority`);


// Define the Company schema. Each schema maps to a MongoDB collection and 
// defines the shape of the documents within that collection”. 
var companySchema = new Schema({
  "companyName":  {
    "type": String,
    "unique": true
  },
  "address": String,
  "phone": String,
  "employeeCount": {
    "type": Number,
    "default": 0
  },
  "country": String  
});


// verify the db1 connection
db1.on('error', (err)=>{
  console.log("db1 error!");
});

db1.once('open', ()=>{
  console.log("db1 success!");

  // register the companySchema as the Company model using the companySchema, and
  // use the web322_companies collection in the db to store documents
  // var Company = mongoose.model("web322_companies", companySchema);
  var Company = db1.model("web322_companies", companySchema);

  
  // create a new company
  var kwikEMart = new Company({
    companyName: "The Kwik-E-Mart 2",
    address: "Springfield",
    phone: "212-842-4923",
    employeeCount: 2,
    country: "U.S.A"
  });

  // save the company
  kwikEMart.save((err) => {
    if(err) {
      console.log("There was an error saving the Kwik-E-Mart company");
    } else {
      console.log("The Kwik-E-Mart company was saved to the web322_companies collection");
    }
    // exit the program after saving
    process.exit();
  });
  
});



