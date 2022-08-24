// require mongoose and setup the Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// connect to Your MongoDB Atlas Database
mongoose.connect("mongodb+srv://dbAdmin:mypasswd@senecaweb.x0fzf.mongodb.net/web322_week8?retryWrites=true&w=majority"
        // , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    );

// Define the Company schema. Each schema maps to a MongoDB collection and 
// defines the shape of the documents within that collection”. 
var companySchema = new Schema({
  // "companyName":  String,
  "companyName":  { // unique index
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

// register the companySchema as the Company model using the companySchema, and
// use the web322_companies collection in the db to store documents
var Company = mongoose.model("web322_companies", companySchema);

///////////////////////////////////////////////////////////////////////////


// create a new company
var kwikEMart = new Company({
  companyName: "The Kwik-E-Mart 5",
  address: "Springfield",
  phone: "212-842-4923",
  employeeCount: 3,
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
