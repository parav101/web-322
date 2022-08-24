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


// DELETE - deleteOne() / deleteMany()
// Company.deleteOne({ companyName: "The Kwik-E-Mart" })
Company.deleteMany({ employeeCount: 3 })
.exec()
.then(() => {
  // removed company(ies)
  console.log("removed company(ies)");

  // exit the program after saving and finding
  process.exit();
})
.catch((err) => {
  console.log(err);
});
