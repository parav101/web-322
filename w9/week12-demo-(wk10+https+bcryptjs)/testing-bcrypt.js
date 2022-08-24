const bcrypt = require('bcryptjs');

var userInDB = {user: "sampleuser", password: ""}

// Encrypt the plain text: "myPassword123"
bcrypt.hash("myPassword123", 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
    // TODO: Store the resulting "hash" value in the DB
    console.log("hash code for text 'myPassword123':", hash);

    userInDB.password = hash;
})
.catch(err=>{
    console.log(err); // Show any errors that occurred during the process
});



setTimeout(() => {
    // Pull the password "hash" value from the DB and compare it to "myPassword123" (match)
    bcrypt.compare("myPassword123", userInDB.password).then((result) => {
        // result === true
        if(result) {
            console.log({message: 'the password "myPassword123" matches the hash of the user in DB'});
        } else {
            console.log({message: 'the password "myPassword123" doesn\'t match the hash of the user in DB'});
        }
    });

    // Pull the password "hash" value from the DB and compare it to "myPasswordABC" (does not match)
    bcrypt.compare("myPasswordABC", userInDB.password).then((result) => {
        if(result) {
            console.log({message: 'the password "myPasswordABC" matches the hash of the user in DB'});
        } else {
            console.log({message: 'the password "myPasswordABC" doesn\'t match the hash of the user in DB'});
        }
    });

}, 2000);