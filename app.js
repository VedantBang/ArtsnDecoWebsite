const express = require('express');
const morgan = require('morgan');

require('./config/db')();

const userRouter = require('./routes/userRouter');
const changeRouter = require('./routes/changeRouter');
const displayRouter = require('./routes/displayRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.static('admin'));
app.use('/images', express.static('images'));

app.get('/', (req,res,next) => {
	res.redirect('/login.html');
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