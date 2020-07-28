const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWTKEY } = require('../utilities/env');
const multer = require('multer');
const upload = multer();
const User = require('../models/user');
const router = express.Router();

router.post('/login', upload.none(), async (req,res,next) => {
	try{
		let { username, password } = req.body;

		let user = await User.findOne({ username });
		if(!user){
			let err = new Error('Invalid credentials');
			err.status = 401;
			next(err); 
			return;
		}

		let match = await bcrypt.compare(password, user.passhash);
		if(!match){
			let err = new Error('Invalid credentials');
			err.status = 401;
			next(err); 
			return;	
		}
		let token = jwt.sign({ username }, JWTKEY, { expiresIn: 24*60*60 });
		res.status(200).json({ ok: 1, token });

	} catch(err){ next(err); }
});

router.get('/verifytoken', (req,res,next)=>{
	try{
		let { token } = req.headers;
		jwt.verify(token, 'yeesss');
		res.status(200).json({ ok:1 });
	} catch(err){
		let e = new Error('Invalid token');
		e.status = 400;
		next(e);
		return;
	}
});

router.use((req,res,next)=>{
	try{
		let { token } = req.headers;

		let decoded = jwt.verify(token, 'yeesss');

		req.username = decoded.username;

		next();
	} catch(err){
		let e = new Error('Invalid access');
		e.status = 403;
		next(e); 
		return;	
	}
});


// Update password
router.put('/updatepass', upload.none(), async (req,res,next)=>{
	try{
		let { password } = req.body;
		let { username } = req;

		let passhash = await bcrypt.hash(password, 5);

		let out = await User.updateOne({ username }, { passhash });
		if(out.nModified){
			res.status(200).json({ ok: 1 });
		} else {
			let err = new Error('Could not update password');
			next(err);
		}
	} catch(err){ next(err); }
});

module.exports = router;