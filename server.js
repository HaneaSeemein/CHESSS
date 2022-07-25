const express = require('express');
const app = express();
// app.sendFile("base.html")
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/trial.html");
});
app.use('/', express.static(__dirname + "/public"));

// app.get('/:username', function(req, res) {
//     console.log("hey " + req.params.username);
// });
app.get("/contact", function(req, res) {
    res.send("<script>alert('haniya23seemein@gmail.com')</script>");
});

app.listen("8080", function(req, res) {
    console.log("listening")
});