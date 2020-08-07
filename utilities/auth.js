const jwt = require('jsonwebtoken');
const { JWTKEY } = require('./env');

module.exports = (req,res,next) => {
	try{
		let { token } = req.headers;
		let decoded = jwt.verify(token, JWTKEY, { algorithms: ['HS256'] });
		req.username = decoded.username;
		next();
	} catch(err){
		let e = new Error('Invalid access');
		e.status = 403;
		next(e); 
		return;	
	}
}