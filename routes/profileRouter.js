const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Profile = require('../models/profile');
const jwt = require('jsonwebtoken');
const { JWTKEY } = require('../utilities/env');
const cut = require('../utilities/cut');


router.get('/all', async (req,res,next) => {
	try{
		let data = await Profile.find({});
		data = data.map(entry => cut(entry,['name','post','insta','image']));
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});


router.use((req,res,next)=>{
	try{
		let { token } = req.headers;

		let decoded = jwt.verify(token, JWTKEY);

		req.username = decoded.username;

		next();
	} catch(err){
		let e = new Error('Invalid access');
		e.status = 403;
		next(e); 
		return;	
	}
});


router.get('/min', async (req,res,next) => {
	try{
		let data = await Profile.find({});
		data = data.map(entry => cut(entry,['_id','name']));
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});

router.post('/add', upload.none(), async (req,res,next) => {
	try{
		let { name, post, insta, image } = req.body;

		if(!name || !image){
			let err = new Error('name and image are required fields');
			err.status = 400;
			next(err);
			return;
		}

		let newProfile = new Profile({ name, post, insta, image });
		await newProfile.save();

		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});


router.put('/update', upload.none(), async (req,res,next) => {
	try{
		let { name, post, insta, image, _id } = req.body;
		
		if(!_id){
			let err = new Error('_id must be specified');
			err.status = 400;
			next(err);
			return;
		}

		let updates = {};

		if(name) updates.name = name;
		if(post) updates.post = post;
		if(insta) updates.insta = insta;
		if(image) updates.image = image;

		let out = await Profile.updateOne({ _id }, updates);

		if(out.nModified === 1){
			res.status(200).json({ ok:1 });
		} else {
			let err = new Error('Could not update');
			next(err);
		}
	} catch(err){ next(err); }
});


router.delete('/delete', upload.none(), async (req,res,next) => {
	try{
		let { ids } = req.body;
		ids = ids.split(',');
		let out = await Profile.deleteMany({ _id: {$in: ids} });
		if(out.deletedCount){
			res.status(200).json({ ok:1 });
		} else {
			let err = new Error('Could not delete');
			next(err);
		}
	} catch(err){ next(err); }
});


module.exports = router;