const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Profile = require('../models/profile');
const auth = require('../utilities/auth');
const cut = require('../utilities/cut');


router.get('/all', async (req,res,next) => {
	try{
		let data = await Profile.find({});
		data = data.map(entry => cut(entry,['name','post','insta']));
		res.status(200).json({ ok:1, data });
	} catch(err){ next(err); }
});

router.use(auth);

router.post('/add', upload.none(), async (req,res,next) => {
	try{
		let { name, post, insta } = req.body;

		if(!name){
			let err = new Error('name is required field');
			err.status = 400;
			next(err);
			return;
		}

		let newProfile = new Profile({ name, post, insta });
		await newProfile.save();

		res.status(200).json({ ok:1 });
	} catch(err){ next(err); }
});


router.get('/id/:_id', async (req, res, next) => {
	try {
		let { _id } = req.params;

		if (!_id) {
			let err = new Error("Id must be present");
			err.status = 400;
			next(err);
			return;
		}

		let data = await Profile.findOne({ _id });
		if (!data) {
			let err = new Error("Invalid id");
			err.status = 404;
			next(err);
			return;
		}

		res.status(200).json({ ok: 1, data });

	} catch (err) { next(err); }
});


router.put('/update', upload.none(), async (req,res,next) => {
	try{
		let { _id } = req.body;
		
		if(!_id){
			let err = new Error('_id must be specified');
			err.status = 400;
			next(err);
			return;
		}
		delete req.body._id;
		let out = await Profile.updateOne({ _id }, req.body);

		if(out.nModified === 1){
			res.status(200).json({ ok:1 });
		} else {
			let err = new Error('Could not update');
			next(err);
		}
	} catch(err){ next(err); }
});


router.delete('/delete', upload.none(), async (req,res,next) => {
	try{
		let { list } = req.body;
		if(!list){
			let err = new Error('list of ids must be specified');
			err.status = 400;
			next(err);
			return;
		}
		list = list.split(',');

		let { deletedCount } = await Profile.deleteMany({ _id: {$in: list} });
		if( deletedCount === list.length ){
			res.status(200).json({ ok:1 });
		} else {
			let err = new Error('Delete failed, system inconsistent');
			next(err);
		}
	} catch(err){ next(err); }
});


module.exports = router;