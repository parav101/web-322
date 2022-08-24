const Sequelize = require("sequelize");

// set up sequelize to point to our postgres database
// var sequelize = new Sequelize('database', 'user', 'password', {
var sequelize = new Sequelize('d5pvjfh1esobk2', 'opfxwuqmavrvuz', 'a97ccdd7965e28393d7adb46c22e909289d9e39251f2ae9b0b93fa1236b12dad', {
    host: 'ec2-3-212-143-188.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});


// Define our Models - "Name"
const Name = sequelize.define("Name", {
    fName: Sequelize.STRING,  // first Name
    lName: Sequelize.STRING, // Last Name
});
    
// intialize the module by synchronizing the database
module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then( () => {
            resolve();
        }).catch(()=>{
            reject("unable to sync the database"); //return;
        });
    });
}

// Names - CRUD functions

// C - AddNew
module.exports.addName = function(nameData) {
    return new Promise(function (resolve, reject) {
        // create a record using the "Name" model with the data from req.body
        Name.create(nameData)
        .then((data) => {
            resolve(data);
        }).catch((err)=>{
            reject("unable to create Name object");
        });
    });
}

// R - GetAll
module.exports.getAllNames = function() {
    return new Promise(function (resolve, reject) {
        // fetch all of the names and order them by id
        Name.findAll({
            order: ["id"]
        }).then((data) => {
            // console.log("data in .getAllNames(): ", data);
            resolve(data);
        }).catch((err) => {
            reject("query returned 0 results"); 
        });
    });
}

// R - GetOne
module.exports.getNameById = function(id) {
    return new Promise(function (resolve, reject) {
        Name.findOne({
            where: { id: id }
        }).then(function (data) {
            // console.log("data in .getNameById(): ", data);
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results"); 
        });
    });
}

// U - Update 
module.exports.updateName = function(nameData) {
    return new Promise(function (resolve, reject) {
        // update a record using the "Name" model with the data from req.body
        Name.update({
            lName: nameData.lName,
            fName: nameData.fName
        }, {
            where: { id: nameData.id }
        }).then(() => {
            console.log("successfully updated. nameData.id: " + nameData.id);
            resolve()
        }).catch((e) => {
            reject("unable to update object"); 
        });
    });
}

// D - Delete
module.exports.deleteName = function(id) {
    return new Promise(function (resolve, reject) {
        // remove a record from the  "Name" model with the data from req.body
        Name.destroy({
            where: { id: id }
        }).then(() => {
            console.log("successsfully removed user: ", id);
            resolve(); 
        }).catch((err) => {
            reject("unable to delete object"); 
        });
    });
}