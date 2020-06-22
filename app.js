const express = require('express');
const morgan = require('morgan');

let isLocal = false;
if(process.argv[2] && process.argv[2] === "local") isLocal = true;

require('./config/db')(isLocal);

const userRouter = require('./routes/userRouter');
const changeRouter = require('./routes/changeRouter');
const displayRouter = require('./routes/displayRouter');
const profileRouter = require('./routes/profileRouter');
const creativeRouter = require('./router/creativeRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.static('admin'));
app.use(express.static('public'));

app.get('/', (req,res,next) => {
	res.redirect('/index.html');
});

app.use((req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', '*');
	res.set('Access-Control-Allow-Methods', '*');
	if(req.method === 'OPTIONS'){
		res.status(200).end();
	} else{
		res.set('Content-Type', 'application/json');
		next();
	}
	
});

app.use('/display', displayRouter);
app.use('/user', userRouter);
app.use('/change', changeRouter);
app.use('/profile', profileRouter);
app.use('/creative', creativeRouter);

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