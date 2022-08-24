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
  "companyName":  String,
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

// Read - GetAll company
Company.find({ 
    // companyName: "The Kwik-E-Mart" //  WHERE companyName = "The Kwik-E-Mart"
  } 
  // , "companyName phone" // optional: SELECT companyName, phone - "Selecting specific fields"
)
//.sort({companyName: 1, phone: -1}) //optional "sort" // -1: descending - https://docs.mongodb.com/manual/reference/operator/aggregation/sort/ 
.exec()
.then((companies) => {
  // companies will be an array of objects.
  // Each object will represent a document that matched the query

  // Convert the mongoose documents into plain JavaScript objects
  companies = companies.map(value => value.toObject());
  console.log("companies: ", companies);

  // exit the program after saving and finding
  process.exit();
})
.catch((err) => {
  console.log(`There was an error: ${err}`);
});
