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

// Define our "User" and "Task" models

var User = sequelize.define('User', {
    fullName: Sequelize.STRING, // the user's full name (ie: "Jason Bourne")
    title: Sequelize.STRING // the user's title within the project (ie, developer)
});

var Task = sequelize.define('Task', {
    title: Sequelize.STRING, // title of the task
    description: Sequelize.TEXT // main text for the task
});

// Associate Tasks with user & automatically create a foreign key
// relationship on "Task" via an automatically generated "UserId" field

User.hasMany(Task);


sequelize.sync().then(function () {
    
    // Create user "Jason Bourne"
    User.create({
        fullName: "Jason Bourne",
        title: "developer"
    }).then(function (user) {

        console.log("user created");
        
            // Create "Task 1" for the new user
        Task.create({
            title: "Task 1",
            description: "Task 1 description",
            UserId: user.id // set the correct Userid foreign key
        }).then(function(){ console.log("Task 1 created")});

        // Create "Task 2" for the new user
        Task.create({
            title: "Task 2",
            description: "Task 2 description",
            UserId: user.id // set the correct Userid foreign key
        }).then(function(){ console.log("Task 2 created")});
    });

});
