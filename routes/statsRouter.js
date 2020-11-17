const express = require('express');
const Stats = require('../models/stats');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const auth = require('../utilities/auth');

router.get('/all', async (req,res,next) => {
	try{
		let data = await Stats.find({});
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});

router.use(auth);

router.post('/add', upload.none(), async (req,res,next) => {
	try{
		let { icons, numbers, texts } = req.body;
		
		if(!icons || !numbers || !texts){
			let err = new Error('Missing one of icons / numbers / texts');
			err.status = 400;
			next(err);
			return;
		}
		
		icons = icons.split(','); numbers = numbers.split(','); texts = texts.split(',');

		if((icons.length !== numbers.length) || (numbers.length !== texts.length) || (texts.length !== icons.length)){
			let err = new Error('Unequal lengths of input arrays');
			err.status = 400;
			next(err);
			return;	
		}

		let saves = [];
		for(let x = 0; x < icons.length; x++){
			saves.push((new Stats({
				icon: icons[x],
				numbers: number[x],
				text: text[x]
			})).save());
		}

		await Promise.all(saves);

		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

router.put('/update', upload.none(), async (req,res,next) => {
	try{
		let { _id } = req.body;
		if(!_id){
			let err = new Error('_id must be present');
			err.status = 400;
			next(err);
			return;
		}
		delete req.body._id;
		let { nModified } = await Stats.updateOne({ _id }, req.body);
		if(nModified !== 1){
			let err = new Error('Update failed');
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

router.delete('/delete', upload.none(), async (req,res,next) => {
	try{
		let { list } = req.body;
		if(!list){
			let err = new Error('id(list) must be present');
			err.status = 400;
			next(err);
			return;
		}
		let { deletedCount } = await Stats.deleteMany({ _id: list });
		if(deletedCount !== 1){
			let err = new Error('Delete failed, system inconsistent');
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

module.exports = router;