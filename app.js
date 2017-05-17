var express = require("express");
var app = express();
var path = require('path');
var hbs = require('express3-handlebars').create({
	defaultLayout: 'main'
});


var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple."
];

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname , 'public')));

app.set('port', process.env.PORT || 3000);

//增加两个新的路由
app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function (req, res){
	var random = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: random});
});

//定制404页面

app.use(function (req, res) {
	res.status(404);
	res.render('404');
});

//定制500页面
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});



app.listen(app.get('port'), function () {
	console.log("Express started on http:localhost:" + app.get('port') + ';press Ctrl-C to terminate.');
});
