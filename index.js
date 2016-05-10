var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

var app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/reserved', function(req, res) {
    res.send('this route is reserved for the server')
})

app.get('*', function(req, res) {
    res.render('main/index');
});

app.post("/save", function(req, res){
    if(!req.body) {
        res.redirect('/')
    } else {
        console.log(req.body);
    }
})

app.listen(3000, function() {
  console.log('Server has started');
});
