var message = require('./modules/message');

message.writeMessage("hello world!");

var msg = message.readMessage()
console.log(`message "${msg}" received from:`, __filename); // msg may have the "undefined" value
