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

router.put('/update', upload.none(), async (req,res,next) => {
	try{
		let { icons, numbers, texts } = req.body;
		if(!icons || !numbers || !texts){
			let err = new Error('Missing one of icons/numbers/texts');
			err.status = 400;
			next(err);
			return;
		}
		if(!(typeof icons === 'string') || !(typeof numbers === 'string') || !(typeof texts === 'string')){
			let err = new Error('An error occured while parsing input, please try again');
			next(err);
			return;	
		}

		icons = icons.split(','); numbers = numbers.split(','); texts = texts.split(',');

		if((icons.length !== numbers.length) || (numbers.length !== texts.length) || (texts.length !== icons.length)){
			let err = new Error('Unequal lengths of one of icons/numbers/texts');
			err.status = 400;
			next(err);
			return;	
		}

		const lines = [];

		for(let x = 0; x < icons.length; x++){
			lines.push({
				icon: icons[x],
				number: numbers[x],
				text: texts[x]
			});
		}

		let { nModified } = await Stats.updateOne({}, { lines });
		if(nModified !== 1){
			let err = new Error('Update failed');
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

module.exports = router;