var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('./models');

var app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/reserved', function(req, res) {
    res.send('this route is reserved for the server')
})

app.get('/show/:secret', function(req, res) {

});

app.post("/save", function(req, res){
    if(!req.body) {
        res.send.status(403);
    } else {
        console.log('body ', req.body)
        console.log(req.body)
        db.doc.findOrCreate({
            where: {
                documentSecret: req.body.documentSecret
            },
            defaults: {
                documentName  : req.body.documentName,
                documentArray : req.body.documentArray,
                documentSecret: req.body.documentSecret
            }
        }).spread(function(doc, created){
            console.log('doc : ----------', doc);
            console.log('created : ----------', created);
            res.sendStatus(200);
        })
    }
})

app.get('*', function(req, res) {
    res.render('main/index');
});

app.listen(3000, '0.0.0.0', function() {
  console.log('Server has started');
});
