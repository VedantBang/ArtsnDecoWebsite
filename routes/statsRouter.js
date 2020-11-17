const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const upload = multer();
const Stats = require('../models/stats');
const auth = require('../utilities/auth');

router.get('/all', async (req,res,next) => {
	try{
		const data = await Stats.find({});
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});

router.use(auth);

router.put('/update/:_id', upload.none(), async (req,res,next) => {
	try{
		const { _id } = req.params;
		if(!_id){
			let err = new Error('id must be present');
			err.status = 400;
			next(err);
			return;
		}

		if(!req.body.icon || !req.body.number || !req.body.text){
			let err = new Error('Atleast one of icon/number/text missing in body');
			err.status = 400;
			next(err);
			return;	
		}

		let { nModified } = await Stats.updateOne({ _id: mongoose.Types.ObjectId(_id) }, req.body);
		
		if(nModified === 1){
			res.status(200).json({ ok:1 });
		} else {
			let err = new Error('Could not update');
			next(err);
		}
	} catch(err){ next(err); }
});

router.delete('/delete/:_id', async (req,res,next) => {
	try{
		const { _id } = req.params;
		if(!_id){
			let err = new Error('id must be present');
			err.status = 400;
			next(err);
			return;
		}

		let { deletedCount } = await Stats.deleteOne({ _id: mongoose.Types.ObjectId(_id) });
		if(deletedCount !== 1){
			let err = new Error('Could not delete stat');
			next(err);
			return;	
		}

		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

module.exports = router;