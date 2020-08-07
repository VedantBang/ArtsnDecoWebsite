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