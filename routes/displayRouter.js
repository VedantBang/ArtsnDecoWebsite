const express = require('express');
const Album = require('../models/album');
const multer = require('multer');
const upload = multer();
const cut = require('../utilities/cut');
const router = express.Router();

router.get('/:fest', async (req,res,next) => {
	try{
		let searchOptions = {};

		let { fest } = req.params;
		const list = ['waves','quark','spree','other'];

		if(!list.includes(fest)){
			next();
			return;
		}
		searchOptions.fest = fest

		let { year } = req.query;
		if(year){
			searchOptions.year = parseInt(year);
		}

		let data = await Album.find(searchOptions);
		data = data.map(entry => cut(entry, ['fest','year','name','theme','images']));
		if(!year){
			data = data.map(entry => {
				return {
					fest: entry.fest, year: entry.year, name: entry.name, theme: entry.theme,
					coverImage: entry.images[0]
				}
			});	
			function yearSort(a,b){return b.year - a.year;}
			data.sort(yearSort);
		}
			
		res.status(200).json({ ok:1, data });
		
	} catch(err){ next(err); }
});

module.exports = router;