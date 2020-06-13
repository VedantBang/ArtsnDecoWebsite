const express = require('express');
const jwt = require('jsonwebtoken');
const Album = require('../models/album');
const multer = require('multer');
const upload = multer({ dest: 'images/' });
const cut = require('../utilities/cut');
const router = express.Router();


router.use((req,res,next)=>{
	try{
		let { token } = req.headers;

		let decoded = jwt.verify(token, 'yeesss');

		req.username = decoded.username;

		next();
	} catch(err){
		let e = new Error('Invalid access');
		e.status = 403;
		next(e); 
		return;	
	}
});


router.post('/new', upload.array('photos'), async (req,res,next) => {
	try{
		let { fest, year, name, theme, titles } = req.body;

		if(!year || !fest) {
      		let err = new Error("Invalid input");
      		err.status = 400;
      		next(err);
      		return;
    	}

		year = parseInt(year);
		titles = titles.split(',');
		if(!theme) theme = "";

		if(titles.length !== req.files.length){
			let err = new Error('Number of titles do not match number of files');
			err.status = 400;
			next(err);
			return;
		}

		if(fest !== 'other') name = '';
		else {
			if(!name){
				let err = new Error('name must be specified when fest is set to other');
    			err.status = 400;
    			next(err);
    			return;
			}
		}

		const check = await Album.findOne({ fest, year, name });
		if(check){
			let err = new Error("Fest already exists");
      		err.status = 400;
      		next(err);
      		return;
		}

		let photolinks = req.files.map(file => file.path);
		let images = [];
		for(let x = 0; x < photolinks.length; x++){
			images.push({
				title: titles[x],
				link: photolinks[x],
			});
		}

		let album = new Album({ fest, year, name, theme, images });
		await album.save();

		res.status(200).json({ ok:1 });

	} catch(err){ next(err); }
});


router.put('/addImages', upload.array('photos'), async (req,res,next) => {
	try{
		let { fest, year, name, titles } = req.body;

		if(!year || !fest) {
      		let err = new Error("Invalid input");
      		err.status = 400;
      		next(err);
      		return;
    	}

    	year = parseInt(year);
    	titles = titles.split(',');

    	if(titles.length !== req.files.length){
			let err = new Error('Number of titles do not match number of files');
			err.status = 400;
			next(err);
			return;
		}

    	if(fest !== 'other') name = '';
		else {
			if(!name){
				let err = new Error('name must be specified when fest is set to other');
    			err.status = 400;
    			next(err);
    			return;
			}
		}

		let album = await Album.findOne({ fest, year, name });
		if(!album){
			let err = new Error('Fest not found');
			err.status = 404;
			next(err);
			return;
		}

		let photolinks = req.files.map(file => file.path);
		let newImages = [];
		for(let x = 0; x < photolinks.length; x++){
			newImages.push({
				title: titles[x],
				link: photolinks[x]
			});
		}

		album.images = album.images.concat(newImages);

		await album.save();

		res.status(200).json({ ok:1 });

	} catch(err){ next(err); }
});


router.put('/removeImages', upload.none(), async (req,res,next) => {
	try{
		let { fest, year, name, remove } = req.body;

		if(!year || !fest) {
      		let err = new Error("Invalid input");
      		err.status = 400;
      		next(err);
      		return;
    	}

    	year = parseInt(year);
    	remove = remove.split(',');

    	if(fest !== 'other') name = '';
		else {
			if(!name){
				let err = new Error('name must be specified when fest is set to other');
    			err.status = 400;
    			next(err);
    			return;
			}
		}

		let album = await Album.findOne({ fest, year, name });
		if(!album){
			let err = new Error('Fest not found');
			err.status = 404;
			next(err);
			return;
		}

		let newList = album.images.filter(entry => !remove.includes(entry.link));
		album.images = newList;

		await album.save();

		res.status(200).json({ ok:1 });

	} catch(err){ next(err); }
});


router.delete('/delete', upload.none(), async (req,res,next) => {
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

		let del = await Album.remove({ fest, year, name });

		if(del){
			res.status(200).json({ ok:1 });
		} else {
			let err = new Error('Could not delete');
			next(err);
		}

	} catch(err){ next(err); }
});

module.exports = router;