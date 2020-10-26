const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWTKEY } = require('../utilities/env');
const multer = require('multer');
const upload = multer();
const User = require('../models/user');
const Album = require('../models/album');
const router = express.Router();
const auth = require('../utilities/auth');

router.get('/visit', async (req,res,next) => {
	try{
		res.status(200).end();
		await User.update({}, { $inc: { visits:1 }});
	} catch(err){ next(err); }
});

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

router.use(auth);

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

router.get('/storage', async (req,res,next) => {
	try{
		let { dataSize } = await mongoose.connection.db.command({ "dbStats":1 });
		res.status(200).json({ ok: 1, bytes:dataSize });
	} catch(err){ next(err); }
});

router.get('/images', async (req,res,next) => {
	try{
		let [{ total }] = await Album.aggregate([
			{$group:{
				_id:null,
				total:{$sum: {$size: '$images'}}
			}}
		]);
		res.status(200).json({ ok:1, total });
	} catch(err){ next(err); }
});

router.get('/totalvisits', async (req,res,next) => {
	try{
		let { visits } = await User.findOne({}, { visits:1, _id:0 });
		res.status(200).json({ ok:1, visits });
	} catch(err){ next(err); }
});

module.exports = router;