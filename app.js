const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

let runType = "online";
if(process.argv[2] && process.argv[2] === "local") runType = "local";
else if(process.argv[2] && process.argv[2] === "docker") runType = "docker";

require('./config/db')(runType);

const userRouter = require('./routes/userRouter');
const changeRouter = require('./routes/changeRouter');
const displayRouter = require('./routes/displayRouter');
const profileRouter = require('./routes/profileRouter');
const creativeRouter = require('./routes/creativeRouter');
const statsRouter = require('./routes/statsRouter');

const app = express();

app.use(morgan('dev'));

app.use((req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', '*');
	res.set('Access-Control-Allow-Methods', '*');
	if(req.method === 'OPTIONS'){
		res.status(200).end();
		return;
	} 
	next();
	// else{
	// 	res.set('Content-Type', 'application/json');
	// 	next();
	// }
	
});

app.use(express.static('admin'));
app.use(express.static('public'));

app.get('/', (req,res,next) => {
	res.redirect('/index.html');
});

app.get('/favicon.ico', (req,res,next) => {

	const icon = fs.createReadStream('./admin/assets/img/logo.png');
	function finish(){ icon.destroy(); }
	res.status(200);
	icon.pipe(res);
	icon.on('end', () => {
		res.end();
		finish();
	});
});

app.use((req,res,next) => {
	res.set('Content-Type', 'application/json');
	next();
});

app.use('/display', displayRouter);
app.use('/user', userRouter);
app.use('/change', changeRouter);
app.use('/profile', profileRouter);
app.use('/creative', creativeRouter);
app.use('/stats', statsRouter);

app.use((req, res, next) => {
	let err = new Error("Undefined route");
	err.status = 400;
	next(err);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: error.message,
	});
	console.log(error);
});

module.exports = app;