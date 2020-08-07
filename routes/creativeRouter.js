const express = require('express');
const jwt = require('jsonwebtoken');
const { JWTKEY } = require('../utilities/env');
const Creative = require('../models/creative');
const multer = require('multer');
const upload = multer();
const router = express.Router();

router.get('/all', async (req,res,next) => {
	try{
		let data = await Creative.find({});
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});


router.use((req,res,next) => {
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


router.post('/add', upload.none(), async (req,res,next) => {
	try{
		let { titles, links } = req.body;

		titles = titles.split(',');
		links = links.split(',');
		
		let images = [];
		for (let i = 0; i < titles.length; i++) {
		images.push({
			title: titles[i],
			link: links[i],
		});
		}

		let entry = new Creative({ images });
		await entry.save();

		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});


router.delete('/delete', upload.none(), async (req,res,next) => {
	try{
		let { id } = req.body;
		if(!id){
			let err = new Error('id must be present');
			err.status = 400;
			next(err);
			return;
		}

		let out = await Creative.deleteOne({ _id:id });

		if(out.deletedCount === 1){
			res.status(200).json({ ok:1 });
		} else {
			let err = new Error('Could not delete');
			next(err);
		}
	} catch(err){ next(err); }
});

module.exports = router;