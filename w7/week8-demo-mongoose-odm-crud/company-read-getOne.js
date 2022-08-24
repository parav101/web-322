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


// Read - GetOne company
Company.findOne({ companyName: "The Kwik-E-Mart" })
.exec()
.then((company) => {
    if(!company) {
        console.log("No company could be found");
    } else {
        console.log("GetOne company:", company);
        console.log("the company was created at:", company._id.getTimestamp() );
        console.log("company.companyName:", company.companyName);
    }
    // exit the program after saving and finding
    process.exit();
})
.catch((err) => {
    console.log(`There was an error: ${err}`);
});