const express = require('express');
const Album = require('../models/album');
const multer = require('multer');
const upload = multer();
const cut = require('../utilities/cut');
const router = express.Router();


router.get('/all', async (req,res,next) => {
	try{
		let data = await Album.find({});
		data = data.map(entry => cut(entry, ['fest','year','name','theme','images']));
		data = data.map(entry => {
			return {
				fest: entry.fest, year: entry.year, name: entry.name, theme: entry.theme,
				coverImage: entry.images[0]
			}
		});
		res.status(200).json({ ok:1, data });
		
	} catch(err){ next(err); }
});


router.post('/fest', upload.none(),async (req,res,next) => {
	try{
		let { fest, year, name } = req.body;

		if(!year || !fest) {
      		let err = new Error("Invalid input");
      		err.status = 400;
      		next(err);
      		return;
    	}

		year = parseInt(year);

		if(fest !== 'other') name = '';
		else {
			if(!name){
				let err = new Error('name must be specified when fest is set to other');
    			err.status = 400;
    			next(err);
    			return;
			}
		}

		let data = await Album.findOne({ fest, year, name });
		data = cut(data, ['fest','year','name','theme','images']);

		res.status(200).json({ ok:1, data });

	} catch(err){ next(err); }
});

module.exports = router;