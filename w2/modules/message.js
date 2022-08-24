var localFunction = function () { // private method
    // a function local to this module
}

var localMessage = ""; // private property

module.exports = { // public methods and properties
    writeMessage: function(msg){ 
        localMessage = msg;
    },
    readMessage: function () {
        console.log(localMessage + " from " +  __filename); // public method
        return localMessage;
    }
};


// module.exports.writeMessage = function(msg){ // public method
//     localMessage = msg;
// }

// module.exports.readMessage = function () {
//     console.log(localMessage + " from " +  __filename); // public method
//     return localMessage;
// }