const express = require("express");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req,res)=>{
    res.header('Set-Cookie', 'helloworld=Hello World!'); // To add the 'Set-Cookie' header to the response to set the "helloworld" cookie
    res.json({message: "cookie helloworld was set"});
});

app.get("/cookieData",(req,res)=>{
    res.json({cookieData: req.header("cookie")}); // read the (unparsed) value of the incoming "cookie" header
});

app.listen(HTTP_PORT,()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
});

// more info about cookie with Express: https://expressjs.com/en/4x/api.html#res.cookie