const Sequelize = require('sequelize');

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

////////////////////////////////////////////////////////////////////////

// Define a "Name" model

var Name = sequelize.define('Name', {
    fName: Sequelize.STRING,  // first Name
    lName: Sequelize.STRING, // Last Name
});


// CRUD operations:
// Read/Retrieve - GetAll, and GetOne
sequelize.sync().then(function () {

    // GetAll: return all first names only
    Name.findAll({ 
        // attributes: ['fName']   // SQL: SELECT fname ...
                                   // no attritutes: SQL: SELECT * ...
    }).then(function(data){        
        // console.log("All first names");
        // for(var i =0; i < data.length; i++){
        //     console.log(data[i].fName);
        // }
        console.log("All first names: ", data);
    });

    // GetOne: return all first names where id == 2
    Name.findAll({ 
        // attributes: ['fName'],
        where: { id: 2 }  // SQL: WHERE CLAUSE
    }).then(function(data){
        // console.log("All first names where id == 2");
        // for(var i =0; i < data.length; i++){
        //     console.log(data[i].fName);
        // }
        console.log("The name where id == 2: ", data[0]);
    });

    // GetOne: return all first names where id == 2
    Name.findOne({ 
        // attributes: ['fName'],
        where: { id: 2 }  // SQL: WHERE CLAUSE
    }).then(function(data){
        // console.log("All first names where id == 2");
        // for(var i =0; i < data.length; i++){
        //     console.log(data[i].fName);
        // }
        console.log("The name where id == 2: ", data);
    });
});

