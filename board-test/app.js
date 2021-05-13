var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

var board = require('./routes/board');
app.use('/board', board);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(req, res){
    res.send('hi express');
});

app.listen(PORT, function(){
    console.log('Listening on port ' + PORT);
});
