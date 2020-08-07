const express = require('express');
const jwt = require('jsonwebtoken');
const { JWTKEY } = require('../utilities/env');
const Album = require('../models/album');
const multer = require('multer');
const upload = multer();
const cut = require('../utilities/cut');
const router = express.Router();


router.use((req,res,next)=>{
	try{
		let { token } = req.headers;

		let decoded = jwt.verify(token, JWTKEY);

		req.username = decoded.username;

		next();
	} catch(err){
		let e = new Error('Invalid access');
		e.status = 403;
		next(e); 
		return;	
	}
});


router.post('/new', upload.none(), async (req,res,next) => {
	try{
		let { fest, year, name, theme, titles, links } = req.body;

		if(!year || !fest) {
      		let err = new Error("Invalid input");
      		err.status = 400;
      		next(err);
      		return;
    	}

		year = parseInt(year);
		titles = titles.split(',');
		links = links.split(',');
		if(!theme) theme = "";

		if(titles.length !== links.length){
			let err = new Error('Number of titles do not match number of links');
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

		let images = [];
		for(let x = 0; x < links.length; x++){
			images.push({
				title: titles[x],
				link: links[x],
			});
		}

		let album = new Album({ fest, year, name, theme, images });
		await album.save();

		res.status(200).json({ ok:1 });

	} catch(err){ next(err); }
});


router.put('/update', upload.none(), async(req, res, next) => {
	try {
        let { fest, name, year, theme, titles, links, _id } = req.body;

        year = parseInt(year);
        titles = titles.split(',');
        links = links.split(',');

		if (fest !== 'other') name = '';
		
		let images = [];
		for (let i = 0; i < titles.length; i++) {
			images.push({
				title: titles[i],
				link: links[i],
			})
		}

		const { nModified } = await Album.updateOne({ _id }, { fest, name, year, theme, images });
		
		if (nModified !== 1) {
			let err = new Error('Could not update');
			next(err);
			return;
		}

		res.status(200).json({ ok: 1 });
	} catch (err) { next(err); }
})


router.delete('/deletefest', upload.none(), async (req,res,next) => {
	try {
		let { list } = req.body;

		if (!list) {
			let err = new Error('List must be present in body');
			res.status = 400;
			next(err);
			return;
		}

		list = list.split(',');

		let { deletedCount } = await Album.deleteMany({ _id: { $in: list } });
		if(deletedCount !== 1) {
			let err = new Error('Could not delete fest');
			next(err);
			return;
		}

		res.status(200).json({ ok: 1 });
	} catch (err) { next(err); }
})

// router.put('/addImages', upload.none(), async (req,res,next) => {
// 	try{
// 		let { fest, year, name, titles, links } = req.body;

// 		if(!year || !fest) {
//       		let err = new Error("Invalid input");
//       		err.status = 400;
//       		next(err);
//       		return;
//     	}

//     	year = parseInt(year);
//     	titles = titles.split(',');
//     	links = links.split(',');

//     	if(titles.length !== links.length){
// 			let err = new Error('Number of titles do not match number of links');
// 			err.status = 400;
// 			next(err);
// 			return;
// 		}

//     	if(fest !== 'other') name = '';
// 		else {
// 			if(!name){
// 				let err = new Error('name must be specified when fest is set to other');
//     			err.status = 400;
//     			next(err);
//     			return;
// 			}
// 		}

// 		let album = await Album.findOne({ fest, year, name });
// 		if(!album){
// 			let err = new Error('Fest not found');
// 			err.status = 404;
// 			next(err);
// 			return;
// 		}

// 		let newImages = [];
// 		for(let x = 0; x < links.length; x++){
// 			newImages.push({
// 				title: titles[x],
// 				link: links[x]
// 			});
// 		}

// 		album.images = album.images.concat(newImages);

// 		await album.save();

// 		res.status(200).json({ ok:1 });

// 	} catch(err){ next(err); }
// });


// router.put('/removeImages', upload.none(), async (req,res,next) => {
// 	try{
// 		let { fest, year, name, remove } = req.body;

// 		if(!year || !fest) {
//       		let err = new Error("Invalid input");
//       		err.status = 400;
//       		next(err);
//       		return;
//     	}

//     	year = parseInt(year);
//     	remove = remove.split(',');

//     	if(fest !== 'other') name = '';
// 		else {
// 			if(!name){
// 				let err = new Error('name must be specified when fest is set to other');
//     			err.status = 400;
//     			next(err);
//     			return;
// 			}
// 		}

// 		let album = await Album.findOne({ fest, year, name });
// 		if(!album){
// 			let err = new Error('Fest not found');
// 			err.status = 404;
// 			next(err);
// 			return;
// 		}

// 		let newList = album.images.filter(entry => !remove.includes(entry.link));
// 		album.images = newList;

// 		await album.save();

// 		res.status(200).json({ ok:1 });

// 	} catch(err){ next(err); }
// });


// router.delete('/delete', upload.none(), async (req,res,next) => {
// 	try{
// 		let { fest, year, name } = req.body;

// 		if(!year || !fest) {
//       		let err = new Error("Invalid input");
//       		err.status = 400;
//       		next(err);
//       		return;
//     	}

//     	year = parseInt(year);

//     	if(fest !== 'other') name = '';
// 		else {
// 			if(!name){
// 				let err = new Error('name must be specified when fest is set to other');
//     			err.status = 400;
//     			next(err);
//     			return;
// 			}
// 		}

// 		let out = await Album.deleteOne({ fest, year, name });

// 		if(out.deletedCount === 1){
// 			res.status(200).json({ ok:1 });
// 		} else {
// 			let err = new Error('Could not delete');
// 			next(err);
// 		}

// 	} catch(err){ next(err); }
// });

module.exports = router;