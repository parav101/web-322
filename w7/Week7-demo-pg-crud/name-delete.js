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


sequelize.sync().then(function () {

    // remove User 3 from the database
    Name.destroy({
        where: { id: 3 } // only remove user with id == 3
    }).then(function () { console.log("successfully removed user 3");});

});
