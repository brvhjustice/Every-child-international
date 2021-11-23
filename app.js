
require('dotenv').config()
const express = require('express');

const app = express();
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.get("/views/donate.html", function(req, res){
    res.sendFile(__dirname + "/views/donate.html")
})

app.get("/views/donate.html", function(req, res) {
    res.redirect("/")
})




app.listen(process.env.PORT || 3000, function() {
    console.log('Server is running on port 3000');
});