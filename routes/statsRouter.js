const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Stats = require('../models/stats');
const auth = require('../utilities/auth');
const cut = require('../utilities/cut');

router.get('/all', async (req,res,next) => {
	try{
		let { lines } = await Stats.findOne({});
		if(!lines || lines.length === 0){
			let err = new Error('No stats found');
			err.status = 404;
			next(err);
			return;
		}
		res.status(200).json({ ok:1, data: lines });
	} catch(err){ next(err); }
});

router.use(auth);

router.put('/update', async (req,res,next) => {
	try{
		let { data } = req.body;
		if(!data || !Array.isArray(data)){
			let err = new Error('Data must be an array');
			err.status = 400;
			next(err);
			return;
		}
		let { nModified } = await Stats.updateOne({}, { data });
		
		if(nModified === 1){
			res.status(200).json({ ok:1 });
		} else {
			let err = new Error('Could not update');
			next(err);
		}
	} catch(err){ next(err); }
});

module.exports = router;