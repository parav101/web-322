// require mongoose and setup the Schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// connect to Your MongoDB Atlas Database
mongoose.connect("mongodb+srv://dbAdmin:mypasswd@senecaweb.x0fzf.mongodb.net/web322_week8?retryWrites=true&w=majority"
        // , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    );

const commentSchema = new Schema({
    comment: String,
    author: String,
    date: Date
});

commentSchema.add({ comments: [commentSchema] });
// * From this syntax, you may learn 3 things:
// 1. defining a field  of an array of object.
// 2. add a field to an existing schema.
// 3. Recursive schema   


// register the Comment model using the commentSchema
// use the Comment (-> comments) collection in the db to store documents
var Comment = mongoose.model("Comment", commentSchema);


// create a new Comment
var commentChain = new Comment({
    comment: "Star Wars is awesome",
    author: "Author 1",
    date: new Date(),
    comments: [{
        comment: "I agree",
        author: "Author 2",
        date: new Date(),
        comments: [{
            comment: "I agree with Author 2",
            author: "Author 3",
            date: new Date(),
            comments: []
        }]
    }]
});

// save the company
commentChain.save((err) => {
    if(err) {
      console.log("There was an error saving the new Commment");
    } else {
      console.log("The commentChain Commant was saved to the comments collection");
    }
    // exit the program after saving
    process.exit();
});