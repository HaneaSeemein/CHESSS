const express = require('express');
const app = express();
// app.sendFile("base.html")
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/base.html");
    // res.sendFile(__dirname + "/javascript.js");
    // res.sendFile(__dirname + "/style.css");
});

app.get("/contact", function(req, res) {
    res.send("<script>alert('haniya23seemein@gmail.com')</script>");
});

app.listen("3000", function(req, res) {
    console.log("listening")
});