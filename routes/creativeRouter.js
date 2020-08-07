const express = require('express');
const Creative = require('../models/creative');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const auth = require('../utilities/auth');

router.get('/all', async (req,res,next) => {
	try{
		let data = await Creative.find({});
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});

router.use(auth);

router.post('/add', upload.none(), async (req,res,next) => {
	try{
		let { titles, links } = req.body;

		titles = titles.split(',');
		links = links.split(',');
		
		let saves = [];
		for(let x = 0; x < titles.length; x++){
			saves.push((new Creative({
				title: titles[x],
				link: links[x],
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
		let { nModified } = await Creative.updateOne({ _id }, req.body);
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
			let err = new Error('List of ids must be present');
			err.status = 400;
			next(err);
			return;
		}
		list = list.split(',');
		let { deletedCount } = await Creative.deleteMany({ _id: { $in: list } });
		if(deletedCount !== list.length){
			let err = new Error('Delete failed, system inconsistent');
			next(err);
			return;
		}
		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});

module.exports = router;