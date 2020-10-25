const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Stats = require('../models/stats');
const auth = require('../utilities/auth');

router.get('/all', async (req,res,next) => {
	try{
		let { lines } = await Stats.findOne({});
		if(!lines || lines.length === 0){
			let err = new Error('No stats found');
			err.status = 404;
			next(err);
			return;
		}
		res.status(200).json({ ok:1, lines });
	} catch(err){ next(err); }
});

router.use(auth);

router.put('/update', upload.none(), async (req,res,next) => {
	try{
		let { lines } = req.body;

		lines = lines.split(',');

		if(!lines || !Array.isArray(lines)){
			let err = new Error('Data must be an array');
			err.status = 400;
			next(err);
			return;
		}
		let { nModified } = await Stats.updateOne({}, { lines });
		
		if(nModified === 1){
			res.status(200).json({ ok:1 });
		} else {
			let err = new Error('Could not update');
			next(err);
		}
	} catch(err){ next(err); console.log(err); }
});

module.exports = router;